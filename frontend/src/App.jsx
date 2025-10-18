import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Simulator from "./pages/Simulator";
import Blog from './pages/Blog';
import IntroduccionMemoriaVirtual from './pages/blog/IntroduccionMemoriaVirtual';
import AlgoritmoFIFO from './pages/blog/AlgoritmoFIFO';
import AlgoritmoLRU from './pages/blog/AlgoritmoLRU';
import AlgoritmoOptimo from './pages/blog/AlgoritmoOptimo';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App bg-dark-bg text-text-primary min-h-screen">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/simulator" element={<Simulator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/introduccion-memoria-virtual" element={<IntroduccionMemoriaVirtual />} />
          <Route path="/blog/algoritmo-fifo" element={<AlgoritmoFIFO />} />
          <Route path="/blog/algoritmo-lru" element={<AlgoritmoLRU />} />
          <Route path="/blog/algoritmo-optimo" element={<AlgoritmoOptimo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
