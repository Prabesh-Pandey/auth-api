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

- `start`: runs `node server.js`
- `dev`: runs `nodemon server.js`

**Endpoints**

All endpoints are mounted under `/api/auth`.

- `POST /api/auth/register`

  - Body: `{ "email": "...", "password": "..." }`
  - Response: `201` on success

- `POST /api/auth/login`

  - Body: `{ "email": "...", "password": "..." }`
  - Response: `{ accessToken, refreshToken }` on success

- `GET /api/auth/profile` (protected)
  - Header: `Authorization: Bearer <accessToken>`
  - Response: `200` with `req.user` payload

Example register:

```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"email":"user@example.com","password":"s3cret"}'
```

Example login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"user@example.com","password":"s3cret"}'
```

**Notes & gotchas**

- The `password` field in the `User` model is defined with `select: false`. The login flow explicitly selects the password.
- Make sure `.env` contains valid `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` before starting.
- If MongoDB connection fails, check `MONGO_URI` and network/settings.

**Files of interest**

- `server.js` — starts the app and connects DB
- `app.js` — mounts middleware and routes
- `routes/authRoutes.js` — register/login/profile routes
- `controllers/authController.js` — register/login implementation
- `middleware/authMiddleware.js` — access token verification
- `models/user.js` — user schema

**Next steps**

- Add input validation (e.g., `express-validator`) and tests.
- Implement refresh token rotation and logout endpoint.

---

See `.env.example` for required environment variables.
