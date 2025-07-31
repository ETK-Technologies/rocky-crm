import React, { useState } from "react";

const customers = [
    { id: 1, name: "David Luis", email: "sportin4life@hotmail.com" },
    { id: 2, name: "Larave Dev User", email: "laravel@w3mg.in" },
    // Add more customers as needed
];

function EditUserModal({ order, onClose }) {
    const [selectedCustomer, setSelectedCustomer] = useState(order.customerId || customers[0].id);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F2F2F2ED]  bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                <button
                    className="absolute top-3 right-4 text-xl text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                >×</button>
                <h2 className="text-lg font-bold mb-4">Edit User</h2>
                <label className="block mb-2 font-medium">Select Customer</label>
                <select
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-6"
                    value={selectedCustomer}
                    onChange={e => setSelectedCustomer(Number(e.target.value))}
                >
                    {customers.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name} ({c.email})
                        </option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={onClose}
                    >Cancel</button>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                            // handle submit logic here
                            onClose();
                        }}
                    >Submit</button>
                </div>
            </div>
        </div>
    );
}

export default EditUserModal;