# VectorShift Pipeline Builder

Frontend technical assessment project for building and validating visual AI pipeline graphs.

The app uses React Flow for the canvas, Zustand for graph state, and a small FastAPI backend for pipeline validation.

## Features

- n8n-style left node palette with draggable node types.
- React Flow canvas with pan, zoom, drag, connect, minimap, controls, and animated colored edges.
- Reusable `BaseNode` abstraction for common node layout, headers, handles, labels, and accent colors.
- 9 node types: Input, Output, LLM, Text, Prompt, File, API, Transform, and Condition.
- Dynamic Text node variables: typing `{{ variableName }}` creates input handles automatically.
- Light/dark theme toggle with `localStorage` persistence.
- First-run onboarding tutorial, plus a sidebar Tutorial button to replay it anytime.
- Empty canvas helper with a sample Input -> Text -> LLM -> Output flow.
- Delete Selected and Clear Canvas controls.
- Submit Pipeline panel showing node count, edge count, and DAG/cycle status.

## What Is Intentionally Not Included

- No real LLM execution.
- No real API request execution from the API node.
- No file parsing or uploading from the File node.
- No auth, database, deployment setup, or external service integration.

## Tech Stack

Frontend:

- React 18
- React Flow 11
- Zustand 4
- Create React App
- Plain CSS variables and custom CSS

Backend:

- Python
- FastAPI
- Pydantic
- CORS middleware for `http://localhost:3000`

## Project Structure

```text
backend/
  main.py

frontend/
  src/
    App.js
    index.css
    toolbar.js
    draggableNode.js
    ui.js
    store.js
    submit.js
    components/
      EmptyCanvasGuide.js
      OnboardingTutorial.js
      ThemeToggle.js
    nodes/
      BaseNode.js
      inputNode.js
      outputNode.js
      llmNode.js
      textNode.js
      promptNode.js
      fileNode.js
      apiNode.js
      transformNode.js
      conditionNode.js
```

## Run Locally

Start the backend:

```bash
cd backend
uvicorn main:app --reload
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

Backend runs at:

```text
http://localhost:8000
```

## Backend API

Health check:

```text
GET /
```

Response:

```json
{ "Ping": "Pong" }
```

Pipeline validation:

```text
POST /pipelines/parse
```

Request body:

```json
{
  "nodes": [],
  "edges": []
}
```

Response:

```json
{
  "num_nodes": 0,
  "num_edges": 0,
  "is_dag": true
}
```

The backend checks whether the directed graph is a DAG using DFS cycle detection.

## Useful LocalStorage Keys

- `vs_theme`: stores `light` or `dark`.
- `vs_tutorial_seen`: stores whether the first-run tutorial has been dismissed.

Use the sidebar Tutorial button to reopen the tutorial without clearing localStorage.

## Build

```bash
cd frontend
npm run build
```

The production build is written to `frontend/build`.
