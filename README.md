# Finora

An AI-powered personal finance platform for tracking income and expenses, understanding spending patterns, scanning receipts, and receiving personalized financial insights.

## Why It Exists

Managing personal finances often means combining bank records, receipts, spreadsheets, and manual calculations. Finora brings those tasks into one application so users can record transactions, review their financial position, and make better decisions from their own data.

## Features

- User registration and JWT-based authentication
- Dashboard with income, expenses, balance, savings rate, and transaction counts
- Expense charts and category breakdowns
- Create, edit, duplicate, delete, and filter transactions
- Bulk transaction import and bulk deletion
- Recurring transactions for scheduled income or expenses
- AI receipt scanning using Google Gemini
- Cloudinary receipt image storage
- Financial reports for selected date ranges
- AI-generated financial coaching insights
- Monthly report scheduling and email delivery with Resend
- Light and dark appearance settings

## Application Structure

```text
client/   React, TypeScript, Vite, Redux Toolkit, Tailwind CSS
backend/  Express, TypeScript, MongoDB, Mongoose, JWT
```

The frontend communicates with the backend through REST endpoints. The backend validates requests, applies authentication, performs MongoDB operations, and calls external services when AI, image storage, or email delivery is required.

## Technology Stack

### Frontend

- React 19 and TypeScript
- Vite
- React Router
- Redux Toolkit and RTK Query
- Tailwind CSS and Radix UI
- Recharts
- React Hook Form and Zod

### Backend

- Node.js and Express
- TypeScript
- MongoDB and Mongoose
- Passport JWT authentication
- bcryptjs password hashing
- Zod request validation
- node-cron background jobs

### External Services

- MongoDB Atlas for persistent data
- Google Gemini for receipt extraction and financial insights
- Cloudinary for receipt image storage
- Resend for scheduled report emails

## Main API Areas

All protected endpoints use the configured API base path, normally `/api`.

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/analytics/summary
GET    /api/analytics/chart
GET    /api/analytics/expense-breakdown

POST   /api/transaction/create
POST   /api/transaction/scan-receipt
POST   /api/transaction/bulk-transaction
GET    /api/transaction/all
GET    /api/transaction/:id
PUT    /api/transaction/update/:id
PUT    /api/transaction/duplicate/:id
DELETE /api/transaction/delete/:id
DELETE /api/transaction/bulk-delete

GET    /api/report/all
GET    /api/report/generate
PUT    /api/report/update-setting
```

## Requirements

- Node.js 20 LTS or newer
- npm
- MongoDB connection
- Google Gemini API key for AI features
- Cloudinary credentials for receipt uploads
- Resend credentials for report emails

The current backend also works with Node 24 because it uses `bcryptjs` instead of native `bcrypt`.

## Installation

Clone the repository and install each application separately:

```powershell
cd backend
npm ci

cd ..\client
npm ci --legacy-peer-deps
```

The frontend currently needs `--legacy-peer-deps` because the existing `react-day-picker` version declares React 16-18 peer support while the application uses React 19.

## Environment Configuration

Create `backend/.env` using this template. Never commit the real file or share its values publicly.

```env
NODE_ENV=development
PORT=8000
BASE_PATH=/api
FRONTEND_ORIGIN=http://localhost:5173

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finora

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=replace_with_a_second_long_random_secret
JWT_REFRESH_EXPIRES_IN=7d

GEMINI_API_KEY=replace_with_your_gemini_key

CLOUDINARY_CLOUD_NAME=replace_with_your_cloud_name
CLOUDINARY_API_KEY=replace_with_your_cloudinary_key
CLOUDINARY_API_SECRET=replace_with_your_cloudinary_secret

RESEND_API_KEY=replace_with_your_resend_key
RESEND_MAILER_SENDER=onboarding@resend.dev
```

For local testing, Resend's test sender can be used if the Resend account permits it. A verified custom domain is recommended for production email delivery.

The frontend uses `client/.env`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_REDUX_PERSIST_SECRET_KEY=replace_with_a_local_secret
```

## Running Locally

Start the backend in one terminal:

```powershell
cd backend
npm run dev
```

Start the frontend in a second terminal:

```powershell
cd client
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Production Build

Build the backend:

```powershell
cd backend
npm run build
npm start
```

Build the frontend:

```powershell
cd client
npm run build
npm run preview
```

## Scheduled Jobs

In development, the backend starts two scheduled jobs:

- Recurring transactions are processed daily.
- Monthly financial reports are processed on the first day of each month.

The report job generates a previous-month summary, requests three AI insights, sends an email, and records the report status.

## Security Notes

- Keep `.env` files out of Git.
- Rotate credentials immediately if they are shared or exposed.
- Use different secrets for access and refresh tokens.
- URL-encode special characters in MongoDB passwords.
- Restrict MongoDB Atlas network access to trusted IP addresses.
- Use a verified email domain for production Resend delivery.

## Project Purpose

Finora is designed as a practical financial productivity tool and a portfolio project demonstrating full-stack TypeScript, authenticated REST APIs, MongoDB aggregation, scheduled jobs, cloud file storage, AI-assisted workflows, and data-focused user interfaces.
