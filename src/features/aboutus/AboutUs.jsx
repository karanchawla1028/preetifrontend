import React from "react";
import { Link } from "react-router-dom"; // Use Link for internal navigation
import hero from "../../assets/ceo.jpeg"; // Assuming this is the path to Karan's image

// --- Icons ---
const TargetIcon = () => (
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
    className="h-10 w-10 text-[#D4AF37]"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const EyeIcon = () => (
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
    className="h-10 w-10 text-[#D4AF37]"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

// --- About Us Page Component ---
const AboutUs = () => {
  return (
    <main className="relative">
      {/* --- Hero Section --- */}
      <div className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0A2342] leading-tight">
            About PreetiNest Global Connect
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#D4AF37]">
            Connecting businesses, curating exceptional experiences.
          </p>
        </div>
      </div>

      {/* --- Our Story Section --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div className="flex justify-center">
              <img
                // A placeholder image for "Our Story"
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                alt="PreetiNest corporate event"
                className="rounded-lg shadow-2xl object-cover w-full h-96"
              />
            </div>
            {/* Text Column */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Founded on the principle of seamless service, PreetiNest Global
                Connect was born from a desire to transform the corporate travel
                and event landscape. We saw a need for a partner that doesn't
                just book venues, but understands the strategic importance of
                every meeting, conference, and business trip.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, we are a leading provider of premium hotel bookings and
                event management, dedicated to helping businesses find the
                perfect space where ideas flourish and teams come together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission & Vision Section --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            {/* Our Mission */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <TargetIcon />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A2342] mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-lg">
                  To simplify corporate travel and event planning through
                  personalized service, exclusive access, and seamless
                  execution, allowing our clients to focus on what matters most.
                </p>
              </div>
            </div>
            {/* Our Vision */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <EyeIcon />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A2342] mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-lg">
                  To be the global leader in corporate hospitality, setting new
                  standards for excellence, reliability, and innovation in every
                  connection we build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Meet Our Founder Section --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl border-4 border-[#D4AF37]">
                <img
                  src={hero}
                  alt="Karan Chawla, Founder of PreetiNest"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            </div>
            {/* Text Column */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
                Meet Our Founder
              </h2>
              <figure>
                <blockquote className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-[#D4AF37] pl-6 py-2">
                  <p>
                    "True success in business isn't just about the bottom line.
                    It's about the quality of the connections we make and the
                    moments we create. Our mission is to perfect those moments."
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

      {/* --- CTA Section --- */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A2342] mb-6">
            Ready to Elevate Your Next Event?
          </h2>
          <p className="text-[#D4AF37] text-lg max-w-2xl mx-auto mb-8">
            Let our team handle the details. Get in touch with us today to start
            planning your next seamless corporate experience.
          </p>
          <Link
            to="/contactus"
            className="inline-block cursor-pointer bg-[#0A2342] text-white font-bold py-3 px-8 
                       rounded-lg hover:bg-yellow-400 transition duration-300 text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
