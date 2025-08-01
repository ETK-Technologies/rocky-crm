"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, PageHeader } from "@/components/ui";
import {
  ArrowLeft,
  Search,
  Eye,
  Send,
  FileText,
  Download,
  Calendar,
  RefreshCw,
  MessageSquare,
  Tag,
  Image as ImageIcon,
} from "lucide-react";

export default function ReportDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;

  // Mock report data based on the image
  const reportData = {
    id: id,
    reportNumber: id,
    reportDate: "2025-07-01 10:15 pm",
    reportType: "Renewal",
    status: "Medical Review",
    tags: ["Delayed"],
    customer: {
      name: "Greg Shaw",
      email: "gregoryshaw1@hotmail.com",
      phone: "+1 (555) 123-4567",
      shippingStatus: "Shipping pending",
      counselled: "Yes",
      doctor: "Dr. Smith",
    },
    billingAddress: {
      name: "Greg Shaw",
      address: "199 Eaton St, Halton Hills ON L7G 5Y3, CA",
      email: "gregoryshaw1@hotmail.com",
      phone: "+1 (555) 123-4567",
      paymentMethod: "bambora_credit card",
      transactionId: "10390467",
    },
    shippingAddress: {
      name: "Greg Shaw",
      address: "199 Eaton St, Halton Hills ON L7G 5Y3, CA",
      email: "gregoryshaw1@hotmail.com",
      phone: "+1 (555) 123-4567",
    },
    lastUpdated: "2025-07-01 11:09 pm",
    updatedBy: "Greg Shaw",
    progress: [
      { step: "Pending", completed: true },
      { step: "Medical Review", completed: true, current: true },
      { step: "Processing", completed: false },
      { step: "Shipped", completed: false },
    ],
    products: [
      {
        id: 1,
        name: "Ozempic®",
        tabsFrequency: "1.0mg sc weekly",
        qty: 1,
        subscriptionType: "Monthly",
        price: 300,
        action: "edit",
      },
    ],
    followUpConsultation: {
      name: "Follow-Up Consultation",
      qty: 1,
      price: 40,
    },
    reportTotals: {
      subtotal: 340,
      shipping: 0,
      tax: 0,
      total: 340,
    },
    hardcopy: {
      name: "rocky",
      rxNumber: "1022703",
      date: "July 2, 2025",
      patient: {
        name: "Shaw, Greg",
        dob: "1978-04-19",
        age: 47,
        gender: "male",
        address: "199 Eaton St, Halton Hills ON L7G 5Y3, CA",
      },
      medication: "Ozempic®",
      din: "12345678",
      cost: 300.0,
      total: 300.0,
    },
    prescription: {
      prescriber: {
        name: "Pamela Bridgen",
        address: "123 Medical Center Dr, Toronto ON M5V 2H1",
        phone: "+1 (416) 555-0123",
        id: "MD12345",
      },
      patient: {
        name: "Greg Shaw",
        age: 47,
        address: "199 Eaton St, Halton Hills ON L7G 5Y3, CA",
        date: "2025-08-01",
      },
      medication: {
        name: "Ozempic®",
        dosage: "4mg pen",
        quantity: "1 pen",
        duration: "4 weeks",
        refills: 0,
        instructions: "Inject 1.0mg sc weekly for 4 weeks",
      },
    },
    relatedReports: [
      {
        reportNumber: "485445",
        tags: ["Body Optimization"],
        relationship: "Parent Report",
        date: "June 3, 2025 2:15 pm",
        status: "Shipped",
        total: "$340",
      },
      {
        reportNumber: "485442",
        tags: [],
        relationship: "Subscription",
        date: "June 3, 2025 6:13 pm",
        status: "On hold",
        total: "$340.00 every 4 week",
      },
    ],
    notes: [
      {
        user: "Michael Perona",
        date: "2025-07-01 11:09 pm",
        content: "Report status changed from Pending to Medical Review",
      },
      {
        user: "WooCommerce",
        date: "2025-07-01 10:15 pm",
        content: "Report exported to pharmacy queue",
      },
      {
        user: "WooCommerce",
        date: "2025-07-01 10:15 pm",
        content: "Payment authorized: $340.00",
      },
    ],
    medicalNotes: [
      {
        user: "Pamela Bridgen",
        date: "2025-06-30 3:45 pm",
        content: "Patient completed weight loss questionnaire",
      },
      {
        user: "Pamela Bridgen",
        date: "2025-06-30 3:30 pm",
        content: "Current weight: 185 lbs, target: 165 lbs",
      },
      {
        user: "Pamela Bridgen",
        date: "2025-06-30 3:15 pm",
        content: "Lab results reviewed - all normal",
      },
    ],
    assignedTags: ["Delayed"],
  };

  const handleBack = () => {
    router.push("/reports");
  };

  const handleOpenInWP = () => {
    window.open(
      `https://myrocky.ca/wp-admin/post.php?post=${id}&action=edit`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className=" gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                Medical Review
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleOpenInWP}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
              >
                Open Report In WP
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
              >
                Send report to Pharmacy Queue
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
              >
                Send to Create Labs Queue
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm"
              >
                Packing Slips
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm"
              >
                Invoice Actions
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
              >
                Sync Report from WP
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Report Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Report #{reportData.reportNumber}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Report placed {reportData.reportDate} •{" "}
                  {reportData.reportType}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option>Medical Review</option>
                </select>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Delayed
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Customer Information */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {reportData.customer.name} (Customer)
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {reportData.customer.email}
                      </p>
                      <p>
                        <span className="font-medium">Shipping:</span>{" "}
                        {reportData.customer.shippingStatus}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">Counselled:</span>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="counselled"
                            value="yes"
                            defaultChecked
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="counselled"
                            value="no"
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                      <div>
                        <span className="font-medium">Doctor:</span>
                        <select className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>{reportData.customer.doctor}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Billing Address
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>{reportData.billingAddress.name}</p>
                      <p>{reportData.billingAddress.address}</p>
                      <p>{reportData.billingAddress.email}</p>
                      <p>{reportData.billingAddress.phone}</p>
                      <p>
                        <span className="font-medium">Payment:</span>{" "}
                        {reportData.billingAddress.paymentMethod}
                      </p>
                      <p>
                        <span className="font-medium">Transaction ID:</span>{" "}
                        {reportData.billingAddress.transactionId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Shipping Address
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>{reportData.shippingAddress.name}</p>
                    <p>{reportData.shippingAddress.address}</p>
                    <p>{reportData.shippingAddress.email}</p>
                    <p>{reportData.shippingAddress.phone}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Status:</span>
                    <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                      <option>Medical Review</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-600">
                    Last Updated on {reportData.lastUpdated} by{" "}
                    {reportData.updatedBy}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      {reportData.progress.map((step, index) => (
                        <span
                          key={index}
                          className={
                            step.current ? "text-blue-600 font-medium" : ""
                          }
                        >
                          {step.step}
                        </span>
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Products Summary */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Products Summary</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">PRODUCT NAME</th>
                        <th className="text-left py-2">TABS FREQUENCY</th>
                        <th className="text-left py-2">QTY</th>
                        <th className="text-left py-2">SUBSCRIPTION TYPE</th>
                        <th className="text-left py-2">PRICE</th>
                        <th className="text-left py-2">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-100"
                        >
                          <td className="py-3">{product.name}</td>
                          <td className="py-3">{product.tabsFrequency}</td>
                          <td className="py-3">{product.qty}</td>
                          <td className="py-3">{product.subscriptionType}</td>
                          <td className="py-3">${product.price}</td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Hardcopy:</span>
                    <input type="checkbox" className="rounded" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Auto-populate:
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                        <option>Select option</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Brand:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Dosage:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        DIN:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Amount Dispensed:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Refills:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Refills Left:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Amount Authorized:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Days Supply:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Drug Direction:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      RX Number:
                    </label>
                    <input
                      type="text"
                      value={reportData.hardcopy.rxNumber}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>

                  <Button variant="ghost" size="sm">
                    Calculate Refills
                  </Button>
                </div>

                {/* Follow-Up Consultation */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">
                        {reportData.followUpConsultation.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">
                        Qty: {reportData.followUpConsultation.qty}
                      </span>
                      <span className="font-medium">
                        ${reportData.followUpConsultation.price}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Totals */}
                <div className="mt-6 border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${reportData.reportTotals.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${reportData.reportTotals.shipping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${reportData.reportTotals.tax}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Report total:</span>
                      <span>${reportData.reportTotals.total}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="add" size="sm">
                      Add product(s)
                    </Button>
                    <Button variant="add" size="sm">
                      Add fee
                    </Button>
                    <Button variant="add" size="sm">
                      Add tax
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Hardcopy Section */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Hardcopy</h2>
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    See All Hardcopies
                  </a>
                </div>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {reportData.hardcopy.name}
                  </p>
                  <p>
                    <span className="font-medium">Rx Number:</span> #
                    {reportData.hardcopy.rxNumber}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {reportData.hardcopy.date}
                  </p>
                  <p>
                    <span className="font-medium">Patient:</span>{" "}
                    {reportData.hardcopy.patient.name}
                  </p>
                  <p>
                    <span className="font-medium">DOB:</span>{" "}
                    {reportData.hardcopy.patient.dob}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span>{" "}
                    {reportData.hardcopy.patient.age}
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span>{" "}
                    {reportData.hardcopy.patient.gender}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {reportData.hardcopy.patient.address}
                  </p>
                  <p>
                    <span className="font-medium">Medication:</span>{" "}
                    {reportData.hardcopy.medication}
                  </p>
                  <p>
                    <span className="font-medium">DIN:</span>{" "}
                    {reportData.hardcopy.din}
                  </p>
                  <p>
                    <span className="font-medium">CASH Cost:</span> $
                    {reportData.hardcopy.cost}
                  </p>
                  <p>
                    <span className="font-medium">CASH Total:</span> $
                    {reportData.hardcopy.total}
                  </p>
                </div>
              </Card>

              {/* Scanned Documents */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Scanned Documents</h2>
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    See All Documents
                  </a>
                </div>
                <p className="text-gray-500">Scanned documents not found</p>
              </Card>

              {/* Reports Section */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Reports</h2>
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    See All Reports
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Report Number</th>
                        <th className="text-left py-2">Tags/Categories</th>
                        <th className="text-left py-2">Relationship</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.relatedReports.map((report, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                #{report.reportNumber}
                              </span>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    window.open(
                                      `https://myrocky.ca/wp-admin/post.php?post=${report.reportNumber}&action=edit`,
                                      "_blank"
                                    )
                                  }
                                  className="w-6 h-6 bg-purple-500 hover:bg-purple-600 p-0"
                                >
                                  <span className="text-white text-xs font-bold">
                                    W
                                  </span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    window.open(
                                      `/reports/view/${report.reportNumber}/`,
                                      "_blank"
                                    )
                                  }
                                  className="w-6 h-6 bg-purple-500 hover:bg-purple-600 p-0"
                                >
                                  <span className="text-white text-xs font-bold">
                                    %
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">{report.tags.join(", ")}</td>
                          <td className="py-3">{report.relationship}</td>
                          <td className="py-3">{report.date}</td>
                          <td className="py-3">{report.status}</td>
                          <td className="py-3">{report.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Prescription Section */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Prescription</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Prescriber/Pharmacy Contact
                    </h3>
                    <p>{reportData.prescription.prescriber.name}</p>
                    <p>{reportData.prescription.prescriber.address}</p>
                    <p>{reportData.prescription.prescriber.phone}</p>
                    <p>ID: {reportData.prescription.prescriber.id}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Patient</h3>
                    <p>Name: {reportData.prescription.patient.name}</p>
                    <p>Age: {reportData.prescription.patient.age}</p>
                    <p>Address: {reportData.prescription.patient.address}</p>
                    <p>Date: {reportData.prescription.patient.date}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Medication
                    </h3>
                    <p>
                      Medication 1: {reportData.prescription.medication.name}
                    </p>
                    <p>Dosage: {reportData.prescription.medication.dosage}</p>
                    <p>
                      Quantity: {reportData.prescription.medication.quantity}
                    </p>
                    <p>
                      Duration: {reportData.prescription.medication.duration}
                    </p>
                    <p>Refills: {reportData.prescription.medication.refills}</p>
                    <p>
                      Instructions:{" "}
                      {reportData.prescription.medication.instructions}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                      Signature
                    </div>
                  </div>
                </div>
              </Card>

              {/* Report Notes */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Report Notes</h2>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {reportData.notes.map((note, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{note.user}</span>
                        <span className="text-gray-500">{note.date}</span>
                      </div>
                      <p className="text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <textarea
                    placeholder="Add your comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                      <option>Private Note</option>
                    </select>
                    <Button variant="add" size="sm">
                      Add
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Medical Notes */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Medical Notes</h2>
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {reportData.medicalNotes.map((note, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{note.user}</span>
                        <span className="text-gray-500">{note.date}</span>
                      </div>
                      <p className="text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <textarea
                    placeholder="Add your comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                    rows={3}
                  />
                  <Button variant="add" size="sm">
                    Add
                  </Button>
                </div>
              </Card>

              {/* Manage Tags */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Manage Tags</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Assigned Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {reportData.assignedTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {tag} ×
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Search & select tags..."
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <Button variant="add" size="sm">
                    Add Tags
                  </Button>
                </div>
              </Card>

              {/* Report Image */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Report Image</h2>
                <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Report image not found</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
