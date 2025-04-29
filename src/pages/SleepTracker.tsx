import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Moon, ChevronRight, HelpCircle, ArrowRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sleepOptions = [
  { 
    value: "8h", 
    emoji: "🥰", 
    label: "≥8h", 
    feedback: "Your sleep was great! Keep it up.", 
    status: "Ideal sleep",
    motivation: "Amazing job maintaining healthy sleep habits! Your body thanks you.",
    color: "bg-green-400"
  },
  { 
    value: "7h", 
    emoji: "😊", 
    label: "7h", 
    feedback: "Your sleep was good!", 
    status: "Good sleep",
    motivation: "Good sleep! Just one more hour would be perfect for optimal rest.",
    color: "bg-blue-400"
  },
  { 
    value: "6h", 
    emoji: "😐", 
    label: "6h", 
    feedback: "You need more rest.", 
    status: "Okay sleep",
    motivation: "Try to get to bed a bit earlier tonight for better energy tomorrow.",
    color: "bg-yellow-400"
  },
  { 
    value: "5h", 
    emoji: "☹️", 
    label: "5h", 
    feedback: "Sleep deprivation alert!", 
    status: "Poor sleep",
    motivation: "Your body needs more rest. Consider taking a short nap today if possible.",
    color: "bg-orange-400"
  },
  { 
    value: "4h", 
    emoji: "😠", 
    label: "<4h", 
    feedback: "Critical sleep deficiency!", 
    status: "Bad sleep",
    motivation: "Prioritize sleep tonight. Even 2 more hours will make a huge difference.",
    color: "bg-red-400"
  },
];

const sleepTips = [
  "Turn off all screens at least 30 minutes before bedtime",
  "Keep your bedroom cool (around 65°F or 18°C)",
  "Avoid caffeine after 2 PM",
  "Create a relaxing bedtime routine",
  "Use blackout curtains to keep your room dark",
  "Try deep breathing exercises before sleeping",
  "Maintain a consistent sleep schedule, even on weekends",
  "Limit daytime naps to 20-30 minutes"
];

