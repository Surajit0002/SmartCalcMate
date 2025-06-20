
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
  X,
  Sparkles,
  Flame,
  Target
} from 'lucide-react';
import { Link } from 'wouter';
import { useI18n } from '@/hooks/useI18n';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const [sparklePositions, setSparklePositions] = useState<Array<{x: number, y: number, delay: number}>>([]);
  const [isHovered, setIsHovered] = useState(false);
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

  // Pulse animation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Generate sparkle positions
  useEffect(() => {
    const generateSparkles = () => {
      const sparkles = Array.from({ length: 6 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.3
      }));
      setSparklePositions(sparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 4000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { 
      icon: Calculator, 
      label: 'Quick Calc', 
      href: '/calculator/scientific', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      description: 'Scientific Calculator',
      glow: 'shadow-blue-500/30'
    },
    { 
      icon: TrendingUp, 
      label: 'Trending', 
      href: '/categories/finance', 
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      description: 'Popular Calculators',
      glow: 'shadow-emerald-500/30'
    },
    { 
      icon: Star, 
      label: 'Favorites', 
      href: '/favorites', 
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      description: 'Your Favorites',
      glow: 'shadow-yellow-500/30'
    },
    { 
      icon: History, 
      label: 'History', 
      href: '/history', 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      description: 'Recent Calculations',
      glow: 'shadow-purple-500/30'
    },
    { 
      icon: Search, 
      label: 'Search', 
      href: '/search', 
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      description: 'Find Calculators',
      glow: 'shadow-indigo-500/30'
    },
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      {/* Quick Action Buttons */}
      <div className={`flex flex-col-reverse space-y-reverse space-y-3 mb-4 transition-all duration-500 ease-out ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => (
          <div 
            key={action.label} 
            className={`relative group transition-all duration-400 ease-out ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`
            }}
          >
            <Link href={action.href}>
              <Button
                size="icon"
                className={`w-12 h-12 rounded-full shadow-lg ${action.color} ${action.glow} text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-current/30 relative overflow-hidden group-hover:rotate-12`}
                onClick={() => setIsOpen(false)}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
                
                {/* Icon with bounce effect */}
                <action.icon className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                
                {/* Floating mini particles */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/80 rounded-full animate-bounce"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 15}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
              </Button>
            </Link>
            
            {/* Enhanced Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/90 dark:bg-gray-100/90 backdrop-blur-sm text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0 border border-white/10">
              <div className="font-semibold flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                {action.label}
              </div>
              <div className="text-xs opacity-80">{action.description}</div>
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-gray-900/90 dark:border-l-gray-100/90 border-y-4 border-y-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top Button (appears when scrolled down) */}
      {lastScrollY > 300 && (
        <Button
          size="icon"
          className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg mb-3 transition-all duration-300 hover:scale-110 hover:shadow-xl border border-white/10"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}

      {/* Main FAB */}
      <div className="relative">
        <Button
          size="icon"
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 relative overflow-hidden group border-2 border-white/20 ${
            pulseCount > 0 ? 'animate-pulse' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
              animation: isHovered ? 'spin 3s linear infinite' : 'none'
            }}
          />
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
          
          {/* Main icon with enhanced animation */}
          <div className={`transition-all duration-500 ${isOpen ? 'rotate-[135deg] scale-110' : 'rotate-0 scale-100'} relative z-10`}>
            {isOpen ? (
              <X className="h-6 w-6 transition-transform duration-300" />
            ) : (
              <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
            )}
          </div>
          
          {/* Enhanced notification badge */}
          <div className="absolute -top-2 -right-2">
            <Badge variant="destructive" className="px-2 py-1 text-xs shadow-lg border border-white/20 bg-gradient-to-r from-red-500 to-pink-500">
              <div className="flex items-center gap-1">
                <Flame className="h-3 w-3 animate-pulse" />
                <span>Hot</span>
              </div>
            </Badge>
          </div>

          {/* Dynamic sparkle particles */}
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            {sparklePositions.map((sparkle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/80 rounded-full animate-pulse"
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                  animationDelay: `${sparkle.delay}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>

          {/* Orbiting elements */}
          <div className="absolute inset-0 rounded-full pointer-events-none">
            {[0, 120, 240].map((rotation, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 opacity-50 ${isHovered ? 'animate-spin' : ''}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${rotation}deg) translateY(-32px) translateX(-4px)`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: isHovered ? '4s' : undefined
                }}
              >
                <div className="w-full h-full bg-white rounded-full opacity-60" />
              </div>
            ))}
          </div>
        </Button>

        {/* Expanding ring animation */}
        <div className={`absolute inset-0 rounded-full border-2 border-blue-400/50 transition-all duration-700 ${
          isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`} />
        
        {/* Secondary ring */}
        <div className={`absolute inset-0 rounded-full border border-purple-400/30 transition-all duration-1000 ${
          isOpen ? 'scale-200 opacity-0' : 'scale-100 opacity-50'
        }`} />
      </div>

      {/* Enhanced background overlay when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/20 via-blue-900/10 to-purple-900/20 backdrop-blur-sm -z-10 transition-all duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
