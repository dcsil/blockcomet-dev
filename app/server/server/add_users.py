from pymongo import MongoClient
from passlib.hash import bcrypt

#Connecting to our mongoDB instance in cloud
cluster = MongoClient("mongodb+srv://admin:admin@users.d0ihk.mongodb.net/blockcomet?retryWrites=true&w=majority")
db = cluster['blockcomet']
table = db['users']
post = {"username": "test", "password": bcrypt.hash('test123')}
table.insert_one(post)