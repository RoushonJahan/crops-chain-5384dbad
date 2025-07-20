import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL } from "@/config";

const PaymentModal = ({ orderInfo, onClose, onComplete, onBack }) => {
  const { product, quantity, transport } = orderInfo || {};
  const totalPrice = product.price * quantity;

  // You can add more fields as needed

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
  
  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
        <div className="mb-4 space-y-2">
          <div><b>Seller:</b> {sellersMap[product?.shopId]?.shopName}</div>
          <div><b>Phone:</b> {sellersMap[product?.shopId]?.phone}</div>
          <div><b>Transaction Type:</b> {sellersMap[product?.shopId]?.transactionType}</div>
          <div><b>Product:</b> {product?.name}</div>
          <div><b>Quantity:</b> {quantity} kg</div>
          <div><b>Transport:</b> {transport?.name}</div>
        </div>
        <div className="mb-4 text-3xl font-semibold text-green-600" >
        <h1><b>Tatal Payment:</b> ৳{totalPrice}</h1>
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onComplete}>
          Complete Payment
        </Button>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Back
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 