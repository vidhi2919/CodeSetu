from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://aroravidhi342_db_user:nRSS3VFILCvwxoKn@cluster0.w1lyhwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = AsyncIOMotorClient(MONGO_URI)
db = client["ayush_emr"]
