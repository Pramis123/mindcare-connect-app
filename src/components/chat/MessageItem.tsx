
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
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
  );
};

export default MessageItem;
