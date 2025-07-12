import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getAllProducts, Product } from "@/lib/products";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ExternalLink, Search, X } from "lucide-react";
import { runStorageDebugTests } from "@/lib/debugStorage";

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories", "Activewear", "Formal Wear"];
const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "One Size", "1", "2", "3", "4","5", "6", "7", "8", "9", "10", "12", "14", "16", "26", "28", "30", "32", "34", "36", "38"];
const conditions = ["All", "New with tags", "New without tags", "Like new", "Excellent", "Good", "Fair"];

const Browse = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [condition, setCondition] = useState("All");
  const [pointsRange, setPointsRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
  }, [currentUser, navigate]);

  // Don't render anything if user is not authenticated
  if (!currentUser) {
    return null;
  }

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products...');
        const fetchedProducts = await getAllProducts();
        console.log('Fetched products:', fetchedProducts);
        // Log image URLs for debugging
        fetchedProducts.forEach(product => {
          console.log(`Product ${product.title} images:`, product.imageUrls);
        });
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add refresh function
  const refreshProducts = async () => {
    try {
      setLoading(true);
      console.log('Refreshing products...');
      const fetchedProducts = await getAllProducts();
      console.log('Refreshed products:', fetchedProducts);
      // Log image URLs for debugging
      fetchedProducts.forEach(product => {
        console.log(`Product ${product.title} images:`, product.imageUrls);
      });
      setProducts(fetchedProducts);
      setError(null);
    } catch (err) {
      console.error('Error refreshing products:', err);
      setError('Failed to refresh products.');
    } finally {
      setLoading(false);
    }
  };

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Filter logic with search
  const filteredItems = products.filter(item => {
    const inCategory = category === "All" || item.category === category;
    const inSize = size === "All" || item.size === size;
    const inCondition = condition === "All" || item.condition === condition;
    const inPoints = item.pointsValue >= pointsRange[0] && item.pointsValue <= pointsRange[1];
    
    // Search functionality
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.size.toLowerCase().includes(searchLower) ||
      item.condition.toLowerCase().includes(searchLower) ||
      (item.userName && item.userName.toLowerCase().includes(searchLower)) ||
      (item.userEmail && item.userEmail.toLowerCase().includes(searchLower)) ||
      item.pointsValue.toString().includes(searchLower);
    
    return inCategory && inSize && inCondition && inPoints && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Browse Items</h1>
            <p className="text-gray-300">
              Discover amazing clothing items from the ReWear community
            </p>
          </div>
          <div className="flex gap-2">
            {process.env.NODE_ENV === 'development' && (
              <Button 
                onClick={() => runStorageDebugTests()}
                variant="outline"
                className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                🧪 Debug Storage
              </Button>
            )}
            <Button 
              onClick={refreshProducts}
              disabled={loading}
              variant="outline"
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 bg-red-900/50 border border-red-600 rounded-lg p-4 text-red-200">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-300">Loading items...</span>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search items by title, description, category, size, condition, or seller..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-400">
                  Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </div>
              )}
            </div>

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
              {/* Clear All Filters Button */}
              {(category !== "All" || size !== "All" || condition !== "All" || pointsRange[0] !== 0 || pointsRange[1] !== 200 || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCategory("All");
                    setSize("All");
                    setCondition("All");
                    setPointsRange([0, 200]);
                    setSearchQuery("");
                  }}
                  className="bg-red-900/20 border-red-600 text-red-300 hover:bg-red-900/40"
                >
                  Clear All Filters
                </Button>
              )}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-12">
                  {products.length === 0 ? 'No items available yet.' : 
                   searchQuery ? `No items found matching "${searchQuery}". Try adjusting your search or filters.` : 
                   'No items found for selected filters.'}
                </div>
              ) : (
                filteredItems.map(item => {
                  console.log('🔍 Rendering item:', item.title, 'Image URLs:', item.imageUrls);
                  return (
                  <Link 
                    key={item.id} 
                    to={`/item/${item.id}`}
                    className="group block transition-transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    <Card className="bg-gray-800 border-gray-700 flex flex-col h-full group-hover:border-blue-500 transition-colors cursor-pointer">
                      <div className="relative w-full h-48 bg-gray-700 rounded-t-lg overflow-hidden">
                        {/* Image overlay indicator */}
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="h-3 w-3" />
                        </div>
                        
                        {(() => {
                          if (item.imageUrls && Array.isArray(item.imageUrls) && item.imageUrls.length > 0 && item.imageUrls[0]) {
                            return (
                              <img 
                                src={item.imageUrls[0]} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onLoad={() => console.log('✅ Image loaded successfully:', item.imageUrls[0])}
                                onError={(e) => {
                                  console.error('❌ Image failed to load:', {
                                    url: item.imageUrls[0],
                                    productId: item.id,
                                    title: item.title,
                                    error: e
                                  });
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const placeholder = target.parentElement?.querySelector('.image-placeholder') as HTMLElement;
                                  if (placeholder) {
                                    placeholder.style.display = 'flex';
                                  }
                                }}
                                crossOrigin="anonymous"
                              />
                            );
                          } else {
                            console.log('⚠️ No valid image URL for item:', {
                              title: item.title,
                              imageUrls: item.imageUrls,
                              hasImageUrls: !!item.imageUrls,
                              isArray: Array.isArray(item.imageUrls),
                              length: item.imageUrls?.length
                            });
                            return null;
                          }
                        })()}
                        <div className={`image-placeholder absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-700 ${item.imageUrls && Array.isArray(item.imageUrls) && item.imageUrls.length > 0 && item.imageUrls[0] ? 'hidden' : 'flex'}`}>
                          <div className="text-center">
                            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">No Image Available</span>
                            {/* Debug info in development */}
                            {process.env.NODE_ENV === 'development' && (
                              <div className="text-xs mt-1 opacity-75">
                                {item.imageUrls ? `URLs: ${item.imageUrls.length}` : 'No URLs'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardContent className="flex-1 flex flex-col p-4">
                        <CardTitle className="text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">{item.title}</CardTitle>
                        <CardDescription className="text-gray-400 mb-2">{item.category}</CardDescription>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-block px-2 py-1 rounded bg-gray-700 text-gray-200 text-xs">Size: {item.size}</span>
                          <span className="inline-block px-2 py-1 rounded bg-gray-700 text-gray-200 text-xs">{item.condition}</span>
                          <span className="inline-block px-2 py-1 rounded bg-blue-700 text-white text-xs font-semibold">{item.pointsValue} pts</span>
                        </div>
                        <div className="text-xs text-gray-400 mb-3">
                          Listed by: {item.userName || item.userEmail || 'Unknown User'}
                        </div>
                        <Button 
                          className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Handle swap request logic here
                            console.log('Requesting swap for item:', item.id);
                          }}
                        >
                          Request Swap
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Browse; 