"use client";

import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      size = "md",
      variant = "default",
      className = "",
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "block w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default: error
        ? "border-red-300 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-200"
        : "border-secondary-200 text-secondary-900 placeholder-secondary-500 focus:border-primary-300 focus:ring-primary-200",
      filled: error
        ? "bg-red-50 border-red-300 text-red-900 placeholder-red-400 focus:bg-white focus:border-red-500 focus:ring-red-200"
        : "bg-primary-50 border-primary-200 text-secondary-900 placeholder-secondary-500 focus:bg-white focus:border-primary-300 focus:ring-primary-200",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-3 py-2.5 text-sm",
      lg: "px-4 py-3 text-base",
    };

    const variantClasses = variants[variant] || variants.default;
    const sizeClasses = sizes[size] || sizes.md;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
          disabled={disabled}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
