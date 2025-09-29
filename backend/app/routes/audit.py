from fastapi import APIRouter, Depends, Request, Query, HTTPException
from pymongo.collection import Collection
from bson import ObjectId
from datetime import datetime
from typing import List, Optional

from app.db.mongo import db
from app.models.audit import AuditEventCreate, AuditEventResponse

router = APIRouter(prefix="/audit", tags=["Audit Events"])

# Use MongoDB collection
audit_collection: Collection = db["audit_events"]


# ------------------------
# POST → Log a new event
# ------------------------
@router.post("/", response_model=AuditEventResponse)
async def create_audit_event(request: Request, audit: AuditEventCreate):
    """Log a new doctor activity (search, translate, upload, etc.)"""

    doc = audit.dict()
    doc["recorded"] = datetime.utcnow()

    # capture request metadata
    doc["ip_address"] = doc.get("ip_address") or request.client.host
    doc["user_agent"] = doc.get("user_agent") or request.headers.get("user-agent", "")

    result = audit_collection.insert_one(doc)

    # return the inserted document
    doc["_id"] = str(result.inserted_id)
    return AuditEventResponse(**doc)


# ------------------------
# GET → List audit events
# ------------------------
@router.get("/", response_model=List[AuditEventResponse])
async def list_audit_events(
    agent_id: Optional[str] = Query(None, description="Filter by doctor ABHA ID"),
    event_type: Optional[str] = Query(None, description="Filter by event type (search/translate/upload)"),
    limit: int = Query(20, ge=1, le=100, description="Max number of events to return"),
    skip: int = Query(0, ge=0, description="Number of records to skip for pagination")
):
    """Fetch audit logs (for admin portal dashboard)"""

    query = {}
    if agent_id:
        query["agent_id"] = agent_id
    if event_type:
        query["event_type"] = event_type

    cursor = audit_collection.find(query).sort("recorded", -1).skip(skip).limit(limit)

    events = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        events.append(AuditEventResponse(**doc))

    return events


# ------------------------
# GET → Single audit event
# ------------------------
@router.get("/{event_id}", response_model=AuditEventResponse)
async def get_audit_event(event_id: str):
    """Fetch a single audit event by ID"""

    doc = audit_collection.find_one({"_id": ObjectId(event_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Audit event not found")

    doc["_id"] = str(doc["_id"])
    return AuditEventResponse(**doc)
