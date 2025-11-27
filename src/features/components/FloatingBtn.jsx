import { MessageSquareText } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { addEnquiry } from "../../toolkit/slices/enquirySlice";
import { useDispatch } from "react-redux";

const FloatingBtn = () => {
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const [enquiry, setEnquiry] = useState({
    name: "",
    location: "",
    message: "",
    email: "",
    phone: "",
    slug: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry Data:", enquiry);
    dispatch(addEnquiry(enquiry))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          alert("Enquiry added successfully.");
          setEnquiry({
            name: "",
            location: "",
            message: "",
            email: "",
            phone: "",
            slug: "",
          });
        } else {
          alert("Something went wrong .");
        }
      })
      .catch(() => alert("Something went wrong ."));
  };

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
          <h3 className="text-lg font-semibold mb-4">Send your enquiry</h3>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={enquiry.name}
              onChange={handleChange}
              name="name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              value={enquiry.phone}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={enquiry.email}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={handleChange}
              value={enquiry.location}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {/* <input
              type="text"
              placeholder="Slug"
              name="slug"
              onChange={handleChange}
              value={enquiry.slug}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            /> */}
            <textarea
              type="text"
              placeholder="Message"
              onChange={handleChange}
              name="message"
              value={enquiry.message}
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
