import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App bg-dark-bg text-text-primary min-h-screen">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}