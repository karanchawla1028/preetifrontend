import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0A2342] text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">
            <div className="h-[80px] w-[95px] p-3">
              <img
                src={logo}
                alt="preeti-nest"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </h3>
          <p className="text-gray-400">
            Premium travel solutions for modern businesses.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">Company</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Careers
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">
            Services
          </h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Hotel Bookings
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Flight Reservations
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Car Rentals
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">
            Newsletter
          </h4>
          <p className="text-gray-400 mb-2">
            Stay up to date with our latest offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-blue-900/50 p-2 rounded-l-md w-full text-white outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button className="bg-[#D4AF37] text-[#0A2342] font-bold px-4 rounded-r-md">
              Go
            </button>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-12 border-t border-blue-800 pt-6">
        © {new Date().getFullYear()} YourLogo. All Rights Reserved.
      </div>
    </footer>
  );
};
export default Footer;
