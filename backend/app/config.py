import os
from pydantic_settings import BaseSettings

DEFAULT_SECRET_KEY = "xedo_super_secure_jwt_secret_key_2026_dev_prod"


class Settings(BaseSettings):
    PROJECT_NAME: str = "XEDO"
    PROJECT_TAGLINE: str = "Detect. Connect. Predict. Protect."
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", DEFAULT_SECRET_KEY)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./xedo.db")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    CORS_ORIGINS: str = ",".join([
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000",
    ])

    class Config:
        env_file = ".env"
        extra = "allow"

try:
    settings = Settings()
except Exception:
    # Fallback without pydantic-settings if not present
    class FallbackSettings:
        PROJECT_NAME = "XEDO"
        PROJECT_TAGLINE = "Detect. Connect. Predict. Protect."
        API_V1_STR = "/api"
        SECRET_KEY = os.getenv("SECRET_KEY", DEFAULT_SECRET_KEY)
        ALGORITHM = "HS256"
        ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
        DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./xedo.db")
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
        ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
        CORS_ORIGINS = ",".join([
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174",
            "http://127.0.0.1:3000",
        ])
    settings = FallbackSettings()

if settings.ENVIRONMENT.lower() == "production" and settings.SECRET_KEY == DEFAULT_SECRET_KEY:
    raise RuntimeError("Set a unique SECRET_KEY before running XEDO in production.")
