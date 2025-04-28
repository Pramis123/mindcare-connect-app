
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { toast } from "sonner";

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

const moodOptions: MoodOption[] = [
  { emoji: "😊", label: "Happy / खुशी", value: "happy" },
  { emoji: "😌", label: "Calm / शान्त", value: "calm" },
  { emoji: "😐", label: "Neutral / सामान्य", value: "neutral" },
  { emoji: "😔", label: "Sad / दुःखी", value: "sad" },
  { emoji: "😰", label: "Anxious / चिन्तित", value: "anxious" },
  { emoji: "😡", label: "Angry / रिसाएको", value: "angry" },
];

const MoodLogging = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error("Please select a mood");
      return;
    }
    
    toast.success("Mood logged successfully!");
    setSelectedMood(null);
    setNotes("");
  };

  const getMoodEmoji = () => {
    const option = moodOptions.find(option => option.value === selectedMood);
    return option ? option.emoji : "😶";
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-header">आज तपाईंलाई कस्तो महसुस भइरहेको छ?<br /><span className="text-base font-normal">(How are you feeling today?)</span></h1>
        
        <Card className="p-6 bg-white max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  selectedMood === option.value
                    ? "bg-primary/20 ring-2 ring-primary"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span className="text-xs mt-1 text-center">{option.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Why do you feel {selectedMood ? `${getMoodEmoji()}` : "this way"}?
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="You can share more about your feelings here..."
              className="h-24"
            />
          </div>
          
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={!selectedMood}
          >
            Log My Mood
          </Button>
          
          {selectedMood && (
            <p className="text-center mt-4 text-sm text-slate-600">
              {selectedMood === "sad" || selectedMood === "anxious" || selectedMood === "angry" 
                ? "It's okay to feel this way. Remember that feelings come and go."
                : "Thank you for sharing how you feel today."}
            </p>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default MoodLogging;
