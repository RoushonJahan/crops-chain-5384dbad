
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";

const OrderSuccessModal = ({ isOpen, onClose, onTrackOrder }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You will receive a confirmation email shortly with tracking details.
        </p>
        
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            <strong>Order ID:</strong> #ORD{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
          </p>
          <p className="text-sm text-green-800 mt-1">
            <strong>Estimated Delivery:</strong> 2-3 business days
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Continue Shopping
          </Button>
          <Button onClick={onTrackOrder} className="flex-1 bg-green-600 hover:bg-green-700">
            Track Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
