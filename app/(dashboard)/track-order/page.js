"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ArrowLeftRight, MessageCircle } from "lucide-react";
import "./track-order.css";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Mock tracking data for demonstration
  const mockTrackingData = {
    orderNumber: "9621765076228535",
    customerName: "Louie Barbieri",
    customerContact: "(416) 509-6305",
    deliveryAddress: "26 Somerville Avenue, Ontario, ON, CA - M6M 4W2",
    senderName: "Rocky Pharmacy",
    senderAddress: "MISSISSAUGA, ON",
    status: "Delivered",
    deliveryDate: "25th Jul 2025, Friday",
    lastUpdated: "24th Jul 2025, Thursday",
    trackingHistory: [
      {
        date: "25th Jul 2025",
        time: "At 10:42 AM",
        status: "Delivered",
        location: "at YORK, ON",
        isCompleted: true,
      },
      {
        date: "25th Jul 2025",
        time: "At 09:21 AM",
        status: "Item out for delivery",
        location: "at YORK, ON",
        isCompleted: true,
      },
      {
        date: "25th Jul 2025",
        time: "At 01:51 AM",
        status: "Item departed",
        location: "at MISSISSAUGA, ON",
        isCompleted: true,
      },
      {
        date: "24th Jul 2025",
        time: "At 06:52 PM",
        status: "Item processed",
        location: "",
        isCompleted: true,
      },
      {
        date: "24th Jul 2025",
        time: "At 04:23 PM",
        status: "Shipment picked up by Canada Post",
        location: "at MISSISSAUGA, ON",
        isCompleted: true,
      },
    ],
  };

  const handleSearch = async () => {
    if (!orderNumber.trim()) return;
    
    setLoading(true);
    setSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber === "9621765076228535") {
        setTrackingData(mockTrackingData);
      } else {
        setTrackingData(null);
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status) => {
    if (status.toLowerCase().includes("delivered")) {
      return <CheckCircle className="w-5 h-5 text-green-700" />;
    } else if (status.toLowerCase().includes("out for delivery")) {
      return <Truck className="w-5 h-5 text-primary-600" />;
    } else if (status.toLowerCase().includes("departed") || status.toLowerCase().includes("picked up")) {
      return <Package className="w-5 h-5 text-primary-700" />;
    } else {
      return <Clock className="w-5 h-5 text-primary-700" />;
    }
  };

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes("delivered")) {
      return "text-green-700 bg-green-50 border-green-200";
    } else if (status.toLowerCase().includes("out for delivery")) {
      return "text-primary-700 bg-primary-50 border-primary-200";
    } else if (status.toLowerCase().includes("departed") || status.toLowerCase().includes("picked up")) {
      return "text-secondary-700 bg-secondary-50 border-secondary-200";
    } else {
      return "text-primary-800 bg-primary-100 border-primary-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <PageHeader
          icon={Icons.TrackOrder}
          title="Track Your Order"
          description="Enter your tracking number or order ID to see the latest status"
        />
      </div>

      {/* Search Section */}
      <div className="max-w-4xl">
        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter tracking number or order ID"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="h-12 text-base pr-12 border-secondary-200 focus:border-primary-600 transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              </div>
              
              <Button
                onClick={handleSearch}
                disabled={loading || !orderNumber.trim()}
                className="h-12 px-8 text-base font-medium sm:w-auto w-full"
                variant="default"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Track Order</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      {searched && orderNumber.trim() && (
        <div className="space-y-6 animate-slide-up">
          {loading ? (
            <Card className="bg-white border-secondary-200">
              <CardContent className="text-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                  <h3 className="text-lg font-semibold text-secondary-900">Searching for your order...</h3>
                  <p className="text-secondary-600">Please wait while we look up your tracking information.</p>
                </div>
              </CardContent>
            </Card>
          ) : trackingData ? (
            <div className="space-y-6">
              {/* Order Overview */}
              <Card className="bg-white border-secondary-200">
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-secondary-700 text-sm uppercase tracking-wider">Customer Information</h3>
                      <div className="space-y-2">
                        <p className="font-medium text-lg text-secondary-900">{trackingData.customerName}</p>
                        <p className="text-secondary-600">{trackingData.customerContact}</p>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-secondary-400 mt-1 flex-shrink-0" />
                          <p className="text-secondary-600 text-sm">{trackingData.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tracking Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-secondary-700 text-sm uppercase tracking-wider">Tracking Details</h3>
                      <div className="space-y-2">
                        <p className="text-primary-600 font-mono text-lg">#{trackingData.orderNumber}</p>
                        <p className="text-secondary-600">From: {trackingData.senderName}</p>
                        <p className="text-secondary-600 text-sm">{trackingData.senderAddress}</p>
                      </div>
                    </div>

                    {/* Shipping Carrier */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-secondary-700 text-sm uppercase tracking-wider">Shipping Carrier</h3>
                      <div className="flex flex-col items-start space-y-2">
                        <img 
                          src="https://crm.myrocky.ca/img/canada-post.png" 
                          alt="Canada Post" 
                          className="h-12 w-auto"
                        />
                        <p className="text-secondary-600 text-sm">Canada Post</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-secondary-700 text-sm uppercase tracking-wider">Current Status</h3>
                      <div className="space-y-2">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(trackingData.status)}`}>
                          {getStatusIcon(trackingData.status)}
                          <span className="ml-2 font-semibold">{trackingData.status}</span>
                        </div>
                        {trackingData.status.toLowerCase().includes("delivered") && (
                          <div className="text-sm text-secondary-600">
                            <p>Delivered on {trackingData.deliveryDate}</p>
                            <p>Last updated: {trackingData.lastUpdated}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card className="bg-white border-secondary-200">
                <CardHeader>
                  <CardTitle className="text-secondary-700 text-sm uppercase tracking-wider">Tracking History</CardTitle>
                  <CardAction>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Package className="w-3 h-3" />
                        <span className="hidden sm:inline">Return Order</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <ArrowLeftRight className="w-3 h-3" />
                        <span className="hidden sm:inline">Exchange Item</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span className="hidden sm:inline">Contact Us</span>
                      </Button>
                    </div>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-secondary-200 animate-draw-line"></div>
                    
                    <div className="space-y-6">
                      {trackingData.trackingHistory.map((event, index) => (
                        <div key={index} className={`timeline-item relative flex items-start space-x-4`} style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                          {/* Timeline dot */}
                          <div className={`timeline-dot relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                            event.isCompleted 
                              ? event.status.toLowerCase().includes("delivered")
                                ? "bg-green-100 border-green-600 animate-pulse-dot" 
                                : "bg-primary-100 border-primary-600 animate-pulse-dot"
                              : "bg-secondary-100 border-secondary-300"
                          }`}>
                            {getStatusIcon(event.status)}
                          </div>
                          
                          {/* Event content */}
                          <div className="flex-1 min-w-0 pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-secondary-900 transition-colors duration-300">{event.status}</h4>
                                {event.location && (
                                  <p className="text-sm text-secondary-600 transition-colors duration-300">{event.location}</p>
                                )}
                              </div>
                              <div className="mt-2 sm:mt-0 sm:ml-4 text-right">
                                <p className="text-sm font-medium text-secondary-900 transition-colors duration-300">{event.date}</p>
                                <p className="text-sm text-secondary-600 transition-colors duration-300">{event.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          ) : (
            <Card className="bg-white border-secondary-200">
              <CardContent className="text-center space-y-4">
                <Package className="w-16 h-16 text-secondary-400 mx-auto" />
                <h3 className="text-xl font-semibold text-secondary-900">Order Not Found</h3>
                <p className="text-secondary-600">
                  We couldn't find an order with that tracking number. Please check the number and try again.
                </p>
                <p className="text-sm text-secondary-500">
                  Try using: <code className="bg-secondary-100 px-2 py-1 rounded text-secondary-800">9621765076228535</code> for demo
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}