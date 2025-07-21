import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SellerDetailsModal from "@/components/SellerDetailsModal";
import ContactModal from "@/components/ContactModal";
import FilterModal from "@/components/FilterModal";
import SellerFormModal from "@/components/SellerFormModal";
import { Edit, Eye, Phone, Plus, Filter } from "lucide-react";
import { BASE_URL } from "../config";
interface FarmerFilters {
  search: string;
  category: string;
  status: string;
  location: string;
}

const Farmers = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);
  const [filters, setFilters] = useState<FarmerFilters>({
    search: "",
    category: "",
    status: "",
    location: "",
  });
  const userType = "farmer"

  const demoSellers = [
    {
      id: "S001",
      shopName: "Dhaka Electronics",
      ownerName: "Kazi Hassan",
      phone: "+8801712346881",
      transactionType: "bKash",
      location: "Dhaka",
      totalOrders: 156,
    },
    {
      id: "S002",
      shopName: "Chittagong Traders",
      ownerName: "Rafiqul Alam",
      phone: "+8801712346872",
      transactionType: "Nagad",
      location: "Chittagong",
      totalOrders: 89,
    },
  ];

  const [sellers, setSellers] = useState(demoSellers);

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/farmers`);
      if (response.data && response.data.length > 0) {
        setSellers(response.data);
      } else {
        setSellers(demoSellers);
      }
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
      setSellers(demoSellers);
    }
  };
  
  useEffect(() => {
    fetchSellers();
  }, []);

const refreshSellers = () => {
  // Your existing fetch function
  fetchSellers();
};

  const getTransactionBadge = (type) => {
    const colors = {
      bKash: "bg-pink-100 text-pink-800",
      Nagad: "bg-orange-100 text-orange-800",
      Rocket: "bg-purple-100 text-purple-800",
      Upay: "bg-blue-100 text-blue-800",
    };
    return (
      <Badge className={colors[type] || "bg-green-100 text-gray-800"}>
        {type}
      </Badge>
    );
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
    console.log("Saving seller:", sellerData);
  };

  const handleApplyFilter = (newFilters: FarmerFilters) => {
    setFilters(newFilters);
  };

  const filteredSellers = sellers.filter((seller) => {
    const matchesFilter =
      (!filters.search ||
        seller.shopName.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.location ||
        seller.location.toLowerCase().includes(filters.location.toLowerCase()));
    return matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              List of Farmers
            </h1>
            <p className="text-gray-600">
              Manage and view all registered farmers on the platform.
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
            Filter
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 gap-2"
            onClick={handleCreate}
          >
            <Plus className="w-4 h-4" />
            Add Farmer
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">List of Farmers</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shop ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSellers.map((seller) => (
                  <tr
                    key={seller.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {seller.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {seller.shopName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {seller.ownerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {seller.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTransactionBadge(seller.transactionType)}
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
                        className="bg-green-600 hover:bg-green-700 gap-1"
                        size="sm"
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
        onRefresh={refreshSellers} // Add this prop
        userType={userType}
        seller={editingSeller}
      />
    </div>
  );
};

export default Farmers;
