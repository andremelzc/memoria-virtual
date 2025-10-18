import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Simulator from "./pages/Simulator";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App bg-dark-bg text-text-primary min-h-screen">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/simulator" element={<Simulator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
