import React, { useState } from "react";
import ExpandableSection from "./ExpandableSection";

const sections = [
    { key: "productsSummary", label: "Products Summary" },
    { key: "hardcopy", label: "Hardcopy" },
    { key: "scannedDocuments", label: "Scanned Documents" },
    { key: "orders", label: "Orders" },
];

function OrderDetailsExpandableSections({ order }) {
    const [expanded, setExpanded] = useState([]);

    const toggleSection = (key) => {
        setExpanded(expanded =>
            expanded.includes(key)
                ? expanded.filter(k => k !== key)
                : [...expanded, key]
        );
    };

    return (
        <div className="flex flex-col gap-4 w-full ">
            {sections.map(section => (
                <ExpandableSection
                    key={section.key}
                    label={section.label}
                    expanded={expanded.includes(section.key)}
                    onToggle={() => toggleSection(section.key)}
                >
                    {/* Example content, replace with actual data */}
                    <div className="text-gray-500 text-sm">No data available.</div>
                </ExpandableSection>
            ))}
        </div>
    );
}

export default OrderDetailsExpandableSections;