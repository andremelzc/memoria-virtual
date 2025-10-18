import React from 'react';

function Navbar() {
  return (
    <nav className="bg-light-bg border-b border-dark-border py-4 px-6 md:px-0">
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        <a href="/" className="text-2xl font-bold text-accent no-underline">
          Simulador VM
        </a>
        <ul className="hidden md:flex list-none gap-8">
          <li>
            <a href="#simulator" className="font-semibold text-text-secondary no-underline transition-colors hover:text-accent">
              Simulator
            </a>
          </li>
          <li>
            <a href="#blog" className="font-semibold text-text-secondary no-underline transition-colors hover:text-accent">
              Blog
            </a>
          </li>
          <li>
            <a href="#about" className="font-semibold text-text-secondary no-underline transition-colors hover:text-accent">
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className="font-semibold text-text-secondary no-underline transition-colors hover:text-accent">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;