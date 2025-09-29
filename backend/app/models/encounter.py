from pydantic import BaseModel

class EncounterUpload(BaseModel):
    user_id: str
    patient_abha_id: str
    bundle_id: str
    num_conditions: int
    version_used: dict
