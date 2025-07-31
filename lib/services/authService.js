"use client";

const DUMMY_USER = {
  id: 1,
  name: "Ahmad Hozien",
  email: "ahmadhozien@rockycrm.com",
  role: "admin",
  avatar: null,
};

class AuthService {
  constructor() {
    this.tokenKey = "rocky_crm_token";
    this.userKey = "rocky_crm_user";
  }

  // Helper function to set cookie
  setCookie(name, value, days = 7) {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  // Helper function to remove cookie
  removeCookie(name) {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }

  isAuthenticated() {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  async login(credentials = {}) {
    if (typeof window === "undefined") return null;

    // In development mode OR demo mode, accept any credentials
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    ) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const token = "dummy_token_" + Date.now();

      // Store auth data in both localStorage and cookies
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(DUMMY_USER));

      // Set cookie for middleware to read
      this.setCookie(this.tokenKey, token);

      return {
        user: DUMMY_USER,
        token: token,
      };
    }

    throw new Error("Not implemented");
  }

  async logout() {
    if (typeof window === "undefined") return;

    // Clear auth data from both localStorage and cookies
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.removeCookie(this.tokenKey);

    // Redirect to login
    window.location.href = "/login";
  }

  async getCurrentUser() {
    if (typeof window === "undefined") return null;
    try {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey);
  }
}

export const authService = new AuthService();
