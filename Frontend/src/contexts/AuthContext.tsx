import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthError } from '../lib/auth';
import { createUserProfile } from '../lib/users';

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (data: SignUpData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: `${data.firstName} ${data.lastName}`
      });

      // Create user profile in Firestore
      await createUserProfile({
        uid: userCredential.user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);
    } catch (error: any) {
      throw new AuthError(error.code, error.message);
    }
  };

  const login = async (data: LoginData) => {
    try {
      console.log('🔐 Attempting login for:', data.email);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('✅ Login successful for user:', userCredential.user.uid);
      return userCredential;
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Log additional debug info
      if (error.code === 'auth/invalid-credential') {
        console.error('This usually means the email/password combination is incorrect');
      }
      
      throw new AuthError(error.code, error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new AuthError(error.code, error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signUp,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
