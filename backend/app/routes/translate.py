from fastapi import APIRouter, HTTPException
from app.db.mongo import db
from app.models.translation import TranslationRequest
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/translate", tags=["translate"])

@router.post("/")
async def translate(req: TranslationRequest):
    mapping = await db["concept_maps"].find_one({
        "source_code": req.source_code,
        "source_system": req.source_system,
        "target_system": req.target_system
    })
    status = "success" if mapping else "failed"

    await db["translation_history"].insert_one({
        "user_id": ObjectId(req.user_id),
        "source_code": req.source_code,
        "source_system": req.source_system,
        "target_code": mapping.get("target_code") if mapping else None,
        "target_system": req.target_system,
        "translation_status": status,
        "timestamp": datetime.utcnow()
    })

    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")
    return mapping
