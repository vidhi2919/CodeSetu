from pydantic import BaseModel

class TranslationRequest(BaseModel):
    user_id: str
    source_code: str
    source_system: str
    target_system: str
