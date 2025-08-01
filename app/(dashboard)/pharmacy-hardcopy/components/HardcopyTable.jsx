import React from 'react';
import { DataTable } from '@/components/ui';
import { UserAvatar } from '@/components/ui';
import { Button } from '@/components/ui';
import { Pencil, Trash2, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HardcopyTable = ({
    data,
    sortColumn,
    sortDirection,
    onSort,
    selectable = false,
    selectedRows = [],
    onSelectedRowsChange,
}) => {
    const router = useRouter();

    const handleEdit = (hardcopy) => {
        // Navigate to edit page or open modal
        console.log('Edit hardcopy:', hardcopy.id);
    };

    const handleDelete = (hardcopy) => {
        // Handle delete logic
        console.log('Delete hardcopy:', hardcopy.id);
    };

    const handleDownloadPDF = (hardcopy) => {
        // Handle PDF download
        console.log('Download PDF for hardcopy:', hardcopy.id);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'shipped':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const columns = [
        ...(selectable ? [{
            id: "select",
            header: "",
            width: 40,
        }] : []),
        {
            id: "patient",
            header: "Patient",
            sortable: true,
            cell: (row) => (
                <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-md transition-colors"
                    onClick={() => router.push(`/pharmacy-hardcopy/${row.id}`)}
                >
                    <UserAvatar
                        user={{
                            name: row.patient.name,
                            email: row.patient.rxNumber,
                        }}
                        size="sm"
                    />
                    <div>
                        <div className="font-medium">Rx Number #{row.patient.rxNumber}</div>
                        <div className="text-sm text-secondary-500">{row.patient.name}</div>
                    </div>
                </div>
            ),
        },
        {
            id: "medications",
            header: "Medications",
            sortable: false,
            cell: (row) => (
                <div className="space-y-1">
                    {row.medications.map((med, index) => (
                        <div key={index} className="text-sm">
                            <span className="font-medium">• {med.name}</span>
                            <span className="text-secondary-500 ml-2">{med.dosage}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: "hardcopyDate",
            header: "Hardcopy Date",
            sortable: true,
            cell: (row) => (
                <div className="text-sm">{row.hardcopyDate}</div>
            ),
        },
        {
            id: "order",
            header: "#Order",
            sortable: true,
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <span className="font-medium">#{row.order.number}</span>
                    <div className="flex items-center gap-1">
                        {/* WordPress icon */}
                        <div className="w-4 h-4 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
                            W
                        </div>
                        {/* Document with percentage icon */}
                        <div className="w-4 h-4 bg-black rounded flex items-center justify-center text-white text-xs">
                            %
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.order.status)}`}>
                        {row.order.status}
                    </span>
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            className: "text-right",
            cell: (row) => (
                <div className="flex justify-center gap-2">
                    <div className="relative group flex flex-col items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(row)}
                            className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            Edit Hardcopy
                        </span>
                    </div>
                    <div className="relative group flex flex-col items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(row)}
                            className="bg-white hover:bg-gray-50 text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            Delete Hardcopy
                        </span>
                    </div>
                </div>
            ),
        },
        {
            id: "pdf",
            header: "PDF",
            className: "text-center",
            cell: (row) => (
                <div className="flex justify-center">
                    <div className="relative group flex flex-col items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPDF(row)}
                            className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            Download PDF
                        </span>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
            selectable={selectable}
            selectedRows={selectedRows}
            onSelectedRowsChange={onSelectedRowsChange}
        />
    );
};

export default HardcopyTable; 