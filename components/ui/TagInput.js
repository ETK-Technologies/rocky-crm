"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TagInput = ({
    tags = [],
    onTagsChange,
    placeholder = "Add tags...",
    className = "",
    maxTags = 10,
    options = [], // Array of predefined options
    useDropdown = false, // Toggle between dropdown and manual input
}) => {
    const [inputValue, setInputValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAddTag = (value) => {
        if (value.trim() && !tags.includes(value.trim()) && tags.length < maxTags) {
            const newTags = [...tags, value.trim()];
            onTagsChange(newTags);
            setInputValue("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        onTagsChange(newTags);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag(inputValue);
        }
    };

    const handleDropdownSelect = (option) => {
        handleAddTag(option);
        setIsDropdownOpen(false);
    };

    // Only filter based on this component's own tags
    const availableOptions = options.filter(option => !tags.includes(option));

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex flex-wrap gap-2 p-2 border border-secondary-200 rounded-md bg-white min-h-[40px] focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-200 transition-all duration-200">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-secondary-900 text-sm rounded-md border border-primary-200"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-secondary-600 hover:text-secondary-900 transition-colors duration-200"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}

                {tags.length < maxTags && (
                    useDropdown ? (
                        <div className="relative flex-1 min-w-[120px]">
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between w-full px-3 py-1 text-sm text-secondary-700 bg-transparent border-none outline-none cursor-pointer hover:text-secondary-900 transition-colors duration-200"
                            >
                                <span className={availableOptions.length === 0 ? "text-secondary-400" : "text-secondary-700"}>
                                    {availableOptions.length === 0 ? "No more options" : placeholder}
                                </span>
                                <ChevronDown className="h-4 w-4 text-secondary-400" />
                            </button>

                            {isDropdownOpen && availableOptions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-secondary-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {availableOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleDropdownSelect(option)}
                                            className="w-full px-3 py-2 text-left text-sm text-secondary-700 hover:bg-primary-100 hover:text-secondary-900 focus:bg-primary-100 focus:text-secondary-900 focus:outline-none transition-colors duration-200"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => handleAddTag(inputValue)}
                            placeholder={tags.length === 0 ? placeholder : ""}
                            className="flex-1 min-w-[120px] outline-none text-sm text-secondary-900 placeholder-secondary-500 bg-transparent"
                        />
                    )
                )}
            </div>
        </div>
    );
};

export { TagInput }; 