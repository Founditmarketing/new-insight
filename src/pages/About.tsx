import { motion } from 'motion/react';
import { Scale, ShieldCheck, Users, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getOrganizationSchema } from '../seo/structured-data';
import { Proof } from '../components/Proof';

export function About() {
  return (
    <>
      <SEO
        title="About Us — Meet Justin & Cory"
        description="Insight Insurance is run by Justin Morgan and Cory Chandler out of Alexandria and Ponchatoula, LA. Independent, local, and always here when you need us."
        canonical="/about"
        structuredData={getOrganizationSchema()}
      />

      <div className="bg-paper min-h-screen pt-32">
        
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-accent font-mono mb-6 block">
              About Insight Insurance
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-ink tracking-tight leading-[1.1] mb-8">
              Real People.<br/>
              <span className="text-accent italic font-serif">Right Here.</span>
            </h1>
            <p className="text-xl text-ink/70 font-medium leading-relaxed mb-10">
              We're Justin Morgan and Cory Chandler, and we run Insight Insurance out of 
              Alexandria and Ponchatoula. We live here, we raise our families here, and we've 
              been through the same storms you have — literally. When you call, you get us.
            </p>
          </motion.div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-stone rounded-2xl p-10 border border-slate/10"
            >
              <div className="w-12 h-12 rounded-lg bg-ink/5 flex items-center justify-center mb-6 border border-ink/10">
                <Scale className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-ink mb-4 uppercase tracking-wide">Independent by Choice</h2>
              <p className="text-ink/70 leading-relaxed font-medium">
                We work with over 50 carriers, which means we're not locked into selling you one 
                company's product. We shop around, compare options, and find what actually fits your situation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-stone rounded-2xl p-10 border border-slate/10"
            >
              <div className="w-12 h-12 rounded-lg bg-ink/5 flex items-center justify-center mb-6 border border-ink/10">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-ink mb-4 uppercase tracking-wide">Here When It Counts</h2>
              <p className="text-ink/70 leading-relaxed font-medium">
                When something goes wrong, you shouldn't have to fight your insurance company. 
                We step in, handle the back-and-forth, and make sure your claim gets the attention it deserves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-stone rounded-2xl p-10 border border-slate/10"
            >
              <div className="w-12 h-12 rounded-lg bg-ink/5 flex items-center justify-center mb-6 border border-ink/10">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-ink mb-4 uppercase tracking-wide">Family-Owned, Locally Run</h2>
              <p className="text-ink/70 leading-relaxed font-medium">
                We're not a franchise or a call center. We're a small team that knows the communities 
                we serve because we live in them. Your policy matters to us because you're our neighbor.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-stone rounded-2xl p-10 border border-slate/10"
            >
              <div className="w-12 h-12 rounded-lg bg-ink/5 flex items-center justify-center mb-6 border border-ink/10">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-ink mb-4 uppercase tracking-wide">25+ Years in Louisiana</h2>
              <p className="text-ink/70 leading-relaxed font-medium">
                Through hurricanes, floods, and everything in between — we've been here. 
                That kind of experience means we know exactly what Louisiana families need covered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
          <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: 'Alexandria', address: '5215 B Jackson St', zip: 'Alexandria, LA 71303', phone: '(318) 561-8000' },
              { city: 'Ponchatoula', address: '1133 Hwy 51, Suite 105', zip: 'Ponchatoula, LA 70454', phone: '(985) 242-4300' },
              { city: 'Slidell', address: '1352 7th St', zip: 'Slidell, LA 70458', phone: '(985) 643-3304' },
            ].map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-slate/10 rounded-xl p-8"
              >
                <h3 className="font-bold text-lg mb-4 text-ink">{office.city}</h3>
                <div className="flex items-start gap-3 mb-3 text-ink/70">
                  <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{office.address}<br/>{office.zip}</span>
                </div>
                <div className="flex items-center gap-3 mb-3 text-ink/70">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="text-sm font-medium hover:text-accent transition-colors">{office.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-ink/70">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <a href="mailto:support@insighthelps.com" className="text-sm font-medium hover:text-accent transition-colors">support@insighthelps.com</a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <Proof />
      </div>
    </>
  );
}
