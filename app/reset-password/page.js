"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui";
import RockyLogo from "@/components/RockyLogo";
import { IMAGE_PATHS } from "@/lib/constants/images";
import { ChevronLeft } from "lucide-react";
import { passwordResetService } from "@/lib/services/passwordResetService";

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

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Get token from URL parameters
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError(
        "Invalid or missing reset token. Please request a new password reset."
      );
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.password.trim() || !formData.confirmPassword.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid reset token. Please request a new password reset.");
      return;
    }

    // Validate token
    if (!passwordResetService.validateResetToken(token)) {
      setError(
        "Invalid or expired reset token. Please request a new password reset."
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await passwordResetService.resetPassword(token, formData.password);
      setIsSuccess(true);
    } catch (err) {
      setError(
        "Failed to reset password. Please try again or request a new reset link."
      );
      console.error("Password reset error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
        <Card className="w-full max-w-md bg-white rounded-xl shadow-xl">
          <div className="flex flex-col items-center text-center p-8">
            <div className="mb-8">
              <RockyLogo
                size="lg"
                priority
                src={IMAGE_PATHS.LOGOS.ROCKY_LOGO}
              />
            </div>

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-secondary-900 mb-3">
              Password Reset Successfully
            </h2>
            <p className="text-secondary-600 text-base mb-8">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="w-full py-2.5 px-4 bg-primary-50 text-secondary-900 rounded-lg hover:bg-primary-100 transition-colors font-medium"
            >
              Continue to Login
            </button>
          </div>
        </Card>
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
            Reset Your Password
          </h2>
          <p className="text-secondary-600 text-base mb-8">
            Enter your new password below. Make sure it's strong and secure.
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
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-2.5 bg-white border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors pr-12"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-500 hover:text-secondary-700 transition-colors focus:outline-none"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <p className="text-xs text-secondary-500 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and
                  number.
                </p>
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-2.5 bg-white border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors pr-12"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-500 hover:text-secondary-700 transition-colors focus:outline-none"
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary-50 text-secondary-900 rounded-lg hover:bg-primary-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || !token}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Login
            </button>

            {(process.env.NODE_ENV === "development" ||
              process.env.NEXT_PUBLIC_DEMO_MODE === "true") && (
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-700 font-medium">
                  Demo Mode
                </p>
                <p className="text-sm text-secondary-600 mt-1">
                  Any password will work in demo mode.
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
