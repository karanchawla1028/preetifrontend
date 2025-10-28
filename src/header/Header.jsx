import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../toolkit/slices/serviceSlice";

// ===== Icons =====
const PlaneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 inline-block"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);
const HotelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 inline-block"
  >
    <path d="M2 22h20M5 22V7.5L12 2l7 5.5V22M10 22v-6M14 22v-6M12 7h.01M12 11h.01M12 15h.01" />
  </svg>
);
const CarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 inline-block"
  >
    <path d="M18 13a4.5 4.5 0 0 0-4-4H8a4.5 4.5 0 0 0-4.5 4.5V17a3.5 3.5 0 0 0 3.5 3.5h11A3.5 3.5 0 0 0 21.5 17v-2.5a4.5 4.5 0 0 0-3.5-4.5Z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const CloseIcon = () => (
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
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// ===== Navigation Items =====
const navItems = (serviceList) => [
  {
    name: "Services",
    content: (
      <div className="p-3">
        <ul className="flex flex-col gap-1">
          {serviceList||[]?.map((service) => (
            <li key={service?.uuid} className="hover:bg-blue-50 px-4 py-2 rounded-md transition-all">
              <a href="/service" className="flex items-center text-gray-800">
                {service?.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    name: "Blogs",
    content: <div className="p-3 text-gray-800">Blog Content</div>,
  },
  {
    name: "About Us",
    content: <div className="p-3 text-gray-800">About Content</div>,
  },
  {
    name: "Contact",
    content: <div className="p-3 text-gray-800">Contact Info</div>,
  },
];

// ===== Mobile Nav Data =====
const mobileNavItems = [
  {
    title: "Services",
    subTitles: [
      { name: "Hotel Reservations", href: "/service" },
      { name: "Flight Booking", href: "#" },
      { name: "Car Rentals", href: "#" },
    ],
  },
  { title: "Blogs", subTitles: [{ name: "Travel Guides", href: "#" }] },
  { title: "About Us", subTitles: [{ name: "Our Story", href: "#" }] },
  { title: "Contact", subTitles: [{ name: "Support", href: "#" }] },
];

// ===== Accordion for Mobile =====
const AccordionItem = ({ item, isActive, onToggle }) => {
  const contentRef = useRef(null);
  return (
    <div className="border-b border-blue-700">
      <button
        onClick={onToggle}
        className="flex justify-between w-full items-center p-4 text-white"
      >
        <span>{item.title}</span>
        <span
          className={`transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          } text-[#D4AF37]`}
        >
          <ChevronDownIcon />
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out bg-blue-900/40"
        style={{
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <ul className="pl-6 pb-2">
          {item.subTitles.map((s) => (
            <li key={s.name} className="py-2">
              <a
                href={s.href}
                className="text-gray-300 hover:text-[#D4AF37] transition"
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ===== Mobile Drawer =====
const MobileDrawer = ({ isOpen, onClose, navigate }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-full bg-[#0A2342] z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-700">
          <img src={logo} alt="Logo" className="h-10 w-auto rounded-lg" />
          <button onClick={onClose} className="text-[#D4AF37] hover:text-white">
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {mobileNavItems.map((item, i) => (
            <AccordionItem
              key={item.title}
              item={item}
              isActive={activeIndex === i}
              onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
          {/* <div className="p-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#D4AF37] text-[#0A2342] font-semibold py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Sign In
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

// ===== Main Header =====
const Header = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const serviceList = useSelector((state) => state.service.serviceList);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [popoverStyle, setPopoverStyle] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const headerRef = useRef(null);
  const popoverRef = useRef(null);
  const closeTimeout = useRef(null);
  const path = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEnter = (name, e) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    const rect = e.currentTarget.getBoundingClientRect();
    const headerRect = headerRef.current.getBoundingClientRect();
    const width = 300;
    const left = rect.left + rect.width / 2 - width / 2 - headerRect.left;
    setPopoverStyle({ left: `${Math.max(10, left)}px`, top: "60px" });
    setActivePopover(name);
  };
  const startClose = () =>
    (closeTimeout.current = setTimeout(() => setActivePopover(null), 200));
  const cancelClose = () => clearTimeout(closeTimeout.current);


  useEffect(()=>{
    dispatch(getAllServices())
  },[])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A2342]/80 backdrop-blur-md shadow-lg"
            : path.pathname === "/"
            ? "bg-transparent"
            : "bg-[#0A2342]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-3">
          <div className="h-14 w-20 p-2">
            <a href="/">
              <img src={logo} alt="Logo" className="h-full w-auto rounded-lg" />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center text-white">
            {navItems(serviceList).map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={(e) => handleEnter(item.name, e)}
                onMouseLeave={startClose}
              >
                <button className="hover:text-[#D4AF37] transition">
                  {item.name}
                </button>
              </div>
            ))}
          </nav>

          {activePopover && (
            <div
              ref={popoverRef}
              onMouseEnter={cancelClose}
              onMouseLeave={startClose}
              style={popoverStyle}
              className="absolute bg-white/95 backdrop-blur-lg rounded-lg shadow-xl transition-all duration-300 p-2"
            >
              {navItems(serviceList).find((i) => i.name === activePopover)?.content}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-[#D4AF37] text-[#0A2342] font-semibold py-2 px-5 rounded-md hover:bg-yellow-400 transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navigate={navigate}
      />
    </>
  );
};

export default Header;
