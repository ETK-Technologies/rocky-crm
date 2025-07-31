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
import { useState } from "react";

export default function PrespectionCreate() {
  const router = useRouter();

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
    if (
      !formData.prescribedBy ||
      !formData.selectedUser ||
      !formData.dateOfCreation
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Check if at least one medication is properly filled
    const hasValidMedication = formData.medications.some(
      (med) => med.medication && med.strength && med.quantity
    );

    if (!hasValidMedication) {
      alert(
        "Please add at least one medication with name, strength, and quantity"
      );
      return;
    }

    // Submit the form data
    console.log("Submitting prescription:", formData);

    // Here you would typically make an API call
    // Example: await createPrescription(formData);

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
              Prescription Create
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
                  onChange={(e) =>
                    handleInputChange("prescribedBy", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleInputChange("dateOfCreation", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleInputChange("selectedUser", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2 mb-2">
                <label className="text-sm font-medium mb-2 text-secondary-700">
                  Prescripton By
                </label>
                <Select
                  options={[{ value: "1", label: "Prescription By" }]}
                  value={formData.prescriptionBy}
                  onChange={(e) =>
                    handleInputChange("prescriptionBy", e.target.value)
                  }
                />
              </div>
            </Card>

            <Card className="flex-1 px-4">
              <p className="space-y-2 mb-2">No Templates Found</p>
            </Card>
          </div>

          <Card className="flex-1 px-4">
            <h3 className="text-lg font-semibold mb-4">Medications</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-2 border">#</th>
                    <th className="px-2 py-2 border">Medication *</th>
                    <th className="px-2 py-2 border">Strength *</th>
                    <th className="px-2 py-2 border">Quantity *</th>
                    <th className="px-2 py-2 border">Duration</th>
                    <th className="px-2 py-2 border">Refills</th>
                    <th className="px-2 py-2 border">Instructions</th>
                    <th className="px-2 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.medications.map((medication, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="px-2 py-2 border text-center font-medium">
                        {index + 1}
                      </td>
                      <td className="px-2 py-2 border">
                        <div className="flex gap-2">
                          <Input
                            className="flex-1"
                            value={medication.medication}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "medication",
                                e.target.value
                              )
                            }
                            placeholder="Enter medication name"
                            required
                          />
                          <Button type="button" size="icon" className="p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="7" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                      <td className="px-2 py-2 border">
                        <Input
                          className="w-full"
                          value={medication.strength}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "strength",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 10mg"
                          required
                        />
                      </td>
                      <td className="px-2 py-2 border">
                        <Input
                          type="number"
                          className="w-full"
                          value={medication.quantity}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                          placeholder="Enter quantity"
                          required
                        />
                      </td>
                      <td className="px-2 py-2 border">
                        <Input
                          className="w-full"
                          value={medication.duration}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "duration",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 7 days"
                        />
                      </td>
                      <td className="px-2 py-2 border">
                        <Input
                          type="number"
                          className="w-full"
                          value={medication.refills}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "refills",
                              e.target.value
                            )
                          }
                          placeholder="Number of refills"
                        />
                      </td>
                      <td className="px-2 py-2 border">
                        <Input
                          className="w-full"
                          value={medication.instructions}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "instructions",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Take with food"
                        />
                      </td>
                      <td className="px-2 py-2 border text-center">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <Button
                type="button"
                className="mt-2 w-1/5 float-end"
                onClick={addMoreMedication}
              >
                Add More Medication
              </Button>
            </div>
          </Card>

          <div className="flex justify-end items-center gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveAsTemplate}
            >
              Save as Template
            </Button>

            <Button type="button" variant="outline" onClick={handlePreview}>
              Preview
            </Button>

            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </>
  );
}
