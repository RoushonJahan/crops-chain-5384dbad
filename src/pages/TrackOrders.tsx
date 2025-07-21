import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import TrackingModal from "@/components/TrackingModal";
import FilterModal from "@/components/FilterModal";
import { MapPin, Edit, Truck, Plus, Filter } from "lucide-react";
import { BASE_URL } from "../config";
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
  sellerShopId: string;
  buyerShopId: string;
  transportId: string;
  transationId: string;
}

const TrackOrders = () => {
  const [showTracking, setShowTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderFormData | null>(null);
  const [filters, setFilters] = useState<OrderFilters>({
    search: "",
    category: "",
    status: "",
    location: "",
  });

  const demoOrders: OrderFormData[] = [
    {
      id: "ORD021",
      type: "Rice",
      quantity: 150,
      totalPrice: 2700,
      location: "Dhaka",
      status: "delivered",
      date: "Mar 26, 2024",
      estimatedDelivery: "Mar 28, 2024",
      trackingId: "TRK021",
      sellerShopId: "S001",
      buyerShopId: "SHP00001",
      transportId: "TR001",
      transationId: "PAY101"
    },
    {
      id: "ORD022",
      type: "Egg",
      quantity: 300,
      totalPrice: 1800,
      location: "Chittagong",
      status: "on-the-way",
      date: "Mar 27, 2024",
      estimatedDelivery: "Mar 30, 2024",
      trackingId: "TRK022",
      sellerShopId: "S005",
      buyerShopId: "SHP00002",
      transportId: "TR002",
      transationId: "PAY202"
    },
    {
      id: "ORD023",
      type: "Potato",
      quantity: 2500,
      totalPrice: 4500,
      location: "Khulna",
      status: "shipped",
      date: "Mar 28, 2024",
      estimatedDelivery: "Mar 31, 2024",
      trackingId: "TRK023",
      sellerShopId: "S005",
      buyerShopId: "SHP00003",
      transportId: "TR003",
      transationId: "PAY303"
    },
    {
      id: "ORD024",
      type: "Tomato",
      quantity: 400,
      totalPrice: 1000,
      location: "Sylhet",
      status: "waiting-for-transport",
      date: "Mar 29, 2024",
      estimatedDelivery: "Apr 1, 2024",
      trackingId: "TRK024",
      sellerShopId: "S004",
      buyerShopId: "SHP00004",
      transportId: "TR004",
      transationId: "PAY404"
    },
    {
      id: "ORD025",
      type: "Onion",
      quantity: 800,
      totalPrice: 2400,
      location: "Rajshahi",
      status: "confirmation-pending",
      date: "Mar 30, 2024",
      estimatedDelivery: "Apr 2, 2024",
      trackingId: "TRK025",
      sellerShopId: "S003",
      buyerShopId: "SHP00005",
      transportId: "TR005",
      transationId: "PAY505"
    },
    {
      id: "ORD026",
      type: "Wheat",
      quantity: 2000,
      totalPrice: 11000,
      location: "Barisal",
      status: "delivered",
      date: "Mar 31, 2024",
      estimatedDelivery: "Apr 3, 2024",
      trackingId: "TRK026",
      sellerShopId: "S001",
      buyerShopId: "SHP00001",
      transportId: "TR006",
      transationId: "PAY606"
    },
    {
      id: "ORD027",
      type: "Corn",
      quantity: 1200,
      totalPrice: 4200,
      location: "Rangpur",
      status: "on-the-way",
      date: "Apr 1, 2024",
      estimatedDelivery: "Apr 4, 2024",
      trackingId: "TRK027",
      sellerShopId: "S003",
      buyerShopId: "SHP00002",
      transportId: "TR001",
      transationId: "PAY707"
    },
    {
      id: "ORD028",
      type: "Mango",
      quantity: 350,
      totalPrice: 1750,
      location: "Dhaka",
      status: "shipped",
      date: "Apr 2, 2024",
      estimatedDelivery: "Apr 5, 2024",
      trackingId: "TRK028",
      sellerShopId: "S004",
      buyerShopId: "SHP00003",
      transportId: "TR002",
      transationId: "PAY808"
    },
    {
      id: "ORD029",
      type: "Banana",
      quantity: 450,
      totalPrice: 1350,
      location: "Chittagong",
      status: "waiting-for-transport",
      date: "Apr 3, 2024",
      estimatedDelivery: "Apr 6, 2024",
      trackingId: "TRK029",
      sellerShopId: "S005",
      buyerShopId: "SHP00004",
      transportId: "TR003",
      transationId: "PAY909"
    },
    {
      id: "ORD030",
      type: "Gol Moich",
      quantity: 75,
      totalPrice: 9000,
      location: "Khulna",
      status: "confirmation-pending",
      date: "Apr 4, 2024",
      estimatedDelivery: "Apr 7, 2024",
      trackingId: "TRK030",
      sellerShopId: "S004",
      buyerShopId: "SHP00005",
      transportId: "TR004",
      transationId: "PAY010"
    }
  ];

  const [orders, setOrders] = useState<OrderFormData[]>(demoOrders);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders`);
        if (response.data && response.data.length > 0) {
          setOrders(response.data);
        } else {
          setOrders(demoOrders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders(demoOrders);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { color: "bg-green-100 text-green-800", text: "Delivered" },
      "on-the-way": { color: "bg-blue-100 text-blue-800", text: "On the way" },
      shipped: { color: "bg-purple-100 text-purple-800", text: "Shipped" },
      "waiting-for-transport": {
        color: "bg-yellow-100 text-yellow-800",
        text: "Waiting for Transport",
      },
      "confirmation-pending": {
        color: "bg-gray-100 text-gray-800",
        text: "Confirmation Pending",
      },
    };

    const config = statusConfig[status] || statusConfig["confirmation-pending"];
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

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      (!filters.search ||
        order.type.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.status || order.status === filters.status) &&
      (!filters.location ||
        order.location.toLowerCase().includes(filters.location.toLowerCase()));
    return matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Status</h1>
            <p className="text-gray-600">
              Track your orders in real-time to predict when they will arrive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="w-4 h-4" />
            Filter Orders
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h2 className="text-lg font-semibold">Orders Status</h2>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer Shop ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer Shop ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transport ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ৳{order.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     {order.buyerShopId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     {order.sellerShopId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     {order.transportId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     {order.transationId}
                    </td>
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
