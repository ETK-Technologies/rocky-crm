"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RockyLogo from "@/components/RockyLogo";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui";
import Icons from "@/components/icons";

// Navigation configuration
const NAVIGATION_CONFIG = {
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
    { name: "Prescriptions", href: "/prescriptions", icon: Icons.Prescription },
  ],
  communication: [
    { name: "Clinic Fax", href: "/clinic-fax", icon: Icons.Fax },
    { name: "Pharmacy Fax", href: "/pharmacy-fax", icon: Icons.Fax },
    { name: "Pharmacy Hardcopy", href: "/pharmacy-hardcopy", icon: Icons.Fax },
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

// Sub-components
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

const SidebarHeader = ({ isCollapsed, onCollapse }) => (
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
    </div>
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
);

const MessagesButton = ({ isCollapsed }) => (
  <div className="px-3 mb-2">
    <Link
      href="/messages"
      className="block"
      title={isCollapsed ? "Messages" : undefined}
    >
      <NavButton collapsed={isCollapsed}>
        <span className="text-lg relative">
          <Icons.Messages />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-primary-50"></span>
        </span>
        {!isCollapsed && <span className="ml-3 font-medium">Messages</span>}
      </NavButton>
    </Link>
  </div>
);

const NavigationItem = ({ item, isActive, isCollapsed, onClick }) => (
  <Link
    key={item.name}
    href={item.href}
    onClick={onClick}
    className="block"
    title={isCollapsed ? item.name : undefined}
  >
    <NavButton active={isActive(item.href)} collapsed={isCollapsed}>
      <span className="text-lg">
        <item.icon />
      </span>
      {!isCollapsed && <span className="ml-3 font-medium">{item.name}</span>}
    </NavButton>
  </Link>
);

export default function Sidebar({
  user,
  onLogout,
  onMobileClose,
  isCollapsed,
  onCollapse,
}) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  const handleNavigationClick = () => {
    if (onMobileClose) onMobileClose();
  };

  const renderNavItems = (items) =>
    items.map((item) => (
      <NavigationItem
        key={item.name}
        item={item}
        isActive={isActive}
        isCollapsed={isCollapsed}
        onClick={handleNavigationClick}
      />
    ));

  return (
    <div className="h-full flex flex-col bg-primary-50 shadow-lg">
      <SidebarHeader isCollapsed={isCollapsed} onCollapse={onCollapse} />

      <nav className="flex-1 mt-6 px-3 overflow-y-auto">
        {Object.entries(NAVIGATION_CONFIG).map(([key, items]) => (
          <NavGroup
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            isCollapsed={isCollapsed}
          >
            {renderNavItems(items)}
          </NavGroup>
        ))}
      </nav>

      <div className="mt-auto">
        <hr className="border-t border-secondary-200 my-2" />
        <MessagesButton isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}
