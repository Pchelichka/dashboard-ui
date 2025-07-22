import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Image Review", id: "image-review", path: "/" },
  { label: "Drone Status", id: "drone-status", path: "/drone-status" },
  { label: "Sensor Preview", id: "sensor-preview", path: "/sensor-preview" },
  { label: "Analytics", id: "analytics", path: "/analytics" },
  { label: "Configuration", id: "configuration", path: "/configuration" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab by matching current path with navItems paths
  // For "/" path exact match, otherwise startsWith for subpaths
  const activeTab = navItems.find(({ path }) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path)
  )?.id;

  return (
    <header className="bg-black text-yellow-400 flex items-center justify-between px-6 py-4 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3 cursor-pointer select-none">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold tracking-wider">
          PCHELICHKA Dashboard
        </span>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-6 text-lg">
          {navItems.map(({ label, id, path }) => (
            <li
              key={id}
              onClick={() => navigate(path)}
              className={`cursor-pointer relative py-1 px-2 rounded-md transition-all duration-300
                ${
                  activeTab === id
                    ? "text-black bg-yellow-400 font-semibold shadow-[0_0_10px_rgba(252,211,77,0.7)]"
                    : "hover:text-yellow-300"
                }
              `}
            >
              {label}
              {activeTab === id && (
                <span
                  className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 animate-fade-in"
                  style={{ animationDuration: "0.4s" }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
