import React, { useState } from "react";
import ordersData from "../data/ordersData";

// Extract unique values for dropdowns
const provinces = [...new Set(ordersData.map(o => o.province))];
const orderTypes = [...new Set(ordersData.map(o => o.orderType))];
const products = [...new Set(ordersData.map(o => o.product))];
const categories = [...new Set(ordersData.map(o => o.category))];

function FilterBar({ filters, setFilters }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="mb-6 bg-white p-5 rounded-lg shadow border border-gray-200">
            {/* Collapse/Expand Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-sm text-gray-600 hover:underline focus:outline-none cursor-pointer"
                >
                    {collapsed ? "Expand Filters" : "Collapse Filters"}
                </button>
            </div>

            {!collapsed &&
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={filters.status}
                            onChange={e => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="All">All</option>
                            <option value="Pending payment">Pending payment</option>
                            <option value="Medical Review">Medical Review</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                        </select>
                    </div>

                    {/* Province */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Province</label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={filters.province}
                            onChange={e => setFilters({ ...filters, province: e.target.value })}
                        >
                            <option value="All">All</option>
                            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    {/* Order Type */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Order Type</label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={filters.orderType}
                            onChange={e => setFilters({ ...filters, orderType: e.target.value })}
                        >
                            <option value="All">All</option>
                            {orderTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    {/* Product */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Product</label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={filters.product}
                            onChange={e => setFilters({ ...filters, product: e.target.value })}
                        >
                            <option value="All">All</option>
                            {products.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
                        <select
                            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                            value={filters.category || "All"}
                            onChange={e => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="All">All</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Created Date */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Created Date</label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                className="border border-gray-300 rounded px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-[110px]"
                                value={filters.createdDateFrom}
                                onChange={e => setFilters({ ...filters, createdDateFrom: e.target.value })}
                            />
                            <span className="text-gray-400 mt-2">to</span>
                            <input
                                type="date"
                                className="border border-gray-300 rounded px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-[110px]"
                                value={filters.createdDateTo}
                                onChange={e => setFilters({ ...filters, createdDateTo: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Updated Date */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Updated Date</label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                className="border border-gray-300 rounded px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-[110px]"
                                value={filters.updatedDateFrom}
                                onChange={e => setFilters({ ...filters, updatedDateFrom: e.target.value })}
                            />
                            <span className="text-gray-400 mt-2">to</span>
                            <input
                                type="date"
                                className="border border-gray-300 rounded px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-[110px]"
                                value={filters.updatedDateTo}
                                onChange={e => setFilters({ ...filters, updatedDateTo: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col col-span-1 md:col-span-3 lg:col-span-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Search</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                            placeholder="Order ID or Name"
                            value={filters.search}
                            onChange={e => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default FilterBar;
