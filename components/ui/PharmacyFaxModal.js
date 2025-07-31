"use client";

import { useState } from "react";
import { Button, Input, Card } from "@/components/ui";
import { X, Send, Calendar } from "lucide-react";

export default function PharmacyFaxModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    senderNumber: "+14375375123",
    receiverNumber: "",
    selectOrder: "",
    selectPatient: "",
    thePharmacy: "",
    pharmacyPhone: "",
    pharmacyFaxNumber: "",
    pharmacistNameNumber: "",
    date: "",
    pharmacyAddress: "",
    note: "",
    fileOption: "generate", // "generate" or "attach"
    file: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-lg font-semibold text-secondary-900">
            Add Pharmacy Fax
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-secondary-600 hover:text-secondary-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Title
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full"
                  placeholder="Enter title"
                />
              </div>

              {/* Sender Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Sender Number
                </label>
                <Input
                  type="text"
                  value={formData.senderNumber}
                  onChange={(e) =>
                    handleInputChange("senderNumber", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              {/* Select Order */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Select Order
                </label>
                <select
                  value={formData.selectOrder}
                  onChange={(e) =>
                    handleInputChange("selectOrder", e.target.value)
                  }
                  className="w-full p-3 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">Select an order</option>
                  <option value="order-1">Order #12345</option>
                  <option value="order-2">Order #12346</option>
                  <option value="order-3">Order #12347</option>
                </select>
              </div>

              {/* Select Patient */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Select Patient
                </label>
                <select
                  value={formData.selectPatient}
                  onChange={(e) =>
                    handleInputChange("selectPatient", e.target.value)
                  }
                  className="w-full p-3 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">Select a patient</option>
                  <option value="patient-1">John Doe</option>
                  <option value="patient-2">Jane Smith</option>
                  <option value="patient-3">Mike Johnson</option>
                </select>
              </div>

              {/* Pharmacy Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Pharmacy Phone
                </label>
                <Input
                  type="tel"
                  value={formData.pharmacyPhone}
                  onChange={(e) =>
                    handleInputChange("pharmacyPhone", e.target.value)
                  }
                  className="w-full"
                  placeholder="Enter pharmacy phone"
                />
              </div>

              {/* Pharmacist Name & Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Pharmacist Name & Number
                </label>
                <Input
                  type="text"
                  value={formData.pharmacistNameNumber}
                  onChange={(e) =>
                    handleInputChange("pharmacistNameNumber", e.target.value)
                  }
                  className="w-full"
                  placeholder="Enter pharmacist name and number"
                />
              </div>

              {/* Pharmacy Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Pharmacy Address
                </label>
                <textarea
                  value={formData.pharmacyAddress}
                  onChange={(e) =>
                    handleInputChange("pharmacyAddress", e.target.value)
                  }
                  placeholder="Enter pharmacy address"
                  className="w-full p-3 border border-secondary-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              {/* Receiver Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Receiver Number
                </label>
                <Input
                  type="text"
                  value={formData.receiverNumber}
                  onChange={(e) =>
                    handleInputChange("receiverNumber", e.target.value)
                  }
                  className="w-full"
                  placeholder="Enter receiver number"
                />
              </div>

              {/* The Pharmacy */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  The Pharmacy
                </label>
                <Input
                  type="text"
                  value={formData.thePharmacy}
                  onChange={(e) =>
                    handleInputChange("thePharmacy", e.target.value)
                  }
                  className="w-full"
                  placeholder="Enter pharmacy name"
                />
              </div>

              {/* Pharmacy Fax Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Pharmacy Fax Number
                </label>
                <Input
                  type="tel"
                  value={formData.pharmacyFaxNumber}
                  onChange={(e) =>
                    handleInputChange("pharmacyFaxNumber", e.target.value)
                  }
                  className="w-full"
                  placeholder="Enter pharmacy fax number"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Date
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full pr-10"
                    placeholder="mm/dd/yyyy"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                </div>
              </div>

              {/* Note */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Note
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                  placeholder="Enter note"
                  className="w-full p-3 border border-secondary-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* File Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-secondary-700">
              File
            </label>

            {/* Radio Buttons */}
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="fileOption"
                  value="generate"
                  checked={formData.fileOption === "generate"}
                  onChange={(e) =>
                    handleInputChange("fileOption", e.target.value)
                  }
                  className="text-secondary-600 focus:ring-secondary-500"
                />
                <span className="text-sm text-secondary-700">
                  Generate Transfer Out
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="fileOption"
                  value="attach"
                  checked={formData.fileOption === "attach"}
                  onChange={(e) =>
                    handleInputChange("fileOption", e.target.value)
                  }
                  className="text-secondary-600 focus:ring-secondary-500"
                />
                <span className="text-sm text-secondary-700">Attach File</span>
              </label>
            </div>

            {/* File Input (only show if "Attach File" is selected) */}
            {formData.fileOption === "attach" && (
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="upload"
                  size="sm"
                  onClick={() =>
                    document.getElementById("pharmacy-file-input").click()
                  }
                >
                  Choose File
                </Button>
                <span className="text-sm text-secondary-600">
                  {formData.file ? formData.file.name : "No file chosen"}
                </span>
                <input
                  id="pharmacy-file-input"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" variant="send" size="default">
              <Send className="h-4 w-4 mr-2" />
              SEND FAX
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
