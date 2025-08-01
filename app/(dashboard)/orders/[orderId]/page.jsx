"use client";
import ordersData from "../ordersPageComponents/data/ordersData";
import { useParams } from "next/navigation";
import OrderDetailsPage from "../ordersPageComponents/OrderDetailsPage";

export default function OrderDetails() {
    const { orderId } = useParams();
    const order = ordersData.find(o => o.id.toString() === orderId);

    if (!order) {
        return <div className="p-8">Order not found.</div>;
    }

    return (
        <OrderDetailsPage order={order} />
    );
}