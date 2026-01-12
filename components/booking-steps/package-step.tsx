'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DeliveryDetails, PackageDetails, PricingBreakdown } from '@/lib/booking-state';
import { AlertCircle, Info, Package } from 'lucide-react';
import { useState } from 'react';

interface PackageStepProps {
  initialData: PackageDetails | null;
  deliveryDetails: DeliveryDetails;
  onNext: (data: PackageDetails, pricing: PricingBreakdown) => void;
  onBack: () => void;
}

const packageSizes = [
  {
    id: 'small' as const,
    name: 'Small',
    dimensions: 'Up to 30cm x 20cm x 15cm',
    maxWeight: '2 kg',
    price: 0,
    examples: 'Documents, Books, Small Electronics',
    icon: '📦',
  },
  {
    id: 'medium' as const,
    name: 'Medium',
    dimensions: 'Up to 50cm x 40cm x 30cm',
    maxWeight: '5 kg',
    price: 30,
    examples: 'Clothes, Shoes, Medium Electronics',
    icon: '📦📦',
  },
  {
    id: 'large' as const,
    name: 'Large',
    dimensions: 'Up to 80cm x 60cm x 50cm',
    maxWeight: '15 kg',
    price: 60,
    examples: 'Furniture Parts, Large Electronics, Multiple Items',
    icon: '📦📦📦',
  },
];

export function PackageStep({ initialData, deliveryDetails, onNext, onBack }: PackageStepProps) {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>(
    initialData?.size || 'small'
  );
  const [weight, setWeight] = useState(initialData?.weight?.toString() || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPriceChange, setShowPriceChange] = useState(false);

  const selectedPackage = packageSizes.find((p) => p.id === selectedSize)!;
  const maxWeight = parseInt(selectedPackage.maxWeight);

  // Edge case #3: Price change after package selection
  const calculatePricing = (): PricingBreakdown => {
    const basePrice = 50 + selectedPackage.price;
    const distanceCharge = Math.floor(Math.random() * 50) + 20;
    const expressCharge = deliveryDetails.deliveryType === 'express' ? 100 : 0;
    const total = basePrice + distanceCharge + expressCharge;

    return {
      basePrice,
      distanceCharge,
      expressCharge,
      total,
    };
  };

  const pricing = calculatePricing();

  const handleSizeChange = (size: 'small' | 'medium' | 'large') => {
    if (size !== selectedSize) {
      setShowPriceChange(true);
      setTimeout(() => setShowPriceChange(false), 3000);
    }
    setSelectedSize(size);
    setWeight('');
    setErrors({});
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (weight) {
      const weightNum = parseFloat(weight);
      if (isNaN(weightNum) || weightNum <= 0) {
        newErrors.weight = 'Please enter a valid weight';
      } else if (weightNum > maxWeight) {
        newErrors.weight = `Weight exceeds maximum limit of ${maxWeight} kg for ${selectedPackage.name} package`;
      }
    }

    if (!description.trim()) {
      newErrors.description = 'Package description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(
      {
        size: selectedSize,
        weight: weight ? parseFloat(weight) : undefined,
        description,
      },
      pricing
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-heading text-[#0e172a] mb-2">Package Details</h2>
        <p className="text-[#4b5563]">Select your package size and provide details</p>
      </div>

      {/* Package Size Selection */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#3f76f3]" />
          Select Package Size
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {packageSizes.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handleSizeChange(pkg.id)}
              className={`p-5 rounded-[20px] border-2 transition-all text-left ${
                selectedSize === pkg.id
                  ? 'border-[#283782] bg-[#283782]/5 shadow-md'
                  : 'border-gray-200 hover:border-[#283782]/30'
              }`}
            >
              <div className="text-3xl mb-3">{pkg.icon}</div>
              <div className="font-semibold text-[#0e172a] text-lg mb-1">{pkg.name}</div>
              <div className="text-sm text-[#4b5563] mb-2">{pkg.dimensions}</div>
              <div className="text-xs text-[#283782] font-semibold mb-3">Max: {pkg.maxWeight}</div>
              <div className="text-xs text-[#4b5563] leading-relaxed">{pkg.examples}</div>
              {pkg.price > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-sm font-semibold text-[#283782]">+₹{pkg.price}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Price Change Alert - Edge case #3 */}
        {showPriceChange && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 animate-pulse">
            <Info className="w-4 h-4 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-800">
              Price updated based on selected package size
            </p>
          </div>
        )}

        {/* Size Constraints Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Size Guidelines for {selectedPackage.name}</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Maximum dimensions: {selectedPackage.dimensions}</li>
                <li>Maximum weight: {selectedPackage.maxWeight}</li>
                <li>Suitable for: {selectedPackage.examples}</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Weight Input */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4">Package Weight</h3>
        <div>
          <label className="block text-sm font-medium text-[#0e172a] mb-2">
            Weight (kg) <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max={maxWeight}
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
              setErrors((prev) => ({ ...prev, weight: '' }));
            }}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.weight ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
            placeholder={`Enter weight (max ${maxWeight} kg)`}
          />
          {errors.weight && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
              <p className="text-red-600 text-sm">{errors.weight}</p>
            </div>
          )}
          {weight && !errors.weight && parseFloat(weight) <= maxWeight && (
            <p className="text-green-600 text-sm mt-2">✓ Weight is within the limit</p>
          )}
        </div>
      </Card>

      {/* Package Description */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4">
          Package Description <span className="text-red-500">*</span>
        </h3>
        <div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: '' }));
            }}
            rows={4}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent resize-none`}
            placeholder="Describe your package contents (e.g., Books - 3 novels and 2 textbooks)"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-xs text-[#4b5563] mt-2">
            Be specific about contents for better handling and insurance coverage
          </p>
        </div>
      </Card>

      {/* Pricing Preview */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-[#f8f9fb] to-white border-[#283782]/20">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4">Pricing Preview</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-[#4b5563]">
            <span>Base Fare ({selectedPackage.name})</span>
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
          <div className="pt-3 border-t border-gray-300 flex justify-between text-[#0e172a] text-lg">
            <span className="font-bold">Estimated Total</span>
            <span className="font-bold text-[#283782]">₹{pricing.total}</span>
          </div>
        </div>
        <p className="text-xs text-[#4b5563] mt-3 italic">* Final price may vary based on exact distance and schedule</p>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          size="lg"
          variant="outline"
          onClick={onBack}
          className="border-gray-300"
        >
          Back to Addresses
        </Button>
        <Button
          size="lg"
          onClick={validateAndNext}
          disabled={!description.trim()}
          className="bg-[#283782] hover:bg-[#1e2a61] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Schedule
        </Button>
      </div>
    </div>
  );
}
