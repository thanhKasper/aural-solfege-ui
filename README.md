# Aural Solfege UI

Training your ear to become a better musician. Turn from a simple music enjoyer into a music guru — listen to songs and detect the notes and chords being played.

## About

Aural Solfege UI is a frontend application for building and running interval ear-training exercise sessions. Browse existing exercises, design custom training plans with a drag-and-drop builder, and work through listening sessions that sharpen interval recognition.

## Features

- **Browse exercises** — explore the exercise catalog with paginated cards
- **Create exercises** — build custom training plans from activity blocks using an intuitive drag-and-drop builder
- **Run training sessions** — practice interval listening, interval pitch comparison, and timed cooldown breaks
- **Instant feedback** — get immediate right/wrong feedback on pitch comparison questions
- **Session results** — review performance after every completed session

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| UI library | MUI v9 + Emotion |
| State management | Redux Toolkit (dialogs) |
| Server state | TanStack React Query |
| Forms | React Hook Form |
| Routing | React Router v7 |
| HTTP client | Axios |
| Drag & drop | Custom engine (no third-party library) |

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 4 (the repo is managed with Yarn 4.14.1; enable via `corepack enable`)

### Install & run

```bash
yarn install
yarn dev
```

The dev server runs on port **3000**.

### Other scripts

| Script | Description |
| --- | --- |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Preview the production build |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | Run the TypeScript compiler |

## Configuration

The app is served under the **`/aural-solfege`** base path. During development, API requests are proxied to the backend at `localhost:8080`:

- `/aural-solfege/api` → `http://localhost:8080/api`
- `/sound-repo/api` → `http://localhost:8080/api`

Available path aliases: `@` → `src/`, `@components` → `src/components`, `@router` → `src/router`.

## Project Structure

```
src/
├── pages/                    # Route-level pages (Overview, Exercises, ExerciseSession)
├── components/
│   ├── atoms/                # Small building blocks
│   ├── molecules/            # Composite units
│   ├── organisms/            # Header, Footer, Dialog, custom DragAndDrop engine
│   ├── common/practiceStep/  # Practice-step renderer engine for sessions
│   └── ExerciseFormatsDragAndDrop/  # Training-plan builder + activity transforms
├── providers/
│   ├── auralSolfege/         # Exercise/session API client + DTOs
│   └── musicAudio/           # Audio-file API client
├── services/dialog/          # Global dialog hook
├── store/                    # Redux store (modal slice)
├── layouts/                  # App layout shell (Header, Outlet, Footer)
├── router/                   # Route definitions
└── theme.tsx                 # MUI design system (palettes, typography, components)
```

## Backend Contract

The UI expects a Spring-style backend returning paged DTOs:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/exercises` | List exercises (paginated) |
| `GET` | `/exercises/{id}` | Get a single exercise |
| `POST` | `/exercises` | Create an exercise |
| `POST` | `/exercises/{id}/sessions` | Start a training session |
| `POST` | `/sessions/{id}/advance` | Advance to the next practice step |
| `POST` | `/sessions/{id}/conclude` | Conclude a session |

Audio is served through a separate `/sound-repo/api` client.