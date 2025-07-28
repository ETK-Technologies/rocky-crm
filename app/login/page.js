"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { useFormSubmit } from "@/lib/hooks/useApi";
import { VALIDATION_SCHEMAS, validateForm } from "@/lib/utils/validation";
import RockyLogo from "@/components/RockyLogo";
import { Button, Input, Card, CardContent } from "@/components/ui";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  // Get current year for dynamic copyright
  const currentYear = new Date().getFullYear();

  const { loading, error, submit } = useFormSubmit(async (credentials) => {
    const response = await authService.login(credentials);
    router.push("/dashboard");
    return response;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // In development, just log in with dummy credentials
    if (process.env.NODE_ENV === "development") {
      await submit({ username: "admin", password: "password" });
      return;
    }

    // Validate form
    const validation = validateForm(formData, {
      username: VALIDATION_SCHEMAS.customer.name,
      password: [VALIDATION_SCHEMAS.customer.name[0]], // Use required validation
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await submit(formData);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-gradient-to-br from-primary-50 to-primary-100 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <RockyLogo size="xl" />
        </div>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md">
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Global Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">
                  {error.message || "Invalid credentials. Please try again."}
                </p>
              </div>
            )}

            {/* Username Field */}
            <Input
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="Enter your username"
              required
              disabled={loading}
            />

            {/* Password Field */}
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              required
              disabled={loading}
            />

            {/* Remember Me */}
            <div className="flex items-center">
              <Input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={loading}
                className="h-4 w-4 text-primary-100 focus:ring-primary-200 border-secondary-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-secondary-700"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-secondary-500">
          © {currentYear} Rocky CRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
