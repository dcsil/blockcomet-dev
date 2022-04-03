from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel, Field, Extra
from typing import Optional

class Product(BaseModel):
    class Config:
       allow_population_by_field_name = True
       extra = Extra.allow
    hashed_id: Optional[str]
    brand_name: str
    model_name: str
    date_of_purchase: datetime
    description: Optional[str]

class User(BaseModel):
   id: str
   name: str
   email: str
   is_superuser: bool
   hashed_password: str

class SuccessfulLogin(BaseModel):
   access_token: str
   token_type: str