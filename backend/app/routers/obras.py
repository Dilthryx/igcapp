from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.config import get_db
from ..models.models import Obra
from ..schemas.schemas import ObraCreate, Obra as ObraSchema
router = APIRouter()

@router.get("/", response_model=List[ObraSchema])
def get_obras(db: Session = Depends(get_db)):
    return db.query(Obra).all()

@router.post("/", response_model=ObraSchema)
def create_obra(obra: ObraCreate, db: Session = Depends(get_db)):
    db_obra = Obra(**obra.dict())
    db.add(db_obra)
    db.commit()
    db.refresh(db_obra)
    return db_obra

@router.get("/{obra_id}", response_model=ObraSchema)
def get_obra(obra_id: int, db: Session = Depends(get_db)):
    obra = db.query(Obra).filter(Obra.id == obra_id).first()
    if not obra:
        raise HTTPException(status_code=404, detail="Obra not found")
    return obra