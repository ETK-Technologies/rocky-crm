"use client";

/**
 * Rocky Logo Component
 */

import Image from "next/image";
import { IMAGE_PATHS, IMAGE_SIZES } from "@/lib/constants/images";

export default function RockyLogo({
  size = "md",
  className = "",
  alt = "Rocky CRM Logo",
  priority = false,
  src = IMAGE_PATHS.LOGOS.ROCKY_LOGO,
}) {
  const isRoundedLogo = src === IMAGE_PATHS.LOGOS.ROCKY_LOGO_ROUNDED;

  // Map size prop to actual dimensions
  const sizeMap = {
    sm: IMAGE_SIZES.LOGO.SMALL,
    md: IMAGE_SIZES.LOGO.MEDIUM,
    lg: IMAGE_SIZES.LOGO.LARGE,
    xl: IMAGE_SIZES.LOGO.XLARGE,
  };

  // Use rounded size for rounded logo, otherwise use mapped size
  const imageSize = isRoundedLogo ? IMAGE_SIZES.LOGO.ROUNDED : sizeMap[size];

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
