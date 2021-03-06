from operator import imod
import re
from typing import Any
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse, HTMLResponse
from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair
from typing import Optional, MutableMapping, List, Union
from datetime import datetime, timedelta
import json
import sentry_sdk
import pymongo
import hashlib

from server.config import settings
from . import schemas
from pymongo import MongoClient
from passlib.hash import bcrypt
from . import auth
from fastapi.middleware.cors import CORSMiddleware

# Connecting to Sentry 
sentry_sdk.init(
    "https://9b3d81b382e74643a9647070e5092443@o358880.ingest.sentry.io/6146694",

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,
)

app = FastAPI()

# Connecting to bigchainDB test network 
bdb = BigchainDB(settings.BDB_URL)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/mock_unique_id")
async def get_unique_id():
    """
    We are using the current timestamp to get the current unique ID - this will be provided by RFIDs in the future
    """
    cluster = MongoClient(settings.DB_URI)
    db = cluster[settings.DB_COL_NAME]
    table = db['uids']
    uid = str(datetime.utcnow())
    hashed_uid = (hashlib.sha256(uid.encode())).hexdigest()
    table.insert_one({"uid": uid, "hashed_uid": hashed_uid})
    return {"uid": uid, "hashed_uid": hashed_uid}


@app.post("/create_product", response_model=str)
async def create_product(product: schemas.InProduct, current_user = Depends(auth.get_current_user)):
    
    user = current_user
    brand_name = ''
    product = product.dict()

    print("Checking brand name validity and authorization!")
    for field in product['data']:
        if field['key'] == 'Brand':
            brand_name = field['value']
    
    brand_name = brand_name.lower().strip()
    if user['username'].lower().strip() != brand_name:
        raise HTTPException(status_code=401, detail=f"You cannot add products for manufacturer {brand_name}")
    print(f"Successfully checked user's product adding authorization for brand {brand_name}")

    manufacturer = generate_keypair()
    print("Creating Digital Asset!")
    digital_asset_payload = {'data': {'product_data': product['data'], 'added_by': settings.SIGNATURE}}
    tx = bdb.transactions.prepare(operation='CREATE',
                          signers=manufacturer.public_key,
                          asset=digital_asset_payload)
    signed_tx = bdb.transactions.fulfill(tx, private_keys=manufacturer.private_key)
    sent_tx = bdb.transactions.send_commit(signed_tx)
    sent_tx == signed_tx
    print("Successfully Sent and Recorded Digital Asset")

    return f"Added product with ID: {sent_tx['id']}"

@app.get("/get_product/{hashed_id}", response_model=schemas.ResponseProduct)
async def get_product(hashed_id: str):

    print("Searching for Product with given ID")
    asset = bdb.assets.get(search=hashed_id, limit=1)
    if len(asset) <= 0:
        raise HTTPException(status_code=404, detail="Item not found")
    asset = asset[0]
    try:
        if asset['data']['added_by'] != settings.SIGNATURE:
            raise HTTPException(status_code=404, detail="Item found was not issued by BlockComet (Testnet)")
    except Exception:
        pass
    print("Found product with the given ID")
    return asset

@app.get("/get_products", response_model=List[schemas.ResponseProduct])
async def get_product(current_user = Depends(auth.get_current_user)):

    user = current_user

    print(f"Searching for all products for manufacturer {user['username']}")
    assets = bdb.assets.get(search=user['username'])
    
    assets_return = []
    for asset in assets:
        try:
            if asset['data']['added_by'] == settings.SIGNATURE:
                assets_return.append(asset)
        except Exception:
            pass
    print(f"Found {len(assets_return)} assets for the given manufacturer")
    
    return assets_return


@app.middleware("http")
async def sentry_exception(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        with sentry_sdk.push_scope() as scope:
            scope.set_context("request", request)
            user_id = "database_user_id" # when available
            scope.user = {
                "ip_address": request.client.host,
                "id": user_id
            }
            sentry_sdk.capture_exception(e)
        raise e

@app.post("/login", response_model=schemas.SuccessfulLogin)
def login(form_data: OAuth2PasswordRequestForm = Depends()  # 1
) -> Any:
    """
    Get the JWT for a user with data from OAuth2 request form body.
    """
    print("Trying to authenticate user")
    user = auth.authenticate(id=form_data.username, password=form_data.password)  # 2
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")  # 3

    user_token = schemas.SuccessfulLogin(access_token=auth.create_access_token(sub=user['username']), token_type='bearer')
    print("Successfully authenticated")
    return user_token

@app.get("/me", response_model=str)
def read_users_me(current_user = Depends(auth.get_current_user)):
    """
    Fetch the current logged in user.
    """
    user = current_user
    return user['username']

@app.get("/logout", response_class=HTMLResponse)
def logout(response : Response, current_user=Depends(auth.get_current_user)):
    print("Trying to log user out")
    user = current_user
    response = RedirectResponse(f'{settings.FRONTEND_URL}/login', status_code=302)
    response.delete_cookie(key = user['username'])
    print("User has been logged out")
    return response

@app.get("/", response_model=str)
def read_root():
    return "Welcome to BlockComet's API"
    