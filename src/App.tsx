
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import ChatbotInterface from "./pages/ChatbotInterface";
import MoodLogging from "./pages/MoodLogging";
import CrisisManagement from "./pages/CrisisManagement";
import SelfHelpHub from "./pages/SelfHelpHub";
import SleepTracker from "./pages/SleepTracker";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/chatbot" element={<ChatbotInterface />} />
          <Route path="/mood" element={<MoodLogging />} />
          <Route path="/crisis" element={<CrisisManagement />} />
          <Route path="/self-help" element={<SelfHelpHub />} />
          <Route path="/sleep" element={<SleepTracker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
