import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Home, Car, Building2, Anchor, Heart, Bike, Truck, Compass, ShieldAlert } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const coverageOptions = [
  { id: 'home', title: 'My Home', icon: Home, emoji: '🏠' },
  { id: 'auto', title: 'My Car', icon: Car, emoji: '🚗' },
  { id: 'commercial', title: 'My Business', icon: Building2, emoji: '🏢' },
  { id: 'boat', title: 'My Boat', icon: Anchor, emoji: '⛵' },
  { id: 'life', title: 'My Family', icon: Heart, emoji: '❤️' },
  { id: 'motorcycle', title: 'My Ride', icon: Bike, emoji: '🏍️' },
  { id: 'rv', title: 'My RV', icon: Truck, emoji: '🚐' },
  { id: 'other', title: 'Something Else', icon: Compass, emoji: '🧭' },
];

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    coverage: ''
  });

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', zip: '', coverage: '' });
    }
  }, [isOpen]);

  const handleCoverageSelect = (id: string) => {
    setFormData({ ...formData, coverage: id });
    // Auto-advance after a brief pause for visual feedback
    setTimeout(() => setStep(2), 300);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
          subject: `New Quote Request — ${formData.coverage}`,
          ...formData
        })
      });
    } catch (error) {
      console.error('Submission failed', error);
    }
    setIsSubmitting(false);
    setStep(3);
  };

  const totalSteps = 3;
  const selectedOption = coverageOptions.find(o => o.id === formData.coverage);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/80 backdrop-blur-xl z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="w-full max-w-lg bg-ink/70 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto relative flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-paper tracking-tight">
                    {step === 1 && "Let's get started."}
                    {step === 2 && "Almost there."}
                    {step === 3 && "You're all set!"}
                  </h3>
                  {step < 3 && (
                    <div className="text-xs font-bold tracking-widest uppercase text-accent mt-1">
                      Step {step} of 2
                    </div>
                  )}
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-paper/50 hover:text-paper hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              {step < 3 && (
                <div className="h-1 w-full bg-white/5">
                  <motion.div 
                    className="h-full bg-accent"
                    animate={{ width: `${(step / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-grow scrollbar-hide" data-lenis-prevent="true">
                <AnimatePresence mode="wait">

                  {/* Step 1: What are we protecting? */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-8 text-center">
                        <h4 className="text-2xl font-bold text-paper mb-2">
                          Hey there! 👋
                        </h4>
                        <p className="text-paper/60 font-medium">
                          What are we protecting today?
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {coverageOptions.map((opt) => {
                          const isSelected = formData.coverage === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleCoverageSelect(opt.id)}
                              className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all duration-300 text-center group hover:-translate-y-1 ${
                                isSelected 
                                  ? 'border-accent bg-accent/15 shadow-[0_0_25px_rgba(227,38,54,0.25)]' 
                                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-2xl transition-all ${
                                isSelected ? 'bg-accent/20 scale-110' : 'bg-white/10'
                              }`}>
                                <opt.icon className={`w-6 h-6 ${isSelected ? 'text-accent' : 'text-paper/80'}`} />
                              </div>
                              <span className={`font-bold text-sm ${isSelected ? 'text-accent' : 'text-paper'}`}>
                                {opt.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Contact info */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="mb-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
                          {selectedOption && <selectedOption.icon className="w-4 h-4 text-accent" />}
                          <span className="text-xs font-bold text-accent uppercase tracking-widest">
                            {selectedOption?.title}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-paper mb-1">
                          Great choice. How do we reach you?
                        </h4>
                        <p className="text-paper/50 text-sm font-medium">
                          We'll get back to you within one business day.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-paper/50">First Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3.5 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            autoFocus
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Last Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3.5 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Phone</label>
                        <input 
                          type="tel" 
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3.5 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Email</label>
                        <input 
                          type="email" 
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3.5 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-paper/50">ZIP Code</label>
                        <input 
                          type="text" 
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3.5 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                          placeholder="71301"
                          value={formData.zip}
                          onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Success */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="py-8 flex flex-col items-center text-center"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-accent" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-paper mb-3">We're on it!</h4>
                      <p className="text-paper/60 font-medium max-w-sm mb-8 leading-relaxed text-sm">
                        One of our advisors will reach out within one business day 
                        to walk through your options. No pressure, no sales pitch — just 
                        honest help finding the right fit.
                      </p>
                      <button 
                        onClick={onClose}
                        className="bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300"
                      >
                        Back to Site
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer Controls — only on Step 2 */}
              {step === 2 && (
                <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-paper/60 hover:text-paper transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.firstName || !formData.phone || isSubmitting}
                    className={`px-8 py-3 rounded-sm font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2 min-w-[160px] ${
                      !formData.firstName || !formData.phone || isSubmitting
                        ? 'bg-white/5 text-paper/40 cursor-not-allowed border border-white/10' 
                        : 'bg-accent text-white hover:bg-white hover:text-ink shadow-[0_0_20px_rgba(227,38,54,0.3)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
                    ) : (
                      <>Send It <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
