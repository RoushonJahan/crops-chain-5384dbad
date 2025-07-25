import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ContactModal from "@/components/ContactModal";
import FilterModal from "@/components/FilterModal";
import TransportFormModal from "@/components/TransportFormModal";
import TransportDetailsModal from "@/components/TransportDetailsModal";
import { Edit, Phone, Plus, Filter, Eye } from "lucide-react";
import { BASE_URL } from '../config';

interface TransportFilters {
  search: string;
  category: string;
  status: string;
  location: string;
}

const Transportation = () => {
  const [showContact, setShowContact] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showTransportForm, setShowTransportForm] = useState(false);
  const [showTransportDetails, setShowTransportDetails] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [filters, setFilters] = useState<TransportFilters>({
    search: '',
    category: '',
    status: '',
    location: ''
  });

  const demoTransportCompanies = [
    {
      id: 'TR001',
      name: 'Azhar Publication',
      vehicle: 'Truck - 104',
      type: 'Truck',
      capacity: '5 tons',
      pricePerKm: 12,
      coverage: 'Nationwide',
      contact: '+8801712345001',
    },
    {
      id: 'TR002',
      name: 'Bashiron Enterprise',
      vehicle: 'Pickup - 150',
      type: 'Pickup',
      capacity: '1.5 tons',
      pricePerKm: 8,
      coverage: 'Regional',
      contact: '+8801712345002',
    },
    {
      id: 'TR003',
      name: 'Beautiful Publication',
      vehicle: 'Truck - 302',
      type: 'Truck',
      capacity: '8 tons',
      pricePerKm: 15,
      coverage: 'International',
      contact: '+8801712345003',
    },
    {
      id: 'TR004',
      name: 'Swift Logistics',
      vehicle: 'Van - 205',
      type: 'Van',
      capacity: '2 tons',
      pricePerKm: 10,
      coverage: 'City Wide',
      contact: '+8801712345004',
    },
    {
      id: 'TR005',
      name: 'Green Transport Co.',
      vehicle: 'Truck - 156',
      type: 'Eco Truck',
      capacity: '6 tons',
      pricePerKm: 13,
      coverage: 'Regional',
      contact: '+8801712345005',
    },
    {
      id: 'TR006',
      name: 'Rapid Cargo Services',
      vehicle: 'Mini Truck - 89',
      type: 'Mini Truck',
      capacity: '3 tons',
      pricePerKm: 9,
      coverage: 'Local',
      contact: '+8801712345006',
    }
  ];

  const [transportCompanies, setTransportCompanies] = useState(demoTransportCompanies);

  const fetchTransportCompanies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/transportation`);
      if (response.data && response.data.length > 0) {
        setTransportCompanies(response.data);
      } else {
        setTransportCompanies(demoTransportCompanies);
      }
    } catch (error) {
      console.error('Failed to fetch transport companies:', error);
      setTransportCompanies(demoTransportCompanies);
    }
  };
  useEffect(() => {
    fetchTransportCompanies();
  }, []);

  const handleCallNow = (company) => {
    setContactInfo({
      ownerName: company.name,
      shopName: company.name,
      phone: company.contact,
      location: company.coverage
    });
    setShowContact(true);
  };

  const handleApplyFilter = (newFilters: TransportFilters) => {
    setFilters(newFilters);
  };

  const handleCreateTransport = () => {
    setFormMode('create');
    setSelectedTransport(null);
    setShowTransportForm(true);
  };

  const handleEditTransport = (transport: any) => {
    setFormMode('edit');
    setSelectedTransport(transport);
    setShowTransportForm(true);
  };

  const handleViewDetails = (transport: any) => {
    setSelectedTransport(transport);
    setShowTransportDetails(true);
  };

  const filteredCompanies = transportCompanies.filter(company => {
    const matchesFilter = (!filters.search || company.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.location || company.coverage.toLowerCase().includes(filters.location.toLowerCase()));
    return matchesFilter;
  });

  const getVehicleIcon = (type) => {
    const iconClass = "w-8 h-8";
    
    switch (type.toLowerCase()) {
      case 'truck':
      case 'eco truck':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        );
      case 'pickup':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'van':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        );
    }
  };

  const handleSaveTransport = () => {
    fetchTransportCompanies();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transportation Services</h1>
            <p className="text-gray-600">Reliable transport partners for your agricultural supply chain needs.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" className="gap-2" onClick={() => setShowFilter(true)}>
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleCreateTransport}>
            <Plus className="w-4 h-4" />
            Add Transport
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {getVehicleIcon(company.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <p className="text-sm text-gray-500">{company.vehicle}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <p className="font-medium">{company.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Capacity:</span>
                    <p className="font-medium">{company.capacity}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Rate:</span>
                    <p className="font-medium text-green-600">৳{company.pricePerKm}/km</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Coverage:</span>
                    <p className="font-medium">{company.coverage}</p>
                  </div>
                </div>


                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {company.contact}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-1" 
                    size="sm"
                    onClick={() => handleEditTransport(company)}
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-1" 
                    size="sm"
                    onClick={() => handleViewDetails(company)}
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 gap-1" 
                    size="sm"
                    onClick={() => handleCallNow(company)}
                  >
                    <Phone className="w-3 h-3" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ContactModal 
        isOpen={showContact}
        contactInfo={contactInfo}
        onClose={() => setShowContact(false)}
      />

      <FilterModal 
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilter={handleApplyFilter}
        filterType="Transportation"
      />

      <TransportFormModal
        isOpen={showTransportForm}
        onClose={() => setShowTransportForm(false)}
        transportData={selectedTransport}
        mode={formMode}
        onSave={handleSaveTransport}
      />

      <TransportDetailsModal
        isOpen={showTransportDetails}
        onClose={() => setShowTransportDetails(false)}
        transportData={selectedTransport}
      />
    </div>
  );
};

export default Transportation;
