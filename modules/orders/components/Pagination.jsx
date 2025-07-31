import React from "react";

function Pagination({ page, pageSize, total, setPage }) {
    const totalPages = Math.ceil(total / pageSize);

    if (totalPages <= 1) return null;

    const handlePrev = () => setPage(page > 1 ? page - 1 : 1);
    const handleNext = () => setPage(page < totalPages ? page + 1 : totalPages);

    return (
        <div className="flex items-center gap-2">
            <button
                className="px-3 py-1 rounded border bg-white disabled:opacity-50 flex items-center justify-center"
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Previous Page"
            >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M13 16l-5-6 5-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <span className="mx-2 font-medium">
                Page {page} of {totalPages}
            </span>
            <button
                className="px-3 py-1 rounded border bg-white disabled:opacity-50 flex items-center justify-center"
                onClick={handleNext}
                disabled={page === totalPages}
                aria-label="Next Page"
            >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M7 4l5 6-5 6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}

export default Pagination;