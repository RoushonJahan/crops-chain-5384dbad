import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {Phone, Mail, MapPin, Truck, Package } from "lucide-react";

interface TransportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transportData: any;
}

const TransportDetailsModal = ({ isOpen, onClose, transportData }: TransportDetailsModalProps) => {
  if (!transportData) return null;

  const getVehicleIcon = (type: string) => {
    const iconClass = "w-6 h-6";
    
    switch (type.toLowerCase()) {
      case 'truck':
      case 'eco truck':
        return <Truck className={iconClass} />;
      case 'pickup':
        return <Package className={iconClass} />;
      case 'van':
        return <Package className={iconClass} />;
      default:
        return <Truck className={iconClass} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Transport Service Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  {getVehicleIcon(transportData.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{transportData.name}</h3>
                  <p className="text-gray-500">{transportData.vehicle}</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">{transportData.specialization}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">৳{transportData.pricePerKm}/km</p>
                  <p className="text-sm text-gray-500">Per kilometer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Vehicle Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">{transportData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="font-medium">{transportData.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vehicle ID:</span>
                    <span className="font-medium">{transportData.vehicle}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Service Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Specialization:</span>
                    <span className="font-medium">{transportData.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coverage:</span>
                    <span className="font-medium">{transportData.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rate:</span>
                    <span className="font-medium text-green-600">৳{transportData.pricePerKm}/km</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Features & Services</h4>
              <div className="flex flex-wrap gap-2">
                {transportData.features?.map((feature: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{transportData.contact}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{transportData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-gray-600">{transportData.coverage} Coverage</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransportDetailsModal;