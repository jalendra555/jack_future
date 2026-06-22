import { useState } from 'react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onInitiateBooking: (serviceName: string) => void;
}

type FilterCategory = 'all' | 'engineering' | 'security-admin';

export default function Services({ onSelectService, onInitiateBooking }: ServicesProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // Categories helper mapping
  const getFilteredServices = () => {
    switch (activeFilter) {
      case 'engineering':
        return SERVICES.filter(s => ['cloud-devops', 'software-dev', 'digital-transformation'].includes(s.id));
      case 'security-admin':
        return SERVICES.filter(s => ['cybersecurity', 'it-infrastructure', 'managed-it'].includes(s.id));
      default:
        return SERVICES;
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              Our Services
            </h2>
            <p className="text-neutral-500 text-lg max-w-xl font-normal leading-relaxed">
              Enterprise‑grade IT solutions engineered for performance, scale, and ironclad security.
            </p>
          </div>

          {/* Interactive filter tags */}
          <div className="flex items-center gap-2 bg-neutral-200/55 p-1 rounded-xl self-start">
            {(['all', 'engineering', 'security-admin'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                  activeFilter === filter 
                    ? 'bg-white text-black shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {filter === 'security-admin' 
                  ? 'Security & Operations' 
                  : filter === 'engineering' 
                  ? 'Platform & Engineering' 
                  : 'All Services'}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredServices().map((service) => {
            const isHovered = hoveredIndex === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(service.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white rounded-2xl p-8 hover:bg-neutral-900 hover:text-white transition-all duration-300 border border-neutral-200/60 hover:border-neutral-950 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => onSelectService(service)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm text-neutral-400 group-hover:text-blue-400 font-medium">
                      {service.num}
                    </span>
                    <div className="flex gap-1.5 flex-wrap max-w-[70%] justify-end">
                      {service.technologies.slice(0, 2).map(t => (
                        <span 
                          key={t} 
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wide uppercase bg-neutral-100 text-neutral-600 group-hover:bg-neutral-800 group-hover:text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl font-semibold text-neutral-900 group-hover:text-white mb-3 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-500 group-hover:text-neutral-350 text-sm sm:text-base leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 group-hover:border-neutral-800">
                  <span className="inline-flex items-center text-blue-600 group-hover:text-blue-400 font-semibold text-sm gap-1.5 transition-all group-hover:gap-3">
                    Learn more 
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onInitiateBooking(service.title);
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-neutral-100 active:scale-95 transition-all"
                  >
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
