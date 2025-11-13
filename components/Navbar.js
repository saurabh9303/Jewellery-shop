'use client';
import { useState } from "react";
import { Menu, X, ShoppingBag, User, Search, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <>
      <nav className="relative z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 text-xl sm:text-2xl font-bold tracking-wide text-yellow-700 hover:text-yellow-600 transition-colors"
            >
              ✨Abhi<span className="text-yellow-500">Jewellers</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group px-3 py-2 text-gray-800 hover:text-yellow-600 transition-colors font-medium"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Desktop Search & Icons */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search jewellery..."
                  className="w-48 xl:w-56 px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Search
                    className="text-gray-500 hover:text-yellow-600 transition-colors"
                    size={18}
                  />
                </button>
              </div>

              <a
                href="/account"
                className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
              >
                <User
                  className="text-gray-700 hover:text-yellow-600 transition-colors"
                  size={22}
                />
              </a>
              <a
                href="/cart"
                className="p-2 hover:bg-yellow-50 rounded-full transition-colors relative"
              >
                <ShoppingBag
                  className="text-gray-700 hover:text-yellow-600 transition-colors"
                  size={22}
                />
                <span className="absolute top-0 right-0 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="flex lg:hidden items-center gap-3">
              <button className="p-2">
                <Search className="text-gray-700" size={20} />
              </button>
              <a href="/cart" className="p-2 relative">
                <ShoppingBag className="text-gray-700" size={20} />
                <span className="absolute top-0 right-0 w-4 h-4 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </a>
              <button
                className="p-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-4 space-y-1">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search jewellery..."
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Search className="text-gray-500" size={18} />
                </button>
              </div>
            </div>

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-gray-800 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Dropdown */}
            <div>
              <button
                onClick={() => setMobileDropdown(!mobileDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-800 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors font-medium"
              >
                <span>Categories</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileDropdown
                    ? "max-h-64 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                
              </div>
            </div>

            <a
              href="/account"
              className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <User size={20} />
              <span>My Account</span>
            </a>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
