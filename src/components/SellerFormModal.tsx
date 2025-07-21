
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BASE_URL } from '../config';

const SellerFormModal = ({ isOpen, onClose, onSave, seller = null, onRefresh }) => {
  const [formData, setFormData] = useState({
    id: '',
    shopName: '',
    ownerName: '',
    phone: '',
    location: '',
    transactionType: '',
  });

  useEffect(() => {
    if (seller) {
      setFormData({
        id: seller.id || '',
        shopName: seller.shopName || '',
        ownerName: seller.ownerName || '',
        phone: seller.phone || '',
        location: seller.location || '',
        transactionType: seller.transactionType || '',
      });
    } else {
      setFormData({
        id: `S${String(Date.now()).slice(-3)}`,
        shopName: '',
        ownerName: '',
        phone: '',
        location: '',
        transactionType: '',
      });
    }
  }, [seller, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (seller) {
        response = await axios.put(
          `${BASE_URL}/farmers/${formData.id}`,
          formData
        );
      } else {
        response = await axios.post(`${BASE_URL}/farmers`, formData);
      }
      onSave(response.data);
      onClose();
      // Add this line to refresh the data
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Failed to add seller:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {seller ? 'Edit Seller' : 'Add Seller'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
            <Input
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
            <Input
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
            <Select value={formData.transactionType} onValueChange={(value) => setFormData({ ...formData, transactionType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nagad">Nagad</SelectItem>
                <SelectItem value="bKash">bKash</SelectItem>
                <SelectItem value="Upay">Upay</SelectItem>
                <SelectItem value="Rocket">Rocket</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              {seller ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerFormModal;
