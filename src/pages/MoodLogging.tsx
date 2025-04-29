import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodEntrySkeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/ui/loading-screen";
import { SunIcon, History, HelpCircle, Mic } from "lucide-react";
import { toast } from "sonner";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Define mood options with emojis, labels, and feedback
const moods = [
  { 
    emoji: "😊", 
    label: "Happy", 
    labelNp: "खुसी", 
    description: "Feeling good or joyful",
    feedback: "That's wonderful! Keep shining today!",
    color: "bg-yellow-50 border-yellow-200",
    hoverColor: "hover:bg-yellow-100 hover:border-yellow-300",
    activeColor: "bg-yellow-100 border-yellow-300"
  },
  { 
    emoji: "😐", 
    label: "Neutral", 
    labelNp: "तटस्थ", 
    description: "Neither good nor bad",
    feedback: "Sometimes a neutral day is just what we need. Taking it steady.",
    color: "bg-slate-50 border-slate-200",
    hoverColor: "hover:bg-slate-100 hover:border-slate-300",
    activeColor: "bg-slate-100 border-slate-300"
  },
  { 
    emoji: "😔", 
    label: "Sad", 
    labelNp: "दुःखी", 
    description: "Feeling down or unhappy",
    feedback: "It's okay to feel sad. Be gentle with yourself today.",
    color: "bg-blue-50 border-blue-200",
    hoverColor: "hover:bg-blue-100 hover:border-blue-300",
    activeColor: "bg-blue-100 border-blue-300"
  },
  { 
    emoji: "😌", 
    label: "Relaxed", 
    labelNp: "शान्त", 
    description: "Feeling calm and at ease",
    feedback: "Wonderful! A relaxed mind helps maintain balance.",
    color: "bg-green-50 border-green-200",
    hoverColor: "hover:bg-green-100 hover:border-green-300",
    activeColor: "bg-green-100 border-green-300"
  },
  { 
    emoji: "😰", 
    label: "Anxious", 
    labelNp: "चिन्तित", 
    description: "Feeling worried or nervous",
    feedback: "It's okay to feel anxious. Take a deep breath. You're not alone.",
    color: "bg-purple-50 border-purple-200",
    hoverColor: "hover:bg-purple-100 hover:border-purple-300",
    activeColor: "bg-purple-100 border-purple-300"
  },
  { 
    emoji: "😴", 
    label: "Tired", 
    labelNp: "थकित", 
    description: "Feeling exhausted or sleepy",
    feedback: "Rest is important! Be sure to take care of your energy today.",
    color: "bg-indigo-50 border-indigo-200",
    hoverColor: "hover:bg-indigo-100 hover:border-indigo-300",
    activeColor: "bg-indigo-100 border-indigo-300"
  }
];

