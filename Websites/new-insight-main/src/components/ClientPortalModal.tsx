import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UploadCloud, CreditCard, Shield, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ClientPortalModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'pay' | 'claim'>('claim');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Simulate a secure file upload sequence
  const handleSimulatedUpload = () => {
    setIsUploading(true);
    // Fake a 2 second API upload stream
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      // Reset after success
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 2500);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSimulatedUpload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          
          {/* Deep blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.4)] flex flex-col md:flex-row h-[90vh] md:h-[700px]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-ink" />
            </button>

            {/* Left Sidebar Menu */}
            <div className="w-full md:w-1/3 bg-stone border-r border-slate/10 p-8 flex flex-col">
              <div className="mb-12">
                <Shield className="w-8 h-8 text-accent mb-4" />
                <h2 className="text-2xl font-bold font-sans text-ink tracking-tight mb-2">Client Hub</h2>
                <p className="text-sm font-medium text-slate">Secure access to your protective infrastructure.</p>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setActiveTab('claim')}
                  className={`w-full text-left px-5 py-4 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    activeTab === 'claim' 
                    ? 'bg-white shadow-sm border border-slate/10 text-accent' 
                    : 'text-ink/60 hover:bg-white/50 border border-transparent hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4" />
                    File a Claim / Upload
                  </div>
                </button>
                
                <button 
                  onClick={() => setActiveTab('pay')}
                  className={`w-full text-left px-5 py-4 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    activeTab === 'pay' 
                    ? 'bg-white shadow-sm border border-slate/10 text-accent' 
                    : 'text-ink/60 hover:bg-white/50 border border-transparent hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4" />
                    Secure Invoice Payment
                  </div>
                </button>
              </div>

              <div className="mt-auto pt-8">
                <div className="bg-white/50 p-4 border border-slate/10 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-slate flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate font-medium leading-relaxed">
                    All document uploads are encrypted end-to-end and directly routed to the private ledger of your dedicated agent.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="w-full md:w-2/3 bg-white p-8 md:p-12 overflow-y-auto">
              
              <AnimatePresence mode="wait">
                {activeTab === 'claim' ? (
                  <motion.div 
                    key="claim"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <h3 className="text-3xl font-bold font-sans tracking-tight text-ink mb-2">Secure Upload Vault</h3>
                    <p className="text-slate font-medium mb-8">Drop damage assessment photos, inspection PDFs, or signed policy documents directly into the secure ledger.</p>
                    
                    {/* Drag and Drop Zone */}
                    <div 
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      className={`relative flex-grow min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-colors ${
                        isDragging 
                        ? 'border-accent bg-accent/5' 
                        : uploadSuccess 
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate/20 bg-stone hover:border-accent/40 hover:bg-stone/80'
                      }`}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 border-4 border-slate/20 border-t-accent rounded-full animate-spin mb-4" />
                          <p className="font-bold text-ink">Encrypting & Routing Data...</p>
                          <p className="text-xs text-slate mt-1">Please do not close this window.</p>
                        </div>
                      ) : uploadSuccess ? (
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                          </div>
                          <h4 className="text-xl font-bold text-ink mb-2">Upload Verified</h4>
                          <p className="text-slate text-sm max-w-sm">Files have been securely received. Your dedicated agent will review the transmission immediately.</p>
                        </motion.div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                            <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-accent' : 'text-slate'}`} />
                          </div>
                          <h4 className="text-lg font-bold text-ink mb-2">Drag & Drop Files</h4>
                          <p className="text-slate text-sm text-center max-w-xs mb-6">Support for high-res JPEGs, PDFs, and standard video formats up to 50MB.</p>
                          <label className="bg-ink text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-accent hover:shadow-[0_0_20px_rgba(227,38,54,0.3)] transition-all">
                            Browse Local Files
                            <input type="file" className="hidden" multiple onChange={handleSimulatedUpload} />
                          </label>
                        </>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="pay"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <h3 className="text-3xl font-bold font-sans tracking-tight text-ink mb-2">Premium Remittance</h3>
                    <p className="text-slate font-medium mb-12">Wire funds securely directly into our operating ledger to maintain active network coverage.</p>
                    
                    <div className="bg-stone border border-slate/10 rounded-2xl p-8 mb-6">
                      <div className="flex items-center gap-4 mb-6">
                        <CreditCard className="w-6 h-6 text-accent" />
                        <h4 className="text-xl font-bold text-ink">Third-Party Gateway</h4>
                      </div>
                      <p className="text-slate text-sm leading-relaxed mb-8">
                        For ultimate security compliance, all invoice processing and premium payments are routed off-site through our secure enterprise gateway.
                      </p>
                      <button className="w-full bg-ink text-paper py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex justify-between items-center px-6 group hover:bg-accent transition-colors">
                        Launch Secure Payment Gateway
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    <p className="text-xs text-slate/60 text-center mt-auto">
                      Transactions are secured via 256-bit SSL encryption. We never store raw credit card data on local servers.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
