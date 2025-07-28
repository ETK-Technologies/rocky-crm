"use client";

/**
 * Rocky Logo Component
 */

import Image from "next/image";

export default function RockyLogo({
  size = "md",
  className = "",
  alt = "Rocky CRM Logo",
  priority = false,
  src = "/images/logos/rocky-logo.png",
}) {
  // Define dimensions for each size
  const dimensions = {
    sm: { width: 100, height: 32 },
    md: { width: 120, height: 40 },
    lg: { width: 140, height: 48 },
    xl: { width: 160, height: 64 },
  };

  // For rounded logo, use larger square dimensions
  const isRoundedLogo = src.includes("logo-rounded");
  const currentSize = dimensions[size];

  // Use larger dimensions for rounded logo
  const imageSize = isRoundedLogo
    ? {
        width: 80, // Fixed size for rounded logo
        height: 80, // Matches the width for perfect circle
      }
    : currentSize;

  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={imageSize.width}
        height={imageSize.height}
        className={`object-contain ${isRoundedLogo ? "rounded-full" : ""}`}
        priority={priority}
      />
    </div>
  );
}
