import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const date = new Date(order.placedAt);
              const timeStr = date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const dateStr = date.toLocaleDateString("en-IN");
              return (
                <tr key={order._id || i} className={order.mode === "BUY" ? "buy-row" : "sell-row"}>
                  <td className="stock-name">{order.name}</td>
                  <td>
                    <span className={`mode-badge ${order.mode === "BUY" ? "buy" : "sell"}`}>
                      {order.mode}
                    </span>
                  </td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price).toFixed(2)}</td>
                  <td className="order-time">
                    {timeStr}
                    <span className="order-date">{dateStr}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
