import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Eye, Layers, Compass, Headphones, Target, Users, BookOpen } from "lucide-react";
import Scene from "../components/Scene";

export default function VRApp() {
  const [, setLocation] = useLocation();

  const features = [
    { icon: <Layers className="text-cyan-500" />, title: "Interactive Disassembly", description: "Manipulate organ structures with sub-millimeter precision using 6DOF tracking." },
    { icon: <Compass className="text-cyan-500" />, title: "Macro & Micro Navigation", description: "Teleport from an organ system view down to the cellular level instantly." },
    { icon: <Eye className="text-cyan-500" />, title: "X-Ray Vision Mode", description: "Toggle between muscular, skeletal, and nervous systems in real-time." },
    { icon: <Headphones className="text-cyan-500" />, title: "Spatial AI Voice", description: "Immersive audio explanations that originate from the specific anatomical region." },
    { icon: <Target className="text-cyan-500" />, title: "Surgical Rehearsal", description: "Simulated procedures with haptic feedback to build muscle memory." },
    { icon: <Users className="text-cyan-500" />, title: "Multi-User Labs", description: "Collaborative learning where instructors and students meet in the same VR space." }
  ];

  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-60">
        <Scene activeSectionId="vr-experience" />
      </div>

      <div className="relative z-10 p-8 h-screen overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto space-y-16 py-20">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-[10px] uppercase tracking-widest text-cyan-500 mb-4">Institutional License Required</div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">MEDILERN <span className="text-cyan-500">VR</span></h1>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">The ultimate immersive laboratory. Designed for medical schools and hospitals seeking to provide students with safe, repeatable, and deep anatomical insights.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all group">
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

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 lg:col-span-2 p-8">
              <h3 className="text-3xl font-bold mb-6 tracking-tighter">Institutional Use Cases</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0"><BookOpen className="text-cyan-500 h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-white">Anatomy Lectures</h4>
                    <p className="text-neutral-400 text-sm">Replace traditional cadaver labs with clean, reusable VR simulations for undergraduate anatomy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0"><Target className="text-cyan-500 h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-white">Surgical Pre-Planning</h4>
                    <p className="text-neutral-400 text-sm">Upload patient DICOM data to visualize complex pathologies in 3D before entering the OR.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0"><Users className="text-cyan-500 h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-white">Remote Consultation</h4>
                    <p className="text-neutral-400 text-sm">Collaborate across borders by inviting specialists from around the world into your virtual lab.</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="bg-cyan-900/10 border border-cyan-500/20 p-8 rounded-2xl flex flex-col justify-center space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Technical Specs</h3>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Headset</span><span>Meta Quest 2 / 3 / Pro</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Tracking</span><span>Inside-out 6DOF</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Environment</span><span>Full Passthrough Supported</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Network</span><span>WiFi 6 Recommended</span></li>
              </ul>
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-white w-full py-6 rounded-full font-bold uppercase tracking-[0.2em]">
                Request Quote
              </Button>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button variant="ghost" onClick={() => setLocation("/")} className="text-[10px] tracking-[0.5em] uppercase font-bold text-neutral-500 hover:text-white transition-colors">
              Return to Core Protocol
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}