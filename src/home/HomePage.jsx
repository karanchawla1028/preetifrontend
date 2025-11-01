import React, { useState } from "react";
import hero from "../assets/ceo.jpeg";
import blog1 from "../assets/blog1.png";
import FloatingBtn from "../features/components/FloatingBtn";

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
    className="mr-2 h-5 w-5"
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
    className="mr-2 h-5 w-5"
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
    className="mr-2 h-5 w-5"
  >
    <path d="M14 16.5 19 21l-7-4" />
    <path d="m10.5 16.5.5-1.5 5 3-5.5 1.5Z" />
    <path d="M14 19.5 9 15l-5 4.5" />
    <path d="m9.5 12.5 5-3-5.5-1.5Z" />
    <path d="M5 6.5 3 7l2 5" />
    <path d="M18 13a4.4 4.4 0 0 0-4-4H8a4.5 4.5 0 0 0-4.5 4.5V17a3.5 3.5 0 0 0 3.5 3.5h11a3.5 3.5 0 0 0 3.5-3.5v-2.5a4.4 4.4 0 0 0-4-4Z" />
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

const HomePage = () => {
  const heroImageUrl =
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const [activeTab, setActiveTab] = useState("hotel");

  const features = [
    {
      title: "24/7 Support",
      description:
        "Our dedicated team is always available to assist with your travel needs.",
      icon: "🎧",
    },
    {
      title: "Exclusive Rates",
      description:
        "Access corporate rates on meeting spaces and Hotel bookings",
      icon: "⭐",
    },
    {
      title: "Easy Invoicing",
      description:
        "Streamlined billing and expense management for your business.",
      icon: "📄",
    },
    {
      title: "Personalized Itineraries",
      description:
        "Tailor-made travel plans that fit your schedule and preferences.",
      icon: "🗺️",
    },
  ];

  const destinations = [
    {
      name: "New York",
      img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "London",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Tokyo",
      img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Singapore",
      img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <main className="relative">
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-[80vh]"
        style={{
          backgroundImage: `url(${blog1})`,
          backgroundAttachment: "scroll",
          WebkitBackgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2342] via-[#0A2342]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/50 via-transparent to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="text-center pt-24 pb-48 md:pt-32 md:pb-64">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Corporate events & <br /> hotel booking,
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-[#D4AF37]">
              Experience seamless corporate travel and event management with our
              premium hotel booking services — designed to deliver comfort,
              convenience, and excellence for every business occasion.
            </p>
          </div>
        </div>
      </div>
      {/* <section className="relative -mt-24 z-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6">
            <div className="flex border-b mb-4">
              <button
                onClick={() => setActiveTab("hotel")}
                className={`flex items-center py-3 px-4 md:px-6 text-sm md:text-base font-semibold transition-colors duration-300 ${
                  activeTab === "hotel"
                    ? "text-[#0A2342] border-b-2 border-[#D4AF37]"
                    : "text-gray-500"
                }`}
              >
                <HotelIcon /> Hotels
              </button>
              <button
                onClick={() => setActiveTab("flight")}
                className={`flex items-center py-3 px-4 md:px-6 text-sm md:text-base font-semibold transition-colors duration-300 ${
                  activeTab === "flight"
                    ? "text-[#0A2342] border-b-2 border-[#D4AF37]"
                    : "text-gray-500"
                }`}
              >
                <PlaneIcon /> Flights
              </button>
              <button
                onClick={() => setActiveTab("car")}
                className={`flex items-center py-3 px-4 md:px-6 text-sm md:text-base font-semibold transition-colors duration-300 ${
                  activeTab === "car"
                    ? "text-[#0A2342] border-b-2 border-[#D4AF37]"
                    : "text-gray-500"
                }`}
              >
                <CarIcon /> Car Rentals
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
              <div className="lg:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g., New York, London"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-in
                </label>
                <input
                  type="date"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-out
                </label>
                <input
                  type="date"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none"
                />
              </div>
              <button className="w-full bg-[#0A2342] text-white font-bold p-3 rounded-lg hover:bg-blue-900 transition-transform duration-300 text-lg h-[50px]">
                Search
              </button>
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A2342] mb-4">
            Why Travel With Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We provide a comprehensive, end-to-end solution for all your
            corporate travel needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A2342] mb-4">
            Top Business Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Explore premier locations for your next corporate event or business
            trip.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="relative rounded-lg overflow-hidden shadow-lg group"
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {dest.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl border-4 border-[#D4AF37]">
                <img
                  src={hero}
                  alt="Karan Chawla, Founder of PreetiNest"
                  className="absolute inset-0 w-full h-full object-cover object-[20%_0%]"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
                A Word From Our Founder
              </h2>
              <figure>
                <blockquote className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-[#D4AF37] pl-6 py-2">
                  <p>
                    "At PreetiNest, we specialize in helping businesses find the
                    perfect space where ideas take shape and teams come
                    together. From corporate meetings to training sessions, we
                    make every detail seamless so you can focus on what truly
                    matters - building relationships, driving results, and
                    empowering your team."
                  </p>
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-xl font-semibold text-[#0A2342]">
                    Karan Chawla
                  </p>
                  <p className="text-md text-gray-500">
                    Founder, PreetiNest Global Connect
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <FloatingBtn />
    </main>
  );
};

export default HomePage;
