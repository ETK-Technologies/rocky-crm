import React, { useState } from "react";
import ExpandableSection from "./ExpandableSection";

const sections = [
    { key: "prescription", label: "Prescription" },
    { key: "orderNotes", label: "Order Notes" },
    { key: "medicalNotes", label: "Medical Notes" },
    { key: "manageTags", label: "Manage Tags" },
    { key: "orderImage", label: "Order Image" },
];

function OrderDetailsSidebar({ order }) {
    const [expanded, setExpanded] = useState(sections.map(s => s.key));
    const toggleSection = (key) => {
        setExpanded(expanded =>
            expanded.includes(key)
                ? expanded.filter(k => k !== key)
                : [...expanded, key]
        );
    };

    return (
        <div className="flex flex-col gap-4 lg:w-1/3 min-w-[260px]">
            {sections.map(section => (
                <ExpandableSection
                    key={section.key}
                    label={section.label}
                    expanded={expanded.includes(section.key)}
                    onToggle={() => toggleSection(section.key)}
                >
                    {section.key === "prescription" && (
                        <div>
                            {order.prescription?.map((pres, idx) => (
                                <div key={idx} className="mb-1">{pres}</div>
                            ))}
                        </div>
                    )}
                    <div className="text-gray-500 text-sm">No data available.</div>
                </ExpandableSection>
            ))}
        </div>
    );
}

export default OrderDetailsSidebar;