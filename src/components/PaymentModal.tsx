import React from "react";
import { Button } from "@/components/ui/button";

const PaymentModal = ({ orderInfo, onClose, onComplete, onBack }) => {
  const { product, quantity, transport } = orderInfo || {};
  // You can add more fields as needed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
        <div className="mb-4 space-y-2">
          <div><b>Seller:</b> {product?.shopName}</div>
          <div><b>Phone:</b> {/* Add seller phone if available */}</div>
          <div><b>Transaction Type:</b> {/* Add transaction type if available */}</div>
          <div><b>Product:</b> {product?.name}</div>
          <div><b>Quantity:</b> {quantity} kg</div>
          <div><b>Transport:</b> {transport?.name}</div>
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