from fastapi import APIRouter
from app.db.mongo import db

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/search-history")
async def get_search_history():
    logs = await db["search_history"].find().to_list(100)
    return logs

@router.get("/translation-history")
async def get_translation_history():
    logs = await db["translation_history"].find().to_list(100)
    return logs

@router.get("/encounter-uploads")
async def get_encounter_uploads():
    logs = await db["encounter_uploads"].find().to_list(100)
    return logs
