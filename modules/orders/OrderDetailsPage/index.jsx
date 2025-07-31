import React from "react";
import OrderDetailsCard from "./components/OrderDetailsCard";
import OrderDetailsSidebar from "./components/OrderDetailsSidebar";
import OrderDetailsExpandableSections from "./components/OrderDetailsExpandableSections";

function OrderDetailsPage({ order }) {
    return (
        <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Card and expandable sections */}
                <div className="flex flex-col w-full gap-6">
                    <OrderDetailsCard order={order} />
                    <OrderDetailsExpandableSections order={order} />
                </div>
                {/* Right: Sidebar */}
                <OrderDetailsSidebar order={order} />
            </div>
        </div>
    );
}

export default OrderDetailsPage;