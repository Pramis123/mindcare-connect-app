import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Heart, AlertTriangle, Leaf, Moon, User, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const HomeScreen = () => {
  const [language, setLanguage] = useState<"en" | "ne">("en");
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "ne" : "en");
  };

  return (
    <Layout hideNav hideCrisisButton>
      <div className="page-container bg-gradient-to-b from-blue-50 to-white">
        {/* Language Toggle */}
        <div className="absolute top-4 right-4">
          <Button 
            onClick={toggleLanguage} 
            variant="outline" 
            className="flex items-center gap-1 rounded-full border-blue-200 hover:bg-blue-100 transition-all"
            aria-label={language === "en" ? "Switch to Nepali" : "Switch to English"}
          >
            <Globe size={16} />
            <span className="font-medium text-sm">{language === "en" ? "नेपाली" : "English"}</span>
          </Button>
        </div>

        {/* Header with Nepali and English text */}
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-800">
            {language === "en" ? "Mental Health Helper" : "मन स्वास्थ्य सहायक"}
          </h1>
          <p className="text-lg text-slate-700 mt-2 max-w-md mx-auto">
            {language === "en" ? "Hello! How can I help you today?" : "नमस्ते! म तपाईंलाई कसरी मद्दत गर्न सक्छु?"}
          </p>
        </header>
        
        {/* Main Feature - AI Assistant */}
        <div className="mb-8 max-w-md mx-auto">
          <Link to="/chatbot" className="block">
            <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-md hover:shadow-lg rounded-2xl">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mr-4 shadow-inner">
                  <MessageCircle className="text-blue-500" size={36} />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-2xl text-slate-800 mb-1">
                    {language === "en" ? "Talk to AI Assistant" : "AI सहायकसँग कुरा गर्नुहोस्"}
                  </h2>
                  <p className="text-base text-slate-600">
                    {language === "en" ? "Your companion for mental wellbeing, available anytime" : "मानसिक स्वास्थ्यको लागि तपाईंको साथी, जुनसुकै समयमा उपलब्ध"}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        {/* Feature Categories */}
        <div className="space-y-8 max-w-md mx-auto">
          {/* Track & Manage Category */}
          <section>
            <h2 className="text-xl font-bold mb-4 px-1 text-slate-800">
              {language === "en" ? "Track & Manage" : "ट्र्याक र व्यवस्थापन"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <FeatureCard 
                to="/mood"
                icon={<Heart className="text-pink-500" size={32} />}
                iconBg="bg-pink-100"
                title={language === "en" ? "Log Your Mood" : "तपाईंको मुड लग गर्नुहोस्"}
                description={language === "en" ? "Track how you're feeling today 😊" : "आज तपाईं कस्तो महसुस गर्दै हुनुहुन्छ ट्र्याक गर्नुहोस् 😊"}
              />
              
              <FeatureCard 
                to="/sleep"
                icon={<Moon className="text-indigo-500" size={32} />}
                iconBg="bg-indigo-100"
                title={language === "en" ? "Sleep Tracker" : "निद्रा ट्र्याकर"}
                description={language === "en" ? "Keep an eye on your sleep patterns" : "तपाईंको निद्रा प्याटर्नमा नजर राख्नुहोस्"}
              />
            </div>
          </section>
          
          {/* Resources Category */}
          <section>
            <h2 className="text-xl font-bold mb-4 px-1 text-slate-800">
              {language === "en" ? "Resources & Tools" : "स्रोतहरू र उपकरणहरू"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <FeatureCard 
                to="/self-help"
                icon={<Leaf className="text-green-500" size={32} />}
                iconBg="bg-green-100"
                title={language === "en" ? "Self-Help Tools" : "स्वयं-सहायता उपकरणहरू"}
                description={language === "en" ? "Exercises to feel better" : "राम्रो महसुस गर्न अभ्यासहरू"}
              />
              
              <FeatureCard 
                to="/profile"
                icon={<User className="text-slate-500" size={32} />}
                iconBg="bg-slate-100"
                title={language === "en" ? "Your Profile" : "तपाईंको प्रोफाइल"}
                description={language === "en" ? "Manage your account" : "तपाईंको खाता व्यवस्थापन गर्नुहोस्"}
              />
            </div>
          </section>
        </div>
        
        {/* Crisis Button - Fixed position */}
        <div className="fixed bottom-24 inset-x-0 px-4 py-2 z-20">
          <Link to="/crisis" className="block max-w-md mx-auto">
            <Button 
              variant="destructive" 
              className="w-full py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base font-bold"
              aria-label={language === "en" ? "Get urgent help for a mental health crisis" : "मानसिक स्वास्थ्य संकटको लागि तत्काल सहयोग प्राप्त गर्नुहोस्"}
            >
              <AlertTriangle className="mr-2" size={24} />
              {language === "en" ? "Need Urgent Help?" : "तत्काल सहायता चाहिन्छ?"}
            </Button>
          </Link>
        </div>

        {/* Custom Navigation Footer */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-4 shadow-lg z-10">
          <div className="max-w-md mx-auto flex justify-around">
            <NavLink 
              to="/" 
              icon={<Home size={24} />} 
              label={language === "en" ? "Home" : "होम"}
              isActive={location.pathname === "/"} 
            />
            <NavLink 
              to="/chatbot" 
              icon={<MessageCircle size={24} />} 
              label={language === "en" ? "Chat" : "च्याट"}
              isActive={location.pathname === "/chatbot"} 
            />
            <NavLink 
              to="/mood" 
              icon={<Heart size={24} />} 
              label={language === "en" ? "Mood" : "मूड"}
              isActive={location.pathname === "/mood"} 
            />
            <NavLink 
              to="/self-help" 
              icon={<Leaf size={24} />} 
              label={language === "en" ? "Help" : "मद्दत"}
              isActive={location.pathname === "/self-help"} 
            />
          </div>
        </nav>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  to: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

const FeatureCard = ({ to, icon, iconBg, title, description }: FeatureCardProps) => (
  <Link to={to}>
    <Card className="p-4 flex items-center bg-white hover:bg-blue-50/50 transition-all duration-200 border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow rounded-xl">
      <div className={cn("h-16 w-16 rounded-full flex items-center justify-center mr-4 touch-target", iconBg)}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </Card>
  </Link>
);

// Custom Home icon component
const Home = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink = ({ to, icon, label, isActive }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex flex-col items-center justify-center px-2 min-w-[60px]",
      isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
    )}
    aria-current={isActive ? "page" : undefined}
  >
    <div className="h-6 flex items-center justify-center">
      {icon}
    </div>
    <span className={cn(
      "text-xs mt-1",
      isActive ? "font-medium" : "font-normal"
    )}>
      {label}
    </span>
    {isActive && (
      <div className="h-1 w-6 bg-blue-600 rounded-full mt-1"></div>
    )}
  </Link>
);

export default HomeScreen;
