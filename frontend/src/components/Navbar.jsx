import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-light-bg border-b border-dark-border py-4 px-6 md:px-0">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <Link to="/" className="text-2xl font-bold text-accent no-underline">
          Simulador VM
        </Link>
        <ul className="hidden md:flex list-none gap-8">
          <li>
            <Link to="/simulator" className="font-semibold text-text-secondary no-underline transition-colors hover:text-accent">
              Simulator
            </Link>
          </li>
          <li>
            <Link to="/blog" className="font-semibold text-text-secondary no-underline transition-colors hover:text-accent">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about" className="font-semibold text-text-secondary no-underline transition-colors hover:text-accent">
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;