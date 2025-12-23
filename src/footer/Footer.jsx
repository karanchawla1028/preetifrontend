import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const serviceList = useSelector((state) => state.service.serviceList);
  return (
    <footer className="bg-[#0A2342] text-white pt-2 pb-8">
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
          <div className="flex flex-col gap-1 mx-auto mt-2">
            <h4 className="font-medium">Follow us :</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61583264045461"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-900/50 hover:bg-[#D4AF37] hover:text-[#0A2342] rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/preetinest?igsh=MTJ5eTFidndsejgzMQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-900/50 hover:bg-[#D4AF37] hover:text-[#0A2342] rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/103129295/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-900/50 hover:bg-[#D4AF37] hover:text-[#0A2342] rounded-full transition-colors duration-300"
                aria-label="Twitter / X"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
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
            {serviceList?.length > 0 &&
              serviceList?.map((service) => (
                <li key={service.id} className="mb-2">
                  <Link  
                    to={`/${service?.slug}/service`}
                    className="hover:underline text-gray-300"
                  >
                    {service?.name}
                  </Link>
                </li>
              ))}
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
        for meetings, events, and corporate stays.
      </p>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-8 border-t border-blue-800 pt-6">
        © {new Date().getFullYear()} PreetiNest. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
