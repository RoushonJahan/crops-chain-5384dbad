
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
import PaymentModal from "@/components/PaymentModal";
import TransportDetailsModal from "@/components/TransportDetailsModal";

interface ProductFilters {
  search: string;
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
    location: ''
  });

  const demoProducts = [
    {
      id: 'P001',
      name: 'Rice',
      price: 45,
      quantity: 500,
      shopName: 'Farm House',
      location: 'Rajshahi',
      status: 'available',
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
      harvestDate: '2024-01-20'
    },
  ];
  const demoSellers = [
    {
      id: "S001",
      shopName: "Dhaka Electronics",
      ownerName: "Kazi Hassan",
      phone: "+8801712346881",
      transactionType: "bKash",
      location: "Dhaka",
      totalOrders: 156,
      joinDate: "2023-03-15",
    },
    {
      id: "S002",
      shopName: "Chittagong Traders",
      ownerName: "Rafiqul Alam",
      phone: "+8801712346872",
      transactionType: "Nagad",
      location: "Chittagong",
      totalOrders: 89,
      joinDate: "2023-05-20",
    },
  ];
  const [sellers, setSellers] = useState(demoSellers);
  const [selectedSeller, setSelectedSeller] = useState("");
  const [sellersMap, setSellersMap] = useState({});

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/farmers`);
      let fetchedSellers;
      if (response.data && response.data.length > 0) {
        fetchedSellers = response.data;
        setSellers(fetchedSellers);
      } else {
        fetchedSellers = demoSellers;
        setSellers(demoSellers);
      }

    const map = {};
    fetchedSellers.forEach(seller => {
      map[seller.id] = seller;
    });
    setSellersMap(map);
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
      setSellers(demoSellers);
      const map = {};
      demoSellers.forEach(seller => {
        map[seller.id] = seller;
      });
      setSellersMap(map);
    }
  };

  // Move fetchProducts to top-level so it can be reused
  const [products, setProducts] = useState(demoProducts);

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

  useEffect(() => {
    fetchProducts();
    fetchSellers();
  }, []);

  const getStatusBadge = (quantity) => {
    if (quantity < 0) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Stock Out</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
  };

  const handleOrderNow = (product) => {
    setSelectedProduct(product);
  };

  const [showTransportDetails, setShowTransportDetails] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  // Handler to open transport details
  const handleViewTransportDetails = (transport) => {
    setSelectedTransport(transport);
    setShowTransportDetails(true);
  };

  // Handler after confirming order in ProductDetailsModal
  const handleOrderConfirm = (orderDetails) => {
    setOrderInfo(orderDetails); // {product, transport, quantity, ...}
    setSelectedProduct(null);
    setShowPaymentModal(true);
  };

  // Handler after payment
  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    setShowOrderSuccess(true);
  };

  // Handler after confirming in TransportDetailsModal
  const handleTransportConfirm = () => {
    setShowTransportDetails(false);
    setShowPaymentModal(true);
  };

  // Handler for going back from payment to transport details
  const handlePaymentBack = () => {
    setShowPaymentModal(false);
    setShowTransportDetails(true);
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
    fetchProducts(); // Refresh the product list after save
  };

  const handleApplyFilter = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const handleSubmit = async (e) => {
    try {
      const currentDate = new Date();
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(currentDate.getDate() + 3);
      
      const dateString = currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      const estimatedDeliveryString = estimatedDelivery.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      const orderInfoDto = { 
        id: `ORD${String(Date.now()).slice(-3)}`,
        type: orderInfo?.product?.name,
        date: dateString,
        status: 'Confirmation Pending',
        quantity: orderInfo?.product?.quantity,
        totalPrice: orderInfo?.product?.price * orderInfo?.product?.quantity,
        location: orderInfo?.deliveryLocation,
        estimatedDelivery: estimatedDeliveryString,
        trackingId: `TRK${String(Date.now()).slice(-3)}`,
        productId: orderInfo?.product?.id,
        sellerShopId: orderInfo?.product?.shopId,
        buyerShopId: 'SHP00001',
        transportId: orderInfo?.transport?.id,
        transationId: `PAY${String(Date.now()).slice(-3)}`,
       };
      const response = await axios.post(`${BASE_URL}/orders`, orderInfoDto);
      console.log(response);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = (!filters.search || product.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (product.quantity >= 0 ) &&
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
            Add Product
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sellersMap[product?.shopId]?.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      {sellersMap[product?.shopId]?.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.quantity)}</td>
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
        onViewTransportDetails={handleViewTransportDetails}
      />

      <TransportDetailsModal
        isOpen={showTransportDetails}
        onClose={() => setShowTransportDetails(false)}
        transportData={selectedTransport}
        onConfirm={handleTransportConfirm}
      />

      {showPaymentModal && orderInfo && (
        <PaymentModal
          orderInfo={orderInfo}
          onClose={() => setShowPaymentModal(false)}
          onComplete={() => {
            handlePaymentComplete();
            handleSubmit(orderInfo);
          }}
          onBack={handlePaymentBack}
        />
      )}

      <OrderSuccessModal 
        isOpen={showOrderSuccess}
        onClose={() => setShowOrderSuccess(false)}
        onTrackOrder={handleTrackOrder}
      />

      <TrackingModal 
        isOpen={showTracking}
        currentStatus='confirmation-pending'
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
