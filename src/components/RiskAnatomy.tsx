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
      desc: 'Louisiana roofs take a beating during storm season. We make sure your wind and hail deductibles don\'t leave you stuck paying out of pocket for a new roof.'
    },
    {
      id: 'garage',
      x: '75%',
      y: '65%',
      icon: Shield,
      title: 'Auto & Toys',
      desc: 'Your garage, workshop, or detached buildings need their own coverage. We check to make sure everything\'s protected — on the road and at home.'
    },
    {
      id: 'perimeter',
      x: '25%',
      y: '70%',
      icon: AlertTriangle,
      title: 'Premises Liability',
      desc: 'Swimming pools, trampolines, pets — regular life stuff can become real liability issues. We help make sure your coverage is enough if something happens.'
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
            <span className="text-sm font-bold tracking-widest uppercase text-accent">How We Look at Your Home</span>
            <div className="h-px w-8 bg-accent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-bold text-paper tracking-tight mb-6"
          >
            Understanding Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FF6B35]">Coverage.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-paper/70 font-medium"
          >
            Hover over the hotspots below to see the kinds of things we look for when reviewing a home policy.
            <span className="block md:hidden text-sm mt-2 text-paper/50">(Tap a hotspot to learn more)</span>
          </motion.p>
        </div>

        {/* The Interactive Image Container */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10 group">
          <img 
            src="/images/acadian_home.png" 
            alt="Louisiana Acadian home showing coverage areas — roof, windows, foundation" 
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
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
          <span className="text-xs font-bold tracking-widest uppercase">Tap a hotspot to learn more</span>
        </div>

      </div>
    </section>
  );
}
