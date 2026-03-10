from pydantic import BaseModel, HttpUrl
from datetime import datetime

class URLCreate(BaseModel):
    original_url: HttpUrl

class URLResponse(BaseModel):
    id: int
    original_url: str
    short_url: str
    clicks: int
    created_at: datetime

    class Config:
        from_attributes: True