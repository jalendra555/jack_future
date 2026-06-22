import React, { useState } from 'react';
import { SERVICES } from '../data';

interface AssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRoadmap: (roadmap: string) => void;
}

export default function Assistant({ isOpen, onClose, onApplyRoadmap }: AssistantProps) {
  const [challenge, setChallenge] = useState('We need to migrate our legacy PostgreSQL database clusters and automate our multi-cloud deployment pipelines to support 24/7 high availability.');
  const [companyDetails, setCompanyDetails] = useState('Medium enterprise, approximately 150 employees with local staging setups.');
  const [selectedFocus, setSelectedFocus] = useState('Cloud & DevOps');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challenge,
          companyDetails,
          serviceFocus: selectedFocus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate transformation blueprint context.');
      }

      setResult(data.result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during design computation.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl border-l border-neutral-200 flex flex-col h-full animate-slide-left">
      
      {/* Header section */}
      <div className="bg-neutral-950 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-blue-400 text-2xl select-none animate-pulse">
            smart_toy
          </span>
          <div>
            <h3 className="font-sans font-semibold text-lg text-white">
              AI Solution Architect
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              POWERED BY GEMINI 3.5
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white hover:bg-neutral-850 p-1.5 rounded-full transition-all"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      {/* Content Viewport */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {!result && (
          <form onSubmit={handleGenerateRoadmap} className="space-y-5">
            <p className="text-neutral-500 text-sm leading-relaxed">
              Describe your organizational hurdles, choose a specialized target focus, and invoke the AI Architect to build an enterprise strategy proposal.
            </p>

            {/* Core hurdle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-800 uppercase tracking-widest font-mono block">
                1. What is your primary engineering objective or hurdle?
              </label>
              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full text-sm font-sans text-neutral-800 border border-neutral-200 bg-neutral-50/50 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 min-h-[90px] leading-relaxed"
                placeholder="Database bottlenecks, slow build releases, audit profiles etc..."
                required
              />
            </div>

            {/* Scale Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-800 uppercase tracking-widest font-mono block">
                2. Enterprise Parameters & Current Scale
              </label>
              <input
                type="text"
                value={companyDetails}
                onChange={(e) => setCompanyDetails(e.target.value)}
                className="w-full text-sm font-sans text-neutral-850 border border-neutral-200 bg-neutral-50/50 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="e.g. 50 employees, AWS local setups..."
                required
              />
            </div>

            {/* Service matching select dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-800 uppercase tracking-widest font-mono block">
                3. Choose Target Solution Pillar
              </label>
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className="w-full text-sm font-sans text-neutral-800 border border-neutral-200 bg-neutral-50/50 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 cursor-pointer"
              >
                {SERVICES.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs sm:text-sm space-y-2">
                <span className="font-semibold block uppercase font-mono text-[10px] tracking-wide">
                  SYSTEM INITIALIZATION ALERT:
                </span>
                <p className="leading-relaxed">{error}</p>
                <p className="text-[10.5px] opacity-80 leading-normal font-sans">
                  Please make sure that you configured your personal API Key. Click on the <b>Settings icon</b> in the top-right toolbar of AI Studio UI, then select <b>Secrets</b> and add <code>GEMINI_API_KEY</code> with your real key value.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-neutral-850 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-neutral-400 active:scale-95"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Generating Modernizing Plan...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  Draft Transformation Roadmap
                </>
              )}
            </button>
          </form>
        )}

        {/* Gemini Response Display */}
        {result && (
          <div className="space-y-6">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/55 text-neutral-700 text-sm space-y-2">
              <div className="flex justify-between items-center text-[10.5px] text-neutral-400 font-mono tracking-wide">
                <span>VERIFY ARCHITECTURE PROPOSITION</span>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" />
                  SYNTHESIS COMPLETE
                </span>
              </div>
              <p className="text-xs">
                Review this blueprint generated for <b>{selectedFocus}</b>. You can customize details or immediately book a meeting using this roadmap outline as focus context.
              </p>
            </div>

            {/* Markdown reading space */}
            <div className="prose prose-neutral max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-4 border-b border-neutral-100 pb-6 whitespace-pre-line font-sans">
              {result}
            </div>

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-black border border-neutral-300 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200"
              >
                Refine Inputs
              </button>
              <button
                onClick={() => handleApplyRoadmap(result)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                Book With This Spec
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center text-[11px] text-neutral-400 font-mono">
        AYANSHU INNOVATIONS • ENTERPRISE CONSULTANCY
      </div>
    </div>
  );

  function handleApplyRoadmap(roadmapText: string) {
    onApplyRoadmap(roadmapText);
  }
}
