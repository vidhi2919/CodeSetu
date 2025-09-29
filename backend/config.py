import os
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

# MongoDB connection settings
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "terminology_service")

# Security / Auth (ABHA OAuth2 etc.)
OAUTH2_CLIENT_ID = os.getenv("OAUTH2_CLIENT_ID", "your-client-id")
OAUTH2_CLIENT_SECRET = os.getenv("OAUTH2_CLIENT_SECRET", "your-client-secret")
OAUTH2_TOKEN_URL = os.getenv("OAUTH2_TOKEN_URL", "https://abha.auth/token")

# App metadata
APP_NAME = "Ayush ↔ ICD-11 Terminology Service"
APP_VERSION = "1.0.0"
