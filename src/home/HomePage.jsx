import React, { useEffect, useState } from "react";
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

const HomePage = () => {
  const dispatch = useDispatch();
  const images = [blog1, blog2, blog3, blog4, blog5, blog6, blog7];
  const blogs = useSelector((state) => state.blogs.blogsList);
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    dispatch(getBlogsList());
  }, [dispatch]);

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
      img: meetingSpace,
    },
    {
      name: "Corporate Hotel Stays",
      description:
        "Exclusive rates and group bookings tailored to your company’s travel needs.",
      img: corporateHotel,
    },
    {
      name: "Event Planning & Coordination",
      description:
        "From catering to AV setup — we handle the details so your event runs smoothly.",
      img: eventPlanning,
    },
    {
      name: "Corporate Travel Management",
      description:
        "Streamlined flight and transportation planning for your team or executives.",
      img: corporateTravel,
    },
  ];

  return (
    <main className="relative">
      <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url(${images[current]})` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2342]/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/20 via-transparent to-transparent"></div>

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

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 bg-white/70 text-[#0A2342] p-3 rounded-full shadow hover:bg-white z-20"
        >
          <ChevronRight size={26} />
        </button>

        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 bg-white/70 text-[#0A2342] p-3 rounded-full shadow hover:bg-white z-20"
        >
          <ChevronLeft size={26} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-8 w-full flex justify-center gap-3 z-20">
          {images?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-[#0A2342]" : "bg-white/60"
              }`}
            ></button>
          ))}
        </div>
      </section>

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
            {solutions?.map((solution) => (
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

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

          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 w-[200%] my-2 scroll-animation">
              {blogs?.length > 0 &&
                [...blogs, ...blogs].map((blog, idx) => (
                  <a
                    key={idx}
                    href={`${blog?.slug}/detail`}
                    className="min-w-[280px] max-w-[280px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
                  >
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#0A2342]">
                        {blog?.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {blog?.excerpt}
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
