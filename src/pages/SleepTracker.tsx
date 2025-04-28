
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const SleepTracker = () => {
  const [selectedHours, setSelectedHours] = useState("7h");

  const handleContinue = () => {
    toast.success(`Saved ${selectedHours} of sleep for last night`);
    // Here you would navigate to the next screen
  };

  return (
    <Layout hideNav>
      <div className="max-w-md mx-auto bg-white min-h-screen px-6 py-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-medium">Sleep tracking</h1>
          <span className="text-slate-500">1 of 4</span>
        </header>

        {/* Main content */}
        <div className="text-center space-y-10">
          <h2 className="text-2xl font-bold">
            Hi Emily, how long did you sleep last night?
          </h2>
          
          {/* Emoji feedback */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-yellow-100 rounded-full opacity-30"></div>
              <div className="absolute inset-3 bg-yellow-300 rounded-full flex items-center justify-center">
                <div className="text-5xl">🙂</div>
              </div>
            </div>
            <div className="mt-5 space-y-1">
              <h3 className="text-lg font-semibold">Your sleep was good!</h3>
              <p className="text-slate-700">Aim for 8+ hours of sleep for the best rest.</p>
            </div>
          </div>
          
          {/* Hours selection */}
          <div>
            <RadioGroup 
              value={selectedHours} 
              onValueChange={setSelectedHours}
              className="flex justify-between mt-6 px-4"
            >
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="8h" 
                  className="text-2xl cursor-pointer"
                >
                  😍
                </Label>
                <RadioGroupItem 
                  value="8h" 
                  id="8h" 
                  className={`sr-only ${selectedHours === "8h" ? "peer-checked:border-primary" : ""}`}
                />
                <span className="text-sm text-slate-500">≥8h</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="7h" 
                  className="text-2xl cursor-pointer"
                >
                  🙂
                </Label>
                <RadioGroupItem 
                  value="7h" 
                  id="7h" 
                  className={`sr-only ${selectedHours === "7h" ? "peer-checked:border-primary" : ""}`}
                />
                <div className={`${selectedHours === "7h" ? "w-12 h-12 border-2 border-purple-500 rounded-full absolute -mt-10" : ""}`}></div>
                <span className="text-sm text-slate-500">7h</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="6h" 
                  className="text-2xl cursor-pointer"
                >
                  😐
                </Label>
                <RadioGroupItem 
                  value="6h" 
                  id="6h" 
                  className={`sr-only ${selectedHours === "6h" ? "peer-checked:border-primary" : ""}`}
                />
                <span className="text-sm text-slate-500">6h</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="5h" 
                  className="text-2xl cursor-pointer"
                >
                  😪
                </Label>
                <RadioGroupItem 
                  value="5h" 
                  id="5h" 
                  className={`sr-only ${selectedHours === "5h" ? "peer-checked:border-primary" : ""}`}
                />
                <span className="text-sm text-slate-500">5h</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="4h" 
                  className="text-2xl cursor-pointer"
                >
                  😡
                </Label>
                <RadioGroupItem 
                  value="4h" 
                  id="4h" 
                  className={`sr-only ${selectedHours === "4h" ? "peer-checked:border-primary" : ""}`}
                />
                <span className="text-sm text-slate-500">&lt;4h</span>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        {/* Continue button */}
        <div className="mt-16">
          <Button 
            onClick={handleContinue} 
            className="w-full py-6 text-lg rounded-full bg-purple-500 hover:bg-purple-600"
          >
            Continue
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SleepTracker;
