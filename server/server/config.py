from pydantic import AnyHttpUrl, BaseSettings, EmailStr, validator
from typing import List, Optional, Union


class Settings(BaseSettings):
    API_V1_STR: str = ""
    JWT_SECRET: str = "TEST_SECRET_DO_NOT_USE_IN_PROD"
    ALGORITHM: str = "HS256"
    DB_USER: str = "admin"
    DB_PASSWORD: str = "admin"
    DB_NAME: str = "users"
    DB_COL_NAME: str = 'blockcomet'
    DB_URI: str = f"mongodb+srv://{DB_USER}:{DB_PASSWORD}@{DB_NAME}.d0ihk.mongodb.net/{DB_COL_NAME}?retryWrites=true&w=majority"
    SIGNATURE: str = 'blockcomet_mvp'
    FRONTEND_URL: str = 'https://blockcomet-frontend-6dkam7pfeq-uc.a.run.app'
    BDB_URL = 'https://test.ipdb.io'

    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    FIRST_SUPERUSER: str = "admin"
    FIRST_SUPERUSER_PW: str = "admin"

    class Config:
        case_sensitive = True


settings = Settings()