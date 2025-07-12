import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";
import { getProductById, getAllProducts, Product } from "@/lib/products";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ArrowLeft, Heart, Share2, MessageCircle, Calendar, User } from "lucide-react";

const ItemDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', id);
        const fetchedProduct = await getProductById(id);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          
          // Fetch similar products (same category, excluding current product)
          const allProducts = await getAllProducts();
          const similar = allProducts
            .filter(p => p.id !== id && p.category === fetchedProduct.category)
            .slice(0, 4); // Limit to 4 similar products
          setSimilarProducts(similar);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-300">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">{error || 'Sorry, the product you are looking for does not exist.'}</p>
          <Link to="/browse">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/browse">
            <Button variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Gallery */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <div className="relative">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <div className="relative">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.title}
                    className="rounded-xl shadow-lg w-full object-cover bg-gray-800 border border-gray-700"
                    style={{ aspectRatio: "1/1" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.parentElement?.querySelector('.image-placeholder') as HTMLElement;
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="image-placeholder absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-800 border border-gray-700 rounded-xl hidden">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">No Image Available</span>
                    </div>
                  </div>
                  
                  {/* Action buttons overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-black bg-opacity-50 text-white hover:bg-opacity-70">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-black bg-opacity-50 text-white hover:bg-opacity-70">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">No Image Available</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>
              
              {/* Category and Points */}
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-gray-700 text-gray-200 text-sm">
                  {product.category}
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-700 text-white text-sm font-semibold">
                  {product.pointsValue} points
                </span>
              </div>

              {/* Size and Condition */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-block px-3 py-1 rounded bg-gray-700 text-gray-200 text-sm">
                  Size: {product.size}
                </span>
                <span className="inline-block px-3 py-1 rounded bg-gray-700 text-gray-200 text-sm">
                  Condition: {product.condition}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400 text-sm">Listed by</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-medium">
                    {product.userName || product.userEmail || 'Unknown User'}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(product.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-lg font-semibold">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Request Swap
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                  <Heart className="mr-2 h-4 w-4" />
                  Save for Later
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map(similarProduct => (
                <Link 
                  key={similarProduct.id} 
                  to={`/item/${similarProduct.id}`}
                  className="group block transition-transform hover:scale-[1.02] hover:shadow-xl"
                >
                  <Card className="bg-gray-800 border-gray-700 flex-shrink-0 group-hover:border-blue-500 transition-colors cursor-pointer">
                    <div className="relative w-full h-48 bg-gray-700 rounded-t-lg overflow-hidden">
                      {similarProduct.imageUrls && similarProduct.imageUrls.length > 0 ? (
                        <img 
                          src={similarProduct.imageUrls[0]} 
                          alt={similarProduct.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-white text-base mb-2 group-hover:text-blue-400 transition-colors">
                        {similarProduct.title}
                      </CardTitle>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">{similarProduct.category}</span>
                        <span className="inline-block px-2 py-1 rounded bg-blue-700 text-white text-xs font-semibold">
                          {similarProduct.pointsValue} pts
                        </span>
                      </div>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail; 