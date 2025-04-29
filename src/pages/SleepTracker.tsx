
import { useState, useEffect } from "react";
import { ArrowLeft, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const sleepOptions = [
  { value: "8h", emoji: "😍", label: "≥8h", feedback: "Excellent sleep!" },
  { value: "7h", emoji: "🙂", label: "7h", feedback: "Your sleep was good!" },
  { value: "6h", emoji: "😐", label: "6h", feedback: "You need more rest." },
  { value: "5h", emoji: "😪", label: "5h", feedback: "Sleep deprivation alert!" },
  { value: "4h", emoji: "😡", label: "≤4h", feedback: "Critical sleep deficiency!" },
];

const SleepTracker = () => {
  const [selectedHours, setSelectedHours] = useState("7h");
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Get feedback text for the currently selected option
  const currentFeedback = sleepOptions.find(option => option.value === selectedHours)?.feedback;
  
  // Handle selection change with animation
  const handleSelectionChange = (value: string) => {
    setIsAnimating(true);
    setSelectedHours(value);
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleContinue = () => {
    toast.success(`Saved ${selectedHours} of sleep for last night`);
    // Here you would navigate to the next screen
  };

  return (
    <Layout hideNav>
      <div className="max-w-md mx-auto bg-white min-h-screen px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100">
            <ArrowLeft className="h-6 w-6 text-purple-700" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">Sleep tracking</h1>
          <span className="text-purple-600 font-medium">1 of 4</span>
        </header>

        {/* Main content */}
        <div className="space-y-12">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Hi Emily, how long did you sleep last night?
          </h2>
          
          {/* Emoji feedback card */}
          <Card className={`p-6 transition-all duration-300 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-purple-100 rounded-full opacity-30"></div>
                <div className="absolute inset-3 bg-purple-200 rounded-full flex items-center justify-center">
                  <div className="text-5xl">
                    {sleepOptions.find(option => option.value === selectedHours)?.emoji}
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-1 text-center">
                <h3 className="text-lg font-semibold text-purple-800">{currentFeedback}</h3>
                <p className="text-gray-600">Aim for 8+ hours of sleep for the best rest.</p>
              </div>
            </div>
          </Card>
          
          {/* Hours selection */}
          <div>
            <RadioGroup 
              value={selectedHours} 
              onValueChange={handleSelectionChange}
              className="flex justify-between mt-6 px-4"
            >
              {sleepOptions.map((option) => (
                <div key={option.value} className="flex flex-col items-center gap-2 relative">
                  <Label 
                    htmlFor={option.value} 
                    className="text-2xl cursor-pointer transition-transform hover:scale-110"
                  >
                    {option.emoji}
                  </Label>
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value} 
                    className="sr-only"
                  />
                  {selectedHours === option.value && (
                    <div className="absolute w-12 h-12 border-2 border-purple-500 rounded-full -mt-10 animate-pulse"></div>
                  )}
                  <span className="text-sm text-gray-500">{option.label}</span>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        
        {/* Continue button */}
        <div className="mt-16">
          <Button 
            onClick={handleContinue} 
            className="w-full py-6 text-lg rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:shadow-lg"
          >
            <Moon className="mr-2 h-5 w-5" />
            Continue
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SleepTracker;
