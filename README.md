# Auth API

Small Express-based authentication service using JWT and bcrypt.

## What’s implemented

- `app.js` — Express app with `helmet()` and JSON body parsing.
- `server.js` — Loads environment, connects to MongoDB via `config/db.js`, and starts the server.
- `config/db.js` — MongoDB connection helper (reads `MONGO_URI`).
- `models/user.js` — Mongoose `User` model with `email`, `password` (not selected by default), `role`, and `refreshToken`.
- `utils/hash.js` — `hashPassword` and `comparePassword` using `bcrypt`.
- `utils/jwt.js` — `generateAccessToken` and `generateRefreshToken` using `jsonwebtoken`.
- `controllers/authController.js` — `register` and `login` controller functions (creates users, issues tokens).

## Available (planned) endpoints

- `POST /register` — register a new user (controller implemented, route file currently not present).
- `POST /login` — authenticate and receive `accessToken` + `refreshToken`.
- `GET /profile` — protected endpoint (middleware needs implementation and route wiring).

## Environment variables

Set the following in a `.env` file or environment:

- `MONGO_URI` — MongoDB connection string.
- `JWT_ACCESS_SECRET` — secret for access tokens.
- `JWT_REFRESH_SECRET` — secret for refresh tokens.
- `PORT` — optional, defaults to `3000`.

## How to run

Install and start:

```bash
npm install
npm start
```

For development with auto-reload:

# Auth API

Small Express-based authentication service demonstrating JWT access/refresh tokens and password hashing with bcrypt.

## What’s implemented

- `app.js` — Express app with `helmet()` and JSON body parsing (routes are not mounted by default).
- `server.js` — Loads environment, connects to MongoDB via `config/db.js`, and starts the server.
- `config/db.js` — MongoDB connection helper (reads `MONGO_URI`).
- `models/user.js` — Mongoose `User` model with `email`, `password` (not selected by default), `role`, and `refreshToken`.
- `utils/hash.js` — `hashPassword` and `comparePassword` using `bcrypt`.
- `utils/jwt.js` — `generateAccessToken` and `generateRefreshToken` using `jsonwebtoken`.
- `controllers/authController.js` — `register` and `login` controllers (some bugs present; see Known issues).
- `routes/authRoutes.js` — Express router with `POST /register` and `POST /login`.
- `middleware/authMiddleware.js` — Token authentication middleware that verifies access tokens and sets `req.user`.

## Available endpoints

- `POST /register` — register a new user. Body: `{ "email": "...", "password": "..." }`.
- `POST /login` — login and receive `{ accessToken, refreshToken }`. Body: `{ "email": "...", "password": "..." }`.

Note: The `routes/authRoutes.js` file exists but is not currently mounted in `app.js`. To enable the endpoints, add the following to `app.js`:

```js
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
```

This will expose the endpoints at `/api/auth/register` and `/api/auth/login`.

## Environment variables

Create a `.env` file at the project root with the following values:

- `MONGO_URI` — MongoDB connection string (required).
- `JWT_ACCESS_SECRET` — secret for access tokens (required).
- `JWT_REFRESH_SECRET` — secret for refresh tokens (required).
- `PORT` — optional, defaults to `3000`.

## Installation & Run

Install dependencies and start the server:

```bash
npm install
npm start
```

For development with auto-reload:

```bash
npm run dev
```

Server default listens on the `PORT` env var or `3000`.

## Example requests

Register:

```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"email":"user@example.com","password":"s3cret"}'
```

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"user@example.com","password":"s3cret"}'
```

## Known issues & required fixes

1. `controllers/authController.js` contains a few bugs that will prevent the app from running as-is:

   - It requires `../models/User` (capital `U`) but the model file is `models/user.js`. Change to `require('../models/user')` or export with matching name.
   - In `register`, the code calls `user.findOne(...)` but the model is `User` — replace `user` with `User`.
   - The code sometimes mixes `user` vs `User` when saving/creating. Ensure consistent use of the `User` variable from the required model.

2. `app.js` does not mount `routes/authRoutes.js`. Add the `app.use('/api/auth', authRoutes)` line (see above) to expose endpoints.

3. `utils/jwt.js` and `middleware/authMiddleware.js` expect `JWT_ACCESS_SECRET`/`JWT_REFRESH_SECRET` to be set. Ensure `.env` includes them before starting.

4. `models/user.js` sets `password.select = false`, so when comparing passwords you must explicitly select the password field in queries like `User.findOne({ email }).select('+password')`.

5. There are no tests or input validation. Add request validation and unit tests before production use.

# Auth API

Minimal placeholder README — will be updated when the project is complete.

## Quick start

Install and run:

```bash
npm install
npm start
```

## Environment

- `MONGO_URI` (required)
- `JWT_ACCESS_SECRET` (required)
- `JWT_REFRESH_SECRET` (required)
- `PORT` (optional, default: 3000)
