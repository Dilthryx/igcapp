from pydantic import BaseModel
from datetime import date
from typing import Optional

class EmpresaBase(BaseModel):
    nombre: str

class EmpresaCreate(EmpresaBase):
    pass

class Empresa(EmpresaBase):
    id: int
    
    class Config:
        from_attributes = True

class ObraBase(BaseModel):
    nombre: str
    empresa_id: int
    sub_contrato: Optional[str] = None
    no_procedimiento: Optional[str] = None
    descripcion_obra: Optional[str] = None
    monto_sin_iva: Optional[float] = None
    monto_total: Optional[float] = None
    monto_sin_iva_sub: Optional[float] = None
    monto_total_sub: Optional[float] = None
    clave_siroc_origen: Optional[str] = None
    clave_siroc_sub: Optional[str] = None
    fecha_inicio_contrato: Optional[date] = None
    fecha_termino_contrato: Optional[date] = None
    fecha_apertura_siroc: Optional[date] = None
    fecha_termino_siroc: Optional[date] = None
    m2_construccion: Optional[float] = None
    imss_teorico: Optional[float] = None
    ubicacion_cp: Optional[str] = None
    ubicacion_referencia: Optional[str] = None

class ObraCreate(ObraBase):
    pass

class Obra(ObraBase):
    id: int
    
    class Config:
        from_attributes = True