
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import FilterModal from "@/components/FilterModal";
import { MapPin, Filter } from "lucide-react";
import { BASE_URL } from '../config';

interface PurchaseFilters {
  search: string;
  category: string;
  status: string;
  location: string;
}

const PurchaseHistory = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<PurchaseFilters>({
    search: '',
    category: '',
    status: '',
    location: ''
  });

  const demoPurchases = [    {
    id: 'PUR001',
    sellerShopName: 'Farm House',
    sellerName: 'Md. Rahman',
    shopAddress: 'Rajshahi, Bangladesh',
    item: 'Rice',
    quantity: 100,
    totalPrice: 4500,
    buyerName: 'Abdul Karim',
    transportationName: 'Swift Logistics',
    destinationAddress: 'Dhaka, Bangladesh',
    transactionType: 'bKash',
    deliveryDate: '2024-02-20',
    deliveryTime: '3:00 PM'
  },
  {
    id: 'PUR002',
    sellerShopName: 'Green Valley',
    sellerName: 'Nasir Ahmed',
    shopAddress: 'Cumilla, Bangladesh',
    item: 'Tomato',
    quantity: 50,
    totalPrice: 1250,
    buyerName: 'Fatima Khatun',
    transportationName: 'Fast Express',
    destinationAddress: 'Chittagong, Bangladesh',
    transactionType: 'Nagad',
    deliveryDate: '2024-03-01',
    deliveryTime: '2:30 PM'
  },
];
  

  const [purchases, setPurchases] = useState(demoPurchases);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/purchase-history`); // Assuming /orders endpoint for purchases
        if (response.data && response.data.length > 0) {
          setPurchases(response.data);
        } else {
          setPurchases(demoPurchases);
        }
      } catch (error) {
        console.error('Failed to fetch purchases:', error);
        setPurchases(demoPurchases);
      }
    };
    fetchPurchases();
  }, []);

  const getTransactionBadge = (type) => {
    const colors = {
      'bKash': 'bg-pink-100 text-pink-800',
      'Nagad': 'bg-orange-100 text-orange-800',
      'Rocket': 'bg-purple-100 text-purple-800',
      'Upay': 'bg-blue-100 text-blue-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const handleApplyFilter = (newFilters: PurchaseFilters) => {
    setFilters(newFilters);
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesFilter = (!filters.search || 
      purchase.item.toLowerCase().includes(filters.search.toLowerCase()) ||
      purchase.sellerShopName.toLowerCase().includes(filters.search.toLowerCase()) ||
      purchase.buyerName.toLowerCase().includes(filters.search.toLowerCase())
    ) &&
    (!filters.location || purchase.destinationAddress.toLowerCase().includes(filters.location.toLowerCase()));
    return matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>
            <p className="text-gray-600">View all completed purchases and transaction details.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" className="gap-2" onClick={() => setShowFilter(true)}>
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Complete Purchase Records</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Shop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transport</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.sellerShopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.sellerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      {purchase.shopAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.item}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.quantity} kg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳{purchase.totalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getTransactionBadge(purchase.transactionType)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.buyerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.transportationName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      {purchase.destinationAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{purchase.deliveryDate}</div>
                      <div className="text-xs text-gray-500">{purchase.deliveryTime}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FilterModal 
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilter={handleApplyFilter}
        filterType="Purchases"
      />
    </div>
  );
};

export default PurchaseHistory;
