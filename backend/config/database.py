from pymongo import MongoClient
from vars.var import mongo_client # Private Variable

client = MongoClient(mongo_client)
db = client.net_archer

collection_name = db["net_archer_collection"]