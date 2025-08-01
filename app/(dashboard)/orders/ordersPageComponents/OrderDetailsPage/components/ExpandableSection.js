import React from "react";

function ExpandableSection({ label, expanded, onToggle, children }) {
    return (
        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-200 ">
            <button
                className="w-full flex justify-between items-center px-4 py-3 font-semibold text-gray-800 focus:outline-none cursor-pointer"
                onClick={onToggle}
            >
                {label}
                <span className="text-lg">{expanded ? "▲" : "▼"}</span>
            </button>
            {expanded && (
                <div className="px-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    );
}

export default ExpandableSection;