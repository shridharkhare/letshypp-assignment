'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserDetails } from '@/lib/booking-state';
import { AlertCircle, CreditCard, Loader2, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

interface CheckoutStepProps {
  initialData: UserDetails | null;
  totalAmount: number;
  onNext: (data: UserDetails) => void;
  onBack: () => void;
}

export function CheckoutStep({ initialData, totalAmount, onNext, onBack }: CheckoutStepProps) {
  const [formData, setFormData] = useState<UserDetails>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Edge case #5: Form validation with detailed error messages
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onNext(formData);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.slice(0, 10);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-heading text-[#0e172a] mb-2">Checkout</h2>
        <p className="text-[#4b5563]">Complete your booking with payment details</p>
      </div>

      {/* Contact Information */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#3f76f3]" />
          Contact Information
        </h3>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <p className="text-red-600 text-sm">{errors.name}</p>
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
                placeholder="9876543210"
                maxLength={10}
              />
            </div>
            {errors.phone && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <p className="text-red-600 text-sm">{errors.phone}</p>
              </div>
            )}
            <p className="text-xs text-[#4b5563] mt-1">
              You'll receive booking updates via SMS and WhatsApp
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <p className="text-red-600 text-sm">{errors.email}</p>
              </div>
            )}
            <p className="text-xs text-[#4b5563] mt-1">
              Invoice and tracking details will be sent to this email
            </p>
          </div>
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#3f76f3]" />
          Payment Method
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-lg border-2 border-[#283782] bg-[#283782]/5">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="cod"
                name="payment"
                checked
                readOnly
                className="w-4 h-4 text-[#283782]"
              />
              <label htmlFor="cod" className="flex-1">
                <div className="font-semibold text-[#0e172a]">Cash on Pickup</div>
                <div className="text-sm text-[#4b5563]">Pay when our partner collects your package</div>
              </label>
              <span className="text-2xl">💵</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-60">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="online"
                name="payment"
                disabled
                className="w-4 h-4"
              />
              <label htmlFor="online" className="flex-1">
                <div className="font-semibold text-[#4b5563]">Online Payment</div>
                <div className="text-sm text-[#4b5563]">Coming soon - UPI, Cards, Wallets</div>
              </label>
              <span className="text-2xl">💳</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Summary */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-[#f8f9fb] to-white border-[#283782]/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0e172a]">Amount to Pay</h3>
          <div className="text-3xl font-bold text-[#283782]">₹{totalAmount}</div>
        </div>
        <div className="text-sm text-[#4b5563]">
          Payment will be collected when our delivery partner picks up your package
        </div>
      </Card>

      {/* Terms and Conditions */}
      <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" className="mt-1" defaultChecked />
          <label htmlFor="terms" className="text-sm text-blue-900">
            I agree to the <a href="#" className="underline font-semibold">Terms & Conditions</a> and{' '}
            <a href="#" className="underline font-semibold">Privacy Policy</a>. I understand that Let's Shyp is not liable for prohibited items.
          </label>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          size="lg"
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="border-gray-300"
        >
          Back to Summary
        </Button>
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isProcessing}
          className="bg-[#283782] hover:bg-[#1e2a61] text-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            `Confirm & Book`
          )}
        </Button>
      </div>
    </div>
  );
}
