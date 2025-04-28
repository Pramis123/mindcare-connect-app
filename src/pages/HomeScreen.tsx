import { Link } from "react-router-dom";
import { MessageCircle, Heart, AlertTriangle, Leaf, Moon, User } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HomeScreen = () => {
  return (
    <Layout>
      <div className="page-container">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800 bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
            मन स्वास्थ्य सहायक
          </h1>
          <p className="text-lg text-slate-600">Mental Health Helper</p>
          <p className="text-base text-slate-600 mt-2 max-w-md mx-auto">
            Your personal companion for mental wellbeing, offering support whenever you need it.
          </p>
        </header>
        
        {/* Main Feature - Chatbot */}
        <div className="mb-8 max-w-md mx-auto">
          <Link to="/chatbot">
            <Card className="p-5 bg-primary/10 border-2 border-primary/30 hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-primary/30 flex items-center justify-center mr-4">
                  <MessageCircle className="text-primary" size={30} />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-slate-800">Talk to AI Assistant</h2>
                  <p className="text-base text-slate-600">Get immediate support and guidance anytime</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        {/* Feature Categories */}
        <div className="space-y-6 max-w-md mx-auto">
          {/* Self-Help Category */}
          <div>
            <h2 className="text-lg font-semibold mb-3 px-1">Track & Manage</h2>
            <div className="space-y-3">
              <FeatureCard 
                to="/mood"
                icon={<Heart className="text-primary" size={28} />}
                title="Log Your Mood"
                description="Track how you're feeling today"
              />
              
              <FeatureCard 
                to="/sleep"
                icon={<Moon className="text-primary" size={28} />}
                title="Sleep Tracker"
                description="Monitor your sleep patterns"
              />
            </div>
          </div>
          
          {/* Resources Category */}
          <div>
            <h2 className="text-lg font-semibold mb-3 px-1">Resources & Tools</h2>
            <div className="space-y-3">
              <FeatureCard 
                to="/self-help"
                icon={<Leaf className="text-primary" size={28} />}
                title="Self-Help Tools"
                description="Exercises to feel better"
              />
              
              <FeatureCard 
                to="/profile"
                icon={<User className="text-primary" size={28} />}
                title="Your Profile"
                description="Manage your account"
              />
            </div>
          </div>
        </div>
        
        <Link to="/crisis" className="block max-w-md mx-auto mt-8">
          <Button 
            variant="destructive" 
            className="w-full btn-large animate-scale"
            aria-label="Get urgent help for a mental health crisis"
          >
            <AlertTriangle className="mr-2" size={22} />
            Need Urgent Help?
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ to, icon, title, description }: FeatureCardProps) => (
  <Link to={to}>
    <Card className="p-4 flex items-center bg-white hover:bg-primary/10 transition-all duration-200 border-2 border-transparent hover:border-primary/20 shadow-sm hover:shadow">
      <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mr-4 touch-target">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </Card>
  </Link>
);

export default HomeScreen;
