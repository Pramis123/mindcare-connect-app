import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, Heart, Leaf, MessageCircle, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-3 items-end animate-in fade-in slide-in-from-bottom-5 duration-300">
          <QuickActionButton
            to="/crisis"
            label="Crisis Help"
            bgColor="bg-destructive"
            borderColor="border-l-red-300"
            hoverColor="hover:bg-destructive/90"
          />
          <QuickActionButton
            to="/mood"
            icon={<Heart size={22} />}
            label="Log Mood"
            bgColor="bg-pink-500"
            borderColor="border-l-pink-300"
            hoverColor="hover:bg-pink-600"
          />
          <QuickActionButton
            to="/self-help"
            icon={<Leaf size={22} />}
            label="Self Help"
            bgColor="bg-green-500"
            borderColor="border-l-green-300"
            hoverColor="hover:bg-green-600"
          />
          <QuickActionButton
            to="/sleep"
            icon={<Moon size={22} />}
            label="Sleep"
            bgColor="bg-indigo-500"
            borderColor="border-l-indigo-300"
            hoverColor="hover:bg-indigo-600"
          />
          <QuickActionButton
            to="/chatbot"
            icon={<MessageCircle size={22} />}
            label="Talk Now"
            bgColor="bg-primary"
            borderColor="border-l-blue-300"
            hoverColor="hover:bg-primary/90"
          />
        </div>
      )}
      <Button 
        onClick={toggleOpen} 
        className={cn(
          "h-14 w-14 rounded-full shadow-lg flex items-center justify-center",
          "bg-primary hover:bg-primary/90 text-white",
          "hover:shadow-xl hover:scale-105 transition-all duration-200",
          isOpen ? "" : "animate-pulse-subtle"
        )}
        aria-label={isOpen ? "Close quick actions menu" : "Open quick actions menu"}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </Button>
    </div>
  );
};

interface QuickActionButtonProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
}

const QuickActionButton = ({ to, icon, label, bgColor, borderColor, hoverColor }: QuickActionButtonProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-2 text-white p-3 rounded-full shadow-lg",
      "hover:shadow-xl hover:scale-105 transition-all duration-200",
      "relative overflow-hidden border-l-4",
      bgColor, borderColor, hoverColor, 
      "group"
    )}
  >
    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
    <span className="relative z-10 flex items-center gap-2">
      {icon && <span className="group-hover:animate-bounce-subtle transition-all">{icon}</span>}
      <span className="text-sm font-medium pr-1">{label}</span>
    </span>
  </Link>
);

export default QuickActions;
