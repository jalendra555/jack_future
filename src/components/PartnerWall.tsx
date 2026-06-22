import { PARTNERS } from '../data';

export default function PartnerWall() {
  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8 font-medium">
          TRUSTED BY LEADERS IN ENTERPRISE TECHNOLOGY
        </p>
        
        {/* Responsive grid with brand identities */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-10 items-center justify-center opacity-40 grayscale hover:opacity-75 transition-opacity duration-500">
          {PARTNERS.map((partner) => (
            <div 
              key={partner} 
              className="flex items-center justify-center hover:scale-105 duration-300 transition-all cursor-default select-none"
            >
              <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 border-b border-black/10 pb-1">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
