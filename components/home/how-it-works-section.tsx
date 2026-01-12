'use client';

import { Calendar, CreditCard, MapPin, Package } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Enter Pickup & Drop Location',
    description: 'Provide pickup and delivery addresses to get started. We calculate the best route for you.',
    icon: <MapPin className="w-6 h-6" />
  },
  {
    number: '02',
    title: 'Select Package Type',
    description: 'Choose your package size - Small, Medium, or Large. Get instant pricing based on your selection.',
    icon: <Package className="w-6 h-6" />
  },
  {
    number: '03',
    title: 'Select Pickup Date',
    description: 'Schedule your preferred pickup time. Same-day, next-day, or plan ahead for future deliveries.',
    icon: <Calendar className="w-6 h-6" />
  },
  {
    number: '04',
    title: 'Checkout',
    description: 'Complete payment securely and confirm your delivery. Get instant booking confirmation.',
    icon: <CreditCard className="w-6 h-6" />
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-[90rem]">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-4 bg-[#fab023]/10 rounded-full">
            <span className="text-sm font-semibold text-[#d06715]">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-[#0e172a] mb-4">
            Delivery Made Simple
          </h2>
          <p className="text-lg text-[#4b5563] max-w-2xl mx-auto">
            Four easy steps to get your package delivered. Fast, simple, and reliable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#283782] via-[#3f76f3] to-[#fab023]" style={{ width: 'calc(100% - 10rem)', left: '5rem' }} />
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Step number circle */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#283782] to-[#071a75] text-white font-bold text-xl mb-4 shadow-lg">
                  {step.number}
                </div>
                
                {/* Icon below the number */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#283782] text-[#283782] mb-4 shadow-sm">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-[#0e172a] mb-3 whitespace-nowrap">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
