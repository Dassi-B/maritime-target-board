CREATE TABLE IF NOT EXISTS targets (
    id INTEGER PRIMARY KEY,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    type TEXT NOT NULL,
    threat_level TEXT NOT NULL,
    updated_at TEXT NOT NULL
);