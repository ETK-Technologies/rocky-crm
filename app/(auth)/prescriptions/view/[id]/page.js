"use client";

import { Button } from "@/components/ui";
import { PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { ArrowLeft, Download, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewPrescription(id) {
  const router = useRouter();
  const [prespection, setPrescription] = useState({
    id: 1,
    patientName: "John Doe",
    age: "50",
    address: `9687 Highway 10
Nova Scotia, NS , B0S 1P0`,
    medication: [
      {
        name: "Aspirne1",
        dose: "1.5 mg",
      },
    ],
    prescriber: "Dr. Smith",
    prescribed_date: "29 Jul, 2025",
    dosage: "100mg",
    frequency: "Once daily",
    startDate: "2023-01-01",
    endDate: "2023-01-10",
    status: "active",
    orderStatus: "Under Review",
  });
  const handleBack = () => {
    router.push("/prescriptions");
  };

  const handleUpdate = () => {
    // Navigate to edit prescription page
    router.push(`/prescriptions/edit/${prespection.id}`);
  };

  const handleDelete = () => {
    // Add delete confirmation logic here
    if (confirm("Are you sure you want to delete this prescription?")) {
      // Add delete API call here
      console.log("Deleting prescription:", prespection.id);
      router.push("/prescriptions");
    }
  };

  const handleDownloadPDF = () => {
    // Add PDF download logic here
    console.log("Downloading PDF for prescription:", prespection.id);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <PageHeader
          icon={Icons.Prescription}
          title="Prescription View"
          onBack={handleBack}
          backLabel="Back to Prescriptions"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadPDF}
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpdate}
          className="text-green-600 border-green-600 hover:bg-green-50"
        >
          <Edit className="h-4 w-4 mr-2" />
          Update
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

        <div
          className="p-5 bg-white max-w-[540px] mx-auto mb-5"
          style={{
            backgroundImage:
              "url('https://account.myrocky.ca/img/watermark-image.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            padding: "30px",
          }}
        >
          <h3 className="text-center">
            <strong>{prespection.prescriber}</strong>
          </h3>
          <div className="text-center">5270 Solar Dr</div>
          <div className="text-center">Unit 15</div>
          <div className="text-center">+1 (833) 697-6259</div>
          <div className="text-center">ID:22476223</div>
          <hr className="my-5 mx-auto" />

          <table className="w-full py-4 sm:py-5 sm:px-6 my-3">
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td>{prespection.patientName}</td>
                <td className="pl-2.5 w-1/5">
                  <strong>Age:</strong>
                </td>
                <td className="w-4/5">{prespection.age}</td>
              </tr>
              <tr>
                <td className="w-1/5">
                  <strong>Address:</strong>{" "}
                </td>
                <td className="w-4/5">{prespection.address}</td>
                <td className="pl-2.5 w-1/5">
                  <strong>Date: </strong>
                </td>
                <td className="w-4/5 whitespace-nowrap">
                  {prespection.prescribed_date}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Medications</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {prespection.medication.map((medication, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <strong>Medication: </strong>
                      {medication.name}
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <strong>Dosage: </strong>
                      {medication.dose}
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <strong>Frequency: </strong>
                      {prespection.frequency}
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <strong>Start Date: </strong>
                      {prespection.startDate}
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <strong>End Date: </strong>
                      {prespection.endDate}
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      <strong>Status: </strong>
                      {prespection.status}
                    </label>
                  </div>
                  {index < prespection.medication.length - 1 && (
                    <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                  )}
                </div>
              ))}
            </dd>
          </div>

          <div className="mt-8">
            <div>Signature:</div>
            <span>
              <img
                src="https://rocky-id-uploads.s3.ca-central-1.amazonaws.com/live/uploads/documents/OgMb4kNNyYh3XXoPVIsBaWJ8D965MYKm/1732196708.jpg"
                width="180px"
                alt="doctor signature"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
