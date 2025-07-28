"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";

export default function Dashboard() {
  // Mock data for demo purposes
  const stats = {
    totalCustomers: 1250,
    totalLeads: 342,
    totalDeals: 89,
    revenue: 125000,
  };

  const statCards = [
    {
      title: "Total Customers",
      value: stats.totalCustomers?.toLocaleString() || "0",
      icon: "👥",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Leads",
      value: stats.totalLeads?.toLocaleString() || "0",
      icon: "🎯",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Deals in Progress",
      value: stats.totalDeals?.toLocaleString() || "0",
      icon: "💼",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats.revenue || 0).toLocaleString()}`,
      icon: "💰",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "lead",
      message: "New lead: John Smith from Acme Corp",
      time: "2 minutes ago",
      icon: "🔥",
    },
    {
      id: 2,
      type: "deal",
      message: "Deal closed: $15,000 with TechStart Inc",
      time: "1 hour ago",
      icon: "✅",
    },
    {
      id: 3,
      type: "customer",
      message: "New customer registration: Sarah Johnson",
      time: "3 hours ago",
      icon: "👤",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">
          Welcome to Rocky CRM! 👋
        </h1>
        <p className="text-secondary-600 mt-2">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} variant="default" hover>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-secondary-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-secondary-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-secondary-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-start">
                  <span className="mr-2">➕</span>
                  Add New Lead
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <span className="mr-2">👤</span>
                  Add Customer
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <span className="mr-2">💼</span>
                  Create Deal
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <span className="mr-2">📅</span>
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">API Status</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Database</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">
                    Last Backup
                  </span>
                  <span className="text-sm text-secondary-500">
                    2 hours ago
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
