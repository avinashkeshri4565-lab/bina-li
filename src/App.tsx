import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Menu, X, Phone, MessageSquare, MapPin, Mail, 
  Star, Trophy, Clock, CheckCircle2, Youtube, 
  Wind, Wifi, Shield, Droplets, VolumeX, Sofa, 
  Map as MapIcon, Facebook, Instagram, Twitter
} from 'lucide-react';
import { Language, translations } from './translations';

// --- Components ---

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const finalValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = finalValue;
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = (totalMiliseconds / end);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, finalValue, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: t.home, id: 'home' },
    { name: t.about, id: 'about' },
    { name: t.facilities, id: 'facilities' },
    { name: t.plans, id: 'plans' },
    { name: t.exams, id: 'exams' },
    { name: t.gallery, id: 'gallery' },
    { name: t.youtube, id: 'youtube' },
    { name: t.reviews, id: 'reviews' },
    { name: t.contact, id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-3 border-b border-slate-100' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
          <div className="w-10 h-10 bg-royal rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-royal/20">B</div>
          <div className="flex flex-col">
            <span className={`font-black text-xl tracking-tight leading-none ${scrolled ? 'text-slate-900' : 'text-white'}`}>BINA CENTRAL LIBRARY</span>
            <span className={`text-[11px] font-bold tracking-widest uppercase ${scrolled ? 'text-deep' : 'text-white/80'}`}>बिना सेंट्रल लाइब्रेरी</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {menuItems.slice(0, 6).map((item, i) => (
            <motion.button 
              key={item.id} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
              whileHover={{ y: -2 }}
              onClick={() => scrollTo(item.id)} 
              className={`text-sm font-bold transition-all hover:text-royal tracking-tight ${scrolled ? 'text-slate-600' : 'text-white'}`}
            >
              {item.name}
            </motion.button>
          ))}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button onClick={() => setLang('EN')} className={`px-4 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'EN' ? 'bg-royal text-white shadow-sm' : 'text-slate-400'}`}>EN</button>
            <button onClick={() => setLang('HI')} className={`px-4 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'HI' ? 'bg-deep text-white shadow-sm' : 'text-slate-400'}`}>HI</button>
          </div>
          <button onClick={() => setIsOpen(true)} className={`p-2 rounded-lg transition-all hover:bg-slate-100 hover:text-royal ${scrolled ? 'bg-slate-50 text-slate-900' : 'bg-white/10 text-white'}`}>
            <Menu size={24} />
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm p-1 rounded-full border border-white/30">
            <button onClick={() => setLang('EN')} className={`px-4 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'EN' ? 'bg-royal text-white shadow-sm' : 'text-white'}`}>EN</button>
            <button onClick={() => setLang('HI')} className={`px-4 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'HI' ? 'bg-deep text-white shadow-sm' : 'text-white'}`}>HI</button>
          </div>
          <button onClick={() => setIsOpen(true)} className={`p-2 rounded-lg ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-royal rounded-lg flex items-center justify-center text-white font-black text-xl">B</div>
                  <span className="font-black text-slate-900 tracking-tight">BINA CENTRAL LIBRARY</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><X size={28} /></button>
              </div>
              <div className="flex flex-col gap-4">
                {menuItems.map((item, idx) => (
                  <motion.button 
                    key={item.id} 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => scrollTo(item.id)} 
                    className="flex items-center justify-between text-lg font-black text-slate-700 hover:text-royal transition-all text-left border-b border-slate-50 pb-4"
                  >
                    {item.name}
                    <div className="w-1.5 h-1.5 rounded-full bg-royal/10" />
                  </motion.button>
                ))}
              </div>
              <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-[10px] font-black text-royal uppercase tracking-[0.2em] mb-4">Quick Contact</p>
                <div className="flex flex-col gap-4">
                  <a href="tel:08757512020" className="flex items-center gap-3 text-slate-700 font-bold hover:text-royal transition-all">
                    <Phone size={18} className="text-royal" /> 087575 12020
                  </a>
                  <a href="mailto:binacentrallibrary@gmail.com" className="flex items-center gap-3 text-slate-700 font-bold hover:text-royal transition-all text-sm overflow-hidden text-ellipsis">
                    <Mail size={18} className="text-royal" /> binacentrallibrary@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang].hero;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-slate-950">
      {/* Background with deep dark contrast */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=2070" 
          className="w-full h-full object-cover opacity-40" 
          alt="Library Background" 
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8"
          >
            <motion.div
               variants={itemVariants}
               className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-royal/30 text-royal font-black text-[10px] tracking-[0.2em] uppercase rounded-full mb-10 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-royal"></span>
              </span>
              {t.badge}
            </motion.div>

            {/* Structured Hierarchy */}
            <div className="space-y-6">
              {/* 1. Main Heading (English) */}
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                BINA CENTRAL <span className="text-royal drop-shadow-[0_0_15px_rgba(11,77,255,0.4)]">LIBRARY</span>
              </motion.h1>
              
              {/* 2. Sub Heading (Hindi) */}
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-5xl font-black text-deep/90 tracking-tight brightness-110"
              >
                बिना सेंट्रल लाइब्रेरी
              </motion.h2>

              {/* 3 & 4. Taglines (English & Hindi) */}
              <motion.div variants={itemVariants} className="pt-4 space-y-4 max-w-2xl">
                <p className="text-xl md:text-2xl text-slate-100 font-bold tracking-tight">
                  Bettiah’s Most Trusted 24x7 Self Study Library
                </p>
                <p className="text-lg md:text-xl text-slate-400 font-medium italic">
                  बेतिया की सबसे भरोसेमंद 24x7 लाइब्रेरी
                </p>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 mt-14 mb-16">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(11,77,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="gradient-btn px-10 py-5 text-white font-black text-lg rounded-xl flex items-center gap-3"
              >
                {t.ctaBook} 
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.98 }}
                href="tel:08757512020" className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 font-black text-lg rounded-xl transition-all flex items-center gap-2 shadow-xl shadow-black/10"
              >
                <Phone size={20} /> {t.ctaCall}
              </motion.a>
            </motion.div>

            <motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Google Rating', val: '4.9', icon: Star, color: 'text-yellow-400' },
                { label: 'Real Reviews', val: '668+', icon: Trophy, color: 'text-deep' },
                { label: 'Always Open', val: '24/7', icon: Clock, color: 'text-royal' },
                { label: 'Happy Students', val: '1000+', icon: CheckCircle2, color: 'text-green-400' },
              ].map((stat, i) => (
                <motion.div 
                  variants={itemVariants}
                  key={i} 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl group hover:border-royal/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon size={20} className={`${stat.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-2xl font-black text-white">
                      <Counter value={stat.val} />
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AdmissionPopup = ({ lang }: { lang: Language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = translations[lang].popup;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible && !isSubmitted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsVisible(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {(isVisible || isSubmitted) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsVisible(false)} 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 40 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 40 }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20"
          >
            <motion.button 
              whileHover={{ rotate: 90, scale: 1.1 }}
              onClick={() => setIsVisible(false)} 
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors z-10"
            >
              <X size={24} />
            </motion.button>
            <div className="p-10 md:p-12">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{t.success}</h3>
                </motion.div>
              ) : (
                <>
                  <div className="flex flex-col items-center text-center mb-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex px-4 py-1 bg-royal text-white text-[10px] font-black rounded-full mb-4 uppercase tracking-[0.2em] shadow-lg shadow-royal/20"
                    >
                      Admission Open
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl font-black text-slate-900 mb-2 leading-tight tracking-tight"
                    >
                      Join Today & Get <span className="text-deep">20% OFF</span>
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-500 font-bold uppercase text-[10px] tracking-widest"
                    >
                      {t.title}
                    </motion.p>
                  </div>
                  <motion.form 
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
                    {[
                      { type: "text", placeholder: t.name },
                      { type: "tel", placeholder: t.mobile }
                    ].map((input, i) => (
                      <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} key={i}>
                        <motion.input 
                          whileFocus={{ scale: 1.02, borderColor: "#0B4DFF" }}
                          required type={input.type} placeholder={input.placeholder} className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-royal/20 outline-none transition-all font-bold text-sm text-slate-800" 
                        />
                      </motion.div>
                    ))}
                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                      <select required className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-royal/20 outline-none transition-all font-bold text-sm text-slate-800 appearance-none">
                        <option value="">{t.course}</option>
                        <option value="BPSC">BPSC</option>
                        <option value="SSC">SSC</option>
                        <option value="Railway">Railway</option>
                        <option value="Banking">Banking</option>
                      </select>
                    </motion.div>
                    <motion.button 
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(11,77,255,0.2)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" className="w-full py-5 gradient-btn text-white font-black text-lg rounded-xl mt-4"
                    >
                      {t.submit}
                    </motion.button>
                  </motion.form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="flex flex-col items-center text-center mb-16 px-4">
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className={`text-3xl md:text-[3.5rem] font-black mb-4 leading-none tracking-tighter ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      {subtitle && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className={`max-w-2xl text-lg font-medium mt-4 ${light ? 'text-slate-300' : 'text-slate-500'}`}>{subtitle}</motion.p>}
      <motion.div 
        initial={{ width: 0 }} 
        whileInView={{ width: 128 }} 
        transition={{ delay: 0.5, duration: 1 }} 
        className="h-2 bg-gradient-to-r from-royal to-deep rounded-full mt-8 mx-auto shadow-lg shadow-royal/10" 
      />
    </motion.div>
  </div>
);

const Facilities = ({ lang }: { lang: Language }) => {
  const t = translations[lang].facilities;
  const items = [
    { name: t.ac, icon: Wind, color: 'bg-blue-50', glow: 'hover:shadow-[0_0_20px_rgba(11,77,255,0.2)]' },
    { name: t.wifi, icon: Wifi, color: 'bg-indigo-50', glow: 'hover:shadow-[0_0_20px_rgba(229,27,43,0.15)]' },
    { name: t.cctv, icon: Shield, color: 'bg-purple-50', glow: 'hover:shadow-[0_0_20px_rgba(11,77,255,0.2)]' },
    { name: t.ro, icon: Droplets, color: 'bg-cyan-50', glow: 'hover:shadow-[0_0_20px_rgba(229,27,43,0.15)]' },
    { name: t.silent, icon: VolumeX, color: 'bg-slate-50', glow: 'hover:shadow-[0_0_20px_rgba(11,77,255,0.2)]' },
    { name: t.chairs, icon: Sofa, color: 'bg-sky-50', glow: 'hover:shadow-[0_0_20px_rgba(229,27,43,0.15)]' },
    { name: t.washroom, icon: CheckCircle2, color: 'bg-green-50', glow: 'hover:shadow-[0_0_20px_rgba(11,77,255,0.2)]' },
    { name: t.restroom, icon: MapPin, color: 'bg-amber-50', glow: 'hover:shadow-[0_0_20px_rgba(229,27,43,0.15)]' },
    { name: t.canteen, icon: Star, color: 'bg-orange-50', glow: 'hover:shadow-[0_0_20px_rgba(11,77,255,0.2)]' },
  ];

  return (
    <section id="facilities" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader title={t.title} />
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              variants={{ 
                hidden: { opacity: 0, y: 20 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
              }}
              whileHover={{ 
                y: -8, 
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className={`card-hover p-6 rounded-2xl flex items-center gap-6 group cursor-default border border-slate-100 bg-white transition-all duration-300 ${item.glow}`}
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center text-royal transition-all duration-500 group-hover:bg-royal group-hover:text-white`}
              >
                <item.icon size={28} />
              </motion.div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">{item.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Exams = ({ lang }: { lang: Language }) => {
  const t = translations[lang].exams;
  const exams = ['BPSC', 'SSC', 'Railway', 'Banking', 'CTET', 'UPTET', 'HTET', 'BIHAR TET', 'One Day Exams'];
  
  return (
    <section id="exams" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal/5 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader title={t.title} />
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-wrap justify-center gap-4"
        >
          {exams.map((exam, i) => (
            <motion.div 
              key={i} 
              variants={{ 
                hidden: { scale: 0.8, opacity: 0 }, 
                visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } } 
              }}
              whileHover={{ y: -5, scale: 1.05, color: "#0B4DFF", borderColor: "rgba(11,77,255,0.2)" }}
              className="px-8 py-5 card-hover rounded-2xl font-black text-slate-700 transition-all cursor-default text-sm tracking-widest uppercase border-slate-100"
            >
              {exam}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const YouTubeSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].youtube;
  return (
    <section id="youtube" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-royal/20 via-royal/5 to-transparent rounded-[3rem] p-12 border border-white/5 relative overflow-hidden"
        >
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-royal rounded-xl flex items-center justify-center mb-8 shadow-2xl shadow-royal/20 relative"
              >
                <Youtube size={44} className="text-white relative z-10" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }} 
                  className="absolute inset-0 bg-royal/40 rounded-xl"
                />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">{t.title}</h2>
              <p className="text-xl text-slate-400 mb-10 font-bold tracking-tight">{t.subtitle}</p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://youtube.com/@binaacademy" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all shadow-xl"
              >
                {t.visit} <Youtube size={24} className="text-royal" />
              </motion.a>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
              ].map((img, i) => (
                <motion.div 
                  key={i} 
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl overflow-hidden aspect-video border border-white/10 group cursor-pointer relative"
                >
                  <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Video Preview" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Youtube size={32} className="text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Reviews = ({ lang }: { lang: Language }) => {
  const t = translations[lang].nav;
  const reviews = [
    { text: "Very good place for self study, peaceful and neat environment. Management is helpful.", author: "Rahul Kumar", rating: 5 },
    { text: "Excellent management and very clean facilities. Best library in Bettiah definitely.", author: "Amit Singh", rating: 5 },
    { text: "Peaceful environment, high speed wifi, and comfortable chairs. Highly recommended for BPSC aspirants.", author: "Sneha Kumari", rating: 5 },
    { text: "Best place for serious aspirants. 24x7 facility is a life saver.", author: "Vicky Raj", rating: 5 },
  ];

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader title={lang === 'EN' ? 'Student Success Stories' : 'छात्रों की सफलता की कहानियां'} />
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reviews.map((rev, i) => (
            <motion.div 
              key={i} 
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
              }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
              className="card-hover p-8 rounded-2xl border border-transparent hover:border-royal/10 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-600 font-bold italic mb-8 leading-relaxed">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-royal/10 rounded-xl flex items-center justify-center text-royal font-black text-lg"
                >
                  {rev.author[0]}
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 tracking-tight">{rev.author}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Student</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-royal rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-royal/20">B</div>
              <div className="flex flex-col">
                <span className="font-black text-xl leading-tight">BINA CENTRAL LIBRARY</span>
                <span className="text-[10px] font-black tracking-[0.2em] text-royal">बिना सेंट्रल लाइब्रेरी</span>
              </div>
            </div>
            <p className="text-slate-400 font-bold leading-relaxed mb-10 text-sm tracking-tight">
              Premium 24x7 self-study infrastructure in Bettiah. Dedicated to empowering serious aspirants.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-royal transition-all text-white border border-white/10 hover:border-royal shadow-xl">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
             <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-royal">{lang === 'EN' ? 'Navigation' : 'नेविगेशन'}</h4>
             <div className="flex flex-col gap-4">
               {[nav.home, nav.about, nav.facilities, nav.exams, nav.gallery, nav.youtube].map((item, i) => (
                 <button key={i} className="text-slate-400 hover:text-white transition-all text-left font-black text-sm uppercase tracking-widest">{item}</button>
               ))}
             </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-deep">{lang === 'EN' ? 'Contact Info' : 'संपर्क विवरण'}</h4>
            <div className="flex flex-col gap-8">
               <div className="flex items-start gap-4 text-slate-300">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10"><MapPin className="text-royal shrink-0" size={20} /></div>
                 <p className="font-bold text-sm leading-relaxed">{t.address}</p>
               </div>
               <div className="flex items-center gap-4 text-slate-300">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10"><Phone className="text-royal shrink-0" size={20} /></div>
                 <p className="font-bold text-sm tracking-widest">{t.phone}</p>
               </div>
            </div>
          </div>

          <div>
             <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-slate-400">{lang === 'EN' ? 'Locate Us' : 'हमे ढूंढें'}</h4>
             <div className="rounded-[2rem] overflow-hidden h-44 border border-white/10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 shadow-2xl">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.0558667500163!2d84.50!3d26.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993000000000000%3A0x0!2zMjbCsDQ4JzAwLjAiTiA4NMKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
               />
             </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">{t.rights}</p>
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Designed for Excellence</span>
             <div className="w-1 h-1 bg-royal rounded-full" />
             <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Premium Brand</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const Plans = ({ lang }: { lang: Language }) => {
  const t = translations[lang].nav;
  const plans = [
    { name: 'Day Shift', time: '6 AM - 6 PM', price: '₹499', features: ['Fully AC', 'High Speed WiFi', 'Silent Zone'], featured: false },
    { name: 'Night Shift', time: '6 PM - 6 AM', price: '₹399', features: ['Tea/Coffee', 'Safe Campus', 'Clean Washroom'], featured: false },
    { name: 'Full Day', time: '24/7 Access', price: '₹799', features: ['Unlimited Access', 'Personal Locker', 'Charging Point'], featured: true },
  ];

  return (
    <section id="plans" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader title={translations[lang].nav.plans} />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -12 }}
              className={`relative bg-white p-10 rounded-[2.5rem] shadow-xl border ${plan.featured ? 'border-royal ring-4 ring-royal/5' : 'border-slate-100'} flex flex-col`}
            >
              {plan.featured && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-royal text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg"
                >
                  Best Seller
                </motion.div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-400 font-bold text-sm tracking-tight uppercase">{plan.time}</p>
              </div>
              <div className="mb-10">
                <span className="text-5xl font-black text-royal">{plan.price}</span>
                <span className="text-slate-400 font-bold ml-2">/ month</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <CheckCircle2 size={18} className="text-royal shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-black transition-all ${plan.featured ? 'gradient-btn text-white' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('EN');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setTimeout(() => {
      setIsFormSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 3000);
    }, 1500);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
             <motion.div 
               initial={{ opacity: 0, x: -50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut" }}
             >
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="inline-flex px-4 py-1 bg-royal text-white text-[10px] font-black rounded-full mb-6 uppercase tracking-[0.2em] shadow-lg shadow-royal/20"
               >
                 Premier Study Space
               </motion.div>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter"
               >
                {translations[lang].about.title}
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="text-xl text-slate-500 leading-relaxed font-bold mb-10 tracking-tight"
                >
                 {translations[lang].about.content}
               </motion.p>
               <motion.div 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
                 className="grid grid-cols-2 gap-10"
               >
                  <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} className="flex flex-col">
                    <span className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">24x7</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessibility</span>
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} className="flex flex-col">
                    <span className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">FULL</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AC Facility</span>
                  </motion.div>
               </motion.div>
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, x: 50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true }} 
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative"
             >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 aspect-[4/3] border-8 border-white"
                >
                  <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Library Seating" />
                </motion.div>
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block border border-slate-100"
                >
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 bg-deep text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-deep/20">
                       <Counter value="668+" />
                     </div>
                     <div>
                       <p className="font-black text-slate-900 text-lg leading-none">Five Star</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real Reviews</p>
                     </div>
                  </div>
                </motion.div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-royal/10 blur-[80px] rounded-full" />
             </motion.div>
           </div>
        </div>
      </section>

      <Facilities lang={lang} />
      <Plans lang={lang} />
      <Exams lang={lang} />
      
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader title={translations[lang].nav.gallery} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             {[
               "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1491843331069-311baae1694d?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1507733444321-c1b8aae94ee1?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
             ].map((url, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 30 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true, margin: "-50px" }} 
                 transition={{ delay: i * 0.05, duration: 0.6 }}
                 className={`overflow-hidden rounded-3xl transition-all duration-700 hover:scale-[1.02] shadow-sm hover:shadow-2xl group relative ${i === 0 || i === 7 ? 'col-span-2' : 'col-span-1'}`}
               >
                 <motion.img 
                   whileHover={{ scale: 1.1 }}
                   transition={{ duration: 0.6 }}
                   src={url} className="w-full h-full object-cover aspect-video md:aspect-auto" alt={`Gallery ${i}`} 
                 />
                 <div className="absolute inset-0 bg-royal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="text-white font-black text-sm tracking-[0.2em] uppercase border-b-2 border-white pb-1">View Detail</span>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <YouTubeSection lang={lang} />
      <Reviews lang={lang} />
      
      <section id="contact" className="py-24 bg-surface overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-10 leading-[1.1] tracking-tighter">{translations[lang].contact.title}</h2>
              <div className="space-y-6">
                 <div className="flex gap-6 card-hover p-6 rounded-[2rem] group border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-royal group-hover:bg-royal group-hover:text-white transition-all duration-300 shadow-sm">
                      <MapPin size={30} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{lang === 'EN' ? 'Our Location' : 'हमारा स्थान'}</h4>
                      <p className="text-slate-900 font-bold leading-relaxed">{translations[lang].footer.address}</p>
                    </div>
                 </div>
                 <div className="flex gap-6 card-hover p-6 rounded-[2rem] group border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-deep group-hover:bg-deep group-hover:text-white transition-all duration-300 shadow-sm">
                      <Phone size={30} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{lang === 'EN' ? 'Direct Call' : 'सीधी कॉल'}</h4>
                      <p className="text-slate-900 font-bold leading-relaxed tracking-widest">{translations[lang].footer.phone}</p>
                    </div>
                 </div>
                 <div className="flex gap-6 card-hover p-6 rounded-[2rem] group border border-slate-100 shadow-sm">
                   <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-royal group-hover:bg-royal group-hover:text-white transition-all duration-300 shadow-sm">
                      <Mail size={30} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{lang === 'EN' ? 'Mail Us' : 'ईमेल करें'}</h4>
                      <p className="text-slate-900 font-bold leading-relaxed">{translations[lang].footer.email}</p>
                    </div>
                 </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <form onSubmit={handleContactSubmit} className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 space-y-6 relative overflow-hidden">
                 {formSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">{translations[lang].contact.success}</h4>
                    </motion.div>
                 )}
                 
                 <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{translations[lang].contact.name}</label>
                     <motion.input 
                       whileFocus={{ scale: 1.01, borderColor: "#0B4DFF" }}
                       required type="text" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-royal/20 transition-all font-bold text-sm text-slate-800 outline-none" />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{translations[lang].contact.mobile}</label>
                     <motion.input 
                       whileFocus={{ scale: 1.01, borderColor: "#0B4DFF" }}
                       required type="tel" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-royal/20 transition-all font-bold text-sm text-slate-800 outline-none" />
                   </div>
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">{translations[lang].contact.course}</label>
                   <motion.input 
                     whileFocus={{ scale: 1.01, borderColor: "#0B4DFF" }}
                     required type="text" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-royal/20 transition-all font-bold text-sm text-slate-800 outline-none" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{translations[lang].contact.message}</label>
                   <motion.textarea 
                     whileFocus={{ scale: 1.01, borderColor: "#0B4DFF" }}
                     rows={4} className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-royal/20 transition-all font-bold text-sm text-slate-800 outline-none resize-none"></motion.textarea>
                 </div>
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   disabled={isFormSubmitting}
                   type="submit" className="w-full py-5 gradient-btn text-white font-black text-lg rounded-xl shadow-2xl mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
                 >
                   {isFormSubmitting ? (
                     <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     translations[lang].contact.send
                   )}
                 </motion.button>
               </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <AdmissionPopup lang={lang} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1, backgroundColor: "#0B4DFF" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-6 z-40 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl border border-white/10"
          >
            <div className="flex flex-col items-center">
              <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                 <CheckCircle2 size={24} className="rotate-180" />
              </motion.div>
              <span className="text-[8px] font-black uppercase mt-0.5 tracking-tighter">TOP</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-6 right-6 z-40 lg:hidden pointer-events-none">
         <div className="flex gap-3 pointer-events-auto">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              href="tel:08757512020" className="flex-1 py-4 royal-blue text-white font-black rounded-xl shadow-2xl flex items-center justify-center gap-2 border border-royal/20"
            >
              <Phone size={20} /> Call
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              href="https://wa.me/918757512020" target="_blank" rel="noreferrer" className="flex-1 py-4 bg-[#25D366] text-white font-black rounded-xl shadow-2xl flex items-center justify-center gap-2 border border-green-500/20"
            >
              <MessageSquare size={20} /> WhatsApp
            </motion.a>
         </div>
      </div>
    </div>
  );
}
