# Infinite Social Feed – Backend (Node.js + MongoDB)

A backend API for a **personalized infinite scrolling social feed** (Instagram-style).  
Built with **Node.js**, **Express**, and **MongoDB (Mongoose)** in an MVC pattern.  
Features include **authentication**, **secure JWT in cookies**, **personalized ranking**, and a **scalable architecture**.

***

## Features

### **1. Authentication & User Management**
- Register & login with **bcrypt** hashed passwords.
- JWT stored in **HttpOnly cookies** with 2-hour expiry.
- Authentication middleware checks login status for protected routes.
- Profile API to get logged-in user details.
- Logout functionality clears token cookie.

### **2. Post Management**
- Create Post API (protected) — supports:
  - Text content
  - Optional image URL
  - Tags for personalization
- Indexed fields for faster queries.

### **3. Likes System**
- Like Post API (protected):
  - Prevents duplicate likes using a unique index.
  - Increments `likeCount` in the post for popularity ranking.
  - Updates user’s `likedTags` for personalization.

### **4. Personalized Feed API**
- Infinite scroll with **`page`** and **`limit`** parameters.
- Ranking algorithm based on:
  ```
  score = (tagMatchWeight × matchingTags) +
          (recencyWeight × recencyScore) +
          (likeCountWeight × postLikes)
  ```
  - **Tag matches**: Boosts posts with tags the user liked before.
  - **Recency**: Recent posts are ranked higher.
  - **Popularity**: More likes = more priority.
- Tunable weights for feed behavior.

### **5. Quality Middleware**
- **Validation** – express-validator for input validation.
- **Error Handling** – Centralized error responses.
- **Rate Limiting** – Prevent brute-force on login.

***

## Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose  
- **Auth**: JWT in cookies  
- **Validation**: express-validator  
- **Security**: bcryptjs, cookie-parser, express-rate-limit  
- **Containerization**: Docker & Docker Compose  

***

## Folder Structure
```
/controllers   → Handle requests/responses
/middlewares   → Auth, validation, error handling
/models        → DB schemas (User, Post, Like)
/routes        → API route definitions
/services      → Business logic
```

***

## Setup & Run

### 1️⃣ Clone the Repository
```bash
git clone https://github.com//infinite-social-feed-backend.git
cd infinite-social-feed-backend
```

### 2️⃣ Add `.env` file
```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb://mongodb:27017/infinite-social-feed
JWT_SECRET=PANKAJ_INFINITE_FEED
JWT_EXPIRES_IN=2h
```

### 3️⃣ Start with Docker
```bash
docker-compose up --build
```
Server runs on `http://localhost:3000`

***

## API Endpoints

### **Auth**
- `POST /users/register` → Create account
- `POST /users/login` → Login, sets JWT cookie
- `GET /users/profile` → Get logged-in user info
- `POST /users/logout` → Logout, clears cookie

### **Posts**
- `POST /posts` → Create post (needs login)

### **Likes**
- `POST /likes` → Like a post (needs login)

### **Feed**
- `GET /feed?page=1&limit=10` → Get personalized feed

***

## Scaling in Future

### **Performance**
- Add Redis caching for trending & recent feeds.
- Use cursor-based pagination for large datasets.

### **Algorithm**
- Store ranking weights in DB to adjust without redeploy.
- Add engagement signals like comments/shares.

### **Architecture**
- Deploy via Kubernetes for container orchestration.
- Add load balancing for high traffic.
- Store images/videos on a CDN like AWS S3 for faster delivery.

***

## Current Status
- [x] Auth with JWT + secure cookies  
- [x] Profile, Register, Login, Logout APIs  
- [x] Create Post API  
- [x] Like Post + LikedTags tracking  
- [x] Personalized Feed API with ranking + pagination  
- [x] Validation & error handling middleware  
- [x] Rate limiting  

***
