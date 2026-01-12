'use client';

import { AddressStep } from '@/components/booking-steps/address-step';
import { CheckoutStep } from '@/components/booking-steps/checkout-step';
import { ConfirmationStep } from '@/components/booking-steps/confirmation-step';
import { PackageStep } from '@/components/booking-steps/package-step';
import { ScheduleStep } from '@/components/booking-steps/schedule-step';
import { SummaryStep } from '@/components/booking-steps/summary-step';
import { Button } from '@/components/ui/button';
import {
    bookingReducer,
    BookingState,
    DeliveryDetails,
    PackageDetails,
    PricingBreakdown,
    ScheduleDetails,
    UserDetails
} from '@/lib/booking-state';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { useReducer } from 'react';

const steps = [
  { id: 1, name: 'Pickup & Drop', description: 'Enter addresses' },
  { id: 2, name: 'Package', description: 'Package details' },
  { id: 3, name: 'Schedule', description: 'Pickup time' },
  { id: 4, name: 'Summary', description: 'Review order' },
  { id: 5, name: 'Checkout', description: 'Payment' },
  { id: 6, name: 'Confirmation', description: 'Complete' },
];

const initialState: BookingState = {
  currentStep: 1,
  deliveryDetails: null,
  packageDetails: null,
  scheduleDetails: null,
  userDetails: null,
  pricing: null,
  bookingReference: null,
  errors: {},
  isServiceable: null,
  isLoading: false,
};

export default function BookingPage() {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const handleAddressNext = (delivery: DeliveryDetails, serviceable: boolean) => {
    dispatch({ type: 'SET_DELIVERY_DETAILS', payload: delivery });
    dispatch({ type: 'SET_SERVICEABILITY', payload: serviceable });
    if (serviceable) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
    }
  };

  const handlePackageNext = (pkg: PackageDetails, pricing: PricingBreakdown) => {
    dispatch({ type: 'SET_PACKAGE_DETAILS', payload: pkg });
    dispatch({ type: 'SET_PRICING', payload: pricing });
    dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
  };

  const handleScheduleNext = (schedule: ScheduleDetails) => {
    dispatch({ type: 'SET_SCHEDULE_DETAILS', payload: schedule });
    dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
  };

  const handleSummaryNext = () => {
    dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
  };

  const handleCheckoutNext = (user: UserDetails) => {
    dispatch({ type: 'SET_USER_DETAILS', payload: user });
    // Generate booking reference
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    const bookingRef = `LS-${timestamp}${random}`.toUpperCase();
    dispatch({ type: 'COMPLETE_BOOKING', payload: bookingRef });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
  };

  const handleEditStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const handleNewBooking = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fb] via-white to-[#f1f5f9]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-gray-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#0e172a]">
                  Let's <span className="text-[#283782]">Shyp</span>
                </h1>
                <p className="text-sm text-[#4b5563]">Quick & Reliable Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      {state.currentStep < 6 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {steps.slice(0, 5).map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        state.currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : state.currentStep === step.id
                          ? 'bg-[#283782] text-white ring-4 ring-[#283782]/20'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {state.currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-semibold ${
                          state.currentStep >= step.id
                            ? 'text-[#0e172a]'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.name}
                      </div>
                      <div className="text-xs text-[#4b5563] hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < 4 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all ${
                        state.currentStep > step.id
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.currentStep === 1 && (
          <AddressStep
            initialData={state.deliveryDetails}
            onNext={handleAddressNext}
          />
        )}

        {state.currentStep === 2 && state.deliveryDetails && (
          <PackageStep
            initialData={state.packageDetails}
            deliveryDetails={state.deliveryDetails}
            onNext={handlePackageNext}
            onBack={handleBack}
          />
        )}

        {state.currentStep === 3 && state.deliveryDetails && (
          <ScheduleStep
            initialData={state.scheduleDetails}
            isExpress={state.deliveryDetails.deliveryType === 'express'}
            onNext={handleScheduleNext}
            onBack={handleBack}
          />
        )}

        {state.currentStep === 4 && (
          <SummaryStep
            bookingData={state}
            onNext={handleSummaryNext}
            onBack={handleBack}
            onEdit={handleEditStep}
          />
        )}

        {state.currentStep === 5 && state.pricing && (
          <CheckoutStep
            initialData={state.userDetails}
            totalAmount={state.pricing.total}
            onNext={handleCheckoutNext}
            onBack={handleBack}
          />
        )}

        {state.currentStep === 6 && (
          <ConfirmationStep
            bookingData={state}
            onNewBooking={handleNewBooking}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-[#4b5563]">
            <p>Need help? Contact us at <a href="tel:18001234567" className="text-[#3f76f3] font-semibold">1800-123-4567</a></p>
            <p className="mt-2">© 2024 Let's Shyp. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
