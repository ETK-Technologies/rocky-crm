import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
const columns = [
    {
        id: "id",
        header: "Order",
        sortable: true,
        cell: (row) => (
            <Link
                href={`/orders/${row.id}`}
                className="font-semibold text-blue-600 hover:underline"
            >
                #{row.id} {row.name}
            </Link>
        ),
    },
    {
        id: "category",
        header: "Category",
        sortable: true,
        cell: (row) => (
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                {row.category}
            </span>
        ),
    },
    {
        id: "date",
        header: "Date",
        sortable: true,
        cell: (row) => new Date(row.date).toLocaleString(),
    },
    {
        id: "status",
        header: "Status",
        sortable: true,
        cell: (row) => (
            <span
                className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${row.status === "Pending payment"
                    ? "bg-blue-100 text-blue-800"
                    : row.status === "Medical Review"
                        ? "bg-orange-100 text-orange-800"
                        : row.status === "Shipped"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
            >
                {row.status}
            </span>
        ),
    },
    {
        id: "province",
        header: "Shipping",
        sortable: true,
    },
    {
        id: "orderType",
        header: "Order Type",
        sortable: true,
    },
    {
        id: "total",
        header: "Order Total",
        sortable: true,
        cell: (row) => (
            <span className="font-semibold">${row.total}</span>
        ),
    },
    {
        id: "payment",
        header: "Payment",
        sortable: true,
        cell: (row) => (
            <span className="text-xs text-gray-500">Paid Via {row.payment}</span>
        ),
    },
    {
        id: "items",
        header: "Order Items",
        cell: (row) => row.items.map((item, idx) => <div key={idx}>{item}</div>),
    },
    {
        id: "prescription",
        header: "Prescription",
        cell: (row) => row.prescription.map((pres, idx) => <div key={idx}>{pres}</div>),
    },
    {
        id: "actions",
        header: "Actions",
        className: "text-right",
        cell: (row) => (
            <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        ),
    },
];
function OrdersTable({
    orders,
    sortColumn,
    sortDirection,
    onSort,
    selectable,
    selectedRows,
    onSelectedRowsChange,
    pageSize,
}) {


    return (
        <DataTable
            columns={columns}
            data={orders}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
            selectable={selectable}
            selectedRows={selectedRows}
            onSelectedRowsChange={onSelectedRowsChange}
            pageSize={pageSize}
        />
    );
}

export default OrdersTable;
