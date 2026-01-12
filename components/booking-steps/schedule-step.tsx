'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScheduleDetails } from '@/lib/booking-state';
import { AlertCircle, Calendar, Clock, Zap } from 'lucide-react';
import { useState } from 'react';

interface ScheduleStepProps {
  initialData: ScheduleDetails | null;
  isExpress: boolean;
  onNext: (data: ScheduleDetails) => void;
  onBack: () => void;
}

const timeSlots = [
  { id: '9-12', label: '9:00 AM - 12:00 PM', available: true },
  { id: '12-3', label: '12:00 PM - 3:00 PM', available: true },
  { id: '3-6', label: '3:00 PM - 6:00 PM', available: true },
  { id: '6-9', label: '6:00 PM - 9:00 PM', available: false },
];

export function ScheduleStep({ initialData, isExpress, onNext, onBack }: ScheduleStepProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const [selectedDate, setSelectedDate] = useState<string>(
    initialData?.pickupDate || tomorrow.toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>(initialData?.pickupTime || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const availableDates = [
    { value: tomorrow.toISOString().split('T')[0], label: `Tomorrow - ${formatDate(tomorrow)}`, tag: isExpress ? 'FASTEST' : '' },
    { value: dayAfter.toISOString().split('T')[0], label: formatDate(dayAfter), tag: '' },
  ];

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedDate) {
      newErrors.date = 'Please select a pickup date';
    }

    if (!selectedTime) {
      newErrors.time = 'Please select a time slot';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      pickupDate: selectedDate,
      pickupTime: selectedTime,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-heading text-[#0e172a] mb-2">Schedule Pickup</h2>
        <p className="text-[#4b5563]">Choose your preferred pickup date and time</p>
      </div>

      {/* Express Notice */}
      {isExpress && (
        <Card className="p-4 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-[#fab023]">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#fab023] mt-0.5" />
            <div>
              <p className="font-semibold text-[#d06715]">Express Delivery Selected</p>
              <p className="text-sm text-[#4b5563] mt-1">
                Your package will be delivered on the same day if picked up by 12:00 PM
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Date Selection */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#3f76f3]" />
          Select Pickup Date
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableDates.map((date) => (
            <button
              key={date.value}
              onClick={() => {
                setSelectedDate(date.value);
                setErrors((prev) => ({ ...prev, date: '' }));
              }}
              className={`p-5 rounded-[20px] border-2 transition-all text-left relative ${
                selectedDate === date.value
                  ? 'border-[#283782] bg-[#283782]/5 shadow-md'
                  : 'border-gray-200 hover:border-[#283782]/30'
              }`}
            >
              {date.tag && (
                <span className="absolute top-3 right-3 bg-[#fab023] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {date.tag}
                </span>
              )}
              <div className="text-2xl mb-2">📅</div>
              <div className="font-semibold text-[#0e172a]">{date.label}</div>
              {date.value === availableDates[0].value && (
                <div className="text-xs text-[#4b5563] mt-1">Next available slot</div>
              )}
            </button>
          ))}
        </div>

        {errors.date && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
            <p className="text-red-600 text-sm">{errors.date}</p>
          </div>
        )}
      </Card>

      {/* Time Slot Selection */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#0e172a] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#3f76f3]" />
          Select Time Slot
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => {
                if (slot.available) {
                  setSelectedTime(slot.label);
                  setErrors((prev) => ({ ...prev, time: '' }));
                }
              }}
              disabled={!slot.available}
              className={`p-4 rounded-[20px] border-2 transition-all text-left ${
                selectedTime === slot.label
                  ? 'border-[#283782] bg-[#283782]/5 shadow-md'
                  : slot.available
                  ? 'border-gray-200 hover:border-[#283782]/30'
                  : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0e172a]">{slot.label}</div>
                  {!slot.available && (
                    <div className="text-xs text-red-500 mt-1">Not available</div>
                  )}
                </div>
                <div className="text-2xl">{slot.available ? '⏰' : '🚫'}</div>
              </div>
            </button>
          ))}
        </div>

        {errors.time && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
            <p className="text-red-600 text-sm">{errors.time}</p>
          </div>
        )}

        {isExpress && selectedTime && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Your package will be delivered on the same day with this time slot
            </p>
          </div>
        )}
      </Card>

      {/* Additional Info */}
      <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Pickup Guidelines</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Please have your package ready 15 minutes before the selected time</li>
          <li>Our delivery partner will arrive within the selected time window</li>
          <li>You'll receive SMS and email notifications before pickup</li>
          <li>Same-day delivery available for pickups before 12:00 PM (Express only)</li>
        </ul>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          size="lg"
          variant="outline"
          onClick={onBack}
          className="border-gray-300"
        >
          Back to Package
        </Button>
        <Button
          size="lg"
          onClick={validateAndNext}
          disabled={!selectedDate || !selectedTime}
          className="bg-[#283782] hover:bg-[#1e2a61] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Summary
        </Button>
      </div>
    </div>
  );
}
