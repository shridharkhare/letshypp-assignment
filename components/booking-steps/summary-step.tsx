'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookingState } from '@/lib/booking-state';
import { AlertCircle, Calendar, Edit2, MapPin, Package, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface SummaryStepProps {
  bookingData: BookingState;
  onNext: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
}

export function SummaryStep({ bookingData, onNext, onBack, onEdit }: SummaryStepProps) {
  const { deliveryDetails, packageDetails, scheduleDetails, pricing } = bookingData;
  
  // Edge case #4: Price change notification
  const [showPriceChange, setShowPriceChange] = useState(false);
  const [previousPrice, setPreviousPrice] = useState(pricing?.total || 0);

  // Simulate price fluctuation check
  const checkPriceChange = () => {
    const newPrice = pricing?.total || 0;
    if (newPrice !== previousPrice && previousPrice > 0) {
      setShowPriceChange(true);
      setTimeout(() => setShowPriceChange(false), 5000);
    }
    setPreviousPrice(newPrice);
  };

  if (!deliveryDetails || !packageDetails || !scheduleDetails || !pricing) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#0e172a] mb-2">Missing Information</h3>
          <p className="text-[#4b5563] mb-4">Please complete all previous steps</p>
          <Button onClick={onBack}>Go Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-heading text-[#0e172a] mb-2">Order Summary</h2>
        <p className="text-[#4b5563]">Review your booking details before checkout</p>
      </div>

      {/* Price Change Alert - Edge case #4 */}
      {showPriceChange && (
        <Card className="p-4 mb-6 bg-amber-50 border-amber-300 animate-pulse">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">Price Updated</p>
              <p className="text-sm text-amber-800 mt-1">
                The pricing has been recalculated based on current rates. Previous: ₹{previousPrice}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Delivery Details */}
      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0e172a] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#3f76f3]" />
            Delivery Details
          </h3>
          <button
            onClick={() => onEdit(1)}
            className="text-[#3f76f3] hover:text-[#283782] flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-[#0e172a] mb-1">Pickup Address</div>
            <div className="text-[#4b5563] text-sm">
              {deliveryDetails.pickupAddress.street}, {deliveryDetails.pickupAddress.city}
              <br />
              ZIP: {deliveryDetails.pickupAddress.zipCode}
              {deliveryDetails.pickupAddress.landmark && (
                <>
                  <br />
                  Landmark: {deliveryDetails.pickupAddress.landmark}
                </>
              )}
            </div>
          </div>

          <div className="border-l-4 border-[#3f76f3] pl-4">
            <div className="text-sm font-semibold text-[#0e172a] mb-1">Drop Address</div>
            <div className="text-[#4b5563] text-sm">
              {deliveryDetails.dropAddress.street}, {deliveryDetails.dropAddress.city}
              <br />
              ZIP: {deliveryDetails.dropAddress.zipCode}
              {deliveryDetails.dropAddress.landmark && (
                <>
                  <br />
                  Landmark: {deliveryDetails.dropAddress.landmark}
                </>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                deliveryDetails.deliveryType === 'express'
                  ? 'bg-[#fab023] text-white'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {deliveryDetails.deliveryType === 'express' ? 'EXPRESS' : 'NORMAL'} DELIVERY
              </span>
            </div>
            {deliveryDetails.deliveryInstructions && (
              <div className="mt-2 text-sm text-[#4b5563]">
                <span className="font-medium">Instructions:</span> {deliveryDetails.deliveryInstructions}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Package Details */}
      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0e172a] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#3f76f3]" />
            Package Details
          </h3>
          <button
            onClick={() => onEdit(2)}
            className="text-[#3f76f3] hover:text-[#283782] flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#4b5563]">Package Size</span>
            <span className="font-semibold text-[#0e172a] uppercase">{packageDetails.size}</span>
          </div>
          {packageDetails.weight && (
            <div className="flex justify-between items-center">
              <span className="text-[#4b5563]">Weight</span>
              <span className="font-semibold text-[#0e172a]">{packageDetails.weight} kg</span>
            </div>
          )}
          <div className="pt-3 border-t border-gray-200">
            <div className="text-sm font-medium text-[#0e172a] mb-1">Description</div>
            <div className="text-sm text-[#4b5563]">{packageDetails.description}</div>
          </div>
        </div>
      </Card>

      {/* Schedule Details */}
      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0e172a] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3f76f3]" />
            Pickup Schedule
          </h3>
          <button
            onClick={() => onEdit(3)}
            className="text-[#3f76f3] hover:text-[#283782] flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#4b5563]">Pickup Date</span>
            <span className="font-semibold text-[#0e172a]">
              {new Date(scheduleDetails.pickupDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#4b5563]">Time Slot</span>
            <span className="font-semibold text-[#0e172a]">{scheduleDetails.pickupTime}</span>
          </div>
        </div>
      </Card>

      {/* Pricing Breakdown */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-[#f8f9fb] to-white border-[#283782]/20">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4">Fare Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-[#4b5563]">
            <span>Base Fare ({packageDetails.size.toUpperCase()})</span>
            <span className="font-semibold">₹{pricing.basePrice}</span>
          </div>
          <div className="flex justify-between text-[#4b5563]">
            <span>Distance Charge</span>
            <span className="font-semibold">₹{pricing.distanceCharge}</span>
          </div>
          {pricing.expressCharge > 0 && (
            <div className="flex justify-between text-[#fab023]">
              <span className="flex items-center gap-2">
                Express Delivery <span className="text-xs bg-[#fab023] text-white px-2 py-0.5 rounded-full">FAST</span>
              </span>
              <span className="font-semibold">₹{pricing.expressCharge}</span>
            </div>
          )}
          <div className="pt-4 border-t-2 border-gray-300 flex justify-between text-[#0e172a] text-xl">
            <span className="font-bold">Total Amount</span>
            <span className="font-bold text-[#283782]">₹{pricing.total}</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
          <p>💰 <strong>Save more:</strong> Use code <span className="font-mono font-bold">FIRST50</span> for ₹50 off on your first booking!</p>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          size="lg"
          variant="outline"
          onClick={onBack}
          className="border-gray-300"
        >
          Back to Schedule
        </Button>
        <Button
          size="lg"
          onClick={() => {
            checkPriceChange();
            onNext();
          }}
          className="bg-[#283782] hover:bg-[#1e2a61] text-white"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
