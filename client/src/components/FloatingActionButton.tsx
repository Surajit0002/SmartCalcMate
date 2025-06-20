
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Calculator, 
  Star, 
  Clock, 
  Bookmark,
  Share2,
  Download,
  Settings,
  Zap,
  TrendingUp,
  History,
  Heart,
  Search,
  ChevronUp,
  X
} from 'lucide-react';
import { Link } from 'wouter';
import { useI18n } from '@/hooks/useI18n';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const { t } = useI18n();

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Pulse animation every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { 
      icon: Calculator, 
      label: 'Quick Calc', 
      href: '/calculator/scientific', 
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Scientific Calculator'
    },
    { 
      icon: TrendingUp, 
      label: 'Trending', 
      href: '/categories/finance', 
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'Popular Calculators'
    },
    { 
      icon: Star, 
      label: 'Favorites', 
      href: '/favorites', 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Your Favorites'
    },
    { 
      icon: History, 
      label: 'History', 
      href: '/history', 
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Recent Calculations'
    },
    { 
      icon: Search, 
      label: 'Search', 
      href: '/search', 
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Find Calculators'
    },
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      {/* Quick Action Buttons */}
      <div className={`flex flex-col-reverse space-y-reverse space-y-3 mb-4 transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => (
          <div key={action.label} className="relative group">
            <Link href={action.href}>
              <Button
                size="icon"
                className={`w-12 h-12 rounded-full shadow-lg ${action.color} text-white transition-all duration-300 hover:scale-110 hover:shadow-xl animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                <action.icon className="h-5 w-5 relative z-10" />
              </Button>
            </Link>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
              <div className="font-semibold">{action.label}</div>
              <div className="text-xs opacity-80">{action.description}</div>
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-100 border-y-4 border-y-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top Button (appears when scrolled down) */}
      {lastScrollY > 300 && (
        <Button
          size="icon"
          className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-lg mb-3 transition-all duration-300 hover:scale-110"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}

      {/* Main FAB */}
      <div className="relative">
        <Button
          size="icon"
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 relative overflow-hidden group ${
            pulseCount > 0 ? 'animate-pulse' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-gradient-x" />
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white/30 scale-0 group-active:scale-100 transition-transform duration-200" />
          
          {/* Main icon */}
          <div className={`transition-all duration-500 ${isOpen ? 'rotate-135 scale-110' : 'rotate-0 scale-100'} relative z-10`}>
            {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
          </div>
          
          {/* Notification badge */}
          <div className="absolute -top-2 -right-2">
            <Badge variant="destructive" className="px-2 py-1 text-xs animate-bounce-subtle">
              <Zap className="h-3 w-3 mr-1" />
              New
            </Badge>
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-white/60 rounded-full animate-float-${i + 1}`}
                style={{
                  left: `${20 + i * 25}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </Button>

        {/* Expanding ring animation */}
        <div className={`absolute inset-0 rounded-full border-2 border-blue-400 transition-all duration-700 ${
          isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`} />
      </div>

      {/* Background overlay when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
