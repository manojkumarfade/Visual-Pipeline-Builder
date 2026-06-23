# VectorShift Pipeline Builder

A visual pipeline builder prototype inspired by n8n — drag, connect, and validate AI pipeline graphs in the browser.

Built with React Flow for the node canvas, Zustand for state management, and a FastAPI backend for pipeline DAG validation.

## Features

- Drag-and-drop node palette with 9 node types: Input, Output, LLM, Text, Prompt, File, API, Transform, and Condition.
- React Flow canvas with pan, zoom, drag-to-connect, minimap, grid snapping, and animated colored edges.
- Reusable `BaseNode` abstraction for consistent node layout, headers, handles, labels, and accent colors.
- Dynamic Text node — typing `{{ variableName }}` auto-creates input handles for dynamic wiring.
- Light/dark theme toggle with `localStorage` persistence.
- First-run onboarding tutorial with a replay button in the toolbar.
- Empty canvas guide with a quick-start sample flow (Input → Text → LLM → Output).
- Delete Selected, Clear Canvas, and a Submit button that validates the pipeline graph.
- Pipeline validation returns node count, edge count, and whether the graph is a valid DAG using DFS cycle detection.

## Tech Stack

**Frontend:**
- React 18
- React Flow 11
- Zustand 4
- Create React App
- Plain CSS variables

**Backend:**
- Python / FastAPI
- Pydantic
- CORS middleware

## Project Structure

```text
backend/
  main.py          # FastAPI server with /pipelines/parse endpoint
  requirements.txt

frontend/
  src/
    App.js
    index.css
    toolbar.js      # Left-side node palette + actions
    draggableNode.js
    ui.js           # ReactFlow canvas wrapper
    store.js        # Zustand graph state
    submit.js       # Pipeline submission + result panel
    components/
      EmptyCanvasGuide.js
      OnboardingTutorial.js
      ThemeToggle.js
    nodes/
      BaseNode.js
      inputNode.js    outputNode.js
      llmNode.js      textNode.js
      promptNode.js   fileNode.js
      apiNode.js      transformNode.js
      conditionNode.js
```

## Run Locally

```bash
# Terminal 1 — Backend
cd backend
uvicorn main:app --reload

# Terminal 2 — Frontend
cd frontend
npm install
npm start
```

- Frontend: `http://localhost:3000`
- Backend:  `http://localhost:8000`

## API

### Health Check

```text
GET /
```

```json
{ "Ping": "Pong" }
```

### Pipeline Validation

```text
POST /pipelines/parse
Content-Type: application/json

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

The backend validates whether the directed graph is a DAG using DFS-based cycle detection with 3-color marking.

## Build

```bash
cd frontend
npm run build
```

Output goes to `frontend/build/`.

## Browser Storage

| Key | Purpose |
|-----|---------|
| `vs_theme` | Persists `light` or `dark` theme preference |
| `vs_tutorial_seen` | Tracks whether the first-run tutorial has been dismissed |
