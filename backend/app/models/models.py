from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Text
from ..database.config import Base

class Empresa(Base):
    __tablename__ = "empresas"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)

class Obra(Base):
    __tablename__ = "obras"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    empresa_id = Column(Integer, ForeignKey("empresas.id"))
    sub_contrato = Column(String(255))
    no_procedimiento = Column(String(255))
    descripcion_obra = Column(Text)
    monto_sin_iva = Column(Float)
    monto_total = Column(Float)
    monto_sin_iva_sub = Column(Float)
    monto_total_sub = Column(Float)
    clave_siroc_origen = Column(String(255))
    clave_siroc_sub = Column(String(255))
    fecha_inicio_contrato = Column(Date)
    fecha_termino_contrato = Column(Date)
    fecha_apertura_siroc = Column(Date)
    fecha_termino_siroc = Column(Date)
    m2_construccion = Column(Float)
    imss_teorico = Column(Float)
    ubicacion_cp = Column(String(10))
    ubicacion_referencia = Column(Text)