import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL } from "../config";

const ProductFormModal = ({ isOpen, onClose, onSave, product = null }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    shopName: "",
    location: "",
    description: "",
    farmDetails: "",
    harvestDate: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        price: product.price || "",
        quantity: product.quantity || "",
        shopName: product.shopName || "",
        location: product.location || "",
        description: product.description || "",
        farmDetails: product.farmDetails || "",
        harvestDate: product.harvestDate || "",
      });
    } else {
      setFormData({
        id: `P${String(Date.now()).slice(-3)}`,
        name: "",
        price: "",
        quantity: "",
        shopName: "",
        location: "",
        description: "",
        farmDetails: "",
        harvestDate: "",
      });
    }
  }, [product, isOpen]);

  const demoSellers = [
    {
      id: 'S001',
      shopName: 'Dhaka Electronics',
      ownerName: 'Kazi Hassan',
      phone: '+8801712346881',
      email: 'dhakaelectronics@gmail.com',
      transactionType: 'bKash',
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
      transactionType: 'Nagad',
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
      transactionType: 'Rocket',
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
      transactionType: 'Bank',
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
      transactionType: 'bKash',
      location: 'Khulna',
      products: ['Shrimp', 'Fish', 'Seafood'],
      rating: 4.5,
      totalOrders: 98,
      joinDate: '2023-06-12'
    }
  ];

  const [sellers, setSellers] = useState(demoSellers);
  const [selectedSeller, setSelectedSeller] = useState('');

    const fetchSellers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/farmers`);
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



  useEffect(() => {
    fetchSellers();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (product) {
        response = await axios.put(
          `${BASE_URL}/products/${formData.id}`,
          formData
        );
      } else {
        response = await axios.post(`${BASE_URL}/products`, formData);
      }
      onSave(response?.data);
      onClose();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product ID
            </label>
            <Input value={formData.id} readOnly className="bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (৳/kg)
              </label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (kg)
              </label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Shop Name</label>
              <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose seller shop name" />
                </SelectTrigger>
                <SelectContent>
                  {sellers.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{seller.shopName}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {seller.ownerName} ({seller.location})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harvest Date
            </label>
            <Input
              type="date"
              value={formData.harvestDate}
              onChange={(e) =>
                setFormData({ ...formData, harvestDate: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {product ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
