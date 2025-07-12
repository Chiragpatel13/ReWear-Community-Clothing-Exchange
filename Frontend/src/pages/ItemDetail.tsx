import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";

const mockItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=600&fit=crop",
    title: "Vintage Denim Jacket",
    size: "M",
    condition: "Excellent",
    points: 120,
    category: "Outerwear",
    description: "A classic vintage denim jacket in excellent condition. No stains or tears. Perfect for layering in any season. Brand: Levi's. Color: Blue.",
    postedBy: "@jane_doe"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    title: "Summer Dress",
    size: "S",
    condition: "Like new",
    points: 80,
    category: "Dresses",
    description: "A breezy summer dress, perfect for warm days. Lightly worn, no flaws.",
    postedBy: "@alice"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    title: "Leather Boots",
    size: "8",
    condition: "Good",
    points: 150,
    category: "Footwear",
    description: "Sturdy leather boots, some creasing but lots of life left. Great for fall/winter.",
    postedBy: "@bob"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop",
    title: "Graphic Tee",
    size: "L",
    condition: "Fair",
    points: 40,
    category: "Tops",
    description: "Comfy graphic tee, faded print but super soft.",
    postedBy: "@carol"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
    title: "Wool Scarf",
    size: "One Size",
    condition: "Excellent",
    points: 30,
    category: "Accessories",
    description: "Warm wool scarf, barely used. No holes or stains.",
    postedBy: "@dan"
  },
];

const ItemDetail = () => {
  const { id } = useParams();
  const item = mockItems.find(i => i.id === Number(id));
  const similarItems = mockItems.filter(i => i.id !== Number(id));

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Item Not Found</h1>
          <p className="text-gray-400 mb-8">Sorry, the item you are looking for does not exist.</p>
          <Link to="/browse">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Browse</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="rounded-xl shadow-lg w-full max-w-md object-cover bg-gray-800 border border-gray-700"
              style={{ aspectRatio: "1/1" }}
            />
          </div>
          {/* Details */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-2">{item.title}</h1>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-block px-3 py-1 rounded bg-gray-700 text-gray-200 text-sm">Size: {item.size}</span>
              <span className="inline-block px-3 py-1 rounded bg-gray-700 text-gray-200 text-sm">{item.condition}</span>
              <span className="inline-block px-3 py-1 rounded bg-blue-700 text-white text-sm font-semibold">{item.points} pts</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-400 text-sm">Posted by </span>
              <span className="text-blue-400 text-sm font-medium">{item.postedBy}</span>
            </div>
            <p className="text-gray-200 mb-8 text-lg leading-relaxed">{item.description}</p>
            <Button className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-lg font-semibold">Request Swap</Button>
          </div>
        </div>

        {/* Similar Items Carousel */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">Similar Items</h2>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {similarItems.map(sim => (
              <Link to={`/item/${sim.id}`} key={sim.id} className="min-w-[220px] max-w-[220px] hover:scale-[1.03] transition-transform">
                <Card className="bg-gray-800 border-gray-700 flex-shrink-0">
                  <img src={sim.image} alt={sim.title} className="w-full h-36 object-cover rounded-t-lg" />
                  <CardContent className="p-4 flex flex-col items-start">
                    <CardTitle className="text-white text-base mb-1">{sim.title}</CardTitle>
                    <span className="inline-block px-2 py-1 rounded bg-blue-700 text-white text-xs font-semibold mb-2">{sim.points} pts</span>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">View</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; 