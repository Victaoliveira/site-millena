import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Activity, Shield, Zap, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- NAVBAR ---
const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav 
        ref={navRef}
        className={`transition-all duration-500 rounded-full flex items-center justify-between px-6 py-3 w-full max-w-5xl ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border border-slate/20 text-primary shadow-lg' 
            : 'bg-transparent text-white'
        }`}
      >
        <div className="font-sans font-bold text-lg tracking-tight">FFT em Casa</div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#features" className="hover:-translate-y-[1px] transition-transform">Método</a>
          <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Filosofia</a>
          <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protocolo</a>
        </div>
        
        <div className="hidden md:block">
          <a href="#pricing" className={`magnetic-btn px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            isScrolled ? 'bg-primary text-white hover:bg-slate' : 'bg-white text-primary hover:bg-gray-100'
          }`}>
            Começar Agora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-background border border-slate/20 rounded-[2rem] p-6 flex flex-col gap-4 shadow-2xl md:hidden text-primary">
          <a href="#features" onClick={() => setIsOpen(false)} className="text-lg font-medium">Método</a>
          <a href="#philosophy" onClick={() => setIsOpen(false)} className="text-lg font-medium">Filosofia</a>
          <a href="#protocol" onClick={() => setIsOpen(false)} className="text-lg font-medium">Protocolo</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="mt-4 bg-primary text-white text-center py-3 rounded-full font-semibold">
            Começar Agora
          </a>
        </div>
      )}
    </div>
  );
};

// --- HERO ---
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-24 md:pb-32 px-6 md:px-12 bg-primary overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>

      <div className="relative z-10 max-w-4xl">
        <div className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-8 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          Acesso Imediato
        </div>
        
        <h1 className="hero-element text-white leading-[1.1] md:leading-[1.05] mb-6">
          <span className="block font-sans font-bold text-4xl md:text-6xl tracking-tight">Sobrevivência meets</span>
          <span className="block font-drama italic text-7xl md:text-9xl text-accent pr-4">Instinto.</span>
        </h1>
        
        <p className="hero-element text-white/70 text-lg md:text-xl max-w-lg mb-10 font-sans font-light leading-relaxed">
          Metodologia exclusiva de 21 dias. Aprenda a lutar, se defender e acordar diferente — construindo uma autoconfiança inabalável sem sair de casa.
        </p>
        
        <div className="hero-element">
          <a href="#pricing" className="magnetic-btn bg-accent text-primary font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-[#d4b55c] transition-colors">
            Quero começar agora <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

