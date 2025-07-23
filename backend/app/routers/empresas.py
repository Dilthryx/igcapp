from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.config import get_db
from ..models.models import Empresa
from ..schemas.schemas import EmpresaCreate, Empresa as EmpresaSchema

router = APIRouter()

@router.get("/", response_model=List[EmpresaSchema])
def get_empresas(db: Session = Depends(get_db)):
    return db.query(Empresa).all()

@router.post("/", response_model=EmpresaSchema)
def create_empresa(empresa: EmpresaCreate, db: Session = Depends(get_db)):
    db_empresa = Empresa(**empresa.dict())
    db.add(db_empresa)
    db.commit()
    db.refresh(db_empresa)
    return db_empresa

@router.get("/{empresa_id}", response_model=EmpresaSchema)
def get_empresa(empresa_id: int, db: Session = Depends(get_db)):
    empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa not found")
    return empresa