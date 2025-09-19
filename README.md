# Node JWT Auth

Simple Node + Express + Mongoose example implementing JWT Bearer auth using ES modules.

## Setup

1. Clone
2. `npm install`
3. Create `.env` with `PORT`, `MONGO_URI`, `JWT_SECRET`
4. `npm run dev`

## Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/users/me (protected)

## Notes

- Passwords are hashed using bcrypt.
- JWT token expiry controlled via `JWT_EXPIRY` env var.
- For production: use HTTPS, strong JWT secret, refresh tokens, rate limiting, helmet, input validation, logging.

## Postman EndPoints :

1. Register User

Request Method: POST
URL: {{baseUrl}}/auth/register
Headers:Content-Type: application/json
Body (raw JSON) :

{
"username": "test",
"email": "test@example.com",
"password": "secret123"
}

Success Response (201):
{
"message": "User registered successfully"
}

Failure Response (409 – Email exists):
{
"message": "Email already registred"
}

2. Login User:

---

Request Method: POST
URL: {{baseUrl}}/auth/login
Headers:Content-Type: application/json
Body (raw JSON):
{
"email": "test@example.com",
"password": "secret123"
"
}
Success Response (200):

{
"message": "Login Successful",
"token": "eyJhbGciOiJIUzI1........."
}

Failure Response (401 – Wrong credentials):
{
"message": "Invalid credentials"
}

3. Access Protected User Route
   Method: GET
   URL: http://localhost:5000/api/users/me
   Headers:
   Authorization: Bearer <paste_token_here>
