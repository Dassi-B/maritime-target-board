from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import random, asyncio, json

from database import init_db

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Target(BaseModel):
    id: int
    lat: float
    lon: float
    type: str
    threat_level: str
    updated_at: datetime

# In-memory store
targets = [
    {
        "id": i,
        "lat": random.uniform(-90, 90),
        "lon": random.uniform(-180, 180),
        "type": random.choice(["ship", "submarine", "drone"]),
        "threat_level": random.choice(["low", "medium", "high"]),
        "updated_at": datetime.utcnow().isoformat()
    }
    for i in range(25)
]

clients = []

@app.get("/targets", response_model=List[Target])
async def get_targets():
    return targets

@app.websocket("/stream")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            await asyncio.sleep(0.1)
    except Exception:
        clients.remove(websocket)

async def mutate_targets():
    while True:
        await asyncio.sleep(3)
        to_update = random.sample(targets, 3)
        for t in to_update:
            t["threat_level"] = random.choice(["low", "medium", "high"])
            t["updated_at"] = datetime.utcnow().isoformat()

        for ws in clients:
            for t in to_update:
                await ws.send_text(json.dumps(t))

@app.on_event("startup")
async def startup_event():
    init_db()
    asyncio.create_task(mutate_targets())

