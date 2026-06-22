import { useState } from 'react';
import { SERVICES } from '../data';

interface EstimatorProps {
  onBookEstimatedConsultation: (summary: string) => void;
}

export default function Estimator({ onBookEstimatedConsultation }: EstimatorProps) {
  // Config state
  const [selectedServices, setSelectedServices] = useState<string[]>(['cloud-devops']);
  const [companySize, setCompanySize] = useState<'small' | 'medium' | 'enterprise'>('medium');
  const [slaTier, setSlaTier] = useState<'none' | 'standard' | 'premium'>('standard');
  const [compliance, setCompliance] = useState<string[]>([]);

  const complianceOptions = [
    { id: 'soc2', label: 'SOC 2 Audit Ready', price: 3500 },
    { id: 'iso27001', label: 'ISO 27001 Conforming', price: 4800 },
    { id: 'hipaa', label: 'HIPAA/GDPR Active Data Rules', price: 5500 }
  ];

  const handleToggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleToggleCompliance = (id: string) => {
    if (compliance.includes(id)) {
      setCompliance(compliance.filter(c => c !== id));
    } else {
      setCompliance([...compliance, id]);
    }
  };

  // Live calculations
  const calculateEstimate = () => {
    // Base selected services summations
    let servicesTotal = selectedServices.reduce((sum, serviceId) => {
      const match = SERVICES.find(s => s.id === serviceId);
      return sum + (match ? match.basePrice : 0);
    }, 0);

    // Multipliers for organizational size scope
    const sizeMultiplier = {
      small: 0.85,
      medium: 1.0,
      enterprise: 1.45
    }[companySize];

    let total = servicesTotal * sizeMultiplier;

    // Delivery time calculations
    let maxBaseWeeks = selectedServices.reduce((max, sId) => {
      const match = SERVICES.find(s => s.id === sId);
      return Math.max(max, match ? match.deliveryWeeks : 4);
    }, 4);
    
    // Additional service compounding factor (more services adds integration weeks)
    let extraWeeks = Math.max(0, (selectedServices.length - 1) * 1.5);
    let totalWeeks = Math.ceil(maxBaseWeeks + extraWeeks);

    // Support SLA overhead computations
    const slaMonthly = {
      none: 0,
      standard: 1200,
      premium: 3400
    }[slaTier];

    // Compliance direct additions
    const complianceTotal = compliance.reduce((sum, cId) => {
      const match = complianceOptions.find(c => c.id === cId);
      return sum + (match ? match.price : 0);
    }, 0);

    total += complianceTotal;

    return {
      investment: Math.round(total),
      weeks: totalWeeks,
      slaMonthly,
      milestones: Math.max(2, Math.ceil(totalWeeks / 3))
    };
  };

  const metrics = calculateEstimate();

  const handleTriggerBooking = () => {
    const serviceTitles = selectedServices
      .map(id => SERVICES.find(s => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const summary = `Estimated IT Spec Plan:
- Selected Modules: ${serviceTitles}
- Base Scope: ${companySize.toUpperCase()} size scope
- Support SLA: ${slaTier.toUpperCase()} support level
- Added Compliance: ${compliance.length > 0 ? compliance.join(', ').toUpperCase() : 'NONE'}
- Calculated Starting Investment: $${metrics.investment.toLocaleString()} (${metrics.weeks} Week delivery target)`;

    onBookEstimatedConsultation(summary);
  };

  return (
    <section id="estimator" className="py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Title */}
        <div className="max-w-2xl text-left mb-16 space-y-4">
          <span className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase">
            Interactive Costing Workspace
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
            Configure Your Digital Transformation Blueprint
          </h2>
          <p className="text-neutral-500 font-normal text-sm sm:text-base leading-relaxed">
            Select infrastructure modules, define your target audit profiles, and inspect live structural estimates within seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Config Col (Spans 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Services Toggles */}
            <div>
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-800 mb-3 block">
                1. Select Core Solutions Pillars (Select at least one)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => {
                  const isSelected = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleToggleService(s.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex justify-between items-center ${
                        isSelected 
                          ? 'border-neutral-950 bg-neutral-950 text-white' 
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <p className="font-sans text-sm sm:text-base font-semibold">{s.title}</p>
                        <p className={`text-xs ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          Est. starting from ${s.basePrice.toLocaleString()}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-lg">
                        {isSelected ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-800 mb-2 block">
                2. Select Organization Scale Offset
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['small', 'medium', 'enterprise'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setCompanySize(size)}
                    className={`py-3 px-4 rounded-xl text-center font-sans text-xs sm:text-sm font-semibold border transition-all ${
                      companySize === size
                        ? 'border-black bg-neutral-50 text-black shadow-xs'
                        : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="capitalize block">{size}</span>
                    <span className="text-[10px] opacity-60 block font-normal mt-0.5">
                      {size === 'small' ? '0.85x scale' : size === 'medium' ? '1.0x baseline' : '1.45x enterprise layer'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: SLAs */}
            <div>
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-800 mb-2 block">
                3. Choose Ongoing SLA Support Plan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: 'none', label: 'Self Managed', info: '$0 / mo' },
                  { id: 'standard', label: '8x5 Escalated', info: '$1,200 / mo' },
                  { id: 'premium', label: '24/7/365 active SOC', info: '$3,400 / mo' }
                ] as const).map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSlaTier(tier.id)}
                    className={`py-3 px-4 rounded-xl text-center border transition-all ${
                      slaTier === tier.id
                        ? 'border-black bg-neutral-50 text-black shadow-xs font-semibold'
                        : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="text-xs sm:text-sm block">{tier.label}</span>
                    <span className="text-[10px] opacity-60 block font-normal mt-0.5">{tier.info}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Compliance addon list */}
            <div>
              <label className="text-sm font-semibold uppercase tracking-wider text-neutral-800 mb-2 block">
                4. Select Supplementary Audit Certifications
              </label>
              <div className="space-y-2">
                {complianceOptions.map((opt) => {
                  const hasComp = compliance.includes(opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => handleToggleCompliance(opt.id)}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        hasComp
                          ? 'border-blue-600 bg-blue-50/20 text-blue-900'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-lg ${hasComp ? 'text-blue-600' : 'text-neutral-400'}`}>
                          {hasComp ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span className="text-xs sm:text-sm font-medium font-sans">{opt.label}</span>
                      </div>
                      <span className="text-xs font-mono font-semibold">+${opt.price.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Summary Dashboard (Spans 5) */}
          <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-8 sticky top-24 border border-neutral-800 shadow-xl space-y-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-semibold block mb-1">
                SUMMARY ESTIMATED CALCULATION
              </span>
              <h3 className="font-sans text-xl font-bold tracking-tight text-white mb-6">
                Ayanshu Architecture Plan
              </h3>
            </div>

            {/* Price Large Gauge display */}
            <div className="space-y-1.5 pb-6 border-b border-neutral-800">
              <span className="text-xs text-neutral-400 block font-normal uppercase tracking-wider">
                Project Base Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-white animate-pulse">
                  ${metrics.investment.toLocaleString()}
                </span>
                <span className="text-neutral-400 text-sm font-mono font-medium">USD</span>
              </div>
              <p className="text-xs text-neutral-400 leading-normal pt-1.5">
                *Estimated starting value tailored to standard resource sizing workflows.
              </p>
            </div>

            {/* SLA + Weeks timelines */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-neutral-800">
              <div>
                <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">
                  Target Delivery
                </span>
                <span className="text-xl sm:text-2xl font-sans font-semibold text-white">
                  ~{metrics.weeks} Weeks
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">
                  Support SLA
                </span>
                <span className="text-xl sm:text-2xl font-sans font-semibold text-white">
                  ${metrics.slaMonthly.toLocaleString()}<span className="text-xs text-neutral-400">/mo</span>
                </span>
              </div>
            </div>

            {/* Visual indicators timeline steps bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>PROJECT TIMELINE</span>
                <span>{metrics.milestones} MANDATORY MILESTONES</span>
              </div>
              
              {/* Custom SVG/Bar timeline */}
              <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500 rounded-l-full transition-all duration-500" style={{ width: '40%' }} />
                <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: '30%' }} />
                <div className="h-full bg-neutral-700 transition-all duration-500" style={{ width: '30%' }} />
              </div>
              
              <div className="grid grid-cols-3 text-[10px] text-neutral-400 text-center font-mono font-medium">
                <span className="text-left">1. Staging Setup</span>
                <span>2. Core Build</span>
                <span className="text-right">3. Audit Go-Live</span>
              </div>
            </div>

            {/* Submit call to action */}
            <button
              onClick={handleTriggerBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold text-sm transition-transform active:scale-95 duration-200 block text-center"
            >
              Consult On This Estimate Plan
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
