# 🌊 Mini Maritime Target Board

A lightweight real-time maritime monitoring dashboard built with **FastAPI**, **React**, **Leaflet**, and **WebSockets**. Designed for visualizing and interacting with live maritime "target" data on a world map.

---

## 🔧 Tech Stack & Rationale

| Layer        | Technology       | Why It Was Chosen |
|--------------|------------------|--------------------|
| Backend      | FastAPI          | High performance, async WebSocket support, auto-generated docs |
| Frontend     | React + Vite     | Modern, fast dev server & build tool, excellent ecosystem |
| Mapping      | Leaflet + react-leaflet | Lightweight, open-source interactive maps |
| Communication| WebSocket (JSON) | Real-time target updates |
| Containerization | Docker + Compose | Simplified multi-service dev setup |

---

## 🚀 Running the App Locally (with Docker)

Ensure Docker and Docker Compose are installed. Then:

```bash
docker-compose -f docker-compose-dev.yml up --build
