
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, Heart, AlertTriangle, Leaf, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-3 items-end">
          <Link to="/crisis" className="flex items-center gap-2 bg-destructive text-white p-3 rounded-full shadow-lg">
            <AlertTriangle size={20} />
            <span className="text-sm font-medium pr-1">Crisis</span>
          </Link>
          <Link to="/mood" className="flex items-center gap-2 bg-primary text-white p-3 rounded-full shadow-lg">
            <Heart size={20} />
            <span className="text-sm font-medium pr-1">Mood</span>
          </Link>
          <Link to="/self-help" className="flex items-center gap-2 bg-primary text-white p-3 rounded-full shadow-lg">
            <Leaf size={20} />
            <span className="text-sm font-medium pr-1">Self-help</span>
          </Link>
          <Link to="/chatbot" className="flex items-center gap-2 bg-primary text-white p-3 rounded-full shadow-lg">
            <MessageCircle size={20} />
            <span className="text-sm font-medium pr-1">Chat</span>
          </Link>
        </div>
      )}
      <Button 
        onClick={toggleOpen} 
        className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90 text-white"
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </Button>
    </div>
  );
};

export default QuickActions;
