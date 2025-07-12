import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white rounded-lg p-2">
              <span className="font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ReWear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-600 hover:text-gray-900 transition-colors">
              Browse
            </Link>
            <Link to="/list-item" className="text-gray-600 hover:text-gray-900 transition-colors">
              List Item
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Join ReWear
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link to="/browse" className="text-gray-600 hover:text-gray-900 transition-colors">
                Browse
              </Link>
              <Link to="/list-item" className="text-gray-600 hover:text-gray-900 transition-colors">
                List Item
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to="/login">
                  <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors text-left">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Join ReWear
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;