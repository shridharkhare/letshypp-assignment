'use client';

const stats = [
  { value: '50K+', label: 'Deliveries Completed' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '98%', label: 'On-Time Rate' },
  { value: '4.9/5', label: 'Average Rating' }
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#283782] to-[#071a75] text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-[#fab023]/80 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
