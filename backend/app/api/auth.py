from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt
from app.database.session import get_db
from app.models.models import User
from app.schemas.schemas import UserLogin, Token, UserResponse
from app.config import settings
import hashlib

router = APIRouter(prefix="/auth", tags=["Authentication"])

def get_hash(password: str) -> str:
    return hashlib.sha256(f"xedo_salt_{password}".encode("utf-8")).hexdigest()

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    pwd_hash = get_hash(credentials.password)
    user = db.query(User).filter(
        (User.username == credentials.username) | (User.email == credentials.username)
    ).first()

    if not user or user.hashed_password != pwd_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Use citizen/analyst/admin with 'password123'."
        )

    token = create_access_token({
        "sub": user.username,
        "id": user.id,
        "role": user.role,
        "email": user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "safety_score": user.safety_score
        }
    }

@router.get("/me")
def get_current_user(role: str = "citizen", db: Session = Depends(get_db)):
    user = db.query(User).filter(User.role == role).first()
    if not user:
        user = db.query(User).first()
    return user
