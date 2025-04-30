
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, User, Bot, RefreshCw, HelpCircle, Mic, Home, MessageCircle, Heart, LifeBuoy, Smile, Moon, Bed, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessageSkeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    text: "Hi there! I'm here to help. Let's work together to feel better.",
    sender: 'bot',
    timestamp: new Date()
  }
];

// Organized quick replies by category
const QUICK_REPLIES = {
  feelings: [
    { icon: <Smile className="mr-2 h-5 w-5 text-yellow-500" />, text: "I'm feeling anxious", hint: "Click for tips to calm your mind" },
    { icon: <Moon className="mr-2 h-5 w-5 text-indigo-500" />, text: "I'm feeling sad", hint: "We can work through this together" }
  ],
  activities: [
    { icon: <Bed className="mr-2 h-5 w-5 text-blue-500" />, text: "I need help with sleep", hint: "Discover better sleep habits" },
    { icon: <Sparkles className="mr-2 h-5 w-5 text-purple-500" />, text: "Tips for meditation", hint: "Find your center with these practices" }
  ]
};

const FOLLOW_UP_SUGGESTIONS = [
  "Tell me more",
  "How long has this been happening?",
  "What helps you feel better?"
];

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
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
    setLastInteraction(Date.now());
    
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
            {role:'system', content: 'You are "Sathi", an AI mental health assistant for Nepal. Provide empathetic, culturally sensitive support for any mental and neurological issues from stress, depression, anxiety to biggers issues like ADHD, autism, bipolar and many more . Do not offer medical diagnoses rather explain the possible causes behind their issues and guide users to local resources such as counseling centers, support groups, helplines and any other service that offers services regarding these issues . Use a conversational, supportive tone, incorporating Nepali expressions where appropriate. Ensure responses are accessible and considerate of local attitudes toward mental health.'},
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
        
        // Show mood check after 3 messages
        if (messages.length >= 4 && !showMoodCheck) {
          setTimeout(() => {
            setShowMoodCheck(true);
          }, 1000);
        }
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
    // Fix: Only scroll if ref is available
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Delay scroll to ensure rendering completes
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

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
      setShowMoodCheck(false);
    }
  };
  
  const handleVoiceInput = () => {
    // Just a mockup - in a real app this would use the Web Speech API
    toast.info("Voice input activated - try speaking now");
    // Simulating voice input for demo purposes
    setTimeout(() => {
      setInputText("I've been feeling stressed lately");
      toast.success("Voice input captured!");
    }, 2000);
  };
  
  const recordMood = (mood: string) => {
    const moodMessage: Message = {
      id: Date.now().toString(),
      text: `I'm feeling ${mood} right now.`,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, moodMessage]);
    setShowMoodCheck(false);
    
    // Simulate bot response to mood
    setIsLoading(true);
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for sharing that you're feeling ${mood}. It's important to acknowledge our feelings. Would you like to talk more about what's making you feel this way?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Determine if we should show quick replies
  const shouldShowQuickReplies = messages.length === 1;

  return (
    <Layout hideCrisisButton>
      <div className="flex flex-col h-full max-h-[calc(100vh-64px)] relative">
        {/* Enhanced header with avatar and info button */}
        <header className="p-4 bg-primary/20 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/30">
              <AvatarImage src="/bot-avatar.png" alt="MindCare Assistant" />
              <AvatarFallback className="bg-primary/20 text-primary animate-pulse">
                <Smile className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-xl" id="chat-title">MindCare Assistant</h1>
              <p className="text-sm text-slate-600">I'm here to listen and support you 24/7</p>
            </div>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full touch-target h-10 w-10" 
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
                    className="rounded-full touch-target h-10 w-10" 
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
          <div className="p-4 bg-accent/50 border-b">
            <h2 className="font-semibold mb-2">How to use the chat:</h2>
            <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
              <li>Type your message and press Enter or tap Send</li>
              <li>Try questions about anxiety, sleep, or mood</li>
              <li>Your conversation is private</li>
              <li>This is AI assistance, not professional therapy</li>
              <li>Use voice input by tapping the microphone icon</li>
            </ul>
          </div>
        )}
        
        {/* Chat messages container - adjusted height to leave room for input */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 pb-32" 
          aria-live="polite"
          aria-relevant="additions"
          aria-labelledby="chat-title"
          ref={chatContainerRef}
        >
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-300 ease-in-out`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.sender === 'bot' && (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/bot-avatar.png" alt="MindCare Assistant" />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Smile size={20} aria-hidden="true" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={`chat-bubble ${
                    message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                  } shadow-sm`}
                  aria-label={`${message.sender === 'user' ? 'You' : 'Assistant'}: ${message.text}`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {message.text}
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-slate-200">
                      <User size={20} aria-hidden="true" />
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
          
          {/* Follow-up suggestions after bot messages */}
          {messages.length > 1 && messages[messages.length - 1].sender === 'bot' && !isLoading && (
            <div className="flex flex-wrap gap-2 mt-2 ml-12">
              {FOLLOW_UP_SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(suggestion)}
                  className="text-sm py-1 h-auto rounded-full bg-primary/5 border-primary/20 hover:bg-primary/10 transition-all"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          
          {/* Mood check prompt */}
          {showMoodCheck && (
            <div className="mx-auto max-w-xs bg-primary/10 p-3 rounded-lg shadow-sm border border-primary/20 text-center transition-all">
              <p className="text-sm font-medium mb-2">How are you feeling now?</p>
              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => recordMood("better")}>
                  😊 Better
                </Button>
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => recordMood("the same")}>
                  😐 Same
                </Button>
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => recordMood("worse")}>
                  😔 Worse
                </Button>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Redesigned categorized quick replies */}
        {shouldShowQuickReplies && (
          <div className="fixed bottom-[120px] left-0 right-0 py-3 px-4 bg-slate-50/90 backdrop-blur-sm border-t z-10 max-h-[180px] overflow-y-auto">
            <h3 className="text-base font-medium mb-3">Let's get started:</h3>
            
            <div className="mb-4">
              <h4 className="text-sm text-slate-500 mb-2 font-medium">Feelings</h4>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_REPLIES.feelings.map((reply) => (
                  <Button 
                    key={reply.text} 
                    variant="outline" 
                    size="lg" 
                    onClick={() => handleQuickReply(reply.text)}
                    className="flex items-center justify-start h-auto py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all touch-target border-slate-200 hover:border-primary/30 text-left"
                  >
                    {reply.icon}
                    <div>
                      <div className="font-medium">{reply.text}</div>
                      <div className="text-xs text-slate-500 mt-1">{reply.hint}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-slate-500 mb-2 font-medium">Activities</h4>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_REPLIES.activities.map((reply) => (
                  <Button 
                    key={reply.text} 
                    variant="outline" 
                    size="lg" 
                    onClick={() => handleQuickReply(reply.text)}
                    className="flex items-center justify-start h-auto py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all touch-target border-slate-200 hover:border-primary/30 text-left"
                  >
                    {reply.icon}
                    <div>
                      <div className="font-medium">{reply.text}</div>
                      <div className="text-xs text-slate-500 mt-1">{reply.hint}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Input area - fixed position adjusted to be above the navigation */}
        <div className="fixed bottom-[60px] left-0 right-0 p-3 border-t bg-white z-10 shadow-md">
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
              className="flex-shrink-0 touch-target rounded-full h-11 w-11 border-slate-300" 
              aria-label="Attach file"
            >
              <Paperclip size={20} />
            </Button>
            
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Type your message... or ask, 'How do I handle anxiety?'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 pl-4 pr-20 py-3 rounded-full border-slate-300 focus-visible:ring-primary text-base"
                aria-label="Type your message"
                ref={inputRef}
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleVoiceInput}
                  className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200"
                  aria-label="Voice input"
                >
                  <Mic size={16} className="text-slate-600" />
                </Button>
                <Button 
                  type="submit"
                  variant="ghost"
                  size="icon"
                  disabled={!inputText.trim() || isLoading}
                  className={`h-8 w-8 rounded-full ${inputText.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-slate-200'} transition-colors`}
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
        
        {/* Custom navigation bar with labels */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t h-[60px] flex justify-around items-center px-2 z-20">
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-1 rounded-lg w-[20%]">
            <Home size={22} className="text-slate-600" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-1 rounded-lg w-[20%] border-t-2 border-primary">
            <MessageCircle size={22} className="text-primary" />
            <span className="text-xs font-medium text-primary">Chat</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-1 rounded-lg w-[20%]">
            <Heart size={22} className="text-slate-600" />
            <span className="text-xs">Mood</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-1 rounded-lg w-[20%]">
            <LifeBuoy size={22} className="text-slate-600" />
            <span className="text-xs">Help</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotInterface;
