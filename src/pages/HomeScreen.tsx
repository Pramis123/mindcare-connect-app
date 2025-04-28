import { Link } from "react-router-dom";
import { MessageCircle, Heart, AlertTriangle, Leaf, Moon, User } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HomeScreen = () => {
  return (
    <Layout>
      <div className="page-container">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-800 bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">मन स्वास्थ्य सहायक</h1>
          <p className="text-lg text-slate-600">Mental Health Helper</p>
        </header>
        
        <div className="space-y-4 max-w-md mx-auto">
          <FeatureCard 
            to="/chatbot"
            icon={<MessageCircle className="text-primary" size={28} />}
            title="Talk to AI Assistant"
            description="Share your thoughts and get support"
          />
          
          <FeatureCard 
            to="/mood"
            icon={<Heart className="text-primary" size={28} />}
            title="Log Your Mood"
            description="Track how you're feeling today"
          />
          
          <FeatureCard 
            to="/self-help"
            icon={<Leaf className="text-primary" size={28} />}
            title="Self-Help Tools"
            description="Exercises to feel better"
          />
          
          <FeatureCard 
            to="/sleep"
            icon={<Moon className="text-primary" size={28} />}
            title="Sleep Tracker"
            description="Monitor your sleep patterns"
          />

          <FeatureCard 
            to="/profile"
            icon={<User className="text-primary" size={28} />}
            title="Your Profile"
            description="Manage your account"
          />
        </div>
        
        <Link to="/crisis" className="block max-w-md mx-auto mt-8">
          <Button variant="destructive" className="w-full btn-large">
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
    <Card className="p-4 flex items-center bg-white hover:bg-primary/10 transition-all duration-200 border-2 border-transparent hover:border-primary/20">
      <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h2 className="font-semibold text-lg text-slate-800">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </Card>
  </Link>
);

export default HomeScreen;
