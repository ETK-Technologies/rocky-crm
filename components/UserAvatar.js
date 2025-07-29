"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { IMAGE_SIZES } from "@/lib/constants/images";

const UserAvatar = React.forwardRef(
  ({ user, size = "md", className, showName = false, ...props }, ref) => {
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

    const userName = user?.name || user?.displayName || "User";
    const userEmail = user?.email || "";
    const userImage = user?.image || user?.avatar || user?.profileImage;
    const initials = getUserInitials(userName);

    return (
      <div className={cn("flex items-center", className)} {...props} ref={ref}>
        <Avatar className={sizeClasses[size]}>
          <AvatarImage
            src={userImage}
            alt={`${userName}'s avatar`}
            width={sizeDimensions[size].width}
            height={sizeDimensions[size].height}
          />
          <AvatarFallback className="bg-green-500 text-white font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        {showName && (
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            {userEmail && <p className="text-xs text-gray-500">{userEmail}</p>}
          </div>
        )}
      </div>
    );
  }
);

UserAvatar.displayName = "UserAvatar";

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

export { UserAvatar };
