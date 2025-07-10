
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold text-gray-900">CropsChain</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors">Products</Link>
          <Link to="/farmers" className="text-gray-600 hover:text-green-600 transition-colors">For Farmers</Link>
          <Link to="/buyers" className="text-gray-600 hover:text-green-600 transition-colors">For Buyers</Link>
          <Link to="/track-orders" className="text-gray-600 hover:text-green-600 transition-colors">Track Orders</Link>
          <Link to="/transportation" className="text-gray-600 hover:text-green-600 transition-colors">Transportation</Link>
          <Link to="/purchase-history" className="text-gray-600 hover:text-green-600 transition-colors">Purchase History</Link>
          <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">About</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600" asChild>
            <Link to="/login">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" asChild>
            <Link to="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
