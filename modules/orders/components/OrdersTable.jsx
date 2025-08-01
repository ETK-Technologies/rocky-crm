import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui";
import {
  Eye,
  Trash2,
  Pill,
  Dumbbell,
  Heart,
  Brain,
  Activity,
  Info,
  HelpCircle,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import Link from "next/link";

const getCategoryIcon = (category) => {
  switch (category) {
    case "Sexual Health":
      return <Heart className="w-3.5 h-3.5" />;
    case "Body Optimization":
      return <Dumbbell className="w-3.5 h-3.5" />;
    case "Mental Health":
      return <Brain className="w-3.5 h-3.5" />;
    case "Recovery":
      return <Activity className="w-3.5 h-3.5" />;
    case "Hair Loss":
      return <Pill className="w-3.5 h-3.5" />;
    default:
      return <Pill className="w-3.5 h-3.5" />;
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Shipped":
      return "bg-blue-50 text-blue-700";
    case "Pending payment":
      return "bg-blue-50 text-blue-700";
    case "Failed":
      return "bg-red-50 text-red-700";
    case "Medical Review":
      return "bg-orange-50 text-orange-700";
    case "Processing":
      return "bg-gray-50 text-gray-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

const getOrderTypeStyle = (type) => {
  switch (type) {
    case "Renewal":
      return "text-blue-600";
    case "New":
      return "text-green-600";
    case "Created by admin":
      return "text-purple-600";
    default:
      return "text-gray-600";
  }
};

const formatDate = (date) => {
  const now = new Date();
  const dateObj = new Date(date);
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) {
    return `Updated ${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  return {
    updated: `Updated ${dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`,
    created: `Created at: ${dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })} ${dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`,
  };
};

const columns = [
  {
    id: "select",
    header: "",
    width: 40,
  },
  {
    id: "id",
    header: "Order",
    sortable: true,
    cell: (row) => (
      <div
        className="flex flex-col gap-1 cursor-pointer hover:bg-secondary-50 p-2 rounded-md transition-colors"
        onClick={() => (window.location.href = `/orders/${row.id}`)}
      >
        <div className="font-medium">#{row.id}</div>
        <div>{row.name}</div>
        <div className={`text-xs ${getOrderTypeStyle(row.orderType)}`}>
          {row.orderType === "Renewal"
            ? "Renewal"
            : row.orderType === "New"
            ? "New Subscription"
            : row.orderType === "Created by admin"
            ? "Created by admin"
            : "Others"}
        </div>
      </div>
    ),
  },
  {
    id: "category",
    header: "Tags/Categories",
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 px-2.5 py-1.5 rounded-full text-xs font-medium">
          {getCategoryIcon(row.category)}
          {row.category}
        </div>
        {row.tags.length > 1 && <Info className="w-4 h-4 text-gray-400" />}
      </div>
    ),
  },
  {
    id: "date",
    header: "Date",
    sortable: true,
    cell: (row) => {
      const dates = formatDate(row.date);
      return (
        <div className="space-y-1">
          <div className="text-sm text-gray-900">{dates.updated}</div>
          <div className="text-xs text-gray-500">{dates.created}</div>
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    cell: (row) => {
      const statusClass = getStatusStyle(row.status);
      // Use deterministic approach instead of Math.random() to prevent hydration errors
      const isDelayed = row.status === "Processing" && row.id % 2 === 0;

      return (
        <div className="space-y-1.5">
          {isDelayed && (
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1.5 rounded-full text-xs font-medium">
              Delayed
            </div>
          )}
          <div
            className={`inline-flex items-center gap-1.5 ${statusClass} px-2.5 py-1.5 rounded-full text-xs font-medium`}
          >
            {row.status}
          </div>
          {row.status === "Shipped" && (
            <div className="text-xs text-gray-500">
              on{" "}
              {new Date(row.updatedDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "shipping",
    header: "Shipping",
    sortable: true,
    cell: (row) => (
      <div className="space-y-0.5">
        <div className="font-medium">{row.name}</div>
        <div className="text-sm text-gray-600">{row.shipping}</div>
      </div>
    ),
  },
  {
    id: "total",
    header: "Order Total",
    sortable: true,
    cell: (row) => (
      <div className="space-y-0.5">
        <div className="font-medium">$ {row.total}</div>
        <div className="text-xs text-gray-500">Paid Via {row.payment}</div>
      </div>
    ),
  },
  {
    id: "items",
    header: "Order Items",
    cell: (row) => (
      <div>
        {row.items.map((item, idx) => (
          <div key={idx} className="text-sm">
            {item}
          </div>
        ))}
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
            onClick={() => (window.location.href = `/orders/${row.id}`)}
            className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
            View Order
          </span>
        </div>
        <div className="relative group flex flex-col items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              (window.location.href = `/prescriptions/view/${row.id}`)
            }
            className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
          >
            <svg
              className="h-4 w-4 text-gray-500 hover:text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </Button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
            View Prescription
          </span>
        </div>
      </div>
    ),
  },
];

function OrdersTable({
  orders,
  sortColumn,
  sortDirection,
  onSort,
  selectable = true,
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
