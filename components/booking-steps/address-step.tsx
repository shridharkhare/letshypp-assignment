import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Address, checkServiceability, DeliveryDetails } from '@/lib/booking-state';
import { AlertCircle, Clock, MapPin, Zap } from 'lucide-react';
import { useState } from 'react';

interface AddressStepProps {
  initialData: DeliveryDetails | null;
  onNext: (data: DeliveryDetails, serviceable: boolean) => void;
}

export function AddressStep({ initialData, onNext }: AddressStepProps) {
  const [pickupAddress, setPickupAddress] = useState<Address>(
    initialData?.pickupAddress || { street: '', city: '', zipCode: '', landmark: '' }
  );
  const [dropAddress, setDropAddress] = useState<Address>(
    initialData?.dropAddress || { street: '', city: '', zipCode: '', landmark: '' }
  );
  const [deliveryInstructions, setDeliveryInstructions] = useState(initialData?.deliveryInstructions || '');
  const [deliveryType, setDeliveryType] = useState<'express' | 'normal'>(initialData?.deliveryType || 'normal');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serviceabilityError, setServiceabilityError] = useState('');

  const validateAddress = (address: Address, prefix: string): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!address.street.trim()) {
      newErrors[`${prefix}Street`] = 'Street address is required';
    }
    if (!address.city.trim()) {
      newErrors[`${prefix}City`] = 'City is required';
    }
    if (!address.zipCode.trim()) {
      newErrors[`${prefix}ZipCode`] = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(address.zipCode)) {
      newErrors[`${prefix}ZipCode`] = 'ZIP code must be 6 digits';
    }
    
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setServiceabilityError('');
    const isPickupValid = validateAddress(pickupAddress, 'pickup');
    const isDropValid = validateAddress(dropAddress, 'drop');
    
    if (!isPickupValid || !isDropValid) {
      return;
    }

    // Check serviceability (Edge case #2: Unserviceable area handling)
    const pickupServiceable = checkServiceability(pickupAddress);
    const dropServiceable = checkServiceability(dropAddress);
    
    if (!pickupServiceable) {
      setServiceabilityError('Pickup location is not serviceable. Please try a different address.');
      onNext({
        pickupAddress,
        dropAddress,
        deliveryInstructions,
        deliveryType,
      }, false);
      return;
    }
    if (!dropServiceable) {
      setServiceabilityError('Drop location is not serviceable. Please try a different address.');
      onNext({
        pickupAddress,
        dropAddress,
        deliveryInstructions,
        deliveryType,
      }, false);
      return;
    }

    onNext({
      pickupAddress,
      dropAddress,
      deliveryInstructions,
      deliveryType,
    }, true);
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    const hasPickupAddress = pickupAddress.street.trim() && pickupAddress.city.trim() && pickupAddress.zipCode.trim();
    const hasDropAddress = dropAddress.street.trim() && dropAddress.city.trim() && dropAddress.zipCode.trim();
    
    // Check if ZIP codes are valid format
    const isPickupZipValid = /^\d{6}$/.test(pickupAddress.zipCode);
    const isDropZipValid = /^\d{6}$/.test(dropAddress.zipCode);
    
    // Check if there are any active errors (non-empty error messages)
    const hasNoErrors = Object.values(errors).every(error => !error);
    
    return hasPickupAddress && hasDropAddress && isPickupZipValid && isDropZipValid && hasNoErrors;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-heading text-[#0e172a] mb-2">Pickup & Drop Details</h2>
        <p className="text-[#4b5563]">Enter your pickup and delivery addresses to get started</p>
      </div>

      {/* Edge case #1: Express vs Normal delivery clarity */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#fab023]" />
          Select Delivery Speed
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setDeliveryType('normal')}
            className={`p-4 rounded-[20px] border-2 transition-all text-left ${
              deliveryType === 'normal'
                ? 'border-[#283782] bg-[#283782]/5'
                : 'border-gray-200 hover:border-[#283782]/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <Clock className={`w-6 h-6 mt-1 ${deliveryType === 'normal' ? 'text-[#283782]' : 'text-gray-400'}`} />
              <div>
                <div className="font-semibold text-[#0e172a] mb-1">Normal Delivery</div>
                <div className="text-sm text-[#4b5563]">Delivered within 24 hours</div>
                <div className="text-xs text-[#283782] font-semibold mt-2">Standard pricing</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setDeliveryType('express')}
            className={`p-4 rounded-[20px] border-2 transition-all text-left ${
              deliveryType === 'express'
                ? 'border-[#fab023] bg-[#fab023]/5'
                : 'border-gray-200 hover:border-[#fab023]/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <Zap className={`w-6 h-6 mt-1 ${deliveryType === 'express' ? 'text-[#fab023]' : 'text-gray-400'}`} />
              <div>
                <div className="font-semibold text-[#0e172a] mb-1 flex items-center gap-2">
                  Express Delivery
                  <span className="text-xs bg-[#fab023] text-white px-2 py-0.5 rounded-full">FAST</span>
                </div>
                <div className="text-sm text-[#4b5563]">Delivered within 3-4 hours</div>
                <div className="text-xs text-[#d06715] font-semibold mt-2">+₹100 additional charge</div>
              </div>
            </div>
          </button>
        </div>
      </Card>

      {/* Pickup Address */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#3f76f3]" />
          Pickup Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pickupAddress.street}
              onChange={(e) => {
                setPickupAddress({ ...pickupAddress, street: e.target.value });
                setErrors((prev) => ({ ...prev, pickupStreet: '' }));
              }}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.pickupStreet ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
              placeholder="Enter street address"
            />
            {errors.pickupStreet && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupStreet}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pickupAddress.city}
              onChange={(e) => {
                setPickupAddress({ ...pickupAddress, city: e.target.value });
                setErrors((prev) => ({ ...prev, pickupCity: '' }));
              }}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.pickupCity ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
              placeholder="Enter city"
            />
            {errors.pickupCity && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupCity}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pickupAddress.zipCode}
              onChange={(e) => {
                setPickupAddress({ ...pickupAddress, zipCode: e.target.value });
                setErrors((prev) => ({ ...prev, pickupZipCode: '' }));
              }}
              maxLength={6}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.pickupZipCode ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
              placeholder="Enter 6-digit ZIP"
            />
            {errors.pickupZipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupZipCode}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              Landmark (Optional)
            </label>
            <input
              type="text"
              value={pickupAddress.landmark}
              onChange={(e) => setPickupAddress({ ...pickupAddress, landmark: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent"
              placeholder="Nearby landmark for easy identification"
            />
          </div>
        </div>
      </Card>

      {/* Drop Address */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#fab023]" />
          Drop Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dropAddress.street}
              onChange={(e) => {
                setDropAddress({ ...dropAddress, street: e.target.value });
                setErrors((prev) => ({ ...prev, dropStreet: '' }));
              }}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.dropStreet ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
              placeholder="Enter street address"
            />
            {errors.dropStreet && (
              <p className="text-red-500 text-sm mt-1">{errors.dropStreet}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dropAddress.city}
              onChange={(e) => {
                setDropAddress({ ...dropAddress, city: e.target.value });
                setErrors((prev) => ({ ...prev, dropCity: '' }));
              }}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.dropCity ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
              placeholder="Enter city"
            />
            {errors.dropCity && (
              <p className="text-red-500 text-sm mt-1">{errors.dropCity}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dropAddress.zipCode}
              onChange={(e) => {
                setDropAddress({ ...dropAddress, zipCode: e.target.value });
                setErrors((prev) => ({ ...prev, dropZipCode: '' }));
              }}
              maxLength={6}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.dropZipCode ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent`}
              placeholder="Enter 6-digit ZIP"
            />
            {errors.dropZipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.dropZipCode}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0e172a] mb-2">
              Landmark (Optional)
            </label>
            <input
              type="text"
              value={dropAddress.landmark}
              onChange={(e) => setDropAddress({ ...dropAddress, landmark: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent"
              placeholder="Nearby landmark for easy identification"
            />
          </div>
        </div>
      </Card>

      {/* Delivery Instructions */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4">Delivery Instructions (Optional)</h3>
        <textarea
          value={deliveryInstructions}
          onChange={(e) => setDeliveryInstructions(e.target.value)}
          rows={4}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#283782] focus:border-transparent resize-none"
          placeholder="Add any special instructions for pickup or delivery..."
        />
      </Card>

      {/* Serviceability Error */}
      {serviceabilityError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800">{serviceabilityError}</p>
            <p className="text-sm text-red-600 mt-1">
              Try ZIP codes: 400001, 110001, 560001 for serviceable areas
            </p>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!isFormValid()}
          className="bg-[#283782] hover:bg-[#1e2a61] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Package Details
        </Button>
      </div>
    </div>
  );
}
