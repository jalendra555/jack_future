import { IMAGES } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAIArchitect: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onOpenBooking, onOpenAIArchitect, onExploreServices }: HeroProps) {
  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 sm:px-8 py-16 bg-radial from-white via-neutral-50 to-neutral-100 overflow-hidden border-b border-neutral-200"
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="z-10 max-w-4xl space-y-8 animate-fade-in">
        {/* New for 2026 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium border border-neutral-300/40">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          New Solutions for 2026
        </div>

        {/* Dynamic Display Heading */}
        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight text-neutral-950 uppercase max-w-5xl mx-auto break-words">
          Accelerating Transformative <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-blue-900 to-black">
            Customer Experiences
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="text-neutral-500 text-lg sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          Ayanshu Innovations delivers intelligent, scalable, and secure digital solutions engineered for the future of enterprise performance.
        </p>

        {/* Responsive Dual Action Blocks */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button 
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 text-base"
          >
            Start Your Transformation
          </button>
          
          <button 
            onClick={onOpenAIArchitect}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-600 font-semibold hover:text-blue-800 hover:underline hover:scale-105 transition-all text-base px-8 py-4 group"
          >
            <span>Consult AI Architect</span>
            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">smart_toy</span>
          </button>

          <button 
            onClick={onExploreServices}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-neutral-700 font-medium hover:text-black hover:underline transition-all text-base px-6 py-4 group"
          >
            <span>Explore Services</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-y-0.5">expand_more</span>
          </button>
        </div>
      </div>

      {/* Hero Interactive Showcase Image (Fades grayscale to color on hover) */}
      <div className="mt-16 w-full max-w-5xl px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/40 bg-neutral-900 group">
          <img 
            className="w-full aspect-video md:aspect-[21/9] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" 
            src={IMAGES.heroServer}
            alt="Sleek server room showcasing glowing indicator lights and pristine tech performance"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle overlay HUD labels mimicking high-end clean workspace without tech slop */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white/50 text-[10px] font-mono select-none">
            <span>[ SYSTEM ENGINE: ACTIVE ]</span>
            <span className="hidden sm:inline">COPT-2026-V8</span>
            <span>AYANSHU INNOVATIONS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
