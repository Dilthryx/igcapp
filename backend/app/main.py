from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.config import Base, engine
from .routers import empresas, obras

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="IGC Nominas API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(empresas.router, prefix="/api/empresas", tags=["empresas"])
app.include_router(obras.router, prefix="/api/obras", tags=["obras"])

@app.get("/")
def read_root():
    return {"message": "IGC Nominas API"}