import { useState } from "react";
import Layout from "@/components/Layout";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodEntrySkeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MoodLogging = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(3);
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😴", label: "Tired" }
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleIntensityChange = (value: number[]) => {
    setIntensity(value[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setSelectedMood(null);
        setIntensity(3);
        setNote("");
        setIsSaved(false);
      }, 2000);
    }, 1000);
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-header">How are you feeling today?</h1>
        
        <Card className="max-w-md mx-auto p-6">
          {isLoading ? (
            <MoodEntrySkeleton />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-lg mb-3 block">Select your mood</Label>
                <div className="grid grid-cols-3 gap-4">
                  {moods.map((mood) => (
                    <Button
                      key={mood.label}
                      type="button"
                      variant={selectedMood === mood.label ? "default" : "outline"}
                      className="h-20 flex flex-col items-center justify-center gap-1 hover:bg-primary/20"
                      onClick={() => handleMoodSelect(mood.label)}
                    >
                      <span className="mood-emoji">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {selectedMood && (
                <>
                  <div>
                    <Label className="text-lg mb-3 block">How intense is this feeling?</Label>
                    <div className="px-4">
                      <div className="flex justify-between mb-2 text-sm text-slate-500">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Strong</span>
                      </div>
                      <Slider 
                        defaultValue={[intensity]} 
                        max={5} 
                        step={1} 
                        onValueChange={handleIntensityChange}
                        className="py-4"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="note" className="text-lg mb-3 block">Add a note (optional)</Label>
                    <Textarea 
                      id="note"
                      placeholder="What's on your mind?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isSaved ? "Saved! 👍" : "Save Entry"}
                  </Button>
                </>
              )}
            </form>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default MoodLogging;
