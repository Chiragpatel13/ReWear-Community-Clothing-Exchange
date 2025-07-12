import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Give Your Clothes a{" "}
                <span className="text-blue-600">Second Life</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join ReWear's community-driven clothing exchange. Share, swap, and discover pre-loved fashion while reducing waste and building connections.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Start Exchanging
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              <Link to="/browse">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Browse Items
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2.5K+</div>
                <div className="text-sm text-gray-600">Items Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1.2K+</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Features */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-sm">
                <div className="bg-green-100 rounded-lg p-3 w-fit">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Sustainable Fashion</h3>
                <p className="text-sm text-gray-600">
                  Reduce waste by giving clothes new homes
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-sm">
                <div className="bg-blue-100 rounded-lg p-3 w-fit">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3h10a3 3 0 013 3v2a3 3 0 01-3 3m-1 4V12a3 3 0 00-3-3H9a3 3 0 00-3 3v8" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Community Driven</h3>
                <p className="text-sm text-gray-600">
                  Connect with neighbors who share your values
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-sm col-span-2">
                <div className="bg-red-100 rounded-lg p-3 w-fit">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Free & Safe Exchanges</h3>
                <p className="text-sm text-gray-600">
                  Safe meetup locations and verified community members make exchanges worry-free
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;