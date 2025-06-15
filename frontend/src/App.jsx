import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const threatColors = {
  low: "#a3e635",
  medium: "#facc15",
  high: "#f87171"
};

export function TargetTable({ targets, onSelect }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Threat</th>
          <th>Updated Ago</th>
        </tr>
      </thead>
      <tbody>
        {targets.map((t) => (
          <tr
            key={t.id}
            style={{ backgroundColor: threatColors[t.threat_level] || "white" }}
            onClick={() => onSelect(t)}
          >
            <td>{t.id}</td>
            <td>{t.type}</td>
            <td>{t.threat_level}</td>
            <td>{Math.round((Date.now() - new Date(t.updated_at)) / 1000)}s ago</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MapPan({ selected }) {
  const map = useMap();
  useEffect(() => {
    if (selected) {
      map.setView([selected.lat, selected.lon], 6);
    }
  }, [selected]);
  return null;
}

function App() {
  const [targets, setTargets] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/targets").then((res) => {
      setTargets(res.data);
    });

    const ws = new WebSocket("ws://localhost:8000/stream");


ws.onopen = () => {
  console.log("✅ WebSocket connected");
};

ws.onerror = (error) => {
  console.error("❌ WebSocket error:", error);
};

ws.onclose = () => {
  console.warn("⚠️ WebSocket closed");
}
    ws.onmessage = (msg) => {
      console.log(msg.data);
      const updated = JSON.parse(msg.data);
      console.log(updated);
      setTargets((prev) => {
        const copy = [...prev];
        const idx = copy.findIndex((t) => t.id === updated.id);
        if (idx !== -1) copy[idx] = updated;
        return copy;
      });
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <TargetTable targets={targets} onSelect={setSelected} />
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selected && (
          <Marker
            position={[selected.lat, selected.lon]}
            icon={L.icon({
              iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
              iconSize: [25, 41]
            })}
          />
        )}
        <MapPan selected={selected} />
      </MapContainer>
    </div>
  );
}

export default App;
