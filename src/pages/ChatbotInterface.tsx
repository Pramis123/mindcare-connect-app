
import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "नमस्ते! म तपाईंलाई कसरी मद्दत गर्न सक्छु? (Hello! How can I help you?)",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const responses = [
        "तपाईं कस्तो महसुस गर्दै हुनुहुन्छ? (How are you feeling?)",
        "म सुन्न यहाँ छु। (I'm here to listen.)",
        "तपाईंलाई मद्दत गर्न पाउँदा खुसी छु। (I'm happy to help you.)",
        "के तपाईंले आज कुनै राम्रो कुरा अनुभव गर्नुभयो? (Did you experience something good today?)"
      ];
      
      const botMessage: Message = {
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen bg-background pb-16">
        <div className="bg-white py-3 px-4 border-b">
          <h1 className="text-lg font-semibold text-center">AI मानसिक स्वास्थ्य सहायक</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 max-w-[80%] ${message.isUser ? "ml-auto" : "mr-auto"}`}
            >
              <div 
                className={`p-3 rounded-lg ${
                  message.isUser 
                  ? "bg-primary text-white rounded-br-none" 
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
              <div className={`text-xs text-gray-500 mt-1 ${message.isUser ? "text-right" : "text-left"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white border-t p-3 fixed bottom-0 left-0 right-0">
          <div className="flex gap-2 container max-w-md mx-auto">
            <Button variant="outline" size="icon" className="shrink-0">
              <Mic size={20} />
            </Button>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!inputText.trim()} size="icon" className="shrink-0">
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotInterface;
