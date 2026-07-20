# Inventory Management System

A full-stack inventory management web application built with the **MERN** stack (MongoDB, Express, React, Node.js) and TypeScript.

## Project Structure

```
inventory-system/
├── backend/          # Express + TypeScript REST API
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # Route handler logic
│   │   ├── middlewares/  # Error handling middleware
│   │   ├── models/       # Mongoose schemas (Product, Category)
│   │   ├── routes/       # API route definitions
│   │   ├── seeders/      # Database seed scripts
│   │   ├── validations/  # Yup validation schemas
│   │   └── server.ts     # Express app entry point
│   ├── .env              # Environment variables (see below)
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/         # React 19 + Vite + TypeScript + Tailwind CSS
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── hooks/        # Custom React hooks
    │   ├── pages/        # Page-level components
    │   ├── services/     # Axios API service layer
    │   ├── types/        # Shared TypeScript types
    │   ├── validations/  # Yup form validation schemas
    │   └── main.tsx      # React app entry point
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

## Prerequisites

Make sure you have the following installed before getting started:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | ≥ 18.x | https://nodejs.org |
| npm | ≥ 9.x | Comes with Node.js |
| MongoDB | Atlas (cloud) or Local ≥ 6.x | https://www.mongodb.com |

---

## ⚙️ Environment Setup

### Backend — `backend/.env`

Create a file at `backend/.env` with the following variables:

```env
# MongoDB connection string
# For MongoDB Atlas:
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# For local MongoDB:
# MONGO_URI=mongodb://localhost:27017/inventory

# Port for the Express server
PORT=5000
---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd inventory-system
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Database Seeding

The seed script populates the database with default **categories** (Electronics, Clothing, Books, Home & Kitchen, Sports).

```bash
# From the backend directory
cd backend
npm run seed
```

**Expected output:**
```
MongoDB Connected: <your-cluster-host>
Categories seeded successfully
```

---

## 🏃 Running the Application

You need **two terminal windows** — one for the backend and one for the frontend.

### Terminal 1 — Start the Backend

```bash
cd backend
npm run dev
```

The backend server will start at: **`http://localhost:5000`**

**Expected output:**
```
MongoDB Connected: <your-cluster-host>
Server running on port 5000
```

### Terminal 2 — Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend dev server will start at: **`http://localhost:5173`**

Open your browser and navigate to **`http://localhost:5173`** to use the app.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/products` | Create a new product |
| `DELETE` | `/api/products/:id` | Delete a product by ID |
| `GET` | `/api/categories` | Get all categories |

---

## 🛠️ Tech Stack

### Backend

| Package | Purpose |
|---------|---------|
| `express` v5 | HTTP server & routing |
| `mongoose` v9 | MongoDB ODM |
| `typescript` v7 | Type safety |
| `tsx` | Run TypeScript directly (no build step in dev) |
| `yup` | Request body validation |
| `dotenv` | Environment variable loading |
| `cors` | Cross-origin resource sharing |

### Frontend

| Package | Purpose |
|---------|---------|
| `react` v19 | UI library |
| `vite` v8 | Build tool & dev server |
| `typescript` v6 | Type safety |
| `tailwindcss` v4 | Utility-first CSS framework |
| `react-router-dom` v7 | Client-side routing |
| `react-hook-form` | Form state management |
| `yup` | Form validation schemas |
| `axios` | HTTP client for API calls |
| `lucide-react` | Icon library |
| `react-hot-toast` | Toast notifications |

---

## 🔧 Troubleshooting

### MongoDB connection fails
- Verify your `MONGO_URI` in `backend/.env` is correct.
- If using **MongoDB Atlas**, ensure your current IP address is whitelisted under *Network Access* in the Atlas dashboard.
- If using **local MongoDB**, make sure the `mongod` service is running.

### Port already in use
- Backend defaults to port `5000`. Change `PORT` in `backend/.env` if it's taken.
- Frontend defaults to port `5173`. Vite will automatically increment to the next available port.

### Seeder errors
- Ensure `backend/.env` exists with a valid `MONGO_URI` before running `npm run seed`.
- The seeder **clears all existing categories** on each run — this is intentional and expected.
