"use client";

import { useState } from "react";
import { Button, Input, Card } from "@/components/ui";
import { X, Send, Upload } from "lucide-react";

export default function SendFaxModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    senderNumber: "+14375375123",
    receiverNumber: "+15559876543",
    description: "",
    fileOption: "attach", // "attach" or "url"
    file: null,
    documentUrl: "",
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-lg font-semibold text-green-600">Send FAX</h2>
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
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Description (optional)"
              className="w-full p-3 border border-secondary-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              rows={3}
            />
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
                  value="attach"
                  checked={formData.fileOption === "attach"}
                  onChange={(e) =>
                    handleInputChange("fileOption", e.target.value)
                  }
                  className="text-secondary-600 focus:ring-secondary-500"
                />
                <span className="text-sm text-secondary-700">Attach File</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="fileOption"
                  value="url"
                  checked={formData.fileOption === "url"}
                  onChange={(e) =>
                    handleInputChange("fileOption", e.target.value)
                  }
                  className="text-secondary-600 focus:ring-secondary-500"
                />
                <span className="text-sm text-secondary-700">Document URL</span>
              </label>
            </div>

            {/* File Input or URL Input */}
            {formData.fileOption === "attach" ? (
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="upload"
                  size="sm"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <span className="text-sm text-secondary-600">
                  {formData.file ? formData.file.name : "No file chosen"}
                </span>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
              </div>
            ) : (
              <Input
                type="url"
                value={formData.documentUrl}
                onChange={(e) =>
                  handleInputChange("documentUrl", e.target.value)
                }
                placeholder="Enter document URL"
                className="w-full"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-start pt-4">
            <Button type="submit" variant="send" size="default">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
