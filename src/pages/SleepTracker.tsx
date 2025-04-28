
import { useState } from "react";
import { Moon, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format, subDays } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Layout from "@/components/Layout";
import { toast } from "sonner";

// Example data
const generateSampleData = () => {
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    result.push({
      date: format(date, "EEE"),
      hours: 5 + Math.floor(Math.random() * 4),
    });
  }
  return result;
};

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepData] = useState(generateSampleData());

  const incrementHours = () => {
    if (sleepHours < 12) setSleepHours(sleepHours + 0.5);
  };

  const decrementHours = () => {
    if (sleepHours > 0) setSleepHours(sleepHours - 0.5);
  };

  const handleSave = () => {
    toast.success(`Saved ${sleepHours} hours of sleep for today`);
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-header">
          निद्रा ट्र्याकर<br />
          <span className="text-base font-normal">(Sleep Tracker)</span>
        </h1>
        
        <Card className="p-6 mb-6 max-w-md mx-auto bg-white">
          <h2 className="text-lg font-medium mb-4">How much did you sleep last night?</h2>
          
          <div className="flex items-center justify-center mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={decrementHours}
              disabled={sleepHours <= 0}
              className="rounded-full"
            >
              <Minus size={16} />
            </Button>
            
            <div className="flex items-center mx-4">
              <Moon className="text-primary mr-3" size={24} />
              <span className="text-3xl font-bold">{sleepHours}</span>
              <span className="ml-1 text-slate-500">hours</span>
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={incrementHours}
              disabled={sleepHours >= 12}
              className="rounded-full"
            >
              <Plus size={16} />
            </Button>
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Save Today's Sleep
          </Button>
        </Card>
        
        <Card className="p-4 pt-6 max-w-md mx-auto bg-white">
          <h2 className="text-lg font-medium mb-4 px-2">Your Sleep Pattern</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sleepData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 12]} ticks={[0, 4, 8, 12]} />
              <Tooltip />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 text-center text-sm text-slate-600">
            <p>Your average: 7.2 hours</p>
            <p className="mt-1">Recommended: 7-9 hours</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default SleepTracker;
