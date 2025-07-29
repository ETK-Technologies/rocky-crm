/**
 * Image path constants for Rocky CRM
 * Centralized location for all image paths to ensure consistency
 */

export const IMAGE_PATHS = {
  // Logos
  LOGOS: {
    ROCKY_LOGO: "/images/logos/rocky-logo.png",
    ROCKY_LOGO_ROUNDED: "/images/logos/logo-rounded.png",
    ROCKY_LOGO_WHITE: "/images/logos/rocky-logo-white.png", // Future use
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
    SMALL: { width: 100, height: 32 },
    MEDIUM: { width: 120, height: 40 },
    LARGE: { width: 140, height: 48 },
    XLARGE: { width: 160, height: 64 },
    ROUNDED: { width: 80, height: 80 },
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
