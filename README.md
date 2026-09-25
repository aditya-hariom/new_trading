# 📈 Zerodha Kite Clone — Full-Stack Stock Trading Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18%2F19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-5.0-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.io-Real--Time-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Material--UI-v5%2Fv7-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI" />
  <img src="https://img.shields.io/badge/Chart.js-Data--Viz-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js" />
</p>

---

A modern, production-ready full-stack **Zerodha Clone** engineered with a micro-frontend architecture. It replicates the core user experience of India's benchmark discount brokerage platform, featuring a rich consumer landing portal, a high-frequency trading terminal (**Kite Dashboard**), real-time stock price streaming over **WebSockets**, portfolio tracking, and instant order execution.

---

## ✨ Highlights & Key Features

### 🏢 Public Portal & Landing Page (`frontend`)
- **Pixel-Perfect UI**: Faithful recreation of Zerodha's clean, minimalist design language.
- **Complete Marketing Suite**:
  - **Home**: Hero banner, ecosystem showcases, awards, varsity education modules, and brokerage transparent pricing breakdown.
  - **About**: Company timeline, founder spotlights, and core philosophy.
  - **Products**: Detailed showcases of Kite, Console, Coin, Kite Connect API, and Varsity.
  - **Pricing**: Transparent zero-brokerage equity breakdown & regulatory charge calculators.
  - **Support Portal**: Interactive ticketing system and self-service search.
- **Secure Authentication**:
  - Modal-free Signup and Login flows.
  - Password hashing with **Bcrypt (12 rounds)**.
  - Token-based **JWT sessions** with cross-origin cookie & query handshake.
  - Automatic seamless transition directly into the Trading Terminal upon authentication.

### 📊 Kite Trading Terminal (`Dashboard`)
- **Live Stock Watchlist**:
  - Real-time updates for major indices and equities (INFY, TCS, ONGC, WIPRO, RELIANCE, etc.).
  - Instant Buy/Sell action triggers right from stock items on hover.
  - Dynamic percentage change indicators and loss/gain styling.
- **Order Placement Modal**:
  - Drag-and-drop enabled order ticket.
  - Real-time margin requirement calculations based on entered quantity and price.
  - Instant execution for Market & Limit orders.
- **Portfolio Management**:
  - **Holdings**: Real-time calculated investment value, Current value, P&L, Net change, and Day change.
  - **Positions**: Intraday and derivative position tracking.
  - **Orders**: Live ledger of executed Buy/Sell trades with timestamps and status badges.
- **Visual Analytics & Data Visualization**:
  - Interactive portfolio distribution **Doughnut Charts**.
  - Historical & sector allocation **Vertical Bar Charts** powered by **Chart.js**.
- **Funds & Margins**: Live cash balances, collateral margin displays, and fund addition workflow.

### ⚡ Real-Time Engine & Backend (`backend`)
- **Live WebSocket Market Feed**: Socket.io server emitting realistic high-frequency price fluctuations every 2 seconds.
- **Resilient Multi-Tier Persistence**:
  - Native **MongoDB Atlas** integration via **Mongoose**.
  - Built-in zero-downtime **in-memory fallback mode** ensuring 100% demo uptime even during external network/DNS outages.
- **Robust REST API**: Complete CRUD endpoints for users, orders, and portfolio holdings.

---

## 🏗️ System Architecture

```mermaid
graph TD
    ClientBrowser["Web Browser / Client"]

    subgraph "Frontend Services"
        LP["Landing & Auth App\n(Port 3000)"]
        DT["Kite Trading Dashboard\n(Port 3001)"]
    end

    subgraph "Backend & Engine"
        API["Express.js REST API\n(Port 3002)"]
        WS["Socket.io WebSocket Server\n(Port 3002)"]
    end

    subgraph "Data Storage"
        Atlas[("MongoDB Atlas Cloud")]
        Mem[("In-Memory Resilience Store")]
    end

    ClientBrowser -->|Navigates / Signs Up| LP
    ClientBrowser -->|Trades & Tracks Portfolio| DT
    LP -->|POST /signup, POST /login| API
    DT -->|GET /allOrders, GET /allHoldings| API
    DT -->|POST /newOrder| API
    WS -->|Live Price Tickers (2s Interval)| DT
    API -->|Read / Write| Atlas
    API -.->|Fallback if DNS/Atlas Down| Mem
```

---

## 📂 Project Structure

