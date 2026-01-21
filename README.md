🛒 HamroDeal – MERN Stack E-Commerce Application

HamroDeal is a full-stack e-commerce web application built using the MERN stack.
The project focuses on building a scalable, secure, and modular online marketplace with proper authentication, role-based access, and clean frontend–backend integration.

🚀 Tech Stack
Frontend

Next.js (React)

TypeScript

Tailwind CSS

Zod (form validation)

Axios

React Hook Form

Backend

Node.js

Express.js

TypeScript

MongoDB (Mongoose)

Zod (DTO validation)

JWT Authentication

✨ Features
Authentication

User Registration & Login

Secure password handling

JWT-based authentication

Form & backend validation using Zod

User Roles

Customer

Seller

Admin (in progress)

E-Commerce

Product listing (in progress)

Seller product management (in progress)

Shopping cart (planned)

Order system (planned)

Architecture

Clean folder structure

Separation of concerns

API abstraction on frontend

DTO validation on backend

Scalable MERN architecture

📁 Project Structure
Frontend
frontend/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   └── page.tsx
├── context/
│   └── AuthContext.tsx
├── lib/
│   ├── api/
│   ├── actions/
│   └── utils/
└── types/

Backend
backend/
├── controllers/
├── routes/
├── models/
├── dto/
├── database/
├── configs/
└── server.ts

🔐 Authentication Flow

User submits login/register form

Frontend validates input (Zod)

Request sent to backend API

Backend validates DTO (Zod)

JWT generated on success

Frontend handles response & redirects intentionally

⚙️ Environment Variables
Backend (.env)
PORT=5050
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5050

▶️ Running the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:3000


Backend runs on:

http://localhost:5050

🧪 API Example
POST /api/auth/register
POST /api/auth/login

📌 Learning Goals

Master MERN stack architecture

Understand frontend–backend integration

Implement secure authentication

Learn clean code & best practices

Build scalable real-world applications

🛠️ Current Status

🚧 Under Active Development

Authentication ✔️

Seller module 🔄

Product management 🔄

Cart & Orders ⏳

👨‍💻 Author

Rojan Shrestha
IT Student | MERN Stack Developer
📍 Nepal

⭐ Acknowledgements

MongoDB Documentation

Express.js

Next.js

Zod

Open Source Community
