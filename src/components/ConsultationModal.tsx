import React, { useState, useEffect } from 'react';
import { SERVICES } from '../data';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

const TIME_SLOTS = ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

export default function ConsultationModal({ isOpen, onClose, prefilledNotes = '' }: ConsultationModalProps) {
  // Calendar scheduling parameters
  const [step, setStep] = useState<1 | 2 | 3 | 'receipt'>(1);
  const [serviceType, setServiceType] = useState('Cloud & DevOps');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');
  
  // Contacts
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  // Generated confirmation ticket
  const [ticketId, setTicketId] = useState('');

  // Pre-fill notes when change occurs
  useEffect(() => {
    if (prefilledNotes) {
      setNotes(prefilledNotes);
      // If we prefill from AI or Estimator, deep-link straight to scheduling steps
      setStep(2);
    }
  }, [prefilledNotes]);

  // Construct dates list dynamically corresponding to the upcoming days
  const getDates = () => {
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Start from tomorrow
    for (let i = 1; i <= 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip sundays
      if (d.getDay() === 0) continue;

      dates.push({
        raw: d.toISOString().split('T')[0],
        dayOfWeek: weekdays[d.getDay()],
        dayOfMonth: d.getDate(),
        month: months[d.getMonth()]
      });
    }
    return dates;
  };

  const datesList = getDates();

  useEffect(() => {
    if (datesList.length > 0 && !selectedDate) {
      setSelectedDate(datesList[0].raw);
    }
  }, [selectedDate]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking confirm
    const num = Math.floor(100000 + Math.random() * 900000);
    setTicketId(`AYN-${num}`);
    setStep('receipt');
  };

  const handleReset = () => {
    setStep(1);
    setNotes('');
    setName('');
    setEmail('');
    setCompany('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Shadow Overlay */}
        <div 
          onClick={handleReset}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity" 
          aria-hidden="true" 
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full animate-scale-up border border-neutral-100">
          
          {/* Header */}
          <div className="bg-neutral-950 text-white px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="font-sans font-semibold text-base sm:text-lg">
                {step === 'receipt' ? 'Modernization Ticket Generated' : 'Schedule Strategy Consultation'}
              </h3>
              {step !== 'receipt' && (
                <span className="text-[10px] font-mono uppercase text-neutral-400 mt-0.5 block tracking-wider">
                  Step {step} of 3 • System Allocation
                </span>
              )}
            </div>
            <button 
              onClick={handleReset}
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Form container */}
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">

            {/* STEP 1: Solution selections */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
                    Target Modernization Vertical
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full text-sm font-sans text-neutral-800 border border-neutral-200 bg-neutral-50 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 block cursor-pointer"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="General Strategy Consulting">General Strategy Consulting</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
                    Checklist Specifications / Brief Goal Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-sm font-sans text-neutral-800 border border-neutral-200 bg-neutral-50 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 min-h-[110px] leading-relaxed block"
                    placeholder="Provide details about your current architecture system, timeline constraints, or expected milestones..."
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-black hover:bg-neutral-850 text-white font-semibold text-sm py-3 rounded-lg active:scale-95 transition-transform"
                >
                  Configure Dates & Time
                </button>
              </div>
            )}

            {/* STEP 2: Calender and hours mapping */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Date select grids */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 block">
                    Available Sprints Dates
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {datesList.map((d) => {
                      const isActive = selectedDate === d.raw;
                      return (
                        <button
                          key={d.raw}
                          type="button"
                          onClick={() => setSelectedDate(d.raw)}
                          className={`p-2 rounded-xl border text-center transition-all ${
                            isActive
                              ? 'border-black bg-black text-white'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono block tracking-wide">{d.dayOfWeek}</span>
                          <span className="text-sm font-bold block leading-none my-1">{d.dayOfMonth}</span>
                          <span className="text-[9px] uppercase font-mono block opacity-80">{d.month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hours selections */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 block">
                    Select Consultation Slot Hour (EST)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isActive = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium border transition-all ${
                            isActive
                              ? 'bg-neutral-900 border-neutral-950 text-white'
                              : 'bg-neutral-55 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white hover:bg-neutral-55 text-neutral-700 border border-neutral-300 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono"
                  >
                    Back to Focus
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-black hover:bg-neutral-850 text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono active:scale-95 transition-transform"
                  >
                    Credentials Info
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Corporate detail form */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm font-sans text-neutral-800 border border-neutral-200 bg-neutral-50 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 block"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 block">
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm font-sans text-neutral-800 border border-neutral-200 bg-neutral-50 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 block"
                    placeholder="john@organization.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full text-sm font-sans text-neutral-800 border border-neutral-200 bg-neutral-50 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 block"
                    placeholder="e.g. FinTech Global"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-white hover:bg-neutral-55 text-neutral-700 border border-neutral-300 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono animate-fade-in"
                  >
                    Back to Time
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono active:scale-95 transition-transform shadow-md shadow-blue-500/10"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {/* RECEIPT PRESENTATION FOR SUCCESS STATE */}
            {step === 'receipt' && (
              <div className="space-y-6 animate-fade-in text-neutral-900">
                <div className="p-5 rounded-2xl bg-neutral-50 border-2 border-dashed border-neutral-300 space-y-4 font-mono text-xs text-neutral-750 max-w-sm mx-auto shadow-sm">
                  
                  {/* Top receipt */}
                  <div className="text-center space-y-1 pb-4 border-b border-dashed border-neutral-300">
                    <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                    <h4 className="font-sans font-bold text-sm tracking-tight pt-1.5">AYANSHU CONTRACT MEMO</h4>
                    <p className="text-[10px] text-neutral-400">ALLOCATION RECEIPT PASSPORT</p>
                  </div>

                  <div className="space-y-2 pt-2 text-[10.5px]">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">TICKET KEY:</span>
                      <span className="font-bold text-neutral-900">{ticketId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">CLIENT:</span>
                      <span className="font-semibold text-neutral-900">{name || 'John Doe'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">CORPORATION:</span>
                      <span className="font-semibold text-neutral-900 truncate max-w-[150px]">{company || 'FinTech Systems'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">SERVICE FOCUS:</span>
                      <span className="font-semibold text-neutral-900 truncate max-w-[150px]">{serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">SCHEDULE DATE:</span>
                      <span className="font-semibold text-neutral-900">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">APPOINTMENT HOUR:</span>
                      <span className="font-semibold text-neutral-900">{selectedTimeSlot} PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">STATUS LEVEL:</span>
                      <span className="text-green-600 font-bold uppercase tracking-wide">CONFIRMED</span>
                    </div>
                  </div>

                  {notes && (
                    <div className="pt-3 border-t border-dashed border-neutral-300 text-[10px] space-y-1.5">
                      <span className="text-neutral-400 block font-semibold">CUSTOM ROADMAP CONTEXT:</span>
                      <p className="text-neutral-600 leading-normal line-clamp-3 italic">
                        "{notes}"
                      </p>
                    </div>
                  )}

                  <div className="text-center pt-2 text-[10px] text-neutral-400 border-t border-dashed border-neutral-300">
                    ESTABLISHED ALIGNMENT PORTAL 2026
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm font-sans text-neutral-500">
                    A secure calendar placeholder has been generated on your behalf.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-black hover:bg-neutral-850 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg active:scale-95 transition-all w-full mt-2"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
