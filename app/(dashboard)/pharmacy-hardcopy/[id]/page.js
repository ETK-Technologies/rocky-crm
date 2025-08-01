"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';
import { ArrowLeft, Download, Edit, Printer } from 'lucide-react';
import { hardcopyData } from '../data/hardcopyData';
import { useNotification } from '@/components/ui/Notification';

export default function HardcopyDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { showSuccess, NotificationContainer } = useNotification();

    const hardcopyId = parseInt(params.id);
    const hardcopy = hardcopyData.find(h => h.id === hardcopyId);

    if (!hardcopy) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Hardcopy Not Found</h1>
                    <p className="text-gray-600 mb-6">The hardcopy record you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/pharmacy-hardcopy')}>
                        Back to Hardcopies
                    </Button>
                </div>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
        showSuccess("Print initiated", "The hardcopy is being prepared for printing.");
    };

    const handleDownload = () => {
        showSuccess("Download started", "The hardcopy PDF is being downloaded.");
    };

    const handleEdit = () => {
        showSuccess("Edit mode", "Edit functionality will be implemented soon.");
    };

    return (
        <>
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    .print-page {
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .print-card {
                        box-shadow: none !important;
                        border: 1px solid #000 !important;
                    }
                }
            `}</style>

            <div className="min-h-screen bg-gray-50 py-8 print-page">
                <NotificationContainer />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header - Hidden on print */}
                    <div className="mb-6 no-print">
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="ghost"
                                onClick={() => router.push('/pharmacy-hardcopy')}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                            <h1 className="text-2xl font-bold text-gray-900">Hardcopy</h1>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={handlePrint}
                                className="flex items-center gap-2"
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleDownload}
                                className="flex items-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Button>
                            <Button
                                onClick={handleEdit}
                                className="flex items-center gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </Button>
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <Card className="bg-white shadow-lg print-card">
                        <div className="p-6 sm:p-8 space-y-6">
                            {/* Patient and Prescription Header */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="text-sm text-gray-600">Rx Number: #{hardcopy.patient.rxNumber}</div>
                                    <div className="text-base sm:text-lg font-semibold text-gray-900">{hardcopy.patient.name}</div>
                                    <div className="text-sm text-gray-600">Gender: {hardcopy.patient.gender}</div>
                                    <div className="text-sm text-gray-600 break-words">{hardcopy.patient.address}</div>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="text-sm text-gray-600">Date: {hardcopy.hardcopyDate}</div>
                                    <div className="text-sm text-gray-600">DOB: {hardcopy.patient.dateOfBirth}</div>
                                    <div className="text-sm text-gray-600">Age: {hardcopy.patient.age}</div>
                                </div>
                            </div>

                            {/* Medication Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6">
                                <div className="space-y-3 sm:space-y-4">
                                    {hardcopy.medications.map((med, index) => (
                                        <div key={index} className="space-y-1 sm:space-y-2">
                                            <div className="text-sm font-medium text-gray-900">
                                                ({med.quantity}) {med.name} {med.dosage}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                R({med.refills}): {med.amount} A: {med.days} DAYS:
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {hardcopy.medications.map((med, index) => (
                                        <div key={index} className="space-y-1 sm:space-y-2">
                                            <div className="text-sm text-gray-600">TAB DIN: {med.din}</div>
                                            <div className="text-sm text-gray-600">mfg: {med.manufacturer}</div>
                                            <div className="text-sm text-gray-600">Days Supply: {med.daysSupply}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pharmacy/Prescriber Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="text-sm font-medium text-gray-900">{hardcopy.pharmacy.name}</div>
                                    <div className="text-sm text-gray-600 break-words">{hardcopy.pharmacy.address}</div>
                                    <div className="text-sm text-gray-600">Tel: {hardcopy.pharmacy.phone}</div>
                                    <div className="text-sm text-gray-600">Fax: {hardcopy.pharmacy.fax}</div>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="text-sm text-gray-600">Lic#: {hardcopy.pharmacy.license}</div>
                                </div>
                            </div>

                            {/* Drug Directions and Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="text-sm text-gray-600">
                                        Drug Direction: {hardcopy.directions}
                                    </div>
                                    <div className="text-center text-sm font-medium text-gray-900 border-t border-gray-200 pt-3">
                                        ---{hardcopy.prescriptionType}---
                                    </div>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="text-sm text-gray-600">{hardcopy.drugStatus}</div>
                                </div>
                            </div>

                            {/* Financial and Counseling Details */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="text-sm font-medium text-gray-900">{hardcopy.payment.method}</div>
                                        <div className="text-sm text-gray-600">Cost: ${hardcopy.payment.cost.toFixed(2)}</div>
                                        <div className="text-sm text-gray-600">Dispensing Fee: ${hardcopy.payment.dispensingFee.toFixed(2)}</div>
                                        <div className="text-sm text-gray-600">Discount: ${hardcopy.payment.discount.toFixed(2)}</div>
                                        <div className="text-sm font-medium text-gray-900">Total: ${hardcopy.payment.total.toFixed(2)}</div>
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="text-sm text-gray-600">
                                            Other DIN Used: {hardcopy.payment.otherDinUsed || "N/A"}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Counselled(Yes/No): {hardcopy.payment.counselled.yes ? "Yes" : "No"} {hardcopy.payment.counselled.initials}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
} 