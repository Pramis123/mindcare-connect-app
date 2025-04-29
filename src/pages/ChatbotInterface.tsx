
import { useState } from "react";
import Layout from "@/components/Layout";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatHelp from "@/components/chat/ChatHelp";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import QuickReplies from "@/components/chat/QuickReplies";
import { sendMessageToAI } from "@/services/chatService";

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

  const handleSendMessage = async (text: string = inputText) => {
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
    
    try {
      const botMessage = await sendMessageToAI(text);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        text: "Sorry, there was an error processing your request.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <Layout hideCrisisButton>
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <ChatHeader toggleHelp={toggleHelp} clearChat={clearChat} />
        <ChatHelp showHelp={showHelp} />
        
        <ChatMessages messages={messages} isLoading={isLoading} />
        
        {messages.length === 1 && (
          <QuickReplies replies={QUICK_REPLIES} onSelectReply={handleSendMessage} />
        )}
        
        <ChatInput 
          inputText={inputText} 
          setInputText={setInputText} 
          handleSendMessage={() => handleSendMessage()} 
          isLoading={isLoading} 
        />
      </div>
    </Layout>
  );
};

export default ChatbotInterface;
