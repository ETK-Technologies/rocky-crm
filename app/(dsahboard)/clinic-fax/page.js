"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Filters,
  DataTable,
  UserAvatar,
  SendFaxModal,
  PageHeader,
} from "@/components/ui";
import Icons from "@/components/icons";
import { Eye, Trash2, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClinicFaxPage() {
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
        { value: "angela-clemente", label: "Angela Clemente" },
        { value: "althea-reyes", label: "Althea Reyes" },
        { value: "ellaine-myrocky", label: "Ellaine Myrocky" },
        { value: "lester-sy", label: "Lester Sy" },
        { value: "trisha-maxene", label: "Trisha Maxene" },
      ],
    },
  ]);

  const [sortColumn, setSortColumn] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSendFaxModalOpen, setIsSendFaxModalOpen] = useState(false);

  // Example fax data - replace with actual data fetching
  const [faxData] = useState([
    {
      id: 1,
      senderNumber: "+14375375123",
      receiverNumber: "+18195396839",
      sentBy: "Angela Clemente",
      createdDate: "17 hours ago",
      updatedDate: "17 hours ago",
      status: "Success",
    },
    {
      id: 2,
      senderNumber: "+14375375123",
      receiverNumber: "+17057496909",
      sentBy: "Althea Reyes",
      createdDate: "3 days ago",
      updatedDate: "3 days ago",
      status: "Success",
    },
    {
      id: 3,
      senderNumber: "+14375375123",
      receiverNumber: "+14506862356",
      sentBy: "Ellaine Myrocky",
      createdDate: "4 days ago",
      updatedDate: "4 days ago",
      status: "Success",
    },
    {
      id: 4,
      senderNumber: "+14375375123",
      receiverNumber: "514-489-7924",
      sentBy: "Lester Sy",
      createdDate: "5 days ago",
      updatedDate: "5 days ago",
      status: "Success",
    },
    {
      id: 5,
      senderNumber: "+14375375123",
      receiverNumber: "+18195396839",
      sentBy: "Trisha Maxene",
      createdDate: "6 days ago",
      updatedDate: "6 days ago",
      status: "Success",
    },
    {
      id: 6,
      senderNumber: "+14375375123",
      receiverNumber: "+17057496909",
      sentBy: "Angela Clemente",
      createdDate: "1 week ago",
      updatedDate: "1 week ago",
      status: "Failed",
    },
    {
      id: 7,
      senderNumber: "+14375375123",
      receiverNumber: "+14506862356",
      sentBy: "Althea Reyes",
      createdDate: "1 week ago",
      updatedDate: "1 week ago",
      status: "Success",
    },
    {
      id: 8,
      senderNumber: "+14375375123",
      receiverNumber: "514-489-7924",
      sentBy: "Ellaine Myrocky",
      createdDate: "2 weeks ago",
      updatedDate: "2 weeks ago",
      status: "Success",
    },
    {
      id: 9,
      senderNumber: "+14375375123",
      receiverNumber: "+18195396839",
      sentBy: "Lester Sy",
      createdDate: "2 weeks ago",
      updatedDate: "2 weeks ago",
      status: "Pending",
    },
    {
      id: 10,
      senderNumber: "+14375375123",
      receiverNumber: "+17057496909",
      sentBy: "Trisha Maxene",
      createdDate: "3 weeks ago",
      updatedDate: "3 weeks ago",
      status: "Failed",
    },
    {
      id: 11,
      senderNumber: "+14375375123",
      receiverNumber: "+14506862356",
      sentBy: "Angela Clemente",
      createdDate: "3 weeks ago",
      updatedDate: "3 weeks ago",
      status: "Success",
    },
    {
      id: 12,
      senderNumber: "+14375375123",
      receiverNumber: "514-489-7924",
      sentBy: "Althea Reyes",
      createdDate: "4 weeks ago",
      updatedDate: "4 weeks ago",
      status: "Pending",
    },
    {
      id: 13,
      senderNumber: "+14375375123",
      receiverNumber: "+18195396839",
      sentBy: "Ellaine Myrocky",
      createdDate: "4 weeks ago",
      updatedDate: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 14,
      senderNumber: "+14375375123",
      receiverNumber: "+17057496909",
      sentBy: "Lester Sy",
      createdDate: "1 month ago",
      updatedDate: "1 month ago",
      status: "Success",
    },
    {
      id: 15,
      senderNumber: "+14375375123",
      receiverNumber: "+14506862356",
      sentBy: "Trisha Maxene",
      createdDate: "1 month ago",
      updatedDate: "1 month ago",
      status: "Pending",
    },
    {
      id: 16,
      senderNumber: "+14375375123",
      receiverNumber: "514-489-7924",
      sentBy: "Angela Clemente",
      createdDate: "1 month ago",
      updatedDate: "1 month ago",
      status: "Failed",
    },
    {
      id: 17,
      senderNumber: "+14375375123",
      receiverNumber: "+18195396839",
      sentBy: "Althea Reyes",
      createdDate: "2 months ago",
      updatedDate: "2 months ago",
      status: "Success",
    },
    {
      id: 18,
      senderNumber: "+14375375123",
      receiverNumber: "+17057496909",
      sentBy: "Ellaine Myrocky",
      createdDate: "2 months ago",
      updatedDate: "2 months ago",
      status: "Pending",
    },
    {
      id: 19,
      senderNumber: "+14375375123",
      receiverNumber: "+14506862356",
      sentBy: "Lester Sy",
      createdDate: "2 months ago",
      updatedDate: "2 months ago",
      status: "Failed",
    },
    {
      id: 20,
      senderNumber: "+14375375123",
      receiverNumber: "514-489-7924",
      sentBy: "Trisha Maxene",
      createdDate: "3 months ago",
      updatedDate: "3 months ago",
      status: "Success",
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
    router.push(`/clinic-fax/view/${faxId}`);
  };

  const handleDeleteFax = (faxId) => {
    console.log("Delete fax:", faxId);
  };

  const handleSendFax = (formData) => {
    // Handle send fax
    console.log("Send fax:", formData);
    // Here you would typically make an API call to send the fax
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
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost-view"
            size="sm"
            onClick={() => handleViewFax(row.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost-delete"
            size="sm"
            onClick={() => handleDeleteFax(row.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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
          title="Clinic Fax"
          description="Send and manage fax communications with clinics"
          actions={
            <Button
              variant="send"
              size="default"
              onClick={() => setIsSendFaxModalOpen(true)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send New FAX
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

      {/* Send FAX Modal */}
      <SendFaxModal
        isOpen={isSendFaxModalOpen}
        onClose={() => setIsSendFaxModalOpen(false)}
        onSubmit={handleSendFax}
      />
    </div>
  );
}
