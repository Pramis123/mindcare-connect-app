
import { User, Globe, Moon, Bell, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <User className="text-primary" size={40} />
            </div>
            <h1 className="text-xl font-bold">Namaste User</h1>
          </div>
          
          <Card className="mb-4">
            <div className="p-4">
              <h2 className="font-medium text-lg mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="mr-3 text-slate-500" size={20} />
                    <span>Language</span>
                  </div>
                  <Button variant="outline" size="sm">
                    English
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="mr-3 text-slate-500" size={20} />
                    <span>Dark Mode</span>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="mr-3 text-slate-500" size={20} />
                    <span>Notifications</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="mb-4">
            <div className="p-4">
              <h2 className="font-medium text-lg mb-4">Support</h2>
              
              <div className="space-y-4">
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="mr-3 text-slate-500" size={20} />
                  Help & Support
                </Button>
                
                <Separator />
                
                <Button variant="ghost" className="w-full justify-start">
                  <Globe className="mr-3 text-slate-500" size={20} />
                  About Us
                </Button>
                
                <Separator />
                
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  Sign Out
                </Button>
              </div>
            </div>
          </Card>
          
          <p className="text-center text-xs text-slate-500 mt-6">
            Version 1.0.0
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
