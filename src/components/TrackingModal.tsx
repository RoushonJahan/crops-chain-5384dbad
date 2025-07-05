
import React from 'react';
import { Button } from "@/components/ui/button";

const TrackingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const trackingSteps = [
    {
      status: 'Confirmation Pending',
      completed: true,
      details: 'Seller: Green Valley Farm',
      time: '9:00 AM',
      description: 'Request accepted'
    },
    {
      status: 'Waiting for Transport',
      completed: true,
      details: 'Transport: Swift Logistics',
      time: '10:20 AM',
      description: 'Transport reached'
    },
    {
      status: 'Shipped',
      completed: true,
      details: 'Destination: Dhaka, Bangladesh',
      time: '12:15 PM',
      description: 'Shipped'
    },
    {
      status: 'On the way',
      completed: true,
      details: 'Estimated time',
      time: '2:30 PM',
      description: 'On the way'
    },
    {
      status: 'Delivered',
      completed: true,
      details: 'Delivered time',
      time: '3:10 PM',
      description: 'Delivered'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Tracking</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {step.completed ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  )}
                </div>
                
                <div className="flex-1 pb-8">
                  <h3 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.status}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{step.details}</p>
                  <p className="text-sm text-gray-500 mt-1">{step.description}: {step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
