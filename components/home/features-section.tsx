'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Map, Shield, DollarSign, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Lightning Fast',
    description: 'Same-day delivery for all local orders. Your package delivered within hours, not days.',
    color: 'bg-[#fab023]/10 text-[#fab023]'
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: 'Live Tracking',
    description: 'Track your delivery in real-time from pickup to drop-off. Know exactly where your package is.',
    color: 'bg-[#3f76f3]/10 text-[#3f76f3]'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Secure & Safe',
    description: 'Professional couriers handle your packages with care. Insurance coverage on all deliveries.',
    color: 'bg-green-500/10 text-green-600'
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise charges. What you see is what you pay - simple and straightforward.',
    color: 'bg-[#283782]/10 text-[#283782]'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Flexible Scheduling',
    description: 'Schedule pickups at your convenience. Same-day, next-day, or plan ahead for future deliveries.',
    color: 'bg-[#d06715]/10 text-[#d06715]'
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: '24/7 Support',
    description: 'Customer support available round the clock. We\'re here to help whenever you need us.',
    color: 'bg-[#3f76f3]/10 text-[#3f76f3]'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f8f9fb]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-4 bg-[#283782]/10 rounded-full">
            <span className="text-sm font-semibold text-[#283782]">WHY CHOOSE US</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-[#0e172a] mb-4">
            Why Choose Let&apos;s Shyp?
          </h2>
          <p className="text-lg text-[#4b5563] max-w-2xl mx-auto">
            The fastest and most reliable delivery service in town. Experience the difference with our premium logistics platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-lg hover:-translate-y-1 border-gray-200">
              <CardHeader>
                <div className={`flex items-center justify-center h-16 w-16 rounded-xl ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#4b5563] text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
