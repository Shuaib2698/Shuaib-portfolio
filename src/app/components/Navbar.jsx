"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "Experience", path: "#experience" },
  { title: "Projects", path: "#projects" },
  { title: "Skills", path: "#skills" },
  { title: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed w-full border-b border-[#222] bg-black z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          href="#home" 
          className="text-2xl font-bold text-[rgb(var(--primary-color))] hover:text-[rgba(var(--primary-color),0.8)] transition-colors duration-300"
        >
          Portfolio
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="nav-link"
            >
              {link.title}
            </Link>
          ))}
        </div>
        
        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="text-[rgb(var(--primary-color))]"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {navbarOpen && (
        <div className="md:hidden bg-black py-4 px-4 border-t border-[#222]">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className="nav-link block"
                  onClick={() => setNavbarOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;