
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import TrackingModal from "@/components/TrackingModal";
import FilterModal from "@/components/FilterModal";
import ProductFormModal from "@/components/ProductFormModal";
import { MapPin, Edit, ShoppingCart, Plus, Filter } from "lucide-react";
import { BASE_URL } from '../config';

interface ProductFilters {
  search: string;
  category: string;
  status: string;
  location: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    status: '',
    location: ''
  });

  const demoProducts = [];
  const demoProductsReplica = [
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
    },
    {
      id: 'P006',
      name: 'Onion',
      price: 30,
      quantity: 320,
      shopName: 'Valley Fresh',
      location: 'Pabna',
      status: 'available',
      description: 'Fresh red onions with strong flavor',
      farmDetails: 'Organically grown without chemical fertilizers',
      harvestDate: '2024-02-05'
    },
    {
      id: 'P007',
      name: 'Garlic',
      price: 120,
      quantity: 150,
      shopName: 'Spice Garden',
      location: 'Jessore',
      status: 'available',
      description: 'Premium quality garlic bulbs',
      farmDetails: 'Naturally dried and cured',
      harvestDate: '2024-01-28'
    },
    {
      id: 'P008',
      name: 'Carrot',
      price: 40,
      quantity: 280,
      shopName: 'Vegetable Hub',
      location: 'Rangpur',
      status: 'available',
      description: 'Fresh carrots rich in vitamins',
      farmDetails: 'Grown in organic soil',
      harvestDate: '2024-02-10'
    },
    {
      id: 'P009',
      name: 'Spinach',
      price: 15,
      quantity: 95,
      shopName: 'Green Leaf',
      location: 'Mymensingh',
      status: 'stock-out',
      description: 'Fresh green spinach leaves',
      farmDetails: 'Pesticide-free cultivation',
      harvestDate: '2024-02-12'
    },
    {
      id: 'P010',
      name: 'Cabbage',
      price: 22,
      quantity: 400,
      shopName: 'Farm Fresh',
      location: 'Comilla',
      status: 'available',
      description: 'Crisp and fresh cabbage heads',
      farmDetails: 'Grown in controlled environment',
      harvestDate: '2024-02-08'
    },
    {
      id: 'P011',
      name: 'Cauliflower',
      price: 35,
      quantity: 180,
      shopName: 'White Pearl',
      location: 'Tangail',
      status: 'available',
      description: 'Fresh white cauliflower',
      farmDetails: 'Organically cultivated',
      harvestDate: '2024-02-06'
    },
    {
      id: 'P012',
      name: 'Brinjal',
      price: 28,
      quantity: 220,
      shopName: 'Purple Garden',
      location: 'Narayanganj',
      status: 'available',
      description: 'Fresh purple brinjal',
      farmDetails: 'Natural farming methods',
      harvestDate: '2024-02-09'
    },
    {
      id: 'P013',
      name: 'Cucumber',
      price: 20,
      quantity: 75,
      shopName: 'Cool Veg',
      location: 'Faridpur',
      status: 'stock-out',
      description: 'Fresh green cucumbers',
      farmDetails: 'Hydroponic cultivation',
      harvestDate: '2024-02-11'
    },
    {
      id: 'P014',
      name: 'Pumpkin',
      price: 25,
      quantity: 350,
      shopName: 'Orange Farm',
      location: 'Barisal',
      status: 'available',
      description: 'Large orange pumpkins',
      farmDetails: 'Traditional farming',
      harvestDate: '2024-01-30'
    },
    {
      id: 'P015',
      name: 'Green Beans',
      price: 45,
      quantity: 160,
      shopName: 'Bean Field',
      location: 'Kishoreganj',
      status: 'available',
      description: 'Fresh green beans',
      farmDetails: 'Organic farming practices',
      harvestDate: '2024-02-07'
    },
    {
      id: 'P016',
      name: 'Bell Pepper',
      price: 65,
      quantity: 85,
      shopName: 'Color Garden',
      location: 'Manikganj',
      status: 'stock-out',
      description: 'Mixed color bell peppers',
      farmDetails: 'Greenhouse cultivation',
      harvestDate: '2024-02-04'
    },
    {
      id: 'P017',
      name: 'Okra',
      price: 35,
      quantity: 190,
      shopName: 'Green Finger',
      location: 'Gopalganj',
      status: 'available',
      description: 'Fresh okra vegetables',
      farmDetails: 'Natural cultivation',
      harvestDate: '2024-02-13'
    },
    {
      id: 'P018',
      name: 'Green Chili',
      price: 80,
      quantity: 120,
      shopName: 'Spicy Farm',
      location: 'Patuakhali',
      status: 'available',
      description: 'Hot green chilies',
      farmDetails: 'Organic spice farming',
      harvestDate: '2024-02-02'
    },
    {
      id: 'P019',
      name: 'Lemon',
      price: 90,
      quantity: 250,
      shopName: 'Citrus Grove',
      location: 'Sylhet',
      status: 'available',
      description: 'Fresh juicy lemons',
      farmDetails: 'Citrus orchard cultivation',
      harvestDate: '2024-01-18'
    },
    {
      id: 'P020',
      name: 'Ginger',
      price: 150,
      quantity: 90,
      shopName: 'Root Spice',
      location: 'Bandarban',
      status: 'stock-out',
      description: 'Fresh ginger roots',
      farmDetails: 'Hill tract cultivation',
      harvestDate: '2024-01-22'
    }
  ];

  const [products, setProducts] = useState(demoProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(demoProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts(demoProducts);
      }
    };
    fetchProducts();
  }, []);

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

  const handleTrackOrder = () => {
    setShowOrderSuccess(false);
    setShowTracking(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleSaveProduct = (productData) => {
    console.log('Saving product:', productData);
    // Here you would typically save to your backend
  };

  const handleApplyFilter = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = (!filters.search || product.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.status || (filters.status === 'available' ? product.quantity >= 100 : product.quantity < 100)) &&
      (!filters.location || product.location.toLowerCase().includes(filters.location.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

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
          <Button variant="outline" className="gap-2" onClick={() => setShowFilter(true)}>
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleCreate}>
            <Plus className="w-4 h-4" />
            Create Product
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (৳/kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      {product.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status, product.quantity)}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                        className="gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-sm gap-1"
                        size="sm"
                        onClick={() => handleOrderNow(product)}
                      >
                        <ShoppingCart className="w-3 h-3" />
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
        onTrackOrder={handleTrackOrder}
      />

      <TrackingModal 
        isOpen={showTracking}
        onClose={() => setShowTracking(false)}
      />

      <FilterModal 
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilter={handleApplyFilter}
        filterType="Products"
      />

      <ProductFormModal 
        isOpen={showProductForm}
        onClose={() => setShowProductForm(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default Products;
