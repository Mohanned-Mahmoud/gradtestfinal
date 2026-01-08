import { Switch, Route, useLocation  } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ScrollyTelling from "@/pages/ScrollyTelling";
import Login from "@/pages/Login";
import MobileApp from "@/pages/MobileApp";
import VRApp from "@/pages/VRApp";
import WebDemo from "@/pages/WebDemo";
import BackgroundLoader from './components/BackgroundLoader';
import { useState } from "react"; // Import useState
import Scene from './components/Scene'; // Import Scene here

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={ScrollyTelling} />
      <Route path="/login" component={Login} />
      <Route path="/mobile" component={MobileApp} />
      <Route path="/vr" component={VRApp} />
      <Route path="/web-demo" component={WebDemo} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // 1. Lift the state up: App now owns the "Active Section"
  const [activeSection, setActiveSection] = useState("home");
  
  // 2. Check current page
  const [location] = useLocation();
  const isHomePage = location === "/";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          
          {/* 🚀 GLOBAL SCENE 
            It sits BEHIND the router. It never unmounts.
            We just hide it with CSS when not on Home.
          */}
          <Scene 
            activeSectionId={activeSection} 
            className={isHomePage ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          />

          <Switch>
            {/* Pass the setter function down to ScrollyTelling */}
            <Route path="/">
              <ScrollyTelling onSectionChange={setActiveSection} />
            </Route>

            <Route path="/login" component={Login} />
            <Route path="/mobile" component={MobileApp} />
            <Route path="/vr" component={VRApp} />
            <Route path="/web-demo" component={WebDemo} />
            <Route component={NotFound} />
          </Switch>

        </TooltipProvider>
      </QueryClientProvider>
      
      <BackgroundLoader />
    </>
  );
}

export default App;
