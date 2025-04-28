
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Home, MessageCircle, Heart, Leaf, Moon, User } from "lucide-react";
import QuickActions from "./QuickActions";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const Layout = ({ children, hideNav }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {children}
      </main>
      
      {!hideNav && (
        <nav className="bg-white border-t border-slate-200 py-2">
          <div className="container max-w-md mx-auto flex justify-around">
            <Link to="/" className="flex flex-col items-center p-2 text-slate-600 hover:text-primary">
              <Home size={24} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/chatbot" className="flex flex-col items-center p-2 text-slate-600 hover:text-primary">
              <MessageCircle size={24} />
              <span className="text-xs mt-1">Chat</span>
            </Link>
            <Link to="/mood" className="flex flex-col items-center p-2 text-slate-600 hover:text-primary">
              <Heart size={24} />
              <span className="text-xs mt-1">Mood</span>
            </Link>
            <Link to="/dashboard" className="flex flex-col items-center p-2 text-slate-600 hover:text-primary">
              <Leaf size={24} />
              <span className="text-xs mt-1">Help</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center p-2 text-slate-600 hover:text-primary">
              <User size={24} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </nav>
      )}
      
      <QuickActions />
    </div>
  );
};

export default Layout;
