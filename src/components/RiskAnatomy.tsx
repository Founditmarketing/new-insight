import { motion } from 'motion/react';
import { Home, Shield, AlertTriangle, Wind, Info } from 'lucide-react';

export function RiskAnatomy() {
  const hotspots = [
    {
      id: 'roof',
      x: '55%',
      y: '25%',
      icon: Wind,
      title: 'Wind & Hail Deductibles',
      desc: 'Louisiana roofs bear the brunt of tropical weather. We properly calibrate your separate named-storm deductibles to ensure replacing your roof doesn\'t bankrupt you.'
    },
    {
      id: 'garage',
      x: '75%',
      y: '65%',
      icon: Shield,
      title: 'Auto & Toys',
      desc: 'Detached structures and the vehicles inside them face unique liabilities. We audit to ensure your assets are protected both on the road and in storage.'
    },
    {
      id: 'perimeter',
      x: '25%',
      y: '70%',
      icon: AlertTriangle,
      title: 'Premises Liability',
      desc: 'Slip and falls, swimming pools, or pet incidents on your property. Standard limits are rarely enough; we secure your overarching wealth from lawsuits.'
    }
  ];

  return (
    <section className="py-24 bg-ink relative overflow-hidden">
      {/* Background Noise & Glow */}
      <div className="noise-overlay opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-accent" />
            <span className="text-sm font-bold tracking-widest uppercase text-accent">Interactive Risk Anatomy</span>
            <div className="h-px w-8 bg-accent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-bold text-paper tracking-tight mb-6"
          >
            Anatomy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FF6B35]">Protection</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-paper/70 font-medium"
          >
            Hover over the hotspots below to understand exactly how we engineer custom defenses for your local Louisiana assets. 
          </motion.p>
        </div>

        {/* The Interactive Image Container */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10 group">
          <img 
            src="/images/acadian_home.png" 
            alt="Beautiful Louisiana Acadian Home" 
            className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/30 transition-opacity duration-500 group-hover:bg-ink/50" />

          {/* Hotspots */}
          {hotspots.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.2), type: "spring" }}
              className="absolute z-20"
              style={{ left: spot.x, top: spot.y }}
            >
              {/* Pulsing Core */}
              <div className="relative group/spot cursor-pointer">
                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-70" />
                <div className="relative w-12 h-12 bg-accent/90 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center text-white shadow-[0_0_20px_rgba(227,38,54,0.6)] group-hover/spot:scale-110 transition-transform">
                  <spot.icon className="w-5 h-5" />
                </div>

                {/* Hover Card */}
                <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 w-72 bg-ink/80 backdrop-blur-2xl border border-white/10 rounded-xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover/spot:opacity-100 group-hover/spot:visible transition-all duration-300 translate-x-4 group-hover/spot:translate-x-0 pointer-events-none z-30">
                  <h4 className="text-accent font-bold mb-2 flex items-center gap-2">
                    {spot.title}
                  </h4>
                  <p className="text-paper/70 text-sm font-medium leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-Legend */}
        <div className="mt-8 flex items-center justify-center gap-2 text-paper/50">
          <Info className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">Tap hotspots to view structural coverage details</span>
        </div>

      </div>
    </section>
  );
}
