/**
 * Image path constants for Rocky CRM
 * Centralized location for all image paths to ensure consistency
 */

export const IMAGE_PATHS = {
  // Logos
  LOGOS: {
    ROCKY_LOGO: "/images/logos/rocky-logo.png",
    ROCKY_LOGO_WHITE: "/images/logos/rocky-logo-white.png", // Future use
  },

  // Icons
  ICONS: {
    DASHBOARD: {
      CHART: "/images/icons/dashboard/chart.svg",
      USERS: "/images/icons/dashboard/users.svg",
      SALES: "/images/icons/dashboard/sales.svg",
    },
    NAVIGATION: {
      DASHBOARD: "/images/icons/navigation/dashboard.svg",
      CUSTOMERS: "/images/icons/navigation/customers.svg",
      LEADS: "/images/icons/navigation/leads.svg",
      DEALS: "/images/icons/navigation/deals.svg",
      CONTACTS: "/images/icons/navigation/contacts.svg",
      REPORTS: "/images/icons/navigation/reports.svg",
      SETTINGS: "/images/icons/navigation/settings.svg",
    },
    ACTIONS: {
      ADD: "/images/icons/actions/add.svg",
      EDIT: "/images/icons/actions/edit.svg",
      DELETE: "/images/icons/actions/delete.svg",
      VIEW: "/images/icons/actions/view.svg",
      EXPORT: "/images/icons/actions/export.svg",
      IMPORT: "/images/icons/actions/import.svg",
    },
  },

  // Avatars
  AVATARS: {
    DEFAULT: "/images/avatars/default-avatar.png",
    PLACEHOLDER: "/images/avatars/placeholder-avatar.png",
  },

  // Backgrounds
  BACKGROUNDS: {
    LOGIN: "/images/backgrounds/login-bg.jpg",
    DASHBOARD: "/images/backgrounds/dashboard-bg.jpg",
    HERO: "/images/backgrounds/hero-bg.jpg",
  },

  // Illustrations
  ILLUSTRATIONS: {
    EMPTY_STATE: "/images/illustrations/empty-state.svg",
    ERROR_404: "/images/illustrations/error-404.svg",
    SUCCESS: "/images/illustrations/success.svg",
  },

  // Placeholders
  PLACEHOLDERS: {
    LOADING: "/images/placeholders/loading.gif",
    ERROR: "/images/placeholders/error.png",
  },
};

/**
 * Get image path with fallback
 * @param {string} path - Primary image path
 * @param {string} fallback - Fallback image path
 * @returns {string} Image path
 */
export const getImagePath = (
  path,
  fallback = IMAGE_PATHS.PLACEHOLDERS.ERROR
) => {
  return path || fallback;
};

/**
 * Image size presets for common use cases
 */
export const IMAGE_SIZES = {
  LOGO: {
    SMALL: { width: 32, height: 32 },
    MEDIUM: { width: 48, height: 48 },
    LARGE: { width: 64, height: 64 },
    XLARGE: { width: 80, height: 80 },
  },
  AVATAR: {
    SMALL: { width: 32, height: 32 },
    MEDIUM: { width: 48, height: 48 },
    LARGE: { width: 64, height: 64 },
    XLARGE: { width: 120, height: 120 },
  },
  THUMBNAIL: {
    SMALL: { width: 100, height: 100 },
    MEDIUM: { width: 200, height: 200 },
    LARGE: { width: 400, height: 400 },
  },
};
