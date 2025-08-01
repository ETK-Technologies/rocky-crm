"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, Button, Input } from "@/components/ui";

const FormCard = ({
    title = "Form",
    description = "Enter information",
    placeholder = "Enter value...",
    buttonText = "Submit",
    buttonVariant = "default", // Use button variants from Button component
    inputType = "text",
    inputValue = "",
    onInputChange,
    onSubmit,
    className = "",
    showButton = true,
    buttonPosition = "end", // "start", "end", "center"
}) => {
    const [localValue, setLocalValue] = useState(inputValue);

    // Sync localValue with inputValue prop when it changes
    useEffect(() => {
        setLocalValue(inputValue);
    }, [inputValue]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setLocalValue(value);
        if (onInputChange) {
            onInputChange(value);
        }
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(localValue);
        }
    };

    const getButtonPositionClass = () => {
        switch (buttonPosition) {
            case "start":
                return "justify-start";
            case "center":
                return "justify-center";
            case "end":
            default:
                return "justify-end";
        }
    };

    return (
        <Card className={className}>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    {title}
                </h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-secondary-700">
                            {description}
                        </label>
                        <Input
                            type={inputType}
                            value={localValue}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            className="w-full"
                        />
                    </div>
                    {showButton && (
                        <div className={`flex ${getButtonPositionClass()}`}>
                            <Button
                                variant={buttonVariant}
                                onClick={handleSubmit}
                            >
                                {buttonText}
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export { FormCard }; 