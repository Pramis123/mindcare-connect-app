
import { useState } from "react";
import { Leaf, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";

interface Exercise {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

const exercises: Exercise[] = [
  {
    id: "breathing",
    title: "Deep Breathing",
    description: "A simple technique to help you relax and reduce anxiety.",
    steps: [
      "Find a comfortable position sitting or lying down.",
      "Place one hand on your chest and the other on your stomach.",
      "Breathe in slowly through your nose for 4 seconds.",
      "Hold your breath for 2 seconds.",
      "Exhale slowly through your mouth for 6 seconds.",
      "Repeat 5-10 times."
    ]
  },
  {
    id: "grounding",
    title: "5-4-3-2-1 Grounding",
    description: "This technique helps bring your attention to the present moment.",
    steps: [
      "Notice 5 things you can see.",
      "Notice 4 things you can touch or feel.",
      "Notice 3 things you can hear.",
      "Notice 2 things you can smell.",
      "Notice 1 thing you can taste."
    ]
  },
  {
    id: "gratitude",
    title: "Gratitude Practice",
    description: "Focus on positive aspects of your life to improve your mood.",
    steps: [
      "Think of 3 things you're grateful for today.",
      "They can be small things, like a good meal or nice weather.",
      "For each one, spend a moment appreciating why you're grateful for it.",
      "Try to feel the positive emotions associated with each item."
    ]
  },
  {
    id: "bodyscan",
    title: "Body Scan Relaxation",
    description: "A practice to release tension from your body.",
    steps: [
      "Lie down or sit comfortably with your eyes closed.",
      "Focus on your feet and notice any sensations.",
      "Gradually move your attention up through your body.",
      "For each body part, notice any tension and consciously relax it.",
      "Continue until you reach the top of your head."
    ]
  }
];

const SelfHelpHub = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-header">
          स्वयं-सहायता अभ्यासहरू<br />
          <span className="text-base font-normal">(Self-Help Exercises)</span>
        </h1>
        
        <div className="space-y-4 max-w-md mx-auto">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="overflow-hidden">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-4 text-left h-auto"
                onClick={() => toggleExpanded(exercise.id)}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Leaf className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{exercise.title}</h3>
                    {expandedId !== exercise.id && (
                      <p className="text-sm text-slate-600 line-clamp-1">{exercise.description}</p>
                    )}
                  </div>
                </div>
                {expandedId === exercise.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
              
              {expandedId === exercise.id && (
                <div className="p-4 pt-0">
                  <Separator className="my-3" />
                  <p className="mb-3 text-slate-700">{exercise.description}</p>
                  <h4 className="font-medium mb-2">How to practice:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    {exercise.steps.map((step, index) => (
                      <li key={index} className="text-slate-700">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SelfHelpHub;
