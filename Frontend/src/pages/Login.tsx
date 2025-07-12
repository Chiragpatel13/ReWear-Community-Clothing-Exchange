import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFormValidation } from "../hooks/useFormValidation";
import { signInSchema, SignInFormData } from "../lib/validations";
import { AuthError } from "../lib/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the intended destination from location state, default to home
  const from = location.state?.from?.pathname || "/";

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setTouched,
    setError,
    clearErrors,
    handleSubmit,
  } = useFormValidation({
    schema: signInSchema,
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      clearErrors();
      console.log('Attempting login with:', data.email);
      await login({
        email: data.email!,
        password: data.password!,
      });
      console.log('Login successful');
      // Navigate to intended destination or home page after successful login
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof AuthError) {
        // Set specific field errors based on error code
        if (error.code === 'auth/user-not-found') {
          setError('email', 'No account found with this email address.');
        } else if (error.code === 'auth/invalid-email') {
          setError('email', 'Invalid email address format.');
        } else if (error.code === 'auth/wrong-password') {
          setError('password', 'Incorrect password.');
        } else if (error.code === 'auth/invalid-credential') {
          setError('email', 'Invalid email or password. Please check your credentials.');
        } else if (error.code === 'auth/too-many-requests') {
          setError('email', 'Too many failed attempts. Please try again later.');
        } else {
          setError('email', error.message || 'Login failed. Please try again.');
        }
      } else {
        setError('email', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof SignInFormData, value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(e.target.name as keyof SignInFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to ReWear
        </Link>

        <div className="bg-white border-0 shadow-xl rounded-lg">
          <div className="p-6 space-y-1 text-center">
            <div className="mx-auto bg-blue-600 text-white rounded-xl p-3 w-fit mb-4">
              <span className="font-bold text-2xl">R</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600">
              Sign in to your ReWear account to continue exchanging
            </p>
          </div>

          <div className="px-6 pb-6 space-y-4">
            {/* Display general error message */}
            {errors.email && !touched.email && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.email}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email || ''}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email && touched.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-600 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={values.password || ''}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password && touched.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-600 text-xs">{errors.password}</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;