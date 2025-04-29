
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
import { toast } from "sonner";

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

  async function sendMessage() {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    
    const API_KEY = '48f31d7042581994b88616ebbd3129aaeee1ee928c428c89b476d76db44a9475';
    const API_URL = 'https://api.together.xyz/v1/chat/completions';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
          messages: [
            {role:'system', content: 'You are a mental assistant bot and help other with mental health related stuffs and clear all their problems and doubts related to this and you whole purpose to assist with this stuff and you will give answers to ppls questions mainly on the basis of country nepal and only work is on mental health nothing more than that'},
            {role: 'user', content: userMessage.text }
          ],
          temperature: 0.7,
        })
      });

      const data = await response.json();
    
      if (data.choices && data.choices.length > 0) {
        const botMsg = data.choices[0].message.content.trim();
        const botMessage: Message = {
          id: Date.now().toString(),
          text: botMsg,
          sender: 'bot',
          timestamp: new Date()
        };
                  
        setMessages((prev) => [...prev, botMessage]);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error connecting to the assistant. Please try again later.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    sendMessage();
  };
  
  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };
  
  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  return (
    <Layout hideCrisisButton>
      <div className="flex flex-col h-full max-h-[calc(100vh-64px)] relative">
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
        
        {/* Chat messages container - adjusted height to leave room for input */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 pb-20" 
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
        
        {/* Quick replies above input - with optimized height and styling */}
        {messages.length === 1 && (
          <div className="fixed bottom-[70px] left-0 right-0 py-2 px-4 bg-slate-50 border-t z-10">
            <p className="text-sm text-slate-600 mb-2">Quick start - try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_REPLIES.map((reply) => (
                <Button 
                  key={reply} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickReply(reply)}
                  className="text-sm py-1 h-auto touch-target"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input area - fixed to bottom of screen, right above nav bar */}
        <div className="fixed bottom-16 left-0 right-0 p-2 border-t bg-white z-10 shadow-md">
          <form 
            className="flex gap-2 items-center max-w-md mx-auto"
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
      </div>
    </Layout>
  );
};

export default ChatbotInterface;
