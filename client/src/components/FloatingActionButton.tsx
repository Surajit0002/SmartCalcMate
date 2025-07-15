
import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Calculator, Star, History, Search, X, 
  ChevronUp, Heart, Zap, TrendingUp, Sparkles,
  Bookmark, Clock, Target, Award, Users, Shield,
  Settings, Bell, Download, Share2, Filter,
  Lightbulb, Compass, Flame, Crown, Rocket,
  Activity, BarChart3, Layers, Lock, Eye
} from 'lucide-react';
import { Link } from 'wouter';

interface QuickAction {
  icon: any;
  label: string;
  href: string;
  color: string;
  gradient: string;
  category: 'primary' | 'secondary' | 'utility' | 'premium';
  isHot?: boolean;
  isPro?: boolean;
  isNew?: boolean;
  count?: number | string;
  badge?: string;
  description?: string;
  shortcut?: string;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
}

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<'all' | 'primary' | 'secondary' | 'utility' | 'premium'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    { 
      icon: Calculator, 
      label: 'Scientific Calculator', 
      href: '/calculator/scientific',
      color: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      category: 'primary',
      count: 156,
      isPro: true,
      description: 'Advanced calculations',
      shortcut: 'C'
    },
    { 
      icon: TrendingUp, 
      label: 'Top Trending', 
      href: '/categories/finance',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      gradient: 'from-emerald-400 via-teal-500 to-emerald-600',
      category: 'primary',
      isHot: true,
      count: '2.3K',
      description: 'Most popular tools',
      shortcut: 'T'
    },
    { 
      icon: Star, 
      label: 'My Favorites', 
      href: '/favorites',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      gradient: 'from-yellow-400 via-amber-500 to-orange-500',
      category: 'primary',
      count: 12,
      description: 'Your saved tools',
      shortcut: 'F'
    },
    { 
      icon: History, 
      label: 'Recent History', 
      href: '/history',
      color: 'bg-purple-500 hover:bg-purple-600',
      gradient: 'from-purple-400 via-violet-500 to-indigo-600',
      category: 'primary',
      count: 8,
      description: 'Past calculations',
      shortcut: 'H'
    },
    { 
      icon: Search, 
      label: 'Smart Search', 
      href: '/search',
      color: 'bg-gray-600 hover:bg-gray-700',
      gradient: 'from-gray-500 via-slate-600 to-gray-700',
      category: 'utility',
      description: 'Find any tool',
      shortcut: '/'
    },
    { 
      icon: Bookmark, 
      label: 'Quick Saves', 
      href: '/bookmarks',
      color: 'bg-rose-500 hover:bg-rose-600',
      gradient: 'from-rose-400 via-pink-500 to-rose-600',
      category: 'secondary',
      count: 5,
      description: 'Bookmarked items',
      shortcut: 'B'
    },
    { 
      icon: Activity, 
      label: 'Dashboard', 
      href: '/dashboard',
      color: 'bg-cyan-500 hover:bg-cyan-600',
      gradient: 'from-cyan-400 via-blue-500 to-cyan-600',
      category: 'secondary',
      isNew: true,
      description: 'Analytics overview',
      shortcut: 'D'
    },
    { 
      icon: Settings, 
      label: 'Preferences', 
      href: '/settings',
      color: 'bg-slate-500 hover:bg-slate-600',
      gradient: 'from-slate-400 via-gray-500 to-slate-600',
      category: 'utility',
      description: 'App configuration',
      shortcut: 'P'
    },
    { 
      icon: Crown, 
      label: 'Premium Tools', 
      href: '/premium',
      color: 'bg-amber-500 hover:bg-amber-600',
      gradient: 'from-amber-400 via-yellow-500 to-gold-600',
      category: 'premium',
      isPro: true,
      badge: 'PRO',
      description: 'Exclusive features',
      shortcut: 'Ctrl+P'
    },
    { 
      icon: Rocket, 
      label: 'AI Assistant', 
      href: '/ai-assistant',
      color: 'bg-violet-500 hover:bg-violet-600',
      gradient: 'from-violet-400 via-purple-500 to-violet-600',
      category: 'premium',
      isNew: true,
      isPro: true,
      badge: 'AI',
      description: 'Smart calculations',
      shortcut: 'Ctrl+A'
    }
  ];

  const achievements: Achievement[] = [
    { id: 'streak', title: '7 Day Streak!', description: 'Used app for 7 consecutive days', icon: Flame, unlocked: true },
    { id: 'explorer', title: 'Tool Explorer', description: 'Tried 10 different calculators', icon: Compass, unlocked: true, progress: 8 },
    { id: 'pro', title: 'Pro User', description: 'Upgraded to premium', icon: Crown, unlocked: false },
    { id: 'sharer', title: 'Community Sharer', description: 'Shared 5 calculations', icon: Share2, unlocked: false, progress: 3 }
  ];

  // Enhanced particle system
  const createParticle = useCallback((): FloatingParticle => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    speed: Math.random() * 0.8 + 0.3,
    opacity: Math.random() * 0.7 + 0.3,
    color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
  }), []);

  useEffect(() => {
    const generateParticles = () => {
      setParticles(Array.from({ length: 12 }, createParticle));
    };

    generateParticles();
    const interval = setInterval(generateParticles, 6000);
    return () => clearInterval(interval);
  }, [createParticle]);

  // Enhanced scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY <= lastScrollY;
      const isNearTop = currentScrollY < 100;
      
      setIsVisible(isScrollingUp || isNearTop);
      setLastScrollY(currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY) > 80) {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 800);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const action = quickActions.find(a => a.shortcut === `Ctrl+${e.key.toUpperCase()}`);
        if (action) {
          e.preventDefault();
          window.location.href = action.href;
        }
      } else if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen(true);
        setCurrentCategory('utility');
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleFAB = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 400);
    }
  };

  const handleLongPress = () => {
    setIsExpanded(true);
    setShowAchievements(true);
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleMouseDown = () => {
    const timer = setTimeout(handleLongPress, 800);
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const filteredActions = quickActions.filter(action => {
    const matchesCategory = currentCategory === 'all' || action.category === currentCategory;
    const matchesSearch = action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleActionClick = (action: QuickAction) => {
    setIsOpen(false);
    // Analytics tracking could go here
    console.log(`Action clicked: ${action.label}`);
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
      }`}
    >
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animation: `float-up ${5 + particle.speed}s linear infinite, sparkle 3s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Search Bar (when open) */}
      {isOpen && (
        <div className="mb-4 animate-slide-in-up">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-3 pr-10 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      {isOpen && (
        <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide animate-slide-in-up" style={{ animationDelay: '50ms' }}>
          {['all', 'primary', 'secondary', 'utility', 'premium'].map((category) => (
            <button
              key={category}
              onClick={() => setCurrentCategory(category as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                currentCategory === category
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className={`grid grid-cols-2 gap-4 mb-6 transition-all duration-700 ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-90 pointer-events-none'
      }`}>
        {filteredActions.map((action, index) => (
          <div 
            key={action.label}
            className={`transition-all duration-500 transform ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`
            }}
            onMouseEnter={() => setActiveAction(action.label)}
            onMouseLeave={() => setActiveAction(null)}
          >
            <Link href={action.href}>
              <Button
                size="icon"
                className={`
                  relative w-16 h-16 rounded-2xl bg-gradient-to-br ${action.gradient} 
                  text-white shadow-xl hover:shadow-2xl transition-all duration-400 
                  hover:scale-110 hover:-rotate-2 active:scale-95 group
                  border border-white/30 backdrop-blur-sm overflow-hidden
                  ${activeAction === action.label ? 'scale-110 -rotate-2 shadow-2xl' : ''}
                  ${pulseAnimation ? 'animate-pulse-glow' : ''}
                `}
                onClick={() => handleActionClick(action)}
              >
                <action.icon className="h-7 w-7 transition-all duration-300 group-hover:scale-125 relative z-10" />

                {/* Enhanced badges */}
                {action.isHot && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 animate-bounce shadow-lg border border-white/20">
                    🔥 HOT
                  </Badge>
                )}
                
                {action.isNew && (
                  <Badge className="absolute -top-2 -left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 shadow-lg animate-pulse border border-white/20">
                    ✨ NEW
                  </Badge>
                )}
                
                {action.isPro && (
                  <Badge className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-2 py-1 shadow-lg border border-white/20">
                    ⭐ PRO
                  </Badge>
                )}

                {action.count && (
                  <Badge className="absolute -bottom-2 -right-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs px-2 py-1 rounded-full shadow-lg border border-white/20">
                    {action.count}
                  </Badge>
                )}

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Sparkle effects */}
                {activeAction === action.label && (
                  <div className="absolute inset-0 pointer-events-none">
                    <Sparkles className="absolute top-1 right-1 w-4 h-4 text-yellow-300 animate-ping" />
                    <Sparkles className="absolute bottom-1 left-1 w-3 h-3 text-blue-300 animate-ping" style={{ animationDelay: '0.3s' }} />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 text-pink-300 animate-ping" style={{ animationDelay: '0.6s' }} />
                  </div>
                )}

                {/* Enhanced tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none shadow-2xl border border-white/10 backdrop-blur-md z-50">
                  <div className="font-semibold">{action.label}</div>
                  {action.description && (
                    <div className="text-xs text-gray-300 mt-1">{action.description}</div>
                  )}
                  {action.shortcut && (
                    <div className="text-xs text-blue-300 mt-1 font-mono">
                      Shortcut: {action.shortcut}
                    </div>
                  )}
                  {action.count && (
                    <div className="text-xs text-gray-300 mt-1">
                      {typeof action.count === 'string' && action.count.includes('K') ? `${action.count} views` : `${action.count} items`}
                    </div>
                  )}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
                </div>
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Achievements Panel */}
      {showAchievements && (
        <div className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/30 dark:border-gray-700/30 animate-slide-in-up">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Achievements</h3>
            <button
              onClick={() => setShowAchievements(false)}
              className="ml-auto p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className={`flex items-center gap-3 p-2 rounded-lg ${
                achievement.unlocked ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'
              }`}>
                <achievement.icon className={`w-4 h-4 ${
                  achievement.unlocked ? 'text-green-500' : 'text-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </div>
                  {achievement.progress && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {achievement.progress}/10 completed
                    </div>
                  )}
                </div>
                {achievement.unlocked && (
                  <div className="text-green-500">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {lastScrollY > 400 && (
        <div className="mb-4">
          <Button
            size="icon"
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white shadow-xl hover:shadow-2xl transition-all duration-400 hover:scale-110 border border-white/20 backdrop-blur-sm group overflow-hidden"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Top
            </div>
          </Button>
        </div>
      )}

      {/* Ultra-enhanced main FAB */}
      <Button
        size="icon"
        className={`
          relative w-18 h-18 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 
          hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 text-white shadow-2xl 
          hover:shadow-3xl transition-all duration-600 hover:scale-110 border-2 border-white/30 
          backdrop-blur-sm overflow-hidden group
          ${isOpen ? 'rotate-45 scale-110 shadow-3xl' : 'rotate-0 scale-100'}
          ${pulseAnimation ? 'animate-pulse-glow' : ''}
          ${isExpanded ? 'scale-125' : ''}
        `}
        onClick={toggleFAB}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        
        {/* Main icon */}
        <div className={`relative z-10 transition-all duration-600 ${isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}>
          {isOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Plus className="h-8 w-8" />
          )}
        </div>

        {/* Enhanced notification badges */}
        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg animate-bounce border border-white/20">
          <Zap className="h-3 w-3" />
        </Badge>

        <Badge className="absolute -bottom-2 -left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 shadow-lg border border-white/20">
          NEW
        </Badge>

        {/* Dynamic orbiting elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-orbit opacity-60" />
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60" 
            style={{ animation: 'orbit 4s linear infinite reverse' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-60" 
            style={{ animation: 'orbit 6s linear infinite' }}
          />
        </div>

        {/* Ripple effect */}
        <div className={`absolute inset-0 rounded-3xl bg-white/30 transition-all duration-400 ${
          isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-0'
        }`} />

        {/* Long press indicator */}
        {longPressTimer && (
          <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400 animate-pulse" />
        )}
      </Button>

      {/* Enhanced background overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-blue-900/40 backdrop-blur-lg -z-10 transition-all duration-700"
          onClick={toggleFAB}
        />
      )}

      {/* Context indicator */}
      {isOpen && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-3 rounded-2xl text-sm shadow-2xl border border-white/10 backdrop-blur-md animate-slide-in-up">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="font-semibold">Quick Actions</div>
              <div className="text-xs text-gray-300 mt-0.5">
                {filteredActions.length} tools • Press / to search
              </div>
            </div>
            <Lightbulb className="w-4 h-4 text-blue-400 animate-pulse" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}

      {/* Usage stats tooltip */}
      {activeAction && (
        <div className="fixed bottom-24 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-xl text-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-slide-in-up z-40">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-500" />
            <span>Recently used</span>
          </div>
        </div>
      )}
    </div>
  );
}
