"use client";
import React, { useState } from "react";

import Icons from "@/components/icons";
import {
  PageHeader,
  Card,
  CardContent,
  QuickActionsFilter,
} from "@/components/ui";
import {
  DailyReport,
  PrescriptionReport,
  DoseDispensedReport,
  SendToCreateLabs,
  SendToCreateLabsQueue,
  ZonnicReport,
} from "./components";

const PharmacyReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Daily Report");
  const [startDateTime, setStartDateTime] = useState("2025-07-01T00:00");
  const [endDateTime, setEndDateTime] = useState("2025-08-01T17:08");
  const [selectedHours, setSelectedHours] = useState({
    value: "12",
    label: "12 Hours",
  });

  const [emailAddress, setEmailAddress] = useState("");

  // Send to Create Labs Queue specific state
  const [orderUrls, setOrderUrls] = useState("");
  const [addedOrders, setAddedOrders] = useState([
    {
      id: 528021,
      customerName: "Duncan Stewart",
      updatedAt: "1 day ago",
      createdAt: "29 Jul, 2025 15:51:00",
      status: "Shipped on 29 Jul, 2025",
      total: "$126",
      orderItems: "Tadalafil X 1 (Dosage: 10mg)",
    },
    {
      id: 527521,
      customerName: "Rafal Szalek",
      updatedAt: "1 hour ago",
      createdAt: "29 Jul, 2025 15:51:00",
      status: "Shipped on 29 Jul, 2025",
      total: "$68",
      orderItems: "Tadalafil X 1 (Dosage: 10mg)",
    },
  ]);

  // Dose Dispensed Report specific state
  const [doseFilters, setDoseFilters] = useState({
    patient: { value: "shaddy-elsha", label: "Shaddy Elsha...x" },
    program: { value: "body-optimization", label: "Body Optimization Program" },
    dosage: { value: "3mg", label: "3mg" },
    status: { value: "processed", label: "Processed" },
    detail: { value: "detailed", label: "Detailed" },
  });

  const reportActions = [
    "Daily Report",
    "Prescription Report",
    "Dose Dispensed Report",
    "Send to Create Labs",
    "Send to Create Labs Queue",
    "Zonnic Report",
  ];

  const hoursOptions = [
    { value: "1", label: "1 Hour" },
    { value: "2", label: "2 Hours" },
    { value: "4", label: "4 Hours" },
    { value: "6", label: "6 Hours" },
    { value: "8", label: "8 Hours" },
    { value: "12", label: "12 Hours" },
    { value: "24", label: "24 Hours" },
  ];

  const doseFilterOptions = {
    patients: [
      { value: "shaddy-elsha", label: "Shaddy Elsha...x" },
      { value: "john-doe", label: "John Doe" },
    ],
    programs: [
      { value: "body-optimization", label: "Body Optimization Program" },
      { value: "weight-loss", label: "Weight Loss Program" },
    ],
    dosages: [
      { value: "3mg", label: "3mg" },
      { value: "5mg", label: "5mg" },
      { value: "10mg", label: "10mg" },
    ],
    statuses: [
      { value: "processed", label: "Processed" },
      { value: "pending", label: "Pending" },
    ],
    details: [
      { value: "detailed", label: "Detailed" },
      { value: "summary", label: "Summary" },
    ],
  };

  const zonnicData = [
    {
      date: "01-07-2025",
      productName: "ZONNIC Nicotine Pouches",
      productUnit: "Pouch",
      unit: "240",
      province: "QC",
      orders: "2",
      sleeves: "2",
      totalSales: "$129.50",
      totalBeforeTax: "$129.50",
      totalTax: "$0.00",
      totalExcise: "0",
      singleSleeve: "2",
      twoSleeves: "0",
      moreThanTwoSleeves: "0",
    },
    {
      date: "02-07-2025",
      productName: "ZONNIC Nicotine Pouches",
      productUnit: "Pouch",
      unit: "120",
      province: "ON",
      orders: "1",
      sleeves: "1",
      totalSales: "$64.75",
      totalBeforeTax: "$64.75",
      totalTax: "$0.00",
      totalExcise: "0",
      singleSleeve: "1",
      twoSleeves: "0",
      moreThanTwoSleeves: "0",
    },
  ];

  const handleGenerateReport = () => {
    console.log("Generating report:", {
      type: activeTab,
      startDateTime,
      endDateTime,
      hours: selectedHours,
    });
  };

  const handleAddOrders = () => {
    if (orderUrls.trim()) {
      const newOrder = {
        id: Math.floor(Math.random() * 1000000),
        customerName: "New Customer",
        updatedAt: "Just now",
        createdAt:
          new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) +
          " " +
          new Date().toLocaleTimeString(),
        status: "Pending",
        total: "$0",
        orderItems: "Order items will be loaded...",
      };
      setAddedOrders([...addedOrders, newOrder]);
      setOrderUrls("");
    }
  };

  const handleRemoveOrder = (orderId) => {
    setAddedOrders(addedOrders.filter((order) => order.id !== orderId));
  };

  const handleSendEmail = () => {
    console.log("Sending report to:", emailAddress);
  };

  const handleDownloadFile = (fileName, downloadUrl) => {
    console.log("Downloading:", fileName);
    // Implement actual download logic here
  };

  const handlePreview = () => {
    console.log("Previewing orders");
  };

  const handleDownloadExcel = () => {
    console.log("Downloading Excel file");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Daily Report":
        return (
          <DailyReport
            startDateTime={startDateTime}
            setStartDateTime={setStartDateTime}
            endDateTime={endDateTime}
            setEndDateTime={setEndDateTime}
            selectedHours={selectedHours}
            setSelectedHours={setSelectedHours}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            hoursOptions={hoursOptions}
            onGenerateReport={handleGenerateReport}
            onSendEmail={handleSendEmail}
          />
        );
      case "Prescription Report":
        return (
          <PrescriptionReport
            selectedHours={selectedHours}
            setSelectedHours={setSelectedHours}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            hoursOptions={hoursOptions}
            onGenerateReport={handleGenerateReport}
            onSendEmail={handleSendEmail}
            onDownloadFile={handleDownloadFile}
          />
        );
      case "Dose Dispensed Report":
        return (
          <DoseDispensedReport
            doseFilters={doseFilters}
            setDoseFilters={setDoseFilters}
            doseFilterOptions={doseFilterOptions}
            onGenerateReport={handleGenerateReport}
          />
        );
      case "Send to Create Labs":
        return (
          <SendToCreateLabs
            addedOrders={addedOrders}
            onRemoveOrder={handleRemoveOrder}
          />
        );
      case "Send to Create Labs Queue":
        return (
          <SendToCreateLabsQueue
            orderUrls={orderUrls}
            setOrderUrls={setOrderUrls}
            addedOrders={addedOrders}
            onAddOrders={handleAddOrders}
            onRemoveOrder={handleRemoveOrder}
            onPreview={handlePreview}
          />
        );
      case "Zonnic Report":
        return (
          <ZonnicReport
            zonnicData={zonnicData}
            onGenerateReport={handleGenerateReport}
            onDownloadExcel={handleDownloadExcel}
          />
        );
      default:
        return (
          <DailyReport
            startDateTime={startDateTime}
            setStartDateTime={setStartDateTime}
            endDateTime={endDateTime}
            setEndDateTime={setEndDateTime}
            selectedHours={selectedHours}
            setSelectedHours={setSelectedHours}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            hoursOptions={hoursOptions}
            onGenerateReport={handleGenerateReport}
            onSendEmail={handleSendEmail}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Icons.Forms}
        title="Pharmacy Reports"
        description="Manage and review all pharmacy reports"
      />

      {/* Navigation Tabs using QuickActionsFilter */}
      <QuickActionsFilter
        actions={reportActions}
        activeAction={activeTab}
        onActionChange={setActiveTab}
        className="mb-6"
      />

      {/* Main Content Area */}
      <div className="flex justify-center">
        <Card className="max-w-7xl w-full">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Report Title */}
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold text-gray-900">{activeTab}</h2>
              </div>

              {/* Dynamic Content based on active tab */}
              {renderContent()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyReportsPage;
