"use client";

import { useState, useEffect } from "react";

const Notification = ({
  type = "info",
  title,
  message,
  duration = 5000,
  onClose,
  showCloseButton = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for fade out animation
    }
  };

  const types = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: "✓",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: "✕",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: "⚠",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: "ℹ",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  };

  const config = types[type] || types.info;

  if (!isVisible) return null;

  return (
    <div
      className={`
      fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out
      ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      ${className}
    `}
    >
      <div
        className={`
        ${config.bg} ${config.border} border rounded-lg p-4 shadow-lg
      `}
      >
        <div className="flex items-start">
          <div
            className={`
            flex-shrink-0 w-8 h-8 rounded-full ${config.iconBg} flex items-center justify-center mr-3
          `}
          >
            <span className={`text-sm font-bold ${config.iconColor}`}>
              {config.icon}
            </span>
          </div>

          <div className="flex-1">
            {title && (
              <h4 className={`text-sm font-medium ${config.text} mb-1`}>
                {title}
              </h4>
            )}
            {message && (
              <p className={`text-sm ${config.text} opacity-90`}>{message}</p>
            )}
          </div>

          {showCloseButton && (
            <button
              onClick={handleClose}
              className={`
                flex-shrink-0 ml-2 p-1 rounded-md ${config.text} opacity-60 hover:opacity-100
                transition-opacity duration-200 focus:outline-none
              `}
            >
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for using notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = { ...notification, id };

    setNotifications((prev) => [...prev, newNotification]);

    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const showSuccess = (title, message, options = {}) => {
    return addNotification({ type: "success", title, message, ...options });
  };

  const showError = (title, message, options = {}) => {
    return addNotification({ type: "error", title, message, ...options });
  };

  const showWarning = (title, message, options = {}) => {
    return addNotification({ type: "warning", title, message, ...options });
  };

  const showInfo = (title, message, options = {}) => {
    return addNotification({ type: "info", title, message, ...options });
  };

  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    NotificationContainer,
  };
};

export default Notification;