```
zerodha-clone/
├── backend/                       # REST API & WebSocket Server
│   ├── models/                    # Mongoose Data Schemas
│   │   ├── UserModel.js           # User credentials & auth schema
│   │   ├── OrdersModel.js         # Order details & execution timestamps
│   │   └── HoldingsModel.js       # Long-term equity portfolio holdings
│   ├── .env.example               # Environment template
│   ├── index.js                   # Express app, Socket.io server, & API routes
│   └── package.json               # Backend dependencies
│
├── frontend/                      # Consumer Landing Portal
│   ├── public/                    # Static assets, fonts, icons & images
│   ├── src/
│   │   ├── landing_page/          # Modular page components
│   │   │   ├── home/              # Hero, Stats, Awards, Pricing
│   │   │   ├── about/             # Team & vision sections
│   │   │   ├── products/          # Ecosystem & Universe showcases
│   │   │   ├── pricing/           # Pricing tables & brokerage calculator
│   │   │   ├── support/           # Helpdesk & ticket creation
│   │   │   ├── signup/            # Dual Signup & Login authentication
│   │   │   ├── Navbar.js          # Global responsive navigation
│   │   │   └── Footer.js          # Standard footer
│   │   └── index.js               # Route declarations & CRA entry
│   └── package.json
│
├── Dashboard/                     # Kite Trading Terminal
│   ├── public/                    # Favicons, logo, manifest
│   ├── src/
│   │   ├── components/            # Trading Terminal UI
│   │   │   ├── WatchList.js       # Real-time stock monitor & item actions
│   │   │   ├── BuyActionWindow.js # Order ticket modal with margin preview
│   │   │   ├── Holdings.js        # Equity holdings table & metrics
│   │   │   ├── Orders.js          # Order book with time stamps & status
│   │   │   ├── Positions.js       # Intraday trades
│   │   │   ├── Summary.js         # Margin and portfolio equity stats
│   │   │   ├── DoughnoutChart.js  # Asset allocation visualization
│   │   │   ├── VerticalGraph.js   # Bar graph analytics
│   │   │   ├── TopBar.js          # Market indices summary (NIFTY / SENSEX)
│   │   │   └── Menu.js            # Trading navigation menu
│   │   ├── data/                  # Base market data & stock definitions
│   │   └── index.js               # Auth validation, token intercept & routing
│   └── package.json
│
├── .gitignore                     # Multi-layer git ignore rules
├── package.json                   # Root orchestrator scripts
└── README.md                      # Comprehensive documentation
```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication
| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Registers a new trader | `{ username, email, password }` |
| `POST` | `/login` | Authenticates user & issues JWT | `{ email, password }` |

### 📈 Trading & Orders
| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/newOrder` | Places a new Buy/Sell order & updates holdings | `{ name, qty, price, mode }` |
| `GET` | `/allOrders` | Fetches complete executed order history | *None* |
| `GET` | `/allHoldings` | Fetches trader's consolidated holdings | *None* |

### ⚡ WebSocket Events
- **`connection`**: Emits initial client handshake.
- **`stock-prices`**: Emits real-time simulated price updates for tracked equities every 2,000ms.

---

## 🚀 Quickstart Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (optional, in-memory fallback enabled by default)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/aditya-hariom/new_trading.git
cd new_trading
```

---

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```
Edit `backend/.env`:
```env
PORT=3002
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

### Step 3: Run the Services

You can run each service independently in separate terminal windows:

#### Terminal 1 — Backend Server (Port 3002)
```bash
cd backend
npm install
npm start
```

#### Terminal 2 — Frontend Portal (Port 3000)
```bash
cd frontend
npm install
npm start
```

#### Terminal 3 — Kite Trading Dashboard (Port 3001)
```bash
cd Dashboard
npm install
npm start
```

---

## 🌐 Application URLs

| Application | URL | Description |
| :--- | :--- | :--- |
| **Frontend Portal** | [http://localhost:3000](http://localhost:3000) | Main website & registration |
| **Signup / Login** | [http://localhost:3000/signup](http://localhost:3000/signup) | User authentication |
| **Kite Dashboard** | [http://localhost:3001](http://localhost:3001) | Live trading terminal |
| **Backend REST API** | [http://localhost:3002](http://localhost:3002) | Health check & endpoints |

---

## 🛡️ Security Best Practices
- **Credential Protection**: Database passwords and `.env` files are excluded from version control via rigorous `.gitignore` rules.
- **Password Salting**: Secure cryptographic hashing with Bcrypt prior to persistence.
- **Cross-Origin Security**: Restricted CORS origins (`http://localhost:3000`, `http://localhost:3001`) with credentialed headers.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
