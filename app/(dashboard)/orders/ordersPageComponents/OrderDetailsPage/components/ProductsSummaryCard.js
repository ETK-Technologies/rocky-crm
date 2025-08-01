import React, { useState } from "react";

const products = [
    {
        id: 1,
        name: "Ozempic®",
        qty: 1,
        price: 300,
        subscriptionType: "Monthly",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Ozempic_pen.jpg",
    },
    {
        id: 2,
        name: "Follow-Up Consultation",
        qty: 1,
        price: 40,
        subscriptionType: "",
        image: "",
    },
];

function ProductsSummaryCard() {
    const [hardcopy, setHardcopy] = useState(true);
    const [brand, setBrand] = useState("");
    const [din, setDin] = useState("");
    const [dosage, setDosage] = useState("");
    const [amountDispensed, setAmountDispensed] = useState("");
    const [refills, setRefills] = useState("");
    const [refillsLeft, setRefillsLeft] = useState("");
    const [amountAuthorized, setAmountAuthorized] = useState("");
    const [daysSupply, setDaysSupply] = useState("");
    const [rxNumber, setRxNumber] = useState("1042143");
    const [drugDirection, setDrugDirection] = useState("");

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Products Summary</h2>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
                        <tr>
                            <th className="px-4 py-3">Product Name</th>
                            <th className="px-4 py-3">Frequency</th>
                            <th className="px-4 py-3">Qty</th>
                            <th className="px-4 py-3">Subscription</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod.id} className="hover:bg-gray-50 border-b last:border-none">
                                <td className="px-4 py-3 flex items-center gap-3">
                                    {prod.image && (
                                        <img
                                            src={prod.image}
                                            alt={prod.name}
                                            className="w-10 h-10 object-contain rounded border"
                                        />
                                    )}
                                    <span>{prod.name}</span>
                                </td>
                                <td className="px-4 py-3"></td>
                                <td className="px-4 py-3">{prod.qty}</td>
                                <td className="px-4 py-3">{prod.subscriptionType}</td>
                                <td className="px-4 py-3 font-medium text-gray-700">${prod.price}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800" title="Edit">
                                        <span className="material-icons text-base">edit</span>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" title="Delete">
                                        <span className="material-icons text-base">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Ozempic Details */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-sm">
                        <span>Hardcopy:</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={hardcopy}
                                onChange={() => setHardcopy(!hardcopy)}
                                className="form-checkbox text-blue-600"
                            />
                            <span>{hardcopy ? "On" : "Off"}</span>
                        </label>
                    </div>
                    <div className="text-sm">
                        <label className="font-medium mr-2">Auto-populate:</label>
                        <select className="border px-3 py-1 rounded text-sm">
                            <option>Brand | Drug | Dose | Din</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <Input label="Brand" value={brand} setValue={setBrand} />
                    <Input label="Dosage" value={dosage} setValue={setDosage} />
                    <Input label="DIN" value={din} setValue={setDin} />
                    <Input label="Amount Dispensed" value={amountDispensed} setValue={setAmountDispensed} />
                    <Input label="Refills" value={refills} setValue={setRefills} />
                    <Input label="Refills Left" value={refillsLeft} setValue={setRefillsLeft} />
                    <Input label="Amount Authorized" value={amountAuthorized} setValue={setAmountAuthorized} />
                    <Input label="Days Supply" value={daysSupply} setValue={setDaysSupply} />
                    <Input label="Drug Direction" value={drugDirection} setValue={setDrugDirection} />
                    <Input label="RX Number" value={rxNumber} setValue={setRxNumber} readOnly />
                </div>

                <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 text-sm">
                    Calculate Refills
                </button>
            </div>

            {/* Follow-Up Consultation */}
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4 text-sm shadow-sm">
                <div className="font-medium">Follow-Up Consultation</div>
                <div className="ml-auto flex items-center gap-3">
                    <label className="flex items-center gap-2">
                        <span>Hardcopy:</span>
                        <input type="checkbox" className="form-checkbox" />
                    </label>
                    <span>1</span>
                    <span>$40</span>
                    <button className="text-blue-600 hover:text-blue-800" title="Edit">
                        <span className="material-icons text-base">edit</span>
                    </button>
                    <button className="text-red-500 hover:text-red-700" title="Delete">
                        <span className="material-icons text-base">delete</span>
                    </button>
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border rounded-lg p-5 shadow-sm text-sm space-y-2">
                <div className="font-semibold text-gray-800">Free shipping</div>
                <div className="text-gray-600">Items: Ozempic® × 1, Follow-Up Consultation × 1</div>
                <div className="flex gap-4 justify-between text-gray-700">
                    <div>Subtotal: <span className="ml-2 font-medium">$340</span></div>
                    <div>Shipping: <span className="ml-2">$0</span></div>
                    <div>Tax: <span className="ml-2">$0</span></div>
                    <div className="font-semibold text-lg">Order Total: <span className="ml-2">$340</span></div>
                </div>
                <div className="flex gap-2 justify-end pt-3">
                    <ActionButton label="Add product(s)" />
                    <ActionButton label="Add fee" />
                    <ActionButton label="Add tax" />
                </div>
            </div>
        </div>
    );
}

const Input = ({ label, value, setValue, readOnly = false }) => (
    <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">{label}:</label>
        <input
            type="text"
            className="border rounded px-3 py-2 w-full text-sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={readOnly}
        />
    </div>
);

const ActionButton = ({ label }) => (
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
        {label}
    </button>
);

export default ProductsSummaryCard;
