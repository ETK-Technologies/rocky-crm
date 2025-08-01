import React from 'react';
import { DataTable } from '@/components/ui';
import { UserAvatar } from '@/components/ui';
import { Button } from '@/components/ui';
import { ChevronDown } from 'lucide-react';

const QuestionnaireTable = ({
    data,
    sortColumn,
    sortDirection,
    onSort,
    selectable = false,
    selectedRows = [],
    onSelectedRowsChange,
}) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'filled':
                return 'bg-green-100 text-green-800';
            case 'unfilled':
                return 'bg-orange-100 text-orange-800';
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
            id: "user",
            header: "User",
            sortable: true,
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <UserAvatar
                        user={{
                            name: row.user.name,
                            email: `Questionnaire #${row.user.questionnaireId}`,
                        }}
                        size="sm"
                    />
                    <div>
                        <div className="font-medium">Questionnaires #{row.user.questionnaireId}</div>
                        <div className="text-sm text-secondary-500">{row.user.name}</div>
                    </div>
                </div>
            ),
        },
        {
            id: "lastReminderDate",
            header: "Last Reminder Date",
            sortable: true,
            cell: (row) => (
                <div className="text-sm">
                    Reminder sent on {row.lastReminderDate}
                </div>
            ),
        },
        {
            id: "questionnaireFilledDate",
            header: "Questionnaire Filled Date",
            sortable: true,
            cell: (row) => (
                <div className="text-sm">{row.questionnaireFilledDate}</div>
            ),
        },
        {
            id: "status",
            header: "Status",
            sortable: true,
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                    {row.status}
                </span>
            ),
        },
        {
            id: "order",
            header: "Order",
            sortable: true,
            cell: (row) => (
                <div className="space-y-1">
                    <div className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800">
                        #{row.order.number}
                    </div>
                    <div className="text-sm text-secondary-500">{row.order.status}</div>
                </div>
            ),
        },
        {
            id: "province",
            header: "Province",
            sortable: true,
            cell: (row) => (
                <div className="text-sm">{row.province}</div>
            ),
        },
        {
            id: "date",
            header: "Date",
            sortable: true,
            cell: (row) => (
                <div className="space-y-1">
                    <div className="text-sm font-medium">{row.date.updated}</div>
                    <div className="text-xs text-secondary-500">Created at: {row.date.created}</div>
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

export default QuestionnaireTable; 