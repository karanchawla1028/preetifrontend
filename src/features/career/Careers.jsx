import React from "react";
import { Link } from "react-router-dom";

// --- Icons (Reusing a few and adding new ones) ---
const BriefcaseIcon = () => (
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
    className="h-6 w-6 text-white"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 2l-3-2"></path>
    <path d="M8 2l-3-2"></path>
  </svg>
);

const HeartIcon = () => (
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
    className="h-8 w-8 text-[#D4AF37] mb-3"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const GlobeIcon = () => (
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
    className="h-8 w-8 text-[#D4AF37] mb-3"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

const ClockIcon = () => (
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
    className="h-8 w-8 text-[#D4AF37] mb-3"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const DollarSignIcon = () => (
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
    className="h-8 w-8 text-[#D4AF37] mb-3"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

// --- Dummy Job Data ---
const jobOpenings = [
  {
    id: 1,
    title: "Corporate Event Manager",
    location: "New York, NY (Hybrid)",
    type: "Full-Time",
    link: "#apply-event-manager",
  },
  {
    id: 2,
    title: "Senior Hotel & Venue Relations Specialist",
    location: "Remote (Global)",
    type: "Full-Time",
    link: "#apply-hotel-specialist",
  },
  {
    id: 3,
    title: "Business Development Associate",
    location: "Chicago, IL",
    type: "Full-Time",
    link: "#apply-bizdev",
  },
  {
    id: 4,
    title: "Junior Travel Coordinator",
    location: "New York, NY",
    type: "Internship",
    link: "#apply-coordinator",
  },
];

// --- Careers Page Component ---
const Careers = () => {
  return (
    <main className="relative">
      {/* --- Hero Section --- */}
      <div className="relative bg-[#0A2342] pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Careers at PreetiNest
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Join a team where your passion for travel and events shapes the
            future of corporate hospitality.
          </p>
        </div>
      </div>

      {/* --- Why Join Us Section --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A2342] text-center mb-12">
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {/* Culture */}
            <div className="p-6 rounded-lg shadow-lg">
              <div className="w-full flex justify-center">
                <HeartIcon />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
                Collaborative Culture
              </h3>
              <p className="text-gray-600">
                Work in an environment built on mutual respect, growth, and team
                success.
              </p>
            </div>
            {/* Global Reach */}
            <div className="p-6 rounded-lg shadow-lg">
              <div className="w-full flex justify-center">
                <GlobeIcon />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
                Global Impact
              </h3>
              <p className="text-gray-600">
                Help coordinate events and travel across the globe, expanding
                your professional horizon.
              </p>
            </div>
            {/* Flexibility */}
            <div className="p-6 rounded-lg shadow-lg">
              <div className="w-full flex justify-center">
                <ClockIcon />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
                Flexibility & Balance
              </h3>
              <p className="text-gray-600">
                Benefit from flexible work arrangements and prioritize your
                well-being.
              </p>
            </div>
            {/* Compensation */}
            <div className="p-6 rounded-lg shadow-lg">
              <div className="w-full flex justify-center">
                <DollarSignIcon />
              </div>
              <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
                Competitive Compensation
              </h3>
              <p className="text-gray-600">
                Receive industry-leading salary packages and comprehensive
                benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Current Openings Section --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A2342] text-center mb-12">
            Current Job Openings
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-md border-l-4 border-[#D4AF37] hover:shadow-lg transition duration-300"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#0A2342]">
                    {job.title}
                  </h3>
                  <div className="mt-1 text-gray-500 text-sm space-x-4">
                    <span className="font-medium">{job.location}</span>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                      {job.type}
                    </span>
                  </div>
                </div>
                <Link
                  to={job.link}
                  className="mt-4 md:mt-0 flex items-center bg-[#0A2342] text-white font-medium py-2 px-6 rounded-full hover:bg-blue-900 transition duration-300 text-sm"
                >
                  Apply Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            ))}

            {/* No Openings Message */}
            {jobOpenings.length === 0 && (
              <div className="text-center p-10 bg-white rounded-xl shadow-md">
                <p className="text-gray-600 text-lg">
                  We don't have any open positions right now, but we are always
                  on the lookout for great talent!
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-block text-[#D4AF37] font-semibold hover:underline"
                >
                  Send us your CV
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-[#0A2342] mb-4">
            Don't See Your Role?
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            If you believe your skills and passion align with our vision, we
            still want to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-block cursor-pointer bg-[#D4AF37] text-[#0A2342] font-bold py-3 px-8 
                       rounded-lg hover:bg-yellow-400 transition duration-300 text-lg"
          >
            Submit Your Resume
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Careers;
