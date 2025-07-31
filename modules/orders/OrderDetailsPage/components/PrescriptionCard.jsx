
function PrescriptionCard({ data }) {
    return (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 w-full">
            <div className="text-center font-bold text-lg mb-2">{data.patientName}</div>
            <div className="text-center text-sm mb-1">{data.patientAddress}</div>
            <div className="text-center text-sm mb-1">{data.patientUnit}</div>
            <div className="text-center text-sm mb-1">{data.patientPhone}</div>
            <div className="text-center text-sm mb-3">ID: {data.patientId}</div>
            <hr className="my-3" />
            <div className="flex justify-between mb-2">
                <div>
                    <span className="font-semibold">Name:</span> {data.doctorName}
                </div>
                <div>
                    <span className="font-semibold">Age:</span> {data.patientAge}
                </div>
            </div>
            <div className="flex justify-between mb-2">
                <div>
                    <span className="font-semibold">Address:</span> {data.doctorAddress}
                </div>
                <div>
                    <span className="font-semibold">Date:</span> {data.date}
                </div>
            </div>
            <div className="mt-3 mb-2">
                <div><span className="font-semibold">Medication1:</span> {data.medication}</div>
                <div><span className="font-semibold">Dosage1:</span> {data.dosage}</div>
                <div><span className="font-semibold">Quantity1:</span> {data.quantity}</div>
                <div><span className="font-semibold">Duration1:</span> {data.duration}</div>
                <div><span className="font-semibold">Refills1:</span> {data.refills}</div>
                <div><span className="font-semibold">Instructions1:</span> {data.instructions}</div>
            </div>
            <hr className="my-3" />
            <div className="mt-2 text-sm">
                <span className="font-semibold">Signature:</span> <span className="italic">{data.signature}</span>
            </div>
        </div>
    );
}

export default PrescriptionCard;