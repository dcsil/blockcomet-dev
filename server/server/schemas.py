from datetime import datetime
from itertools import product
from fastapi import FastAPI
from pydantic import BaseModel, Field, Extra
from typing import Optional, List, Dict

class DataField(BaseModel):
   key: str
   value: str

class InProduct(BaseModel):
   data: List[DataField]

class ProductDataResponse(BaseModel):
   product_data: List[DataField]
   added_by: str

class ResponseProduct(BaseModel):
   data: ProductDataResponse


class User(BaseModel):
   id: str
   name: str
   email: str
   is_superuser: bool
   hashed_password: str

class SuccessfulLogin(BaseModel):
   access_token: str
   token_type: str