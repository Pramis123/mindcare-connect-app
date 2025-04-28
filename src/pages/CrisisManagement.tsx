import { useState } from "react";
import { Phone, MessageSquare, ArrowLeft, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const CrisisManagement = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<string>("");

  const handleCallRequest = (number: string) => {
    setSelectedNumber(number);
    setShowConfirmation(true);
  };

  const handleCallConfirm = () => {
    window.location.href = `tel:${selectedNumber}`;
    setShowConfirmation(false);
  };

  const emergencyNumbers = [
    { name: "Mental Health Helpline", number: "1166", primary: true },
    { name: "Police Emergency", number: "100" },
    { name: "Ambulance", number: "102" },
  ];

  return (
    <Layout hideCrisisButton hideNav>
      <div className="page-container bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-destructive mb-2">तत्काल सहायता चाहिन्छ?</h1>
            <p className="text-lg text-slate-700">Need urgent help?</p>
          </div>
          
          <Alert variant="warning" className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              If you're experiencing a life-threatening emergency, please call emergency services immediately.
            </AlertDescription>
          </Alert>
          
          <Card className="bg-white p-6 mb-4 shadow-md border-l-4 border-l-destructive">
            {showConfirmation ? (
              <div className="text-center space-y-4">
                <h2 className="font-bold text-lg">Call {selectedNumber}?</h2>
                <p>You're about to call the {emergencyNumbers.find(e => e.number === selectedNumber)?.name}</p>
                <div className="flex justify-center gap-3 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleCallConfirm}
                    className="flex-1"
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button 
                  variant="destructive" 
                  onClick={() => handleCallRequest("1166")} 
                  className="w-full py-8 text-xl mb-4 touch-target animate-scale"
                  aria-label="Call Mental Health Helpline at 1166"
                >
                  <Phone className="mr-3" size={24} />
                  Call Mental Health Helpline
                </Button>
                <p className="text-center text-sm">
                  Toll-free number: <strong>1166</strong>
                </p>
              </>
            )}
          </Card>
          
          <Card className="bg-white p-6 mb-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-3" id="crisis-resources">Other Crisis Resources</h2>
            <div className="space-y-4" aria-labelledby="crisis-resources">
              {emergencyNumbers.filter(item => !item.primary).map((item) => (
                <div key={item.number} className="flex items-start">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 rounded-full mr-3 touch-target"
                    onClick={() => handleCallRequest(item.number)}
                    aria-label={`Call ${item.name} at ${item.number}`}
                  >
                    <Phone size={18} />
                  </Button>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-600">{item.number}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                  <MessageSquare className="text-slate-500" size={18} />
                </div>
                <div>
                  <p className="font-medium">Crisis Text Line</p>
                  <p className="text-sm text-slate-600">Text "TALK" to 1166</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-3">Remember</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>You are not alone</li>
              <li>This feeling will pass</li>
              <li>Help is available 24/7</li>
              <li>Your life matters</li>
              <li>Reaching out is a sign of strength, not weakness</li>
            </ul>
          </Card>
          
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="touch-target"
              aria-label="Return to previous page"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Safety
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrisisManagement;
