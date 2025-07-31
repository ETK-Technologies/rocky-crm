"use client";

import { useState } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui";
import { ArrowLeft, Calendar, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    // Profile data
    firstName: "",
    lastName: "",
    email: "",
    phone: "+1 (555) 987-6543",
    dateOfBirth: "",
    province: "",
    photo: null,
    permanentNote: "",
    
    // Billing data
    shippingMethod: "",
    billingFirstName: "",
    billingLastName: "",
    billingEmail: "",
    country: "United States",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Handle form submission here
    router.push("/users");
  };

  const handleBack = () => {
    router.push("/users");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="">
      <h1 className="text-2xl font-bold text-secondary-900">Add New User</h1>

        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-0" />
          Back to Users
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-secondary-500 hover:text-secondary-700"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "billing"
                ? "border-primary text-primary"
                : "border-transparent text-secondary-500 hover:text-secondary-700"
            }`}
          >
            Billing and Shipping Info
          </button>
        </nav>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <p className="text-sm text-secondary-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    First name
                  </label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Last name
                  </label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Email address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Date Of Birth
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      placeholder="mm/dd/yyyy"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Province
                  </label>
                  <Input
                    type="text"
                    value={formData.province}
                    onChange={(e) => handleInputChange("province", e.target.value)}
                    placeholder="Enter province"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Photo
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("photo-upload").click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <span className="text-sm text-secondary-500">
                    {formData.photo ? formData.photo.name : "No file chosen"}
                  </span>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Permanent Note to Appear on Orders (for admins)
                </label>
                <p className="text-sm text-secondary-600">
                  If you want to add a note for patient to permanently appear on patients orders, please add it here.
                </p>
                <textarea
                  value={formData.permanentNote}
                  onChange={(e) => handleInputChange("permanentNote", e.target.value)}
                  className="w-full min-h-[100px] p-3 border border-secondary-200 rounded-md bg-transparent text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Enter permanent note..."
                />
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "billing" && (
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
              <p className="text-sm text-secondary-600">
                Use a permanent address where you can receive mail.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Shipping Method
                  </label>
                  <Input
                    type="text"
                    value={formData.shippingMethod}
                    onChange={(e) => handleInputChange("shippingMethod", e.target.value)}
                    placeholder="Enter shipping method"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    First name
                  </label>
                  <Input
                    type="text"
                    value={formData.billingFirstName}
                    onChange={(e) => handleInputChange("billingFirstName", e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Last name
                  </label>
                  <Input
                    type="text"
                    value={formData.billingLastName}
                    onChange={(e) => handleInputChange("billingLastName", e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Email address
                  </label>
                  <Input
                    type="email"
                    value={formData.billingEmail}
                    onChange={(e) => handleInputChange("billingEmail", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="w-full h-9 px-3 py-1 border border-secondary-200 rounded-md bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Address Line 1
                  </label>
                  <Input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                    placeholder="Enter address line 1"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Address Line 2
                  </label>
                  <Input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                    placeholder="Enter address line 2 (optional)"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    City
                  </label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    State / Province
                  </label>
                  <Input
                    type="text"
                    value={formData.stateProvince}
                    onChange={(e) => handleInputChange("stateProvince", e.target.value)}
                    placeholder="Enter state or province"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700">
                    Postal Code
                  </label>
                  <Input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="Enter postal code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Actions */}
        <CardFooter className="flex justify-between px-0 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            {activeTab === "profile" && (
              <Button
                type="button"
                onClick={() => setActiveTab("billing")}
              >
                Next: Billing Info
              </Button>
            )}
            {activeTab === "billing" && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("profile")}
                >
                  Back to Profile
                </Button>
                <Button type="submit">
                  Create User
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </div>
  );
} 