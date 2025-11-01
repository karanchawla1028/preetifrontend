import React, { useEffect, useState } from "react";
// import hero from "../assets/ceoimg.png";
import hero from "../assets/ceo.jpeg";
import blog1 from "../assets/blog1.png";
import FloatingBtn from "../features/components/FloatingBtn";

const SearchIcon = () => (
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
    className="h-5 w-5 text-gray-400"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const wordsToType = [
  "Corporate Events",
  "Team Offsites",
  "Hotel Bookings",
  "Conference Venues",
];

const HomePage = () => {
  const heroImageUrl =
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const [activeTab, setActiveTab] = useState("hotel");

  // --- NEW Typing Effect State ---
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 150;
    const deleteSpeed = 75;
    const pauseTime = 2000;

    const handleTyping = () => {
      const currentWord = wordsToType[wordIndex];

      if (isDeleting) {
        // Deleting
        setText(currentWord.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % wordsToType.length);
        }
      } else {
        // Typing
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    // Set timeout to run the typing function
    const timer = setTimeout(
      handleTyping,
      text === wordsToType[wordIndex] ? pauseTime : speed
    );

    // Cleanup timeout on component unmount or state change
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

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
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blog1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2342] via-[#0A2342]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/50 via-transparent to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="text-center pt-24 pb-48 md:pt-32 md:pb-64">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Corporate events & <br /> hotel booking,
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-[#D4AF37]">
              Your Complete Solution for Corporate Events & Stays.
            </p>
          </div>
        </div>
      </div>
      <section className="relative -mt-24 z-20 pb-16">
        <div className="container mx-auto px-6 lg:px-16 w-[60%]">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search for destinations, hotels, events..."
                className="w-full py-4 pl-14 pr-6 bg-gray-50 border border-gray-300 text-gray-900 rounded-full outline-none transition-all duration-300
                           focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:bg-white
                           placeholder:text-gray-500"
              />
            </div>

            <div className="text-center mt-6 h-6">
              <span className="text-gray-600">
                e.g., <span className="text-[#0A2342] font-medium">{text}</span>
                <span
                  className="inline-block w-[2px] h-5 bg-[#D4AF37] ml-1 animate-pulse"
                  style={{ verticalAlign: "middle" }}
                ></span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
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
