"use client";
import FilterBar from './components/FilterBar'
import OrdersTable from './components/OrdersTable';
import Pagination from './components/Pagination'
import useOrderFilters from './hooks/useOrderFilters'
import ordersData from './data/ordersData';

const OrderPage = () => {
    const {
        filteredOrders,
        filters,
        setFilters,
        page,
        setPage,
        pageSize,
        setPageSize,
        total,
    } = useOrderFilters(ordersData)

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Orders</h2>
            <FilterBar filters={filters} setFilters={setFilters} />
            <OrdersTable orders={filteredOrders} />
            <div className="flex items-center justify-between mt-6">
                <div>
                    <label htmlFor="records-per-page" className="mr-2 font-medium">Records per page:</label>
                    <select
                        id="records-per-page"
                        className="border rounded px-2 py-1"
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 50, 100].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
                <div>
                    Showing {filteredOrders.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, total)} of {total} results
                </div>
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    setPage={setPage}
                />
            </div>
        </div>
    )
}

export default OrderPage