import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TransportFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transportData?: any;
  mode: 'create' | 'edit';
}

const TransportFormModal = ({ isOpen, onClose, transportData, mode }: TransportFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    type: '',
    capacity: '',
    pricePerKm: '',
    specialization: '',
    coverage: '',
    contact: '',
    email: '',
    features: [] as string[]
  });

  useEffect(() => {
    if (transportData && mode === 'edit') {
      setFormData({
        name: transportData.name || '',
        vehicle: transportData.vehicle || '',
        type: transportData.type || '',
        capacity: transportData.capacity || '',
        pricePerKm: transportData.pricePerKm?.toString() || '',
        specialization: transportData.specialization || '',
        coverage: transportData.coverage || '',
        contact: transportData.contact || '',
        email: transportData.email || '',
        features: transportData.features || []
      });
    } else {
      setFormData({
        name: '',
        vehicle: '',
        type: '',
        capacity: '',
        pricePerKm: '',
        specialization: '',
        coverage: '',
        contact: '',
        email: '',
        features: []
      });
    }
  }, [transportData, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.vehicle || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const action = mode === 'create' ? 'created' : 'updated';
    toast({
      title: "Success",
      description: `Transport service ${action} successfully!`,
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const vehicleTypes = [
    'Truck', 'Pickup', 'Van', 'Mini Truck', 'Eco Truck', 'Container Truck'
  ];

  const coverageAreas = [
    'Local', 'Regional', 'Nationwide', 'International'
  ];

  const specializations = [
    'Heavy Cargo', 'Quick Delivery', 'Bulk Transport', 'Urban Delivery', 
    'Eco-Friendly', 'Small Batches', 'Cold Storage', 'Fragile Items'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {mode === 'create' ? 'Create Transport Service' : 'Edit Transport Service'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <Label htmlFor="vehicle">Vehicle *</Label>
              <Input
                id="vehicle"
                value={formData.vehicle}
                onChange={(e) => handleInputChange('vehicle', e.target.value)}
                placeholder="e.g., Truck - 104"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Vehicle Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                placeholder="e.g., 5 tons"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricePerKm">Price per KM (৳)</Label>
              <Input
                id="pricePerKm"
                type="number"
                value={formData.pricePerKm}
                onChange={(e) => handleInputChange('pricePerKm', e.target.value)}
                placeholder="Enter price per km"
              />
            </div>
            <div>
              <Label htmlFor="coverage">Coverage Area</Label>
              <Select value={formData.coverage} onValueChange={(value) => handleInputChange('coverage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage area" />
                </SelectTrigger>
                <SelectContent>
                  {coverageAreas.map((area) => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="+8801712345678"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="company@email.com"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              {mode === 'create' ? 'Create Transport' : 'Update Transport'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransportFormModal;