import React, { Component } from 'react';
import "./components/style.css";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Stocks from "./components/Stocks";
import Chart from "./components/Chart";
//import History from "./components/History";
import Notfound from "./components/Notfound";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
import Stocklogo from "./components/images/stocklogo.png";
import { useState, useEffect } from "react";

const activeStyle = {
  backgroundColor: 'rgb(5, 31, 102)',
  color: "white",
};

function App() {

  const [title, setTitle] = useState();

  useEffect(() => {
    document.title = "Stock Prices Portal";
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li className="navimg"><NavLink to="/"><img src={Stocklogo} /></NavLink></li>
          <li>

            <NavLink to="/"
              style={({ isActive }) => (isActive ? activeStyle : null)}>
              Home</NavLink>

          </li>
          <li>

            <NavLink to="/stocks"
              style={({ isActive }) => (isActive ? activeStyle : null)}>
              Search Stocks</NavLink>

          </li>
          {/* <li>
            <NavLink to="/chart"
              style={({ isActive }) => (isActive ? activeStyle : null)}>
              Price History</NavLink>
          </li> */}
        </ul>
      </nav>
      <div className="container">
        <h1>Stock Prices Portal</h1>
        <p className="sitedes">This website provides stock information. You can search NASDAQ 100 companies and check their price history.</p>
      </div>
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/history" element={<Chart />} >
          <Route path=":symbol" element={<Chart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
