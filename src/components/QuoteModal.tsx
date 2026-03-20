import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Home, Car, Building2, Anchor, Heart, Bike, Truck, Compass } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    coverage: ''
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Reset when opened
  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  const coverageOptions = [
    { id: 'home', title: 'Homeowners', icon: Home, desc: 'Coverage for primary or secondary residences.' },
    { id: 'auto', title: 'Auto', icon: Car, desc: 'Protection for your daily and specialty vehicles.' },
    { id: 'commercial', title: 'Commercial', icon: Building2, desc: 'Comprehensive enterprise coverage.' },
    { id: 'boat', title: 'Boat & Marine', icon: Anchor, desc: 'Protection on the water.' },
    { id: 'life', title: 'Life Insurance', icon: Heart, desc: 'Securing your family\'s future.' },
    { id: 'motorcycle', title: 'Motorcycle', icon: Bike, desc: 'Coverage for two-wheeled rides.' },
    { id: 'rv', title: 'RV & Trailer', icon: Truck, desc: 'Protection for your home on the road.' },
    { id: 'atv', title: 'ATV & Off-Road', icon: Compass, desc: 'Coverage for your adventures.' },
  ];

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

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="w-full max-w-2xl bg-ink/70 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto relative flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10 relative z-10 bg-transparent">
                <div>
                  <h3 className="text-xl font-bold font-sans text-paper tracking-tight">Initiate Coverage Request</h3>
                  <div className="text-xs font-bold tracking-widest uppercase text-accent mt-1">
                    Step {step} of 4
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-paper/50 hover:text-paper hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-1 w-full bg-white/5 relative z-10">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: '25%' }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Scrollable Content Area */}
              <div className="p-6 md:p-8 overflow-y-auto w-full relative flex-grow scrollbar-hide">
                <AnimatePresence mode="wait">
                  
                  {/* Step 1: Personal Details */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h4 className="text-2xl font-bold font-serif text-paper mb-2">Who are we designing protection for?</h4>
                        <p className="text-paper/60 font-medium">Please provide your primary contact details so a senior advisor can reach you.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-paper/70">First Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-4 outline-none font-medium text-paper placeholder:text-paper/30 transition-all"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-paper/70">Last Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-4 outline-none font-medium text-paper placeholder:text-paper/30 transition-all"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 w-full">
                        <label className="text-xs font-bold uppercase tracking-widest text-paper/70">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-4 outline-none font-medium text-paper placeholder:text-paper/30 transition-all"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2 w-full">
                        <label className="text-xs font-bold uppercase tracking-widest text-paper/70">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-4 outline-none font-medium text-paper placeholder:text-paper/30 transition-all"
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Location Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h4 className="text-2xl font-bold font-serif text-paper mb-2">Where is the primary exposure?</h4>
                        <p className="text-paper/60 font-medium">Louisiana risk profiling requires an exact geographic understanding.</p>
                      </div>

                      <div className="space-y-2 w-full">
                        <label className="text-xs font-bold uppercase tracking-widest text-paper/70">Street Address</label>
                        <input 
                          type="text" 
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-4 outline-none font-medium text-paper placeholder:text-paper/30 transition-all"
                          placeholder="123 Oak Avenue"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2 w-full">
                        <label className="text-xs font-bold uppercase tracking-widest text-paper/70">Zip Code</label>
                        <input 
                          type="text" 
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-4 outline-none font-medium text-paper placeholder:text-paper/30 transition-all"
                          placeholder="71301"
                          value={formData.zip}
                          onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Coverage Selector */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="mb-6">
                        <h4 className="text-2xl font-bold font-serif text-paper mb-2">What kind of protection do you need?</h4>
                        <p className="text-paper/60 font-medium">Select the primary focus of this inquiry. We can expand this during our consultation.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {coverageOptions.map((opt) => {
                          const isSelected = formData.coverage === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setFormData({...formData, coverage: opt.id})}
                              className={`flex flex-col items-start p-5 rounded-xl border transition-all duration-300 text-left ${
                                isSelected 
                                  ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(234,88,12,0.2)]' 
                                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${isSelected ? 'bg-accent text-white' : 'bg-white/10 text-paper'}`}>
                                <opt.icon className="w-5 h-5" />
                              </div>
                              <h5 className={`font-bold mb-1 ${isSelected ? 'text-accent' : 'text-paper'}`}>{opt.title}</h5>
                              <p className="text-xs font-medium text-paper/60 leading-relaxed">{opt.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="py-12 flex flex-col items-center text-center"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-12 h-12 text-accent" />
                      </motion.div>
                      <h4 className="text-3xl font-bold font-serif text-paper mb-4">Request Received.</h4>
                      <p className="text-paper/60 font-medium max-w-sm mb-8 leading-relaxed">
                        Your profile has been routed to our senior advisory team. We will contact you shortly to begin constructing your customized protection plan.
                      </p>
                      <button 
                        onClick={onClose}
                        className="bg-accent text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink hover:shadow-[0_4px_20px_rgba(234,88,12,0.4)] transition-all duration-300"
                      >
                        Return to Site
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer Controls */}
              {step < 4 && (
                <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center mt-auto relative z-10 w-full">
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors ${
                      step === 1 ? 'text-paper/20 cursor-not-allowed' : 'text-paper/60 hover:text-paper'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  
                  <button
                    onClick={nextStep}
                    className="bg-accent text-white px-8 py-3 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2"
                  >
                    {step === 3 ? 'Submit Request' : 'Continue'} <ArrowRight className="w-4 h-4" />
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
