require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const http = require("http");

const OrdersModel = require("./models/OrdersModel");
const HoldingsModel = require("./models/HoldingsModel");
const UserModel = require("./models/UserModel");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3002;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ─── JWT Secret ───────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_super_secret_key";

// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "All fields are required (including Username)" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await UserModel.create({ email, password, username });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 3 * 24 * 60 * 60,
    });

    res
      .status(201)
      .json({
        message: "User signed up successfully",
        success: true,
        token,
        username: user.username,
      });
  } catch (error) {
    console.error("Signup error: ", error);
    res
      .status(500)
      .json({ message: error.message || "Server error", success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect password or email" });

    const auth = await bcrypt.compare(password, user.password);
    if (!auth)
      return res.status(400).json({ message: "Incorrect password or email" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        token,
        username: user.username,
      });
  } catch (error) {
    console.error("Login error: ", error);
    res
      .status(500)
      .json({ message: error.message || "Server error", success: false });
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Stock Trading Backend is running 🚀" });
});

// ─── ORDERS ───────────────────────────────────────────────────────────────────

// POST /newOrder — place a new buy/sell order and save to DB
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !mode) {
      return res
        .status(400)
        .json({ error: "name, qty, and mode are required" });
    }

    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    console.log(`📌 New ${mode} order saved: ${name} x${qty} @ ₹${price}`);

    // If it's a BUY, also update holdings
    if (mode === "BUY") {
      const existingHolding = await HoldingsModel.findOne({ name });

      if (existingHolding) {
        // Update average price and quantity
        const totalQty = existingHolding.qty + Number(qty);
        const avgPrice =
          (existingHolding.avg * existingHolding.qty +
            Number(price) * Number(qty)) /
          totalQty;

        existingHolding.qty = totalQty;
        existingHolding.avg = parseFloat(avgPrice.toFixed(2));
        existingHolding.price = Number(price);
        await existingHolding.save();
        console.log(`📊 Holdings updated for ${name}`);
      } else {
        // Create new holding entry
        const newHolding = new HoldingsModel({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
        });
        await newHolding.save();
        console.log(`📊 New holding created for ${name}`);
      }
    }

    res
      .status(201)
      .json({ message: "Order placed successfully ✅", order: newOrder });
  } catch (error) {
    console.error("❌ Error saving order:", error.message);
    res
      .status(500)
      .json({ error: "Failed to place order", details: error.message });
  }
});

// GET /allOrders — fetch all orders from MongoDB
app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ placedAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ─── HOLDINGS ─────────────────────────────────────────────────────────────────

// GET /allHoldings — fetch all holdings from MongoDB
app.get("/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find();
    res.json(holdings);
  } catch (error) {
    console.error("❌ Error fetching holdings:", error.message);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// ─── Socket.io (Live Market Data) ─────────────────────────────────────────────
io.on("connection", (socket) => {
  console.log("🟢 A user connected for live stock prices:", socket.id);

  // Create an interval that emits randomized price updates every 2 seconds
  const stockInterval = setInterval(() => {
    // Generate pseudo-random market tweaks
    const mockPriceUpdates = {
      INFY: (1400 + Math.random() * 20 - 10).toFixed(2),
      ONGC: (200 + Math.random() * 5 - 2.5).toFixed(2),
      TCS: (3200 + Math.random() * 50 - 25).toFixed(2),
      WIPRO: (400 + Math.random() * 10 - 5).toFixed(2),
    };

    socket.emit("stock-prices", mockPriceUpdates);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    clearInterval(stockInterval);
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
