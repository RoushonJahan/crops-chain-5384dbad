
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import OrderSuccessModal from "@/components/OrderSuccessModal";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const products = [
    {
      id: 'P001',
      name: 'Rice',
      price: 45,
      quantity: 500,
      shopName: 'Farm House',
      location: 'Rajshahi',
      status: 'available',
      description: 'Premium quality basmati rice directly from organic farms',
      farmDetails: 'Grown using traditional methods without harmful pesticides',
      harvestDate: '2024-01-15'
    },
    {
      id: 'P002',
      name: 'Wheat',
      price: 55,
      quantity: 300,
      shopName: 'AgroAgency Ltd. Co.',
      location: 'Dhaka',
      status: 'available',
      description: 'High-quality wheat grains perfect for flour production',
      farmDetails: 'Harvested from certified organic farms',
      harvestDate: '2024-01-20'
    },
    {
      id: 'P003',
      name: 'Corn',
      price: 35,
      quantity: 87,
      shopName: 'Northern Agro',
      location: 'Gazipur',
      status: 'stock-out',
      description: 'Sweet corn variety suitable for both consumption and processing',
      farmDetails: 'Non-GMO corn grown in fertile soil',
      harvestDate: '2024-01-10'
    },
    {
      id: 'P004',
      name: 'Tomato',
      price: 25,
      quantity: 200,
      shopName: 'Green Valley',
      location: 'Cumilla',
      status: 'available',
      description: 'Fresh tomatoes picked at peak ripeness',
      farmDetails: 'Greenhouse grown with controlled environment',
      harvestDate: '2024-02-01'
    },
    {
      id: 'P005',
      name: 'Potato',
      price: 18,
      quantity: 450,
      shopName: 'Rural Farmers',
      location: 'Bogura',
      status: 'available',
      description: 'Premium potatoes suitable for cooking and processing',
      farmDetails: 'Grown in clay-rich soil for better texture',
      harvestDate: '2024-01-25'
    }
  ];

  const getStatusBadge = (status, quantity) => {
    if (status === 'stock-out' || quantity < 100) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Stock Out</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
  };

  const handleOrderNow = (product) => {
    setSelectedProduct(product);
  };

  const handleOrderConfirm = () => {
    setSelectedProduct(null);
    setShowOrderSuccess(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Available Products</h1>
            <p className="text-gray-600">Get available products that you can buy directly from farms.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              placeholder="Search products, sellers, or locations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">List of Available Products</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹/kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {product.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status, product.quantity)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-sm"
                        onClick={() => handleOrderNow(product)}
                      >
                        Order Now
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProductDetailsModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirm={handleOrderConfirm}
      />

      <OrderSuccessModal 
        isOpen={showOrderSuccess}
        onClose={() => setShowOrderSuccess(false)}
      />
    </div>
  );
};

export default Products;
