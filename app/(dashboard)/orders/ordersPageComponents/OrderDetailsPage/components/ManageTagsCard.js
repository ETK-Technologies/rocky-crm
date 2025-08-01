import React, { useState } from "react";

const tagOptions = [
    "Out of refills",
    "Flagged",
    "Unverified, Missing ID",
    "Needs Immediate Attention",
    "Delayed",
    "Missing or Incomplete Questionnaire",
    "Pending Consent",
    "Possible Dose Change",
    "Pending Consultation",
    "Pending Response from Patient",
    "Special Delivery Instructions",
    "Duplicate"
];

function ManageTagsCard() {
    const [assignedTags, setAssignedTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    const handleAddTag = () => {
        if (selectedTag && !assignedTags.includes(selectedTag)) {
            setAssignedTags([...assignedTags, selectedTag]);
            setSelectedTag("");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <div className="font-semibold mb-2">Assigned Tags</div>
            {assignedTags.length === 0 ? (
                <div className="text-gray-500 mb-4">No tags assigned yet.</div>
            ) : (
                <div className="flex flex-wrap gap-2 mb-4">
                    {assignedTags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <hr className="mb-4" />
            <div className="font-semibold mb-2">Assign Tags <span className="text-gray-400 text-xs ml-1" title="Assign tags to this order">ⓘ</span></div>
            <select
                className="border rounded px-3 py-2 w-full mb-4"
                value={selectedTag}
                onChange={e => setSelectedTag(e.target.value)}
            >
                <option value="">Search & select tags...</option>
                {tagOptions.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddTag}
                disabled={!selectedTag}
            >
                Add Tags
            </button>
        </div>
    );
}

export default ManageTagsCard;