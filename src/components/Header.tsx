import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAIArchitect: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onOpenBooking, onOpenAIArchitect, activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Estimator', id: 'estimator' },
    { label: 'Insights', id: 'insights' }
  ];

  return (
    <header 
      id="app-header"
      className={`sticky top-0 w-full z-40 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/80 dark:bg-black/85 backdrop-blur-xl border-neutral-200/50 dark:border-neutral-800/80 shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-6 sm:px-8 max-w-7xl mx-auto h-16">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 cursor-pointer transition-opacity active:opacity-75 group"
        >
          <span className="material-symbols-outlined text-black font-semibold text-3xl group-hover:scale-110 transition-transform duration-300">
            blur_on
          </span>
          <span className="font-semibold text-xl tracking-tight text-black font-sans">
            Ayanshu Innovations
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-sans text-sm font-medium transition-all duration-300 py-1 border-b-2 hover:text-black ${
                activeSection === item.id 
                  ? 'border-black text-black' 
                  : 'border-transparent text-neutral-500 hover:border-neutral-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onOpenAIArchitect}
            className="text-blue-600 font-medium text-sm hover:text-blue-700 hover:underline flex items-center gap-1 transition-all"
          >
            <span className="material-symbols-outlined text-sm">smart_toy</span>
            AI Architect
          </button>
        </div>

        {/* "Get Started" Action Trigger */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenBooking}
            className="bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-transform active:scale-95 duration-200 hover:shadow-lg hover:shadow-black/10"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
