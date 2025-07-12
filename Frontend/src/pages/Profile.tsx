import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile, UserProfile } from "../lib/users";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const profile = await getUserProfile(currentUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
          <Link to="/login" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {userProfile?.firstName?.charAt(0) || currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">
                  {userProfile?.displayName || currentUser.displayName || 'User Profile'}
                </h1>
                <p className="text-blue-100 mt-1">
                  {currentUser.email}
                </p>
                <div className="flex items-center mt-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${currentUser.emailVerified ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-sm text-blue-100">
                    {currentUser.emailVerified ? 'Email Verified' : 'Email Not Verified'}
                  </span>
                </div>
                {userProfile?.points !== undefined && (
                  <div className="flex items-center mt-2">
                    <div className="w-3 h-3 rounded-full mr-2 bg-yellow-400"></div>
                    <span className="text-sm text-blue-100">
                      {userProfile.points} ReWear Points
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Account Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {userProfile?.firstName || 'Not set'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {userProfile?.lastName || 'Not set'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {userProfile?.displayName || currentUser.displayName || 'Not set'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {currentUser.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {userProfile?.createdAt ? 
                        userProfile.createdAt.toDate().toLocaleDateString() : 
                        (currentUser.metadata.creationTime ? 
                          new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                          'Unknown'
                        )
                      }
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ReWear Points</label>
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {userProfile?.points !== undefined ? userProfile.points : 'Loading...'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Sign In</label>
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {currentUser.metadata.lastSignInTime ? 
                        new Date(currentUser.metadata.lastSignInTime).toLocaleDateString() : 
                        'Unknown'
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Account Actions</h2>
                
                <div className="space-y-4">
                  {!currentUser.emailVerified && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h3 className="text-sm font-medium text-yellow-800">Email Verification Required</h3>
                          <p className="text-sm text-yellow-700 mt-1">Please verify your email address to access all features.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Link to="/edit-profile" className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors block text-center">
                      Edit Profile
                    </Link>
                    
                    <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors">
                      Change Password
                    </button>
                    
                    <button className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors">
                      Download My Data
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="mt-8 pt-6 border-t">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="bg-gray-50 rounded-md p-6 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Recent Activity</h3>
                <p className="text-gray-600">Start using ReWear to see your activity here.</p>
                <Link to="/browse" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                  Browse Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
