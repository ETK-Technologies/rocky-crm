"use client";

import { useState } from "react";
import {
  Button,
  UserAvatar,
  DocumentViewer,
  Card,
  PageHeader,
} from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Icons from "@/components/icons";

export default function PharmacyFaxDetailPage({ params }) {
  const router = useRouter();

  // Mock pharmacy fax data - in real app, fetch based on params.id
  const faxData = {
    id: params.id || "737264755",
    receiverNumber: "+18773312345",
    notes: "",
    status: "Pending",
    lastUpdated: "2 months ago",
    createdBy: "Mayu Dev",
    createdAt: "2 months ago",
    fileName: "pharmacy-fax.pdf",
    // Use the actual PDF file from the documents folder
    documentUrl: "/images/documents/fax.pdf",
  };

  const handleBack = () => {
    router.push("/pharmacy-fax");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <PageHeader
          icon={Icons.Fax}
          title="Pharmacy FAX Detail"
          onBack={handleBack}
          backLabel="Back to Pharmacy Fax"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg border border-secondary-200 p-4 md:p-6">
        {/* Fax Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">
              Pharmacy FAX #{faxData.id}
            </h2>
            <p className="text-secondary-600 mt-2">
              Pharmacy FAX Created by {faxData.createdBy} at {faxData.createdAt}
            </p>
          </div>
        </div>

        {/* Fax Summary Box */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Receiver Number
                </label>
                <p className="text-secondary-900 font-medium">
                  {faxData.receiverNumber}
                </p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Notes
                </label>
                <p className="text-secondary-900">{faxData.notes || "—"}</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <label className="px-1 text-sm font-medium text-secondary-700">
                  Status
                </label>
                <p className="w-fit px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {faxData.status}
                </p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">
                  Last Updated
                </label>
                <p className="text-secondary-900">{faxData.lastUpdated}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Document Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Document
          </h3>

          {/* Document Viewer */}
          <DocumentViewer
            documentUrl={faxData.documentUrl}
            fileName={faxData.fileName}
          />
        </div>
      </div>
    </div>
  );
}
