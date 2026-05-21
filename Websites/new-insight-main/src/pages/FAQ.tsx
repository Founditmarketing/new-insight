import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTA } from '../components/CTA';

const faqs = [
  {
    q: 'What does "independent agency" mean?',
    a: 'It means we\'re not tied to a single insurance company. We work with over 50 carriers and shop your policy across all of them to find the best coverage at the best price. A captive agent can only sell you their company\'s product — we can sell you anyone\'s.',
  },
  {
    q: 'How much does it cost to get a quote?',
    a: 'Nothing. Quotes are always free, and there\'s no obligation. Just give us a call or fill out our contact form and we\'ll get back to you within one business day.',
  },
  {
    q: 'Do I need flood insurance in Louisiana?',
    a: 'If you have a mortgage in a flood zone, your lender will require it. But even if you\'re not in a designated flood zone, we strongly recommend it. Over 25% of flood claims in the U.S. come from outside high-risk areas. Louisiana gets hit hard — it\'s worth having.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We have offices in Alexandria, Ponchatoula, and Slidell, but we serve families and businesses across the entire state of Louisiana.',
  },
  {
    q: 'Can you help with a claim?',
    a: 'Absolutely. That\'s one of the biggest advantages of working with a local agent. When you need to file a claim, you call us — not a 1-800 number. We walk you through the process and advocate on your behalf with the carrier.',
  },
  {
    q: 'What types of insurance do you offer?',
    a: 'Home, auto, commercial/business, flood, life, marine/boat, surety bonds, and umbrella (excess liability) insurance. If you\'re not sure what you need, just ask — we\'ll help you figure it out.',
  },
  {
    q: 'How do I switch my insurance to Insight?',
    a: 'It\'s easy. Give us a call or fill out a quote request and we\'ll review your current policy. If we can find you better coverage or a better rate, we handle all the paperwork. There\'s no gap in coverage during the switch.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes, most of our carriers offer flexible payment options including monthly, quarterly, and annual plans. We\'ll help you find an option that works for your budget.',
  },
];

function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number; key?: string | number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-slate/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-ink pr-8 group-hover:text-accent transition-colors">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-ink/70 font-medium leading-relaxed max-w-3xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <>
      <SEO
        title="FAQ — Common Insurance Questions"
        description="Answers to common insurance questions about coverage, claims, flood insurance, switching agents, and more. Insight Insurance serves Alexandria, Ponchatoula, and Slidell, LA."
        canonical="/faq"
        structuredData={getFAQSchema()}
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-6 block">
              Frequently Asked Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-6">
              Got Questions?<br />
              <span className="text-accent italic font-serif">We've Got Answers.</span>
            </h1>
            <p className="text-lg text-ink/70 font-medium leading-relaxed">
              Here are some things people ask us most often. If you don't see your 
              question here, just give us a call — we're happy to help.
            </p>
          </motion.div>

          <div className="mb-16">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>

        <CTA onOpenQuote={onOpenQuote} />
      </div>
    </>
  );
}
