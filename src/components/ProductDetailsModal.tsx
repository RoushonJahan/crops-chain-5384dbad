import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ProductDetailsModal = ({ product, onClose, onConfirm }) => {
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [selectedTransport, setSelectedTransport] = useState('');
  const [quantity, setQuantity] = useState(1);

  const transportOptions = [
    { id: 'TR001', name: 'Azhar Publication', vehicle: 'Truck - 104', type: 'Truck' },
    { id: 'TR002', name: 'Bashiron Enterprise', vehicle: 'Pickup - 150', type: 'Pickup' },
    { id: 'TR003', name: 'Beautiful Publication', vehicle: 'Truck - 302', type: 'Truck' },
    { id: 'TR004', name: 'Swift Logistics', vehicle: 'Van - 205', type: 'Van' },
    { id: 'TR005', name: 'Green Transport Co.', vehicle: 'Truck - 156', type: 'Truck' }
  ];

  if (!product) return null;

  const handleConfirmOrder = () => {
    if (deliveryLocation && selectedTransport && quantity > 0) {
      onConfirm();
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Product ID:</span>
                  <p className="font-medium">{product.id}</p>
                </div>
                <div>
                  <span className="text-gray-500">Price per kg:</span>
                  <p className="font-medium text-green-600">৳{product.price}</p>
                </div>
                <div>
                  <span className="text-gray-500">Available:</span>
                  <p className="font-medium">{product.quantity} kg</p>
                </div>
                <div>
                  <span className="text-gray-500">Harvest Date:</span>
                  <p className="font-medium">{product.harvestDate}</p>
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Farm Details:</span>
                <p className="text-sm text-gray-700 mt-1">{product.farmDetails}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Seller Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shop Name:</span>
                    <span className="font-medium">{product.shopName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {product.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={product.status === 'stock-out' || product.quantity < 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {product.status === 'stock-out' || product.quantity < 100 ? 'Stock Out' : 'Available'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Place Your Order</h4>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                <Input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
                <Input
                  placeholder="Enter delivery address"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Transportation</label>
              <Select value={selectedTransport} onValueChange={setSelectedTransport}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose transport company" />
                </SelectTrigger>
                <SelectContent>
                  {transportOptions.map((transport) => (
                    <SelectItem key={transport.id} value={transport.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{transport.name}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {transport.vehicle} ({transport.type})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Order Summary */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h5 className="font-semibold text-gray-900 mb-2">Order Summary</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span>{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per kg:</span>
                  <span>৳{product.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600 text-base border-t pt-2">
                  <span>Total Price:</span>
                  <span>৳{totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmOrder}
                disabled={!deliveryLocation || !selectedTransport || quantity <= 0}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
