from fastapi import FastAPI, Request
from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair
import json

# Connecting to bigchainDB test network 

bdb_root_url = 'https://test.ipdb.io' 
bdb = BigchainDB(bdb_root_url)

if not len(bdb.assets.get(search='blockcomet')):
    brand = generate_keypair()

    test_asset = {'data': {'msg': 'blockcomet setup'},}
    metadata={'name': 'test_data'}

    prepared_creation_tx = bdb.transactions.prepare(
        operation='CREATE',
        signers=brand.public_key,
        asset=test_asset
    )

    rolex = generate_keypair()

    watch = {
        'data': {
            'watch': {
                    'serial_number': '12345',
                },
            'manufacturer': 'Rolex',
        },
    }
    metadata = {
        'hashedId': "895thu5ht34432049uro24hro24"
    }

    def send_transaction():
        prepared_creation_tx = bdb.transactions.prepare(
            operation='CREATE',
            signers=rolex.public_key,
            asset=watch,
            metadata=metadata,
        )

        fulfilled_creation_tx = bdb.transactions.fulfill(
            prepared_creation_tx, private_keys=rolex.private_key)

        sent_creation_tx = bdb.transactions.send_commit(fulfilled_creation_tx)
        print("\n")
        print("Transaction details: ", json.dumps(sent_creation_tx, indent=1))
        print("\n")
        print("Transaction Id: ", sent_creation_tx['id'])
        block_height = bdb.blocks.get(txid=sent_creation_tx['id'])
        print("Block height: ", block_height)
        print("\n")
        block = bdb.blocks.retrieve(str(block_height))
        print("Block Info: ", json.dumps(block, indent=1))

    send_transaction()
