"use client";

// Dummy user data
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

    // Initialize with dummy data in development
    if (process.env.NODE_ENV === "development") {
      this.setDummyUser();
    }
  }

  setDummyUser() {
    localStorage.setItem(this.tokenKey, "dummy_token");
    localStorage.setItem(this.userKey, JSON.stringify(DUMMY_USER));
  }

  isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(this.tokenKey);
  }

  async login(credentials) {
    // In development, always succeed with dummy user
    if (process.env.NODE_ENV === "development") {
      localStorage.setItem(this.tokenKey, "dummy_token");
      localStorage.setItem(this.userKey, JSON.stringify(DUMMY_USER));
      return { user: DUMMY_USER, token: "dummy_token" };
    }

    // In production, this would make a real API call
    throw new Error("Not implemented");
  }

  async logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  async getCurrentUser() {
    if (!this.isAuthenticated()) return null;

    const userJson = localStorage.getItem(this.userKey);
    if (!userJson) {
      // If we have a token but no user, use dummy user in development
      if (process.env.NODE_ENV === "development") {
        this.setDummyUser();
        return DUMMY_USER;
      }
      return null;
    }

    return JSON.parse(userJson);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}

export const authService = new AuthService();
