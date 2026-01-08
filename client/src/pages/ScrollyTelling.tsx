import React, { useState, useEffect } from "react";
import Scene from "../components/Scene";
import { sections, products, interactiveFeatures } from "../data";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";


import { useForm, ValidationError } from '@formspree/react';

import { Send, CheckCircle } from "lucide-react";

// --- 1. The Contact Form Component ---
const ContactForm = () => {
  const [state, handleSubmit] = useForm("xldnjbrn"); // Your Formspree ID
  const [subject, setSubject] = useState("");

  if (state.succeeded) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-neutral-400">
          Thank you for contacting us. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <div>
        <Input 
          id="name"
          name="name"
          required
          placeholder="Your Name" 
          className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 backdrop-blur-lg" 
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm mt-1" />
      </div>

      {/* Email Input */}
      <div>
        <Input 
          id="email"
          name="email"
          type="email"
          required
          placeholder="Your Email" 
          className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50" 
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
      </div>

      {/* Subject Select - Hidden input ensures Formspree receives the value */}
      <div>
        <input type="hidden" name="subject" value={subject} />
        <Select onValueChange={(value) => setSubject(value)} required>
          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900 border-white/10 text-white">
            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
            <SelectItem value="Technical Support">Technical Support</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="Partnership">Partnership</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message Textarea */}
      <div>
        <Textarea 
          id="message"
          name="message"
          required
          placeholder="Your Message" 
          className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 min-h-[120px]" 
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={state.submitting}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-widest uppercase flex items-center justify-center gap-2"
      >
        {state.submitting ? (
           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
           <>Send Message <Send className="w-4 h-4" /></>
        )}
      </Button>
    </form>
  );
};

