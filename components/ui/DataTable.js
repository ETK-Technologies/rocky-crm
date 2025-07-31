"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "./index";
import { cn } from "@/lib/utils";

const DataTable = React.forwardRef(
  (
    {
      columns,
      data,
      onSort,
      sortColumn,
      sortDirection,
      className,
      pageSize = 10,
      selectable,
      selectedRows = [],
      onSelectedRowsChange,
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const handleSort = (columnId) => {
      if (onSort) {
        const isAsc = sortColumn === columnId && sortDirection === "asc";
        onSort(columnId, isAsc ? "desc" : "asc");
      }
    };

    const handleSelectAll = (e) => {
      if (onSelectedRowsChange) {
        onSelectedRowsChange(
          e.target.checked ? paginatedData.map((row) => row.id) : []
        );
      }
    };

    const handleSelectRow = (rowId) => {
      if (onSelectedRowsChange) {
        const newSelectedRows = selectedRows.includes(rowId)
          ? selectedRows.filter((id) => id !== rowId)
          : [...selectedRows, rowId];
        onSelectedRowsChange(newSelectedRows);
      }
    };

    const getSortIcon = (columnId) => {
      if (sortColumn !== columnId)
        return <ChevronsUpDown className="w-4 h-4 ml-1" />;
      return sortDirection === "asc" ? (
        <ChevronUp className="w-4 h-4 ml-1" />
      ) : (
        <ChevronDown className="w-4 h-4 ml-1" />
      );
    };

    // Pagination logic
    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = data.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="space-y-4">
        <div className="relative w-full overflow-auto rounded-lg border border-secondary-200 bg-white shadow-sm">
          <Table ref={ref} className={className} {...props}>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.id}
                    onClick={() => column.sortable && handleSort(column.id)}
                    className={cn(
                      column.sortable &&
                        "cursor-pointer hover:bg-primary-50/50",
                      column.className
                    )}
                  >
                    <div className="flex items-center">
                      {column.id === "select" && selectable ? (
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={
                            selectedRows.length === paginatedData.length &&
                            paginatedData.length > 0
                          }
                          onChange={handleSelectAll}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <>
                          {column.header}
                          {column.sortable && getSortIcon(column.id)}
                        </>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={
                    selectedRows.includes(row.id) ? "bg-primary-50" : ""
                  }
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} className={column.className}>
                      {column.id === "select" && selectable ? (
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : column.cell ? (
                        column.cell(row)
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-secondary-500"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data.length > 0 && (
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-secondary-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + pageSize, data.length)} of {data.length}{" "}
              entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current page
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-secondary-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DataTable.displayName = "DataTable";

export { DataTable };
