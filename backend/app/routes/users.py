# from fastapi import APIRouter, HTTPException
# from app.db.mongo import db
# from app.models.user import User
# from datetime import datetime

# router = APIRouter(prefix="/users", tags=["users"])

# @router.post("/register")
# async def register_user(user: User):
#     existing = await db["users"].find_one({"abha_id": user.abha_id})
#     if existing:
#         raise HTTPException(status_code=400, detail="User already exists")
#     user.created_at = datetime.utcnow()
#     await db["users"].insert_one(user.dict())
#     return {"message": "User registered successfully"}

from fastapi import APIRouter, Depends, HTTPException, status, Header
from app.db.mongo import db
from models.user import UserCreate, UserResponse
from datetime import datetime
import firebase_admin
from firebase_admin import auth

router = APIRouter(prefix="/users", tags=["Users"])

# ✅ Dependency: verify Firebase token
async def verify_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# ✅ Create user profile (after Firebase registration)
@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, decoded=Depends(verify_token)):
    uid = decoded["uid"]
    existing = await db.users.find_one({"uid": uid})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = {
        "uid": uid,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "specialization": user.specialization,
        "abha_id": user.abha_id,
        "created_at": datetime.utcnow()
    }
    await db.users.insert_one(new_user)
    return new_user

# ✅ Fetch current user profile
@router.get("/me", response_model=UserResponse)
async def get_me(decoded=Depends(verify_token)):
    uid = decoded["uid"]
    user = await db.users.find_one({"uid": uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
