
import { useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const ChatInput = ({ inputText, setInputText, handleSendMessage, isLoading }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 border-t bg-white sticky bottom-0 z-10 shadow-sm mt-auto pb-6">
      <form 
        className="flex gap-2 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <Button 
          type="button"
          variant="outline" 
          size="icon" 
          className="flex-shrink-0 touch-target rounded-full" 
          aria-label="Attach file"
        >
          <Paperclip size={20} />
        </Button>
        
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 pl-4 pr-12 py-3 rounded-full border-slate-300 focus-visible:ring-primary"
            aria-label="Type your message"
            ref={inputRef}
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Button 
              type="submit"
              variant="ghost"
              size="icon"
              disabled={!inputText.trim() || isLoading}
              className={`h-8 w-8 rounded-full ${inputText.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-slate-200'}`}
              aria-label="Send message"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </form>
      {isLoading && (
        <div className="text-xs text-slate-500 mt-1 text-center animate-pulse">
          Assistant is typing...
        </div>
      )}
    </div>
  );
};

export default ChatInput;
