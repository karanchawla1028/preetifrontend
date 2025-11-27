import React, { useEffect, useState } from "react";
// import hero from "../assets/ceoimg.png";
import hero from "../assets/ceo.jpeg";
import blog1 from "../assets/heroimage.png";
import blog2 from "../assets/hero2.jpeg";
import blog3 from "../assets/hero3.jpeg";
import blog4 from "../assets/hero4.jpeg";
import blog5 from "../assets/hero5.jpeg";
import blog6 from "../assets/hero6.jpeg";
import blog7 from "../assets/hero7.jpeg";
import meetingSpace from "../assets/meetingSpace.png";
import corporateHotel from "../assets/corporateHotel.png";
import eventPlanning from "../assets/eventplanning.png";
import corporateTravel from "../assets/corporateTravel.png";
import FloatingBtn from "../features/components/FloatingBtn";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsList } from "../toolkit/slices/blogSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogs = [
  {
    title: "How Same-Day Boardroom Booking Boosts Productivity",
    slug: "same-day-boardroom-booking-productivity",
    excerpt:
      "Discover how quick access to conference rooms improves workflow efficiency.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Corporate Event Planning – Ultimate Guide 2025",
    slug: "corporate-event-planning-guide",
    excerpt: "Everything you need to know to plan seamless corporate events.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjBib29raW5nfGVufDB8fDB8fHww",
  },
  {
    title: "Managing Multi-City Conferences Effectively",
    slug: "multi-city-conference-management",
    excerpt:
      "A step-by-step guide to coordinating events across multiple cities.",
    image:
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjBib29raW5nfGVufDB8fDB8fHww",
  },
  {
    title: "Benefits of Executive Travel Itinerary Management",
    slug: "executive-travel-itinerary-benefits",
    excerpt: "Learn why CEOs rely on itinerary management services.",
    image:
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwYm9va2luZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

const wordsToType = [
  "Corporate Events",
  "Team Offsites",
  "Hotel Bookings",
  "Conference Venues",
];

const HomePage = () => {
  const dispatch = useDispatch();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const images = [blog1, blog2, blog3, blog4, blog5, blog6, blog7]; // add any number of images here

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    dispatch(getBlogsList());
  }, []);

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

  const solutions = [
    {
      name: "Meeting Space Booking",
      description:
        "Find and reserve the perfect venue for your corporate meetings or training sessions — anywhere in the world.",
      img: meetingSpace, // Placeholder for a modern conference room
    },
    {
      name: "Corporate Hotel Stays",
      description:
        "Exclusive rates and group bookings tailored to your company’s travel needs.",
      img: corporateHotel, // Placeholder for a luxury hotel room
    },
    {
      name: "Event Planning & Coordination",
      description:
        "From catering to AV setup — we handle the details so your event runs smoothly.",
      img: eventPlanning, // Placeholder for a large event setup or launch
    },
    {
      name: "Corporate Travel Management",
      description:
        "Streamlined flight and transportation planning for your team or executives.",
      img: corporateTravel, // Placeholder for a business lounge or airport
    },
  ];

  return (
    <main className="relative">
      <div
        className="relative bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url(${images[current]})` }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2342]/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/20 via-transparent to-transparent"></div>

        {/* CONTENT */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="text-center pt-24 pb-48 md:pt-32 md:pb-64">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#fafafa] leading-tight mb-4">
              Corporate events & <br /> hotel booking.
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-[#D4AF37] font-medium">
              Your Complete Solution for Corporate Events & Stays.
            </p>
          </div>
        </div>

        {/* NEXT / PREV BUTTON — Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="cursor-pointer hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#0A2342] p-3 rounded-full shadow hover:bg-white transition"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="cursor-pointer hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#0A2342] p-3 rounded-full shadow hover:bg-white transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-8 w-full flex justify-center gap-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition 
              ${index === current ? "bg-[#0A2342]" : "bg-white/60"}`}
            ></div>
          ))}
        </div>
      </div>
      {/* <section className="relative -mt-16 z-20 pb-16">
        <div className="container mx-auto px-6 lg:px-16 w-[80%]">
          <div className="bg-white rounded-xl shadow-2xl p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0A2342]">
              Find the Perfect Space for Your Corporate Needs
            </h3>

            <p className="text-gray-600 mt-2 text-lg">
              {text}
              <span className="inline-block w-[2px] h-5 bg-[#D4AF37] ml-1 animate-pulse"></span>
            </p>
          </div>
        </div>
      </section> */}

      <section>
        <div className="container mx-auto px-6 pt-12 lg:px-8 text-center">
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
            Our Corporate Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Simplify your business travel and event planning with PreetiNest -
            your trusted partner for seamless coordination.
          </p>

          {/* Use the new 'solutions' array */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.name}
                className="relative rounded-lg overflow-hidden shadow-xl group hover:shadow-2xl transition duration-300"
              >
                {/* Image */}
                <img
                  src={solution.img}
                  alt={solution.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-4 text-left w-full">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {solution.name}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {solution.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A2342] text-center mb-6">
            Latest Blogs
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Stay updated with our latest insights, travel tips, and corporate
            service updates.
          </p>

          {/* Carousel Wrapper */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 w-[200%] my-2 scroll-animation">
              {[...blogs, ...blogs].map((blog, idx) => (
                <a
                  key={idx}
                  href={`${blog.slug}/detail`}
                  className="min-w-[280px] max-w-[280px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#0A2342]">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative w-60 h-60 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-xl border-4 border-[#D4AF37]">
                <img
                  src={hero}
                  alt="Karan Chawla, Founder of PreetiNest"
                  className="absolute inset-0 w-full h-full object-cover object-[20%_0%]"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
                A Word From Our Founder and CEO
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
                    Founder and CEO, PreetiNest Global Connect
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
