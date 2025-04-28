
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";

// Sample data
const moodData = [
  { name: "Happy", value: 8, color: "#4ade80" },  
  { name: "Calm", value: 12, color: "#60a5fa" }, 
  { name: "Neutral", value: 5, color: "#94a3b8" }, 
  { name: "Sad", value: 4, color: "#94a3b8" },     
  { name: "Anxious", value: 3, color: "#fb923c" }, 
  { name: "Angry", value: 2, color: "#f87171" },   
];

const sleepData = [
  { day: "Mon", hours: 6.5 },
  { day: "Tue", hours: 7 },
  { day: "Wed", hours: 6 },
  { day: "Thu", hours: 7.5 },
  { day: "Fri", hours: 8 },
  { day: "Sat", hours: 7 },
  { day: "Sun", hours: 6.5 },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-header">
          व्यक्तिगत डाश्बोर्ड<br />
          <span className="text-base font-normal">(Your Dashboard)</span>
        </h1>
        
        <Tabs defaultValue="summary" className="max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <span className="block text-3xl font-bold text-primary">34</span>
                  <span className="text-sm text-slate-500">Days using the app</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="block text-xl font-semibold">24</span>
                    <span className="text-xs text-slate-500">Mood logs</span>
                  </div>
                  <div>
                    <span className="block text-xl font-semibold">12</span>
                    <span className="text-xs text-slate-500">Chat sessions</span>
                  </div>
                  <div>
                    <span className="block text-xl font-semibold">8</span>
                    <span className="text-xs text-slate-500">Exercises</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Moods</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center py-4">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={moodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {moodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mood" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={moodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {moodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={sleepData}
                    margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
                  >
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 12]} ticks={[0, 4, 8, 12]} />
                    <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center text-sm text-slate-600">
                  <p>Average: 7 hours per night</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