export default function ScrollyTelling() {
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [, setLocation] = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2.5;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-[#020202] text-white selection:bg-cyan-500/30 font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Modern Header */}
      <header className="fixed top-0 left-0 w-full p-8 z-40 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="text-xl font-bold tracking-tighter">MEDILERN <span className="text-cyan-500">.</span></div>
        <div className="hidden md:flex gap-8 items-center">
           <div className="flex gap-8 text-[10px] tracking-[0.4em] uppercase font-medium opacity-50">
            <span>Simulation</span>
            <span>Analysis</span>
            <span>Structure</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-[10px] tracking-[0.3em] uppercase font-bold text-white hover:text-cyan-500"
            onClick={() => setLocation("/login")}
          >
            Login
          </Button>
        </div>
      </header>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
        {sections.map((section, idx) => (
          <button
            key={`dot-${section.id}`}
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center"
            aria-label={`Scroll to ${section.title}`}
          >
            <div className={`w-[2px] transition-all duration-700 ${
              activeSectionId === section.id ? "h-8 bg-cyan-400" : "h-4 bg-white/10 group-hover:bg-white/30"
            }`} />
            <span className={`absolute left-4 text-[10px] tracking-widest uppercase transition-all duration-500 whitespace-nowrap ${
              activeSectionId === section.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}>
              0{idx + 1} // {section.id}
            </span>
          </button>
        ))}
      </nav>

      <Scene activeSectionId={activeSectionId} />

      <main className="relative z-10 w-full">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`min-h-screen flex items-center px-8 md:px-32 lg:px-48 py-20 ${
              section.align === "left"
                ? "justify-start"
                : section.align === "right"
                ? "justify-end"
                : "justify-center"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, amount: 0.2 }}
              className={section.type === "standard" || section.type === "contact" ? "max-w-xl" : "w-full"}
            >
              <div className="relative">
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "40px" }}
                   transition={{ duration: 1, delay: 0.2 }}
                   className="h-[1px] bg-cyan-500 mb-8"
                />
                
                <h2 className={`text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-[0.9] ${section.align === 'center' ? 'text-center' : ''}`}>
                  {section.title}
                </h2>
                
                <p className={`text-lg md:text-xl text-neutral-400 leading-relaxed font-semibold mb-12 ${section.align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}`}>
                  {section.description}
                </p>

                {section.type === "features" && (
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {interactiveFeatures.map((feature, i) => (
                      <Card key={i} className="bg-white/5 border-cyan-500/50 backdrop-blur-sm transition-colors">
                        <CardHeader>
                          <CardTitle className="text-white text-xl tracking-tight">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-neutral-400 text-sm font-semibold leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {section.type === "products" && (
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {products.map((product) => (
                      <Card key={product.id} className="bg-white/5 border-white/10 backdrop-blur-sm flex flex-col">
                        <CardHeader>
                          <div className="text-cyan-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-2">{product.status}</div>
                          <CardTitle className="text-white text-2xl tracking-tight">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-neutral-400 text-sm font-semibold mb-6">{product.description}</p>
                          <ul className="space-y-2 mb-8 flex-1">
                            {product.features.map((f, i) => (
                              <li key={i} className="text-[11px] text-neutral-500 flex items-center gap-2">
                                <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <Button 
                            onClick={() => {
                              if (product.id === 'web-demo') setLocation('/web-demo');
                              if (product.id === 'vr-experience') setLocation('/vr');
                              if (product.id === 'ai-mobile') setLocation('/mobile');
                            }}
                            className="w-full bg-transparent border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 text-white text-[10px] tracking-[0.3em] uppercase font-bold"
                          >
                            {product.cta}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {section.type === "contact" && (
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Side: Contact Info */}
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <MapPin className="text-cyan-500 w-6 h-6 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-2">Our Location</h4>
                          <p className="text-neutral-400 text-sm">Extension of 26th of July Corridor, Sheikh Zayed City, 12588 Giza, Egypt</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Mail className="text-cyan-500 w-6 h-6 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-2">Email Us</h4>
                          <p className="text-neutral-400 text-sm">medi.learn.v2@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Phone className="text-cyan-500 w-6 h-6 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-2">Call Us</h4>
                          <p className="text-neutral-400 text-sm">+20 114 231 2035</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Clock className="text-cyan-500 w-6 h-6 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-2">Available Daily</h4>
                          <p className="text-neutral-400 text-sm">10AM - 6PM EET</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side: Integrated Contact Form */}
                    <div>
                      <ContactForm />
                    </div>
                  </div>
                )}

                {section.id === "try-features" && (
                  <div className="mt-12 space-y-12">
                     <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-white/10">
                        <AccordionTrigger className="text-white hover:text-cyan-400">How accurate are the 3D models?</AccordionTrigger>
                        <AccordionContent className="text-neutral-400">
                          Our models are developed by medical professionals based on current anatomical research and are highly accurate for educational purposes.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-white/10">
                        <AccordionTrigger className="text-white hover:text-cyan-400">Can I use these features on mobile devices?</AccordionTrigger>
                        <AccordionContent className="text-neutral-400">
                          Yes, our web platform is fully responsive, and we offer a native mobile app for the best experience on the go.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-white/10">
                        <AccordionTrigger className="text-white hover:text-cyan-400">How is the AI chatbot trained?</AccordionTrigger>
                        <AccordionContent className="text-neutral-400">
                          The AI is trained on extensive peer-reviewed medical literature and clinical guidelines to provide evidence-based information.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex items-center gap-6 pt-8">
                      <button 
                        onClick={() => setLocation("/login")}
                        className="text-[10px] tracking-[0.3em] uppercase font-bold text-cyan-500 hover:text-white transition-colors"
                      >
                        Try Full Version
                      </button>
                      <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                  </div>
                )}

                {section.type === "standard" && section.id !== "try-features" && (
                  <div className="flex items-center gap-6">
                    <button className="text-[10px] tracking-[0.3em] uppercase font-bold text-cyan-500 hover:text-white transition-colors">
                      {section.id === "home" ? "Explore Now" : "Start Protocol"}
                    </button>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        ))}
        
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full scale-150" />
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center px-6 relative z-10"
          >
            <h2 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] mb-12">
              BEYOND <br/> <span className="text-neutral-800">LIMITS</span>
            </h2>
            <button 
              onClick={() => setLocation("/login")}
              className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/10 transition-all hover:border-cyan-500/50"
            >
               <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <span className="relative z-10 text-[10px] tracking-[0.5em] uppercase font-black group-hover:text-black transition-colors">
                 Initialize Interface
               </span>
            </button>
          </motion.div>
        </section>
      </main>
    </div>
  );
}