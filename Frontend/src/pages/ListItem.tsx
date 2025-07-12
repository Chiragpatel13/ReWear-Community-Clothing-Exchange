import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { createProduct, ProductFormData } from "@/lib/products";
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Save,
  Info,
  Star,
  TrendingUp
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

interface ValidationErrors {
  title?: string;
  description?: string;
  size?: string;
  condition?: string;
  category?: string;
  pointsValue?: string;
  images?: string;
}

const ListItem = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save functionality
  useEffect(() => {
    const hasData = Object.values(formData).some(value => 
      value !== "" && value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
    );
    
    if (hasData) {
      setIsAutoSaving(true);
      const timer = setTimeout(() => {
        localStorage.setItem('listItemDraft', JSON.stringify(formData));
        setIsAutoSaving(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [formData]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('listItemDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Calculate form completion progress
  useEffect(() => {
    const fields = ['title', 'description', 'size', 'condition', 'category', 'pointsValue'];
    const completedFields = fields.filter(field => {
      const value = formData[field as keyof FormData];
      return value !== "" && value !== undefined;
    }).length;
    
    const imageProgress = formData.images.length > 0 ? 1 : 0;
    const totalProgress = ((completedFields + imageProgress) / (fields.length + 1)) * 100;
    setFormProgress(Math.round(totalProgress));
  }, [formData]);

  // Redirect to login if user is not authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-300 mb-6">You need to be logged in to list items.</p>
          <Link to="/login" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

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

  const validateField = (field: keyof FormData, value: any): string | undefined => {
    switch (field) {
      case 'title':
        if (!value || value.trim().length < 3) {
          return 'Title must be at least 3 characters long';
        }
        if (value.length > 100) {
          return 'Title must be less than 100 characters';
        }
        break;
      case 'description':
        if (!value || value.trim().length < 10) {
          return 'Description must be at least 10 characters long';
        }
        if (value.length > 1000) {
          return 'Description must be less than 1000 characters';
        }
        break;
      case 'pointsValue':
        if (!value || value <= 0) {
          return 'Points value must be greater than 0';
        }
        if (value > 1000) {
          return 'Points value cannot exceed 1000';
        }
        break;
      case 'images':
        if (!value || value.length === 0) {
          return 'At least one image is required';
        }
        break;
    }
    return undefined;
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error for this field
    setValidationErrors(prev => ({
      ...prev,
      [field]: undefined
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

    // Clear validation error for images
    setValidationErrors(prev => ({
      ...prev,
      images: undefined
    }));
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

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    Object.keys(formData).forEach(key => {
      const field = key as keyof FormData;
      const value = formData[field];
      const error = validateField(field, value);
      if (error) {
        errors[field] = error;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setSubmitError('You must be logged in to list an item');
      return;
    }

    if (!validateForm()) {
      setSubmitError('Please fix the errors above before submitting');
      return;
    }

    console.log('Form submission started');
    setIsSubmitting(true);
    setSubmitError(null);
    setUploadProgress(0);

    try {
      const productData: ProductFormData = {
        title: formData.title,
        description: formData.description,
        size: formData.size,
        condition: formData.condition,
        category: formData.category,
        pointsValue: formData.pointsValue,
        images: formData.images,
      };

      console.log('Creating product with data:', productData);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const productId = await createProduct(productData, currentUser.uid, currentUser.email || '');
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      console.log('Product created successfully with ID:', productId);
      
      // Clear draft after successful submission
      localStorage.removeItem('listItemDraft');
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting product:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to list item. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
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

  const clearDraft = () => {
    localStorage.removeItem('listItemDraft');
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
    setValidationErrors({});
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navbar />
        <div className="flex items-center justify-center p-4 pt-8">
          <Card className="w-full max-w-md text-center bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Item Listed Successfully!</h2>
              <p className="text-gray-300 mb-6">
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
                  setSubmitError(null);
                  clearDraft();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">List Your Item</h1>
              <p className="text-gray-300">
                Share clothes you no longer need and help them find a new home
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isAutoSaving && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Save className="h-4 w-4 animate-pulse" />
                  <span>Auto-saving...</span>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={clearDraft}>
                Clear Draft
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Form Completion</span>
            <span className="text-sm text-gray-300">{formProgress}%</span>
          </div>
          <Progress value={formProgress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Item Details</CardTitle>
                <CardDescription className="text-gray-300">
                  Provide detailed information about your clothing item
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Display */}
                  {submitError && (
                    <div className="bg-red-900/50 border border-red-600 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <p className="text-red-200 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Upload Progress */}
                  {isSubmitting && uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Uploading...</span>
                        <span className="text-gray-300">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-200">Item Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Vintage Denim Jacket, Summer Dress"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                      className={`bg-gray-900 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                        validationErrors.title ? 'border-red-500' : ''
                      }`}
                    />
                    {validationErrors.title && (
                      <p className="text-red-400 text-sm">{validationErrors.title}</p>
                    )}
                  </div>

                  {/* Category and Size */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-200">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className={`bg-gray-900 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                          validationErrors.category ? 'border-red-500' : ''
                        }`}>
                          <SelectValue placeholder="Select category" className="text-gray-400" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white border-gray-700">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-white hover:bg-gray-800">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {validationErrors.category && (
                        <p className="text-red-400 text-sm">{validationErrors.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size" className="text-gray-200">Size *</Label>
                      <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                        <SelectTrigger className={`bg-gray-900 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                          validationErrors.size ? 'border-red-500' : ''
                        }`}>
                          <SelectValue placeholder="Select size" className="text-gray-400" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 text-white border-gray-700">
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size} className="text-white hover:bg-gray-800">
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {validationErrors.size && (
                        <p className="text-red-400 text-sm">{validationErrors.size}</p>
                      )}
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="space-y-2">
                    <Label htmlFor="condition" className="text-gray-200">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger className={`bg-gray-900 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                        validationErrors.condition ? 'border-red-500' : ''
                      }`}>
                        <SelectValue placeholder="Select condition" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 text-white border-gray-700">
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition} className="text-white hover:bg-gray-800">
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.condition && (
                      <p className="text-red-400 text-sm">{validationErrors.condition}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-200">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail. Include brand, material, any flaws, and why you're letting it go..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                      className={`bg-gray-900 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                        validationErrors.description ? 'border-red-500' : ''
                      }`}
                    />
                    <div className="flex justify-between items-center">
                      {validationErrors.description && (
                        <p className="text-red-400 text-sm">{validationErrors.description}</p>
                      )}
                      <span className="text-xs text-gray-500 ml-auto">
                        {formData.description.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-gray-200">Images *</Label>
                    <div className="space-y-4">
                      {/* Upload Area */}
                      <div 
                        className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-900"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-300 mb-1">
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
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                                Image {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {validationErrors.images && (
                        <p className="text-red-400 text-sm">{validationErrors.images}</p>
                      )}
                    </div>
                  </div>

                  {/* Points Value */}
                  <div className="space-y-2">
                    <Label htmlFor="pointsValue" className="text-gray-200">Points Value *</Label>
                    <div className="space-y-2">
                      <Input
                        id="pointsValue"
                        type="number"
                        min="0"
                        max="1000"
                        placeholder="Enter points value"
                        value={formData.pointsValue || ""}
                        onChange={(e) => handleInputChange("pointsValue", parseInt(e.target.value) || undefined)}
                        required
                        className={`bg-gray-900 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                          validationErrors.pointsValue ? 'border-red-500' : ''
                        }`}
                      />
                      {formData.condition && (
                        <p className="text-sm text-gray-300">
                          Suggested: {calculateSuggestedPoints()} points based on condition
                        </p>
                      )}
                      {validationErrors.pointsValue && (
                        <p className="text-red-400 text-sm">{validationErrors.pointsValue}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Tips for Better Listings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded">
                    <ImageIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Good Photos</p>
                    <p className="text-xs text-gray-300">Take clear, well-lit photos from multiple angles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Honest Condition</p>
                    <p className="text-xs text-gray-300">Be accurate about wear and any flaws</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-1 rounded">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Fair Pricing</p>
                    <p className="text-xs text-gray-300">Consider condition and original value</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Points Info */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  How Points Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">You earn points when someone exchanges with you</span>
                  <span className="inline-block px-2 py-1 rounded bg-gray-700 text-white text-xs font-semibold">+{formData.pointsValue || "?"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">You spend points to exchange with others</span>
                  <span className="inline-block px-2 py-1 rounded bg-gray-700 text-white text-xs font-semibold">-{formData.pointsValue || "?"}</span>
                </div>
                <Separator />
                <p className="text-xs text-gray-400">
                  Points help maintain a fair exchange system. Higher quality items typically have higher point values.
                </p>
              </CardContent>
            </Card>

            {/* Auto-save Info */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Save className="h-5 w-5 text-blue-500" />
                  Auto-save
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Your progress is automatically saved as you type. You can continue later if needed.
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