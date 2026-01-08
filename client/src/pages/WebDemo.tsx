import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import Scene, { LoadingScreen } from "../components/Scene";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Heart, Info, Send, User } from "lucide-react";

export default function WebDemo() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Welcome to the MediLearn Web Demo. I am your AI assistant. You can ask me about the anatomy models visible on the left or general medical concepts." }
  ]);
  const [input, setInput] = useState("");
  const [activeModel, setActiveModel] = useState<"brain" | "heart">("brain");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleLoadComplete = () => {
    setLoadingProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

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
      {isLoading && <LoadingScreen progress={loadingProgress} />}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Scene activeSectionId={activeModel === 'brain' ? "learning-features" : "products"} onLoaded={handleLoadComplete} />
      </div>

      <header className="relative z-20 px-8 py-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md sticky top-0 bg-black/60">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-bold text-black text-xs">ML</div>
          <h1 className="text-xl font-bold tracking-tighter">WEB <span className="text-cyan-500">DEMO</span></h1>
          <Badge variant="outline" className="text-cyan-500 border-cyan-500/30 text-[9px] uppercase tracking-widest bg-cyan-500/5 ml-4">Live Preview</Badge>
        </div>
        <Button variant="ghost" onClick={() => setLocation("/")} className="text-neutral-400 hover:text-white uppercase tracking-widest text-[10px] font-bold">Close Demo</Button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
          <div className="px-8 border-b border-white/5 bg-black/40 backdrop-blur-md">
            <TabsList className="bg-transparent border-none gap-8 h-14">
              <TabsTrigger 
                value="preview" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-cyan-500 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none h-full text-xs uppercase tracking-[0.2em] font-bold px-0"
              >
                Live Preview
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-cyan-500 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none h-full text-xs uppercase tracking-[0.2em] font-bold px-0"
              >
                AI Assistant
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="flex-1 m-0 relative overflow-hidden flex flex-col min-h-0">
            <div className="flex-1 relative bg-transparent flex flex-col overflow-y-auto scrollbar-hide min-h-0">
              <div className="h-[200vh] relative">
                <div className="sticky top-6 left-6 z-10 space-y-4 max-w-xs p-6">
                  <Tabs defaultValue="brain" onValueChange={(v) => setActiveModel(v as "brain" | "heart")} className="w-full">
                    <TabsList className="bg-black/80 border border-white/10 backdrop-blur-md">
                      <TabsTrigger value="brain" className="text-[10px] tracking-widest uppercase py-2 px-4"><Brain className="mr-2 h-3 w-3" /> Brain</TabsTrigger>
                      <TabsTrigger value="heart" className="text-[10px] tracking-widest uppercase py-2 px-4"><Heart className="mr-2 h-3 w-3" /> Heart</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Card className="bg-black/60 border-white/10 backdrop-blur-md">
                    <CardHeader className="p-4 border-b border-white/5">
                      <CardTitle className="text-xs uppercase tracking-widest text-cyan-500 flex items-center gap-2">
                        <Info className="h-3 w-3" /> Model Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        {activeModel === 'brain' 
                          ? "Interactive model of the human encephalon. Explore cerebral lobes, cerebellum, and brainstem with precision."
                          : "High-fidelity cardiovascular simulation. Visualize chambers, major vessels, and valvular structures."}
                      </p>
                      <div className="flex items-center gap-2 text-[9px] text-neutral-500 uppercase tracking-tighter">
                        <Activity className="h-2 w-2 text-green-500" /> Rendering at 60 FPS
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute bottom-6 left-6 z-10 flex gap-2">
                  <div className="px-3 py-1 bg-black/60 border border-white/10 rounded-full text-[10px] text-neutral-400 uppercase tracking-widest backdrop-blur-md">Scroll to Rotate</div>
                  <div className="px-3 py-1 bg-black/60 border border-white/10 rounded-full text-[10px] text-neutral-400 uppercase tracking-widest backdrop-blur-md">Right Click to Pan</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="flex-1 m-0 bg-black flex flex-col min-h-0">
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}