
import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const CrisisManagement = () => {
  const handleCall = () => {
    window.location.href = "tel:1166";
  };

  return (
    <Layout hideNav>
      <div className="page-container bg-background">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-destructive mb-2">तत्काल सहायता चाहिन्छ?</h1>
            <p className="text-slate-600">Need urgent help?</p>
          </div>
          
          <Card className="bg-white p-6 mb-4">
            <Button 
              variant="destructive" 
              onClick={handleCall} 
              className="w-full py-8 text-xl mb-4"
            >
              <Phone className="mr-3" size={24} />
              Call Mental Health Helpline
            </Button>
            <p className="text-center text-sm">
              Toll-free number: <strong>1166</strong>
            </p>
          </Card>
          
          <Card className="bg-white p-6 mb-4">
            <h2 className="font-semibold text-lg mb-3">Other Crisis Resources</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="mr-3 mt-1 text-slate-500" size={18} />
                <div>
                  <p className="font-medium">Police Emergency</p>
                  <p className="text-sm text-slate-600">100</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-3 mt-1 text-slate-500" size={18} />
                <div>
                  <p className="font-medium">Ambulance</p>
                  <p className="text-sm text-slate-600">102</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessageSquare className="mr-3 mt-1 text-slate-500" size={18} />
                <div>
                  <p className="font-medium">Crisis Text Line</p>
                  <p className="text-sm text-slate-600">Text "TALK" to 1166</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white p-6">
            <h2 className="font-semibold text-lg mb-3">Remember</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>You are not alone</li>
              <li>This feeling will pass</li>
              <li>Help is available</li>
              <li>Your life matters</li>
            </ul>
          </Card>
          
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrisisManagement;
