"use client";

import { forwardRef } from "react";

const Card = forwardRef(
  (
    {
      children,
      variant = "default",
      padding = "md",
      className = "",
      onClick,
      hover = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = "rounded-xl border transition-all duration-200";

    const variants = {
      default: "bg-white border-secondary-200 shadow-sm",
      surface: "bg-primary-50 border-primary-200 shadow-sm",
      elevated: "bg-white border-secondary-200 shadow-md hover:shadow-lg",
      outlined: "bg-transparent border-secondary-300",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const hoverClasses =
      hover || onClick ? "hover:shadow-lg cursor-pointer" : "";

    const variantClasses = variants[variant] || variants.default;
    const paddingClasses = paddings[padding] || paddings.md;

    const combinedClasses = `${baseClasses} ${variantClasses} ${paddingClasses} ${hoverClasses} ${className}`;

    return (
      <div ref={ref} className={combinedClasses} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
export const CardHeader = ({ children, className = "" }) => (
  <div className={`pb-4 border-b border-secondary-200 mb-4 ${className}`}>
    {children}
  </div>
);

// Card Title Component
export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-secondary-900 ${className}`}>
    {children}
  </h3>
);

// Card Content Component
export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

// Card Footer Component
export const CardFooter = ({ children, className = "" }) => (
  <div className={`pt-4 border-t border-secondary-200 mt-4 ${className}`}>
    {children}
  </div>
);

export default Card;
