
import { Link } from "react-router-dom";
import { MessageCircle, Heart, AlertTriangle, Leaf, Moon } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HomeScreen = () => {
  return (
    <Layout>
      <div className="page-container">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">मन स्वास्थ्य सहायक</h1>
          <p className="text-slate-600">Mental Health Helper</p>
        </header>
        
        <div className="space-y-4 max-w-md mx-auto">
          <Link to="/chatbot">
            <Card className="p-4 flex items-center bg-white hover:bg-primary/10 transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <MessageCircle className="text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Talk to AI Assistant</h2>
                <p className="text-sm text-slate-600">Share your thoughts and get support</p>
              </div>
            </Card>
          </Link>
          
          <Link to="/mood">
            <Card className="p-4 flex items-center bg-white hover:bg-primary/10 transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Heart className="text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Log Your Mood</h2>
                <p className="text-sm text-slate-600">Track how you're feeling today</p>
              </div>
            </Card>
          </Link>
          
          <Link to="/self-help">
            <Card className="p-4 flex items-center bg-white hover:bg-primary/10 transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Leaf className="text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Self-Help Tools</h2>
                <p className="text-sm text-slate-600">Exercises to feel better</p>
              </div>
            </Card>
          </Link>
          
          <Link to="/sleep">
            <Card className="p-4 flex items-center bg-white hover:bg-primary/10 transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Moon className="text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Sleep Tracker</h2>
                <p className="text-sm text-slate-600">Monitor your sleep patterns</p>
              </div>
            </Card>
          </Link>
        </div>
        
        <Link to="/crisis" className="block max-w-md mx-auto mt-8">
          <Button variant="destructive" className="w-full btn-large">
            <AlertTriangle className="mr-2" size={20} />
            Need Urgent Help?
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default HomeScreen;
