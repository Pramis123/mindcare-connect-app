
import { Button } from "@/components/ui/button";

interface QuickRepliesProps {
  replies: string[];
  onSelectReply: (reply: string) => void;
}

const QuickReplies = ({ replies, onSelectReply }: QuickRepliesProps) => {
  return (
    <div className="p-3 bg-slate-50 border-t">
      <p className="text-sm text-slate-600 mb-2">Quick start - try one of these:</p>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply) => (
          <Button 
            key={reply} 
            variant="outline" 
            size="sm" 
            onClick={() => onSelectReply(reply)}
            className="text-sm py-1 h-auto touch-target"
          >
            {reply}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;
