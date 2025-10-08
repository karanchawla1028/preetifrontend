import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

const PlaneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3 h-5 w-5 inline-block"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
  </svg>
);

const HotelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3 h-5 w-5 inline-block"
  >
    <path d="M10 22v-6.57" />
    <path d="M12 11h.01" />
    <path d="M12 7h.01" />
    <path d="M14 22v-6.57" />
    <path d="M12 15h.01" />
    <path d="M2 22h20" />
    <path d="M5 22V7.52c0-.88.45-1.69 1.17-2.14L12 2l5.83 3.38c.72.45 1.17 1.26 1.17 2.14V22" />
    <path d="M17 15h.01" />
    <path d="M17 11h.01" />
    <path d="M17 7h.01" />
    <path d="M7 15h.01" />
    <path d="M7 11h.01" />
    <path d="M7 7h.01" />
  </svg>
);

const CarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3 h-5 w-5 inline-block"
  >
    <path d="M14 16.5 19 21l-7-4" />
    <path d="m10.5 16.5.5-1.5 5 3-5.5 1.5Z" />
    <path d="M14 19.5 9 15l-5 4.5" />
    <path d="m9.5 12.5 5-3-5.5-1.5Z" />
    <path d="M5 6.5 3 7l2 5" />
    <path d="M18 13a4.4 4.4 0 0 0-4-4H8a4.5 4.5 0 0 0-4.5 4.5V17a3.5 3.5 0 0 0 3.5 3.5h11a3.5 3.5 0 0 0 3.5-3.5v-2.5a4.4 4.4 0 0 0-4-4Z" />
  </svg>
);

const navItems = [
  {
    name: "Services",
    content: (
      <div className="p-2">
        <ul className="flex flex-col gap-1">
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              <HotelIcon />
              Hotel Reservations
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              <PlaneIcon />
              Flight Booking
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              <CarIcon />
              Car Rentals
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    name: "Blogs",
    content: (
      <div className="p-2">
        <ul className="flex flex-col gap-1">
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              <HotelIcon />
              Hotel Reservations
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              <PlaneIcon />
              Flight Booking
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              <CarIcon />
              Car Rentals
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    name: "About Us",
    content: (
      <div className="p-2">
        <ul className="flex flex-col gap-1">
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              Our Story
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              Careers
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              Press
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    name: "Contact",
    content: (
      <div className="p-2">
        <ul className="flex flex-col gap-1">
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              Contact Form
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              24/7 Support
            </a>
          </li>
          <li className="transition-all duration-200 hover:bg-blue-100 hover:border-l-4 hover:border-yellow-500 px-4 py-3 cursor-pointer">
            <a href="#" className="block text-gray-800 font-medium">
              FAQs
            </a>
          </li>
        </ul>
      </div>
    ),
  },
];

// --- Sticky Header Component ---
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [popoverStyle, setPopoverStyle] = useState({});
  const headerRef = useRef(null);
  const popoverRef = useRef(null);
  const closeTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name, e) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    const item = navItems.find((item) => item.name === name);
    if (!item || !item.content) {
      setActivePopover(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    const popoverEl = popoverRef.current;
    let popoverWidth = 300; // Default width
    if (popoverEl) {
      popoverEl.style.display = "block"; // Temporarily show to measure
      popoverWidth = popoverEl.offsetWidth;
      popoverEl.style.display = "";
    }

    const headerRect = headerRef.current.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - popoverWidth / 2 - headerRect.left;
    left = Math.max(10, Math.min(left, headerRect.width - popoverWidth - 10));
    const top = rect.bottom - headerRect.top + 8;

    setPopoverStyle({
      left: `${left}px`,
      top: `${top}px`,
      width: `${popoverWidth}px`,
    });

    setActivePopover(name);
  };

  const startClose = () => {
    closeTimeout.current = setTimeout(() => setActivePopover(null), 200);
  };
  const cancelClose = () => clearTimeout(closeTimeout.current);

  return (
    <header
      ref={headerRef}
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A2342]/80 backdrop-blur-lg shadow-lg"
          : "bg-[#0A2342]"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center py-4">
        <div className="h-[80px] w-[95px] p-3">
          <img
            src={logo}
            alt="preeti-nest"
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={(e) => handleMouseEnter(item.name, e)}
              onMouseLeave={startClose}
            >
              <a
                href={item.href || "#"}
                className="text-white hover:text-[#D4AF37] transition duration-300 pb-2"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        {activePopover &&
          navItems.find((n) => n.name === activePopover)?.content && (
            <div
              ref={popoverRef}
              onMouseEnter={cancelClose}
              onMouseLeave={startClose}
              style={popoverStyle}
              className="absolute bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl transition-opacity duration-300 overflow-hidden"
            >
              {navItems.find((n) => n.name === activePopover)?.content}
            </div>
          )}

        <div className="flex items-center">
          <button className="hidden md:block bg-[#D4AF37] text-[#0A2342] font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition duration-300">
            Sign In
          </button>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
