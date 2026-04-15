import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Home, Car, Building2, Anchor, Heart, Bike, Truck, Compass, MapPin } from 'lucide-react';

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

const officeOptions = [
  { id: 'alexandria', name: 'Alexandria', address: '5215 B Jackson St, Alexandria, LA 71303', phone: '(318) 561-8000' },
  { id: 'ponchatoula', name: 'Ponchatoula', address: '1133 Hwy 51, Suite 105, Ponchatoula, LA 70454', phone: '(985) 242-4300' },
  { id: 'slidell', name: 'Slidell', address: '1352 7th St, Slidell, LA 70458', phone: '(985) 643-3304' },
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
    coverage: '',
    office: '',
    // Auto-specific
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    // Business-specific
    businessStartYear: '',
    serviceType: '',
  });

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', zip: '',
        coverage: '', office: '',
        vehicleYear: '', vehicleMake: '', vehicleModel: '',
        businessStartYear: '', serviceType: '',
      });
    }
  }, [isOpen]);

  const handleCoverageSelect = (id: string) => {
    setFormData({ ...formData, coverage: id });
    // Auto-advance after a brief pause for visual feedback
    setTimeout(() => setStep(2), 300);
  };

  const handleOfficeSelect = (id: string) => {
    setFormData({ ...formData, office: id });
    setTimeout(() => setStep(3), 300);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
          subject: `New Quote Request — ${formData.coverage} — ${formData.office}`,
          ...formData
        })
      });
    } catch (error) {
      console.error('Submission failed', error);
    }
    setIsSubmitting(false);
    setStep(4);
  };

  const selectedOption = coverageOptions.find(o => o.id === formData.coverage);
  const selectedOffice = officeOptions.find(o => o.id === formData.office);
  const isAuto = formData.coverage === 'auto' || formData.coverage === 'motorcycle' || formData.coverage === 'rv';
  const isBusiness = formData.coverage === 'commercial';
  const totalSteps = 3;

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
                    {step === 2 && "Choose your office."}
                    {step === 3 && "Almost there."}
                    {step === 4 && "You're all set!"}
                  </h3>
                  {step < 4 && (
                    <div className="text-xs font-bold tracking-widest uppercase text-accent mt-1">
                      Step {step} of {totalSteps}
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
              {step < 4 && (
                <div className="h-1 w-full bg-white/5">
                  <motion.div 
                    className="h-full bg-accent"
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
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
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all ${
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

                  {/* Step 2: Office Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
                          {selectedOption && <selectedOption.icon className="w-4 h-4 text-accent" />}
                          <span className="text-xs font-bold text-accent uppercase tracking-widest">
                            {selectedOption?.title}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-paper mb-1">
                          Which office is closest to you?
                        </h4>
                        <p className="text-paper/50 text-sm font-medium">
                          We'll connect you with that team.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        {officeOptions.map((office) => {
                          const isSelected = formData.office === office.id;
                          return (
                            <button
                              key={office.id}
                              onClick={() => handleOfficeSelect(office.id)}
                              className={`flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 ${
                                isSelected
                                  ? 'border-accent bg-accent/15 shadow-[0_0_25px_rgba(227,38,54,0.2)]'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                                isSelected ? 'bg-accent/20' : 'bg-white/10'
                              }`}>
                                <MapPin className={`w-5 h-5 ${isSelected ? 'text-accent' : 'text-paper/60'}`} />
                              </div>
                              <div>
                                <div className={`font-bold text-sm mb-0.5 ${isSelected ? 'text-accent' : 'text-paper'}`}>
                                  {office.name}
                                </div>
                                <div className="text-paper/40 text-xs font-medium">{office.address}</div>
                                <div className="text-paper/40 text-xs font-medium">{office.phone}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact info + conditional fields */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="mb-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
                            {selectedOption && <selectedOption.icon className="w-4 h-4 text-accent" />}
                            <span className="text-xs font-bold text-accent uppercase tracking-widest">
                              {selectedOption?.title}
                            </span>
                          </div>
                          {selectedOffice && (
                            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                              <MapPin className="w-3.5 h-3.5 text-paper/50" />
                              <span className="text-xs font-bold text-paper/60 uppercase tracking-widest">
                                {selectedOffice.name}
                              </span>
                            </div>
                          )}
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

                      {/* Auto-specific fields */}
                      {isAuto && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-4 border-t border-white/10 pt-4"
                        >
                          <p className="text-xs font-bold uppercase tracking-widest text-accent">Vehicle Details</p>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Year</label>
                              <input 
                                type="text"
                                className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                                placeholder="2022"
                                value={formData.vehicleYear}
                                onChange={(e) => setFormData({...formData, vehicleYear: e.target.value})}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Make</label>
                              <input 
                                type="text"
                                className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                                placeholder="Toyota"
                                value={formData.vehicleMake}
                                onChange={(e) => setFormData({...formData, vehicleMake: e.target.value})}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Model</label>
                              <input 
                                type="text"
                                className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                                placeholder="Camry"
                                value={formData.vehicleModel}
                                onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Business-specific fields */}
                      {isBusiness && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-4 border-t border-white/10 pt-4"
                        >
                          <p className="text-xs font-bold uppercase tracking-widest text-accent">Business Details</p>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Year Business Started</label>
                            <input 
                              type="text"
                              className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3.5 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                              placeholder="e.g. 2015"
                              value={formData.businessStartYear}
                              onChange={(e) => setFormData({...formData, businessStartYear: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-paper/50">Type of Services Provided</label>
                            <input 
                              type="text"
                              className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-lg p-3.5 outline-none font-medium text-paper placeholder:text-paper/25 transition-all text-sm"
                              placeholder="e.g. Retail, Contracting, Professional Services..."
                              value={formData.serviceType}
                              onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                            />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
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
                      {selectedOffice && (
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs text-paper/60 font-bold uppercase tracking-widest">{selectedOffice.name} office will reach out</span>
                        </div>
                      )}
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

              {/* Footer Controls — only on Step 3 */}
              {step === 3 && (
                <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
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

              {/* Back button on Step 2 */}
              {step === 2 && (
                <div className="p-6 border-t border-white/10 bg-white/5">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-paper/60 hover:text-paper transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
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