// --- FEATURE CARDS ---
// Card 1: Diagnostic Shuffler
const ShufflerCard = () => {
  const [cards, setCards] = useState(['Postura de Combate', 'Bloqueios Essenciais', 'Golpes de Precisão']);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background border border-slate/10 rounded-[2rem] p-8 shadow-sm flex flex-col h-[400px]">
      <h3 className="font-sans font-bold text-xl mb-2 text-primary">Metodologia 21 Dias</h3>
      <p className="text-slate/70 text-sm mb-8">Treinos diários estruturados para evolução constante.</p>
      
      <div className="relative flex-1 flex justify-center items-center">
        {cards.map((card, i) => (
          <div 
            key={card}
            className="absolute w-full bg-white border border-slate/10 rounded-2xl p-6 shadow-md transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center gap-4"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
              zIndex: 10 - i,
              opacity: 1 - i * 0.2
            }}
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <Activity size={20} />
            </div>
            <span className="font-medium text-primary">{card}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Card 2: Telemetry Typewriter
const TypewriterCard = () => {
  const [text, setText] = useState('');
  const fullText = "DETECTANDO AMEAÇA...\n\n> AVALIANDO DISTÂNCIA\n> PREPARANDO DEFESA\n> NEUTRALIZANDO.\n\nSISTEMA PRONTO.";
  
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current <= fullText.length) {
        setText(fullText.slice(0, current));
        current++;
      } else {
        setTimeout(() => { current = 0; }, 4000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary border border-slate/30 rounded-[2rem] p-8 shadow-sm flex flex-col h-[400px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-sans font-bold text-xl mb-2 text-white">Defesa Pessoal Real</h3>
          <p className="text-white/60 text-sm">Reações automáticas para situações de risco.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate/50 px-3 py-1 rounded-full border border-slate">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-mono text-[10px] text-white/80">LIVE FEED</span>
        </div>
      </div>
      
      <div className="flex-1 bg-black/40 rounded-xl p-6 font-mono text-sm text-accent whitespace-pre-wrap flex flex-col justify-end overflow-hidden border border-slate/50">
        <div>
          {text}
          <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler
const SchedulerCard = () => {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const [activeDay, setActiveDay] = useState(2);
  const cursorRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Move to a day
      tl.to(cursorRef.current, { x: 80, y: 30, duration: 1, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setActiveDay(3))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        
      // Move to save
      tl.to(cursorRef.current, { x: 180, y: 120, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to('.save-btn', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.2 })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to('.save-btn', { backgroundColor: '#2A2A35', color: '#FAF8F5', duration: 0.2, delay: 0.5 })
        
      // Reset
      tl.to(cursorRef.current, { x: 0, y: 0, duration: 1, ease: "power2.inOut" });
        
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background border border-slate/10 rounded-[2rem] p-8 shadow-sm flex flex-col h-[400px] relative overflow-hidden">
      <h3 className="font-sans font-bold text-xl mb-2 text-primary">Autoconfiança Inabalável</h3>
      <p className="text-slate/70 text-sm mb-8">Construa o hábito da força, dia após dia.</p>
      
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <div className="flex gap-2 relative">
          {days.map((d, i) => (
            <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm transition-colors ${
              i === activeDay ? 'bg-accent text-primary font-bold shadow-lg' : 'bg-white border border-slate/10 text-slate/50'
            }`}>
              {d}
            </div>
          ))}
          
          {/* Animated Cursor */}
          <div ref={cursorRef} className="absolute -top-4 -left-4 z-20 w-6 h-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary drop-shadow-md fill-white" strokeWidth="1.5">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            </svg>
          </div>
        </div>
        
        <div className="save-btn px-8 py-3 rounded-full bg-slate text-background font-mono text-xs tracking-widest transition-colors">
          COMPROMISSO FIRMADO
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-primary tracking-tight">A Arte da Guerra Moderna</h2>
        <p className="text-slate/70 mt-4 max-w-xl">Ferramentas projetadas não para o esporte, mas para a sobrevivência urbana e o domínio mental.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ShufflerCard />
        <TypewriterCard />
        <SchedulerCard />
      </div>
    </section>
  );
};

// --- PHILOSOPHY ---
const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative py-32 px-6 md:px-12 bg-primary overflow-hidden w-full">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-fixed bg-center mix-blend-overlay"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574782092158-69cb910f1ab4?q=80&w=2072&auto=format&fit=crop")' }}
      ></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <p className="phil-text text-white/50 font-mono text-sm tracking-widest uppercase mb-8">O Manifesto</p>
        
        <p className="phil-text font-sans text-xl md:text-2xl text-white/60 mb-12 max-w-2xl">
          Most training focuses on: repetitive gym routines and false confidence.
        </p>
        
        <h2 className="phil-text font-drama italic text-5xl md:text-7xl text-white leading-tight">
          We focus on: <span className="text-accent">real survival.</span>
        </h2>
      </div>
    </section>
  );
};

// --- PROTOCOL ---
const ProtocolCard = ({ step, title, desc, children }) => {
  return (
    <div className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 bg-background pt-16">
      <div className="max-w-5xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex justify-center items-center h-[300px] md:h-[500px] bg-slate/5 rounded-[3rem] border border-slate/10 p-8 relative overflow-hidden">
          {children}
        </div>
        <div className="order-1 md:order-2">
          <div className="font-mono text-accent text-lg mb-4">FASE {step}</div>
          <h3 className="font-sans font-bold text-4xl md:text-5xl text-primary tracking-tight mb-6">{title}</h3>
          <p className="text-slate/70 text-lg leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

// Protocol Visuals
const CanvasHelix = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="absolute w-64 h-64 border-[1px] border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
      <div className="absolute w-48 h-48 border-[1px] border-accent/40 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
      <div className="absolute w-32 h-32 border-[1px] border-primary/60 rounded-full animate-[spin_5s_linear_infinite]"></div>
      <Shield size={48} className="text-primary z-10" />
    </div>
  );
};

const CanvasScanner = () => {
  return (
    <div className="w-full h-full relative border border-primary/10 rounded-2xl overflow-hidden bg-primary/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_1px,_rgba(250,248,245,1)_1px)] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_#C9A84C] animate-[scan_3s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Zap size={48} className="text-primary opacity-50" />
      </div>
      <style>{`@keyframes scan { 0%, 100% { top: 0%; } 50% { top: 100%; } }`}</style>
    </div>
  );
};

const CanvasWave = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg className="w-full h-32" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path 
          d="M 0 10 Q 5 20, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 Q 55 0, 60 10 T 70 10 T 80 10 T 90 10 T 100 10" 
          fill="none" 
          stroke="#C9A84C" 
          strokeWidth="0.5"
          className="animate-[dash_2s_linear_infinite]"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>
      <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
    </div>
  );
};

const Protocol = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: '.protocol-wrapper',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          animation: gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            ease: 'none'
          }),
          scrub: true,
        });
      });
    }, wrapperRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" className="protocol-wrapper relative w-full" ref={wrapperRef}>
      <ProtocolCard 
        step="01" 
        title="Despertar" 
        desc="O primeiro passo é quebrar o estado de alerta constante. Treinamos sua percepção para identificar ameaças antes que elas se materializem."
      >
        <CanvasHelix />
      </ProtocolCard>
      
      <ProtocolCard 
        step="02" 
        title="Reação" 
        desc="A mente planeja, o corpo executa. Desenvolvemos memória muscular através de movimentos precisos de Taekwondo e defesa pessoal."
      >
        <CanvasScanner />
      </ProtocolCard>
      
      <ProtocolCard 
        step="03" 
        title="Domínio" 
        desc="A consolidação do poder. Uma postura que impõe respeito e uma mente blindada contra o medo do cotidiano urbano."
      >
        <CanvasWave />
      </ProtocolCard>
    </section>
  );
};

// --- PRICING ---
const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 bg-background relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-drama italic text-4xl md:text-5xl text-primary mb-4">Escolha sua evolução</h2>
          <p className="text-slate/60 font-sans max-w-xl mx-auto">O investimento para transformar seu instinto de defesa e garantir sua segurança.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <div className="border border-slate/10 rounded-[2rem] p-8 flex flex-col bg-white">
            <h3 className="font-sans font-bold text-xl text-primary mb-2">Essential</h3>
            <p className="text-slate/50 text-sm mb-6 pb-6 border-b border-slate/10">Fundamentos da Defesa</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-primary">R$297</span>
              <span className="text-slate/50">/único</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate/80"><Check size={16} className="text-accent" /> Acesso 21 dias</li>
              <li className="flex items-center gap-3 text-sm text-slate/80"><Check size={16} className="text-accent" /> Exercícios básicos</li>
            </ul>
            <button className="w-full py-3 rounded-full border border-primary/20 text-primary font-semibold hover:bg-slate/5 transition-colors">Selecionar</button>
          </div>

          {/* Tier 2 (Highlighted) */}
          <div className="border border-accent/30 rounded-[2rem] p-8 flex flex-col bg-primary shadow-2xl shadow-primary/20 transform md:-translate-y-4 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-accent"></div>
            <h3 className="font-sans font-bold text-xl text-white mb-2">Performance</h3>
            <p className="text-white/50 text-sm mb-6 pb-6 border-b border-white/10">Programa Completo FFT</p>
            <div className="mb-8 text-white">
              <span className="text-5xl font-bold text-white">R$497</span>
              <span className="text-white/50">/único</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 text-white/80">
              <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-accent" /> Acesso vitalício</li>
              <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-accent" /> Metodologia 21 dias</li>
              <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-accent" /> Suporte exclusivo</li>
              <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-accent" /> Comunidade fechada</li>
            </ul>
            <button className="w-full py-4 rounded-full bg-accent text-primary font-bold hover:bg-[#d4b55c] transition-colors shadow-lg shadow-accent/20">Quero Começar Agora</button>
          </div>

          {/* Tier 3 */}
          <div className="border border-slate/10 rounded-[2rem] p-8 flex flex-col bg-white">
            <h3 className="font-sans font-bold text-xl text-primary mb-2">Enterprise</h3>
            <p className="text-slate/50 text-sm mb-6 pb-6 border-b border-slate/10">Mentoria VIP</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-primary">R$997</span>
              <span className="text-slate/50">/único</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate/80"><Check size={16} className="text-accent" /> Tudo do Performance</li>
              <li className="flex items-center gap-3 text-sm text-slate/80"><Check size={16} className="text-accent" /> Análise de postura 1:1</li>
              <li className="flex items-center gap-3 text-sm text-slate/80"><Check size={16} className="text-accent" /> Plano personalizado</li>
            </ul>
            <button className="w-full py-3 rounded-full border border-primary/20 text-primary font-semibold hover:bg-slate/5 transition-colors">Aplicar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-[#0A0A0E] text-white pt-24 pb-12 px-6 rounded-t-[4rem] mt-[-2rem] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-drama italic text-3xl md:text-4xl mb-2">FFT em Casa</h2>
        <p className="text-white/40 font-mono text-xs tracking-widest uppercase mb-16">Millena Gomes</p>
        
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-mono text-[10px] text-white/60">SYSTEM OPERATIONAL</span>
            </div>
            <p className="text-white/40 text-sm">Proteção levada a sério.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#features" className="hover:text-accent">Método</a></li>
              <li><a href="#philosophy" className="hover:text-accent">Filosofia</a></li>
              <li><a href="#protocol" className="hover:text-accent">Protocolo</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-accent">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-accent">Privacidade</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>suporte@fftemcasa.com.br</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
