import { useState } from "react";
import Layout from "@/components/Layout";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodEntrySkeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/ui/loading-screen";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MoodLogging = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(3);
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);

  const moods = [
    { emoji: "😊", label: "Happy", description: "Feeling good or content" },
    { emoji: "😐", label: "Neutral", description: "Neither good nor bad" },
    { emoji: "😔", label: "Sad", description: "Feeling down or unhappy" },
    { emoji: "😡", label: "Angry", description: "Feeling upset or frustrated" },
    { emoji: "😰", label: "Anxious", description: "Feeling worried or nervous" },
    { emoji: "😴", label: "Tired", description: "Feeling exhausted or sleepy" }
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowGuide(false);
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
        setShowGuide(true);
      }, 2000);
    }, 1000);
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-header">How are you feeling today?</h1>
        
        {showGuide && (
          <Alert className="max-w-md mx-auto mb-4 bg-accent/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Tracking your mood regularly helps identify patterns and improve your mental health.
            </AlertDescription>
          </Alert>
        )}
        
        <Card className="max-w-md mx-auto p-6 shadow-sm">
          {isLoading ? (
            <MoodEntrySkeleton />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="mood-selection" className="text-lg mb-3 block">
                  Select your mood
                </Label>
                <div 
                  id="mood-selection" 
                  role="radiogroup" 
                  aria-required="true"
                  className="grid grid-cols-3 gap-4"
                >
                  {moods.map((mood) => (
                    <Button
                      key={mood.label}
                      type="button"
                      variant={selectedMood === mood.label ? "default" : "outline"}
                      className="h-20 flex flex-col items-center justify-center gap-1 hover:bg-primary/20 touch-target"
                      onClick={() => handleMoodSelect(mood.label)}
                      aria-selected={selectedMood === mood.label}
                      aria-label={`${mood.label}: ${mood.description}`}
                      role="radio"
                    >
                      <span className="mood-emoji" aria-hidden="true">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {selectedMood && (
                <>
                  <div>
                    <Label htmlFor="intensity-slider" className="text-lg mb-3 block">
                      How intense is this feeling?
                    </Label>
                    <div className="px-4">
                      <div className="flex justify-between mb-2 text-sm text-slate-500">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Strong</span>
                      </div>
                      <Slider 
                        id="intensity-slider"
                        defaultValue={[intensity]} 
                        max={5} 
                        step={1} 
                        onValueChange={handleIntensityChange}
                        className="py-4"
                        aria-label="Mood intensity level"
                      />
                      <p className="sr-only">Current intensity: {intensity} out of 5</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="note" className="text-lg mb-3 block">
                      Add a note (optional)
                    </Label>
                    <Textarea 
                      id="note"
                      placeholder="What's on your mind? How did your day go?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-[100px]"
                      aria-describedby="note-hint"
                    />
                    <p id="note-hint" className="text-xs text-slate-500 mt-1">
                      This note is private and helps you track your thoughts.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 text-lg touch-target animate-scale"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingButton /> : isSaved ? "Saved! 👍" : "Save Entry"}
                  </Button>
                </>
              )}
            </form>
          )}
        </Card>
        
        <div className="max-w-md mx-auto mt-6 text-center">
          <p className="text-sm text-slate-600">Your mood data helps you track patterns over time.</p>
          <p className="text-sm text-slate-600 mt-1">All information is stored privately on your device.</p>
        </div>
      </div>
    </Layout>
  );
};

export default MoodLogging;
