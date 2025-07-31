import OrderDetailsCard from "./components/OrderDetailsCard";
import OrderDetailsSidebar from "./components/OrderDetailsSidebar";
import OrderDetailsExpandableSections from "./components/OrderDetailsExpandableSections";

function OrderDetailsPage({ order }) {
    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
                {/* Main content: Card + Expandable Sections */}
                <div className="flex flex-col gap-6 w-full lg:w-2/3">
                    <OrderDetailsCard order={order} />
                    <OrderDetailsExpandableSections order={order} />
                </div>
                {/* Sidebar */}
                <div className="w-full lg:w-1/3">
                    <OrderDetailsSidebar order={order} />
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsPage;