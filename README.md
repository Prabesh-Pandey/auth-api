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

```bash
npm run dev
```

## Known issues / TODOs

- Routes folder is empty — register/login endpoints are not mounted yet (create route files and `app.use` them).
- `middleware/authMiddleware.js` is currently empty — implement token verification and attach `req.user`.
- Minor bugs in `controllers/authController.js`: inconsistent casing and variable names may cause runtime errors on Linux (e.g. requiring `../models/User` vs the actual file `models/user.js` and `exist` uses `user`/`User` inconsistently). Review and fix those before running.
- No tests are present; `package.json` `test` script is a placeholder.

## Next steps (suggested)

1. Add route files and mount them in `app.js`.
2. Implement `authMiddleware` and protect routes like `/profile`.
3. Fix controller require/name issues and add input validation.
4. Add basic tests and CI triggers.
