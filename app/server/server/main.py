from operator import imod
from fastapi import FastAPI, Request
from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair
import json
import sentry_sdk
import pymongo
from pymongo import MongoClient
# import schemas
# Connecting to our mongoDB instance in cloud
# cluster = MongoClient('mongodb+srv://admin:blockcomet@cluster0.yk74s.mongodb.net/blockcomet_users?retryWrites=true&w=majority')
# db = cluster["blockcomet_users"]
# collection = db["users"]

# post = {"_id": 0, "username": "test_user"}
# collection.insert_one(post)

# Connecting to Sentry 
# sentry_sdk.init(
#     "https://9b3d81b382e74643a9647070e5092443@o358880.ingest.sentry.io/6146694",

#     # Set traces_sample_rate to 1.0 to capture 100%
#     # of transactions for performance monitoring.
#     # We recommend adjusting this value in production.
#     traces_sample_rate=1.0,
# )

app = FastAPI()

# # Connecting to bigchainDB test network 
# bdb_root_url = 'https://test.ipdb.io' 
# bdb = BigchainDB(bdb_root_url)

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
# @app.post("/create_product")
# async def create_product(product: schemas.Product):
#     pass



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

@app.get("/")
def read_root():
    return {"Welcome to": "Blockcomet"}
