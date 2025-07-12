import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { 
  Leaf, 
  Users, 
  Heart, 
  Shield, 
  Award, 
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Globe,
  Zap,
  Target,
  Star
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Active Members", value: "2,500+", icon: Users },
    { label: "Items Exchanged", value: "15,000+", icon: Heart },
    { label: "Waste Reduced", value: "8.5 tons", icon: Leaf },
    { label: "Cities Covered", value: "25+", icon: Globe },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Reducing fashion waste by giving clothes a second life through community exchange.",
      color: "text-green-400"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections between neighbors who share values of sustainable living.",
      color: "text-blue-400"
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Making quality clothing accessible to everyone regardless of budget.",
      color: "text-pink-400"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified members and safe meetup locations ensure worry-free exchanges.",
      color: "text-purple-400"
    }
  ];

  const team = [
    {
      name: "Chirag",
      role: "FRONTED DEVELOPER",
      avatar: "/team/chirag.jpg"
    },
    {
      name: "Yash",
      role: "BACKEND DEVELOPER",
      avatar: "/team/yash.jpg"
    },
    {
      name: "Darshit",
      role: "FRONTED DEVELOPER",
      avatar: "/team/darshit.jpg"
    },
    {
      name: "Dev",
      role: "BACKEND DEVELOPER",
      avatar: "/team/dev.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          
          
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-600/20 text-blue-400 border-blue-600/30">
              About ReWear
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Revolutionizing Fashion Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Community Exchange
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              ReWear is more than just a clothing exchange platform. We're a movement towards sustainable fashion, 
              community building, and reducing waste one swap at a time.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/browse">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Browsing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-600/20 text-green-400 border-green-600/30">
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Creating a Sustainable Future Through Fashion
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                The fashion industry is one of the largest polluters globally. We believe that by connecting 
                communities and facilitating clothing exchanges, we can significantly reduce waste while making 
                fashion more accessible and sustainable.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our platform empowers individuals to give their clothes a second life, build meaningful 
                connections with neighbors, and contribute to a more sustainable future.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-green-400">
                  <Target className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Reduce Waste</span>
                </div>
                <div className="flex items-center text-blue-400">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Build Community</span>
                </div>
                <div className="flex items-center text-purple-400">
                  <Zap className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Save Money</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-gray-700">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600/20 p-3 rounded-lg">
                      <Leaf className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Environmental Impact</h3>
                      <p className="text-gray-300">Each clothing exchange saves approximately 2.5kg of CO2 emissions and reduces textile waste.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-600/20 p-3 rounded-lg">
                      <Heart className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Community Building</h3>
                      <p className="text-gray-300">Connect with like-minded individuals who share your passion for sustainable living.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-600/20 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Quality Assurance</h3>
                      <p className="text-gray-300">All items are verified and meet our quality standards before being listed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-600/20 text-purple-400 border-purple-600/30">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our core values guide everything we do, from platform development to community engagement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`${value.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-600/20 text-pink-400 border-pink-600/30">
              Meet Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The People Behind ReWear
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our passionate team is dedicated to making sustainable fashion accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-600 hover:border-blue-400 transition-colors duration-300">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-xs">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="ReWear Logo" 
              className="h-15 w-auto object-contain"
              style={{ display: "block" }}
            />
          </div>
          <p className="text-gray-400 mb-4">
            Making sustainable fashion accessible to everyone.
          </p>
          
        </div>
      </footer>
    </div>
  );
};

export default About; 