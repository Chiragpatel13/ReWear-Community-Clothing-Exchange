import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface FormData {
  title: string;
  description: string;
  size: string;
  condition: string;
  category: string;
  pointsValue: number | undefined;
  images: File[];
}

const ListItem = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    size: "",
    condition: "",
    category: "",
    pointsValue: undefined as any,
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "Tops",
    "Bottoms", 
    "Dresses",
    "Outerwear",
    "Footwear",
    "Accessories",
    "Activewear",
    "Formal Wear"
  ];

  const sizes = [
    "XS", "S", "M", "L", "XL", "XXL",
    "2", "4", "6", "8", "10", "12", "14", "16",
    "26", "28", "30", "32", "34", "36", "38",
    "One Size"
  ];

  const conditions = [
    "New with tags",
    "New without tags", 
    "Like new",
    "Excellent",
    "Good",
    "Fair"
  ];

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        alert(`${file.name} is not a valid image type. Please use JPEG, PNG, or WebP.`);
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Please use images under 5MB.`);
      }
      
      return isValidType && isValidSize;
    });

    if (validFiles.length + formData.images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    // Create previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));
    
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    setImagePreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      return newPreviews;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  const calculateSuggestedPoints = () => {
    let basePoints = 50;
    
    // Adjust based on condition
    const conditionMultiplier = {
      "New with tags": 1.5,
      "New without tags": 1.3,
      "Like new": 1.2,
      "Excellent": 1.0,
      "Good": 0.8,
      "Fair": 0.6
    };
    
    if (formData.condition) {
      basePoints *= conditionMultiplier[formData.condition as keyof typeof conditionMultiplier] || 1;
    }
    
    return Math.round(basePoints);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center p-4 pt-8">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Listed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your item has been added to the ReWear community. You'll earn points when someone exchanges with you!
              </p>
              <div className="space-y-3">
                <Link to="/">
                  <Button className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => {
                  setSubmitSuccess(false);
                  setFormData({
                    title: "",
                    description: "",
                    size: "",
                    condition: "",
                    category: "",
                    pointsValue: undefined as any,
                    images: []
                  });
                  setImagePreviews([]);
                }}>
                  List Another Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Item</h1>
          <p className="text-gray-600">
            Share clothes you no longer need and help them find a new home
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>
                  Provide detailed information about your clothing item
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Vintage Denim Jacket, Summer Dress"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  {/* Category and Size */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Size *</Label>
                      <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail. Include brand, material, any flaws, and why you're letting it go..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Images *</Label>
                    <div className="space-y-4">
                      {/* Upload Area */}
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload images or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, WebP up to 5MB each (max 5 images)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Image Previews */}
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Points Value */}
                  <div className="space-y-2">
                    <Label htmlFor="pointsValue">Points Value *</Label>
                    <div className="space-y-2">
                      <Input
                        id="pointsValue"
                        type="number"
                        min="0"
                        placeholder="Enter points value"
                        value={formData.pointsValue || ""}
                        onChange={(e) => handleInputChange("pointsValue", parseInt(e.target.value) || undefined)}
                        required
                      />
                      {formData.condition && (
                        <p className="text-sm text-gray-600">
                          Suggested: {calculateSuggestedPoints()} points based on condition
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || !formData.title || !formData.category || !formData.size || !formData.condition || !formData.description || formData.images.length === 0 || formData.pointsValue === undefined}
                  >
                    {isSubmitting ? "Listing Item..." : "List Item"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Better Listings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded">
                    <ImageIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Good Photos</p>
                    <p className="text-xs text-gray-600">Take clear, well-lit photos from multiple angles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Honest Condition</p>
                    <p className="text-xs text-gray-600">Be accurate about wear and any flaws</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-1 rounded">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fair Pricing</p>
                    <p className="text-xs text-gray-600">Consider condition and original value</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Points Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How Points Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">You earn points when someone exchanges with you</span>
                  <Badge variant="outline">+{formData.pointsValue || "?"}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">You spend points to exchange with others</span>
                  <Badge variant="secondary">-{formData.pointsValue || "?"}</Badge>
                </div>
                <Separator />
                <p className="text-xs text-gray-500">
                  Points help maintain a fair exchange system. Higher quality items typically have higher point values.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem; 