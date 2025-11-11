
# Daily Planner App

An app that allows you to keep track of daily notes, task lists, and events. 

## Core Features
- Create / read / update / delete daily notes (plain text + optional rich text)

- Create daily planner entries / tasks with times, durations, completed flag

- Link notes ↔ tasks, tag notes, search, and filter by date

- Daily overview (summary), recurring tasks, simple stats (tasks completed)

- Persisted in PostgreSQL with a REST API

## Tech Stack
### Backend: 
    - Node.js, Express, pg (node-postgres)

### Frontend: 
    - React (Create React App or Vite), functional components + hooks, fetch API

### DB: 
    - PostgreSQL

### Future Features: 
    - JWT authentication, offline/local-first with IndexedDB + sync, web workers, file export (JSON/CSV)