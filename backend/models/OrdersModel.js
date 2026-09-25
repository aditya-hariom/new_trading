const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrdersSchema = new Schema({
  name: { type: String, required: true },   // stock symbol / name
  qty: { type: Number, required: true },    // quantity
  price: { type: Number, required: true },  // order price (0 = market order)
  mode: { type: String, enum: ["BUY", "SELL"], required: true },
  placedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", OrdersSchema);
