from pydantic import BaseModel
from typing import List, Dict

class Code(BaseModel):
    code: str
    display: str

class SearchRequest(BaseModel):
    user_id: str
    search_term: str
    coding_system: str  # NAMASTE, ICD11_TM2, etc.
