import React, { useState, useRef } from "react";

// --- Icons ---
const PhoneIcon = () => (
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
    className="h-6 w-6 text-[#D4AF37]"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
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
    className="h-6 w-6 text-[#D4AF37]"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapPinIcon = () => (
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
    className="h-6 w-6 text-[#D4AF37]"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
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

// --- FAQ Data ---
const faqData = [
  {
    question: "What types of corporate events can you book?",
    answer:
      "We can manage bookings for a wide range of corporate events, including conferences, training sessions, team-building retreats, product launches, and executive meetings. Our services are tailored to meet your specific needs.",
  },
  {
    question: "Do you offer group hotel rates?",
    answer:
      "Yes, we specialize in securing exclusive group rates for hotel bookings. Leveraging our partnerships with top hotel chains, we can provide significant savings for your team, no matter the size.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellation policies vary depending on the hotel and the nature of the booking. We always provide clear terms and conditions upfront. For group bookings, we work to negotiate flexible cancellation terms wherever possible.",
  },
  {
    question: "Can you manage multi-city bookings?",
    answer:
      "Absolutely. We can coordinate complex itineraries involving multiple cities, including all hotel, flight, and car rental bookings, to ensure a seamless travel experience for your team.",
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onToggle }) => {
  const contentRef = useRef(null);
  const { question, answer } = item;

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-medium text-[#0A2342]">{question}</span>
        <span
          className={`transform text-[#D4AF37] transition-transform duration-300 ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDownIcon />
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <p className="pb-5 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

// --- Contact Page Component ---
const ContactUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted");
  };

  return (
    <main className="relative">
      {/* --- Hero Section --- */}
      <div className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0A2342] leading-tight">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#D4AF37]">
            We're here to help. Whether you have a question about our services
            or want to start planning your next event, reach out to us.
          </p>
        </div>
      </div>

      {/* --- Main Content Section (Form & Details) --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* --- Enquiry Form --- */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3
                               focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3
                               focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3
                               focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3
                               focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3
                               focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-[#D4AF37] text-[#0A2342] font-bold py-3 px-6 
                               rounded-lg hover:bg-yellow-400 transition duration-300 text-lg"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>

            {/* --- Contact Details & Map --- */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
                  Contact Details
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 pt-1">
                      <PhoneIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 pt-1">
                      <EmailIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">contact@preetiglobal.com</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 pt-1">
                      <MapPinIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">
                        123 Business Bay, Suite 456, <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* --- Map --- */}
              <div>
                <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
                  Our Location
                </h2>
                <div className="rounded-lg overflow-hidden shadow-xl border-4 border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.218550125865!2d-73.9882500845936!3d40.75723097932697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c64c237b%3A0xc6c7b91dce7d11f7!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1678888888888"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A2342] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <AccordionItem
                key={item.question}
                item={item}
                isActive={activeIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;