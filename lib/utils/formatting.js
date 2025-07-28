/**
 * Formatting utilities for CRM data
 */

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  if (!amount && amount !== 0) return "-";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (date, options = {}) => {
  if (!date) return "-";

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    ...defaultOptions,
    ...options,
  }).format(dateObj);
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  if (!date) return "-";

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return "-";

  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 0) return "Just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "-";

  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned.length === 11 && cleaned[0] === "1") {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7
    )}`;
  }

  return phone; // Return original if can't format
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";

  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100, suffix = "...") => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format status with color class
 */
export const formatStatus = (status) => {
  const statusMap = {
    active: { label: "Active", class: "bg-green-100 text-green-800" },
    inactive: { label: "Inactive", class: "bg-gray-100 text-gray-800" },
    pending: { label: "Pending", class: "bg-yellow-100 text-yellow-800" },
    completed: { label: "Completed", class: "bg-blue-100 text-blue-800" },
    cancelled: { label: "Cancelled", class: "bg-red-100 text-red-800" },
    draft: { label: "Draft", class: "bg-gray-100 text-gray-800" },
    published: { label: "Published", class: "bg-green-100 text-green-800" },
  };

  return (
    statusMap[status?.toLowerCase()] || {
      label: capitalize(status),
      class: "bg-gray-100 text-gray-800",
    }
  );
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (!value && value !== 0) return "-";
  return `${(value * 100).toFixed(decimals)}%`;
};
