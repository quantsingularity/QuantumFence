# QuantumFence

![CI/CD Status](https://img.shields.io/github/actions/workflow/status/quantsingularity/QuantumFence/cicd.yml?branch=main&label=CI/CD&logo=github)
[![Test Coverage](https://img.shields.io/badge/coverage-85%25-green)](https://github.com/quantsingularity/QuantumFence/tree/main/tests)
[![License](https://img.shields.io/github/license/quantsingularity/QuantumFence)](https://github.com/quantsingularity/QuantumFence/blob/main/LICENSE)

### Quantum-Accelerated Perimeter Defense AI System

> **AI-powered multi-camera perimeter security with real-time drone detection, geofencing, and Claude AI threat analysis.**

---

## Tech Stack

| Layer                | Technology                                             |
| -------------------- | ------------------------------------------------------ |
| Frontend             | React 18, Vite, React Router, Axios, Leaflet, Recharts |
| Backend              | FastAPI, SQLAlchemy 2.0, Uvicorn                       |
| AI / Computer Vision | YOLOv8 (Ultralytics), PyTorch, OpenCV                  |
| Threat Analysis      | Claude (Anthropic API)                                 |
| Database             | PostgreSQL 16 (production), SQLite (development)       |
| Cache                | Redis 7                                                |
| Monitoring           | Prometheus, Grafana                                    |
| Infrastructure       | Docker, Kubernetes, Terraform, Nginx                   |
| CI/CD                | GitHub Actions                                         |

---

## Project Structure

```
QuantumFence/
├── code/
│   ├── backend/            # FastAPI REST API, WebSocket hub, and services
│   ├── ai_models/           # YOLOv8 detection and drone tracking
│   └── integrations/        # Google Maps / Google Earth KML export
├── docs/                    # Project documentation
├── infrastructure/           # Docker, Kubernetes, Terraform, Nginx configs
├── frontend/                # React (Vite) web dashboard
├── scripts/                  # Setup, seeding, deployment, and maintenance scripts
├── .github/workflows/         # CI pipeline (cicd.yml)
├── LICENSE
└── README.md
```

---

## Quick Start

### 1. Prerequisites

| Requirement | Minimum Version    |
| ----------- | ------------------ |
| Python      | 3.10+              |
| Node.js     | 18+                |
| Git         | any recent version |

### 2. Install

```bash
git clone https://github.com/quantsingularity/QuantumFence
cd QuantumFence
bash scripts/setup/setup.sh --dev
```

### 3. Configure API Keys

Edit `code/backend/.env`:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
GOOGLE_MAPS_API_KEY=your-google-maps-key
```

### 4. Seed Demo Data

```bash
cd code/backend && source venv/bin/activate
python ../../scripts/setup/migrate_and_seed.py
```

### 5. Start

```bash
bash scripts/deployment/start.sh
```

### 6. Access

| Resource      | Location                                                   |
| ------------- | ---------------------------------------------------------- |
| Frontend      | http://localhost:3000 - opens on the public homepage       |
| API Docs      | http://localhost:8000/api/docs                             |
| Default login | `admin` / `quantumfence` (seeded by `migrate_and_seed.py`) |

From the homepage, sign in with an existing account or create a new one; both
lead to the protected `/dashboard` and the rest of the command center. New
self-service signups always land as an operator - only an admin can grant
other roles from Settings → Users.

---

## Docker Deployment

```bash
cd infrastructure/docker
cp .env.example .env   # Edit with your API keys
docker-compose up -d
```

| Service      | Image                     | Port(s)     | Purpose                    |
| ------------ | ------------------------- | ----------- | -------------------------- |
| `backend`    | built from `code/backend` | 8000        | REST API and WebSocket hub |
| `frontend`   | built from `frontend`     | 80, 443     | Serves the web dashboard   |
| `db`         | `postgres:16-alpine`      | 5432        | Primary database           |
| `redis`      | `redis:7-alpine`          | 6379        | Cache and pub/sub          |
| `prometheus` | `prom/prometheus:v2.53.0` | 9090        | Metrics collection         |
| `grafana`    | `grafana/grafana:11.1.0`  | 3001 → 3000 | Metrics dashboards         |

---

## Features

### Camera Management

| Capability           | Details                                            |
| -------------------- | -------------------------------------------------- |
| Camera types         | IP, RTSP, USB, and HTTP-MJPEG, unlimited cameras   |
| Per-camera config    | Independent detection settings for each camera     |
| PTZ control          | Pan-tilt-zoom support where the camera supports it |
| Night vision tagging | Flag cameras for low-light detection tuning        |
| Live status          | Real-time online/offline state over WebSocket      |

### AI Detection (YOLOv8)

| Capability            | Details                                               |
| --------------------- | ----------------------------------------------------- |
| Person detection      | Flags people near the fence perimeter                 |
| Vehicle detection     | Cars, trucks, motorcycles, and buses                  |
| Drone/UAV detection   | Includes trajectory tracking                          |
| Multi-object tracking | Approach vector analysis across frames                |
| Swarm detection       | Identifies multiple coordinated drones                |
| Confidence filtering  | Alerts only above a configurable confidence threshold |

### Claude AI Threat Analysis

| Capability                   | Details                                    |
| ---------------------------- | ------------------------------------------ |
| Threat summaries             | Natural-language explanation for operators |
| Risk scoring                 | 0.0 to 1.0 score per detection             |
| Recommended actions          | Suggested immediate response               |
| Drone purpose classification | Surveillance, recreational, or hostile     |
| Multi-threat coordination    | Flags related threats across cameras       |

### Geospatial Intelligence

| Capability          | Details                                         |
| ------------------- | ----------------------------------------------- |
| Map providers       | Google Maps and OpenStreetMap satellite view    |
| KML export          | For Google Earth Pro                            |
| Geofence zones      | Draw and manage polygon or circle zones         |
| Camera FOV overlay  | Visualizes field of view on the map             |
| Threat heatmap      | Overlay of recent activity                      |
| Location estimation | Real-world position estimated from bounding box |

### Drone Watch

| Capability           | Details                                    |
| -------------------- | ------------------------------------------ |
| Radar display        | Animated live radar                        |
| Trajectory analysis  | Live path tracking                         |
| Altitude and speed   | Estimated in real time                     |
| Authorization status | Authorized vs. unauthorized classification |
| Loitering detection  | Flags drones lingering in one area         |

### Analytics

| Capability         | Details                       |
| ------------------ | ----------------------------- |
| Detection timeline | Chart of detections over time |
| Alert distribution | Breakdown by alert type       |
| Camera performance | Per-camera metrics            |
| Trend windows      | 24h, 7d, and 30d views        |

### Notifications

| Capability   | Details                               |
| ------------ | ------------------------------------- |
| Email alerts | HTML emails with snapshot attachments |
| Webhooks     | Slack, Teams, or a custom endpoint    |
| Escalation   | Severity-based escalation rules       |
| Cooldown     | Prevents alert storms                 |

### Security

| Capability     | Details                            |
| -------------- | ---------------------------------- |
| Authentication | JWT with refresh tokens            |
| Roles          | Admin, Operator, and Viewer        |
| Audit trail    | All actions logged to the database |

---

## API Reference

Full Swagger docs at: `http://localhost:8000/api/docs`

| Method | Endpoint                       | Description                         |
| ------ | ------------------------------ | ----------------------------------- |
| POST   | `/api/auth/register`           | Create a new account (self-service) |
| POST   | `/api/auth/login`              | Authenticate and get a JWT          |
| GET    | `/api/auth/me`                 | Get the current user's profile      |
| PUT    | `/api/auth/me`                 | Update own profile (name/email)     |
| POST   | `/api/auth/change-password`    | Change own password                 |
| GET    | `/api/auth/users`              | List all users (admin only)         |
| PATCH  | `/api/auth/users/{id}`         | Update a user's role/status (admin) |
| GET    | `/api/cameras`                 | List all cameras                    |
| POST   | `/api/cameras`                 | Add a new camera                    |
| GET    | `/api/alerts`                  | List alerts with filters            |
| POST   | `/api/alerts/{id}/acknowledge` | Acknowledge an alert                |
| GET    | `/api/drones`                  | Drone detection log                 |
| GET    | `/api/analytics/overview`      | System overview stats               |
| GET    | `/api/geofences`               | List geofence zones                 |
| POST   | `/api/geofences`               | Create a geofence zone              |
| PUT    | `/api/geofences/{id}`          | Update a geofence zone              |
| DELETE | `/api/geofences/{id}`          | Delete a geofence zone              |
| WS     | `/ws/{client_id}`              | Real-time event stream              |

---

## Configuration

Key settings in `code/backend/.env`:

| Variable                     | Description                      | Default            |
| ---------------------------- | -------------------------------- | ------------------ |
| `ANTHROPIC_API_KEY`          | Claude AI API key                | -                  |
| `GOOGLE_MAPS_API_KEY`        | Maps/satellite imagery           | -                  |
| `DETECTION_CONFIDENCE`       | YOLOv8 minimum confidence        | `0.5`              |
| `AI_CONFIDENCE_THRESHOLD`    | Threshold to trigger AI analysis | `0.65`             |
| `FRAME_SKIP`                 | Process every N-th frame         | `3`                |
| `MAX_CAMERAS`                | Maximum concurrent cameras       | `64`               |
| `DEFAULT_MAP_CENTER_LAT/LNG` | Default map center coordinates   | `33.6844, 73.0479` |

---

## WebSocket Events

Connect to `ws://localhost:8000/ws/{client_id}` for live events:

| Event type        | Fired when                                         |
| ----------------- | -------------------------------------------------- |
| `alert`           | A new alert is created                             |
| `detection`       | A camera reports new detections                    |
| `drone_detection` | A drone is detected, with an assessed threat level |
| `camera_status`   | A camera goes online or offline                    |

```json
{ "type": "alert",           "data": { ... } }
{ "type": "detection",       "data": { "camera_id": 1, "detections": [...] } }
{ "type": "drone_detection", "data": { "camera_id": 1, "threat_level": "high" } }
{ "type": "camera_status",   "camera_id": "1", "status": "online" }
```

---

## Production Deployment

| Method                       | Command                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| Docker Compose (recommended) | `docker-compose up -d` (see [Docker Deployment](#docker-deployment))                 |
| Kubernetes                   | `kubectl apply -f infrastructure/kubernetes/k8s-deployment.yml`                      |
| AWS (Terraform)              | `cd infrastructure/terraform && terraform init && terraform plan && terraform apply` |

Docker Compose brings up the full stack: FastAPI backend, React frontend
(behind Nginx), PostgreSQL, Redis, Prometheus, and Grafana.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
