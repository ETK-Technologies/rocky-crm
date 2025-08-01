"use client";

import React, { useState } from "react";
import { Button, PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { Download, Trash2, Mail, Send } from "lucide-react";
import { useNotification } from "@/components/ui/Notification";
import { X } from "lucide-react";
import { useQuestionnaireFilters } from "./hooks";
import { QuestionnaireTable, FilterBar, StatusFilter } from "./components";

export default function OutOfRefillsPage() {
    const { showSuccess, NotificationContainer } = useNotification();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [questionnaireToDelete, setQuestionnaireToDelete] = useState(null);

    const {
        filters,
        sortColumn,
        sortDirection,
        searchQuery,
        setSearchQuery,
        selectedRows,
        setSelectedRows,
        filteredData,
        activeStatusFilter,
        setActiveStatusFilter,
        statusFilterActions,
        handleFilterChange,
        handleFilterReset,
        handleSort,
    } = useQuestionnaireFilters();

    // Delete logic
    const handleDeleteClick = (questionnaire) => {
        setQuestionnaireToDelete(questionnaire);
        setShowDeleteDialog(true);
    };

    const handleBulkDelete = () => {
        setQuestionnaireToDelete({ ids: selectedRows, status: "bulk" });
        setShowDeleteDialog(true);
    };

    const handleBulkEmail = () => {
        console.log("Sending email to:", selectedRows);
        showSuccess("Email sent", "Bulk email has been sent to selected questionnaires.");
    };

    const handleBulkExport = () => {
        console.log("Exporting questionnaires:", selectedRows);
        showSuccess("Export successful", "Selected questionnaires have been exported.");
    };

    const handleSendReminder = () => {
        console.log("Sending reminders to:", selectedRows);
        showSuccess("Reminders sent", "Reminders have been sent to selected questionnaires.");
    };

    const handleDeleteConfirm = () => {
        if (questionnaireToDelete.status === "bulk") {
            showSuccess(
                "Deleted successfully",
                "Selected questionnaires have been deleted."
            );
        } else {
            showSuccess("Deleted successfully", "Questionnaire has been deleted.");
        }
        setShowDeleteDialog(false);
        setQuestionnaireToDelete(null);
        setSelectedRows([]);
    };

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
        setQuestionnaireToDelete(null);
    };

    return (
        <div className="space-y-6">
            <NotificationContainer />

            {/* Header */}
            <div className="mb-8">
                <PageHeader
                    icon={Icons.Questionnaire}
                    title="OOR Questionnaire & Logs"
                    description="Manage out-of-refills questionnaires and tracking"
                    actions={
                        <div className="flex items-center gap-2">
                            {selectedRows.length > 0 && (
                                <>
                                    <Button variant="outline" size="sm" onClick={handleSendReminder}>
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Reminder
                                    </Button>
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
                            <Button onClick={() => console.log("Add new questionnaire")}>
                                Add Questionnaire
                            </Button>
                        </div>
                    }
                />
            </div>

            {/* Status Filter */}
            <StatusFilter
                actions={statusFilterActions}
                activeAction={activeStatusFilter}
                onActionChange={setActiveStatusFilter}
            />

            {/* Filters */}
            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleFilterReset}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Table */}
            <QuestionnaireTable
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
                                Delete Questionnaire{" "}
                                {questionnaireToDelete.status === "bulk" ? "Records" : "Record"}
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
                                {questionnaireToDelete.status === "bulk"
                                    ? "these questionnaire records"
                                    : "this questionnaire record"}
                                ?
                            </div>
                            <div className="text-center text-secondary-600">
                                {questionnaireToDelete.status === "bulk"
                                    ? `${questionnaireToDelete.ids.length} records will be permanently deleted.`
                                    : "Once this record is deleted, it cannot be recovered."}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 px-6 pb-6">
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Delete {questionnaireToDelete.status === "bulk" ? "Records" : "Record"}
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