"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { Card } from "@/components/ui";
import RockyLogo from "@/components/RockyLogo";
import { IMAGE_PATHS } from "@/lib/constants/images";

// Eye icons for password visibility toggle
const EyeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          window.location.href = "/dashboard";
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await authService.login(formData);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-secondary-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-xl">
        <div className="flex flex-col items-center text-center p-8">
          <div className="mb-8">
            <RockyLogo size="lg" priority src={IMAGE_PATHS.LOGOS.ROCKY_LOGO} />
          </div>

          <h2 className="text-2xl font-bold text-secondary-900 mb-3">
            Welcome Back
          </h2>
          <p className="text-secondary-600 text-base mb-8">
            Please sign in to access your dashboard and manage your pharmacy
            relationships effectively.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="text-left">
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2.5 bg-white border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 bg-white border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors pr-12"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-500 hover:text-secondary-700 transition-colors focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 border-secondary-300 rounded text-primary-600 focus:ring-primary-500 transition-colors"
                    disabled={isSubmitting}
                  />
                  <span className="ml-2 text-sm text-secondary-600">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  disabled={isSubmitting}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary-50 text-secondary-900 rounded-lg hover:bg-primary-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-700 font-medium">
                  Development Mode
                </p>
                <p className="text-sm text-secondary-600 mt-1">
                  Any credentials will work in development mode.
                </p>
              </div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-secondary-100 w-full text-center">
            <p className="text-sm text-secondary-500">
              © {new Date().getFullYear()} Rocky CRM. All rights reserved.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
