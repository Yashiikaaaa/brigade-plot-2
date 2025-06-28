import { useState } from 'react';

import brigade from "../assets/icons/brigade.svg";
import menuIcon from "../assets/icons/header-menu.svg"; 

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Pricing and Floor Plan', href: '#floorplan' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header className="w-full bg-white border-white px-4 md:px-14">
      <div className="h-[69px] flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 mr-28">
          <img
            src={brigade}
            alt="Brigade Logo"
            className="md:pl-4 h-[40px] w-[100px] md:mr-[100px] md:h-[50px] md:w-[130px]"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4 lg:space-x-10 text-[#474749] font-semibold text-sm md:text-base font-base whitespace-nowrap">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <img src={menuIcon} alt="Menu Icon" className="w-8 h-8 mr-2" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 pb-4 text-[#474749] text-sm font-base">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:underline "
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
