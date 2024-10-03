from pymongo import MongoClient

client = MongoClient("mongodb+srv://ptk1233:xN9FWV9SXkOPHcwy@project-cluster.jj80w.mongodb.net/?retryWrites=true&w=majority&appName=project-cluster")

db = client.net_archer

collection_name = db["net_archer_collection"]