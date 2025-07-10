
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import TrackingModal from "@/components/TrackingModal";
import FilterModal from "@/components/FilterModal";
import { MapPin, Edit, Truck, Plus, Filter } from "lucide-react";

interface OrderFilters {
  search: string;
  category: string;
  status: string;
  location: string;
}

interface OrderFormData {
  id: string;
  type: string;
  quantity: number;
  totalPrice: number;
  location: string;
  status: string;
  date: string;
  estimatedDelivery: string;
  trackingId: string;
}

const TrackOrders = () => {
  const [showTracking, setShowTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderFormData | null>(null);
  const [filters, setFilters] = useState<OrderFilters>({
    search: '',
    category: '',
    status: '',
    location: ''
  });

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
      status: 'on-the-way',
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
      status: 'waiting-for-transport',
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
      status: 'confirmation-pending',
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
      status: 'confirmation-pending',
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
      status: 'waiting-for-transport',
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
      status: 'confirmation-pending',
      quantity: 300,
      totalPrice: 4500,
      location: 'Khulna',
      estimatedDelivery: 'Mar 18, 2024',
      trackingId: 'TRK010'
    },
    {
      id: 'ORD011',
      type: 'Spinach',
      date: 'Mar 16, 2024',
      status: 'on-the-way',
      quantity: 150,
      totalPrice: 750,
      location: 'Mymensingh',
      estimatedDelivery: 'Mar 19, 2024',
      trackingId: 'TRK011'
    },
    {
      id: 'ORD012',
      type: 'Cabbage',
      date: 'Mar 17, 2024',
      status: 'shipped',
      quantity: 400,
      totalPrice: 1200,
      location: 'Jessore',
      estimatedDelivery: 'Mar 20, 2024',
      trackingId: 'TRK012'
    },
    {
      id: 'ORD013',
      type: 'Carrot',
      date: 'Mar 18, 2024',
      status: 'waiting-for-transport',
      quantity: 250,
      totalPrice: 875,
      location: 'Faridpur',
      estimatedDelivery: 'Mar 21, 2024',
      trackingId: 'TRK013'
    },
    {
      id: 'ORD014',
      type: 'Cucumber',
      date: 'Mar 19, 2024',
      status: 'delivered',
      quantity: 180,
      totalPrice: 540,
      location: 'Pabna',
      estimatedDelivery: 'Mar 22, 2024',
      trackingId: 'TRK014'
    },
    {
      id: 'ORD015',
      type: 'Brinjal',
      date: 'Mar 20, 2024',
      status: 'confirmation-pending',
      quantity: 320,
      totalPrice: 960,
      location: 'Narayanganj',
      estimatedDelivery: 'Mar 23, 2024',
      trackingId: 'TRK015'
    },
    {
      id: 'ORD016',
      type: 'Mango',
      date: 'Mar 21, 2024',
      status: 'on-the-way',
      quantity: 500,
      totalPrice: 2500,
      location: 'Rajshahi',
      estimatedDelivery: 'Mar 24, 2024',
      trackingId: 'TRK016'
    },
    {
      id: 'ORD017',
      type: 'Banana',
      date: 'Mar 22, 2024',
      status: 'shipped',
      quantity: 300,
      totalPrice: 900,
      location: 'Barisal',
      estimatedDelivery: 'Mar 25, 2024',
      trackingId: 'TRK017'
    },
    {
      id: 'ORD018',
      type: 'Jackfruit',
      date: 'Mar 23, 2024',
      status: 'waiting-for-transport',
      quantity: 150,
      totalPrice: 1500,
      location: 'Chittagong',
      estimatedDelivery: 'Mar 26, 2024',
      trackingId: 'TRK018'
    },
    {
      id: 'ORD019',
      type: 'Lemon',
      date: 'Mar 24, 2024',
      status: 'confirmation-pending',
      quantity: 100,
      totalPrice: 800,
      location: 'Sylhet',
      estimatedDelivery: 'Mar 27, 2024',
      trackingId: 'TRK019'
    },
    {
      id: 'ORD020',
      type: 'Papaya',
      date: 'Mar 25, 2024',
      status: 'delivered',
      quantity: 200,
      totalPrice: 1600,
      location: 'Khulna',
      estimatedDelivery: 'Mar 28, 2024',
      trackingId: 'TRK020'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'delivered': { color: 'bg-green-100 text-green-800', text: 'Delivered' },
      'on-the-way': { color: 'bg-blue-100 text-blue-800', text: 'On the way' },
      'shipped': { color: 'bg-purple-100 text-purple-800', text: 'Shipped' },
      'waiting-for-transport': { color: 'bg-yellow-100 text-yellow-800', text: 'Waiting for Transport' },
      'confirmation-pending': { color: 'bg-gray-100 text-gray-800', text: 'Confirmation Pending' }
    };
    
    const config = statusConfig[status] || statusConfig['confirmation-pending'];
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const handleTrack = (order) => {
    setSelectedOrder(order);
    setShowTracking(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowOrderForm(true);
  };

  const handleCreate = () => {
    setEditingOrder(null);
    setShowOrderForm(true);
  };

  const handleApplyFilter = (newFilters: OrderFilters) => {
    setFilters(newFilters);
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = (!filters.search || order.type.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.status || order.status === filters.status) &&
      (!filters.location || order.location.toLowerCase().includes(filters.location.toLowerCase()));
    return matchesFilter;
  });

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

        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" className="gap-2" onClick={() => setShowFilter(true)}>
            <Filter className="w-4 h-4" />
            Filter Orders
          </Button>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳{order.totalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      {order.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 gap-1"
                        onClick={() => handleTrack(order)}
                      >
                        <Truck className="w-3 h-3" />
                        Track
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TrackingModal 
        isOpen={showTracking}
        onClose={() => setShowTracking(false)}
        currentStatus={selectedOrder?.status}
        orderData={selectedOrder}
      />

      <FilterModal 
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilter={handleApplyFilter}
        filterType="Orders"
      />
    </div>
  );
};

export default TrackOrders;
