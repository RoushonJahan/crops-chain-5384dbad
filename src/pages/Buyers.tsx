
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SellerDetailsModal from "@/components/SellerDetailsModal";
import ContactModal from "@/components/ContactModal";

const Buyers = () => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  const buyers = [
    {
      id: 'B001',
      shopName: 'Dhaka Bazar',
      ownerName: 'Hassan Ahmed',
      phone: '+8801712346871',
      email: 'dhakabaazar@gmail.com',
      transactionType: 'bKash',
      shopId: 'SHP00001',
      location: 'Dhaka',
      products: ['Rice', 'Vegetables', 'Fruits'],
      rating: 4.7,
      totalOrders: 142,
      joinDate: '2023-02-18'
    },
    {
      id: 'B002',
      shopName: 'Chittagong Mart',
      ownerName: 'Rafiqul Alam',
      phone: '+8801612346872',
      email: 'chittagongmart@gmail.com',
      transactionType: 'Nagad',
      shopId: 'SHP00002',
      location: 'Chittagong',
      products: ['Seafood', 'Spices', 'Dairy'],
      rating: 4.5,
      totalOrders: 98,
      joinDate: '2023-03-22'
    },
    {
      id: 'B003',
      shopName: 'Sylhet Store',
      ownerName: 'Mahbub Khan',
      phone: '+8801512346873',
      email: 'sylhetstore@gmail.com',
      transactionType: 'bKash',
      shopId: 'SHP00003',
      location: 'Sylhet',
      products: ['Tea', 'Organic Products', 'Honey'],
      rating: 4.8,
      totalOrders: 176,
      joinDate: '2023-01-12'
    },
    {
      id: 'B004',
      shopName: 'Rajshahi Hub',
      ownerName: 'Jamal Hossain',
      phone: '+8801712346874',
      email: 'rajshahihub@gmail.com',
      transactionType: 'Nagad',
      shopId: 'SHP00004',
      location: 'Rajshahi',
      products: ['Mango', 'Silk Products', 'Handicrafts'],
      rating: 4.6,
      totalOrders: 123,
      joinDate: '2023-04-05'
    },
    {
      id: 'B005',
      shopName: 'Khulna Wholesale',
      ownerName: 'Rafiqul Rahman',
      phone: '+8801612346875',
      email: 'khulnawholesale@gmail.com',
      transactionType: 'bKash',
      shopId: 'SHP00005',
      location: 'Khulna',
      products: ['Fish', 'Shrimp', 'Salt'],
      rating: 4.4,
      totalOrders: 87,
      joinDate: '2023-05-30'
    },
    {
      id: 'B006',
      shopName: 'Rangpur Goods',
      ownerName: 'Aminul Islam',
      phone: '+8801712346876',
      email: 'rangpurgoods@gmail.com',
      transactionType: 'Nagad',
      shopId: 'SHP00006',
      location: 'Rangpur',
      products: ['Tobacco', 'Jute', 'Potatoes'],
      rating: 4.3,
      totalOrders: 65,
      joinDate: '2023-06-15'
    },
    {
      id: 'B007',
      shopName: 'Barisal Supplies',
      ownerName: 'Mahbub Ullah',
      phone: '+8801712346877',
      email: 'barisalsupplies@gmail.com',
      transactionType: 'bKash',
      shopId: 'SHP00007',
      location: 'Barisal',
      products: ['Coconut', 'Betel Nut', 'Fish'],
      rating: 4.5,
      totalOrders: 112,
      joinDate: '2023-07-02'
    },
    {
      id: 'B008',
      shopName: 'Comilla Shop',
      ownerName: 'Sobuj Ahmed',
      phone: '+8801612346878',
      email: 'comillashop@gmail.com',
      transactionType: 'Nagad',
      shopId: 'SHP00008',
      location: 'Comilla',
      products: ['Cotton', 'Textiles', 'Garments'],
      rating: 4.6,
      totalOrders: 134,
      joinDate: '2023-08-10'
    }
  ];

  const getTransactionBadge = (type) => {
    const colors = {
      'Nagad': 'bg-orange-100 text-orange-800',
      'bKash': 'bg-pink-100 text-pink-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const handleViewBuyer = (buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleContact = (buyer) => {
    setContactInfo(buyer);
    setShowContact(true);
    setSelectedBuyer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">List of Buyers</h1>
            <p className="text-gray-600">Manage and view all registered buyers and retailers on the platform.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">List of Available Buyers</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{buyer.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{buyer.ownerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {buyer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getTransactionBadge(buyer.transactionType)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{buyer.shopId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {buyer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewBuyer(buyer)}
                      >
                        View
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                        onClick={() => handleContact(buyer)}
                      >
                        Contact
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SellerDetailsModal 
        seller={selectedBuyer}
        onClose={() => setSelectedBuyer(null)}
        onContact={handleContact}
      />

      <ContactModal 
        isOpen={showContact}
        contactInfo={contactInfo}
        onClose={() => {
          setShowContact(false);
          setContactInfo(null);
        }}
      />
    </div>
  );
};

export default Buyers;
