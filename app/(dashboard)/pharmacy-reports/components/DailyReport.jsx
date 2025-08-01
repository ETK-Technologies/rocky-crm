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
  DocumentViewer,
  FormCard,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { format } from "date-fns";

const DailyReport = ({
  startDateTime,
  setStartDateTime,
  endDateTime,
  setEndDateTime,
  selectedHours,
  setSelectedHours,
  emailAddress,
  setEmailAddress,
  hoursOptions,
  onGenerateReport,
  onSendEmail,
}) => {
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [selectedTags, setSelectedTags] = useState(["Wegovy®"]); // Internal state for this component

  const handleGenerateReport = () => {
    onGenerateReport();
    setIsReportGenerated(true);
  };

  // Convert string dates to Date objects for Calendar
  const startDate = startDateTime ? new Date(startDateTime) : null;
  const endDate = endDateTime ? new Date(endDateTime) : null;

  const handleStartDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().slice(0, 16);
      setStartDateTime(dateString);
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().slice(0, 16);
      setEndDateTime(dateString);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Start Date & Time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              End Date & Time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
        </div>

        <div className="space-y-2">
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

        <div className="flex justify-start">
          <Button variant="save" size="lg" onClick={handleGenerateReport}>
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

      {/* PDF Viewer - Only show after generation */}
      {isReportGenerated && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Report
          </h3>
          <DocumentViewer
            documentUrl="/prescriptions.pdf"
            fileName="Daily Report"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default DailyReport;
