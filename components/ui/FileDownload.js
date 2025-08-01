"use client";

import React from "react";
import { Download, FileText, FileSpreadsheet, Archive } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const FileDownload = ({
    fileName,
    fileType = "zip", // zip, excel, pdf
    fileSize,
    downloadUrl,
    onDownload,
    className = "",
}) => {
    const getFileIcon = () => {
        switch (fileType.toLowerCase()) {
            case "excel":
            case "xlsx":
            case "xls":
                return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
            case "pdf":
                return <FileText className="h-8 w-8 text-red-600" />;
            case "zip":
            case "rar":
                return <Archive className="h-8 w-8 text-purple-600" />;
            default:
                return <FileText className="h-8 w-8 text-gray-600" />;
        }
    };

    const handleDownload = () => {
        if (onDownload) {
            onDownload(fileName, downloadUrl);
        } else if (downloadUrl) {
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className={cn("flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white", className)}>
            <div className="flex-shrink-0">
                {getFileIcon()}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {fileName}
                </p>
                {fileSize && (
                    <p className="text-xs text-gray-500">
                        {fileSize}
                    </p>
                )}
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="flex-shrink-0 text-blue-600 hover:text-blue-800"
            >
                <Download className="h-4 w-4 mr-1" />
                Download
            </Button>
        </div>
    );
};

export { FileDownload }; 