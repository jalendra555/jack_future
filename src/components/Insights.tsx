import React, { useState } from 'react';
import { ARTICLES } from '../data';
import { ArticleItem } from '../types';

interface InsightsProps {
  onReadArticle: (article: ArticleItem) => void;
}

export default function Insights({ onReadArticle }: InsightsProps) {
  // Newsletter state
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    setTimeout(() => {
      if (email.includes('@')) {
        setSubStatus('success');
        setEmail('');
      } else {
        setSubStatus('error');
      }
    }, 850);
  };

  const mainArticle = ARTICLES.find(a => a.id === 'cloud-native') || ARTICLES[0];
  const sideArticles = ARTICLES.filter(a => a.id !== 'cloud-native');

  return (
    <section id="insights" className="py-24 bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase">
              Thought Leadership Channel
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950">
              Deep Technical Insights
            </h2>
            <p className="text-neutral-500 text-base max-w-xl font-normal leading-relaxed">
              Perspectives, vectors, and architectural strategy pieces written directly by our subject matter leaders.
            </p>
          </div>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Hero Article Block (Spans 8) */}
          <div 
            onClick={() => onReadArticle(mainArticle)}
            className="lg:col-span-8 group cursor-pointer space-y-6"
          >
            <div className="rounded-2xl overflow-hidden bg-neutral-200 aspect-[16/9] w-full relative group">
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none" 
                src={mainArticle.image} 
                alt="Modern workstation with ample lighting and elegant architectural layout"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/10 transition-colors pointer-events-none" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-mono font-semibold px-3 py-1 rounded">
                FEATURED PIECE
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 font-medium">
                <span>{mainArticle.date}</span>
                <span>•</span>
                <span>{mainArticle.readTime}</span>
                <span>•</span>
                <span className="text-blue-600 uppercase font-semibold">{mainArticle.category}</span>
              </div>
              
              <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-950 group-hover:text-blue-600 transition-colors tracking-tight">
                {mainArticle.title}
              </h3>
              
              <p className="text-neutral-500 font-normal text-sm sm:text-base leading-relaxed max-w-3xl">
                {mainArticle.excerpt}
              </p>

              <span className="inline-flex items-center text-blue-600 font-semibold text-sm gap-1.5 group-hover:underline">
                Read full analytical spec 
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Side Articles & Newsletter Column (Spans 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-12">
            
            {/* List side pieces */}
            <div className="space-y-8">
              {sideArticles.map((article, index) => (
                <div 
                  key={article.id}
                  onClick={() => onReadArticle(article)}
                  className="group cursor-pointer space-y-3"
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 font-medium">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h4 className="font-sans text-lg sm:text-xl font-semibold text-neutral-950 group-hover:text-blue-600 transition-colors tracking-tight leading-snug">
                    {article.title}
                  </h4>
                  
                  <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center text-blue-600 text-xs font-semibold gap-1 group-hover:underline">
                    Expand essay <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </span>

                  {index < sideArticles.length - 1 && <hr className="border-neutral-200 mt-6" />}
                </div>
              ))}
            </div>

            {/* Premium Newsletter Box */}
            <div className="p-8 rounded-2xl bg-black text-white space-y-6 shadow-xl border border-neutral-800">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 font-semibold block">
                  MONTHLY TELEMETRY
                </span>
                <h5 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-white">
                  Stay Context Informed
                </h5>
                <p className="text-sm text-neutral-400 font-normal leading-relaxed">
                  Get our latest technology architectural briefs delivered directly to your inbox.
                </p>
              </div>

              {subStatus === 'success' ? (
                <div className="p-4 bg-blue-900/30 border border-blue-500/30 text-blue-200 rounded-xl text-center space-y-1">
                  <span className="material-symbols-outlined text-xl text-blue-400 block mb-1">
                    check_circle
                  </span>
                  <p className="font-semibold text-xs uppercase tracking-wider font-mono">
                    SUBSCRIBER PORTAL ACTIVE
                  </p>
                  <p className="text-[11.5px] opacity-90 font-sans">
                    Thank you. We have saved your registration securely.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="space-y-1">
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-xl text-neutral-150 px-4 py-3 text-sm placeholder-neutral-500" 
                      placeholder="business@example.com"
                      required
                    />
                    {subStatus === 'error' && (
                      <p className="text-red-400 text-xs font-medium pl-1">
                        Please insert a valid email address.
                      </p>
                    )}
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="w-full bg-white text-black font-semibold tracking-tight text-sm py-3 rounded-xl hover:bg-neutral-100 transition-colors active:scale-95 duration-200 flex items-center justify-center gap-1.5 disabled:bg-neutral-300"
                  >
                    {subStatus === 'loading' ? (
                      <>
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full" />
                        Validating...
                      </>
                    ) : (
                      'Subscribe to briefings'
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
