import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, CheckCircle2, ShieldAlert } from 'lucide-react';

type Message = {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
};

export function Concierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [reportReady, setReportReady] = useState(false);

  // The predefined conversation flow
  const flow = [
    {
      text: "Hello. I'm the Insight Digital Advisor. Would you like a rapid, 3-question coverage audit?",
      options: ["Yes, let's start", "Maybe later"]
    },
    {
      text: "Excellent. First, do you currently own your primary residence?",
      options: ["Yes, I own", "No, I rent"]
    },
    {
      text: "Understood. Are there any drivers under the age of 25 in your household?",
      options: ["Yes, young drivers", "No young drivers"]
    },
    {
      text: "Finally, do you own any secondary assets like boats, RVs, ATVs, or motorcycles?",
      options: ["Yes, I have toys", "No secondary assets"]
    }
  ];

  // Initialize chat when opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      simulateBotTyping(flow[0].text, flow[0].options);
    }
  }, [isOpen]);

  const simulateBotTyping = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), type: 'bot', content: text, options }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5s - 2.5s typing delay
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => {
      const newMessages = [...prev];
      // Remove options from the previous bot message so they can't be clicked again
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].options = undefined;
      }
      return [...newMessages, { id: Date.now().toString(), type: 'user', content: option }];
    });

    // Determine next step
    if (step === 0 && option === "Maybe later") {
      simulateBotTyping("No problem. I'll be here when you're ready.");
      return;
    }

    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep < flow.length) {
      simulateBotTyping(flow[nextStep].text, flow[nextStep].options);
    } else {
      // Conclusion
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setReportReady(true);
      }, 2500);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', bounce: 0.5 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-accent text-white shadow-institutional flex items-center justify-center hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-7 h-7" />
        {/* Notification Dot */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-ink rounded-full border-2 border-paper animate-pulse" />
      </motion.button>

      {/* Chat Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-[calc(100vw-3rem)] md:w-[400px] h-[600px] max-h-[85vh] bg-ink/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-white/10 bg-white/5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-[0_0_15px_rgba(227,38,54,0.5)]">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-sans text-paper tracking-tight leading-tight">Insight AI</h3>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-accent flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-paper/50 hover:text-paper hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-hide relative z-10 flex flex-col">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 ${msg.type === 'user' ? 'bg-white/10 text-paper border border-white/5 rounded-tr-sm' : 'bg-accent/10 border border-accent/20 text-paper rounded-tl-sm'}`}>
                    <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                    
                    {/* Render Action Buttons if any */}
                    {msg.options && (
                      <div className="mt-4 flex flex-col gap-2">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleOptionClick(opt)}
                            className="bg-white/5 border border-white/10 hover:bg-accent hover:border-accent text-paper text-xs font-bold tracking-widest uppercase py-2 px-4 rounded-lg transition-all text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 w-16 h-10 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-paper/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-paper/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-paper/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {/* Fake Final Report */}
              {reportReady && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 border-2 border-accent bg-accent/5 rounded-xl p-5 shadow-[0_0_30px_rgba(227,38,54,0.15)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-5 h-5 text-accent" />
                    <h4 className="text-sm font-bold text-accent tracking-widest uppercase">Coverage Gap Report</h4>
                  </div>
                  <p className="text-xs text-paper/80 leading-relaxed mb-4">
                    Based on your rapid profile, you have complex liability exposure. Louisiana homeowners with teenage drivers and secondary leisure assets require specialized overarching protection, typically a $1M+ Umbrella policy, which is missing from 80% of standard policies.
                  </p>
                  <button className="w-full bg-accent text-white py-3 rounded-md text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-ink transition-colors shadow-[0_0_15px_rgba(227,38,54,0.4)]">
                    Schedule Detailed Audit
                  </button>
                </motion.div>
              )}
            </div>

            {/* Input Area (Disabled during guided flow) */}
            <div className="p-4 border-t border-white/10 bg-white/5 relative z-10">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  disabled
                  placeholder="Select an option above..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-paper placeholder:text-paper/30 outline-none cursor-not-allowed"
                />
                <button disabled className="absolute right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-paper/30 cursor-not-allowed">
                  <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
