import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Users, Heart, CheckCircle2, Send, Upload, X, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';

const values = [
  {
    icon: Briefcase,
    title: 'Professional Growth',
    description: 'We invest in our team. Whether you\'re new to insurance or a seasoned agent, we provide the tools and mentorship to help you grow.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We\'re locals serving locals. Every member of our team genuinely cares about the people and communities we protect.',
  },
  {
    icon: Heart,
    title: 'Culture of Care',
    description: 'We believe in doing the right thing — for our clients and for each other. We treat teammates with the same respect we show clients.',
  },
];

const positions = [
  'Insurance Agent (Licensed)',
  'Customer Service Representative',
  'Commercial Lines Account Manager',
  'Marketing & Social Media',
  'Office Administration',
  'Other / General Inquiry',
];

export function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  });

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    // Accept PDF, DOC, DOCX up to 5MB
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File must be under 5MB.');
      return;
    }
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Use FormData to support file attachment
      const data = new FormData();
      data.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY_HERE');
      data.append('subject', `Career Application — ${formData.position}`);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('position', formData.position);
      data.append('message', formData.message);
      if (resumeFile) {
        data.append('attachment', resumeFile, resumeFile.name);
      }

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
    } catch (err) {
      console.error('Submission failed', err);
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Careers — Join Insight Insurance"
        description="Join the Insight Insurance team. We're looking for motivated professionals who want to make a difference in Louisiana families' lives. Apply today."
        canonical="/careers"
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-20"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-6 block">
              Join Our Team
            </span>
            <h1 className="text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-8">
              Build Something<br/>
              <span className="text-accent italic font-serif">Worth Protecting.</span>
            </h1>
            <p className="text-xl text-ink/70 font-medium leading-relaxed">
              At Insight Insurance, we're more than a team — we're neighbors helping neighbors. 
              If you're passionate about making a real difference in people's lives and want to grow with a thriving independent agency, we'd love to hear from you.
            </p>
          </motion.div>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-ink tracking-tight mb-10">Why Insight?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="bg-stone rounded-2xl p-8 border border-slate/10"
                >
                  <div className="w-12 h-12 rounded-lg bg-ink/5 border border-ink/10 flex items-center justify-center mb-6">
                    <val.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg text-ink mb-3">{val.title}</h3>
                  <p className="text-ink/70 text-sm font-medium leading-relaxed">{val.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-ink tracking-tight mb-10">Apply Now</h2>

            {submitted ? (
              <div className="bg-stone rounded-2xl p-16 border border-slate/10 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-ink mb-4">Application Received!</h3>
                <p className="text-ink/70 font-medium max-w-md mx-auto">
                  Thank you for your interest in joining our team. We'll review your application and reach out within a few business days if there's a fit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-stone rounded-2xl p-8 md:p-12 border border-slate/10 max-w-3xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Position of Interest *</label>
                    <select
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    >
                      <option value="">Select a role...</option>
                      {positions.map((pos) => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">
                    Resume <span className="text-ink/30 normal-case font-medium tracking-normal">(PDF, DOC, or DOCX · max 5MB)</span>
                  </label>

                  {resumeFile ? (
                    /* File selected — show preview card */
                    <div className="flex items-center gap-4 bg-white border border-emerald-200 rounded-lg px-4 py-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-ink text-sm truncate">{resumeFile.name}</p>
                        <p className="text-ink/40 text-xs">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                        className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 hover:text-accent hover:bg-accent/10 transition-colors flex-shrink-0"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* Drop zone */
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`flex flex-col items-center justify-center gap-3 w-full py-8 px-4 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 ${
                        dragOver
                          ? 'border-accent bg-accent/5 scale-[1.01]'
                          : 'border-slate/25 bg-white hover:border-accent/50 hover:bg-accent/3'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${dragOver ? 'bg-accent/15' : 'bg-ink/5'}`}>
                        <Upload className={`w-5 h-5 transition-colors ${dragOver ? 'text-accent' : 'text-ink/40'}`} />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-sm text-ink">
                          {dragOver ? 'Drop it here!' : 'Click to upload or drag & drop'}
                        </p>
                        <p className="text-xs text-ink/40 font-medium mt-0.5">PDF, DOC, DOCX up to 5MB</p>
                      </div>
                    </div>
                  )}

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Tell Us About Yourself *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                    placeholder="Tell us about your background, experience in insurance or customer service, and why you're interested in joining Insight..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-3 px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-ink/30 text-paper/40 cursor-not-allowed'
                      : 'bg-accent text-white hover:bg-ink shadow-[0_0_30px_rgba(227,38,54,0.3)]'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
                  ) : (
                    <>Submit Application <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </>
  );
}
