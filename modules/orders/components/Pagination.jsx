import React from "react";

function Pagination({ page, pageSize, total, setPage }) {
    const totalPages = Math.ceil(total / pageSize);

    if (totalPages <= 1) return null;

    const handlePrev = () => setPage(page > 1 ? page - 1 : 1);
    const handleNext = () => setPage(page < totalPages ? page + 1 : totalPages);

    return (
        <div className="flex items-center gap-2">
            <button
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
                onClick={handlePrev}
                disabled={page === 1}
            >
                Prev
            </button>
            <span className="mx-2 font-medium">
                Page {page} of {totalPages}
            </span>
            <button
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;