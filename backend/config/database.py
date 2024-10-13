from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_CLI"))
db = client.net_archer

collection_name = db["net_archer_collection"]