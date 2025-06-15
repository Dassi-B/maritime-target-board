from fastapi.testclient import TestClient
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app.main import app 

client = TestClient(app)

def test_get_targets_happy_path():
    response = client.get("/targets")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:  # If any targets exist
        target = data[0]
        assert "id" in target
        assert "type" in target
        assert "lat" in target
        assert "lon" in target
        assert "threat_level" in target
        assert "updated_at" in target