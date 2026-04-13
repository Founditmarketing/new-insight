import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    { city: 'Alexandria', address: '5215 B Jackson St', zip: 'Alexandria, LA 71303', phone: '(318) 561-8000' },
    { city: 'Ponchatoula', address: '1133 Hwy 51, Suite 105', zip: 'Ponchatoula, LA 70454', phone: '(985) 242-4300' },
    { city: 'Slidell', address: '1352 7th St', zip: 'Slidell, LA 70458', phone: '(985) 643-3304' },
  ];

  return (
    <>
      <SEO
        title="Contact Us — Get a Free Quote"
        description="Reach out to Insight Insurance for a free quote. Offices in Alexandria, Ponchatoula, and Slidell, Louisiana. Call or fill out our form — no pressure, just honest help."
        canonical="/contact"
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-6 block">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-6">
              Let's <span className="text-accent italic font-serif">Talk.</span>
            </h1>
            <p className="text-lg text-ink/70 font-medium leading-relaxed">
              Whether you need a new policy, want a second opinion on your current coverage, or just 
              have a question — we're here. No sales pitch, just a conversation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="bg-stone rounded-2xl p-12 border border-slate/10 text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-ink mb-4">Thanks for reaching out!</h2>
                  <p className="text-ink/70 font-medium">
                    We'll get back to you within one business day. If you need help sooner, 
                    give us a call at any of our offices.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-stone rounded-2xl p-8 md:p-10 border border-slate/10">
                  <h2 className="text-xl font-bold text-ink mb-8 uppercase tracking-wide">Send Us a Message</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Email</label>
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
                      <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">I need help with</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      >
                        <option value="">Select one...</option>
                        <option value="home">Home Insurance</option>
                        <option value="auto">Auto Insurance</option>
                        <option value="business">Business Insurance</option>
                        <option value="flood">Flood Insurance</option>
                        <option value="life">Life Insurance</option>
                        <option value="marine">Boats & Marine</option>
                        <option value="other">Something Else</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                      placeholder="Tell us a little about what you're looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-accent text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-ink transition-colors shadow-[0_0_30px_rgba(227,38,54,0.3)] flex items-center gap-3"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Sidebar — Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col gap-8"
            >
              {/* Hours */}
              <div className="border border-slate/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-ink uppercase tracking-wide text-sm">Office Hours</h3>
                </div>
                <p className="text-ink/70 font-medium text-sm leading-relaxed">
                  Monday – Friday: 8:00 AM – 5:00 PM<br/>
                  Saturday – Sunday: Closed<br/>
                  <span className="text-accent font-bold">24/7 Claims Support Available</span>
                </p>
              </div>

              {/* Email */}
              <div className="border border-slate/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-ink uppercase tracking-wide text-sm">Email</h3>
                </div>
                <a href="mailto:support@insighthelps.com" className="text-ink/70 font-medium hover:text-accent transition-colors">
                  support@insighthelps.com
                </a>
              </div>

              {/* Offices */}
              {offices.map((office) => (
                <div key={office.city} className="border border-slate/10 rounded-xl p-8">
                  <h3 className="font-bold text-ink mb-3">{office.city}</h3>
                  <div className="flex items-start gap-3 mb-2 text-ink/70 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                    <span className="font-medium">{office.address}<br/>{office.zip}</span>
                  </div>
                  <div className="flex items-center gap-3 text-ink/70 text-sm">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                    <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="font-medium hover:text-accent transition-colors">{office.phone}</a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
