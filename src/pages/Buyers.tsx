
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SellerDetailsModal from "@/components/SellerDetailsModal";
import ContactModal from "@/components/ContactModal";
import FilterModal from "@/components/FilterModal";
import SellerFormModal from "@/components/SellerFormModal";
import { MapPin, Edit, Eye, Phone, Plus, Filter } from "lucide-react";
import { BASE_URL } from '../config';

interface BuyerFilters {
  search: string;
  category: string;
  status: string;
  location: string;
}

const Buyers = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);
  const [filters, setFilters] = useState<BuyerFilters>({
    search: '',
    category: '',
    status: '',
    location: ''
  });

  const demoSellers = [  {
    id: 'SHP00001',
    shopName: 'Farm House',
    ownerName: 'Md. Rahman',
    phone: '+8801712345001',
    location: 'Rajshahi',
    transactionType: 'Nagad',
    totalOrders: 156,
  },
  {
    id: 'SHP00002',
    shopName: 'AgroAgency Ltd. Co.',
    ownerName: 'Fatima Khatun',
    phone: '+8801712345002',
    location: 'Dhaka',
    transactionType: 'bKash',
    totalOrders: 234,
  }
];


  const [sellers, setSellers] = useState(demoSellers);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/buyers`);
        if (response.data && response.data.length > 0) {
          setSellers(response.data);
        } else {
          setSellers(demoSellers);
        }
      } catch (error) {
        console.error('Failed to fetch sellers:', error);
        setSellers(demoSellers);
      }
    };
    fetchSellers();
  }, []);

  const handleViewSeller = (seller) => {
    setSelectedSeller(seller);
  };

  const handleContact = (seller) => {
    setContactInfo(seller);
    setSelectedSeller(null);
    setShowContact(true);
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
    // Here you would typically save to your backend
  };

  const handleApplyFilter = (newFilters: BuyerFilters) => {
    setFilters(newFilters);
  };

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = (!filters.search || seller.shopName.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.location || seller.location.toLowerCase().includes(filters.location.toLowerCase()));
    return matchesSearch;
  });

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
            <p className="text-gray-600">Manage and view all buyers on the platform.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" className="gap-2" onClick={() => setShowFilter(true)}>
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleCreate}>
            <Plus className="w-4 h-4" />
            Add Buyer
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">List of Buyers</h2>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seller.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.ownerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      {seller.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(seller)}
                        className="gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewSeller(seller)}
                        className="gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 gap-1"
                        onClick={() => handleContact(seller)}
                      >
                        <Phone className="w-3 h-3" />
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

export default Buyers;
