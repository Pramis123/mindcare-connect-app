import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, Heart, AlertTriangle, Leaf, MessageCircle, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-3 items-end animate-in fade-in slide-in-from-bottom-5 duration-300">
          <QuickActionButton
            to="/crisis"
            icon={<AlertTriangle size={22} />}
            label="Crisis Help"
            bgColor="bg-destructive"
          />
          <QuickActionButton
            to="/mood"
            icon={<Heart size={22} />}
            label="Log Mood"
            bgColor="bg-primary"
          />
          <QuickActionButton
            to="/self-help"
            icon={<Leaf size={22} />}
            label="Self Help"
            bgColor="bg-primary"
          />
          <QuickActionButton
            to="/sleep"
            icon={<Moon size={22} />}
            label="Sleep"
            bgColor="bg-primary"
          />
          <QuickActionButton
            to="/chatbot"
            icon={<MessageCircle size={22} />}
            label="Talk Now"
            bgColor="bg-primary"
          />
        </div>
      )}
      <Button 
        onClick={toggleOpen} 
        className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90 text-white"
        aria-label={isOpen ? "Close quick actions menu" : "Open quick actions menu"}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </Button>
    </div>
  );
};

interface QuickActionButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
}

const QuickActionButton = ({ to, icon, label, bgColor }: QuickActionButtonProps) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 ${bgColor} text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-200`}
  >
    {icon}
    <span className="text-sm font-medium pr-1">{label}</span>
  </Link>
);

export default QuickActions;
