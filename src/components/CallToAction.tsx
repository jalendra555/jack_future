interface CallToActionProps {
  onOpenBooking: () => void;
}

export default function CallToAction({ onOpenBooking }: CallToActionProps) {
  return (
    <section className="py-24 bg-black text-white text-center px-6 sm:px-8 border-b border-neutral-900 relative overflow-hidden">
      
      {/* Dynamic background lighting flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#1e3a8a_0%,transparent_50%)] opacity-35 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-8 relative z-10 animate-fade-in">
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase max-w-2xl mx-auto">
          Ready to Lead the Next Digital Frontier?
        </h2>
        
        <p className="text-neutral-400 font-normal text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Partner with Ayanshu Innovations to build the intelligent, scalable, and secure digital solutions your business deserves.
        </p>
        
        <div className="pt-4">
          <button 
            onClick={onOpenBooking}
            className="bg-white hover:bg-neutral-100 text-black px-10 py-5 rounded-lg text-sm font-semibold tracking-wider font-mono uppercase transition-transform active:scale-95 duration-200 shadow-xl shadow-black/40 hover:shadow-white/5"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
