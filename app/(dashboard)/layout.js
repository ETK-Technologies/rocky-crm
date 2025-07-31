"use client";

import { useState, useEffect } from "react";
import { authService } from "@/lib/services/authService";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Get the current page title from the pathname
  const getPageTitle = () => {
    const path = pathname.split("/")[1]; // Get the first segment of the path
    return path.charAt(0).toUpperCase() + path.slice(1); // Capitalize first letter
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (authService.isAuthenticated()) {
      fetchUser();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMobileClose = () => {
    setSidebarOpen(false);
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "w-20" : "w-64"}`}
      >
        <Sidebar
          user={user}
          onLogout={handleLogout}
          onMobileClose={handleMobileClose}
          isCollapsed={sidebarCollapsed}
          onCollapse={handleSidebarCollapse}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={handleMobileClose}
        />
      )}

      {/* Main content area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        {/* Top bar */}
        <Navbar
          onMenuToggle={handleMenuToggle}
          pageTitle={getPageTitle()}
          user={user}
          onLogout={handleLogout}
        />

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
