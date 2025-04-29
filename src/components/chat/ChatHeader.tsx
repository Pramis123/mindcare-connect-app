
import { RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ChatHeaderProps {
  toggleHelp: () => void;
  clearChat: () => void;
}

const ChatHeader = ({ toggleHelp, clearChat }: ChatHeaderProps) => {
  return (
    <header className="p-4 bg-primary/20 border-b flex items-center justify-between">
      <div>
        <h1 className="font-bold text-xl" id="chat-title">MindCare Assistant</h1>
        <p className="text-sm text-slate-600">I'm here to listen and support you 24/7</p>
      </div>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full touch-target" 
                onClick={toggleHelp}
                aria-label="Show chat help"
              >
                <HelpCircle size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full touch-target" 
                onClick={clearChat}
                aria-label="Clear chat history"
              >
                <RefreshCw size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default ChatHeader;
