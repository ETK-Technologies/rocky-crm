import React, { useState } from "react";
import StatusStripe from "./StatusStripe";
import EditUserModal from "./EditUserModal";
import EditAddressModal from "./EditAddressModal";

const doctorOptions = ["Select doctor", "Dr. Smith", "Dr. John", "Dr. Lee"];
const statusOptions = ["Pending payment", "Medical Review", "Processing", "Shipped"];
const pharmacistOptions = ["Select pharmacist", "Pharm. Alice", "Pharm. Bob", "Pharm. Carol"];

function OrderDetailsCard({ order }) {
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [editBillingOpen, setEditBillingOpen] = useState(false);
    const [editShippingOpen, setEditShippingOpen] = useState(false);
    const [counselled, setCounselled] = useState("");
    const [doctor, setDoctor] = useState(doctorOptions[0]);
    const [status, setStatus] = useState(order.status || statusOptions[0]);
    const [pharmacist, setPharmacist] = useState(pharmacistOptions[0]);

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-8 w-full">
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <span className="text-2xl font-bold">Order #{order.id}</span>
                {/* <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm font-semibold">{order.orderType}</span> */}
                <span className={`px-3 py-1 rounded text-sm font-semibold ${order.status === "Pending payment" ? "bg-blue-100 text-blue-800"
                    : order.status === "Medical Review" ? "bg-orange-100 text-orange-800"
                        : order.status === "Processing" ? "bg-gray-100 text-gray-800"
                            : "bg-green-100 text-green-800"
                    }`}>{order.status}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <div className="font-semibold mb-1 flex items-center gap-2">
                        User
                        <button
                            className="text-gray-400 hover:text-blue-600 cursor-pointer"
                            onClick={() => setEditUserOpen(true)}
                            title="Edit User"
                        >
                            <span className="material-icons">edit</span>
                        </button>
                    </div>
                    <div>{order.name}</div>

                </div>
                <div>
                    <div className="font-semibold mb-1 flex items-center gap-2">
                        Billing address
                        <button
                            className="text-gray-400 hover:text-blue-600 cursor-pointer"
                            onClick={() => setEditBillingOpen(true)}
                            title="Edit Billing Address"
                        >
                            <span className="material-icons">edit</span>
                        </button>
                    </div>
                    <div>{order.billingAddress || "CA"}</div>
                    <div className="mt-2 font-semibold">Email:</div>
                    <div className="text-gray-500">{order.email || "—"}</div>
                    <div className="mt-4 font-semibold flex items-center gap-2">
                        Shipping address
                        <button
                            className="text-gray-400 hover:text-blue-600 cursor-pointer"
                            onClick={() => setEditShippingOpen(true)}
                            title="Edit Shipping Address"
                        >
                            <span className="material-icons">edit</span>
                        </button>
                    </div>
                    <div>{order.shippingAddress || "CA"}</div>
                </div>
            </div>
            <div className="mb-6">
                <div className="font-semibold mb-2">Counselled</div>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="counselled"
                            value="yes"
                            checked={counselled === "yes"}
                            onChange={() => setCounselled("yes")}
                        /> Yes
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="counselled"
                            value="no"
                            checked={counselled === "no"}
                            onChange={() => setCounselled("no")}
                        /> No
                    </label>
                </div>
            </div>
            <div className="mb-6">
                <div className="font-semibold mb-2">Doctor</div>
                <select
                    className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
                    value={doctor}
                    onChange={e => setDoctor(e.target.value)}
                >
                    {doctorOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
            {counselled === "yes" && (
                <div className="mb-6">
                    <div className="font-semibold mb-2">Pharmacist</div>
                    <select
                        className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
                        value={pharmacist}
                        onChange={e => setPharmacist(e.target.value)}
                    >
                        {pharmacistOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className="mb-6">
                <div className="font-semibold mb-2">Status</div>
                <select
                    className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
            <StatusStripe status={status} updatedDate={order.updatedDate} />

            {/* Modals */}
            {editUserOpen && (
                <EditUserModal
                    order={order}
                    onClose={() => setEditUserOpen(false)}
                />
            )}
            {editBillingOpen && (
                <EditAddressModal
                    type="billing"
                    order={order}
                    onClose={() => setEditBillingOpen(false)}
                />
            )}
            {editShippingOpen && (
                <EditAddressModal
                    type="shipping"
                    order={order}
                    onClose={() => setEditShippingOpen(false)}
                />
            )}
        </div>
    );
}

export default OrderDetailsCard;