import React, { useState } from "react";
import { Menu, Bell, MessageCircle } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (
    page: "search" | "profile" | "jobs" | "dashboard" | "settings"
  ) => void;
  username: string;
  profileImage?: string;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onPageChange,
  username,
  profileImage = "/images/Anchor.png",
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/molo.png"
              alt="Melolink Logo"
              className="w-40 h-6 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["search", "jobs", "dashboard", "settings"].map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page as any)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {page === "search"
                  ? "Browse Musicians"
                  : page === "jobs"
                  ? "Find Jobs"
                  : page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </nav>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            {currentPage === "profile" && (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Messages */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* Profile image */}
                <img
                  src={profileImage}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              </>
            )}

            {/* ✅ Menu Button — always visible on mobile */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {["search", "jobs", "dashboard", "settings"].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    onPageChange(page as any);
                    setShowMobileMenu(false);
                  }}
                  className={`text-left py-2 text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {page === "search"
                    ? "Browse Musicians"
                    : page === "jobs"
                    ? "Find Jobs"
                    : page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
