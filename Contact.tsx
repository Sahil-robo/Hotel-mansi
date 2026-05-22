import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  Sparkles, 
  Check, 
  Quote, 
  MapPin, 
  MessageSquare,
  UtensilsCrossed
} from "lucide-react";
import { Review } from "../types";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [guestName, setGuestName] = useState("");
  const [guestRating, setGuestRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [guestMessage, setGuestMessage] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Local state to manage the visual success state
  const [isSuccessState, setIsSuccessState] = useState(false);

  // Fetch reviews for everyone
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (e) {
      console.error("Could not load reviews", e);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount to load data
  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle direct review submission
  const handleGuestSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);

    if (!guestName.trim()) {
      setReviewError("Please enter your name to authorize the dining review.");
      return;
    }
    if (!guestMessage.trim()) {
      setReviewError("Please share any feedback or comments about your vegetarian dining experience.");
      return;
    }

    setSubmittingReview(true);
    const feedbackDraft = guestMessage.trim();
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName.trim(),
          rating: guestRating,
          message: feedbackDraft,
        }),
      });

      if (res.ok) {
        // Attempt to copy feedback to clipboard to let user paste it directly on Google Reviews
        try {
          if (navigator && navigator.clipboard) {
            await navigator.clipboard.writeText(feedbackDraft);
          }
        } catch (clipErr) {
          console.warn("Clipboard copy deferred or failed", clipErr);
        }

        // Open Google review link in a new window/tab directly with iframe safety guard
        try {
          window.open(
            "https://search.google.com/local/writereview?placeid=ChIJucv0Ni4H4jsR1joWdDOVkYU",
            "_blank",
            "noopener,noreferrer"
          );
        } catch (openErr) {
          console.warn("Popup blocked or iframe limitation in window.open:", openErr);
        }

        // Transition to inline success screen with a beautiful local animation
        setIsSuccessState(true);
        
        // Refresh list instantly in the background so their review joins the list immediately!
        await fetchReviews();

        // Auto transition back to empty form state after 6.5 seconds to allow reading instructions
        setTimeout(() => {
          setIsSuccessState(false);
          setGuestName("");
          setGuestMessage("");
          setGuestRating(5);
        }, 6500);
      } else {
        const data = await res.json();
        setReviewError(data.error || "Could not save your dining testimonial. Please check your fields.");
      }
    } catch (err) {
      console.error("error submitting review", err);
      setReviewError("A connection issue occurred. Please check your network and try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const BASE_GOOGLE_REVIEWS_COUNT = 136;

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-brand-primary border-t border-b border-brand-accent/5 text-brand-light relative overflow-hidden noise-bg">
      {/* Soft elegance radial background glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] gold-glow-radial -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="space-y-16 max-w-6xl mx-auto font-sans">
          
          {/* Header Content with Google Star Badge */}
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-accent block">
              Share Your Dining Story
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-light leading-tight">
              Google Reviews & Live Local Hub
            </h2>
            
            {/* Centered border indicator */}
            <div className="h-[2px] w-12 bg-brand-accent mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Testimonials Feed */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-brand-light flex items-center gap-2">
                  <MessageSquare className="text-brand-accent scale-x-[-1]" size={20} />
                  Diners' Live Testimonials
                </h3>
                <p className="text-xs text-brand-light/60 font-light font-sans max-w-md">
                  Real feedback from families and culinary enthusiasts who celebrated memorable experiences at Hotel Mansi.
                </p>
              </div>

              {loading && reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 bg-brand-secondary/15 rounded-3xl border border-brand-accent/10">
                  <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-xs text-brand-light/50 font-mono">Loading dynamic dining logs...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-16 bg-brand-secondary/15 rounded-3xl border border-brand-accent/10">
                  <p className="text-xs text-brand-light/45 font-light">No custom reviews logged yet. Be the first to share your story!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {reviews.map((rev, index) => (
                      <motion.div
                        key={rev.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="p-6 bg-brand-secondary/15 hover:bg-brand-secondary/25 border border-brand-accent/10 hover:border-brand-accent/20 rounded-2xl relative group transition-all duration-300"
                      >
                        <Quote className="absolute right-6 top-6 text-brand-accent/5 group-hover:text-brand-accent/10 transition-colors duration-300" size={40} />
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-serif font-bold text-sm text-brand-light sm:text-base tracking-wide flex items-center gap-1.5">
                                {rev.name}
                                <span className="inline-block w-1.5 h-1.5 bg-brand-accent rounded-full opacity-60" />
                              </h4>
                              <div className="flex items-center gap-1">
                                <MapPin size={11} className="text-brand-accent/60" />
                                <span className="text-[10px] text-brand-light/50 font-light">Dined at Palitana</span>
                              </div>
                            </div>

                            <span className="text-[10px] text-brand-light/40 font-mono">
                              {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recent"}
                            </span>
                          </div>

                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`transition-all ${
                                  i < rev.rating
                                    ? "fill-brand-accent text-brand-accent"
                                    : "text-brand-light/10 fill-transparent"
                                }`}
                              />
                            ))}
                          </div>

                          <p className="text-xs sm:text-sm text-brand-light/85 italic leading-relaxed font-sans font-light">
                            "{rev.message}"
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Submit Form Card */}
            <div className="lg:col-span-5" id="write-testimonial-wrapper">
              <div className="bg-[#0b131a]/85 border border-brand-accent/15 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]" id="write-testimonial-container">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full filter blur-xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {!isSuccessState ? (
                    /* ACTIVE GUEST FORM */
                    <motion.div
                      key="active-review-form-area"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 flex flex-col justify-between h-full"
                    >
                      <div className="space-y-1.5 text-center">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-light">
                          Authorize Your Review
                        </h3>
                        <p className="text-xs text-brand-light/50 font-light leading-relaxed font-sans">
                          Dined with us in Palitana? Rate your experience. Your submission instantly publishes to our master database.
                        </p>
                      </div>

                      <form onSubmit={handleGuestSubmitReview} className="space-y-5 flex-1 pt-2" id="family-review-form">
                        
                        {/* Error display */}
                        {reviewError && (
                          <div className="p-3 bg-red-950/60 border border-red-500/25 text-red-300 text-xs rounded-xl font-medium leading-relaxed text-center">
                            {reviewError}
                          </div>
                        )}

                        {/* Selected rating stars */}
                        <div className="space-y-1.5 flex flex-col items-center">
                          <label className="text-[10px] text-brand-light/60 uppercase tracking-[0.15em] font-bold">
                            Overall Rating Stars *
                          </label>
                          <div className="flex items-center gap-1.5 py-1">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const val = i + 1;
                              const isHighlighted = hoverRating !== null ? val <= hoverRating : val <= guestRating;
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setGuestRating(val)}
                                  onMouseEnter={() => setHoverRating(val)}
                                  onMouseLeave={() => setHoverRating(null)}
                                  className="p-1 hover:scale-115 active:scale-90 transition-all text-brand-accent cursor-pointer"
                                  title={`Rate ${val} Stars`}
                                >
                                  <Star
                                    size={24}
                                    className={`transition-colors duration-200 ${
                                      isHighlighted
                                        ? "fill-brand-accent text-brand-accent filter drop-shadow-[0_0_5px_rgba(230,175,46,0.4)]"
                                        : "text-brand-light/20 fill-transparent"
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Guest Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-brand-light/60 uppercase tracking-widest font-bold block text-center sm:text-left">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rameshchandra Shah..."
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="bg-brand-primary border border-brand-accent/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-light placeholder-white/10 focus:border-brand-accent/50 focus:outline-none focus:ring-0 w-full transition-colors font-sans"
                            id="reviewer-name-field"
                          />
                        </div>

                        {/* Guest Message */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-brand-light/60 uppercase tracking-widest font-bold block text-center sm:text-left">
                            Feedback & dining comments *
                          </label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Write about the pure vegetarian food, open-air garden banquet, glowing lanterns, candle displays, and our traditional local host hospitality..."
                            value={guestMessage}
                            onChange={(e) => setGuestMessage(e.target.value)}
                            className="bg-brand-primary border border-brand-accent/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-light placeholder-white/8 focus:border-brand-accent/50 focus:outline-none focus:ring-0 w-full lg:resize-none transition-colors font-sans"
                            id="reviewer-feedback-field"
                          />
                        </div>

                        {/* Action Button */}
                        <button
                          type="submit"
                          disabled={submittingReview}
                          className="w-full bg-brand-accent hover:bg-brand-accent-light text-brand-primary text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl cursor-pointer shadow transform hover:scale-[1.01] active:translate-y-0.5 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-mono"
                          id="guest-submit-review-btn"
                        >
                          {submittingReview ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                              Processing secure transmission...
                            </>
                          ) : (
                            <>
                              <Sparkles size={13} className="animate-pulse" />
                              Publish Review Directly
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* HIGH-FIDELITY DIRECT SUCCESS STATE */
                    <motion.div
                      key="direct-success-feedback"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="text-center py-6 space-y-6 flex flex-col items-center justify-center h-full my-auto"
                    >
                      {/* Circular animated check success graphic */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping pointer-events-none" />
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center relative shadow-inner">
                          <Check size={32} className="animate-pulse" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-serif text-2xl font-bold text-brand-light text-center leading-snug">
                          Review Successfully Counted!
                        </h4>
                        <p className="text-xs text-brand-accent tracking-[0.2em] uppercase font-mono font-bold">
                          Live on Board as we speak
                        </p>
                      </div>

                      <p className="text-xs text-brand-light/75 max-w-sm mx-auto leading-relaxed font-light">
                        Thank you, <span className="font-semibold text-brand-light">{guestName}</span>. Your {guestRating}-star testimonial is registered in our local system.
                        <br /><br />
                        We have also <strong>copied your feedback to your clipboard</strong> and opened the official Google write review window so you can quickly paste and submit your wonderful words there!
                      </p>

                      <div className="border border-emerald-500/15 bg-emerald-950/30 rounded-2xl px-4 py-3 max-w-xs mx-auto text-center space-y-1">
                        <p className="text-[10px] text-emerald-300 font-semibold font-mono tracking-wider uppercase flex items-center justify-center gap-1">
                          <Check size={11} /> GOOGLE REVIEWS REDIRECT ACTIVE
                        </p>
                        <p className="text-[9px] text-emerald-300/60 leading-relaxed font-mono">
                          Simply paste your pre-copied feedback into Google!
                        </p>
                      </div>

                      <div className="text-[10px] text-brand-light/45 italic pt-2">
                        Form automatically resetting in a few moments...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Symmetrical footer detail to tie sections cleanly */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-brand-accent/5 text-[11px] text-brand-light/50 font-light">
            <span className="flex items-center gap-1.5">
              <UtensilsCrossed size={12} className="text-brand-accent" />
              Palitana's Certified Vegetarian Dining & Banquet Resort Destination
            </span>
            <div className="flex items-center gap-1.5 bg-brand-secondary/30 px-3.5 py-1.5 rounded-full border border-brand-accent/10">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
              <span>Average Google Rating: <strong className="text-brand-light font-bold">4.9 ★</strong> ({BASE_GOOGLE_REVIEWS_COUNT}+ reviews)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
