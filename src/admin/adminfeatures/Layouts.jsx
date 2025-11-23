import React, { useState } from "react";
import {
  Home,
  Settings,
  LogOut,
  HandHelping,
  User,
  Blocks,
  SquareMenu,
} from "lucide-react";
import logo from "../../assets/logo_preeti.png";
import { Link, Outlet } from "react-router-dom";

const Layouts = ({ children }) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const navLinks = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, url: "dashboard" },
    {
      name: "Category",
      icon: <HandHelping className="w-5 h-5" />,
      url: "category",
    },
    {
      name: "Blogs",
      icon: <Blocks className="w-5 h-5" />,
      url: "blogs",
    },
    {
      name: "enquiries",
      icon: <SquareMenu className="w-5 h-5" />,
      url: "enquiries",
    },
    {
      name: "Users",
      icon: <User className="w-5 h-5" />,
      url: "users",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      url: "settings",
    },
    { name: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-46 bg-[#0a2342] text-white flex flex-col">
        <div className="w-full flex items-center">
          <div className="flex items-center justify-center h-14 w-32 p-2 bg-transparent">
            <img
              src={logo}
              alt="Company Logo"
              className="h-full w-auto object-contain bg-transparent"
              draggable="false"
            />
          </div>
        </div>
        <nav className="flex-1 px-2 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              to={link.url}
              key={link.name}
              onClick={() => setActiveLink(link.name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500 transition ${
                activeLink === link.name ? "bg-blue-500" : ""
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-2 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layouts;
