# 🛍️ Everlane E-commerce Project

**Everlane E-commerce Project** is a full-stack web application built with **React (frontend)** and **Express (backend)**.  

---

## 🚀 Tech Stack

### **Frontend**
- ⚛️ **React 18** + **Vite**
- 🧭 **React Router** for client-side routing
- 🪄 **Axios** for API requests
- 🧩 **Context API** / (migrating to **Redux Toolkit**) for state management (Auth, Cart)
- 💅 **TailwindCSS** or **SCSS Modules** for styling
- 🛒 **Bootstrap Offcanvas** for the cart drawer
- ☁️ **Cloudinary** for image storage and delivery

### **Backend**
- 🧠 **Node.js** + **Express.js**
- 🧩 **Knex.js** for database queries
- 🗄️ **MySQL** for product, user, and order data
- 🔐 **JWT Authentication** (Access Token + Refresh Token)
- 🍪 **HTTPOnly Cookie** for refresh token storage
- ⚙️ **Global Error Handler** for consistent error responses
- 🧰 **Service Layer Pattern** (Controller → Service → Repository)
- ✅ **Input Validation** with Joi or custom validators

---

## 🔐 Authentication Flow

1. The user logs in or signs up and receives both an `accessToken` and a `refreshToken`.
2. `accessToken` is stored temporarily (in memory or session).
3. `refreshToken` is stored securely in an **HTTPOnly cookie**.
4. When the access token expires, the client requests a new one via `/auth/refresh`.
5. When a user **changes their password**, old refresh tokens are invalidated for security.

---

## 🛒 Cart Flow

- When a user adds a product to the cart (`/cart/items`):
  - The backend creates a cart if none exists (`getOrCreateCartByUserId`).
  - Product quantity is updated or inserted.
- The client manages cart state via **Context** or **Redux**.
- On page reload, the client fetches the cart from the API if the user is authenticated.

---

## 📁 Project Structure

### **Backend**
```
src
├── config
├── constants
├── database
│   ├── factories
│   ├── migrations
│   └── seeds
├── middlewares
├── modules
│   ├── addresses
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   ├── auth
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   ├── blogs
│   │   ├── controllers
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   └── validators
│   ├── carts
│   │   ├── controllers
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   └── validators
│   ├── categories
│   │   ├── controllers
│   │   ├── repositories
│   │   ├── routes
│   │   └── validators
│   ├── core
│   │   ├── controller
│   │   └── repository
│   ├── products
│   │   ├── controllers
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   └── validators
│   ├── shops
│   │   ├── controllers
│   │   ├── repositories
│   │   └── routes
│   └── users
│       ├── constants
│       ├── controllers
│       ├── repositories
│       ├── routes
│       ├── services
│       ├── utils
│       └── validators
├── shared
│   └── constants
├── tests
│   └── modules
│       └── users
└── utils
```

### **Frontend**
```
client/
│
├── src/
│   ├── api/
│   ├── components/
│   │   ├── cart/
│   │   ├── products/
│   │   └── ui/
│   ├── contexts/
│   ├── pages/
│   ├── store/ 
│   ├── utils/
│   └── App.jsx
│
└── vite.config.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=everlane_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=your-secret
REFRESH_TOKEN_SECRET=your-refresh-secret
COOKIE_SECRET=your-cookie-secret
CLIENT_URL=http://localhost:5173
```

---

## 🧭 API Overview

| Method | Endpoint | Description |
|---------|-----------|-------------|
| **POST** | `/auth/sign-in` | Login and get access + refresh tokens |
| **POST** | `/auth/sign-up` | Register a new user |
| **POST** | `/auth/refresh-token` | Refresh expired access token |
| **POST** | `/auth/sign-out` | Clear refresh token cookie |
| **GET** | `/products` | Get all products |
| **GET** | `/products/:slug` | Get a product by slug |
| **GET** | `/cart` | Retrieve user's cart |
| **POST** | `/cart/items` | Add product to cart |
| **PATCH** | `/cart/items/:id` | Update cart item quantity |
| **DELETE** | `/cart/items/:id` | Remove item from cart |

---

## 🧩 Setup & Run

### **1️⃣ Backend**
```bash
cd server
npm install
npm run migrate     # if you have Knex migrations configured
npm run dev
```
Default server runs at: **http://localhost:3000**

### **2️⃣ Frontend**
```bash
cd client
npm install
npm run dev
```
Frontend runs at: **http://localhost:5173**

---

## 🧪 Development Notes

- When changing a password, **revoke refresh tokens** to prevent token reuse.
- Axios interceptors automatically **refresh the access token** on `401` responses.
- Cart state syncs automatically with the backend after each update.
- Possible feature extensions:
  - Checkout & Payment (Stripe / VNPay)
  - Wishlist
  - Admin Dashboard

---

## 💻 Author

**Tuan Kiet Nguyen**  
Full-stack Developer — Everlane E-commerce Project  
📧 _nguynkit3107@gmail.com_  
📅 _2025_

---

## 🏗️ Future Improvements

- ✅ Migrate all global states to **Redux Toolkit**
- ✅ Add **Helmet** and **Rate Limiting**
- 🕹️ Improve mobile UI/UX
- 🧾 Add “Orders” and “Payments” modules
- 🌐 Deploy on **Vercel (client)** and **Render / Railway (server)**

---
