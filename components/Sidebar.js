"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RockyLogo from "@/components/RockyLogo";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui";

// SVG Icons
const Icons = {
  Dashboard: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
  Users: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  Orders: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  ),
  TrackOrder: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  Refills: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
  Forms: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  Prescription: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  ),
  Fax: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  ),
  Scanner: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  DataFetch: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  ),
  Queue: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
  Activity: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Reports: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Messages: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </svg>
  ),
  Logout: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  ),
  Close: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Expand: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
  Collapse: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  ),
};

const NavButton = ({ children, active, collapsed, ...props }) => (
  <Button
    variant={active ? "primary" : "ghost"}
    className={`w-full justify-start ${collapsed ? "px-3" : "px-4"} py-3`}
    {...props}
  >
    {children}
  </Button>
);

const NavGroup = ({ title, children, isCollapsed }) => (
  <div className="mb-6">
    {!isCollapsed && (
      <h3 className="px-4 mb-2 text-xs font-semibold text-secondary-500 uppercase tracking-wider">
        {title}
      </h3>
    )}
    <div className="space-y-1">{children}</div>
  </div>
);

export default function Sidebar({
  user,
  onLogout,
  onMobileClose,
  isCollapsed,
  onCollapse,
}) {
  const pathname = usePathname();

  const navigation = {
    main: [
      { name: "Dashboard", href: "/dashboard", icon: Icons.Dashboard },
      { name: "Users", href: "/users", icon: Icons.Users },
    ],
    orders: [
      { name: "Orders", href: "/orders", icon: Icons.Orders },
      { name: "Track Order", href: "/track-order", icon: Icons.TrackOrder },
      { name: "Out Of Refills", href: "/out-of-refills", icon: Icons.Refills },
    ],
    forms: [
      { name: "Questionnaires", href: "/questionnaires", icon: Icons.Forms },
      {
        name: "Prescriptions",
        href: "/prescriptions",
        icon: Icons.Prescription,
      },
    ],
    communication: [
      { name: "Clinic Fax", href: "/clinic-fax", icon: Icons.Fax },
      { name: "Pharmacy Fax", href: "/pharmacy-fax", icon: Icons.Fax },
      {
        name: "Pharmacy Hardcopy",
        href: "/pharmacy-hardcopy",
        icon: Icons.Fax,
      },
    ],
    tools: [
      { name: "Document Scanner", href: "/scanner", icon: Icons.Scanner },
      {
        name: "Missing Data Fetch Tool",
        href: "/data-fetch",
        icon: Icons.DataFetch,
      },
      { name: "Pharmacy Queue System", href: "/queue", icon: Icons.Queue },
    ],
    monitoring: [
      { name: "Activity Logs", href: "/activity", icon: Icons.Activity },
      { name: "Reports", href: "/reports", icon: Icons.Reports },
      {
        name: "Pharmacy Reports",
        href: "/pharmacy-reports",
        icon: Icons.Reports,
      },
    ],
  };

  const isActive = (href) => pathname === href;

  const handleNavigationClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const renderNavItems = (items) =>
    items.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        onClick={handleNavigationClick}
        className="block"
        title={isCollapsed ? item.name : undefined}
      >
        <NavButton active={isActive(item.href)} collapsed={isCollapsed}>
          <span className="text-lg">
            <item.icon />
          </span>
          {!isCollapsed && (
            <span className="ml-3 font-medium">{item.name}</span>
          )}
        </NavButton>
      </Link>
    ));

  return (
    <div className="h-full flex flex-col bg-primary-50 shadow-lg">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-20 px-2 border-b border-secondary-200">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center w-full" : "space-x-3 min-w-0 px-2"
          }`}
        >
          <RockyLogo
            size={isCollapsed ? "xl" : "sm"}
            src={
              isCollapsed
                ? "/images/logos/logo-rounded.png"
                : "/images/logos/rocky-logo.png"
            }
            className={isCollapsed ? "-m-1" : ""}
          />
          {!isCollapsed && (
            <h1 className="text-lg font-bold text-secondary-900 truncate">
              Rocky CRM
            </h1>
          )}
        </div>

        {/* Collapse/Expand Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCollapse}
          className="hidden lg:flex"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Icons.Expand /> : <Icons.Collapse />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 overflow-y-auto">
        <NavGroup title="Main" isCollapsed={isCollapsed}>
          {renderNavItems(navigation.main)}
        </NavGroup>

        <NavGroup title="Orders" isCollapsed={isCollapsed}>
          {renderNavItems(navigation.orders)}
        </NavGroup>

        <NavGroup title="Forms" isCollapsed={isCollapsed}>
          {renderNavItems(navigation.forms)}
        </NavGroup>

        <NavGroup title="Communication" isCollapsed={isCollapsed}>
          {renderNavItems(navigation.communication)}
        </NavGroup>

        <NavGroup title="Tools" isCollapsed={isCollapsed}>
          {renderNavItems(navigation.tools)}
        </NavGroup>

        <NavGroup title="Monitoring" isCollapsed={isCollapsed}>
          {renderNavItems(navigation.monitoring)}
        </NavGroup>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        <hr className="border-t border-secondary-200 my-3" />
        {/* Messages Button */}
        <div className="px-3 mb-3">
          <Link
            href="/messages"
            className="block"
            title={isCollapsed ? "Messages" : undefined}
          >
            <NavButton collapsed={isCollapsed}>
              <span className="text-lg relative">
                <Icons.Messages />
                {/* Unread messages indicator */}
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-primary-50"></span>
              </span>
              {!isCollapsed && (
                <span className="ml-3 font-medium">Messages</span>
              )}
            </NavButton>
          </Link>
        </div>

        {/* User section */}
        <div className="border-t border-secondary-200 p-4">
          {user && (
            <div className="flex items-center justify-between min-w-0">
              <UserAvatar user={user} size="sm" showName={!isCollapsed} />
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="flex-shrink-0"
                title="Logout"
              >
                <Icons.Logout />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
