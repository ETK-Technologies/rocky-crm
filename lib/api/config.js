/**
 * API Configuration for Laravel CRM Backend
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  version: process.env.NEXT_PUBLIC_API_VERSION || "v1",
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  endpoints: {
    auth: {
      login: "/auth/login",
      logout: "/auth/logout",
      refresh: "/auth/refresh",
      user: "/auth/user",
    },
    customers: {
      list: "/customers",
      create: "/customers",
      show: (id) => `/customers/${id}`,
      update: (id) => `/customers/${id}`,
      delete: (id) => `/customers/${id}`,
    },
    leads: {
      list: "/leads",
      create: "/leads",
      show: (id) => `/leads/${id}`,
      update: (id) => `/leads/${id}`,
      delete: (id) => `/leads/${id}`,
    },
    deals: {
      list: "/deals",
      create: "/deals",
      show: (id) => `/deals/${id}`,
      update: (id) => `/deals/${id}`,
      delete: (id) => `/deals/${id}`,
    },
    contacts: {
      list: "/contacts",
      create: "/contacts",
      show: (id) => `/contacts/${id}`,
      update: (id) => `/contacts/${id}`,
      delete: (id) => `/contacts/${id}`,
    },
  },
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}/${API_CONFIG.version}${endpoint}`;
};
