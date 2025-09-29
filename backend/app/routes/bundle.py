from fastapi import APIRouter, File, UploadFile
from datetime import datetime
from app.db.mongo import db
from bson import ObjectId

router = APIRouter(prefix="/bundle", tags=["bundle"])

@router.post("/upload")
async def upload_bundle(user_id: str, patient_abha_id: str, bundle: UploadFile = File(...)):
    data = await bundle.read()
    num_conditions = len(data)  # Simplified: parse real FHIR bundle here

    await db["encounter_uploads"].insert_one({
        "user_id": ObjectId(user_id),
        "patient_abha_id": patient_abha_id,
        "bundle_id": bundle.filename,
        "num_conditions": num_conditions,
        "upload_status": "success",
        "version_used": {"NAMASTE": "v2025-09", "ICD11": "v2025"},
        "timestamp": datetime.utcnow()
    })
    return {"message": "Bundle uploaded successfully"}
