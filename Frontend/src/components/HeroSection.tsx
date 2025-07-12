import { Link } from "react-router-dom";
import LazyCardSwap, { Card } from './LazyCardSwap';
import LazyThreads from './LazyThreads';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Threads Background Effect */}
      <div className="absolute inset-0 z-0">
        <LazyThreads
          color={[0.2, 0.4, 0.8]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* CardSwap Background Effect */}
      <div className="absolute inset-0 z-10">
        <LazyCardSwap
          width={450}
          height={350}
          cardDistance={60}
          verticalDistance={80}
          delay={5000}
          pauseOnHover={false}
          skewAmount={6}
          easing="elastic"
        >
          <Card>
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop&q=90" alt="Modern streetwear" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </Card>
          <Card>
            <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=600&fit=crop&q=90" alt="Classic menswear" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </Card>
          <Card>
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=600&fit=crop&q=90" alt="Trendy women's fashion" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </Card>
        </LazyCardSwap>
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