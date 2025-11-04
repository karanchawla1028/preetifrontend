import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0A2342] text-white pt-2 pb-8">
      <div className="flex items-center gap-1 px-10 mx-auto">
        <h4>Follow us :</h4>
        <div className="flex space-x-4">
          <a
            href="#"
            className="p-2 bg-blue-900/50 hover:bg-[#D4AF37] hover:text-[#0A2342] rounded-full transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="p-2 bg-blue-900/50 hover:bg-[#D4AF37] hover:text-[#0A2342] rounded-full transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="p-2 bg-blue-900/50 hover:bg-[#D4AF37] hover:text-[#0A2342] rounded-full transition-colors duration-300"
            aria-label="Twitter / X"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="h-[80px] w-[95px] p-3">
            <a href="/">
              <img
                src={logo}
                alt="preeti-nest"
                className="h-auto w-full rounded-2xl"
              />
            </a>
          </div>
          <p className="text-gray-400 mt-2 italic text-sm">
            Your Corporate Meeting & Travel Partner.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">Company</h4>
          <ul>
            <li className="mb-2">
              <a href="/aboutus" className="hover:underline text-gray-300">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Our Story
              </a>
            </li>
            <li className="mb-2">
              <a href="/careers" className="hover:underline text-gray-300">
                Careers
              </a>
            </li>
            <li className="mb-2">
              <a href="/contactus" className="hover:underline text-gray-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">
            Services
          </h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Meeting Space Booking
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Hotel Reservations
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Corporate Travel Management
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Event Coordination
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Group Bookings
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#D4AF37]">
            Connect / Newsletter
          </h4>
          <h6 className="font-medium text-sm mb-1 text-white">
            Stay Connected
          </h6>
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
          <div>
            <p className="text-gray-400 mb-2">📧 info@preetinest.com</p>
            <p className="text-gray-400 mb-2">📞 +1 7052070182</p>
          </div>
        </div>
      </div>
      <p className="text-gray-400 mt-2 italic px-16">
        Helping businesses find the perfect venues, hotels, and travel solutions
        for meetings, events, and corporate stays — across India and Canada.
      </p>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-8 border-t border-blue-800 pt-6">
        © {new Date().getFullYear()} PreetiNest. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
