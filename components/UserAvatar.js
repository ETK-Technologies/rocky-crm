/**
 * User Avatar Component
 * Displays user avatar with fallback to initials
 */

import Image from "next/image";
import { IMAGE_PATHS, IMAGE_SIZES } from "@/lib/constants/images";

export default function UserAvatar({
  user,
  size = "md",
  className = "",
  showName = false,
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const sizeDimensions = {
    sm: IMAGE_SIZES.AVATAR.SMALL,
    md: IMAGE_SIZES.AVATAR.MEDIUM,
    lg: IMAGE_SIZES.AVATAR.LARGE,
    xl: IMAGE_SIZES.AVATAR.XLARGE,
  };

  const dimensions = sizeDimensions[size];
  const userName = user?.name || user?.displayName || "User";
  const userEmail = user?.email || "";
  const userImage = user?.image || user?.avatar || user?.profileImage;
  const initials = getUserInitials(userName);

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        {userImage ? (
          <Image
            src={userImage}
            alt={`${userName}'s avatar`}
            width={dimensions.width}
            height={dimensions.height}
            className="rounded-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Fallback initials */}
        <div
          className={`rounded-full bg-green-500 flex items-center justify-center text-white font-medium ${
            userImage ? "hidden" : "flex"
          } ${sizeClasses[size]}`}
        >
          {initials}
        </div>
      </div>

      {showName && (
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{userName}</p>
          {userEmail && <p className="text-xs text-gray-500">{userEmail}</p>}
        </div>
      )}
    </div>
  );
}

/**
 * Get user initials from name
 * @param {string} name - User's full name
 * @returns {string} Initials (max 2 characters)
 */
function getUserInitials(name) {
  if (!name) return "U";

  const names = name.trim().split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}
