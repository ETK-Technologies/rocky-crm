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

  isAuthenticated() {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  async login(credentials = {}) {
    if (typeof window === "undefined") return null;

    // In development mode, accept any credentials
    if (process.env.NODE_ENV === "development") {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Store auth data
      localStorage.setItem(this.tokenKey, "dummy_token");
      localStorage.setItem(this.userKey, JSON.stringify(DUMMY_USER));

      return {
        user: DUMMY_USER,
        token: "dummy_token",
      };
    }

    throw new Error("Not implemented");
  }

  async logout() {
    if (typeof window === "undefined") return;

    // Clear auth data
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);

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
