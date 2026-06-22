import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PartnerWall from './components/PartnerWall';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Estimator from './components/Estimator';
import Insights from './components/Insights';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// Modals
import ServiceDetailModal from './components/ServiceDetailModal';
import ArticleReader from './components/ArticleReader';
import ConsultationModal from './components/ConsultationModal';
import Assistant from './components/Assistant';

import { ServiceItem, ArticleItem } from './types';

export default function App() {
  // Modal toggle states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefilledNotes, setPrefilledNotes] = useState('');
  
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  
  // Section active navigation tracker
  const [activeSection, setActiveSection] = useState('home');

  // Interactive scroll monitoring for active navbar indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'estimator', 'insights'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth routing navigators
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Deep-link estimators into schedule planner
  const handleApplyEstimatedPlan = (summaryText: string) => {
    setPrefilledNotes(summaryText);
    setBookingOpen(true);
  };

  // Deep-link AI blueprint roadmaps into scheduler
  const handleApplyAIRoadmap = (roadmapText: string) => {
    setPrefilledNotes(roadmapText);
    setAssistantOpen(false);
    setBookingOpen(true);
  };

  const handleLaunchGeneralBooking = () => {
    setPrefilledNotes('');
    setBookingOpen(true);
  };

  const handleSelectServiceBooking = (serviceTitle: string) => {
    setPrefilledNotes(`Consultation setup focused specifically on the: "${serviceTitle}" standard blueprint.`);
    setSelectedService(null);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. Navbar */}
      <Header 
        onOpenBooking={handleLaunchGeneralBooking}
        onOpenAIArchitect={() => setAssistantOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 2. Page Sections */}
      <main>
        
        {/* Hero Segment */}
        <Hero 
          onOpenBooking={handleLaunchGeneralBooking}
          onOpenAIArchitect={() => setAssistantOpen(true)}
          onExploreServices={() => handleNavigate('services')}
        />

        {/* Partner Wall */}
        <PartnerWall />

        {/* Services Showcase */}
        <Services 
          onSelectService={setSelectedService}
          onInitiateBooking={handleSelectServiceBooking}
        />

        {/* Testimonials */}
        <Testimonials />

        {/* Dynamic Cost Estimator Workspace */}
        <Estimator 
          onBookEstimatedConsultation={handleApplyEstimatedPlan}
        />

        {/* Editorial Insights */}
        <Insights 
          onReadArticle={setSelectedArticle}
        />

        {/* Conversational CTA */}
        <CallToAction 
          onOpenBooking={handleLaunchGeneralBooking}
        />

      </main>

      {/* 3. Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenBooking={handleLaunchGeneralBooking}
      />

      {/* --- Overlay Modals & Drawers --- */}

      {/* Service description details sheet */}
      <ServiceDetailModal 
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={handleSelectServiceBooking}
      />

      {/* Immersive essay reader panel */}
      <ArticleReader 
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onQuickBook={handleLaunchGeneralBooking}
      />

      {/* Scheduler Form */}
      <ConsultationModal 
        isOpen={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setPrefilledNotes('');
        }}
        prefilledNotes={prefilledNotes}
      />

      {/* AI Strategy Architect side drawer */}
      <Assistant 
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onApplyRoadmap={handleApplyAIRoadmap}
      />

    </div>
  );
}
