import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SellerDetailsModal from "@/components/SellerDetailsModal";
import ContactModal from "@/components/ContactModal";

const Buyers = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  const sellers = [
    {
      id: 'SHP00001',
      shopName: 'Farm House',
      ownerName: 'Md. Rahman',
      phone: '+8801712345001',
      email: 'farmhouse@gmail.com',
      location: 'Rajshahi',
      transactionType: 'Nagad',
      transactionId: 'TXN12345',
      rating: 4.8,
      totalOrders: 156,
      joinDate: 'Jan 2023',
      products: ['Rice', 'Wheat', 'Corn']
    },
    {
      id: 'SHP00002',
      shopName: 'AgroAgency Ltd. Co.',
      ownerName: 'Fatima Khatun',
      phone: '+8801712345002',
      email: 'agroagency@gmail.com',
      location: 'Dhaka',
      transactionType: 'Bkash',
      transactionId: 'TXN12346',
      rating: 4.6,
      totalOrders: 234,
      joinDate: 'Mar 2022',
      products: ['Wheat', 'Barley', 'Oats']
    },
    {
      id: 'SHP00003',
      shopName: 'Northern Agro',
      ownerName: 'Abdul Karim',
      phone: '+8801712345003',
      email: 'northernagro@gmail.com',
      location: 'Gazipur',
      transactionType: 'Nagad',
      transactionId: 'TXN12347',
      rating: 4.9,
      totalOrders: 189,
      joinDate: 'Jul 2023',
      products: ['Corn', 'Soybean', 'Sunflower']
    },
    {
      id: 'SHP00004',
      shopName: 'Green Valley',
      ownerName: 'Nasir Ahmed',
      phone: '+8801712345004',
      email: 'greenvalley@gmail.com',
      location: 'Cumilla',
      transactionType: 'Bkash',
      transactionId: 'TXN12348',
      rating: 4.7,
      totalOrders: 298,
      joinDate: 'Nov 2021',
      products: ['Tomato', 'Pepper', 'Cucumber']
    },
    {
      id: 'SHP00005',
      shopName: 'Rural Farmers',
      ownerName: 'Rashida Begum',
      phone: '+8801712345005',
      email: 'ruralfarmers@gmail.com',
      location: 'Bogura',
      transactionType: 'Nagad',
      transactionId: 'TXN12349',
      rating: 4.5,
      totalOrders: 167,
      joinDate: 'Sep 2022',
      products: ['Potato', 'Onion', 'Garlic']
    }
  ];

  const handleViewSeller = (seller) => {
    setSelectedSeller(seller);
  };

  const handleContact = (seller) => {
    setContactInfo(seller);
    setSelectedSeller(null);
    setShowContact(true);
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        <span className="text-sm font-medium mr-1">{rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    );
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
            <h1 className="text-2xl font-bold text-gray-900">List of Verified Sellers</h1>
            <p className="text-gray-600">Manage and view all registered buyers and retailers on the platform.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">List of Verified Sellers</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seller.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.ownerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {seller.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getRatingStars(seller.rating)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={seller.transactionType === 'Nagad' ? 'bg-orange-100 text-orange-800' : 'bg-pink-100 text-pink-800'}>
                        {seller.transactionType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewSeller(seller)}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleContact(seller)}
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
        seller={selectedSeller}
        onClose={() => setSelectedSeller(null)}
        onContact={handleContact}
      />

      <ContactModal 
        isOpen={showContact}
        contactInfo={contactInfo}
        onClose={() => setShowContact(false)}
      />
    </div>
  );
};

export default Buyers;
