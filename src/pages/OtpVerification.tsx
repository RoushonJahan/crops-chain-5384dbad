import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone;

  useEffect(() => {
    if (!phone) {
      navigate('/signup');
      return;
    }

    // Start countdown for resend
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phone, navigate]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Phone number verified successfully!');
        navigate('/login');
      } else {
        alert(data.message || 'Verification failed');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    setCountdown(60);
    
    try {
      const response = await fetch('http://localhost:3000/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`New OTP sent: ${data.otp}`);
      } else {
        alert(data.message || 'Failed to resend OTP');
        setResendDisabled(false);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      setResendDisabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Verify Phone Number</h1>
            <p className="text-gray-600 mt-2">Enter the 6-digit code sent to your phone</p>
            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              {phone}
            </div>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              Didn't receive the code?
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResendOtp}
              disabled={resendDisabled}
              className="w-full"
            >
              {resendDisabled 
                ? `Resend in ${countdown}s` 
                : 'Resend OTP'
              }
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/signup" 
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification; 