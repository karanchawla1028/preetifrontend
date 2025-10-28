import { MessageSquareText } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const FloatingBtn = () => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* --- Floating Button --- */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 cursor-pointer bg-[#0A2342] hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-[1000] transition"
      >
        <MessageSquareText className="w-6 h-6" />
      </button>

      {/* --- Popover Form --- */}
      {open && (
        <div
          ref={popoverRef}
          className="fixed bottom-20 right-6 w-80 bg-white text-gray-900 p-6 shadow-lg flex flex-col items-center justify-center z-[1000] rounded-4xl transition"
        >
          <h3 className="text-lg font-semibold mb-4">Enter Client Details</h3>
          <form className="flex flex-col gap-3 w-full">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
             <input
              type="text"
              placeholder="Location"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
             <textarea
              type="text"
              placeholder="Message"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              type="submit"
              className="bg-[#0A2342] cursor-pointer text-white py-2 rounded hover:bg-blue-700 transition w-full"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingBtn;
