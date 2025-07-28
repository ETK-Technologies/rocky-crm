/**
 * Validation utilities for CRM forms
 */

export const VALIDATION_RULES = {
  required: (value) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return "This field is required";
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
      return "Please enter a valid phone number";
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  },

  numeric: (value) => {
    if (!value) return null;
    if (isNaN(value) || value === "") {
      return "Please enter a valid number";
    }
    return null;
  },

  positiveNumber: (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return "Please enter a positive number";
    }
    return null;
  },
};

/**
 * Validate a field against multiple rules
 */
export const validateField = (value, rules) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

/**
 * Validate an entire form
 */
export const validateForm = (data, schema) => {
  const errors = {};

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(data[field], rules);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Common validation schemas
 */
export const VALIDATION_SCHEMAS = {
  customer: {
    name: [VALIDATION_RULES.required, VALIDATION_RULES.minLength(2)],
    email: [VALIDATION_RULES.required, VALIDATION_RULES.email],
    phone: [VALIDATION_RULES.phone],
    company: [VALIDATION_RULES.minLength(2)],
    website: [VALIDATION_RULES.url],
  },

  lead: {
    name: [VALIDATION_RULES.required, VALIDATION_RULES.minLength(2)],
    email: [VALIDATION_RULES.required, VALIDATION_RULES.email],
    phone: [VALIDATION_RULES.phone],
    company: [VALIDATION_RULES.minLength(2)],
    source: [VALIDATION_RULES.required],
  },

  contact: {
    name: [VALIDATION_RULES.required, VALIDATION_RULES.minLength(2)],
    email: [VALIDATION_RULES.required, VALIDATION_RULES.email],
    phone: [VALIDATION_RULES.phone],
    position: [VALIDATION_RULES.minLength(2)],
  },

  deal: {
    title: [VALIDATION_RULES.required, VALIDATION_RULES.minLength(3)],
    amount: [VALIDATION_RULES.required, VALIDATION_RULES.positiveNumber],
    stage: [VALIDATION_RULES.required],
    customer_id: [VALIDATION_RULES.required],
  },
};
