import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingOverlay from "@/components/LoadingOverlay";
import GlobalAssetLoader from "@/components/GlobalAssetLoader";
import { LoadingProvider } from "@/context/LoadingContext";
import NotFound from "@/pages/not-found";
import ScrollyTelling from "@/pages/ScrollyTelling";
import Login from "@/pages/Login";
import MobileApp from "@/pages/MobileApp";
import VRApp from "@/pages/VRApp";
import WebDemo from "@/pages/WebDemo";

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
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <TooltipProvider>
          {/* Hidden canvas to preload all GLTF assets and report progress */}
          <GlobalAssetLoader />
          <LoadingOverlay />
          <Toaster />
          <Router />
        </TooltipProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
}

export default App;