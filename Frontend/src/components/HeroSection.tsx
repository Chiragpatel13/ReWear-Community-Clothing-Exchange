import { Link } from "react-router-dom";
import CardSwap, { Card } from './CardSwap';
import Threads from './Threads';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Threads Background Effect */}
      <div className="absolute inset-0 z-0">
        <Threads
          color={[0.2, 0.4, 0.8]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* CardSwap Background Effect */}
      <div className="absolute inset-0 z-10">
        <CardSwap
          width={450}
          height={350}
          cardDistance={60}
          verticalDistance={80}
          delay={5000}
          pauseOnHover={false}
          skewAmount={6}
          easing="elastic"
        >
          <Card customClass="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-3">Sustainable Fashion</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Reduce waste by giving clothes new homes through our community exchange platform.
              </p>
            </div>
          </Card>
          <Card customClass="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-3">Community Driven</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Connect with neighbors who share your values and passion for sustainable living.
              </p>
            </div>
          </Card>
          <Card customClass="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-3">Free & Safe Exchanges</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Safe meetup locations and verified community members make exchanges worry-free.
              </p>
            </div>
          </Card>
        </CardSwap>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Give Your Clothes a{" "}
                <span className="text-blue-400">Second Life</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Join ReWear's community-driven clothing exchange. Share, swap, and discover pre-loved fashion while reducing waste and building connections.
              </p>
            </div>

            {/* CTA Buttons and Stats removed as requested */}
          </div>

          {/* Hero Features - Removed the three feature cards */}
          <div className="space-y-6">
            {/* Content removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;