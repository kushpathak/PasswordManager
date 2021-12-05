import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import UserContextProvider from "./contexts/userContext";
ReactDOM.render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserContextProvider>,
  document.getElementById("root")
);
