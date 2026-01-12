'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookingState } from '@/lib/booking-state';
import { Calendar, Check, CheckCircle, Copy, Mail, MapPin, Package, Phone } from 'lucide-react';
import { useState } from 'react';

interface ConfirmationStepProps {
  bookingData: BookingState;
  onNewBooking: () => void;
}

export function ConfirmationStep({ bookingData, onNewBooking }: ConfirmationStepProps) {
  const { bookingReference, deliveryDetails, packageDetails, scheduleDetails, userDetails, pricing } = bookingData;
  const [copied, setCopied] = useState(false);

  const copyBookingRef = () => {
    if (bookingReference) {
      navigator.clipboard.writeText(bookingReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!bookingReference) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold font-heading text-[#0e172a] mb-2">
          Booking Confirmed! 🎉
        </h2>
        <p className="text-[#4b5563]">Your delivery has been scheduled successfully</p>
      </div>

      {/* Booking Reference */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-[#283782] to-[#3f76f3] text-white">
        <div className="text-center">
          <p className="text-sm opacity-90 mb-2">Your Booking Reference</p>
          <div className="flex items-center justify-center gap-3">
            <div className="text-3xl font-bold font-mono tracking-wider">{bookingReference}</div>
            <button
              onClick={copyBookingRef}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy booking reference"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs opacity-75 mt-2">Save this reference number for tracking</p>
        </div>
      </Card>

      {/* Booking Summary */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4">Booking Summary</h3>
        
        <div className="space-y-4">
          {/* Pickup Schedule */}
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <Calendar className="w-5 h-5 text-[#3f76f3] mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-[#0e172a]">Pickup Schedule</div>
              <div className="text-sm text-[#4b5563] mt-1">
                {scheduleDetails && new Date(scheduleDetails.pickupDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="text-sm text-[#4b5563]">{scheduleDetails?.pickupTime}</div>
            </div>
          </div>

          {/* Addresses */}
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-[#0e172a] mb-2">Delivery Route</div>
              <div className="text-sm text-[#4b5563]">
                <div className="font-medium">From:</div>
                <div>{deliveryDetails?.pickupAddress.street}, {deliveryDetails?.pickupAddress.city}</div>
                <div className="my-2 border-l-2 border-dashed border-gray-300 h-4 ml-2"></div>
                <div className="font-medium">To:</div>
                <div>{deliveryDetails?.dropAddress.street}, {deliveryDetails?.dropAddress.city}</div>
              </div>
            </div>
          </div>

          {/* Package Info */}
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <Package className="w-5 h-5 text-purple-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-[#0e172a]">Package Details</div>
              <div className="text-sm text-[#4b5563] mt-1">
                Size: <span className="font-medium uppercase">{packageDetails?.size}</span>
                {packageDetails?.weight && <> • Weight: {packageDetails.weight} kg</>}
              </div>
              <div className="text-sm text-[#4b5563]">{packageDetails?.description}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#0e172a] mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-[#4b5563]" />
              <span className="text-[#4b5563]">{userDetails?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-[#4b5563]" />
              <span className="text-[#4b5563]">{userDetails?.email}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#0e172a] mb-4">Payment Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[#4b5563]">
              <span>Amount</span>
              <span className="font-semibold">₹{pricing?.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4b5563]">Payment Method</span>
              <span className="font-semibold text-[#283782]">Cash on Pickup</span>
            </div>
          </div>
        </Card>
      </div>

      {/* What's Next */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-[#f8f9fb] to-white border-[#283782]/20">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4">What Happens Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#283782] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <div className="font-semibold text-[#0e172a]">SMS & Email Confirmation</div>
              <div className="text-sm text-[#4b5563]">You'll receive booking details and tracking link shortly</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#283782] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <div className="font-semibold text-[#0e172a]">Partner Assignment</div>
              <div className="text-sm text-[#4b5563]">We'll assign a delivery partner and notify you</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#283782] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <div className="font-semibold text-[#0e172a]">Pickup Reminder</div>
              <div className="text-sm text-[#4b5563]">Get notified 30 minutes before pickup time</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#283782] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              4
            </div>
            <div>
              <div className="font-semibold text-[#0e172a]">Real-time Tracking</div>
              <div className="text-sm text-[#4b5563]">Track your package live once picked up</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          size="lg"
          variant="outline"
          className="border-[#283782] text-[#283782] hover:bg-[#283782]/5"
        >
          Track Order
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-[#283782] text-[#283782] hover:bg-[#283782]/5"
        >
          Contact Support
        </Button>
        <Button
          size="lg"
          onClick={onNewBooking}
          className="bg-[#283782] hover:bg-[#1e2a61] text-white"
        >
          New Booking
        </Button>
      </div>

      {/* Help Section */}
      <Card className="p-4 mt-6 bg-blue-50 border-blue-200">
        <div className="text-sm text-blue-900 text-center">
          <p className="font-semibold mb-1">Need Help?</p>
          <p>
            Contact us at <a href="tel:18001234567" className="underline font-semibold">1800-123-4567</a> or{' '}
            <a href="mailto:support@letsshyp.com" className="underline font-semibold">support@letsshyp.com</a>
          </p>
        </div>
      </Card>
    </div>
  );
}
