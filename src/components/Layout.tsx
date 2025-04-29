import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, Heart, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  hideCrisisButton?: boolean;
  pageTitle?: string;
}

const Layout = ({ children, hideNav, hideCrisisButton, pageTitle }: LayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Don't show crisis button on the crisis page itself
  const showCrisisButton = !hideCrisisButton && location.pathname !== "/crisis";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {pageTitle && (
        <header className="py-4 px-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-center">{pageTitle}</h1>
        </header>
      )}
      
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {showCrisisButton && (
        <div className="fixed bottom-20 right-4 z-40 animate-pulse-subtle">
          <Button 
            variant="destructive"
            size="lg"
            className="rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            asChild
          >
            <Link to="/crisis" aria-label="Get emergency help">
              <AlertTriangle size={18} />
              <span>Emergency Help</span>
            </Link>
          </Button>
        </div>
      )}
      
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 shadow-md z-40">
          <div className="container max-w-md mx-auto flex justify-around">
            <NavLink to="/" icon={<Home size={22} />} label="Home" isActive={isActive("/")} />
            <NavLink to="/chatbot" icon={<MessageCircle size={22} />} label="Chat" isActive={isActive("/chatbot")} />
            <NavLink to="/mood" icon={<Heart size={22} />} label="Mood" isActive={isActive("/mood")} />
            <NavLink to="/self-help" icon={<Leaf size={22} />} label="Help" isActive={isActive("/self-help")} />
          </div>
        </nav>
      )}
      
      {/* Global animations */}
      <style>
        {`
          @keyframes pulse-subtle {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .animate-pulse-subtle {
            animation: pulse-subtle 2s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isEmergency?: boolean;
}

const NavLink = ({ to, icon, label, isActive, isEmergency }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center py-1 px-3 rounded-lg transition-all duration-200 touch-target",
        isActive 
          ? "text-primary relative after:content-[''] after:absolute after:bottom-[-0.5rem] after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
          : "text-slate-600 hover:text-primary/80 hover:bg-slate-50",
        isEmergency && "text-destructive hover:text-destructive/80"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={cn(
        "p-1.5 rounded-full transition-colors",
        isActive ? "bg-primary/10" : "bg-transparent"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-xs mt-1",
        isActive ? "font-medium" : "font-normal"
      )}>
        {label}
      </span>
    </Link>
  );
};

export default Layout;
