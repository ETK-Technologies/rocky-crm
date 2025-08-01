"use client";

import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  Input,
  Select,
  TagInput,
  FileDownload,
  FormCard,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { format } from "date-fns";

const PrescriptionReport = ({
  selectedHours,
  setSelectedHours,
  emailAddress,
  setEmailAddress,
  hoursOptions,
  onGenerateReport,
  onSendEmail,
  onDownloadFile,
}) => {
  const [startDate, setStartDate] = useState("2025-07-01");
  const [endDate, setEndDate] = useState("2025-08-01");
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]); // Internal state for this component

  const handleGenerateReport = () => {
    onGenerateReport();
    setIsReportGenerated(true);
  };

  // Convert string dates to Date objects for Calendar
  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;

  const handleStartDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setStartDate(dateString);
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setEndDate(dateString);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDateObj ? format(startDateObj, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDateObj}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDateObj ? format(endDateObj, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDateObj}
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Filters
            </label>
            <TagInput
              tags={selectedTags}
              onTagsChange={setSelectedTags}
              placeholder="Add filters..."
              className="w-full"
              useDropdown={true}
              options={[
                "Wegovy®",
                "Ozempic®",
                "Saxenda®",
                "Mounjaro®",
                "Rybelsus®",
                "Victoza®",
                "Trulicity®",
                "Bydureon®",
                "Byetta®",
                "Januvia®",
                "Jardiance®",
                "Invokana®",
                "Farxiga®",
                "Xigduo®",
                "Kombiglyze®",
                "Jentadueto®",
                "Kazano®",
                "Oseni®",
                "Nesina®",
                "Tradjenta®",
              ]}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Hours
            </label>
            <Select
              options={hoursOptions}
              value={selectedHours}
              onChange={setSelectedHours}
              placeholder="Select hours..."
              className="w-full"
            />
          </div>
          <Button variant="save" onClick={handleGenerateReport}>
            Generate
          </Button>
        </div>
      </div>

      {/* Send Report Mail - Only show after generation */}
      {isReportGenerated && (
        <FormCard
          className="p-0"
          title="Send Report Mail"
          description="Enter receiver's email address"
          placeholder="Enter email address..."
          buttonText="Send"
          buttonVariant="send"
          inputType="email"
          inputValue={emailAddress}
          onInputChange={setEmailAddress}
          onSubmit={onSendEmail}
        />
      )}

      {/* File Download - Only show after generation */}
      {isReportGenerated && (
        <FileDownload
          fileName="prescriptions_2025-07-01_04-00-00_2025_08_02.zip"
          fileType="zip"
          fileSize="2.5 MB"
          onDownload={onDownloadFile}
        />
      )}
    </div>
  );
};

export default PrescriptionReport;
