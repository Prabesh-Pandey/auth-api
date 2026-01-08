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

# Auth API

Simple Express authentication API using JWT (access + refresh) and bcrypt password hashing.

**Prerequisites**

- Node.js 18+ and npm
- MongoDB instance (local or cloud)

**Install**

```bash
npm install
```

**Environment**

Copy the example file and set real secrets:

```bash
cp .env.example .env
# edit .env with secure secrets
```

- `MONGO_URI` — MongoDB connection string
- `JWT_ACCESS_SECRET` — secret for access tokens
- `JWT_REFRESH_SECRET` — secret for refresh tokens
- `PORT` — optional (default: `3000`)

**Run**

```bash
npm run dev
```

**Scripts**

# Auth API

Lightweight Express authentication service using JWT (access + refresh) and bcrypt.

Overview

- Routes mounted under `/api/auth` provide register, login and a protected profile endpoint.
- Tokens: short-lived access token (`15m`) and refresh token (`7d`).

Quick start

1. Install dependencies:

```bash
npm install
```

2. Create an environment file from the example and set secrets:

```bash
cp .env.example .env
# edit .env and set secure values
```

3. Run the server:

```bash
npm start      # production
npm run dev    # development (nodemon)
```

Environment variables

- `MONGO_URI` — MongoDB connection string (required)
- `JWT_ACCESS_SECRET` — secret for access tokens (required)
- `JWT_REFRESH_SECRET` — secret for refresh tokens (required)
- `PORT` — optional (default: `3000`)

Endpoints

- `POST /api/auth/register`

  - Body: `{ "email": "...", "password": "..." }`
  - 201 Created on success

- `POST /api/auth/login`

  - Body: `{ "email": "...", "password": "..." }`
  - Response: `{ accessToken, refreshToken }`

- `GET /api/auth/profile` (protected)
  - Header: `Authorization: Bearer <accessToken>`
  - Response: `200` with user payload from token

Examples

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

Notes

- `models/user.js` sets `password` with `select: false`. Login explicitly selects the password field.
- Ensure `.env` contains secure JWT secrets before running.
- Consider adding input validation (e.g., `express-validator`), tests, and a logout/refresh flow for production.

Files of interest

- `server.js` — app entry + DB connection
- `app.js` — Express app, middleware, route mounting
- `routes/authRoutes.js` — auth routes and protected `profile`
- `controllers/authController.js` — register/login logic
- `middleware/authMiddleware.js` — verifies access tokens
- `models/user.js` — Mongoose schema
