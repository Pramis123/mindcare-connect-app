import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, Heart, Leaf } from "lucide-react";
import QuickActions from "./QuickActions";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col min-h-screen bg-gradient-soft">
      {pageTitle && (
        <header className="py-4 px-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-center">{pageTitle}</h1>
        </header>
      )}
      
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {showCrisisButton && (
        <Link to="/crisis" aria-label="Get emergency help" className="crisis-button touch-target">
          <span>Emergency Help</span>
        </Link>
      )}
      
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 shadow-md z-40">
          <div className="container max-w-md mx-auto flex justify-around">
            <NavLink to="/" icon={<Home size={24} />} label="Home" isActive={isActive("/")} />
            <NavLink to="/chatbot" icon={<MessageCircle size={24} />} label="Chat" isActive={isActive("/chatbot")} />
            <NavLink to="/mood" icon={<Heart size={24} />} label="Mood" isActive={isActive("/mood")} />
            <NavLink to="/self-help" icon={<Leaf size={24} />} label="Help" isActive={isActive("/self-help")} />
          </div>
        </nav>
      )}
      
      <QuickActions />
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
  const baseClasses = "flex flex-col items-center p-2 transition-colors duration-200 touch-target";
  const activeClasses = isActive ? "text-primary" : "text-slate-600 hover:text-primary";
  const emergencyClasses = isEmergency ? "text-destructive hover:text-destructive" : "";
  
  return (
    <Link 
      to={to} 
      className={`${baseClasses} ${isActive ? activeClasses : emergencyClasses || activeClasses}`} 
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </Link>
  );
};

export default Layout;
