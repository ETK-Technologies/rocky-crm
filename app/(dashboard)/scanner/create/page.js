"use client";

import Icons from "@/components/icons";
import { Button, Card, Input, PageHeader, Select } from "@/components/ui";
import { Upload, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

export default function CreateScannerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    docType: "",
    order: "",
    file: null,
    cameraFile: null,
  });
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  const handleBack = () => {
    router.push("/scanner");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event, source) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [source]: file }));
    }
  };

  const handleOpenWebcam = () => {
    setShowWebcam(true);
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // Convert base64 to File object for consistency
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "scan.jpg", { type: blob.type });
          setFormData((prev) => ({ ...prev, cameraFile: file }));
          setShowWebcam(false);
        });
    }
  };

  const handleCloseWebcam = () => {
    setShowWebcam(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission, e.g., upload formData to server
    // formData contains: title, docType, order, file, cameraFile
    // Example: console.log(formData);
  };
  return (
    <>
      <div className="space-y-6">
        <div className="mb-8">
          <PageHeader
            icon={Icons.Scanner}
            title="New Document Scan"
            onBack={handleBack}
            backLabel="Back to Scans"
          />
        </div>

        <Card className="px-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-2 mb-2">
                  <label className="text-sm font-medium mb-2 text-secondary-700">
                    Title
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2 mb-2">
                  <label className="text-sm font-medium mb-2 text-secondary-700">
                    Document Type
                  </label>
                  <Select
                    name="docType"
                    value={formData.docType}
                    options={[
                      { value: "prescription", label: "Prescription" },
                      { value: "photo_id", label: "Photo ID" },
                      { value: "lab_reports", label: "Lab Reports" },
                      { value: "other", label: "Other" },
                    ]}
                    onChange={(val) => handleSelectChange("docType", val)}
                  />
                </div>

                <div className="space-y-2 mb-2">
                  <label className="text-sm font-medium mb-2 text-secondary-700">
                    Orders
                  </label>
                  <Select
                    name="order"
                    value={formData.order}
                    options={[
                      { value: "12345", label: "Order #12345" },
                      { value: "12346", label: "Order #12346" },
                      { value: "12347", label: "Order #12347" },
                      { value: "12348", label: "Order #12348" },
                    ]}
                    onChange={(val) => handleSelectChange("order", val)}
                  />
                </div>
              </div>
              <div>
                <div className="space-y-2 flex justify-center items-center gap-4 mt-4">
                  <div className="flex justify-center items-center m-0 ">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                    >
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "file")}
                      className="hidden"
                    />
                  </div>
                  <span>OR</span>
                  <div className="flex justify-center items-center m-0">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleOpenWebcam}
                    >
                      <Icons.Scanner className="h-4 w-4 mr-2" />
                      Use Camera to Scan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {showWebcam && (
              <div className="flex flex-col items-center mt-6">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded border border-gray-300"
                  videoConstraints={{ facingMode: "environment" }}
                />
                <div className="flex gap-2 mt-4">
                  <Button type="button" onClick={handleCapture}>
                    Capture
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseWebcam}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-8">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
