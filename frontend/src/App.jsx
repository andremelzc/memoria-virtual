import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App bg-dark-bg text-text-primary min-h-screen">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Agrega más rutas aquí cuando las necesites */}
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}