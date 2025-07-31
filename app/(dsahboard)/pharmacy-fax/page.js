"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Filters,
  DataTable,
  UserAvatar,
  PharmacyFaxModal,
  PageHeader,
} from "@/components/ui";
import Icons from "@/components/icons";
import { Eye, Trash2, Send, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PharmacyFaxPage() {
  const router = useRouter();
  const [filters, setFilters] = useState([
    {
      id: "date",
      type: "date-range",
      label: "Date",
      value: { start: null, end: null },
      placeholder: "Select date",
    },
    {
      id: "status",
      type: "select",
      label: "Status",
      value: "",
      placeholder: "Select Status",
      options: [
        { value: "success", label: "Success" },
        { value: "failed", label: "Failed" },
        { value: "pending", label: "Pending" },
      ],
    },
    {
      id: "sentBy",
      type: "select",
      label: "Sent By",
      value: "",
      placeholder: "Select User",
      options: [
        { value: "mayu-dev", label: "Mayu Dev" },
        { value: "ellaine-myrocky", label: "Ellaine Myrocky" },
      ],
    },
  ]);

  const [sortColumn, setSortColumn] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPharmacyFaxModalOpen, setIsPharmacyFaxModalOpen] = useState(false);

  // Pharmacy fax data - based on image and additional sample data
  const [faxData] = useState([
    {
      id: 1,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312345",
      sentBy: "Mayu Dev",
      createdDate: "2 months ago",
      updatedDate: "2 months ago",
      status: "Pending",
    },
    {
      id: 2,
      senderNumber: "+14375375123",
      receiverNumber: "+12505908824",
      sentBy: "Ellaine Myrocky",
      createdDate: "2 months ago",
      updatedDate: "2 months ago",
      status: "Pending",
    },
    {
      id: 3,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312346",
      sentBy: "Mayu Dev",
      createdDate: "3 months ago",
      updatedDate: "3 months ago",
      status: "Success",
    },
    {
      id: 4,
      senderNumber: "+14375375123",
      receiverNumber: "+12505908825",
      sentBy: "Ellaine Myrocky",
      createdDate: "3 months ago",
      updatedDate: "3 months ago",
      status: "Failed",
    },
    {
      id: 5,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312347",
      sentBy: "Mayu Dev",
      createdDate: "4 months ago",
      updatedDate: "4 months ago",
      status: "Success",
    },
    {
      id: 6,
      senderNumber: "+14375375123",
      receiverNumber: "+12505908826",
      sentBy: "Ellaine Myrocky",
      createdDate: "4 months ago",
      updatedDate: "4 months ago",
      status: "Pending",
    },
    {
      id: 7,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312348",
      sentBy: "Mayu Dev",
      createdDate: "5 months ago",
      updatedDate: "5 months ago",
      status: "Failed",
    },
    {
      id: 8,
      senderNumber: "+14375375123",
      receiverNumber: "+12505908827",
      sentBy: "Ellaine Myrocky",
      createdDate: "5 months ago",
      updatedDate: "5 months ago",
      status: "Success",
    },
    {
      id: 9,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312349",
      sentBy: "Mayu Dev",
      createdDate: "6 months ago",
      updatedDate: "6 months ago",
      status: "Pending",
    },
    {
      id: 10,
      senderNumber: "+14375375123",
      receiverNumber: "+12505908828",
      sentBy: "Ellaine Myrocky",
      createdDate: "6 months ago",
      updatedDate: "6 months ago",
      status: "Success",
    },
    {
      id: 11,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312350",
      sentBy: "Mayu Dev",
      createdDate: "7 months ago",
      updatedDate: "7 months ago",
      status: "Failed",
    },
    {
      id: 12,
      senderNumber: "+14375375123",
      receiverNumber: "+12505908829",
      sentBy: "Ellaine Myrocky",
      createdDate: "7 months ago",
      updatedDate: "7 months ago",
      status: "Pending",
    },
    {
      id: 13,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312351",
      sentBy: "Mayu Dev",
      createdDate: "8 months ago",
      updatedDate: "8 months ago",
      status: "Success",
    },
    {
      id: 14,
      senderNumber: "+14375375123",
      receiverNumber: "+12505908830",
      sentBy: "Ellaine Myrocky",
      createdDate: "8 months ago",
      updatedDate: "8 months ago",
      status: "Failed",
    },
    {
      id: 15,
      senderNumber: "+14375375123",
      receiverNumber: "+18773312352",
      sentBy: "Mayu Dev",
      createdDate: "9 months ago",
      updatedDate: "9 months ago",
      status: "Pending",
    },
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to data
  };

  const handleFilterReset = () => {
    setFilters(
      filters.map((filter) => ({
        ...filter,
        value: filter.type === "date-range" ? { start: null, end: null } : "",
      }))
    );
    setSearchQuery("");
  };

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  const handleViewFax = (faxId) => {
    router.push(`/pharmacy-fax/view/${faxId}`);
  };

  const handleDeleteFax = (faxId) => {
    console.log("Delete fax:", faxId);
  };

  const handleDownloadFax = (faxId) => {
    console.log("Download fax:", faxId);
    // Here you would typically trigger a download
  };

  const handleSendPharmacyFax = (formData) => {
    // Handle send pharmacy fax
    console.log("Send pharmacy fax:", formData);
    // Here you would typically make an API call to send the pharmacy fax
    // For now, we'll just log the data
  };

  const columns = [
    {
      id: "senderNumber",
      header: "Sender Number",
      sortable: true,
      className: "w-40",
    },
    {
      id: "receiverNumber",
      header: "Receiver Number",
      sortable: true,
      className: "w-40",
    },
    {
      id: "sentBy",
      header: "Sent By",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar
            user={{
              name: row.sentBy,
              email: `${row.sentBy
                .toLowerCase()
                .replace(/\s+/g, ".")}@example.com`,
            }}
            size="sm"
            className="flex-shrink-0"
          />
          <div className="font-medium">{row.sentBy}</div>
        </div>
      ),
    },
    {
      id: "createdDate",
      header: "Created Date",
      sortable: true,
      className: "w-32",
    },
    {
      id: "updatedDate",
      header: "Updated Date",
      sortable: true,
      className: "w-32",
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Success"
              ? "bg-green-100 text-green-800"
              : row.status === "Failed"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      className: "text-right w-24",
      cell: (row) => (
        <div className="flex justify-center gap-2">
          <div className="relative group flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadFax(row.id)}
              className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
            >
              <Download className="h-4 w-4" />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              Download Fax
            </span>
          </div>
          <div className="relative group flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewFax(row.id)}
              className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              View Fax
            </span>
          </div>
          <div className="relative group flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteFax(row.id)}
              className="bg-white hover:bg-gray-50 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              Delete Fax
            </span>
          </div>
        </div>
      ),
    },
  ];

  // Sort and filter data
  const filteredData = faxData
    .filter((fax) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          fax.senderNumber.toLowerCase().includes(searchLower) ||
          fax.receiverNumber.toLowerCase().includes(searchLower) ||
          fax.sentBy.toLowerCase().includes(searchLower) ||
          fax.status.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Apply other filters
      for (const filter of filters) {
        if (filter.type === "date-range") {
          if (filter.value?.start || filter.value?.end) {
            // For demo purposes, we'll skip date filtering since we're using relative dates
            // In real implementation, you'd convert relative dates to actual dates
          }
        } else if (filter.type === "select" && filter.value) {
          if (filter.id === "status") {
            if (fax.status.toLowerCase() !== filter.value) return false;
          } else if (filter.id === "sentBy") {
            const userValue = fax.sentBy.toLowerCase().replace(/\s+/g, "-");
            if (userValue !== filter.value) return false;
          }
        }
      }

      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      const modifier = sortDirection === "asc" ? 1 : -1;

      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return (aValue - bValue) * modifier;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <PageHeader
          icon={Icons.Fax}
          title="Pharmacy Fax"
          description="Manage and track fax communications with pharmacies"
          actions={
            <Button
              variant="default"
              size="default"
              onClick={() => setIsPharmacyFaxModalOpen(true)}
            >
              <Send className="h-4 w-4 mr-2" />
              New Pharmacy Fax
            </Button>
          }
        />
      </div>

      {/* Filters with inline search */}
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleFilterReset}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      {/* Pharmacy FAX Modal */}
      <PharmacyFaxModal
        isOpen={isPharmacyFaxModalOpen}
        onClose={() => setIsPharmacyFaxModalOpen(false)}
        onSubmit={handleSendPharmacyFax}
      />
    </div>
  );
}
