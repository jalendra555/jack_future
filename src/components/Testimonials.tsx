import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-20 text-center uppercase">
          Client Endorsements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="space-y-6 relative">
              <span className="text-6xl text-neutral-205/65 font-serif absolute -top-8 -left-4 pointer-events-none select-none">
                “
              </span>
              
              <p className="font-sans text-xl sm:text-2xl italic leading-relaxed text-neutral-850 relative z-10">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center font-bold font-sans text-sm text-neutral-700 border border-neutral-200/50">
                  {t.initials}
                </div>
                <div>
                  <p className="font-sans font-semibold text-neutral-900 text-sm sm:text-base">
                    {t.author}
                  </p>
                  <p className="text-neutral-400 font-mono text-xs uppercase tracking-wide">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
