import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export default function ServiceDetailModal({ service, onClose, onBook }: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay closely matching pure dark ambient shading */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" 
          aria-hidden="true" 
        />

        {/* Center alignment spacer */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full animate-scale-up">
          {/* Header section with brand accent */}
          <div className="bg-neutral-950 px-6 py-8 text-white relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-opacity p-2 hover:bg-white/10 rounded-full"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-medium mb-1.5 block">
              SERVICE SPECIFICATION {service.num}
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-white mb-2">
              {service.title}
            </h3>
            <p className="text-neutral-400 text-sm max-w-lg leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="px-6 py-8 space-y-6">
            {/* Core Benefits details checklist */}
            <div>
              <h4 className="text-neutral-900 font-semibold text-sm uppercase tracking-wider mb-4">
                Key Strategic Benefits
              </h4>
              <ul className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 mt-0.5 text-lg select-none">
                      check_circle
                    </span>
                    <span className="text-neutral-600 text-sm sm:text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Technologies tags */}
            <div>
              <h4 className="text-neutral-900 font-semibold text-sm uppercase tracking-wider mb-3">
                Preferred Tech Stack Integration
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-neutral-100 border border-neutral-200/50 text-neutral-700 px-3 py-1.5 rounded-lg text-xs font-mono font-medium uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Estimations card */}
            <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200/40">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono font-medium block mb-1">
                  STARTING BASE VALUE
                </span>
                <span className="text-2xl font-sans font-semibold text-black">
                  ${service.basePrice.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono font-medium block mb-1">
                  ESTIMATED DELIVERY
                </span>
                <span className="text-2xl font-sans font-semibold text-neutral-900">
                  ~{service.deliveryWeeks} Weeks
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="bg-neutral-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white text-neutral-700 hover:text-black border border-neutral-200 hover:border-neutral-300 font-medium text-sm rounded-lg transition-colors active:bg-neutral-50"
            >
              Cancel Spec Inquiry
            </button>
            <button
              type="button"
              onClick={() => onBook(service.title)}
              className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white font-medium text-sm rounded-lg transition-transform active:scale-95 duration-200 hover:shadow-lg hover:shadow-black/10"
            >
              Select & Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