const SleepTracker = () => {
  const [selectedHours, setSelectedHours] = useState("7h");
  const [isAnimating, setIsAnimating] = useState(false);
  const [userName, setUserName] = useState("Alex");
  const [showTips, setShowTips] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const emojiRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Get current option details
  const currentOption = sleepOptions.find(option => option.value === selectedHours);
  
  // Handle selection change with animation
  const handleSelectionChange = (value: string) => {
    setIsAnimating(true);
    setSelectedHours(value);
    
    // Add bounce animation to the emoji
    if (emojiRef.current) {
      emojiRef.current.classList.add("animate-bounce");
      setTimeout(() => {
        if (emojiRef.current) {
          emojiRef.current.classList.remove("animate-bounce");
        }
      }, 600);
    }
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleContinue = () => {
    toast.success(`Saved ${selectedHours} of sleep for last night`);
    // Navigate to home screen
    navigate("/");
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Rotate through sleep tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % sleepTips.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout hideNav>
      <div className="max-w-md mx-auto bg-gradient-to-b from-indigo-50 to-white min-h-screen px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-indigo-100"
            onClick={handleBack}
          >
            <ArrowLeft className="h-6 w-6 text-indigo-700" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">Sleep tracking</h1>
          <div className="w-10"></div> {/* Spacer for balanced header */}
        </header>

        {/* Main content */}
        <div className="space-y-10">
          {/* Personalized welcome message */}
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-center text-gray-800"
          >
            Hi, {userName}! How long did you sleep last night?
          </motion.h2>
          
          {/* Emoji feedback card */}
          <motion.div 
            layout
            className="relative"
          >
            <Card 
              className={cn(
                "p-8 transition-all duration-300 rounded-2xl border-2 shadow-lg",
                isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100',
                selectedHours === "8h" ? "border-green-300" : 
                selectedHours === "7h" ? "border-blue-300" : 
                selectedHours === "6h" ? "border-yellow-300" : 
                selectedHours === "5h" ? "border-orange-300" : "border-red-300"
              )}
            >
              <div className="flex flex-col items-center">
                {/* Emoji container with dynamic coloring */}
                <div className="relative w-40 h-40 mb-6">
                  {/* Background circles */}
                  <motion.div 
                    className={cn(
                      "absolute inset-0 rounded-full opacity-20",
                      selectedHours === "8h" ? "bg-green-300" : 
                      selectedHours === "7h" ? "bg-blue-300" : 
                      selectedHours === "6h" ? "bg-yellow-300" : 
                      selectedHours === "5h" ? "bg-orange-300" : "bg-red-300"
                    )}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  ></motion.div>
                  
                  <motion.div 
                    className={cn(
                      "absolute inset-4 rounded-full opacity-40",
                      selectedHours === "8h" ? "bg-green-200" : 
                      selectedHours === "7h" ? "bg-blue-200" : 
                      selectedHours === "6h" ? "bg-yellow-200" : 
                      selectedHours === "5h" ? "bg-orange-200" : "bg-red-200"
                    )}
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.2
                    }}
                  ></motion.div>
                  
                  {/* Central emoji with dynamic updates */}
                  <div 
                    ref={emojiRef} 
                    className="absolute inset-8 rounded-full flex items-center justify-center"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={selectedHours}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-7xl"
                      >
                        {currentOption?.emoji}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Dynamic feedback text */}
                <motion.div 
                  layout
                  className="space-y-3 text-center"
                >
                  <AnimatePresence mode="wait">
                    <motion.h3 
                      key={`status-${selectedHours}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className={cn(
                        "text-2xl font-bold",
                        selectedHours === "8h" ? "text-green-600" : 
                        selectedHours === "7h" ? "text-blue-600" : 
                        selectedHours === "6h" ? "text-yellow-600" : 
                        selectedHours === "5h" ? "text-orange-600" : "text-red-600"
                      )}
                    >
                      {currentOption?.feedback}
                    </motion.h3>
                  </AnimatePresence>
                  
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={`motivation-${selectedHours}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-gray-600"
                    >
                      {currentOption?.motivation}
                    </motion.p>
                  </AnimatePresence>
                  
                  {/* Sleep tip carousel */}
                  <motion.div
                    className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 italic"
                  >
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={tipIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        Tip: {sleepTips[tipIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
            
            {/* Sleep Tips and History Buttons */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full bg-white shadow-md border-indigo-100 text-indigo-700 hover:bg-indigo-50"
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Sleep Tips
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Sleep Tips for Better Rest</DialogTitle>
                    <DialogDescription>
                      Implement these tips to improve your sleep quality
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[60vh] overflow-auto p-1">
                    {sleepTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-indigo-50">
                        <div className="bg-indigo-100 text-indigo-700 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                  <DialogClose asChild>
                    <Button className="w-full mt-2">Got it</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-white shadow-md border-indigo-100 text-indigo-700 hover:bg-indigo-50"
              >
                <History className="h-4 w-4 mr-1" />
                Sleep History
              </Button>
            </div>
          </motion.div>
          
          {/* Hours selection */}
          <div className="mt-12">
            <RadioGroup 
              value={selectedHours} 
              onValueChange={handleSelectionChange}
              className="flex justify-between px-2"
            >
              {sleepOptions.map((option) => (
                <div key={option.value} className="flex flex-col items-center gap-2 relative">
                  <div 
                    className={cn(
                      "relative cursor-pointer transition-transform hover:scale-110 touch-target",
                      selectedHours === option.value && "scale-110"
                    )}
                  >
                    {/* Selection indicator - animated ring */}
                    {selectedHours === option.value && (
                      <motion.div 
                        layoutId="active-sleep-option"
                        className={cn(
                          "absolute -inset-1 rounded-full -z-10",
                          option.color,
                          "opacity-20"
                        )}
                      />
                    )}
                    
                    <Label 
                      htmlFor={option.value} 
                      className={cn(
                        "text-3xl cursor-pointer flex items-center justify-center h-12 w-12 rounded-full",
                        selectedHours === option.value ? "transform-gpu scale-110" : ""
                      )}
                    >
                      {option.emoji}
                    </Label>
                  </div>
                  
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value} 
                    className="sr-only"
                  />
                  
                  <span className={cn(
                    "text-sm font-medium",
                    selectedHours === option.value 
                      ? "text-gray-900" 
                      : "text-gray-500"
                  )}>
                    {option.label}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        
        {/* Continue button */}
        <div className="mt-16">
          <Button 
            onClick={handleContinue} 
            className={cn(
              "w-full py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group relative overflow-hidden",
              selectedHours === "8h" ? "bg-green-500 hover:bg-green-600" : 
              selectedHours === "7h" ? "bg-blue-500 hover:bg-blue-600" : 
              selectedHours === "6h" ? "bg-yellow-500 hover:bg-yellow-600" : 
              selectedHours === "5h" ? "bg-orange-500 hover:bg-orange-600" : "bg-red-500 hover:bg-red-600",
              "text-white font-medium"
            )}
          >
            {/* Button animation effect */}
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            
            <span className="relative z-10 flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SleepTracker;
