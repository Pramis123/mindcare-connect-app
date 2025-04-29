
interface ChatHelpProps {
  showHelp: boolean;
}

const ChatHelp = ({ showHelp }: ChatHelpProps) => {
  if (!showHelp) return null;
  
  return (
    <div className="p-3 bg-accent/50 border-b">
      <h2 className="font-semibold mb-1">How to use the chat:</h2>
      <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
        <li>Type your message and press Enter or tap Send</li>
        <li>Try questions about anxiety, sleep, or mood</li>
        <li>Your conversation is private</li>
        <li>This is AI assistance, not professional therapy</li>
      </ul>
    </div>
  );
};

export default ChatHelp;
