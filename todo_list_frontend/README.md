# Todo List Frontend (React)

A minimal React app with a modern "Ocean Professional" theme to manage a personal todo list.

## Environment Variables

The frontend uses environment variables to locate the backend API:

- REACT_APP_API_BASE (preferred)
- REACT_APP_BACKEND_URL (fallback)
- Default: http://localhost:3001 if none are set

Example `.env`:

REACT_APP_API_BASE=http://localhost:3001
REACT_APP_FRONTEND_URL=http://localhost:3000

## Scripts

- npm start
- npm test
- npm run build

## Styling

The app applies the Ocean Professional theme with:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Modern UI with rounded corners, subtle shadows, and smooth transitions.

## Functionality

- Load todos from backend
- Add new todos
- Edit title
- Toggle completion
- Delete todo
- Optimistic updates and basic error handling
