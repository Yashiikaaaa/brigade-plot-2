import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import brigade from "../assets/icons/brigade.svg";
import menuIcon from "../assets/icons/header-menu.svg"; 

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Highlights', href: '/highlights' },
    { label: 'Pricing and Floor Plan', href: '/pricingAndFloorPlan' },
    { label: 'Amenities', href: '/amenities' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Location', href: '/location' },
  ];

  return (
    <header className="fixed top-0 left-0 h-[69px] bg-white border-white w-full z-30 md:pr-[280px]">
      <div className="flex items-center justify-between px-4 md:px-14 h-full">
        {/* Logo */}
        <div
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/', { state: { fromLogo: true } });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setIsOpen(false);
          }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img
            src={brigade}
            alt="Brigade Logo"
            className="h-[40px] w-[100px] md:h-[50px] md:w-[130px]"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4 lg:space-x-10 text-[#474749] font-semibold text-sm md:text-base">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                navigate(link.href);
                setIsOpen(false);
              }}
              className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#474749] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <img src={menuIcon} alt="Menu Icon" className="w-8 h-8" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 pb-4 px-4 text-[#474749] text-sm font-medium bg-white">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                navigate(link.href);
                setIsOpen(false);
              }}
              className="text-left hover:underline"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
