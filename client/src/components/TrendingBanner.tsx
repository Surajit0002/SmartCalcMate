import { useState, useEffect } from 'react';
import { X, TrendingUp, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TrendingBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTrend, setCurrentTrend] = useState(0);

  const trends = [
    {
      title: "🔥 EMI Calculator going viral!",
      description: "500K+ calculations in the last 24 hours",
      action: "Try Now",
      link: "/calculator/emi"
    },
    {
      title: "⭐ #1 Calculator Hub trending!",
      description: "Featured on ProductHunt today",
      action: "See More",
      link: "/categories"
    },
    {
      title: "🚀 2.5M users joined this month!",
      description: "Join the fastest growing calculator community",
      action: "Join Now",
      link: "/profile"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrend((prev) => (prev + 1) % trends.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const trend = trends[currentTrend];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white px-4 py-2 shadow-lg animate-pulse">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 animate-bounce" />
            <Badge className="bg-white text-red-600 font-bold text-xs">
              TRENDING
            </Badge>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-sm">{trend.title}</span>
            <span className="text-xs ml-2 opacity-90">{trend.description}</span>
          </div>
          <div className="sm:hidden">
            <span className="font-bold text-xs">{trend.title.slice(0, 30)}...</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 text-xs font-bold px-3 py-1"
            onClick={() => window.location.href = trend.link}
          >
            {trend.action}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-1"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}