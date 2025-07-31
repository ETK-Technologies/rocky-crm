"use client";

class PasswordResetService {
  constructor() {
    this.resetTokenKey = "rocky_crm_reset_token";
  }

  async requestPasswordReset(email) {
    if (typeof window === "undefined") return null;

    // In development mode OR demo mode, simulate password reset
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    ) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store a demo reset token (in real app, this would be sent via email)
      const resetToken = "demo_reset_token_" + Date.now();
      localStorage.setItem(this.resetTokenKey, resetToken);

      return {
        success: true,
        message: "Password reset email sent successfully",
        token: resetToken, // In real app, this wouldn't be returned
      };
    }

    // In production, make actual API call
    throw new Error("Password reset not implemented for production");
  }

  async resetPassword(token, newPassword) {
    if (typeof window === "undefined") return null;

    // In development mode OR demo mode, accept any token
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    ) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear the reset token
      localStorage.removeItem(this.resetTokenKey);

      return {
        success: true,
        message: "Password reset successfully",
      };
    }

    // In production, make actual API call
    throw new Error("Password reset not implemented for production");
  }

  validateResetToken(token) {
    if (typeof window === "undefined") return false;

    // In development mode OR demo mode, accept any non-empty token
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    ) {
      return !!token;
    }

    // In production, validate against actual backend
    return false;
  }

  generateResetUrl(token) {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/reset-password?token=${token}`;
  }
}

export const passwordResetService = new PasswordResetService();
