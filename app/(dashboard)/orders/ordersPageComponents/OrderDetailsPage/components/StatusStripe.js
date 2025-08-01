
const statusSteps = [
    "Pending payment",
    "Medical Review",
    "Processing",
    "Shipped",
];

function StatusStripe({ status, updatedDate }) {
    const currentStep = statusSteps.findIndex(s => s === status);
    const progress = ((currentStep + 1) / statusSteps.length) * 100;

    return (
        <div className="mt-8">
            <div className="text-xs text-gray-500 mb-4">
                Last Updated on {new Date(updatedDate).toLocaleString()} by admin
            </div>
            <div className="flex justify-between mb-2">
                {statusSteps.map((step, idx) => (
                    <div key={step} className="flex flex-col items-center w-1/4">
                        <span className={`text-xs font-semibold ${idx === currentStep ? "text-indigo-700" : "text-gray-500"}`}>
                            {step.replace(" payment", "")}
                        </span>
                    </div>
                ))}
            </div>
            <div className="relative h-3 rounded bg-gray-300 overflow-hidden">
                <div
                    className="absolute left-0 top-0 h-full rounded bg-indigo-700 transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default StatusStripe;