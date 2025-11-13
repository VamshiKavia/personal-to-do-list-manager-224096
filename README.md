# Project Repository

This repository contains a simple Todo application with:
- React frontend (todo_list_frontend)
- FastAPI backend (see sibling workspace personal-to-do-list-manager-224097/backend)

Frontend runs on port 3000 and reads backend URL from:
- REACT_APP_API_BASE (preferred)
- REACT_APP_BACKEND_URL (fallback)
- Defaults to http://localhost:3001

Backend runs on port 3001. See its README for details.
