from operator import imod
from typing import Any
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair
from typing import Optional, MutableMapping, List, Union
from datetime import datetime, timedelta
import json
import sentry_sdk
import pymongo
from . import schemas
from pymongo import MongoClient
from passlib.hash import bcrypt
from . import auth

# skipping...



# Connecting to Sentry 
# sentry_sdk.init(
#     "https://9b3d81b382e74643a9647070e5092443@o358880.ingest.sentry.io/6146694",

#     # Set traces_sample_rate to 1.0 to capture 100%
#     # of transactions for performance monitoring.
#     # We recommend adjusting this value in production.
#     traces_sample_rate=1.0,
# )

app = FastAPI()

# Connecting to bigchainDB test network
bdb_root_url = 'https://test.ipdb.io' 
bdb = BigchainDB(bdb_root_url)

# rolex = generate_keypair()
# watch = {
#     'data': {
#         'watch': {
#                 'serial_number': '12345',
#             },
#         'manufacturer': 'Rolex',
#     },
# }
# metadata = {
#     'hashedId': "895thu5ht34432049uro24hro24"
# }
# def send_transaction():
#     prepared_creation_tx = bdb.transactions.prepare(
#         operation='CREATE',
#         signers=rolex.public_key,
#         asset=watch,
#         metadata=metadata,
#     )

#     fulfilled_creation_tx = bdb.transactions.fulfill(
#         prepared_creation_tx, private_keys=rolex.private_key)

#     sent_creation_tx = bdb.transactions.send_commit(fulfilled_creation_tx)
#     print("\n")
#     print("Transaction details: ", json.dumps(sent_creation_tx, indent=1))
#     print("\n")
#     print("Transaction Id: ", sent_creation_tx['id'])
#     block_height = bdb.blocks.get(txid=sent_creation_tx['id'])
#     print("Block height: ", block_height)
#     print("\n")
#     block = bdb.blocks.retrieve(str(block_height))
#     print("Block Info: ", json.dumps(block, indent=1))

# send_transaction()
@app.post("/create_product")
async def create_product(product: schemas.Product):
    pass

@app.get("/get_product/{hashed_id}")
async def get_product(hashed_id: str):
    bdb.assets.get(search=hashed_id, limit=1)



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

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()  # 1
) -> Any:
    """
    Get the JWT for a user with data from OAuth2 request form body.
    """

    user = auth.authenticate(id=form_data.username, password=form_data.password)  # 2
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")  # 3

    return {
        "access_token": auth.create_access_token(sub=user['username']),  # 4
        "token_type": "bearer",
    }

@app.get("/me", response_model=schemas.User)
def read_users_me(current_user = Depends(auth.get_current_user)):
    """
    Fetch the current logged in user.
    """

    user = current_user
    return user

# @app.get("/logout")
# def logout(response : Response):
#   response = RedirectResponse('*your login page*', status_code= 302)
#   response.delete_cookie(key ='*your access token name*')
#   return response

@app.get("/")
def read_root():
    return {"Welcome to": "Blockcomet"}