const MoodLogging = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleMoodSelect = (mood: string) => {
    // For single selection
    setSelectedMood(mood);
    setShowFeedback(true);
  };

  // Reset feedback after a few seconds
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error("Please select how you're feeling today");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      toast.success("Your mood has been logged successfully!");
      
      // Reset form after a delay
      setTimeout(() => {
        setSelectedMood(null);
        setNote("");
        setIsSaved(false);
      }, 2000);
    }, 1000);
  };

  const getMoodFeedback = () => {
    if (!selectedMood) return "";
    const mood = moods.find(m => m.label === selectedMood);
    return mood?.feedback || "";
  };

  return (
    <Layout pageTitle="">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-24">
        {/* Enhanced header with icon */}
        <div className="pt-6 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SunIcon className="h-7 w-7 text-amber-400" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-slate-800">Track Your Mood</h1>
          </div>
          <div className="max-w-md mx-auto bg-blue-50/70 rounded-xl p-3 border border-blue-100">
            <p className="text-slate-700">
              Your moods matter! <span className="text-amber-500">✨</span> Keep checking in.
            </p>
          </div>
        </div>
        
        {/* Main card */}
        <Card className="max-w-md mx-auto bg-white shadow-sm border rounded-2xl overflow-hidden">
          {isLoading ? (
            <MoodEntrySkeleton />
          ) : (
            <div className="p-5">
              {/* Question header with info button */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-slate-800">
                  How are you feeling today?
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-8 w-8 bg-slate-50"
                        onClick={() => setShowInfo(!showInfo)}
                      >
                        <HelpCircle size={16} className="text-slate-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Learn why tracking mood helps</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Info panel */}
              {showInfo && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm border border-blue-100 animate-fadeIn">
                  <h3 className="font-medium mb-1 text-slate-700">Why track your mood?</h3>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Helps identify emotional patterns</li>
                    <li>Builds self-awareness</li>
                    <li>Allows you to see progress over time</li>
                    <li>Helps connect emotions with situations</li>
                  </ul>
                </div>
              )}
              
              {/* Mood grid - 2x3 layout */}
              <div 
                role="radiogroup" 
                aria-label="Select your mood"
                className="grid grid-cols-2 gap-3 mb-5"
              >
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    type="button"
                    className={cn(
                      "rounded-xl p-4 border-2 flex flex-col items-center justify-center gap-1 transition-all duration-200",
                      mood.color,
                      mood.hoverColor,
                      selectedMood === mood.label && "ring-2 ring-primary/30 " + mood.activeColor
                    )}
                    onClick={() => handleMoodSelect(mood.label)}
                    aria-selected={selectedMood === mood.label}
                    aria-label={`${mood.label}: ${mood.description}`}
                    role="radio"
                  >
                    <span className="text-4xl mb-1 transition-all animate-subtle-bounce" aria-hidden="true">
                      {mood.emoji}
                    </span>
                    <div className="text-center">
                      <div className="font-medium">{mood.label}</div>
                      <div className="text-xs text-slate-500">{mood.labelNp}</div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Feedback area */}
              {showFeedback && selectedMood && (
                <div className="mb-4 text-center animate-fadeIn">
                  <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                    <p className="text-slate-700">{getMoodFeedback()}</p>
                  </div>
                </div>
              )}
              
              {/* Action buttons and support text */}
              {selectedMood && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Optional note entry */}
                  <div>
                    <Label htmlFor="note" className="text-sm font-medium block mb-2">
                      Add a note (optional)
                    </Label>
                    <div className="relative">
                      <Textarea 
                        id="note"
                        placeholder="What's on your mind? How did your day go?"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[80px] pr-10 rounded-xl"
                      />
                      <button 
                        type="button"
                        className="absolute right-3 bottom-3 text-slate-400 hover:text-primary transition-colors"
                        aria-label="Voice input"
                      >
                        <Mic size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Track mood button */}
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full py-3 font-medium rounded-xl transition-all hover:shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingButton /> : isSaved ? "Saved! 👍" : "Track My Mood"}
                  </Button>
                </div>
              )}
              
              {/* Reassuring statement */}
              <div className="mt-5 text-center">
                <p className="text-slate-600 text-sm">
                  Your mood data helps you track patterns over time.
                </p>
              </div>
            </div>
          )}
        </Card>
        
        {/* Additional actions area */}
        <div className="max-w-md mx-auto mt-5 flex justify-between px-2">
          <Button 
            variant="outline" 
            className="text-sm py-1 h-auto rounded-full border-primary/20 hover:bg-primary/5"
            asChild
          >
            <Link to="/dashboard">
              <History size={14} className="mr-1" />
              View History
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="text-sm py-1 h-auto rounded-full border-primary/20 hover:bg-primary/5"
            onClick={() => setShowInfo(!showInfo)}
          >
            <HelpCircle size={14} className="mr-1" />
            Why track my mood?
          </Button>
        </div>
      </div>
      
      {/* Add custom CSS for animations */}
      <style>
        {`
          @keyframes subtle-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-subtle-bounce {
            animation: subtle-bounce 2s ease-in-out infinite;
          }
          
          .animate-fadeIn {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}
      </style>
    </Layout>
  );
};

export default MoodLogging;
