import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import Scene from "../components/Scene";
import { Activity, Send, User } from "lucide-react";

export default function WebDemo() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Welcome to the MediLearn Web Demo. I am your AI assistant. You can ask me about the anatomy models visible on the left or general medical concepts." }
  ]);
  const [input, setInput] = useState("");
  const [activeModel, setActiveModel] = useState<"brain" | "heart">("brain");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");
    setIsTyping(true);
    
    // Simulate contextual response based on active model
    setTimeout(() => {
      let response = "That's an interesting question. In our full platform, I could provide a deep analysis based on current medical research.";
      const lowerInput = userMessage.toLowerCase();
      if (lowerInput.includes("function") || lowerInput.includes("what is") || lowerInput.includes("explain")) {
        response = activeModel === "brain" 
          ? "The brain functions as the primary control center, processing sensory information and directing behavioral responses. It's composed of the cerebrum, cerebellum, and brainstem." 
          : "The heart functions as a dual-pump system, maintaining circulation and delivering oxygenated blood to the tissues throughout the body.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        response = "Hello! I'm here to help you explore the " + activeModel + " model. What would you like to know?";
      }
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#020202] text-white flex flex-col h-screen overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Scene activeSectionId={activeModel === 'brain' ? "learning-features" : "products"} />
      </div>

      <header className="relative z-20 px-8 py-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md sticky top-0 bg-black/60">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-bold text-black text-xs">ML</div>
          <h1 className="text-xl font-bold tracking-tighter">WEB <span className="text-cyan-500">DEMO</span></h1>
        </div>
        <Button variant="ghost" onClick={() => setLocation("/")} className="text-neutral-400 hover:text-white uppercase tracking-widest text-[10px] font-bold">Close Demo</Button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col min-h-0 bg-black">
            <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
              <h2 className="text-xs uppercase tracking-[0.4em] font-black text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> AI ASSISTANT
              </h2>
              <div className="text-[9px] text-neutral-500 uppercase font-medium">Session Active</div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-cyan-600 shadow-lg shadow-cyan-500/20'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Activity className="h-4 w-4 text-white" />}
                  </div>
                  <div className={`max-w-[85%] space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed transition-all ${msg.role === 'user' ? 'bg-cyan-600/20 border border-cyan-500/30 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-neutral-300 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                    <div className={`text-[8px] text-neutral-600 uppercase tracking-widest px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.role === 'user' ? 'Sent by you' : 'MediLearn AI Core'}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center shrink-0">
                    <Activity className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/5 bg-black">
              <div className="relative group">
                <Input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query AI assistant..." 
                  className="bg-white/5 border-white/10 text-white pl-4 pr-12 py-6 rounded-xl focus:border-cyan-500/50 transition-all"
                />
                <Button 
                  onClick={handleSend} 
                  className="absolute right-2 top-2 h-8 w-8 p-0 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
              <p className="mt-3 text-[9px] text-neutral-600 text-center uppercase tracking-widest font-medium">
                Data protected by 256-bit encryption
              </p>
            </div>
      </main>
    </div>
  );
}