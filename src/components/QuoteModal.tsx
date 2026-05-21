import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Home, Car, Building2, Anchor, Heart, Bike, Truck, Compass, MapPin, Phone } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const officeOptions = [
  {
    id: 'alexandria',
    name: 'Alexandria',
    address: '5215 B Jackson St, Alexandria, LA 71303',
    phone: '(318) 561-8000',
    phoneRaw: '3185618000',
    description: 'Central Louisiana',
  },
  {
    id: 'ponchatoula',
    name: 'Ponchatoula',
    address: '1133 Hwy 51, Suite 105, Ponchatoula, LA 70454',
    phone: '(985) 242-4300',
    phoneRaw: '9852424300',
    description: 'Tangipahoa Parish',
  },
  {
    id: 'slidell',
    name: 'Slidell',
    address: '1352 7th St, Slidell, LA 70458',
    phone: '(985) 643-3304',
    phoneRaw: '9856433304',
    description: 'St. Tammany Parish',
  },
];

const coverageOptions = [
  { id: 'home', title: 'Home', icon: Home },
  { id: 'auto', title: 'Auto', icon: Car },
  { id: 'commercial', title: 'Business', icon: Building2 },
  { id: 'boat', title: 'Boat / Marine', icon: Anchor },
  { id: 'life', title: 'Life', icon: Heart },
  { id: 'motorcycle', title: 'Motorcycle', icon: Bike },
  { id: 'rv', title: 'RV', icon: Truck },
  { id: 'other', title: 'Other', icon: Compass },
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
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
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

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleOfficeSelect = (id: string) => {
    setFormData({ ...formData, office: id });
    setTimeout(() => setStep(2), 250);
  };

  const handleCoverageSelect = (id: string) => {
    setFormData({ ...formData, coverage: id });
    setTimeout(() => setStep(3), 250);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const locationMapping: Record<string, string> = {
      'alexandria': 'Alexandria',
      'ponchatoula': 'Ponchatoula',
      'slidell': 'Slidell'
    };

    let details = '';
    if (formData.zip) details += `<p><strong>ZIP Code:</strong> ${formData.zip}</p>`;
    if (formData.vehicleYear || formData.vehicleMake || formData.vehicleModel) {
      details += `<p><strong>Vehicle:</strong> ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}</p>`;
    }
    if (formData.businessStartYear) details += `<p><strong>Business Started:</strong> ${formData.businessStartYear}</p>`;
    if (formData.serviceType) details += `<p><strong>Service Type:</strong> ${formData.serviceType}</p>`;

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim() || 'No Name Provided',
          email: formData.email || 'no-email@provided.com',
          phone: formData.phone,
          location: locationMapping[formData.office] || 'Alexandria',
          type: `Quote Request (${formData.coverage})`,
          message: details || 'No additional details provided.',
        }),
      });
    } catch (error) {
      console.error('Submission failed', error);
    }
    setIsSubmitting(false);
    setStep(4);
  };

  const selectedOffice = officeOptions.find(o => o.id === formData.office);
  const selectedCoverage = coverageOptions.find(c => c.id === formData.coverage);
  const isAuto = ['auto', 'motorcycle', 'rv'].includes(formData.coverage);
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
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
              className="w-full max-w-lg bg-ink/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 flex-shrink-0">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-accent mb-0.5">
                    {step < 4 ? `Step ${step} of ${totalSteps}` : 'Done!'}
                  </p>
                  <h3 className="text-base font-bold text-paper">
                    {step === 1 && 'Choose your office'}
                    {step === 2 && 'What can we help with?'}
                    {step === 3 && 'Your contact info'}
                    {step === 4 && "We'll be in touch!"}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-paper/50 hover:text-paper hover:bg-white/10 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              {step < 4 && (
                <div className="h-[2px] w-full bg-white/5 flex-shrink-0">
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              )}

              {/* Body */}
              <div className="overflow-y-auto flex-grow p-6 md:p-8 scrollbar-hide" data-lenis-prevent="true">
                <AnimatePresence mode="wait">

                  {/* ── STEP 1: Office Selection ── */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-paper/60 text-sm font-medium mb-6 leading-relaxed">
                        Select the Insight Insurance office closest to you. They'll handle your quote from start to finish.
                      </p>

                      <div className="flex flex-col gap-3">
                        {officeOptions.map((office) => {
                          const isSelected = formData.office === office.id;
                          return (
                            <button
                              key={office.id}
                              onClick={() => handleOfficeSelect(office.id)}
                              className={`group flex items-center gap-4 w-full p-5 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 ${
                                isSelected
                                  ? 'border-accent bg-accent/15 shadow-[0_0_30px_rgba(227,38,54,0.2)]'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/40'
                              }`}
                            >
                              {/* Icon */}
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                                isSelected ? 'bg-accent/20' : 'bg-white/10 group-hover:bg-accent/10'
                              }`}>
                                <MapPin className={`w-5 h-5 ${isSelected ? 'text-accent' : 'text-paper/60 group-hover:text-accent'}`} />
                              </div>

                              {/* Text */}
                              <div className="flex-grow min-w-0">
                                <div className={`font-bold text-base mb-0.5 transition-colors ${isSelected ? 'text-accent' : 'text-paper group-hover:text-accent'}`}>
                                  {office.name}
                                </div>
                                <div className="text-paper/40 text-xs font-medium">{office.description}</div>
                                <div className="text-paper/30 text-xs font-medium truncate">{office.address}</div>
                              </div>

                              {/* Phone */}
                              <div className="flex-shrink-0 text-right hidden sm:block">
                                <a
                                  href={`tel:${office.phoneRaw}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1.5 text-xs font-bold text-paper/40 hover:text-accent transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  {office.phone}
                                </a>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Or call us */}
                      <p className="text-center text-paper/25 text-xs font-medium mt-6">
                        Rather call? <a href="tel:3185618000" className="text-accent hover:underline">(318) 561-8000</a>
                      </p>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Coverage Type ── */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Selected office badge */}
                      {selectedOffice && (
                        <div className="flex items-center gap-2 mb-6">
                          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            <span className="text-xs font-bold text-accent uppercase tracking-widest">{selectedOffice.name} Office</span>
                          </div>
                        </div>
                      )}

                      <p className="text-paper/60 text-sm font-medium mb-6">
                        What would you like a quote for?
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {coverageOptions.map((opt) => {
                          const isSelected = formData.coverage === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleCoverageSelect(opt.id)}
                              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 text-center group hover:-translate-y-1 ${
                                isSelected
                                  ? 'border-accent bg-accent/15 shadow-[0_0_25px_rgba(227,38,54,0.25)]'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-all ${
                                isSelected ? 'bg-accent/20 scale-110' : 'bg-white/10'
                              }`}>
                                <opt.icon className={`w-5 h-5 ${isSelected ? 'text-accent' : 'text-paper/80'}`} />
                              </div>
                              <span className={`font-bold text-sm leading-tight ${isSelected ? 'text-accent' : 'text-paper'}`}>
                                {opt.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3: Contact Info ── */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      {/* Context badges */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedOffice && (
                          <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5">
                            <MapPin className="w-3 h-3 text-accent" />
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{selectedOffice.name}</span>
                          </div>
                        )}
                        {selectedCoverage && (
                          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                            {selectedCoverage && <selectedCoverage.icon className="w-3 h-3 text-paper/50" />}
                            <span className="text-[10px] font-bold text-paper/50 uppercase tracking-widest">{selectedCoverage.title}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-paper/50 text-sm font-medium">
                        We'll get back to you within one business day.
                      </p>

                      {/* Name row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">First Name</label>
                          <input
                            type="text"
                            autoFocus
                            className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">Last Name</label>
                          <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">Phone *</label>
                        <input
                          type="tel"
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">Email</label>
                        <input
                          type="email"
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      {/* ZIP */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">ZIP Code</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                          placeholder="71301"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value.replace(/\D/g, '') })}
                        />
                      </div>

                      {/* Auto-specific fields */}
                      {isAuto && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 border-t border-white/10 pt-4"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Vehicle Details</p>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'Year', placeholder: '2022', key: 'vehicleYear' },
                              { label: 'Make', placeholder: 'Toyota', key: 'vehicleMake' },
                              { label: 'Model', placeholder: 'Camry', key: 'vehicleModel' },
                            ].map(({ label, placeholder, key }) => (
                              <div key={key} className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">{label}</label>
                                <input
                                  type="text"
                                  className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                                  placeholder={placeholder}
                                  value={formData[key as keyof typeof formData]}
                                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Business-specific fields */}
                      {isBusiness && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 border-t border-white/10 pt-4"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Business Details</p>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">Year Business Started</label>
                            <input
                              type="text"
                              className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                              placeholder="e.g. 2015"
                              value={formData.businessStartYear}
                              onChange={(e) => setFormData({ ...formData, businessStartYear: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-paper/50">Type of Services</label>
                            <input
                              type="text"
                              className="w-full bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 rounded-lg p-3 outline-none font-medium text-paper placeholder:text-paper/20 transition-all text-sm"
                              placeholder="e.g. Retail, Contracting, Professional Services..."
                              value={formData.serviceType}
                              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* ── STEP 4: Success ── */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="py-10 flex flex-col items-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                        className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-accent" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-paper mb-3">Request Sent!</h4>
                      {selectedOffice && (
                        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs text-accent font-bold uppercase tracking-widest">
                            {selectedOffice.name} office will reach out
                          </span>
                        </div>
                      )}
                      <p className="text-paper/60 font-medium text-sm max-w-xs mb-4 leading-relaxed">
                        Our team will be in touch within one business day. No pressure — just honest help.
                      </p>
                      {selectedOffice && (
                        <a
                          href={`tel:${selectedOffice.phoneRaw}`}
                          className="text-accent text-sm font-bold hover:underline"
                        >
                          Or call now: {selectedOffice.phone}
                        </a>
                      )}
                      <button
                        onClick={onClose}
                        className="mt-8 bg-accent text-white px-8 py-3.5 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-ink transition-all duration-300"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer Controls */}
              {(step === 2 || step === 3) && (
                <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-between items-center flex-shrink-0">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-paper/50 hover:text-paper transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  {step === 3 && (
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.firstName || !formData.phone || isSubmitting}
                      className={`px-7 py-3 rounded-sm font-bold tracking-widest uppercase text-xs transition-all flex items-center gap-2 min-w-[140px] justify-center ${
                        !formData.firstName || !formData.phone || isSubmitting
                          ? 'bg-white/5 text-paper/30 cursor-not-allowed border border-white/10'
                          : 'bg-accent text-white hover:bg-white hover:text-ink shadow-[0_0_20px_rgba(227,38,54,0.3)]'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                      ) : (
                        <>Send Request <ArrowRight className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
