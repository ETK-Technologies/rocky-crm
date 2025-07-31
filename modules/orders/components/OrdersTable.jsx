import React, { useState } from "react";
import Link from "next/link";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/Table";
import OrderDetailsModal from "./OrderDetailsModal";

function OrdersTable({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <>
            <div className="bg-white rounded-xl shadow-md p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Tags/Categories</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Shipping</TableHead>
                            <TableHead>Order Type</TableHead>
                            <TableHead>Order Total</TableHead>
                            <TableHead>Order Items</TableHead>
                            <TableHead>Prescription</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-8">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <TableCell>
                                        <Link
                                            href={`/orders/${order.id}`}
                                            className="font-semibold text-blue-600 hover:underline"
                                        >
                                            #{order.id} {order.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="flex items-center">
                                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded mr-1 text-xs">
                                            {order.category}
                                        </span>
                                        <button
                                            className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                                            title="View details"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            ℹ️
                                        </button>
                                    </TableCell>
                                    <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${order.status === "Pending payment"
                                                ? "bg-blue-100 text-blue-800"
                                                : order.status === "Medical Review"
                                                    ? "bg-orange-100 text-orange-800"
                                                    : order.status === "Shipped"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{order.province}</TableCell>
                                    <TableCell>
                                        {order.orderType}
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibold">${order.total}</span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            Paid Via {order.payment}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {order.items.map((item, idx) => (
                                            <div key={idx}>{item}</div>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {order.prescription.map((pres, idx) => (
                                            <div key={idx}>{pres}</div>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </>
    );
}

export default OrdersTable;
