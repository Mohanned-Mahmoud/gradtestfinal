import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Layers, MousePointer2, Eye, Mic, BrainCircuit, Activity, BookOpen, UserCog, Users } from "lucide-react";
import Scene from "../components/Scene";

export default function VRApp() {
  const [, setLocation] = useLocation();

  // Content strictly from "MEDILERN VR" Photo
  const features = [
    { 
      icon: <Layers className="text-cyan-500" />, 
      title: "Interactive Dissection", 
      description: "Perform non-destructive dissection with 6DoF control to separate and inspect internal structures like heart valves." 
    },
    { 
      icon: <MousePointer2 className="text-cyan-500" />, 
      title: "Dual Interaction Modes", 
      description: "Switch instantly between \"Systems Mode\" for full-body navigation and \"Organ Mode\" for high-fidelity inspection." 
    },
    { 
      icon: <Eye className="text-cyan-500" />, 
      title: "Smart Structure Isolation", 
      description: "Extract specific bones or organs from the main assembly to focus your study without visual clutter." 
    },
    { 
      icon: <Mic className="text-cyan-500" />, 
      title: "Context-Aware AI Tutor", 
      description: "Ask natural voice questions while holding an organ (e.g., \"What is this?\") and receive immediate, spatially-aware explanations." 
    },
    { 
      icon: <BrainCircuit className="text-cyan-500" />, 
      title: "AI-Driven Remediation", 
      description: "Receive real-time feedback during quizzes where the AI explains why your answer was wrong based on medical logic." 
    },
    { 
      icon: <Activity className="text-cyan-500" />, 
      title: "Optimized Performance", 
      description: "Experience stable 72 FPS rendering with sub-1.5s AI latency, ensuring a smooth flow state without simulator sickness." 
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-70">
        <Scene activeSectionId="vr-experience" />
      </div>

      <div className="relative z-10 p-8 h-screen overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto space-y-16 py-20">
          
          {/* Header Section */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-[10px] uppercase tracking-widest text-cyan-500 mb-4">
              Institutional License Required
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              MEDILEARN <span className="text-cyan-500">VR</span>
            </h1>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              The ultimate immersive laboratory. Designed for medical schools and hospitals seeking to provide students with safe, repeatable, and deep anatomical insights.
            </p>
          </div>

          {/* Features Grid from Image */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Institutional Use Cases & Technical Specs from Image */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 lg:col-span-2 p-8 backdrop-blur-lg">
              <h3 className="text-3xl font-bold mb-6 tracking-tighter">Institutional Use Cases</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0"><BookOpen className="text-cyan-500 h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-white">Scalable Anatomy Labs</h4>
                    <p className="text-neutral-400 text-sm mt-1">Overcome the ethical and logistical limitations of cadaver availability. Provide unlimited, repeatable dissection practice for large student cohorts without physical resource constraints.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0"><UserCog className="text-cyan-500 h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-white">Automated Supervision</h4>
                    <p className="text-neutral-400 text-sm mt-1">Reduce faculty workload with an AI Tutor that handles routine questions and anatomical explanations, allowing instructors to focus on complex clinical mentoring.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0"><Users className="text-cyan-500 h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-white">Hybrid Curriculum</h4>
                    <p className="text-neutral-400 text-sm mt-1">Extend learning beyond the campus lab. Students can transition seamlessly from immersive VR sessions to mobile revision at home, ensuring continuous engagement.</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Technical Specs Card strictly matching photo */}
            <div className="bg-cyan-900/10 border border-cyan-500/20 p-8 rounded-2xl flex flex-col justify-center space-y-6 backdrop-blur-lg">
              <h3 className="text-2xl font-bold tracking-tight">Technical Specs</h3>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Headset</span>
                  <span className="text-white text-right">Meta Quest 2 / 3 / Pro</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Tracking</span>
                  <span className="text-white text-right">Inside-out 6DOF</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Environment</span>
                  <span className="text-white text-right">Full Passthrough Supported</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Network</span>
                  <span className="text-white text-right">WiFi 6 Recommended</span>
                </li>
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