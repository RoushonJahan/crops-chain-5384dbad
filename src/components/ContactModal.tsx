
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";

const ContactModal = ({ isOpen, contactInfo, onClose }) => {
  useEffect(() => {
    if (isOpen && contactInfo) {
      // Simulate automatic calling after 2 seconds
      const timer = setTimeout(() => {
        // In a real app, this would initiate a phone call
        console.log(`Calling ${contactInfo.phone}...`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, contactInfo]);

  if (!isOpen || !contactInfo) return null;

  const handleCall = () => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${contactInfo.phone}`, '_self');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Calling...</h2>
        <p className="text-gray-600 mb-2">
          Connecting to <strong>{contactInfo.ownerName}</strong>
        </p>
        <p className="text-lg font-semibold text-green-600 mb-6">
          {contactInfo.phone}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-700">
            <p><strong>Shop:</strong> {contactInfo.shopName}</p>
            <p><strong>Location:</strong> {contactInfo.location}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCall}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
