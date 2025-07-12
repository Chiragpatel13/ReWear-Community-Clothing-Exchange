import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { z } from "zod";

// Schema for profile validation
const profileSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const EditProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to edit your profile.</p>
          <Link to="/login" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ProfileFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setSuccessMessage("");
  };

  const validateForm = () => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof ProfileFormData;
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      // Update display name
      if (formData.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: formData.displayName,
        });
      }

      setSuccessMessage("Profile updated successfully!");
      
      // Redirect to profile page after a short delay
      setTimeout(() => {
        navigate("/profile");
      }, 2000);

    } catch (error: any) {
      console.error("Profile update error:", error);
      setErrors({ displayName: "Failed to update profile. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Back to Profile */}
        <Link 
          to="/profile" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Profile
        </Link>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {formData.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <p className="text-blue-100 mt-1">
                  Update your account information
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-800">{successMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.displayName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your display name"
                />
                {errors.displayName && (
                  <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                  placeholder="Enter your email address"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Email address cannot be changed. Contact support if you need to update your email.
                </p>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Email Verified:</span>
                    <span className={`ml-2 ${currentUser.emailVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                      {currentUser.emailVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Member Since:</span>
                    <span className="ml-2 text-gray-600">
                      {currentUser.metadata.creationTime ? 
                        new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                        'Unknown'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Profile'
                  )}
                </button>
                <Link
                  to="/profile"
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
