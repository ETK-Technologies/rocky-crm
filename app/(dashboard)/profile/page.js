"use client";

import { useState, useEffect } from "react";
import { Button, Input, Card, PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { useNotification } from "@/components/ui/Notification";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";

export default function ProfilePage() {
  const router = useRouter();
  const { showSuccess, showError, NotificationContainer } = useNotification();

  // User data state - initialize with demo data
  const [userData, setUserData] = useState({
    firstName: "Ahmad",
    lastName: "Hozien",
    email: "ahmadhozien@rockycrm.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "Management",
    avatar: null,
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    darkMode: false,
  });

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        // Split the name into first and last name
        const nameParts = currentUser.name.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setUserData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email: currentUser.email,
          role: currentUser.role === "admin" ? "Administrator" : "User",
        }));
      }
    };

    loadUserData();
  }, []);

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      showSuccess("Profile updated successfully!");
      setIsEditing(false);
    }, 1000);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showError("Password must be at least 8 characters long!");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      showSuccess("Password changed successfully!");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1000);
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <NotificationContainer />

      <PageHeader
        icon={Icons.User}
        title="Profile Settings"
        description="Manage your account settings and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-secondary-900">
                Personal Information
              </h3>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Icons.Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <Icons.User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-secondary-900">
                    {userData.firstName} {userData.lastName}
                  </h4>
                  <p className="text-sm text-secondary-600">{userData.role}</p>
                  <p className="text-sm text-secondary-600">
                    {userData.department}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    First Name
                  </label>
                  <Input
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone
                  </label>
                  <Input
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 pt-4">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Change Password */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-secondary-900">
                Change Password
              </h3>
              {!isChangingPassword && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChangingPassword(true)}
                >
                  <Icons.Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              )}
            </div>

            {isChangingPassword ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <Button
                    onClick={handleChangePassword}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Update Password
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-secondary-600">
                Last changed: 3 months ago
              </p>
            )}
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-900">
                    Email Notifications
                  </p>
                  <p className="text-xs text-secondary-600">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-900">
                    SMS Notifications
                  </p>
                  <p className="text-xs text-secondary-600">
                    Receive updates via SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) =>
                      handleSettingChange("smsNotifications", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-900">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-secondary-600">
                    Add an extra layer of security
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) =>
                      handleSettingChange("twoFactorAuth", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-900">
                    Dark Mode
                  </p>
                  <p className="text-xs text-secondary-600">
                    Switch to dark theme
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) =>
                      handleSettingChange("darkMode", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
