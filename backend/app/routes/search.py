from fastapi import APIRouter
from app.db.mongo import db
from app.models.search import SearchRequest, Code
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/", response_model=list[Code])
async def search_codes(user_id: str, term: str, system: str):
    codes = await db["codes"].find(
        {"system": system, "display": {"$regex": term, "$options": "i"}}
    ).to_list(20)
    
    # Log search
    await db["search_history"].insert_one({
        "user_id": ObjectId(user_id),
        "search_term": term,
        "coding_system": system,
        "returned_codes": codes,
        "timestamp": datetime.utcnow()
    })
    return codes
