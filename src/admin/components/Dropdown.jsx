import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DropdownContext = createContext();

export const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // outside click close
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block" ref={ref}>{children}</div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({ children }) => {
  const { setOpen, open } = useContext(DropdownContext);
  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer inline-block">
      {children}
    </div>
  );
};

export const DropdownMenu = ({ children }) => {
  const { open } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-xl shadow-lg py-2 z-[999]"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DropdownItem = ({ children, color, onClick }) => {
  const getColor = () => {
    if (color === "danger") return "text-red-600 hover:bg-red-50";
    if (color === "warning") return "text-yellow-600 hover:bg-yellow-50";
    return "hover:bg-gray-100";
  };

  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 transition ${getColor()}`}
    >
      {children}
    </div>
  );
};
