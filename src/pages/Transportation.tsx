import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ContactModal from "@/components/ContactModal";
import FilterModal from "@/components/FilterModal";

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
  const [filters, setFilters] = useState<TransportFilters>({
    search: '',
    category: '',
    status: '',
    location: ''
  });

  const transportCompanies = [
    {
      id: 'TR001',
      name: 'Azhar Publication',
      vehicle: 'Truck - 104',
      type: 'Truck',
      capacity: '5 tons',
      pricePerKm: 12,
      specialization: 'Heavy Cargo',
      coverage: 'Nationwide',
      contact: '+8801712345001',
      email: 'azhar.transport@gmail.com',
      features: ['GPS Tracking', 'Insurance Covered', '24/7 Support']
    },
    {
      id: 'TR002',
      name: 'Bashiron Enterprise',
      vehicle: 'Pickup - 150',
      type: 'Pickup',
      capacity: '1.5 tons',
      pricePerKm: 8,
      specialization: 'Quick Delivery',
      coverage: 'Regional',
      contact: '+8801712345002',
      email: 'bashiron.logistics@gmail.com',
      features: ['Fast Delivery', 'Cold Storage', 'Live Tracking']
    },
    {
      id: 'TR003',
      name: 'Beautiful Publication',
      vehicle: 'Truck - 302',
      type: 'Truck',
      capacity: '8 tons',
      pricePerKm: 15,
      specialization: 'Bulk Transport',
      coverage: 'International',
      contact: '+8801712345003',
      email: 'beautiful.cargo@gmail.com',
      features: ['Multi-temperature', 'Documentation', 'Express Service']
    },
    {
      id: 'TR004',
      name: 'Swift Logistics',
      vehicle: 'Van - 205',
      type: 'Van',
      capacity: '2 tons',
      pricePerKm: 10,
      specialization: 'Urban Delivery',
      coverage: 'City Wide',
      contact: '+8801712345004',
      email: 'swift.delivery@gmail.com',
      features: ['Same Day Delivery', 'Fragile Handling', 'Real-time Updates']
    },
    {
      id: 'TR005',
      name: 'Green Transport Co.',
      vehicle: 'Truck - 156',
      type: 'Eco Truck',
      capacity: '6 tons',
      pricePerKm: 13,
      specialization: 'Eco-Friendly',
      coverage: 'Regional',
      contact: '+8801712345005',
      email: 'green.transport@gmail.com',
      features: ['Zero Emission', 'Organic Certified', 'Solar Powered']
    },
    {
      id: 'TR006',
      name: 'Rapid Cargo Services',
      vehicle: 'Mini Truck - 89',
      type: 'Mini Truck',
      capacity: '3 tons',
      pricePerKm: 9,
      specialization: 'Small Batches',
      coverage: 'Local',
      contact: '+8801712345006',
      email: 'rapid.cargo@gmail.com',
      features: ['Flexible Timing', 'Door to Door', 'Affordable Rates']
    }
  ];

  const handleCallNow = (company) => {
    setContactInfo({
      ownerName: company.name,
      shopName: company.name,
      phone: company.contact,
      email: company.email,
      location: company.coverage
    });
    setShowContact(true);
  };

  const handleApplyFilter = (newFilters: TransportFilters) => {
    setFilters(newFilters);
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Transport
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

                <div>
                  <span className="text-gray-500 text-sm">Specialization:</span>
                  <Badge className="ml-2 bg-blue-100 text-blue-800">{company.specialization}</Badge>
                </div>

                <div>
                  <span className="text-gray-500 text-sm block mb-2">Features:</span>
                  <div className="flex flex-wrap gap-1">
                    {company.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {company.contact}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z" />
                    </svg>
                    {company.email}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    View Details
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700" 
                    size="sm"
                    onClick={() => handleCallNow(company)}
                  >
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
    </div>
  );
};

export default Transportation;
