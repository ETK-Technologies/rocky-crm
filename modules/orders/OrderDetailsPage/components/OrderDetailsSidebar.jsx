import React, { useState } from "react";
import ExpandableSection from "./ExpandableSection";
import PrescriptionCard from "./PrescriptionCard";
import { dummyPrescription } from './../data/dummyPrescription';
import OrderNotesCard from "./OrderNotesCard";
import MedicalNotesCard from "./MedicalNotesCard";
import ManageTagsCard from "./ManageTagsCard";

const sections = [
    { key: "prescription", label: "Prescription" },
    { key: "orderNotes", label: "Order Notes" },
    { key: "medicalNotes", label: "Medical Notes" },
    { key: "manageTags", label: "Manage Tags" },
    { key: "orderImage", label: "Order Image" },
];

function OrderDetailsSidebar({ order }) {
    const [expanded, setExpanded] = useState([]);
    const toggleSection = (key) => {
        setExpanded(expanded =>
            expanded.includes(key)
                ? expanded.filter(k => k !== key)
                : [...expanded, key]
        );
    };

    return (
        <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[260px] ">
            {sections.map(section => (
                <ExpandableSection
                    key={section.key}
                    label={section.label}
                    expanded={expanded.includes(section.key)}
                    onToggle={() => toggleSection(section.key)}
                >
                    {section.key === "prescription" && (
                        <PrescriptionCard data={dummyPrescription} />
                    )}
                    {section.key === "orderNotes" && (
                        <OrderNotesCard />
                    )}
                    {section.key === "medicalNotes" && (
                        <MedicalNotesCard />
                    )}
                    {section.key === "manageTags" && (
                        <ManageTagsCard />
                    )}
                    {(section.key !== "prescription" && section.key !== "orderNotes" && section.key !== "medicalNotes" && section.key !== "manageTags") && (
                        <div className="text-gray-500 text-sm">No data available.</div>
                    )}
                </ExpandableSection>
            ))}
        </div>
    );
}

export default OrderDetailsSidebar;