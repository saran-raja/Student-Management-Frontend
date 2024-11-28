import LandingPage from "./components/landingPage";
import Result from "./components/result";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Users /> */}
      {/* <LandingPage /> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
