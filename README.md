# 🌐 HamroDeal Web — Next.js E-Commerce Platform

The web version of HamroDeal — a full-stack e-commerce platform built with Next.js and TypeScript. This shares the same REST API backend as the Flutter mobile app, demonstrating a multi-platform architecture from a single backend.

---

## ✨ Features

- 🔐 User authentication (register, login, JWT-based sessions)
- 🏠 Product listing with categories and filters
- 🔍 Product search
- 🛍️ Product detail pages
- 🛒 Cart management (add, remove, update quantity)
- 📦 Order placement and history
- 👤 User profile page
- 📱 Responsive design for desktop and mobile browsers
- ⚡ Server-side rendering with Next.js for fast page loads

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Styling | CSS / Tailwind |
| HTTP Client | Fetch / Axios |
| Auth | JWT |
| Backend | Node.js + Express + MongoDB ([HamroDealApp_backend](https://github.com/RojanShrestha77/HamroDealApp_backend)) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- npm or yarn
- Backend server running ([see backend repo](https://github.com/RojanShrestha77/HamroDealApp_backend))

### Installation

```bash
# Clone the repo
git clone https://github.com/RojanShrestha77/HamroDeal_Web.git
cd HamroDeal_Web/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your backend API URL to .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Run the development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 📁 Project Structure

```
frontend/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Home / product listing
│   ├── product/        # Product detail pages
│   ├── cart/           # Cart page
│   ├── orders/         # Orders page
│   └── profile/        # User profile
├── components/         # Reusable UI components
├── lib/                # API calls, helpers, utils
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

---

## 🔗 Related Repos

| Repo | Description |
|------|-------------|
| [HamroDeal](https://github.com/RojanShrestha77/HamroDeal) | Flutter mobile app version |
| [HamroDealApp_backend](https://github.com/RojanShrestha77/HamroDealApp_backend) | Node.js + Express REST API (shared backend) |

---

## 👨‍💻 Author

**Rojan Shrestha** — [github.com/RojanShrestha77](https://github.com/RojanShrestha77)
