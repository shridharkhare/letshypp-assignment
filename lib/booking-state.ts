// Booking types
export interface Address {
  street: string;
  city: string;
  zipCode: string;
  landmark?: string;
}

export interface DeliveryDetails {
  pickupAddress: Address;
  dropAddress: Address;
  deliveryInstructions?: string;
  deliveryType: 'express' | 'normal';
}

export interface PackageDetails {
  size: 'small' | 'medium' | 'large';
  weight?: number;
  description?: string;
}

export interface ScheduleDetails {
  pickupDate: string;
  pickupTime: string;
}

export interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

export interface PricingBreakdown {
  basePrice: number;
  distanceCharge: number;
  expressCharge: number;
  total: number;
}

export interface BookingState {
  currentStep: number;
  deliveryDetails: DeliveryDetails | null;
  packageDetails: PackageDetails | null;
  scheduleDetails: ScheduleDetails | null;
  userDetails: UserDetails | null;
  pricing: PricingBreakdown | null;
  bookingReference: string | null;
  errors: Record<string, string>;
  isServiceable: boolean | null;
  isLoading: boolean;
}

export type BookingAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_DELIVERY_DETAILS'; payload: DeliveryDetails }
  | { type: 'SET_PACKAGE_DETAILS'; payload: PackageDetails }
  | { type: 'SET_SCHEDULE_DETAILS'; payload: ScheduleDetails }
  | { type: 'SET_USER_DETAILS'; payload: UserDetails }
  | { type: 'SET_PRICING'; payload: PricingBreakdown }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string }
  | { type: 'SET_SERVICEABILITY'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'COMPLETE_BOOKING'; payload: string }
  | { type: 'RESET' };

export const initialBookingState: BookingState = {
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

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'SET_DELIVERY_DETAILS':
      return { ...state, deliveryDetails: action.payload };
    
    case 'SET_PACKAGE_DETAILS':
      return { ...state, packageDetails: action.payload };
    
    case 'SET_SCHEDULE_DETAILS':
      return { ...state, scheduleDetails: action.payload };
    
    case 'SET_USER_DETAILS':
      return { ...state, userDetails: action.payload };
    
    case 'SET_PRICING':
      return { ...state, pricing: action.payload };
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.payload.field]: action.payload.message },
      };
    
    case 'CLEAR_ERROR':
      const newErrors = { ...state.errors };
      delete newErrors[action.payload];
      return { ...state, errors: newErrors };
    
    case 'SET_SERVICEABILITY':
      return { ...state, isServiceable: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'COMPLETE_BOOKING':
      return { ...state, bookingReference: action.payload, currentStep: 6 };
    
    case 'RESET':
      return initialBookingState;
    
    default:
      return state;
  }
}

// Utility functions
export function calculatePricing(
  deliveryDetails: DeliveryDetails,
  packageDetails: PackageDetails
): PricingBreakdown {
  const basePrice = 50;
  
  // Package size pricing
  const sizePricing = {
    small: 0,
    medium: 30,
    large: 60,
  };
  
  // Mock distance calculation (in real app, use geocoding API)
  const distanceCharge = Math.floor(Math.random() * 50) + 20;
  
  // Express delivery charge
  const expressCharge = deliveryDetails.deliveryType === 'express' ? 100 : 0;
  
  const total = basePrice + sizePricing[packageDetails.size] + distanceCharge + expressCharge;
  
  return {
    basePrice: basePrice + sizePricing[packageDetails.size],
    distanceCharge,
    expressCharge,
    total,
  };
}

export function checkServiceability(address: Address): boolean {
  // Mock unserviceable areas (simulate edge case)
  const unserviceableZipCodes = ['000000', '999999', '111111'];
  return !unserviceableZipCodes.includes(address.zipCode);
}

export function generateBookingReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `LS-${timestamp}${random}`.toUpperCase();
}
