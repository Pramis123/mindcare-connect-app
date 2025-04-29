import { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  HelpCircle, 
  Cloud, 
  Moon, 
  Heart, 
  Flower, 
  ChevronRight, 
  X, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  Star,
  Frown, 
  MessageSquare,
  Feather
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Types for our data structure
interface Exercise {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isFavorite?: boolean;
  imageSrc?: string;
  steps: {
    title: string;
    instruction: string;
  }[];
}

interface Category {
  id: string;
  name: string;
  nameNepali?: string;
  icon: React.ReactNode;
  description: string;
  descriptionNepali?: string;
}

// Define recommendation algorithm (simplified for demo)
const getRecommendations = (exercises: Exercise[], current: string): Exercise[] => {
  return exercises
    .filter(ex => ex.id !== current)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
};

const categories: Category[] = [
  {
    id: "stress",
    name: "Stress",
    nameNepali: "तनाव",
    icon: <Frown size={24} />,
    description: "Techniques to stay calm",
    descriptionNepali: "शान्त रहन तरिकाहरू"
  },
  {
    id: "sleep",
    name: "Sleep",
    nameNepali: "निद्रा",
    icon: <Moon size={24} />,
    description: "Tips for better rest",
    descriptionNepali: "राम्रो आरामको लागि सुझावहरू"
  },
  {
    id: "confidence",
    name: "Confidence",
    nameNepali: "आत्मविश्वास",
    icon: <MessageSquare size={24} />,
    description: "Ways to boost self-esteem",
    descriptionNepali: "आत्मसम्मान बढाउने तरिकाहरू"
  },
  {
    id: "mindfulness",
    name: "Mindfulness",
    nameNepali: "सचेतना",
    icon: <Feather size={24} />,
    description: "Practices for awareness",
    descriptionNepali: "जागरूकताको लागि अभ्यासहरू"
  }
];

const exercises: Exercise[] = [
  {
    id: "body-scan",
    title: "Body Scan Meditation",
    description: "Become aware of sensations in your body",
    icon: <Flower size={24} />,
    category: "mindfulness",
    isFavorite: false,
    imageSrc: "/images/leaf.svg",
    steps: [
      {
        title: "Step 1: Lie Down",
        instruction: "Lie on your back with arms at your sides."
      },
      {
        title: "Step 2: Notice Your Breath",
        instruction: "Focus on your breathing for a few moments."
      },
      {
        title: "Step 3: Scan Your Body",
        instruction: "Slowly move your attention from toes to head, noticing sensations."
      },
      {
        title: "Step 4: Return to Awareness",
        instruction: "Gently bring your attention back to the room around you."
      }
    ]
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    description: "Calm your mind in 2 minutes",
    icon: <Cloud size={24} />,
    category: "stress",
    isFavorite: false,
    steps: [
      {
        title: "Step 1: Find a Quiet Spot",
        instruction: "Sit comfortably and place your hands on your belly."
      },
      {
        title: "Step 2: Breathe In",
        instruction: "Inhale deeply through your nose for 4 seconds."
      },
      {
        title: "Step 3: Hold",
        instruction: "Hold your breath for 7 seconds."
      },
      {
        title: "Step 4: Exhale",
        instruction: "Exhale completely through your mouth for 8 seconds."
      }
    ]
  },
  {
    id: "progressive-relaxation",
    title: "Progressive Relaxation",
    description: "Release tension from your body",
    icon: <Cloud size={24} />,
    category: "stress",
    isFavorite: true,
    steps: [
      {
        title: "Step 1: Get Comfortable",
        instruction: "Lie down or sit in a comfortable position."
      },
      {
        title: "Step 2: Focus on Your Feet",
        instruction: "Tense the muscles in your feet for 5 seconds, then relax."
      },
      {
        title: "Step 3: Move Upward",
        instruction: "Work your way up through each muscle group in your body."
      },
      {
        title: "Step 4: Notice the Difference",
        instruction: "Pay attention to how your body feels different when relaxed."
      }
    ]
  },
  {
    id: "gratitude-journal",
    title: "Gratitude Journal",
    description: "Shift focus to the positive in your life",
    icon: <Heart size={24} />,
    category: "confidence",
    isFavorite: false,
    steps: [
      {
        title: "Step 1: Find Paper and Pen",
        instruction: "Get a notebook or paper to write on."
      },
      {
        title: "Step 2: List Three Things",
        instruction: "Write down three things you're grateful for today."
      },
      {
        title: "Step 3: Explain Why",
        instruction: "For each item, write why it brings you gratitude."
      },
      {
        title: "Step 4: Reflect",
        instruction: "Take a moment to feel the positive emotions from your list."
      }
    ]
  },
  {
    id: "sleep-routine",
    title: "Bedtime Routine",
    description: "Prepare your mind and body for rest",
    icon: <Moon size={24} />,
    category: "sleep",
    isFavorite: false,
    steps: [
      {
        title: "Step 1: Set a Schedule",
        instruction: "Go to bed and wake up at the same time every day."
      },
      {
        title: "Step 2: Create a Ritual",
        instruction: "Do calming activities before bed like reading or gentle stretching."
      },
      {
        title: "Step 3: Optimize Your Environment",
        instruction: "Make your bedroom dark, quiet, and cool."
      },
      {
        title: "Step 4: Limit Screen Time",
        instruction: "Avoid screens at least 30 minutes before bed."
      }
    ]
  }
];

const SelfHelpHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("stress");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [language, setLanguage] = useState<"en" | "ne">("en");
  const [completedExercises, setCompletedExercises] = useState<string[]>(["progressive-relaxation", "gratitude-journal"]);
  const [showMotivation, setShowMotivation] = useState(true);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Filter exercises based on selected category
  const filteredExercises = exercises.filter(ex => ex.category === selectedCategory);
  
  // Get recommendations based on completion history
  const recommendedExercises = getRecommendations(exercises, filteredExercises[0]?.id || "");

  // Calculate user progress
  const totalExercises = exercises.length;
  const completionPercentage = (completedExercises.length / totalExercises) * 100;
  
  // Handle category selection with horizontal scroll
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Scroll into view if needed
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Start exercise
  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCurrentStep(0);
    setCompleted(false);
  };

  // Navigate through exercise steps
  const goToNextStep = () => {
    if (selectedExercise && currentStep < selectedExercise.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
      // Add to completed exercises if not already there
      if (selectedExercise && !completedExercises.includes(selectedExercise.id)) {
        setCompletedExercises(prev => [...prev, selectedExercise.id]);
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Close modal
  const closeExercise = () => {
    setSelectedExercise(null);
    setCurrentStep(0);
    setCompleted(false);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "ne" : "en");
  };

  // Toggle favorite status
  const toggleFavorite = (exerciseId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening the exercise
    setFavorites(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  // Hide motivation message after delay
  useEffect(() => {
    if (showMotivation) {
      const timer = setTimeout(() => {
        setShowMotivation(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showMotivation]);

  // Reset motivation when changing categories
  useEffect(() => {
    setShowMotivation(true);
  }, [selectedCategory]);

  return (
    <Layout hideNav={false} pageTitle="">
      <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-24">
        {/* Enhanced Header with Back button */}
        <div className="pt-4 pb-2 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">{language === "en" ? "Back" : "पछाडि"}</span>
          </Link>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Help"
                  className="rounded-full h-10 w-10 bg-white shadow-sm border border-slate-200"
                >
                  <HelpCircle size={18} className="text-slate-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  {language === "en" 
                    ? "Choose an exercise to help manage stress, anxiety, or sleep." 
                    : "तनाव, चिन्ता वा निद्रा व्यवस्थापन गर्न मद्दत गर्न एक अभ्यास चयन गर्नुहोस्।"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Welcome message with styling */}
        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            {language === "en" 
              ? "Welcome back! Ready to explore a new exercise?" 
              : "स्वागत छ! नयाँ अभ्यास अन्वेषण गर्न तयार?"}
          </h1>
        </div>

        {/* Category cards (horizontal scrollable) */}
        <div 
          className="overflow-x-auto pb-4 hide-scrollbar snap-x" 
          ref={cardsContainerRef}
        >
          <div className="flex gap-3 min-w-max px-1">
            {categories.map(category => (
              <motion.div
                key={category.id}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "rounded-lg border p-4 w-[145px] shadow-sm cursor-pointer transition-colors snap-start",
                  selectedCategory === category.id
                    ? "border-primary/40 bg-white shadow-md" 
                    : "border-slate-200 bg-white/80 hover:bg-white"
                )}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="flex flex-col items-center text-center gap-1">
                  <div className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center transition-colors mb-2",
                    selectedCategory === category.id
                      ? "bg-primary/20 text-primary" 
                      : "bg-slate-100 text-slate-700"
                  )}>
                    {category.icon}
                  </div>
                  <h3 className="font-bold">{language === "en" ? category.name : category.nameNepali}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === "en" ? category.description : category.descriptionNepali}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Motivational message - conditionally shown */}
        {showMotivation && completedExercises.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-3 mb-6 bg-primary/10 rounded-lg border border-primary/20"
          >
            <p className="text-slate-700 font-medium">
              {language === "en" ? "Great job! Let's keep going! ✨" : "राम्रो काम! जारी राखौं! ✨"}
            </p>
          </motion.div>
        )}

        {/* Featured Exercise */}
        {filteredExercises.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="overflow-hidden border-2 border-slate-200 shadow-md rounded-xl">
              <div className="p-5">
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    {filteredExercises[0].icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-slate-800 mb-1">
                        {filteredExercises[0].title}
                      </h2>
                      <button 
                        onClick={(e) => toggleFavorite(filteredExercises[0].id, e)}
                        className="text-amber-400 hover:text-amber-500 transition-colors"
                        aria-label={favorites.includes(filteredExercises[0].id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star 
                          size={20} 
                          fill={favorites.includes(filteredExercises[0].id) ? "currentColor" : "none"} 
                        />
                      </button>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {filteredExercises[0].description}
                    </p>
                    <Button 
                      onClick={() => startExercise(filteredExercises[0])}
                      className="rounded-full bg-teal-500 hover:bg-teal-600 text-white shadow-sm hover:shadow transition-all px-6"
                    >
                      {language === "en" ? "Start" : "सुरु गर्नुहोस्"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recommended for You section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-3">
            {language === "en" ? "Recommended for You" : "तपाईंको लागि सिफारिस गरिएको"}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recommendedExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
              >
                <Card 
                  className="overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => startExercise(exercise)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        {exercise.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-sm">
                            {exercise.title}
                          </h3>
                          <button 
                            onClick={(e) => toggleFavorite(exercise.id, e)}
                            className="text-amber-400 hover:text-amber-500 transition-colors"
                            aria-label={favorites.includes(exercise.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Star 
                              size={16} 
                              fill={favorites.includes(exercise.id) ? "currentColor" : "none"} 
                            />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500">
                          {exercise.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">
              {language === "en" 
                ? `You've completed ${completedExercises.length} of ${totalExercises} exercises` 
                : `तपाईंले ${totalExercises} मध्ये ${completedExercises.length} अभ्यासहरू पूरा गर्नुभयो`}
            </span>
            <span className="text-sm font-bold text-primary">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-in-out" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Language toggle button */}
        <div className="fixed bottom-20 right-4 z-10">
          <Button 
            onClick={toggleLanguage} 
            className="rounded-full shadow-md bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            variant="outline"
            size="sm"
          >
            <Globe size={16} className="mr-1" />
            {language === "en" ? "नेपाली" : "English"}
          </Button>
        </div>

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-xl"
            >
              {/* Modal header */}
              <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                <h2 className="font-bold text-lg">{selectedExercise.title}</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeExercise}
                  aria-label="Close"
                  className="rounded-full hover:bg-slate-100"
                >
                  <X size={20} />
                </Button>
              </div>

              {!completed ? (
                <div className="p-6">
                  {/* Progress indicator */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-500 mb-2">
                      <span>
                        {language === "en" 
                          ? `Step ${currentStep + 1} of ${selectedExercise.steps.length}` 
                          : `चरण ${currentStep + 1} को ${selectedExercise.steps.length}`}
                      </span>
                      <span className="font-medium">
                        {Math.round(((currentStep + 1) / selectedExercise.steps.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500 ease-in-out" 
                        style={{ width: `${((currentStep + 1) / selectedExercise.steps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Step content with animation */}
                  <motion.div 
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 bg-slate-50 p-5 rounded-xl border border-slate-100"
                  >
                    <h3 className="font-medium text-lg mb-3 text-slate-800">
                      {selectedExercise.steps[currentStep].title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedExercise.steps[currentStep].instruction}
                    </p>
                  </motion.div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={goToPrevStep}
                      disabled={currentStep === 0}
                      className="flex items-center rounded-full px-5 shadow-sm"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      {language === "en" ? "Back" : "पछाडि"}
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      className="flex items-center rounded-full px-5 bg-teal-500 hover:bg-teal-600 text-white shadow-sm"
                    >
                      {currentStep === selectedExercise.steps.length - 1 
                        ? (language === "en" ? "Finish" : "समाप्त") 
                        : (language === "en" ? "Next" : "अर्को")}
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="py-8 flex flex-col items-center"
                  >
                    <div className="rounded-full bg-green-100 p-4 mb-4">
                      <CheckCircle className="text-green-500 h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">
                      {language === "en" ? "Great job!" : "उत्तम काम!"}
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {language === "en" 
                        ? "You've completed this exercise. How do you feel now?" 
                        : "तपाईंले यो अभ्यास पूरा गर्नुभयो। अब तपाईं कस्तो महसुस गर्नुहुन्छ?"}
                    </p>
                    <div className="flex flex-col space-y-3 w-full">
                      <Button 
                        onClick={closeExercise}
                        className="rounded-xl shadow-sm"
                      >
                        {language === "en" ? "Return to Hub" : "हबमा फर्कनुहोस्"}
                      </Button>
                      <Button 
                        variant="outline" 
                        asChild
                        className="rounded-xl shadow-sm"
                      >
                        <Link to="/mood">
                          {language === "en" ? "Log My Mood" : "मेरो मुड लग गर्नुहोस्"}
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        )}
        
        {/* Custom styles for animations */}
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @keyframes gentle-pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.03); }
            }
            .pulse-animation {
              animation: gentle-pulse 2s infinite ease-in-out;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default SelfHelpHub;
