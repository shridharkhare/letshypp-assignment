'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-[#0f1729] text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
          Ready to Ship Your Package?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust Let&apos;s Shyp for their delivery needs. 
          Get started in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking">
            <Button size="lg" className="bg-[#283782] hover:bg-[#1e2a61] text-white shadow-lg shadow-[#283782]/50 transition-all hover:shadow-xl hover:shadow-[#283782]/60">
              <ArrowRight className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button size="lg" variant="outline" className="bg-white border-2 border-white text-[#0f1729] hover:bg-transparent hover:text-white hover:border-white transition-all">
              <Mail className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Have questions? Call us at{' '}
            <a href="tel:1-800-LETSHYP" className="text-[#3f76f3] hover:text-[#fab023] font-semibold">
              1-800-LETSHYP
            </a>{' '}
            or email{' '}
            <a href="mailto:support@letshyp.com" className="text-[#3f76f3] hover:text-[#fab023] font-semibold">
              support@letshyp.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
