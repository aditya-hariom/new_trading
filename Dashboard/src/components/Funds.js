import React, { useState } from "react";

const Funds = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "withdraw"
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setAmount("");
    setUpiId("");
    setSubmitted(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const equityData = [
    { label: "Available margin", value: "₹4,043.10", highlight: true },
    { label: "Used margin", value: "₹3,757.30" },
    { label: "Available cash", value: "₹4,043.10" },
  ];

  const breakdownData = [
    { label: "Opening balance", value: "₹4,043.10" },
    { label: "Payin", value: "₹4,064.00" },
    { label: "SPAN margin", value: "₹0.00" },
    { label: "Delivery margin", value: "₹0.00" },
    { label: "Exposure margin", value: "₹0.00" },
    { label: "Options premium", value: "₹0.00" },
  ];

  const collateralData = [
    { label: "Collateral (Liquid funds)", value: "₹0.00" },
    { label: "Collateral (Equity)", value: "₹0.00" },
    { label: "Total collateral", value: "₹0.00" },
  ];

  return (
    <div className="funds-page">
      {/* ── Top action bar ── */}
      <div className="funds-topbar">
        <p className="funds-upi-text">⚡ Instant, zero-cost fund transfers with UPI</p>
        <div className="funds-actions">
          <button className="funds-btn funds-btn-add" onClick={() => openModal("add")}>
            + Add Funds
          </button>
          <button className="funds-btn funds-btn-withdraw" onClick={() => openModal("withdraw")}>
            ↑ Withdraw
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="funds-grid">
        {/* Equity Card */}
        <div className="funds-card">
          <div className="funds-card-header">
            <span className="funds-card-tag equity-tag">Equity</span>
          </div>

          {/* Summary row */}
          <div className="funds-summary-row">
            {equityData.map((item) => (
              <div className="funds-summary-item" key={item.label}>
                <p className="funds-summary-value" style={{ color: item.highlight ? "#4184f3" : "#222" }}>
                  {item.value}
                </p>
                <p className="funds-summary-label">{item.label}</p>
              </div>
            ))}
          </div>

          <hr className="funds-divider" />

          {/* Breakdown */}
          <p className="funds-section-title">Breakdown</p>
          <div className="funds-breakdown">
            {breakdownData.map((item) => (
              <div className="funds-breakdown-row" key={item.label}>
                <span className="funds-breakdown-label">{item.label}</span>
                <span className="funds-breakdown-value">{item.value}</span>
              </div>
            ))}
          </div>

          <hr className="funds-divider" />

          {/* Collateral */}
          <p className="funds-section-title">Collateral</p>
          <div className="funds-breakdown">
            {collateralData.map((item) => (
              <div className="funds-breakdown-row" key={item.label}>
                <span className="funds-breakdown-label">{item.label}</span>
                <span className="funds-breakdown-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="funds-modal-overlay" onClick={closeModal}>
          <div className="funds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="funds-modal-header">
              <h3>{modalType === "add" ? "Add Funds" : "Withdraw Funds"}</h3>
              <button className="funds-modal-close" onClick={closeModal}>✕</button>
            </div>

            {submitted ? (
              <div className="funds-modal-success">
                <div className="funds-success-icon">✅</div>
                <p>{modalType === "add" ? "Funds added successfully!" : "Withdrawal request placed!"}</p>
                <p className="funds-success-sub">Amount: ₹{Number(amount).toLocaleString("en-IN")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="funds-modal-form">
                <div className="funds-form-group">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                {modalType === "add" && (
                  <div className="funds-form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      placeholder="e.g. aditya@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                )}

                <div className="funds-quick-amounts">
                  {[1000, 5000, 10000, 25000].map((q) => (
                    <button
                      type="button"
                      key={q}
                      className="funds-quick-btn"
                      onClick={() => setAmount(String(q))}
                    >
                      +₹{q.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className={`funds-btn funds-modal-submit ${
                    modalType === "add" ? "funds-btn-add" : "funds-btn-withdraw"
                  }`}
                >
                  {modalType === "add" ? "Add Funds" : "Withdraw"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
