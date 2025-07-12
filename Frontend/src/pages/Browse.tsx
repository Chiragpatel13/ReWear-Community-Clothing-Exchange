import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

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
  // Add more items for pagination demo
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=400&fit=crop",
    title: "Classic Blue Jeans",
    size: "L",
    condition: "Good",
    points: 90,
    category: "Bottoms"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop",
    title: "Raincoat",
    size: "M",
    condition: "Excellent",
    points: 110,
    category: "Outerwear"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    title: "Party Dress",
    size: "S",
    condition: "New",
    points: 160,
    category: "Dresses"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    title: "Sneakers",
    size: "9",
    condition: "Like new",
    points: 70,
    category: "Footwear"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop",
    title: "Hoodie",
    size: "XL",
    condition: "Excellent",
    points: 100,
    category: "Tops"
  },
];

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories"];
const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "One Size", "6", "8", "9", "10", "12"];
const conditions = ["All", "New", "Like new", "Excellent", "Good", "Fair"];
const ITEMS_PER_PAGE = 8;

const Browse = () => {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [condition, setCondition] = useState("All");
  const [pointsRange, setPointsRange] = useState([0, 200]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredItems = mockItems.filter(item => {
    const inCategory = category === "All" || item.category === category;
    const inSize = size === "All" || item.size === size;
    const inCondition = condition === "All" || item.condition === condition;
    const inPoints = item.points >= pointsRange[0] && item.points <= pointsRange[1];
    const inSearch = item.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
    return inCategory && inSize && inCondition && inPoints && inSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Handle page change
  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Reset to page 1 when filters/search change
  React.useEffect(() => {
    setPage(1);
  }, [category, size, condition, pointsRange, searchTerm]);

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">Browse Items</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover unique fashion pieces from the community. Use filters to find your perfect swap!</p>
        </div>

        {/* Filters */}
        <div className="mb-10 rounded-2xl border border-gray-800 bg-black/60 backdrop-blur-md shadow-lg p-6 flex flex-wrap gap-4 items-center justify-center">
          <div className="w-44">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-black/80 text-white border-gray-700 focus:ring-2 focus:ring-blue-600">
                <SelectValue placeholder="Category" className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-gray-700">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-800">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-36">
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="bg-black/80 text-white border-gray-700 focus:ring-2 focus:ring-blue-600">
                <SelectValue placeholder="Size" className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-gray-700">
                {sizes.map(sz => (
                  <SelectItem key={sz} value={sz} className="text-white hover:bg-gray-800">{sz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-44">
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="bg-black/80 text-white border-gray-700 focus:ring-2 focus:ring-blue-600">
                <SelectValue placeholder="Condition" className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-gray-700">
                {conditions.map(cond => (
                  <SelectItem key={cond} value={cond} className="text-white hover:bg-gray-800">{cond}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 w-60">
            <label className="text-gray-300 text-xs font-medium mb-1">Points Range</label>
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
          <div className="w-44">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title..."
                className="w-full rounded-lg bg-black/80 border border-gray-700 text-white placeholder-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 mb-10 bg-gradient-to-r from-transparent via-gray-800 to-transparent rounded-full shadow-inner" />

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedItems.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">No items found for selected filters.</div>
          ) : (
            paginatedItems.map(item => (
              <Link to={`/item/${item.id}`} key={item.id} className="hover:scale-[1.04] transition-transform">
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/80 border border-gray-800 rounded-2xl shadow-xl flex flex-col h-full cursor-pointer group overflow-hidden relative">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-56 object-cover rounded-t-2xl group-hover:brightness-110 group-hover:scale-105 transition-all duration-300" />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold tracking-wide">
                      {item.points} pts
                    </div>
                  </div>
                  <CardContent className="flex-1 flex flex-col p-5">
                    <CardTitle className="text-white text-xl mb-1 font-bold group-hover:text-blue-400 transition-colors">{item.title}</CardTitle>
                    <CardDescription className="text-gray-400 mb-3">{item.category}</CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block px-2 py-1 rounded bg-gray-800/80 text-gray-200 text-xs">Size: {item.size}</span>
                      <span className="inline-block px-2 py-1 rounded bg-gray-800/80 text-gray-200 text-xs">{item.condition}</span>
                    </div>
                    <Button className="mt-auto w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-semibold py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      Request Swap
                    </Button>
                  </CardContent>
                  <div className="absolute inset-0 pointer-events-none group-hover:ring-2 group-hover:ring-blue-500 rounded-2xl transition-all duration-300" />
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={e => { e.preventDefault(); goToPage(page - 1); }} 
                    className={`bg-white text-gray-900 border border-gray-300 hover:bg-gray-200 ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={page === idx + 1}
                      onClick={e => { e.preventDefault(); goToPage(idx + 1); }}
                      className={
                        page === idx + 1
                          ? 'bg-white text-gray-900 border border-blue-500 font-bold'
                          : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-200'
                      }
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={e => { e.preventDefault(); goToPage(page + 1); }} 
                    className={`bg-white text-gray-900 border border-gray-300 hover:bg-gray-200 ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse; 