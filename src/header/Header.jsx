import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../toolkit/slices/serviceSlice";
import { getBlogsList } from "../toolkit/slices/blogSlice";

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
const navItems = (serviceList, blogList) => [
  {
    name: "Services",
    content: (
      <div className="p-3">
        <ul className="flex flex-col gap-1">
          {(serviceList?.length > 0 ? serviceList : [])?.map((service) => {
            return (
              <li
                key={service?.uuid}
                className="hover:bg-blue-50 px-4 py-2 rounded-md transition-all"
              >
                <a
                  href={`/${service.slug}/service`}
                  className="flex items-center text-gray-800"
                >
                  {service?.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    ),
  },
  {
    name: "Blogs",
    content: (
      <div className="p-3">
        <ul className="flex flex-col gap-1">
          {(blogList?.length > 0 ? blogList : [])?.map((blog) => (
            <li
              key={blog?.uuid}
              className="hover:bg-blue-50 px-4 py-2 rounded-md transition-all"
            >
              <a
                href={`/${blog.slug}/blogs`}
                className="flex items-center text-gray-800"
              >
                {blog?.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

// ===== Mobile Nav Data =====
const mobileNavItems = (serviceList, blogList) => [
  {
    title: "Services",
    subTitles: (serviceList?.length > 0 ? serviceList : [])?.map((item) => ({
      name: item?.name,
      slug: item?.slug,
    })),
  },
  {
    title: "Blogs",
    subTitles: (blogList?.length > 0 ? blogList : [])?.map((blog) => ({
      name: blog?.title,
      slug: blog?.slug,
    })),
  },
];

// ===== Accordion for Mobile =====
const AccordionItem = ({ item, isActive, onToggle, key }) => {
  const contentRef = useRef(null);
  return (
    <div className="border-b border-blue-700" key={key}>
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
        {/* <ul className="pl-6 pb-2">
          {item?.subTitles ||
            []?.map((s) => (
              <li key={s.name} className="py-2">
                <a
                  href={`/${s.slug}/blogs`}
                  className="text-gray-300 hover:text-[#D4AF37] transition"
                >
                  {s.name}
                </a>
              </li>
            ))}
        </ul> */}
      </div>
    </div>
  );
};

// ===== Mobile Drawer =====
const MobileDrawer = ({ isOpen, onClose, navigate, serviceList, blogList }) => {
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
          {mobileNavItems(serviceList, blogList)?.length > 0 &&
            mobileNavItems(serviceList, blogList)?.map((item, i) => (
              <AccordionItem
                key={item?.slug}
                item={item}
                isActive={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            ))}
          <a
            href="/aboutus"
            className="flex justify-between w-full items-center p-4 text-white"
          >
            About us
          </a>
          <a
            href="/contactus"
            className="flex justify-between w-full items-center p-4 text-white"
          >
            Contact us
          </a>
        </div>
      </div>
    </>
  );
};

// ===== Main Header =====
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.service.serviceList);
  const blogList = useSelector((state) => state.blogs.blogList);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
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

    setPopoverPosition({
      left: rect.left + rect.width / 2, // center
      top: rect.bottom + window.scrollY, // exactly below the item
    });

    setActivePopover(name);
  };

  const startClose = () =>
    (closeTimeout.current = setTimeout(() => setActivePopover(null), 200));
  const cancelClose = () => clearTimeout(closeTimeout.current);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getBlogsList());
  }, []);

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
            {navItems(serviceList || [], blogList || [])?.length > 0 &&
              navItems(serviceList || [], blogList || [])?.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={(e) => handleEnter(item?.name, e)}
                  onMouseLeave={startClose}
                >
                  <button className="hover:text-[#D4AF37] transition font-medium">
                    {item?.name}
                  </button>
                </div>
              ))}
            <div className="relative">
              <a
                href="/aboutus"
                className="hover:text-[#D4AF37] transition font-medium cursor-pointer"
              >
                About us
              </a>
            </div>
            <div className="relative">
              <a
                href="/contactus"
                className="hover:text-[#D4AF37] transition font-medium cursor-pointer"
              >
                Contact us
              </a>
            </div>
          </nav>

          {activePopover && (
            <div
              ref={popoverRef}
              onMouseEnter={cancelClose}
              onMouseLeave={startClose}
              style={{
                position: "absolute",
                transform: "translateX(-50%)", // centers it perfectly
                left: popoverPosition.left,
                top: popoverPosition.top + 8, // small gap
                zIndex: 9999,
              }}
              className="bg-white/95 backdrop-blur-lg rounded-lg shadow-xl transition-all duration-200 p-2"
            >
              {
                navItems(serviceList, blogList)?.find(
                  (i) => i.name === activePopover
                )?.content
              }
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
        serviceList={serviceList}
        blogList={blogList}
      />
    </>
  );
};

export default Header;
