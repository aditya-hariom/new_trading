import { useEffect } from "react";
import React, { useState, useContext } from "react";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { io } from "socket.io-client";
import { watchlist } from "../data/data";

const socket = io("http://localhost:3002");
import { DoughnutChart } from "./DoughnoutChart";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [liveWatchlist, setLiveWatchlist] = useState(watchlist);

  // Hook to the live stock feed
  useEffect(() => {
    socket.on("stock-prices", (updatedPrices) => {
      setLiveWatchlist((prevWatchlist) => 
        prevWatchlist.map((stock) => {
          if(updatedPrices[stock.name]) {
            const newPrice = Number(updatedPrices[stock.name]);
            const oldPrice = Number(stock.price);
            return {
              ...stock,
              price: newPrice.toFixed(2),
              isDown: newPrice < oldPrice,
              percent: (((newPrice - oldPrice) / oldPrice) * 100).toFixed(2) + "%"
            };
          }
          return stock;
        })
      );
    });

    return () => socket.off("stock-prices");
  }, []);

  const filteredList = liveWatchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search stocks..."
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        <span className="counts">
          {filteredList.length} / {liveWatchlist.length}
        </span>
      </div>

      <ul className="list">
        {filteredList.length === 0 ? (
          <li className="no-results">No stocks found for "{searchQuery}"</li>
        ) : (
          filteredList.map((stock, index) => (
            <WatchListItem stock={stock} key={index} />
          ))
        )}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"} style={{ fontWeight: 700 }}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>

      {/* Action buttons — shown on hover as absolute overlay */}
      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions" style={{ display: "flex" }}>
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={() => generalContext.openBuyWindow(uid)}>
            Buy
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={() => generalContext.openBuyWindow(uid)}>
            Sell
          </button>
        </Tooltip>
        <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
