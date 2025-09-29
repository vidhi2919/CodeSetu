from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime


# ==============================
# Request/Response Models
# ==============================
class AuditEventCreate(BaseModel):
    """Model used when logging a new doctor action"""
    event_type: str = Field(..., description="Type of event: search, translate, upload, etc.")
    agent_id: str = Field(..., description="Doctor identifier (e.g., ABHA ID or OAuth subject)")
    agent_name: Optional[str] = Field(None, description="Doctor's display name")
    entity: Optional[Dict[str, Any]] = Field(None, description="The entity involved, e.g., code searched")
    outcome: str = Field("success", description="success / failure")
    ip_address: Optional[str] = Field(None, description="Doctor's IP address")
    user_agent: Optional[str] = Field(None, description="Browser or client info")


class AuditEventResponse(AuditEventCreate):
    """Model used when returning an audit event from MongoDB"""
    id: str = Field(..., alias="_id")
    recorded: datetime = Field(default_factory=datetime.utcnow)


# ==============================
# MongoDB Schema (Optional)
# ==============================
# MongoDB is schemaless, but this is how a document would look like:
"""
{
    "_id": ObjectId("..."),
    "event_type": "search",
    "agent_id": "ABHA12345",
    "agent_name": "Dr. Sharma",
    "entity": {
        "code": "NAMASTE:AYU1234",
        "term": "Jwara (Fever)"
    },
    "outcome": "success",
    "recorded": ISODate("2025-09-29T12:00:00Z"),
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0"
}
"""
