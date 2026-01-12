export interface PlaceholderImage {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
}

export const PlaceHolderImages: PlaceholderImage[] = [
  {
    id: 'landing-hero',
    imageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2000&auto=format&fit=crop',
    description: 'Delivery driver on motorcycle with package',
    imageHint: 'Fast delivery service with motorcycle courier'
  },
  {
    id: 'feature-speed',
    imageUrl: 'https://images.unsplash.com/photo-1591768575417-7a5e5f1f6c21?q=80&w=800&auto=format&fit=crop',
    description: 'Speed and efficiency in delivery',
    imageHint: 'Quick and efficient delivery service'
  },
  {
    id: 'feature-tracking',
    imageUrl: 'https://images.unsplash.com/photo-1601933470096-0e34634ffcde?q=80&w=800&auto=format&fit=crop',
    description: 'Real-time package tracking',
    imageHint: 'GPS tracking for deliveries'
  },
  {
    id: 'feature-secure',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    description: 'Secure package handling',
    imageHint: 'Safe and reliable delivery service'
  }
];
