import { IMAGES } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="w-full py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Slogan */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-neutral-900 font-semibold text-2xl select-none">
              blur_on
            </span>
            <span className="font-sans font-bold text-lg tracking-tight text-neutral-900">
              Ayanshu Innovations
            </span>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs font-normal">
            Where Ideas Transform Into Intelligent Solutions. Innovating for a better digital tomorrow.
          </p>
        </div>

        {/* Column Solutions */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest">
            Solutions
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button 
                onClick={() => onNavigate('services')}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                Cloud Strategy
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('services')}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                Cybersecurity
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('services')}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                Software Engineering
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('services')}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                Managed Services
              </button>
            </li>
          </ul>
        </div>

        {/* Column Company */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button 
                onClick={() => onNavigate('home')}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenBooking}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                Case Studies
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('insights')}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                Insights
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenBooking}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                Careers
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info column */}
        <div className="space-y-5">
          <h4 className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest">
            Contact
          </h4>
          <p className="text-neutral-500 text-sm font-sans hover:text-neutral-850 cursor-pointer">
            hello@ayanshu-innovations.com
          </p>
          
          <div className="flex gap-3">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">language</span>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16 pt-8 border-t border-neutral-200/60 text-center">
        <p className="text-neutral-400 font-mono text-[11px]">
          © 2026 Ayanshu Innovations Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
