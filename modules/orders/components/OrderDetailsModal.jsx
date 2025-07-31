import React, { useEffect } from "react";

function OrderDetailsModal({ order, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    if (!order) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#F2F2F2ED]  bg-opacity-40"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <h3 className="text-xl font-bold mb-2">
                    Order #{order.id} <span className="text-base font-normal">{order.orderType}</span>
                </h3>
                <div className="mb-2">
                    <strong>Status:</strong> {order.status}
                </div>
                <div className="mb-2">
                    <strong>Created:</strong> {new Date(order.createdDate).toLocaleString()}
                </div>
                <div className="mb-2">
                    <strong>Updated:</strong> {new Date(order.updatedDate).toLocaleString()}
                </div>
                <div className="mb-2">
                    <strong>Province:</strong> {order.province}
                </div>
                <div className="mb-2">
                    <strong>Product:</strong> {order.product}
                </div>
                <div className="mb-2">
                    <strong>Shipping:</strong> {order.shipping}
                </div>
                <div className="mb-2">
                    <strong>Total:</strong> ${order.total}
                </div>
                <div className="mb-2">
                    <strong>Payment:</strong> {order.payment}
                </div>
                <div className="mb-2">
                    <strong>Items:</strong> {order.items.join(", ")}
                </div>
                <div className="mb-2">
                    <strong>Prescription:</strong> {order.prescription.join(", ")}
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsModal;