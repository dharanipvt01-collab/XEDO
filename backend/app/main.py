from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database.session import engine, Base, SessionLocal
from app.database.seed_data import seed_database
from app.api import (
    auth, analyze, threats, campaigns, investigations,
    cases, evidence, copilot, dashboard, demo
)

# Initialize database tables
Base.metadata.create_all(bind=engine)

# Seed initial data
with SessionLocal() as db:
    seed_database(db)

app = FastAPI(
    title="XEDO - Digital Risk Intelligence & Protection Platform",
    description="Detect. Connect. Predict. Protect. Next-generation AI security operating system.",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in settings.CORS_ORIGINS.split(",")
        if origin.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(analyze.router, prefix=settings.API_V1_STR)
app.include_router(threats.router, prefix=settings.API_V1_STR)
app.include_router(campaigns.router, prefix=settings.API_V1_STR)
app.include_router(investigations.router, prefix=settings.API_V1_STR)
app.include_router(cases.router, prefix=settings.API_V1_STR)
app.include_router(evidence.router, prefix=settings.API_V1_STR)
app.include_router(copilot.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)
app.include_router(demo.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "platform": "XEDO",
        "tagline": "Detect. Connect. Predict. Protect.",
        "version": "2.0.0",
        "status": "online",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "platform": "XEDO AI Security Operating System",
        "timestamp": "2026-10-08T20:30:00Z"
    }
