# Frontend — Inventory Management System

React 19 + Vite + TypeScript frontend for the Inventory Management System.

> For full project setup (backend, database seeding, environment variables), see the [root README](../README.md).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

> The backend must be running at `http://localhost:5000` before using the app.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with Hot Module Replacement |
| `npm run build` | Type-check with `tsc` and bundle for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint static analysis |

---

## 🛠️ Tech Stack

| Package | Purpose |
|---------|---------|
| React 19 | UI library |
| Vite 8 | Build tool & dev server |
| TypeScript 6 | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| React Router v7 | Client-side routing |
| React Hook Form | Form state management |
| Yup | Form validation |
| Axios | HTTP client |
| Lucide React | Icons |
| React Hot Toast | Toast notifications |

---

## 🗂️ Source Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Page-level route components
├── services/       # Axios API service functions
├── types/          # Shared TypeScript interfaces & types
├── validations/    # Yup validation schemas
├── App.tsx         # Root component & router setup
└── main.tsx        # React app entry point
```
