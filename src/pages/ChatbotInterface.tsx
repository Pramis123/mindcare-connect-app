import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, User, Bot, RefreshCw, HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessageSkeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hello! I'm here to support your mental well-being. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const QUICK_REPLIES = [
  "I'm feeling anxious",
  "I need help with sleep",
  "I'm feeling sad",
  "Tips for meditation"
];

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      if (text.toLowerCase().includes("anxious") || text.toLowerCase().includes("anxiety")) {
        botResponse = "Feeling anxious is normal. Try taking deep breaths - inhale for 4 counts, hold for 2, and exhale for 6. Would you like to learn more breathing techniques?";
      } else if (text.toLowerCase().includes("sad") || text.toLowerCase().includes("depressed")) {
        botResponse = "I'm sorry you're feeling down. Remember that your feelings are valid. Would you like to talk more about what's troubling you or would you prefer some self-care suggestions?";
      } else if (text.toLowerCase().includes("sleep")) {
        botResponse = "Sleep is crucial for mental health. Try to maintain a regular sleep schedule and avoid screens an hour before bed. Would you like more sleep tips?";
      } else if (text.toLowerCase().includes("meditation") || text.toLowerCase().includes("meditate")) {
        botResponse = "Meditation can be very helpful. Start with just 5 minutes of focusing on your breath. Would you like a guided meditation script to try?";
      } else {
        botResponse = "Thank you for sharing. I'm here to support you. Would you like to talk more about your feelings or would you prefer some coping strategies?";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      
      // Focus input after response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }, 1500);
  };
  
  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  return (
    <Layout hideCrisisButton>
      <div className="flex flex-col h-[calc(100vh-16rem)]">
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
                    onClick={() => setShowHelp(!showHelp)}
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
        
        {showHelp && (
          <div className="p-3 bg-accent/50 border-b">
            <h2 className="font-semibold mb-1">How to use the chat:</h2>
            <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
              <li>Type your message and press Enter or tap Send</li>
              <li>Try questions about anxiety, sleep, or mood</li>
              <li>Your conversation is private</li>
              <li>This is AI assistance, not professional therapy</li>
            </ul>
          </div>
        )}
        
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4" 
          aria-live="polite"
          aria-relevant="additions"
          aria-labelledby="chat-title"
        >
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot size={16} aria-hidden="true" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={`chat-bubble ${
                    message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                  }`}
                  aria-label={`${message.sender === 'user' ? 'You' : 'Assistant'}: ${message.text}`}
                >
                  {message.text}
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-slate-200">
                      <User size={16} aria-hidden="true" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <ChatMessageSkeleton />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="p-3 bg-slate-50 border-t">
            <p className="text-sm text-slate-600 mb-2">Quick start - try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_REPLIES.map((reply) => (
                <Button 
                  key={reply} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSendMessage(reply)}
                  className="text-sm py-1 h-auto touch-target"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t bg-white">
          <form 
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Button 
              type="button"
              variant="outline" 
              size="icon" 
              className="flex-shrink-0 touch-target" 
              aria-label="Attach file"
            >
              <Paperclip size={20} />
            </Button>
            
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1"
              aria-label="Type your message"
              ref={inputRef}
            />
            
            <Button 
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="flex-shrink-0 touch-target"
              aria-label="Send message"
            >
              <Send size={20} />
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotInterface;
