import React, { useState } from "react";
import { Home, Settings, LogOut, HandHelping } from "lucide-react";
import logo from "../../assets/logo.png"; // Replace with your logo

const Layouts = ({ children }) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const navLinks = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Services", icon: <HandHelping className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
    { name: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        {/* Logo */}
        <div className="flex items-center h-20 border-b border-blue-500 pl-5">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setActiveLink(link.name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-500 transition ${
                activeLink === link.name ? "bg-blue-500" : ""
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{activeLink}</h1>
        </header>

        {/* Render page content */}
        <div className="bg-white p-6 rounded-xl shadow-md min-h-[70vh]">
          {children || (
            <p className="text-gray-600">
              Welcome to the admin panel. Select a menu item to get started.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layouts;
