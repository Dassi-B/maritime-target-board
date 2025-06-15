# backend/models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class Target(Base):
    __tablename__ = "targets"

    id = Column(Integer, primary_key=True)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    type = Column(String, nullable=False)
    threat_level = Column(String, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow)
