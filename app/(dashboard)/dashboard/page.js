"use client";
import { Card } from "@/components/ui";
import { PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <PageHeader
          icon={Icons.Dashboard}
          title="Welcome to Rocky CRM!"
          description="Here's what's happening with your pharmacy today."
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Prescriptions */}
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-secondary-600">
                Total Prescriptions
              </p>
              <p className="text-2xl font-bold text-secondary-900 mt-2">
                1,250
              </p>
            </div>
            <span className="p-2 bg-primary-50 rounded-lg">
              <svg
                className="w-6 h-6 text-secondary-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </span>
          </div>
        </Card>

        {/* Active Orders */}
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-secondary-600">
                Active Orders
              </p>
              <p className="text-2xl font-bold text-secondary-900 mt-2">342</p>
            </div>
            <span className="p-2 bg-primary-50 rounded-lg">
              <svg
                className="w-6 h-6 text-secondary-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </span>
          </div>
        </Card>

        {/* Pending Refills */}
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-secondary-600">
                Pending Refills
              </p>
              <p className="text-2xl font-bold text-secondary-900 mt-2">89</p>
            </div>
            <span className="p-2 bg-primary-50 rounded-lg">
              <svg
                className="w-6 h-6 text-secondary-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </span>
          </div>
        </Card>

        {/* Fax Queue */}
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-secondary-600">
                Fax Queue
              </p>
              <p className="text-2xl font-bold text-secondary-900 mt-2">15</p>
            </div>
            <span className="p-2 bg-primary-50 rounded-lg">
              <svg
                className="w-6 h-6 text-secondary-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </span>
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {/* New Prescription */}
                <div className="flex items-start gap-4">
                  <span className="p-2 bg-primary-50 rounded-lg shrink-0">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      New prescription received: John Smith
                    </p>
                    <p className="text-sm text-secondary-500">2 minutes ago</p>
                  </div>
                </div>

                {/* Order Processed */}
                <div className="flex items-start gap-4">
                  <span className="p-2 bg-primary-50 rounded-lg shrink-0">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      Order processed: #12345
                    </p>
                    <p className="text-sm text-secondary-500">1 hour ago</p>
                  </div>
                </div>

                {/* Refill Request */}
                <div className="flex items-start gap-4">
                  <span className="p-2 bg-primary-50 rounded-lg shrink-0">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      Refill requested: Sarah Johnson
                    </p>
                    <p className="text-sm text-secondary-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/scanner"
                  className="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <span className="p-2 bg-primary-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-secondary-900">
                    Scan Document
                  </span>
                </Link>

                <Link
                  href="/orders/new"
                  className="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <span className="p-2 bg-primary-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-secondary-900">
                    Create Order
                  </span>
                </Link>

                <Link
                  href="/clinic-fax/new"
                  className="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <span className="p-2 bg-primary-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-secondary-900">
                    Send Fax
                  </span>
                </Link>

                <Link
                  href="/queue"
                  className="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <span className="p-2 bg-primary-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-secondary-900">
                    View Queue
                  </span>
                </Link>

                <Link
                  href="/reports"
                  className="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <span className="p-2 bg-primary-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-secondary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-secondary-900">
                    View Reports
                  </span>
                </Link>
              </div>
            </div>
          </Card>

          {/* System Status */}
          <Card className="mt-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600">API Status</span>
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600">Database</span>
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    Connected
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary-600">
                    Last Backup
                  </span>
                  <span className="text-sm text-secondary-600">
                    2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
