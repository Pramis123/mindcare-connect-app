import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-background/90 flex flex-col items-center justify-center z-50">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="mt-4 text-lg text-slate-700">{message}</p>
    </div>
  );
}

export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />;
}

export function LoadingButton() {
  return (
    <div className="inline-flex items-center justify-center">
      <Loader2 className="h-4 w-4 text-primary animate-spin mr-2" />
      <span>Loading...</span>
    </div>
  );
} 