
import React from 'react';
import { Button } from "@/components/ui/button";

const TrackingModal = ({ isOpen, onClose, currentStatus = 'shipped' }) => {
  if (!isOpen) return null;

  const getStatusIndex = (status) => {
    const statuses = ['confirmation-pending', 'waiting-for-transport', 'shipped', 'on-the-way', 'delivered'];
    return statuses.indexOf(status);
  };

  const currentStatusIndex = getStatusIndex(currentStatus);

  const trackingSteps = [
    {
      status: 'Confirmation Pending',
      statusKey: 'confirmation-pending',
      details: 'Seller: Green Valley Farm',
      time: '9:00 AM',
      description: 'Request accepted'
    },
    {
      status: 'Waiting for Transport',
      statusKey: 'waiting-for-transport',
      details: 'Transport: Swift Logistics',
      time: '10:20 AM',
      description: 'Transport reached'
    },
    {
      status: 'Shipped',
      statusKey: 'shipped',
      details: 'Destination: Dhaka, Bangladesh',
      time: '12:15 PM',
      description: 'Shipped'
    },
    {
      status: 'On the way',
      statusKey: 'on-the-way',
      details: 'Estimated time',
      time: '2:30 PM',
      description: 'On the way'
    },
    {
      status: 'Delivered',
      statusKey: 'delivered',
      details: 'Delivered time',
      time: '3:10 PM',
      description: 'Delivered'
    }
  ];

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStatusIndex) return 'completed';
    if (stepIndex === currentStatusIndex) return 'current';
    return 'pending';
  };

  const getStepStyles = (stepStatus) => {
    switch (stepStatus) {
      case 'completed':
        return {
          circle: 'w-8 h-8 bg-green-500 border-2 border-green-500',
          line: 'bg-green-500',
          text: 'text-gray-900'
        };
      case 'current':
        return {
          circle: 'w-8 h-8 bg-yellow-400 border-2 border-yellow-400',
          line: 'bg-gray-300',
          text: 'text-gray-900'
        };
      case 'pending':
        return {
          circle: 'w-8 h-8 bg-white border-2 border-green-500',
          line: 'bg-gray-300',
          text: 'text-gray-500'
        };
    }
  };

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

        {/* Order Summary */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Order ID:</strong> #ORD{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            <p><strong>Product:</strong> Rice (100 kg)</p>
            <p><strong>Total:</strong> ৳4,500</p>
            <p><strong>Delivery Address:</strong> Dhaka, Bangladesh</p>
          </div>
        </div>

        <div className="p-6">
          <div className="relative space-y-6">
            {trackingSteps.map((step, index) => {
              const stepStatus = getStepStatus(index);
              const styles = getStepStyles(stepStatus);
              
              return (
                <div key={index} className="flex items-start space-x-4 relative">
                  <div className="flex flex-col items-center">
                    <div className={`${styles.circle} rounded-full flex items-center justify-center relative z-10`}>
                      {stepStatus === 'completed' ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : stepStatus === 'current' ? (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      ) : (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-12 ${styles.line} absolute top-8`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <h3 className={`font-semibold ${styles.text}`}>
                      {step.status}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{step.details}</p>
                    <p className="text-sm text-gray-500 mt-1">{step.description}: {step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
