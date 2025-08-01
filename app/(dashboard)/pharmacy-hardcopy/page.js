"use client";

import React, { useState } from "react";
import { Button, PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { Download, Trash2, Mail } from "lucide-react";
import { useNotification } from "@/components/ui/Notification";
import { X } from "lucide-react";
import { useHardcopyFilters } from "./hooks";
import { HardcopyTable, FilterBar } from "./components";

export default function PharmacyHardcopyPage() {
    const { showSuccess, NotificationContainer } = useNotification();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [hardcopyToDelete, setHardcopyToDelete] = useState(null);

    const {
        filters,
        sortColumn,
        sortDirection,
        searchQuery,
        setSearchQuery,
        selectedRows,
        setSelectedRows,
        filteredData,
        handleFilterChange,
        handleFilterReset,
        handleSort,
    } = useHardcopyFilters();

    // Delete logic
    const handleDeleteClick = (hardcopy) => {
        setHardcopyToDelete(hardcopy);
        setShowDeleteDialog(true);
    };

    const handleBulkDelete = () => {
        setHardcopyToDelete({ ids: selectedRows, status: "bulk" });
        setShowDeleteDialog(true);
    };

    const handleBulkEmail = () => {
        console.log("Sending email to:", selectedRows);
        showSuccess("Email sent", "Bulk email has been sent to selected hardcopies.");
    };

    const handleBulkExport = () => {
        console.log("Exporting hardcopies:", selectedRows);
        showSuccess("Export successful", "Selected hardcopies have been exported.");
    };

    const handleDeleteConfirm = () => {
        if (hardcopyToDelete.status === "bulk") {
            showSuccess(
                "Deleted successfully",
                "Selected hardcopies have been deleted."
            );
        } else {
            showSuccess("Deleted successfully", "Hardcopy has been deleted.");
        }
        setShowDeleteDialog(false);
        setHardcopyToDelete(null);
        setSelectedRows([]);
    };

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
        setHardcopyToDelete(null);
    };

    return (
        <div className="space-y-6">
            <NotificationContainer />

            {/* Header */}
            <div className="mb-8">
                <PageHeader
                    icon={Icons.Documents}
                    title="Hardcopies"
                    description="Manage pharmacy hardcopy records and prescriptions"
                    actions={
                        <div className="flex items-center gap-2">
                            {selectedRows.length > 0 && (
                                <>
                                    <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email Selected
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleBulkExport}
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Selected
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500"
                                        onClick={handleBulkDelete}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Selected
                                    </Button>
                                </>
                            )}
                            <Button onClick={() => console.log("Add new hardcopy")}>
                                Add Hardcopy
                            </Button>
                        </div>
                    }
                />
            </div>

            {/* Filters */}
            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleFilterReset}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Table */}
            <HardcopyTable
                data={filteredData}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                selectable={true}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
            />

            {/* Delete Dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
                            <h2 className="text-lg font-semibold text-secondary-900">
                                Delete Hardcopy{" "}
                                {hardcopyToDelete.status === "bulk" ? "Records" : "Record"}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDeleteCancel}
                                className="text-secondary-600 hover:text-secondary-800"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="text-center text-lg font-medium text-secondary-900">
                                Are you sure you want to delete{" "}
                                {hardcopyToDelete.status === "bulk"
                                    ? "these hardcopy records"
                                    : "this hardcopy record"}
                                ?
                            </div>
                            <div className="text-center text-secondary-600">
                                {hardcopyToDelete.status === "bulk"
                                    ? `${hardcopyToDelete.ids.length} records will be permanently deleted.`
                                    : "Once this record is deleted, it cannot be recovered."}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 px-6 pb-6">
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Delete {hardcopyToDelete.status === "bulk" ? "Records" : "Record"}
                            </Button>
                            <Button variant="outline" onClick={handleDeleteCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}