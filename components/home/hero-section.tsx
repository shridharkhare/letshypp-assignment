'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check, CheckCircle2, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover brightness-90"
          priority
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 max-w-5xl mx-auto">
        <div className="inline-block px-4 py-2 mb-6 bg-[#fab023]/20 backdrop-blur-sm border border-[#fab023]/30 rounded-full">
          <span className="text-sm font-medium text-[#fab023]">🚀 Same-Day Delivery Available</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight font-heading">
          Same-Day Delivery,
          <br />
          <span className="text-[#fab023]">Simplified.</span>
        </h1>
        
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 leading-relaxed">
          Your trusted partner for fast, reliable, and hassle-free local deliveries. 
          Get your packages where they need to go, when they need to be there.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 mt-10">
            <Link href="/booking" className="cursor-pointer">
            <Button size="lg" className="cursor-pointer bg-[#283782] hover:bg-[#1e2a61] text-white shadow-lg shadow-[#283782]/30 transition-all hover:shadow-xl hover:shadow-[#283782]/50">
              <Check className="w-5 h-5 mr-2" />
              Book a Delivery Now
            </Button>
            </Link>
            
            <Link href="#how-it-works" className="cursor-pointer">
            <Button size="lg" variant="outline" className="cursor-pointer bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              <Info className="w-5 h-5 mr-2" />
              Learn More
            </Button>
            </Link>
        </div>
        
        <div className="flex items-center gap-8 mt-12 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#fab023]" />
            <span>No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#fab023]" />
            <span>Real-Time Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#fab023]" />
            <span>Trusted Couriers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
