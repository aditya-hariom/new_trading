import React from "react";
import { Link } from "react-router-dom";
import { holdings } from "../data/data";

const Summary = () => {
  // Compute holdings summary
  const totalInvested = holdings.reduce((acc, s) => acc + s.avg * s.qty, 0);
  const totalCurrent = holdings.reduce((acc, s) => acc + s.price * s.qty, 0);
  const totalPnL = totalCurrent - totalInvested;
  const pnlPercent = ((totalPnL / totalInvested) * 100).toFixed(2);
  const isPnLProfit = totalPnL >= 0;

  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? "Good morning"
      : now.getHours() < 17
      ? "Good afternoon"
      : "Good evening";

  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="summary-page">

      {/* ── Greeting ── */}
      <div className="summary-greeting">
        <div>
          <h2 className="summary-hello">{greeting}, Aditya 👋</h2>
          <p className="summary-date">{dateStr}</p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="summary-cards">

        {/* Margin Card */}
        <div className="summary-card">
          <p className="summary-card-label">Margin Available</p>
          <h3 className="summary-card-value">₹3,740<span className="summary-card-decimal">.00</span></h3>
          <div className="summary-card-meta">
            <span>Used: ₹0</span>
            <span>Opening: ₹3,740</span>
          </div>
          <div className="summary-card-tag equity-tag">Equity</div>
        </div>

        {/* P&L Card */}
        <div className={`summary-card ${isPnLProfit ? "card-profit" : "card-loss"}`}>
          <p className="summary-card-label">Total P&L</p>
          <h3 className="summary-card-value" style={{ color: isPnLProfit ? "#22c55e" : "#ef4444" }}>
            {isPnLProfit ? "+" : "-"}₹{Math.abs(totalPnL).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </h3>
          <div className="summary-card-meta">
            <span className={isPnLProfit ? "tag-profit" : "tag-loss"}>
              {isPnLProfit ? "▲" : "▼"} {Math.abs(pnlPercent)}%
            </span>
            <span>Holdings ({holdings.length})</span>
          </div>
          <div className="summary-card-tag" style={{ background: isPnLProfit ? "#dcfce7" : "#fee2e2", color: isPnLProfit ? "#15803d" : "#b91c1c" }}>
            {isPnLProfit ? "Profit" : "Loss"}
          </div>
        </div>

        {/* Portfolio Value Card */}
        <div className="summary-card">
          <p className="summary-card-label">Portfolio Value</p>
          <h3 className="summary-card-value">
            ₹{totalCurrent.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </h3>
          <div className="summary-card-meta">
            <span>Invested: ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="summary-card-tag" style={{ background: "#ede9fe", color: "#7c3aed" }}>Portfolio</div>
        </div>

      </div>

      {/* ── Holdings Quick View ── */}
      <div className="summary-section">
        <div className="summary-section-header">
          <h4 className="summary-section-title">Holdings <span className="summary-count">{holdings.length}</span></h4>
          <Link to="/holdings" className="summary-view-all">View all →</Link>
        </div>

        <div className="summary-holdings-table">
          <div className="summary-table-head">
            <span>Stock</span>
            <span>Qty</span>
            <span>Avg Cost</span>
            <span>LTP</span>
            <span>P&L</span>
            <span>Change</span>
          </div>
          {holdings.slice(0, 5).map((stock, i) => {
            const pnl = (stock.price - stock.avg) * stock.qty;
            const isProfit = pnl >= 0;
            return (
              <div className="summary-table-row" key={i}>
                <span className="summary-stock-name">{stock.name}</span>
                <span className="summary-cell-muted">{stock.qty}</span>
                <span className="summary-cell-muted">₹{stock.avg.toFixed(2)}</span>
                <span>₹{stock.price.toFixed(2)}</span>
                <span className={isProfit ? "summary-profit" : "summary-loss"}>
                  {isProfit ? "+" : ""}₹{pnl.toFixed(2)}
                </span>
                <span className={stock.isLoss ? "summary-loss" : "summary-profit"}>
                  {stock.net}
                </span>
              </div>
            );
          })}
          {holdings.length > 5 && (
            <div className="summary-table-more">
              <Link to="/holdings">+{holdings.length - 5} more holdings</Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Summary;
