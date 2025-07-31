"use client";

import {
  Button,
  Calendar,
  Card,
  DateRangePicker,
  Input,
  Select,
} from "@/components/ui";
import { ArrowLeft, Download, Mail, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PrespectionEdit({ params }) {
  const router = useRouter();
  const prescriptionId = params?.id;
  
  const [formData, setFormData] = useState({
    prescribedBy: "",
    dateOfCreation: "",
    selectedUser: "",
    prescriptionBy: "",
    medications: [
      {
        medication: "",
        strength: "",
        quantity: "",
        duration: "",
        refills: "",    
        instructions: "",
      },
    ],
  });

  // Load existing prescription data when component mounts
  useEffect(() => {
    if (prescriptionId) {
      // Mock data for existing prescription - replace with actual API call
      const existingData = {
        prescribedBy: "1",
        dateOfCreation: "2025-07-31",
        selectedUser: "1",
        prescriptionBy: "1",
        medications: [
          {
            medication: "Aspirne1",
            strength: "1.5 mg",
            quantity: "30",
            duration: "7 days",
            refills: "2",
            instructions: "Take with food",
          },
        ],
      };
      setFormData(existingData);
    }
  }, [prescriptionId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      ),
    }));
  };

  const addMoreMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          medication: "",
          strength: "",
          quantity: "",
          duration: "",
          refills: "",
          instructions: "",
        },
      ],
    }));
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      setFormData((prev) => ({
        ...prev,
        medications: prev.medications.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.prescribedBy || !formData.selectedUser || !formData.dateOfCreation) {
      alert("Please fill in all required fields");
      return;
    }

    // Check if at least one medication is properly filled
    const hasValidMedication = formData.medications.some(
      (med) => med.medication && med.strength && med.quantity
    );

    if (!hasValidMedication) {
      alert("Please add at least one medication with name, strength, and quantity");
      return;
    }

    // Submit the updated form data
    console.log("Updating prescription:", prescriptionId, formData);
    
    // Here you would typically make an API call to update
    // Example: await updatePrescription(prescriptionId, formData);
    
    // Navigate back to prescriptions list
    router.push("/prescriptions");
  };

  const handlePreview = () => {
    console.log("Preview prescription:", formData);
    // Add preview logic here
  };

  const handleSaveAsTemplate = () => {
    console.log("Save as template:", formData);
    // Add save as template logic here
  };
  const handleBack = () => {
    router.push("/prescriptions");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-secondary-600 cursor-pointer"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
              Prescription Update 
            </h1>
          </div>

          <div className="flex justify-center items-start gap-4">
            <Card className="flex-1 px-4">
              <div className="space-y-2 mb-2">
                <label className="text-sm font-medium mb-2 text-secondary-700">
                  Prescripton By *
                </label>
                <Select 
                  options={[{ value: "1", label: "Dr John" }]}
                  value={formData.prescribedBy}
                  onChange={(e) => handleInputChange("prescribedBy", e.target.value)}
                />
              </div>

              <div className="space-y-2 mb-2">
                <label className="text-sm font-medium mb-2 text-secondary-700">
                  Date of Creation *
                </label>
                <Input 
                  type="date" 
                  className="w-full"
                  value={formData.dateOfCreation}
                  onChange={(e) => handleInputChange("dateOfCreation", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 mb-2">
                <label className="text-sm font-medium mb-2 text-secondary-700">
                  Select User *
                </label>
                <Select 
                  options={[{ value: "1", label: "User One" }]}
                  value={formData.selectedUser}
                  onChange={(e) => handleInputChange("selectedUser", e.target.value)}
                />
              </div>

              <div className="space-y-2 mb-2">
                <label className="text-sm font-medium mb-2 text-secondary-700">
                  Prescripton By
                </label>
                <Select
                  options={[{ value: "1", label: "Prescription By" }]}
                  value={formData.prescriptionBy}
                  onChange={(e) => handleInputChange("prescriptionBy", e.target.value)}
                />
              </div>
            </Card>
            
            <Card className="flex-1 px-4">
              <h3 className="text-lg font-semibold mb-4">Medications</h3>
              {formData.medications.map((medication, index) => (
                <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-secondary-700">
                      Medication {index + 1}
                    </span>
                    {formData.medications.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMedication(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-2">
                    <label className="text-sm font-medium mb-2 text-secondary-700">
                      Medication *
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        className="flex-1"
                        value={medication.medication}
                        onChange={(e) => handleMedicationChange(index, "medication", e.target.value)}
                        placeholder="Enter medication name"
                        required
                      />
                      <Button type="button" size="sm">
                        Search
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-2">
                    <label className="text-sm font-medium mb-2 text-secondary-700">
                      Medication Strength *
                    </label>
                    <Input 
                      className="w-full"
                      value={medication.strength}
                      onChange={(e) => handleMedicationChange(index, "strength", e.target.value)}
                      placeholder="e.g., 10mg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 mb-2">
                    <label className="text-sm font-medium mb-2 text-secondary-700">
                      Quantity *
                    </label>
                    <Input 
                      type="number" 
                      className="w-full"
                      value={medication.quantity}
                      onChange={(e) => handleMedicationChange(index, "quantity", e.target.value)}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-2">
                    <label className="text-sm font-medium mb-2 text-secondary-700">
                      Duration
                    </label>
                    <Input 
                      className="w-full"
                      value={medication.duration}
                      onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                      placeholder="e.g., 7 days"
                    />
                  </div>

                  <div className="space-y-2 mb-2">
                    <label className="text-sm font-medium mb-2 text-secondary-700">
                      Refills
                    </label>
                    <Input 
                      type="number"
                      className="w-full"
                      value={medication.refills}
                      onChange={(e) => handleMedicationChange(index, "refills", e.target.value)}
                      placeholder="Number of refills"
                    />
                  </div>

                  <div className="space-y-2 mb-2">
                    <label className="text-sm font-medium mb-2 text-secondary-700">
                      Instructions
                    </label>
                    <Input 
                      className="w-full"
                      value={medication.instructions}
                      onChange={(e) => handleMedicationChange(index, "instructions", e.target.value)}
                      placeholder="e.g., Take with food"
                    />
                  </div>
                </div>
              ))}

              <Button type="button" className="w-full" onClick={addMoreMedication}>
                Add More Medication
              </Button>
            </Card>
            
            <Card className="flex-1 px-4">
              <p className="space-y-2 mb-2">No Templates Found</p>
            </Card>
          </div>

          <div className="flex justify-end items-center gap-4">
            <Button type="button" variant="secondary" onClick={handleSaveAsTemplate}>
              Save as Template
            </Button>

            <Button type="button" variant="outline" onClick={handlePreview}>
              Preview
            </Button>

            <Button type="submit">Update</Button>
          </div>
        </div>
      </form>
    </>
  );
}
