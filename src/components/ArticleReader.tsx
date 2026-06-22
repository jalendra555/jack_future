import { useState } from 'react';
import { ArticleItem } from '../types';

interface ArticleReaderProps {
  article: ArticleItem | null;
  onClose: () => void;
  onQuickBook: () => void;
}

export default function ArticleReader({ article, onClose, onQuickBook }: ArticleReaderProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!article) return null;

  const handleFetchAISummary = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challenge: `Create an executive, actionable summary outlining 3 business takeaways and an essential implementation step for the article titled "${article.title}" with excerpt: "${article.excerpt}"`,
          companyDetails: 'Corporate enterprise consulting stakeholder',
          serviceFocus: article.category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary checklist.');
      }

      setSummary(data.result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during synthesis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Backdrop shade */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity" 
          aria-hidden="true" 
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div className="pointer-events-auto w-screen max-w-2xl bg-white shadow-2xl flex flex-col h-full transform transition-transform animate-slide-left border-l border-neutral-200">
            
            {/* Nav Header */}
            <div className="bg-neutral-950 p-6 text-white flex items-center justify-between">
              <button 
                onClick={onClose}
                className="text-white/60 hover:text-white flex items-center gap-1.5 text-xs font-mono font-semibold"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Return to Insights
              </button>
              
              <button 
                onClick={onClose}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Read Core */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              
              {/* Category tags */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-450 font-medium">
                  <span className="bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-md uppercase font-semibold">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
                  {article.title}
                </h3>
              </div>

              {/* Cover layout */}
              <div className="rounded-xl overflow-hidden aspect-[16/8] bg-neutral-200 w-full">
                <img 
                  className="w-full h-full object-cover" 
                  src={article.image} 
                  alt={article.title} 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text content split */}
              <div className="prose prose-neutral max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-5 font-sans border-b border-neutral-150 pb-8 whitespace-pre-line">
                {article.content}
              </div>

              {/* AI Key Takeaways Assistant module */}
              <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-lg animate-pulse select-none">
                    smart_toy
                  </span>
                  <h4 className="font-sans font-bold text-sm text-neutral-900 uppercase tracking-wider">
                    AI Executive Takeaways Summary
                  </h4>
                </div>

                {!summary && (
                  <div className="space-y-3">
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Invoke our server-side solution architect to compile executive takeaway bullet points customized for decision makers.
                    </p>
                    {error && <p className="text-red-600 text-xs font-medium leading-relaxed">{error}</p>}
                    <button
                      onClick={handleFetchAISummary}
                      disabled={loading}
                      className="bg-black hover:bg-neutral-850 text-white font-semibold text-xs px-4 py-2.5 rounded-lg active:scale-95 disabled:bg-neutral-400 flex items-center gap-2.5 transition-all"
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                          Summarizing article context...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">bolt</span>
                          Generate Executive Summary
                        </>
                      )}
                    </button>
                  </div>
                )}

                {summary && (
                  <div className="space-y-4 animate-fade-in text-neutral-800 text-sm leading-relaxed whitespace-pre-line border-t border-neutral-200/60 pt-4">
                    {summary}
                    <button 
                      onClick={() => setSummary(null)}
                      className="text-xs text-blue-600 font-semibold hover:underline block pt-2"
                    >
                      Reset Summary
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions footer sticky */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-150 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 py-3 rounded-lg text-xs font-semibold transition-colors uppercase font-mono tracking-wider"
              >
                Close specs
              </button>
              <button
                onClick={() => {
                  onClose();
                  onQuickBook();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-xs font-semibold transition-transform active:scale-95 duration-200 uppercase font-mono tracking-wider shadow-md shadow-blue-500/10"
              >
                Book strategy call
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
