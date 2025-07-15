
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Calculator, Star, History, Search, X, 
  ChevronUp, Heart, Zap, TrendingUp, Sparkles,
  Bookmark, Clock, Target, Award, Users, Shield
} from 'lucide-react';
import { Link } from 'wouter';

interface QuickAction {
  icon: any;
  label: string;
  href: string;
  color: string;
  gradient: string;
  isHot?: boolean;
  isPro?: boolean;
  count?: number;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    { 
      icon: Calculator, 
      label: 'Scientific Calculator', 
      href: '/calculator/scientific',
      color: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-blue-400 to-blue-600',
      count: 156,
      isPro: true
    },
    { 
      icon: TrendingUp, 
      label: 'Top Trending', 
      href: '/categories/finance',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      gradient: 'from-emerald-400 to-teal-600',
      isHot: true,
      count: 2.3
    },
    { 
      icon: Star, 
      label: 'My Favorites', 
      href: '/favorites',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      gradient: 'from-yellow-400 to-orange-500',
      count: 12
    },
    { 
      icon: History, 
      label: 'Recent History', 
      href: '/history',
      color: 'bg-purple-500 hover:bg-purple-600',
      gradient: 'from-purple-400 to-indigo-600',
      count: 8
    },
    { 
      icon: Search, 
      label: 'Smart Search', 
      href: '/search',
      color: 'bg-gray-600 hover:bg-gray-700',
      gradient: 'from-gray-500 to-slate-700'
    },
    { 
      icon: Bookmark, 
      label: 'Quick Saves', 
      href: '/bookmarks',
      color: 'bg-rose-500 hover:bg-rose-600',
      gradient: 'from-rose-400 to-pink-600',
      count: 5
    }
  ];

  // Create floating particles animation
  useEffect(() => {
    const createParticle = (): FloatingParticle => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2
    });

    const generateParticles = () => {
      setParticles(Array.from({ length: 8 }, createParticle));
    };

    generateParticles();
    const interval = setInterval(generateParticles, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY <= lastScrollY;
      const isNearTop = currentScrollY < 100;
      
      setIsVisible(isScrollingUp || isNearTop);
      setLastScrollY(currentScrollY);

      // Add pulse animation on scroll events
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleFAB = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 300);
    }
  };

  const handleActionHover = (label: string) => {
    setActiveAction(label);
  };

  const handleActionLeave = () => {
    setActiveAction(null);
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
      }`}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float-up ${4 + particle.speed}s linear infinite`
            }}
          />
        ))}
      </div>

      {/* Quick Actions with enhanced animations */}
      <div className={`flex flex-col gap-4 mb-6 transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => (
          <div 
            key={action.label}
            className={`transition-all duration-300 transform ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 80}ms`
            }}
            onMouseEnter={() => handleActionHover(action.label)}
            onMouseLeave={handleActionLeave}
          >
            <Link href={action.href}>
              <Button
                size="icon"
                className={`
                  relative w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} 
                  text-white shadow-xl hover:shadow-2xl transition-all duration-300 
                  hover:scale-110 hover:-rotate-3 active:scale-95 group
                  border border-white/20 backdrop-blur-sm
                  ${activeAction === action.label ? 'scale-110 -rotate-3' : ''}
                  ${pulseAnimation ? 'animate-pulse' : ''}
                `}
                onClick={() => setIsOpen(false)}
              >
                <action.icon className="h-6 w-6 transition-all duration-300 group-hover:scale-110" />

                {/* Enhanced badges */}
                {action.isHot && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 animate-pulse shadow-lg">
                    🔥 HOT
                  </Badge>
                )}
                
                {action.isPro && (
                  <Badge className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-2 py-1 shadow-lg">
                    ⭐ PRO
                  </Badge>
                )}

                {action.count && (
                  <Badge className="absolute -bottom-2 -right-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    {typeof action.count === 'number' && action.count > 1000 
                      ? `${(action.count / 1000).toFixed(1)}K` 
                      : action.count}
                  </Badge>
                )}

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Enhanced tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl border border-white/10 backdrop-blur-sm">
                  <div className="font-medium">{action.label}</div>
                  {action.count && (
                    <div className="text-xs text-gray-300 mt-1">
                      {action.isHot ? `${action.count}K views` : `${action.count} items`}
                    </div>
                  )}
                  {/* Arrow */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
                </div>

                {/* Sparkle effect for hover */}
                {activeAction === action.label && (
                  <div className="absolute inset-0 pointer-events-none">
                    <Sparkles className="absolute top-0 right-0 w-4 h-4 text-yellow-300 animate-ping" />
                    <Sparkles className="absolute bottom-0 left-0 w-3 h-3 text-blue-300 animate-ping" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Enhanced scroll to top button */}
      {lastScrollY > 300 && (
        <div className="mb-4">
          <Button
            size="icon"
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20 backdrop-blur-sm group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      )}

      {/* Ultra-enhanced main FAB */}
      <Button
        size="icon"
        className={`
          relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 
          hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 text-white shadow-2xl 
          hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/30 
          backdrop-blur-sm overflow-hidden group
          ${isOpen ? 'rotate-45 scale-110' : 'rotate-0 scale-100'}
          ${pulseAnimation ? 'animate-pulse-glow' : ''}
        `}
        onClick={toggleFAB}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main icon with smooth rotation */}
        <div className={`relative z-10 transition-all duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Plus className="h-7 w-7" />
          )}
        </div>

        {/* Enhanced notification badges */}
        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg animate-bounce">
          <Zap className="h-3 w-3" />
        </Badge>

        <Badge className="absolute -bottom-2 -left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 shadow-lg">
          NEW
        </Badge>

        {/* Orbiting elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-orbit opacity-60" />
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60" 
            style={{ animation: 'orbit 4s linear infinite reverse' }}
          />
        </div>

        {/* Ripple effect on click */}
        <div className={`absolute inset-0 rounded-2xl bg-white/30 transition-all duration-300 ${
          isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-0'
        }`} />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      {/* Enhanced background overlay with blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/30 via-purple-900/20 to-blue-900/30 backdrop-blur-md -z-10 transition-all duration-500"
          onClick={toggleFAB}
        />
      )}

      {/* Floating action indicator */}
      {isOpen && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-xl text-sm shadow-xl border border-white/10 backdrop-blur-sm animate-slide-in-up">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="font-medium">Quick Actions</span>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
}
