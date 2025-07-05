
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const TrackOrders = () => {
  const [activeTab, setActiveTab] = useState('active');

  const orders = [
    {
      id: 'ORD001',
      type: 'Rice',
      date: 'Feb 20, 2024',
      status: 'delivered',
      quantity: 100,
      totalPrice: 1800,
      location: 'Dhaka',
      estimatedDelivery: 'Feb 22, 2024',
      trackingId: 'TRK001'
    },
    {
      id: 'ORD002',
      type: 'Egg',
      date: 'Mar 1, 2024',
      status: 'in-progress',
      quantity: 200,
      totalPrice: 1200,
      location: 'Rajshahi',
      estimatedDelivery: 'Mar 4, 2024',
      trackingId: 'TRK002'
    },
    {
      id: 'ORD003',
      type: 'Rice',
      date: 'Mar 2, 2024',
      status: 'shipped',
      quantity: 7200,
      totalPrice: 32400,
      location: 'Gazipur',
      estimatedDelivery: 'Mar 5, 2024',
      trackingId: 'TRK003'
    },
    {
      id: 'ORD004',
      type: 'Potato',
      date: 'Mar 2, 2024',
      status: 'delivered',
      quantity: 4200,
      totalPrice: 7560,
      location: 'Barishal',
      estimatedDelivery: 'Mar 4, 2024',
      trackingId: 'TRK004'
    },
    {
      id: 'ORD005',
      type: 'Potato',
      date: 'Mar 6, 2024',
      status: 'in-progress',
      quantity: 3200,
      totalPrice: 5760,
      location: 'Dhaka',
      estimatedDelivery: 'Mar 9, 2024',
      trackingId: 'TRK005'
    },
    {
      id: 'ORD006',
      type: 'Wheat',
      date: 'Mar 8, 2024',
      status: 'pending',
      quantity: 1500,
      totalPrice: 8250,
      location: 'Chittagong',
      estimatedDelivery: 'Mar 12, 2024',
      trackingId: 'TRK006'
    },
    {
      id: 'ORD007',
      type: 'Corn',
      date: 'Mar 10, 2024',
      status: 'shipped',
      quantity: 800,
      totalPrice: 2800,
      location: 'Sylhet',
      estimatedDelivery: 'Mar 13, 2024',
      trackingId: 'TRK007'
    },
    {
      id: 'ORD008',
      type: 'Tomato',
      date: 'Mar 12, 2024',
      status: 'processing',
      quantity: 500,
      totalPrice: 1250,
      location: 'Cumilla',
      estimatedDelivery: 'Mar 15, 2024',
      trackingId: 'TRK008'
    },
    {
      id: 'ORD009',
      type: 'Onion',
      date: 'Mar 14, 2024',
      status: 'in-progress',
      quantity: 1200,
      totalPrice: 3600,
      location: 'Rangpur',
      estimatedDelivery: 'Mar 17, 2024',
      trackingId: 'TRK009'
    },
    {
      id: 'ORD010',
      type: 'Garlic',
      date: 'Mar 15, 2024',
      status: 'pending',
      quantity: 300,
      totalPrice: 4500,
      location: 'Khulna',
      estimatedDelivery: 'Mar 18, 2024',
      trackingId: 'TRK010'
    }
  ];

  const transportCompanies = [
    { id: 'TR001', name: 'Azhar Publication', vehicle: 'Truck - 104', type: 'Truck', capacity: '5 tons' },
    { id: 'TR002', name: 'Bashiron Enterprise', vehicle: 'Pickup - 150', type: 'Pickup', capacity: '1.5 tons' },
    { id: 'TR003', name: 'Beautiful Publication', vehicle: 'Truck - 302', type: 'Truck', capacity: '8 tons' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'delivered': { color: 'bg-green-100 text-green-800', text: 'Delivered' },
      'in-progress': { color: 'bg-yellow-100 text-yellow-800', text: 'In Progress' },
      'shipped': { color: 'bg-blue-100 text-blue-800', text: 'Shipped' },
      'pending': { color: 'bg-gray-100 text-gray-800', text: 'Pending' },
      'processing': { color: 'bg-purple-100 text-purple-800', text: 'Processing' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const filteredOrders = activeTab === 'active' 
    ? orders.filter(order => ['in-progress', 'shipped', 'processing', 'pending'].includes(order.status))
    : orders;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Status</h1>
            <p className="text-gray-600">Track your orders in real-time to predict when they will arrive.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-lg font-semibold">My Orders Status</h2>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={activeTab === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('active')}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Order
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter Orders
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.totalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {order.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">List of Available Transports</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 p-6">
            {transportCompanies.map((company) => (
              <div key={company.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{company.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Vehicle:</strong> {company.vehicle}</p>
                  <p><strong>Type:</strong> {company.type}</p>
                  <p><strong>Capacity:</strong> {company.capacity}</p>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" size="sm">
                  Select Transport
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrders;
