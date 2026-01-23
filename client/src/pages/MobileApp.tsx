import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { MessageSquare, Bell, Smartphone, Zap, ShieldCheck, Cpu, Globe, Download } from "lucide-react";
import Scene from "../components/Scene";

export default function MobileApp() {
  const [, setLocation] = useLocation();

  // Content strictly from "MEDILERN MOBILE" Photo
  const features = [
    { 
      icon: <MessageSquare className="text-cyan-500" />, 
      title: "AI Medical Tutor", 
      description: "Natural language processing trained on medical literature for complex academic queries." 
    },
    { 
      icon: <Bell className="text-cyan-500" />, 
      title: "Study Planner", 
      description: "Intelligent scheduling that adapts to your learning pace and upcoming exams." 
    },
    { 
      icon: <Smartphone className="text-cyan-500" />, 
      title: "Native Experience", 
      description: "Haptic feedback and gesture-based navigation for a seamless touch interface." 
    },
    { 
      icon: <Zap className="text-cyan-500" />, 
      title: "Low Latency", 
      description: "Edge computing ensures responses are delivered in under 200ms anywhere in the world." 
    },
    { 
      icon: <ShieldCheck className="text-cyan-500" />, 
      title: "Secure Data", 
      description: "End-to-end encryption for all your study notes and private conversations." 
    },
    { 
      icon: <Cpu className="text-cyan-500" />, 
      title: "Edge Processing", 
      description: "Runs heavy AI models locally on your device to ensure privacy and speed." 
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-60">
        <Scene activeSectionId="ai-mobile" />
      </div>
      
      <div className="relative z-10 p-8 h-screen overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto space-y-16 py-20">
          
          {/* Header Section */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-[10px] uppercase tracking-widest text-cyan-500 mb-4">
              Version 2.0 Now Available
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              MEDILEARN <span className="text-cyan-500">MOBILE</span>
            </h1>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              The most powerful medical AI assistant ever built for mobile, designed for students and professionals who need precision on the go.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all group backdrop-blur-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-lg tracking-tight">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Specs Section from Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-lg">
            
            <div className="space-y-8">
              {/* Global Sync Callout from Photo */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl inline-flex items-center gap-4 mb-4">
                 <div className="p-2 bg-cyan-500/20 rounded-lg"><Globe className="w-5 h-5 text-cyan-400"/></div>
                 <div>
                    <h4 className="font-bold text-white text-sm">Global Sync</h4>
                    <p className="text-xs text-neutral-400">Seamlessly synchronize your progress across all your devices and platforms.</p>
                 </div>
              </div>

              <h2 className="text-4xl font-bold tracking-tighter">Technical Specifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Android Requirements</span>
                  <span className="text-white font-medium">Android 9.0 (Pie) or later</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Disk Space</span>
                  <span className="text-white font-medium">Minimum 250MB free space</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">RAM</span>
                  <span className="text-white font-medium">Recommended 4GB+</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-900/40 to-black border border-white/5 flex items-center justify-center p-8 text-center">
              <div className="space-y-4">
                <p className="text-cyan-500 text-[10px] tracking-[0.4em] uppercase font-bold">Available Now</p>
                <h3 className="text-2xl font-bold">Ready to transform your learning?</h3>
                <Button className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-6 rounded-full font-bold uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20">
                  <Download className="mr-2 h-4 w-4" /> Get Version 2.0
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <Button variant="ghost" onClick={() => setLocation("/")} className="text-[10px] tracking-[0.5em] uppercase font-bold text-neutral-500 hover:text-white transition-colors">
              Return to Core Protocol
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}