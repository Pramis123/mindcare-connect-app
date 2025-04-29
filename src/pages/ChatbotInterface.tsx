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

// Together.xyz API configuration
const API_KEY = '48f31d7042581994b88616ebbd3129aaeee1ee928c428c89b476d76db44a9475';
const API_URL = 'https://api.together.xyz/v1/chat/completions';
const USE_MOCK_RESPONSES = true; // Set to false when API is working correctly

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
  const [isSending, setIsSending] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input field on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle Enter key press to submit
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && inputText.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim() || isSending) return;
    
    setIsSending(true);
    
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
    
    // Mock response generator function
    const getMockResponse = (userText: string): string => {
      const userTextLower = userText.toLowerCase();
      
      if (userTextLower.includes("anxious") || userTextLower.includes("anxiety")) {
        return "Feeling anxious is completely normal. Many people experience anxiety from time to time. Try taking some deep breaths - inhale for 4 counts, hold for 2, and exhale for 6. This can help calm your nervous system.\n\nWould you like to learn more breathing techniques or would you prefer to talk about what's making you feel anxious?";
      } 
      else if (userTextLower.includes("sad") || userTextLower.includes("depressed")) {
        return "I'm sorry you're feeling down. Remember that your feelings are valid and it's okay to not be okay sometimes. Would you like to talk more about what's troubling you, or would you prefer some self-care suggestions that might help lift your mood a bit?";
      } 
      else if (userTextLower.includes("sleep") || userTextLower.includes("insomnia")) {
        return "Sleep is crucial for mental health. Some tips that might help include:\n\n- Try to maintain a regular sleep schedule\n- Avoid screens at least an hour before bed\n- Keep your bedroom cool, dark and quiet\n- Practice a calming bedtime routine\n\nWould you like to hear more about sleep hygiene practices?";
      } 
      else if (userTextLower.includes("meditation") || userTextLower.includes("meditate")) {
        return "Meditation can be very helpful for mental wellbeing. You could start with just 5 minutes of focusing on your breath. When thoughts come (and they will!), gently acknowledge them and return to your breathing.\n\nWould you like a simple guided meditation script to try?";
      }
      else if (userTextLower.includes("hello") || userTextLower.includes("hi") || userTextLower === "hey") {
        return "Hello! It's nice to meet you. I'm here to support your mental wellbeing. How are you feeling today? Is there anything specific you'd like to talk about or get support with?";
      }
      else if (userTextLower.includes("what") && userTextLower.includes("do")) {
        return "I'm here to be a supportive companion for your mental wellbeing journey. I can:\n\n- Listen and provide emotional support\n- Suggest coping strategies for difficult emotions\n- Offer simple self-help exercises\n- Provide information about mental health topics\n\nWhat would be most helpful for you right now?";
      }
      else {
        return "Thank you for sharing that with me. I'm here to support you. Would you like to talk more about your feelings, or would you prefer some coping strategies that might help?";
      }
    };
    
    try {
      let botResponse = "";
      
      if (USE_MOCK_RESPONSES) {
        // Use mock response with a delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 800)); // Faster response time
        botResponse = getMockResponse(text);
      } else {
        // Prepare conversation history for API - only include the last 10 messages for context
        const conversationHistory = messages
          .slice(-10) // Get the most recent messages
          .filter(msg => msg.id !== '1') // Skip initial greeting for better context
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        }));
        
        // Add system prompt and new user message
        const apiMessages = [
          {
            role: "system",
            content: "You are a friendly, empathetic, and emotionally intelligent mental health support assistant. Your goal is to provide supportive conversation, gentle encouragement, mood tracking prompts, and suggest simple self-help exercises. You are not a therapist or doctor, and you must never provide clinical diagnosis, medical advice, or treatment. Always use simple, clear, and warm language that even people with basic literacy can understand. Prioritize understanding the user's emotions, offering positive reinforcement, and suggesting actionable next steps (like breathing exercises, journaling, or reaching out for help). If the user expresses crisis keywords (like suicide, self-harm, severe depression), immediately suggest contacting a crisis helpline or a trusted person without delay. You are culturally sensitive to users from Nepal and should adapt tone accordingly (polite, caring, non-judgmental)."
          },
          ...conversationHistory,
          { role: 'user', content: text }
        ];
        
        console.log('Sending API request to:', API_URL);
        console.log('API messages:', apiMessages);
        
        // Make API call to Together.xyz
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 800,
            top_p: 0.9
          })
        });
        
        console.log('API response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          throw new Error(`API responded with status: ${response.status}. Details: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('LLM Response data:', data);
        
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
          botResponse = data.choices[0].message.content.trim();
          console.log('Bot response:', botResponse);
        } else {
          // Handle missing or unexpected response structure
          console.error('Unexpected API response structure:', data);
          throw new Error('Received an unexpected response format from the API');
        }
      }
      
      // Add bot message
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error communicating with AI:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsSending(false);
      
      // Focus input after response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };
  
  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  // Helper function to format message text with basic markdown
  const formatMessage = (text: string) => {
    // Replace line breaks with <br>
    let formattedText = text.replace(/\n/g, "<br>");
    
    // Replace **text** with <b>text</b> for bold
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    
    // Replace _text_ with <i>text</i> for italic
    formattedText = formattedText.replace(/_(.*?)_/g, "<i>$1</i>");
    
    return formattedText;
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
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                />
                
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
        
        <div className="p-4 border-t bg-white sticky bottom-0">
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
                onKeyDown={handleKeyPress}
                className="flex-1 pl-4 pr-12 py-3 rounded-full border-slate-300 focus-visible:ring-primary"
                aria-label="Type your message"
                ref={inputRef}
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  size="icon"
                  variant="ghost"
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
