const mongoose = require("mongoose");
const { Schema } = mongoose;

const HoldingsSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },   // average buy price
  price: { type: Number, required: true }, // current market price
  net: { type: String, default: "+0.00%" },
  day: { type: String, default: "+0.00%" },
  isLoss: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("holding", HoldingsSchema);
