# from pydantic import BaseModel, EmailStr
# from typing import Optional
# from datetime import datetime

# class User(BaseModel):
#     abha_id: str
#     name: str
#     email: Optional[EmailStr]
#     role: str  # doctor/admin
#     created_at: Optional[datetime] = None

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str = "doctor"   # could be "doctor", "admin"
    specialization: Optional[str] = None
    abha_id: str

class UserCreate(UserBase):
    pass  # Firebase handles password, so we don’t store it

class UserResponse(UserBase):
    uid: str  # Firebase UID
    created_at: datetime
