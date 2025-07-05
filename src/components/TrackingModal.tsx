
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
      details: "John's Store",
      time: 'Request send: 11:30 AM, Nov 18',
      description: 'Request accepted'
    },
    {
      status: 'Waiting for Transport',
      statusKey: 'waiting-for-transport',
      details: 'Fast Express',
      time: 'Request send: 12:00 PM, Nov 18',
      description: 'Transport reached'
    },
    {
      status: 'Shipped',
      statusKey: 'shipped',
      details: 'Los Angeles, CA',
      time: 'Shipped complete time: 2:00 PM, Nov 18',
      description: 'Shipped'
    },
    {
      status: 'On the way',
      statusKey: 'on-the-way',
      details: 'Estimated time to reach',
      time: '4:15 PM, Nov 18',
      description: 'On the way'
    },
    {
      status: 'Delivered',
      statusKey: 'delivered',
      details: 'Delivered time',
      time: '',
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
          text: 'text-gray-900',
          icon: (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'current':
        return {
          circle: 'w-8 h-8 bg-yellow-400 border-2 border-yellow-400',
          line: 'bg-green-500',
          text: 'text-gray-900',
          icon: <div className="w-3 h-3 bg-white rounded-full"></div>
        };
      case 'pending':
        return {
          circle: 'w-8 h-8 bg-white border-2 border-green-500',
          line: 'bg-gray-300',
          text: 'text-gray-500',
          icon: null
        };
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Track Order</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="relative">
            {trackingSteps.map((step, index) => {
              const stepStatus = getStepStatus(index);
              const styles = getStepStyles(stepStatus);
              
              return (
                <div key={index} className="flex items-start space-x-4 relative">
                  <div className="flex flex-col items-center relative">
                    <div className={`${styles.circle} rounded-full flex items-center justify-center relative z-10`}>
                      {styles.icon}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-16 ${styles.line} absolute top-8 z-0`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <h3 className={`font-semibold text-lg ${styles.text}`}>
                      {step.status}
                    </h3>
                    <p className="text-gray-600 mt-1 font-medium">{step.details}</p>
                    <p className="text-sm text-gray-500 mt-1">{step.time}</p>
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
