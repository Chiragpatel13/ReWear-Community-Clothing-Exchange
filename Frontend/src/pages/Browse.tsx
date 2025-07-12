import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const mockItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop",
    title: "Vintage Denim Jacket",
    size: "M",
    condition: "Excellent",
    points: 120,
    category: "Outerwear"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    title: "Summer Dress",
    size: "S",
    condition: "Like new",
    points: 80,
    category: "Dresses"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    title: "Leather Boots",
    size: "8",
    condition: "Good",
    points: 150,
    category: "Footwear"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop",
    title: "Graphic Tee",
    size: "L",
    condition: "Fair",
    points: 40,
    category: "Tops"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
    title: "Wool Scarf",
    size: "One Size",
    condition: "Excellent",
    points: 30,
    category: "Accessories"
  },
];

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories"];
const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "One Size", "6", "8", "10", "12"];
const conditions = ["All", "New", "Like new", "Excellent", "Good", "Fair"];

const Browse = () => {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [condition, setCondition] = useState("All");
  const [pointsRange, setPointsRange] = useState([0, 200]);

  // Filter logic
  const filteredItems = mockItems.filter(item => {
    const inCategory = category === "All" || item.category === category;
    const inSize = size === "All" || item.size === size;
    const inCondition = condition === "All" || item.condition === condition;
    const inPoints = item.points >= pointsRange[0] && item.points <= pointsRange[1];
    return inCategory && inSize && inCondition && inPoints;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-wrap gap-4 items-center">
          <div className="w-40">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-gray-900 text-white border-gray-700">
                <SelectValue placeholder="Category" className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white border-gray-700">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-800">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-32">
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="bg-gray-900 text-white border-gray-700">
                <SelectValue placeholder="Size" className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white border-gray-700">
                {sizes.map(sz => (
                  <SelectItem key={sz} value={sz} className="text-white hover:bg-gray-800">{sz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-40">
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="bg-gray-900 text-white border-gray-700">
                <SelectValue placeholder="Condition" className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white border-gray-700">
                {conditions.map(cond => (
                  <SelectItem key={cond} value={cond} className="text-white hover:bg-gray-800">{cond}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 w-56">
            <label className="text-gray-300 text-xs">Points Range</label>
            <Slider
              min={0}
              max={200}
              step={10}
              value={pointsRange}
              onValueChange={setPointsRange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{pointsRange[0]}</span>
              <span>{pointsRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">No items found for selected filters.</div>
          ) : (
            filteredItems.map(item => (
              <Card key={item.id} className="bg-gray-800 border-gray-700 flex flex-col h-full">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardContent className="flex-1 flex flex-col p-4">
                  <CardTitle className="text-white text-lg mb-1">{item.title}</CardTitle>
                  <CardDescription className="text-gray-400 mb-2">{item.category}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-2 py-1 rounded bg-gray-700 text-gray-200 text-xs">Size: {item.size}</span>
                    <span className="inline-block px-2 py-1 rounded bg-gray-700 text-gray-200 text-xs">{item.condition}</span>
                    <span className="inline-block px-2 py-1 rounded bg-blue-700 text-white text-xs font-semibold">{item.points} pts</span>
                  </div>
                  <Button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white">Request Swap</Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse; 