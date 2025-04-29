import { useState, useEffect } from "react";
import { ChevronLeft, HelpCircle, Brain, Cloud, Moon, Heart, Flower, ChevronRight, X, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
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

// Types for our data structure
interface Exercise {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
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
}

const categories: Category[] = [
  {
    id: "anxiety",
    name: "Anxiety",
    nameNepali: "चिन्ता",
    icon: <Brain size={20} />
  },
  {
    id: "stress",
    name: "Stress",
    nameNepali: "तनाव",
    icon: <Cloud size={20} />
  },
  {
    id: "sleep",
    name: "Sleep",
    nameNepali: "निद्रा",
    icon: <Moon size={20} />
  },
  {
    id: "confidence",
    name: "Confidence",
    nameNepali: "आत्मविश्वास",
    icon: <Heart size={20} />
  },
  {
    id: "mindfulness",
    name: "Mindfulness",
    nameNepali: "सचेतना",
    icon: <Flower size={20} />
  }
];

const exercises: Exercise[] = [
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    description: "Calm your mind in 2 minutes",
    icon: <Cloud size={24} />,
    category: "anxiety",
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
    id: "body-scan",
    title: "Body Scan Meditation",
    description: "Become aware of sensations in your body",
    icon: <Flower size={24} />,
    category: "mindfulness",
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
    id: "sleep-routine",
    title: "Bedtime Routine",
    description: "Prepare your mind and body for rest",
    icon: <Moon size={24} />,
    category: "sleep",
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
  const [selectedCategory, setSelectedCategory] = useState<string>("anxiety");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loadedExercises, setLoadedExercises] = useState(3); // Start with 3 exercises
  const [language, setLanguage] = useState<"en" | "ne">("en");

  // Filter exercises based on selected category
  const filteredExercises = exercises.filter(ex => ex.category === selectedCategory);
  
  // Display exercises with lazy loading
  const visibleExercises = filteredExercises.slice(0, loadedExercises);

  // Handle lazy loading as user scrolls
  const loadMoreExercises = () => {
    if (loadedExercises < filteredExercises.length) {
      setLoadedExercises(prev => prev + 2);
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

  // Implement scroll listener for lazy loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreExercises();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadedExercises]);

  return (
    <Layout pageTitle={language === "en" ? "Self-Help Exercises" : "स्वयं-सहायता अभ्यासहरू"}>
      <div className="relative max-w-md mx-auto pb-16">
        {/* Header - Back button and help icon */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm">
          <Link to="/" className="flex items-center text-slate-700">
            <ChevronLeft size={24} />
            <span className="ml-1">{language === "en" ? "Back" : "पछाडि"}</span>
          </Link>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Help">
                  <HelpCircle size={20} />
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

        {/* Welcome message */}
        <div className="px-4 py-2">
          <p className="text-lg text-slate-700">
            {language === "en" ? "Ready to try something new?" : "केही नयाँ कोशिश गर्न तयार हुनुहुन्छ?"}
          </p>
        </div>

        {/* Category tabs */}
        <div className="relative mb-4 border-b overflow-x-auto hide-scrollbar">
          <div className="flex px-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "flex items-center space-x-1 px-4 py-3 min-w-[80px] text-sm transition-colors",
                  selectedCategory === category.id 
                    ? "text-primary border-b-2 border-primary font-medium" 
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <span>{category.icon}</span>
                <span>{language === "en" ? category.name : category.nameNepali}</span>
              </button>
            ))}
          </div>
          {/* Fade effect on edges to hint scrollability */}
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Exercise cards */}
        <div className="space-y-3 px-4">
          {visibleExercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    {exercise.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base">
                      {exercise.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {exercise.description}
                    </p>
                  </div>
                </div>
                <Button 
                  className="min-h-[36px] px-4 bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={() => startExercise(exercise)}
                >
                  {language === "en" ? "Start" : "सुरु"}
                </Button>
              </div>
            </Card>
          ))}
          
          {/* Progress reminder at bottom */}
          <div className="text-center py-6 text-sm text-slate-600">
            {language === "en" 
              ? "You've completed 2 of 5 exercises today!" 
              : "तपाईंले आज ५ मध्ये २ अभ्यासहरू पूरा गर्नुभयो!"}
            <p className="mt-2 text-sm italic text-slate-500">
              {language === "en" 
                ? "One step forward, good journey!" 
                : "एक कदम अघि, राम्रो यात्रा!"}
            </p>
          </div>
        </div>

        {/* Language toggle button */}
        <div className="fixed bottom-20 right-4 z-10">
          <Button 
            onClick={toggleLanguage} 
            className="rounded-full shadow-md"
            variant="outline"
          >
            {language === "en" ? "नेपाली" : "English"}
          </Button>
        </div>

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              {/* Modal header */}
              <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                <h2 className="font-bold text-lg">{selectedExercise.title}</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeExercise}
                  aria-label="Close"
                >
                  <X size={20} />
                </Button>
              </div>

              {!completed ? (
                <div className="p-6">
                  {/* Progress indicator */}
                  <div className="flex justify-between text-sm text-slate-500 mb-6">
                    <span>
                      {language === "en" 
                        ? `Step ${currentStep + 1} of ${selectedExercise.steps.length}` 
                        : `चरण ${currentStep + 1} को ${selectedExercise.steps.length}`}
                    </span>
                    <progress 
                      value={currentStep + 1} 
                      max={selectedExercise.steps.length}
                      className="w-1/2"
                    />
                  </div>

                  {/* Step content */}
                  <div className="mb-8">
                    <h3 className="font-medium text-lg mb-2">
                      {selectedExercise.steps[currentStep].title}
                    </h3>
                    <p className="text-slate-700">
                      {selectedExercise.steps[currentStep].instruction}
                    </p>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={goToPrevStep}
                      disabled={currentStep === 0}
                      className="flex items-center"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      {language === "en" ? "Back" : "पछाडि"}
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      className="flex items-center"
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
                  <div className="py-8 flex flex-col items-center">
                    <CheckCircle className="text-green-500 h-16 w-16 mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      {language === "en" ? "Great job!" : "उत्तम काम!"}
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {language === "en" 
                        ? "You've completed this exercise." 
                        : "तपाईंले यो अभ्यास पूरा गर्नुभयो।"}
                    </p>
                    <div className="flex flex-col space-y-3 w-full">
                      <Button onClick={closeExercise}>
                        {language === "en" ? "Return to Hub" : "हबमा फर्कनुहोस्"}
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/mood">
                          {language === "en" ? "Log Mood" : "मुड लग गर्नुहोस्"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Offline Banner (shown conditionally) */}
        {false && (
          <div className="fixed bottom-24 inset-x-0 bg-amber-50 border-t border-amber-200 p-3 text-center">
            <p className="text-amber-800 text-sm">
              {language === "en" 
                ? "Offline – you can still view saved exercises." 
                : "अफलाइन - तपाईं अझै पनि सुरक्षित अभ्यासहरू हेर्न सक्नुहुन्छ।"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SelfHelpHub;
