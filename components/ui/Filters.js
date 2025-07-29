"use client";

import * as React from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDown, ChevronUp, Search } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label,
}) {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-[130px] justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "MMM dd, yyyy") : "Start date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={onStartDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <span className="text-secondary-500 text-sm">to</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-[130px] justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "MMM dd, yyyy") : "End date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={onEndDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function FilterSelect({ options, value, onChange, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 w-full rounded-md border border-secondary-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function Filters({
  filters,
  onFilterChange,
  onReset,
  onApply,
  className,
  searchQuery,
  onSearchChange,
}) {
  const [localFilters, setLocalFilters] = React.useState(filters);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const hasActiveFilters = localFilters.some((filter) => {
    if (filter.type === "date-range") {
      return filter.value?.start || filter.value?.end;
    }
    return filter.value;
  });

  const handleLocalFilterChange = (filterId, value) => {
    setLocalFilters(
      localFilters.map((filter) =>
        filter.id === filterId ? { ...filter, value } : filter
      )
    );
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onApply?.();
  };

  const handleReset = () => {
    const resetFilters = localFilters.map((filter) => ({
      ...filter,
      value: filter.type === "date-range" ? { start: null, end: null } : "",
    }));
    setLocalFilters(resetFilters);
    onReset?.();
  };

  // Group filters by type
  const dateFilters = localFilters.filter((f) => f.type === "date-range");
  const selectFilters = localFilters.filter((f) => f.type === "select");

  return (
    <div className={cn("bg-secondary-50/50 p-4 rounded-lg", className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 text-sm font-medium text-secondary-700 hover:text-secondary-900"
        >
          Filters
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>

        <div className="flex items-center gap-4">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-500" />
            <Input
              type="search"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-9"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-secondary-500 hover:text-secondary-700"
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="flex flex-wrap items-end gap-4">
          {/* Date Range Filters */}
          {dateFilters.map((filter) => (
            <div key={filter.id} className="flex-1 min-w-[300px] space-y-1.5">
              <label className="text-xs font-medium text-secondary-700">
                {filter.label}
              </label>
              <DateRangePicker
                startDate={filter.value?.start}
                endDate={filter.value?.end}
                onStartDateChange={(date) =>
                  handleLocalFilterChange(filter.id, {
                    ...filter.value,
                    start: date,
                  })
                }
                onEndDateChange={(date) =>
                  handleLocalFilterChange(filter.id, {
                    ...filter.value,
                    end: date,
                  })
                }
                label={filter.placeholder}
              />
            </div>
          ))}

          {/* Select Filters */}
          {selectFilters.map((filter) => (
            <div key={filter.id} className="w-[200px] space-y-1.5">
              <label className="text-xs font-medium text-secondary-700">
                {filter.label}
              </label>
              <FilterSelect
                options={filter.options}
                value={filter.value}
                onChange={(value) => handleLocalFilterChange(filter.id, value)}
                placeholder={filter.placeholder}
              />
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
