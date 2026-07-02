import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getOrganizationSchema } from '../seo/structured-data';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://www.founditos.com/api/contact-form/b3abea70-98e0-41c0-82cd-b07245bb915e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Type: ${formData.type}\nLocation: ${formData.location}\n\n${formData.message}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('Submission failed');
        alert('There was a problem submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a problem submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      city: 'Alexandria',
      address: '5215 B Jackson St',
      zip: 'Alexandria, LA 71303',
      phone: '(318) 561-8000',
      phoneRaw: '3185618000',
      mapQuery: '5215+B+Jackson+St+Alexandria+LA+71303',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=5215+B+Jackson+St+Alexandria+LA+71303',
    },
    {
      city: 'Ponchatoula',
      address: '1133 Hwy 51, Suite 105',
      zip: 'Ponchatoula, LA 70454',
      phone: '(985) 242-4300',
      phoneRaw: '9852424300',
      mapQuery: '1133+Hwy+51+Suite+105+Ponchatoula+LA+70454',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1133+Hwy+51+Suite+105+Ponchatoula+LA+70454',
    },
    {
      city: 'Slidell',
      address: '1352 7th St',
      zip: 'Slidell, LA 70458',
      phone: '(985) 643-3304',
      phoneRaw: '9856433304',
      mapQuery: '1352+7th+St+Slidell+LA+70458',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1352+7th+St+Slidell+LA+70458',
    },
  ];

  return (
    <>
      <SEO
        title="Contact Us — Get a Free Quote"
        description="Reach out to Insight Insurance for a free quote. Offices in Alexandria, Ponchatoula, and Slidell, Louisiana. Call or fill out our form — no pressure, just honest help."
        canonical="/contact"
        structuredData={getOrganizationSchema()}
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">

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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                      <label className="block text-sm font-bold text-ink/60 uppercase tracking-widest mb-2">Location</label>
                      <select
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-white border border-slate/20 rounded-lg py-3 px-4 text-ink font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      >
                        <option value="">Select office...</option>
                        <option value="Alexandria">Alexandria</option>
                        <option value="Ponchatoula">Ponchatoula</option>
                        <option value="Slidell">Slidell</option>
                      </select>
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
                    disabled={isSubmitting}
                    className="bg-accent text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-ink transition-colors shadow-[0_0_30px_rgba(227,38,54,0.3)] flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
                  Monday – Friday: 9:00 AM – 4:30 PM<br/>
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

              {/* Offices quick ref */}
              {offices.map((office) => (
                <div key={office.city} className="border border-slate/10 rounded-xl p-8">
                  <h3 className="font-bold text-ink mb-3">{office.city}</h3>
                  <div className="flex items-start gap-3 mb-2 text-ink/70 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                    <span className="font-medium">{office.address}<br/>{office.zip}</span>
                  </div>
                  <div className="flex items-center gap-3 text-ink/70 text-sm">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                    <a href={`tel:${office.phoneRaw}`} className="font-medium hover:text-accent transition-colors">{office.phone}</a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Office Maps Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Find Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, i) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-ink">{office.city}</h3>
                    <a
                      href={`tel:${office.phoneRaw}`}
                      className="text-sm font-bold text-accent hover:underline"
                    >
                      {office.phone}
                    </a>
                  </div>
                  
                  {/* Embedded Map */}
                  <div className="rounded-2xl overflow-hidden border border-slate/10 shadow-sm">
                    <iframe
                      title={`Map of Insight Insurance ${office.city} office`}
                      width="100%"
                      height="240"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${office.mapQuery}&output=embed&z=15`}
                    />
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-ink/60 font-medium">
                    <span>{office.address}, {office.zip}</span>
                  </div>

                  <a
                    href={office.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-ink/15 text-ink/70 px-6 py-3 rounded-lg font-bold tracking-widest uppercase text-xs hover:border-accent hover:text-accent transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Click for Directions
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
