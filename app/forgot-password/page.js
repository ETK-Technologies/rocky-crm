"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui";
import RockyLogo from "@/components/RockyLogo";
import { IMAGE_PATHS } from "@/lib/constants/images";
import { ChevronLeft } from "lucide-react";
import { passwordResetService } from "@/lib/services/passwordResetService";

export default function ForgotPassword() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await passwordResetService.requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  if (isSubmitted) {
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
              Check Your Email
            </h2>
            <p className="text-secondary-600 text-base mb-6">
              We've sent a password reset link to{" "}
              <span className="font-medium">{email}</span>
            </p>
            <p className="text-secondary-500 text-sm mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <div className="space-y-4 w-full">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="w-full py-2.5 px-4 bg-primary-50 text-secondary-900 rounded-lg hover:bg-primary-100 transition-colors font-medium"
              >
                Try Again
              </button>

              <button
                onClick={() => router.push("/login")}
                className="w-full py-2.5 px-4 border border-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors font-medium"
              >
                Back to Login
              </button>
            </div>
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
            Forgot Password?
          </h2>
          <p className="text-secondary-600 text-base mb-8">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <div className="text-left">
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 bg-white border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary-50 text-secondary-900 rounded-lg hover:bg-primary-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
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
                  Any email address will work in demo mode.
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
