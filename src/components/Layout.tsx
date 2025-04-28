import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, Heart, Leaf, User, AlertTriangle } from "lucide-react";
import QuickActions from "./QuickActions";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const Layout = ({ children, hideNav }: LayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 shadow-md z-40">
          <div className="container max-w-md mx-auto flex justify-around">
            <NavLink to="/" icon={<Home size={24} />} label="Home" isActive={isActive("/")} />
            <NavLink to="/chatbot" icon={<MessageCircle size={24} />} label="Chat" isActive={isActive("/chatbot")} />
            <NavLink to="/mood" icon={<Heart size={24} />} label="Mood" isActive={isActive("/mood")} />
            <NavLink to="/self-help" icon={<Leaf size={24} />} label="Help" isActive={isActive("/self-help")} />
            <NavLink to="/crisis" icon={<AlertTriangle size={24} />} label="Crisis" isActive={isActive("/crisis")} isEmergency />
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
  const baseClasses = "flex flex-col items-center p-2 transition-colors duration-200";
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
