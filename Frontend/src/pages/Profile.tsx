import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  User, 
  Mail, 
  Edit3, 
  Save, 
  X,
  Camera,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Profile updated:", formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || ""
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navbar />
        <div className="flex items-center justify-center p-4 pt-8">
          <Card className="w-full max-w-md text-center bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Please Sign In</h2>
              <p className="text-gray-300 mb-6">
                You need to be signed in to view your profile.
              </p>
              <Link to="/login">
                <Button className="w-full">
                  Sign In
                </Button>
              </Link>
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
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-300">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <CardDescription className="text-gray-300">
                      Update your profile details
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      {formData.avatar ? (
                        <img 
                          src={formData.avatar} 
                          alt={formData.name} 
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-8 w-8 text-white" />
                      )}
                    </div>
                    {isEditing && (
                      <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                        <Camera className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{formData.name}</h3>
                    <p className="text-gray-400">{formData.email}</p>
                    <Badge variant="secondary" className="mt-2 bg-gray-700 text-gray-300">
                      Member since 2024
                    </Badge>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      className="bg-gray-900 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className="bg-gray-900 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="avatar" className="text-gray-200">Avatar URL (Optional)</Label>
                    <Input
                      id="avatar"
                      placeholder="https://example.com/avatar.jpg"
                      value={formData.avatar}
                      onChange={(e) => handleInputChange("avatar", e.target.value)}
                      className="bg-gray-900 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-400">
                      Enter a URL to your profile picture
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Items Listed</span>
                  <Badge variant="secondary" className="bg-blue-600 text-white">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Successful Swaps</span>
                  <Badge variant="secondary" className="bg-green-600 text-white">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Points</span>
                  <Badge variant="secondary" className="bg-yellow-600 text-white">1,250</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Member Since</span>
                  <span className="text-gray-300">Jan 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/list-item">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    List New Item
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Browse Items
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 