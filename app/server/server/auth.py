from typing import Any, Optional, MutableMapping, List, Union
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from server.schemas import User
from .config import settings
from .security import verify_password
from passlib.hash import bcrypt
from pymongo import MongoClient
from pydantic import BaseModel


class TokenData(BaseModel):
    username: Optional[str] = None

JWTPayloadMapping = MutableMapping[
    str, Union[datetime, bool, str, List[str], List[int]]
]

class test_user:
    id = 'chinmaya'
    hashed_password = bcrypt.hash('password')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/login")
cluster = MongoClient("mongodb+srv://admin:admin@users.d0ihk.mongodb.net/blockcomet?retryWrites=true&w=majority")
db = cluster['blockcomet']
table = db['users']


def authenticate(
    *,
    id: str,
    password: str,
) -> Optional[User]:
    user = table.find_one({'username': id})
    print(user)
    if not user:
        return None
    if not verify_password(password, user['password']):  # 1
        return None
    return user


def create_access_token(*, sub: str) -> str:  # 2
    return _create_token(
        token_type="access_token",
        lifetime=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),  # 3
        sub=sub,
    )


async def get_current_user(
    token: str = Depends(oauth2_scheme)
) -> Any:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.ALGORITHM],
            options={"verify_aud": False},
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = table.find_one({'username': token_data.username})
    if user is None:
        raise credentials_exception
    return user


def _create_token(
    token_type: str,
    lifetime: timedelta,
    sub: str,
) -> str:
    payload = {}
    expire = datetime.utcnow() + lifetime
    payload["type"] = token_type
    payload["exp"] = expire  # 4
    payload["iat"] = datetime.utcnow()  # 5
    payload["sub"] = str(sub)  # 6

    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.ALGORITHM)  # 8