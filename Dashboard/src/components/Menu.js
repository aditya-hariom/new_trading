import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard", to: "/" },
    { label: "Orders", to: "/orders" },
    { label: "Holdings", to: "/holdings" },
    { label: "Positions", to: "/positions" },
    { label: "Funds", to: "/funds" },
  ];

  return (
    <div className="menu-container">
      {/* Logo */}
      <img src="logo.png" alt="Zerodha logo" style={{ width: "5%" }} />

      {/* Nav links */}
      <div className="menus">
        <ul>
          {navLinks.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{ textDecoration: "none" }}
                  className={`menu ${isActive ? "selected" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Profile */}
      <div className="profile">
        <div className="avatar">ZU</div>
        <div className="profile-info">
          <p className="profile-name">Aditya</p>
          <p className="profile-id">ZU1234</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
