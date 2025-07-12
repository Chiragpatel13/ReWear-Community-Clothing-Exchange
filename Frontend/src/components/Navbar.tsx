import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User as UserIcon } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="ReWear Logo"
              className="h-8 w-auto object-contain"
              style={{ display: "block" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
              Browse
            </Link>
            <Link to="/list-item" className="text-gray-300 hover:text-white transition-colors">
              List Item
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link to="/login">
                <button className="px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors">
                  Sign In
                </button>
              </Link>
            ) : (
              <button
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none"
                onClick={() => navigate("/profile")}
                aria-label="User profile"
              >
                <UserIcon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
                Browse
              </Link>
              <Link to="/list-item" className="text-gray-300 hover:text-white transition-colors">
                List Item
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                {isAuthenticated ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors text-left"
                  >
                    More Detail
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="w-full px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors text-left">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;