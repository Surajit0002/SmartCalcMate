
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, Calculator, Star, Clock, Bookmark, Share2, Download, Settings,
  Zap, TrendingUp, History, Heart, Search, ChevronUp, X, Sparkles,
  Flame, Target, Brain, Rocket, Crown, Award, Bell, Eye, Filter,
  Compass, Map, Layers, Grid, BarChart3, PieChart, LineChart,
  Activity, Gauge, Timer, Lightbulb, Wand2, Palette, Shield,
  Code, FileText, Image, Video, Music, Coffee, Moon, Sun,
  Wifi, Battery, Signal, Bluetooth, Volume2, Camera, Mic,
  Navigation, Home, User, Mail, Phone, MessageCircle, Send,
  Edit, Save, Trash, RefreshCw, ArrowUp, ArrowDown, ChevronLeft,
  ChevronRight, Maximize2, Minimize2, MoreHorizontal, MoreVertical
} from 'lucide-react';
import { Link } from 'wouter';
import { useI18n } from '@/hooks/useI18n';

interface QuickAction {
  icon: any;
  label: string;
  href?: string;
  action?: () => void;
  color: string;
  description: string;
  glow: string;
  priority: number;
  category: string;
  isNew?: boolean;
  isHot?: boolean;
  usageCount?: number;
}

interface FABState {
  isOpen: boolean;
  isVisible: boolean;
  isExpanded: boolean;
  mode: 'compact' | 'expanded' | 'contextual';
  activeCategory: string;
}

