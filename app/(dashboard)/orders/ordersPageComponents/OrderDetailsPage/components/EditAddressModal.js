import React, { useState } from "react";

const countries = ["Canada", "USA", "UK"];
const states = {
    Canada: ["Ontario", "Quebec", "British Columbia"],
    USA: ["California", "Texas", "New York"],
    UK: ["England", "Scotland", "Wales"],
};
const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer"];

function EditAddressModal({ type, order, onClose }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        company: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        country: countries[0],
        state: states[countries[0]][0],
        email: order.email || "",
        phone: order.phone || "",
        paymentMethod: paymentMethods[0],
        transactionId: "",
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F2F2F2ED] bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <button
                    className="absolute top-3 right-4 text-xl text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                >×</button>
                <h2 className="text-lg font-bold mb-4">
                    Edit {type === "billing" ? "Billing" : "Shipping"} Address
                </h2>
                <form className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            className="border rounded px-3 py-2"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                        />
                        <input
                            className="border rounded px-3 py-2"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        />
                    </div>
                    <input
                        className="border rounded px-3 py-2 w-full"
                        placeholder="Company"
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    />
                    <input
                        className="border rounded px-3 py-2 w-full"
                        placeholder="Address line 1"
                        value={form.address1}
                        onChange={e => setForm(f => ({ ...f, address1: e.target.value }))}
                    />
                    <input
                        className="border rounded px-3 py-2 w-full"
                        placeholder="Address line 2"
                        value={form.address2}
                        onChange={e => setForm(f => ({ ...f, address2: e.target.value }))}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            className="border rounded px-3 py-2"
                            placeholder="City"
                            value={form.city}
                            onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                        />
                        <input
                            className="border rounded px-3 py-2"
                            placeholder="Postcode / ZIP"
                            value={form.postcode}
                            onChange={e => setForm(f => ({ ...f, postcode: e.target.value }))}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            className="border rounded px-3 py-2"
                            value={form.country}
                            onChange={e => setForm(f => ({
                                ...f,
                                country: e.target.value,
                                state: states[e.target.value][0]
                            }))}
                        >
                            {countries.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <select
                            className="border rounded px-3 py-2"
                            value={form.state}
                            onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                        >
                            {states[form.country].map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <input
                        className="border rounded px-3 py-2 w-full"
                        placeholder="Email address"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    <input
                        className="border rounded px-3 py-2 w-full"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                    <select
                        className="border rounded px-3 py-2 w-full"
                        value={form.paymentMethod}
                        onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
                    >
                        {paymentMethods.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <input
                        className="border rounded px-3 py-2 w-full"
                        placeholder="Transaction ID"
                        value={form.transactionId}
                        onChange={e => setForm(f => ({ ...f, transactionId: e.target.value }))}
                    />
                </form>
                <div className="flex justify-end gap-2 mt-4">
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

export default EditAddressModal;