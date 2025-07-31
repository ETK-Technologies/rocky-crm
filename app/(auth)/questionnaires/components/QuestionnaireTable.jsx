"use client";

import { DataTable } from "@/components/ui";
import { useState, useMemo } from "react";

const QuestionnaireTable = ({
  filters = [],
  activeCategory = "All",
  searchQuery = "",
}) => {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  const handleSelect = (rows) => {
    setSelectedRows(rows);
  };

  const handleDelete = (rows) => {
    setSelectedRows(rows);
  };

  const handleEdit = (row) => {
    console.log(row);
  };

  const data = [
    {
      id: 1,
      user: {
        name: "Mark Mitchell",
        email: "markmitchell72@gmail.com",
        entryNumber: "19359601908215434",
      },
      tags: "Out of refills",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Catherine Puhl",
      completionState: { label: "✓ Consent Granted", percentage: 100 },
      province: "British Columbia",
      date: {
        updated: "2 minutes ago",
        created: "2025-01-15 10:30:00",
      },
    },
    {
      id: 2,
      user: {
        name: "Leon Paris",
        email: "leonparis21@hotmail.com",
        entryNumber: "19359607936610107",
      },
      tags: "Flagged",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Dr. Sarah Johnson",
      completionState: { label: "FULL", percentage: 100 },
      province: "New Brunswick",
      date: {
        updated: "15 minutes ago",
        created: "2025-01-14 14:20:00",
      },
    },
    {
      id: 3,
      user: {
        name: "Travis Newell",
        email: "travisnewell@live.ca",
        entryNumber: "19359601651230405",
      },
      tags: "Needs Immediate Attention",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Catherine Puhl",
      completionState: { label: "✓ Consent Granted", percentage: 85 },
      province: "Nova Scotia",
      date: {
        updated: "1 hour ago",
        created: "2025-01-13 09:15:00",
      },
    },
    {
      id: 4,
      user: {
        name: "Christopher Matthew Oliver Lang",
        email: "samguy123@yahoo.com",
        entryNumber: "19359601985029907",
      },
      tags: "Delayed",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Dr. Michael Smith",
      completionState: { label: "✓ Consent Granted", percentage: 100 },
      province: "British Columbia",
      date: {
        updated: "2 hours ago",
        created: "2025-01-12 16:45:00",
      },
    },
    {
      id: 5,
      user: {
        name: "Mister Sunday",
        email: "hjleslunays@gmail.com",
        entryNumber: "19359150024680830",
      },
      tags: "Pending Consent",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "",
      completionState: { label: "", percentage: 75 },
      province: "Quebec",
      date: {
        updated: "3 hours ago",
        created: "2025-01-11 11:30:00",
      },
    },
    {
      id: 6,
      user: {
        name: "R W",
        email: "rmre@gmail.com",
        entryNumber: "19359154857223558",
      },
      tags: "Possible Dose Change",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "",
      completionState: { label: "", percentage: 45 },
      province: "British Columbia",
      date: {
        updated: "5 hours ago",
        created: "2025-01-10 08:20:00",
      },
    },
    {
      id: 7,
      user: {
        name: "Jonathan Montreuil",
        email: "jonathanmontreuil@gmail.com",
        entryNumber: "19359153544434722",
      },
      tags: "Missing or Incomplete Questionnaire",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Dr. Sarah Johnson",
      completionState: { label: "✓ Consent Granted", percentage: 90 },
      province: "Quebec",
      date: {
        updated: "1 day ago",
        created: "2025-01-09 13:45:00",
      },
    },
    {
      id: 8,
      user: {
        name: "Dale Locheaed",
        email: "dalelock2@gmail.com",
        entryNumber: "19359151443482",
      },
      tags: "Pending Consultation",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Dr. Michael Smith",
      completionState: { label: "✓ Consent Granted", percentage: 100 },
      province: "Alberta",
      date: {
        updated: "2 days ago",
        created: "2025-01-08 10:15:00",
      },
    },
    {
      id: 9,
      user: {
        name: "Patrick Marquardt",
        email: "patidor1977@gmail.com",
        entryNumber: "19359147585334723",
      },
      tags: "Pending Order from Patient",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Catherine Puhl",
      completionState: { label: "FULL", percentage: 100 },
      province: "Quebec",
      date: {
        updated: "3 days ago",
        created: "2025-01-07 15:30:00",
      },
    },
    {
      id: 10,
      user: {
        name: "Cory Marshall",
        email: "wright.djshane@gmail.com",
        entryNumber: "19359145948500264",
      },
      tags: "Special Delivery Instructions",
      form: "ED questionnaire",
      status: "Pending",
      consultant: "Dr. Emily Davis",
      completionState: { label: "✓ Consent Granted", percentage: 25 },
      province: "New Brunswick",
      date: {
        updated: "1 week ago",
        created: "2025-01-05 12:00:00",
      },
    },
    {
      id: 11,
      user: {
        name: "Alex Johnson",
        email: "alex.johnson@email.com",
        entryNumber: "19359145948500265",
      },
      tags: "Out of refills",
      form: "Hair questionnaire",
      status: "Pending",
      consultant: "Dr. Lisa Chen",
      completionState: { label: "✓ Consent Granted", percentage: 100 },
      province: "Ontario",
      date: {
        updated: "30 minutes ago",
        created: "2025-01-14 16:30:00",
      },
    },
    {
      id: 12,
      user: {
        name: "Sarah Williams",
        email: "sarah.williams@email.com",
        entryNumber: "19359145948500266",
      },
      tags: "Flagged",
      form: "Hair questionnaire",
      status: "Pending",
      consultant: "",
      completionState: { label: "", percentage: 60 },
      province: "British Columbia",
      date: {
        updated: "4 hours ago",
        created: "2025-01-13 14:20:00",
      },
    },
    {
      id: 13,
      user: {
        name: "Michael Brown",
        email: "michael.brown@email.com",
        entryNumber: "19359145948500267",
      },
      tags: "Needs Immediate Attention",
      form: "Mental Health questionnaire",
      status: "Pending",
      consultant: "Dr. Robert Wilson",
      completionState: { label: "✓ Consent Granted", percentage: 95 },
      province: "Alberta",
      date: {
        updated: "6 hours ago",
        created: "2025-01-12 09:45:00",
      },
    },
    {
      id: 14,
      user: {
        name: "Emma Davis",
        email: "emma.davis@email.com",
        entryNumber: "19359145948500268",
      },
      tags: "Pending Consent",
      form: "Mental Health questionnaire",
      status: "Pending",
      consultant: "",
      completionState: { label: "", percentage: 30 },
      province: "Quebec",
      date: {
        updated: "1 day ago",
        created: "2025-01-11 11:15:00",
      },
    },
    {
      id: 15,
      user: {
        name: "David Miller",
        email: "david.miller@email.com",
        entryNumber: "19359145948500269",
      },
      tags: "Possible Dose Change",
      form: "Weight Loss Questionnaire",
      status: "Pending",
      consultant: "Dr. Jennifer Lee",
      completionState: { label: "✓ Consent Granted", percentage: 100 },
      province: "Nova Scotia",
      date: {
        updated: "2 days ago",
        created: "2025-01-10 13:30:00",
      },
    },
    {
      id: 16,
      user: {
        name: "Lisa Garcia",
        email: "lisa.garcia@email.com",
        entryNumber: "19359145948500270",
      },
      tags: "Special Delivery Instructions",
      form: "Weight Loss Questionnaire",
      status: "Pending",
      consultant: "Dr. Jennifer Lee",
      completionState: { label: "✓ Consent Granted", percentage: 100 },
      province: "New Brunswick",
      date: {
        updated: "3 days ago",
        created: "2025-01-09 16:45:00",
      },
    },
    {
      id: 17,
      user: {
        name: "James Wilson",
        email: "james.wilson@email.com",
        entryNumber: "19359145948500271",
      },
      tags: "Delayed",
      form: "Weight Loss Questionnaire",
      status: "Pending",
      consultant: "",
      completionState: { label: "", percentage: 80 },
      province: "Ontario",
      date: {
        updated: "1 week ago",
        created: "2025-01-08 10:20:00",
      },
    },
    {
      id: 18,
      user: {
        name: "Maria Rodriguez",
        email: "maria.rodriguez@email.com",
        entryNumber: "19359145948500272",
      },
      tags: "Missing or Incomplete Questionnaire",
      form: "Smoking Cessation questionnaire",
      status: "Pending",
      consultant: "Dr. Thomas Anderson",
      completionState: { label: "✓ Consent Granted", percentage: 70 },
      province: "British Columbia",
      date: {
        updated: "2 weeks ago",
        created: "2025-01-07 14:15:00",
      },
    },
    {
      id: 19,
      user: {
        name: "Robert Taylor",
        email: "robert.taylor@email.com",
        entryNumber: "19359145948500273",
      },
      tags: "Pending Consultation",
      form: "Smoking Cessation questionnaire",
      status: "Pending",
      consultant: "Dr. Thomas Anderson",
      completionState: { label: "FULL", percentage: 100 },
      province: "Alberta",
      date: {
        updated: "3 weeks ago",
        created: "2025-01-06 09:30:00",
      },
    },
    {
      id: 20,
      user: {
        name: "Jennifer Martinez",
        email: "jennifer.martinez@email.com",
        entryNumber: "19359145948500274",
      },
      tags: "Unverified, Missing ID",
      form: "Slow Mine questionnaire",
      status: "Pending",
      consultant: "",
      completionState: { label: "", percentage: 50 },
      province: "Quebec",
      date: {
        updated: "1 month ago",
        created: "2025-01-05 11:45:00",
      },
    },
    {
      id: 21,
      user: {
        name: "Kevin Thompson",
        email: "kevin.thompson@email.com",
        entryNumber: "19359145948500275",
      },
      tags: "Duplicate",
      form: "Slow Mine questionnaire",
      status: "Pending",
      consultant: "Dr. Amanda White",
      completionState: { label: "✓ Consent Granted", percentage: 100 },
      province: "Nova Scotia",
      date: {
        updated: "2 months ago",
        created: "2025-01-04 15:20:00",
      },
    },
  ];

  // Filter data based on filters, category, and search
  const filteredData = useMemo(() => {
    let filtered = data;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => {
        if (activeCategory === "ED") return item.form === "ED questionnaire";
        if (activeCategory === "Hair")
          return item.form === "Hair questionnaire";
        if (activeCategory === "Mental Health")
          return item.form === "Mental Health questionnaire";
        if (activeCategory === "Weight Loss")
          return item.form === "Weight Loss Questionnaire";
        if (activeCategory === "Weight Loss (Consented)")
          return (
            item.form === "Weight Loss Questionnaire" &&
            item.completionState.label === "✓ Consent Granted"
          );
        if (activeCategory === "Smoking Cessation")
          return item.form === "Smoking Cessation questionnaire";
        if (activeCategory === "Slow Mine")
          return item.form === "Slow Mine questionnaire";
        if (activeCategory === "Show Pending") return item.status === "Pending";
        return true;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.user.entryNumber.includes(query)
      );
    }

    // Filter by tag
    const tagFilter = filters.find((f) => f.id === "tag");
    if (tagFilter && tagFilter.value) {
      // Map filter values to actual tag labels in the data
      const tagValueToLabel = {
        "out-of-refills": "Out of refills",
        flagged: "Flagged",
        "unverified-missing-id": "Unverified, Missing ID",
        "needs-immediate-attention": "Needs Immediate Attention",
        delayed: "Delayed",
        "missing-or-incomplete-questionnaire":
          "Missing or Incomplete Questionnaire",
        "pending-consent": "Pending Consent",
        "possible-dose-change": "Possible Dose Change",
        "pending-consultation": "Pending Consultation",
        "pending-response-from-patient": "Pending Order from Patient",
        "special-delivery-instructions": "Special Delivery Instructions",
        duplicate: "Duplicate",
      };

      const selectedTagLabel = tagValueToLabel[tagFilter.value];
      if (selectedTagLabel) {
        filtered = filtered.filter((item) => item.tags === selectedTagLabel);
      }
    }

    // Filter by province
    const provinceFilter = filters.find((f) => f.id === "province");
    if (provinceFilter && provinceFilter.value) {
      filtered = filtered.filter(
        (item) =>
          item.province.toLowerCase().replace(/\s+/g, "-") ===
          provinceFilter.value
      );
    }

    // Filter by date ranges
    const createdFilter = filters.find((f) => f.id === "created");
    if (
      createdFilter &&
      (createdFilter.value?.start || createdFilter.value?.end)
    ) {
      filtered = filtered.filter((item) => {
        const createdDate = new Date(item.date.created);
        const startDate = createdFilter.value?.start;
        const endDate = createdFilter.value?.end;

        if (startDate && endDate) {
          return createdDate >= startDate && createdDate <= endDate;
        } else if (startDate) {
          return createdDate >= startDate;
        } else if (endDate) {
          return createdDate <= endDate;
        }
        return true;
      });
    }

    const updatedFilter = filters.find((f) => f.id === "updated");
    if (
      updatedFilter &&
      (updatedFilter.value?.start || updatedFilter.value?.end)
    ) {
      filtered = filtered.filter((item) => {
        // Parse the "updated" time (e.g., "4 minutes ago", "1 hour ago")
        const updatedText = item.date.updated;
        let updatedDate;

        if (updatedText.includes("minutes ago")) {
          const minutes = parseInt(updatedText.split(" ")[0]);
          updatedDate = new Date(Date.now() - minutes * 60 * 1000);
        } else if (
          updatedText.includes("hour ago") ||
          updatedText.includes("hours ago")
        ) {
          const hours = parseInt(updatedText.split(" ")[0]);
          updatedDate = new Date(Date.now() - hours * 60 * 60 * 1000);
        } else {
          // For other formats, use the created date as fallback
          updatedDate = new Date(item.date.created);
        }

        const startDate = updatedFilter.value?.start;
        const endDate = updatedFilter.value?.end;

        if (startDate && endDate) {
          return updatedDate >= startDate && updatedDate <= endDate;
        } else if (startDate) {
          return updatedDate >= startDate;
        } else if (endDate) {
          return updatedDate <= endDate;
        }
        return true;
      });
    }

    return filtered;
  }, [data, filters, activeCategory, searchQuery]);

  const columns = [
    {
      id: "user",
      header: "User",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium">{row.user.name}</div>
          <div className="text-sm text-secondary-500">{row.user.email}</div>
          <div className="text-xs text-secondary-400">
            Entry #{row.user.entryNumber}
          </div>
        </div>
      ),
    },
    {
      id: "tags",
      header: "Tags",
      sortable: false,
      cell: (row) => {
        const getTagStyle = (tag) => {
          switch (tag) {
            case "Out of refills":
              return "bg-blue-100 text-blue-800 border border-blue-200";
            case "Flagged":
              return "bg-red-100 text-red-800 border border-red-200";
            case "Needs Immediate Attention":
              return "bg-orange-100 text-orange-800 border border-orange-200";
            case "Delayed":
              return "bg-red-100 text-red-800 border border-red-200";
            case "Pending Consent":
              return "bg-yellow-100 text-yellow-800 border border-yellow-200";
            case "Possible Dose Change":
              return "bg-purple-100 text-purple-800 border border-purple-200";
            case "Missing or Incomplete Questionnaire":
              return "bg-gray-100 text-gray-800 border border-gray-200";
            case "Pending Consultation":
              return "bg-blue-100 text-blue-800 border border-blue-200";
            case "Pending Order from Patient":
              return "bg-indigo-100 text-indigo-800 border border-indigo-200";
            case "Special Delivery Instructions":
              return "bg-green-100 text-green-800 border border-green-200";
            case "Unverified, Missing ID":
              return "bg-yellow-100 text-yellow-800 border border-yellow-200";
            case "Duplicate":
              return "bg-gray-100 text-gray-800 border border-gray-200";
            default:
              return "bg-gray-100 text-gray-800 border border-gray-200";
          }
        };

        const getTagIcon = (tag) => {
          switch (tag) {
            case "Flagged":
            case "Needs Immediate Attention":
            case "Delayed":
              return "⚠️ ";
            case "Missing or Incomplete Questionnaire":
              return "❌ ";
            case "Pending Consent":
              return "⏳ ";
            case "Possible Dose Change":
              return "💊 ";
            case "Special Delivery Instructions":
              return "🚚 ";
            case "Duplicate":
              return "📋 ";
            case "Out of refills":
              return "❌ ";
            case "Unverified, Missing ID":
              return "🆔 ";
            default:
              return "";
          }
        };

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagStyle(
              row.tags
            )}`}
          >
            {getTagIcon(row.tags)}
            {row.tags}
          </span>
        );
      },
    },
    { id: "form", header: "Form", sortable: true },
    { id: "status", header: "Approval Status", sortable: true },
    {
      id: "consultant",
      header: "Consulter",
      sortable: false,
      cell: (row) => (
        <div className="text-sm">
          <div className="text-xs text-secondary-500">Consulted by</div>
          <div className="font-medium">{row.consultant}</div>
        </div>
      ),
    },
    {
      id: "completionState",
      header: "Completion State",
      sortable: true,
      cell: (row) => {
        const { label, percentage } = row.completionState;
        const hasConsultant = row.consultant && row.consultant.trim() !== "";

        // Case 1: "FULL" and "✓ Consent Granted" together (with consultant)
        if (
          percentage === 100 &&
          hasConsultant &&
          (label === "✓ Consent Granted" || label === "FULL")
        ) {
          return (
            <div className="space-y-1">
              <div className="text-green-600 font-semibold text-sm">FULL</div>
              <div className="text-green-600 font-semibold text-sm">
                ✓ Consent Granted
              </div>
            </div>
          );
        }

        // Case 2: "FULL" with consultant - just green text
        if (percentage === 100 && hasConsultant) {
          return (
            <div className="text-green-600 font-semibold text-sm">FULL</div>
          );
        }

        // Case 3: "FULL" without consultant - blue text
        if (percentage === 100 && !hasConsultant) {
          return (
            <div className="text-blue-600 font-semibold text-sm">FULL</div>
          );
        }

        // Case 4: Progress bar with "✓ Consent Granted" text below (with consultant)
        if (
          label === "✓ Consent Granted" &&
          percentage < 100 &&
          hasConsultant
        ) {
          return (
            <div className="w-full space-y-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-green-600 text-xs font-medium">
                ✓ Consent Granted
              </div>
            </div>
          );
        }

        // Case 5: Incomplete without consultant - orange progress bar
        if (percentage < 100 && !hasConsultant) {
          return (
            <div className="w-full space-y-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-orange-600 text-xs font-medium">
                Incomplete
              </div>
            </div>
          );
        }

        // Case 6: Regular progress bar with percentage (fallback)
        return (
          <div className="w-full space-y-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 font-medium">
              {percentage}%
            </div>
          </div>
        );
      },
    },
    { id: "province", header: "Province", sortable: true },
    {
      id: "date",
      header: "Date",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="text-sm">Updated: {row.date.updated}</div>
          <div className="text-xs text-secondary-500">
            Created: {row.date.created}
          </div>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredData}
      onSort={handleSort}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      className=""
      selectedRows={selectedRows}
      onSelectedRowsChange={handleSelect}
      pageSize={10}
      selectable={false}
    />
  );
};

export default QuestionnaireTable;
