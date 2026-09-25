# Zerodha Clone - Full Stack Trading Application

A modern full-stack Zerodha Clone featuring landing pages, user authentication, a live trading terminal, portfolio management, and real-time stock price streaming via WebSockets.

## 🚀 Architecture

- **Frontend** (`/frontend` - Port 3000): React-based landing pages, product showcases, pricing, support, and authentication (Signup/Login).
- **Trading Dashboard** (`/Dashboard` - Port 3001): Interactive trading portal with real-time watchlists, summary analytics, holdings, and order placement.
- **Backend API** (`/backend` - Port 3002): Express.js REST API with MongoDB/Mongoose models, JWT authentication, and Socket.io for live market price simulation.

## 📦 Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
# Configure your .env based on .env.example
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Dashboard Setup
```bash
cd Dashboard
npm install
npm start
```

## 🛠️ Tech Stack
- **Frontend & Dashboard**: React, React Router, Material UI, Chart.js, Axios, Socket.io-client
- **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.io, JWT, Bcrypt