export default function FloatingActionButton() {
  const [state, setState] = useState<FABState>({
    isOpen: false,
    isVisible: true,
    isExpanded: false,
    mode: 'compact',
    activeCategory: 'all'
  });
  
  const [lastScrollY, setLastScrollY] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const [sparklePositions, setSparklePositions] = useState<Array<{x: number, y: number, delay: number}>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [networkStatus, setNetworkStatus] = useState('online');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon');
  const [userActivity, setUserActivity] = useState({ calculationsToday: 12, streakDays: 5 });
  const { t } = useI18n();

  // Dynamic actions based on context and user behavior
  const allActions = useMemo<QuickAction[]>(() => [
    // Core Calculator Actions
    { 
      icon: Calculator, label: 'Quick Calc', href: '/calculator/scientific', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      description: 'Scientific Calculator', glow: 'shadow-blue-500/30', priority: 10,
      category: 'calculator', usageCount: 156
    },
    { 
      icon: Brain, label: 'AI Assistant', href: '/calculator/ai-helper',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      description: 'Smart Calculation Help', glow: 'shadow-purple-500/30', priority: 9,
      category: 'calculator', isNew: true
    },
    
    // Navigation & Discovery
    { 
      icon: TrendingUp, label: 'Trending', href: '/categories/finance',
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      description: 'Popular Calculators', glow: 'shadow-emerald-500/30', priority: 8,
      category: 'navigation', isHot: true
    },
    { 
      icon: Compass, label: 'Discover', href: '/discover',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      description: 'Explore New Tools', glow: 'shadow-orange-500/30', priority: 7,
      category: 'navigation'
    },
    
    // Personal Actions
    { 
      icon: Star, label: 'Favorites', href: '/favorites',
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      description: 'Your Favorites', glow: 'shadow-yellow-500/30', priority: 6,
      category: 'personal'
    },
    { 
      icon: History, label: 'History', href: '/history',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      description: 'Recent Calculations', glow: 'shadow-indigo-500/30', priority: 5,
      category: 'personal'
    },
    
    // Utility Actions
    { 
      icon: Search, label: 'Search', href: '/search',
      color: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
      description: 'Find Calculators', glow: 'shadow-gray-500/30', priority: 4,
      category: 'utility'
    },
    { 
      icon: Share2, label: 'Share Results', action: () => navigator.share?.({title: 'CalcMate Results'}),
      color: 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
      description: 'Share Calculations', glow: 'shadow-pink-500/30', priority: 3,
      category: 'utility'
    },
    
    // Contextual Time-based Actions
    ...(timeOfDay === 'morning' ? [{
      icon: Coffee, label: 'Morning Stats', href: '/daily-summary',
      color: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
      description: 'Daily Calculator Summary', glow: 'shadow-amber-500/30', priority: 8,
      category: 'contextual'
    }] : []),
    
    // Achievement-based Actions
    ...(userActivity.streakDays >= 5 ? [{
      icon: Award, label: 'Achievements', href: '/achievements',
      color: 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700',
      description: `${userActivity.streakDays} Day Streak!`, glow: 'shadow-gold-500/30', priority: 7,
      category: 'achievement', isHot: true
    }] : [])
  ], [timeOfDay, userActivity]);

  // Smart action filtering based on context and usage
  const getSmartActions = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();
    
    // Filter by time of day and user behavior
    let filtered = allActions.filter(action => {
      if (state.activeCategory !== 'all' && action.category !== state.activeCategory) return false;
      return true;
    });

    // Sort by priority and usage
    filtered.sort((a, b) => {
      const priorityScore = b.priority - a.priority;
      const usageScore = (b.usageCount || 0) - (a.usageCount || 0);
      return priorityScore + (usageScore * 0.1);
    });

    return state.mode === 'compact' ? filtered.slice(0, 5) : filtered.slice(0, 8);
  }, [allActions, state.activeCategory, state.mode]);

  const smartActions = getSmartActions();

  // Enhanced scroll behavior with momentum
  useEffect(() => {
    let momentum = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      momentum = direction === 'down' ? Math.min(momentum + 1, 5) : Math.max(momentum - 1, -5);
      
      const shouldHide = momentum > 2 && currentScrollY > 100;
      setState(prev => ({ ...prev, isVisible: !shouldHide }));
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Dynamic pulsing based on user activity
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, userActivity.calculationsToday > 10 ? 5000 : 8000);
    return () => clearInterval(interval);
  }, [userActivity.calculationsToday]);

  // Enhanced sparkle generation with physics
  useEffect(() => {
    const generateSparkles = () => {
      const sparkles = Array.from({ length: 8 }, (_, i) => ({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        delay: i * 0.2
      }));
      setSparklePositions(sparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, []);

  // System status monitoring
  useEffect(() => {
    const updateSystemStatus = () => {
      // Battery API (if available)
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      }
      
      // Network status
      setNetworkStatus(navigator.onLine ? 'online' : 'offline');
      
      // Time of day
      const hour = new Date().getHours();
      if (hour < 6) setTimeOfDay('night');
      else if (hour < 12) setTimeOfDay('morning');
      else if (hour < 18) setTimeOfDay('afternoon');
      else setTimeOfDay('evening');
    };

    updateSystemStatus();
    const interval = setInterval(updateSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMainAction = () => {
    setState(prev => ({ 
      ...prev, 
      isOpen: !prev.isOpen,
      mode: prev.isOpen ? 'compact' : (prev.mode === 'compact' ? 'expanded' : 'compact')
    }));
  };

  const handleCategoryChange = (category: string) => {
    setState(prev => ({ ...prev, activeCategory: category }));
  };

  const getMainIconRotation = () => {
    if (state.isOpen) return 'rotate-[135deg]';
    if (isHovered) return 'rotate-45';
    return 'rotate-0';
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out ${
      state.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      {/* Category Selector - appears when expanded */}
      {state.mode === 'expanded' && (
        <div className="flex flex-wrap gap-2 mb-4 max-w-64 justify-center">
          {['all', 'calculator', 'navigation', 'personal', 'utility'].map((category) => (
            <Button
              key={category}
              size="sm"
              variant={state.activeCategory === category ? 'default' : 'outline'}
              className="text-xs capitalize h-7"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* System Status Bar */}
      {state.isOpen && state.mode === 'expanded' && (
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3 flex items-center gap-2 text-xs text-white">
          <div className="flex items-center gap-1">
            <Battery className="h-3 w-3" />
            <span>{batteryLevel}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <span className={networkStatus === 'online' ? 'text-green-400' : 'text-red-400'}>
              {networkStatus}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>{userActivity.calculationsToday}</span>
          </div>
        </div>
      )}

      {/* Quick Action Grid */}
      <div className={`grid gap-3 mb-4 transition-all duration-500 ease-out ${
        state.isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      } ${state.mode === 'expanded' ? 'grid-cols-3 max-w-48' : 'grid-cols-1'}`}>
        {smartActions.map((action, index) => (
          <div 
            key={`${action.label}-${index}`}
            className={`relative group transition-all duration-400 ease-out ${
              state.isOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * (state.mode === 'expanded' ? 50 : 100)}ms`
            }}
          >
            {action.href ? (
              <Link href={action.href}>
                <ActionButton action={action} onClick={() => setState(prev => ({ ...prev, isOpen: false }))} />
              </Link>
            ) : (
              <ActionButton 
                action={action} 
                onClick={() => {
                  action.action?.();
                  setState(prev => ({ ...prev, isOpen: false }));
                }} 
              />
            )}
            
            {/* Enhanced Tooltip with Smart Positioning */}
            <div className={`absolute ${state.mode === 'expanded' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : 'right-full mr-3 top-1/2 -translate-y-1/2'} bg-gray-900/95 dark:bg-gray-100/95 backdrop-blur-md text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform ${state.mode === 'expanded' ? 'translate-y-2 group-hover:translate-y-0' : 'translate-x-2 group-hover:translate-x-0'} border border-white/10`}>
              <div className="font-semibold flex items-center gap-2">
                {action.isNew && <Badge className="bg-blue-500 text-white text-xs px-1 py-0">NEW</Badge>}
                {action.isHot && <Flame className="h-3 w-3 text-orange-400" />}
                <Sparkles className="h-3 w-3" />
                {action.label}
              </div>
              <div className="text-xs opacity-80">{action.description}</div>
              {action.usageCount && (
                <div className="text-xs opacity-60">Used {action.usageCount} times</div>
              )}
              <div className={`absolute ${state.mode === 'expanded' ? 'top-full left-1/2 -translate-x-1/2 border-t-4 border-t-gray-900/95 dark:border-t-gray-100/95 border-x-4 border-x-transparent' : 'top-1/2 -translate-y-1/2 left-full border-l-4 border-l-gray-900/95 dark:border-l-gray-100/95 border-y-4 border-y-transparent'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top Button with Progress */}
      {lastScrollY > 300 && (
        <div className="relative mb-3">
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border border-white/10 relative overflow-hidden"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="h-5 w-5" />
            <Progress 
              value={Math.min((lastScrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)} 
              className="absolute bottom-1 left-1 right-1 h-1"
            />
          </Button>
        </div>
      )}

      {/* Main FAB with Advanced Animations */}
      <div className="relative">
        <Button
          size="icon"
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 relative overflow-hidden group border-2 border-white/20 ${
            pulseCount > 0 ? 'animate-pulse' : ''
          }`}
          onClick={handleMainAction}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Advanced Background Effects */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
              animation: isHovered ? 'spin 3s linear infinite' : 'none'
            }}
          />
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
          
          {/* Main Icon with Enhanced Animation */}
          <div className={`transition-all duration-500 ${getMainIconRotation()} scale-100 relative z-10`}>
            {state.isOpen ? (
              <X className="h-6 w-6 transition-transform duration-300" />
            ) : (
              <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
            )}
          </div>
          
          {/* Dynamic Notification Badge */}
          <div className="absolute -top-2 -right-2">
            <Badge variant="destructive" className="px-2 py-1 text-xs shadow-lg border border-white/20 bg-gradient-to-r from-red-500 to-pink-500 animate-bounce">
              <div className="flex items-center gap-1">
                {timeOfDay === 'morning' ? <Coffee className="h-3 w-3" /> : <Flame className="h-3 w-3" />}
                <span>{userActivity.calculationsToday > 10 ? 'Pro' : 'Hot'}</span>
              </div>
            </Badge>
          </div>

          {/* Enhanced Sparkle System */}
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            {sparklePositions.map((sparkle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/80 rounded-full animate-pulse"
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                  animationDelay: `${sparkle.delay}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Advanced Orbiting Elements */}
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
                <div className={`w-full h-full rounded-full opacity-60 ${
                  i === 0 ? 'bg-blue-300' : i === 1 ? 'bg-purple-300' : 'bg-indigo-300'
                }`} />
              </div>
            ))}
          </div>
        </Button>

        {/* Multiple Expanding Rings */}
        {[100, 150, 200].map((scale, i) => (
          <div 
            key={i}
            className={`absolute inset-0 rounded-full border border-blue-400/30 transition-all duration-${700 + i * 300} ${
              state.isOpen ? `scale-${scale} opacity-0` : 'scale-100 opacity-50'
            }`} 
            style={{ transitionDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Enhanced Background Overlay */}
      {state.isOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/20 via-blue-900/10 to-purple-900/20 backdrop-blur-sm -z-10 transition-all duration-500"
          onClick={handleMainAction}
        />
      )}
    </div>
  );
}

// Action Button Component
const ActionButton = ({ action, onClick }: { action: QuickAction; onClick: () => void }) => (
  <Button
    size="icon"
    className={`w-12 h-12 rounded-full shadow-lg ${action.color} ${action.glow} text-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-current/30 relative overflow-hidden group-hover:rotate-12`}
    onClick={onClick}
  >
    {/* Shimmer Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </div>
    
    {/* Icon with Enhanced Animation */}
    <action.icon className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
    
    {/* Status Indicators */}
    {action.isNew && (
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
    )}
    {action.isHot && (
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
        <Flame className="h-2 w-2 text-white" />
      </div>
    )}
    
    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/80 rounded-full animate-bounce"
          style={{
            left: `${15 + i * 20}%`,
            top: `${25 + i * 15}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  </Button>
);
