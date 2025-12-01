# Treasure Hunt Backend

Node + Express API that stores treasure hunt rounds, teams, and live game state in MongoDB.

## Getting started

```bash
cd server
cp env.example .env
npm install
npm run dev
```

The dev server boots on `http://localhost:5000` by default. Update `CLIENT_URL` in the `.env` file if your frontend runs on another origin.

## Available scripts

- `npm run dev` – starts the server with `tsx` and file watching
- `npm run build` – compiles TypeScript to `dist`
- `npm start` – runs the compiled JS from `dist`
- `npm run lint` – ESLint with the TypeScript plugin

## REST API overview

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/rounds` | Create a round and auto-generate a QR ID |
| `GET` | `/api/rounds` | List rounds ordered by number |
| `PATCH` | `/api/rounds/:id` | Update round fields |
| `DELETE` | `/api/rounds/:id` | Remove a round |
| `POST` | `/api/teams` | Register a team with a unique start code |
| `GET` | `/api/teams` | List teams and statuses |
| `POST` | `/api/teams/:id/start-code` | Assign or auto-generate a unique start code for a team |
| `POST` | `/api/game/start` | Team enters the start code to obtain the current clue |
| `POST` | `/api/game/qr-scan` | Instructor or scanner reports a successful QR scan |
| `POST` | `/api/game/unlock` | Instructor unlocks the next round with the round code |
| `GET` | `/api/game/leaderboard` | Live ordering for the Instructor panel |
| `GET` | `/api/game/unlock-codes` | Unlock code statuses (pending / active / used) |
| `GET` | `/api/game/stats` | Aggregate stats for the Admin dashboard |

Each endpoint returns JSON and surfaces validation errors via standard HTTP codes. Refer to the controller files under `src/controllers` for the complete shapes.

