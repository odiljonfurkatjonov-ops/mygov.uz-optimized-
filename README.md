# Gov Services App

This repo contains both the frontend (Vite/React) and backend (Python NLP + RAG) for the my.gov.uz assistant.

## Layout

- `frontend/` Vite React app
- `backend/` Python NLP pipeline + API + RAG CLI

## Backend (Python)

1. Create/activate venv (optional but recommended)
2. Install deps:

```bash
python -m pip install -r backend/requirements.txt
```

3. Run the API server:

```bash
python backend/api.py
```

4. Run the RAG CLI:

```bash
python backend/rag_chat.py en
```

## Frontend (Vite)

1. Install deps:

```bash
cd frontend
npm install
```

2. Create `.env.local` with your Base44 values:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
```

3. Start dev server:

```bash
npm run dev
```

Open `http://127.0.0.1:5173`.

## Data Export

If you update the frontend service catalog and want to re-export the JSON used by the backend:

```bash
node frontend/scripts/export_catalog.mjs
```

This writes to `backend/data/services_catalog.json`.

## Project structure (frontend)

- `frontend/src/main.jsx`: app entry point
- `frontend/src/App.jsx`: app shell, providers, router, auth gate
- `frontend/src/pages/Home.jsx`: main page flow
- `frontend/src/components/gov/`: feature UI for the government-search experience
- `frontend/src/components/ui/`: shared UI primitives
- `frontend/src/lib/`: app state, translations, search logic, shared helpers
- `frontend/src/data/services.js`: canonical service dataset and situation chains
- `frontend/src/api/base44Client.js`: Base44 client setup
