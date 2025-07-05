import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SellerDetailsModal from "@/components/SellerDetailsModal";
import ContactModal from "@/components/ContactModal";
import FilterModal from "@/components/FilterModal";
import SellerFormModal from "@/components/SellerFormModal";

const Farmers = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);
  const [filters, setFilters] = useState({});

  const sellers = [
    {
      id: 'S001',
      shopName: 'Dhaka Electronics',
      ownerName: 'Kazi Hassan',
      phone: '+8801712346881',
      email: 'dhakaelectronics@gmail.com',
      transactionType: 'Nagad',
      transactionId: 'TXN1601',
      location: 'Dhaka',
      products: ['Rice', 'Wheat', 'Electronics'],
      rating: 4.8,
      totalOrders: 156,
      joinDate: '2023-03-15'
    },
    {
      id: 'S002',
      shopName: 'Chittagong Traders',
      ownerName: 'Rafiqul Alam',
      phone: '+8801712346872',
      email: 'chittagongtrading@gmail.com',
      transactionType: 'bKash',
      transactionId: 'TXN1602',
      location: 'Chittagong',
      products: ['Vegetables', 'Fruits', 'Grains'],
      rating: 4.6,
      totalOrders: 89,
      joinDate: '2023-05-20'
    },
    {
      id: 'S003',
      shopName: 'Sylhet Supermart',
      ownerName: 'Mahfuz Ullah',
      phone: '+8801712346873',
      email: 'sylhetsupermart@gmail.com',
      transactionType: 'Nagad',
      transactionId: 'TXN1603',
      location: 'Sylhet',
      products: ['Tea', 'Spices', 'Organic Products'],
      rating: 4.9,
      totalOrders: 203,
      joinDate: '2023-01-10'
    },
    {
      id: 'S004',
      shopName: 'Rajshahi Hub',
      ownerName: 'Jamal Hossain',
      phone: '+8801712346874',
      email: 'rajshahihub@gmail.com',
      transactionType: 'bKash',
      transactionId: 'TXN1604',
      location: 'Rajshahi',
      products: ['Mango', 'Silk', 'Handicrafts'],
      rating: 4.7,
      totalOrders: 134,
      joinDate: '2023-04-08'
    },
    {
      id: 'S005',
      shopName: 'Khulna Wholesale',
      ownerName: 'Rafiqul Rahman',
      phone: '+8801712346875',
      email: 'khulnawholesale@gmail.com',
      transactionType: 'Nagad',
      transactionId: 'TXN1605',
      location: 'Khulna',
      products: ['Shrimp', 'Fish', 'Seafood'],
      rating: 4.5,
      totalOrders: 98,
      joinDate: '2023-06-12'
    }
  ];

  const getTransactionBadge = (type) => {
    const colors = {
      'Nagad': 'bg-orange-100 text-orange-800',
      'bKash': 'bg-pink-100 text-pink-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const handleViewSeller = (seller) => {
    setSelectedSeller(seller);
  };

  const handleContact = (seller) => {
    setContactInfo(seller);
    setShowContact(true);
    setSelectedSeller(null);
  };

  const handleEdit = (seller) => {
    setEditingSeller(seller);
    setShowSellerForm(true);
  };

  const handleCreate = () => {
    setEditingSeller(null);
    setShowSellerForm(true);
  };

  const handleSaveSeller = (sellerData) => {
    console.log('Saving seller:', sellerData);
  };

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredSellers = sellers.filter(seller => {
    const matchesFilter = (!filters.search || seller.shopName.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.location || seller.location.toLowerCase().includes(filters.location.toLowerCase()));
    return matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">List of Sellers</h1>
            <p className="text-gray-600">Manage and view all registered farmers and sellers on the platform.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" className="gap-2" onClick={() => setShowFilter(true)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleCreate}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Seller
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">List of Available Sellers</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seller.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.ownerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {seller.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getTransactionBadge(seller.transactionType)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.transactionId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {seller.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(seller)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewSeller(seller)}
                      >
                        View
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
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
        onClose={() => {
          setShowContact(false);
          setContactInfo(null);
        }}
      />

      <FilterModal 
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilter={handleApplyFilter}
        filterType="Sellers"
      />

      <SellerFormModal 
        isOpen={showSellerForm}
        onClose={() => setShowSellerForm(false)}
        onSave={handleSaveSeller}
        seller={editingSeller}
      />
    </div>
  );
};

export default Farmers;
