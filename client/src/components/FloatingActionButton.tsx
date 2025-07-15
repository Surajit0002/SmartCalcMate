import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Calculator, Star, History, Search, X, 
  TrendingUp, Bookmark, Settings
} from 'lucide-react';
import { Link } from 'wouter';

interface QuickAction {
  icon: any;
  label: string;
  href: string;
  color: string;
  count?: number;
  isHot?: boolean;
}

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const quickActions: QuickAction[] = [
    { 
      icon: Calculator, 
      label: 'Calculator', 
      href: '/calculator/scientific',
      color: 'bg-blue-500 hover:bg-blue-600',
      count: 156
    },
    { 
      icon: TrendingUp, 
      label: 'Trending', 
      href: '/categories/finance',
      color: 'bg-green-500 hover:bg-green-600',
      isHot: true
    },
    { 
      icon: Star, 
      label: 'Favorites', 
      href: '/favorites',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      count: 12
    },
    { 
      icon: History, 
      label: 'History', 
      href: '/history',
      color: 'bg-purple-500 hover:bg-purple-600',
      count: 8
    },
    { 
      icon: Search, 
      label: 'Search', 
      href: '/search',
      color: 'bg-gray-500 hover:bg-gray-600'
    },
    { 
      icon: Bookmark, 
      label: 'Bookmarks', 
      href: '/bookmarks',
      color: 'bg-pink-500 hover:bg-pink-600',
      count: 5
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/settings',
      color: 'bg-slate-500 hover:bg-slate-600'
    }
  ];

  // Simple scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      {/* Quick Actions Grid */}
      <div className={`grid grid-cols-2 gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => (
          <Link key={action.label} href={action.href}>
            <Button
              size="icon"
              className={`
                relative w-12 h-12 rounded-xl ${action.color} text-white shadow-lg 
                hover:shadow-xl transition-all duration-200 hover:scale-105
              `}
              onClick={() => setIsOpen(false)}
            >
              <action.icon className="h-5 w-5" />

              {action.isHot && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1">
                  🔥
                </Badge>
              )}

              {action.count && (
                <Badge className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs px-1">
                  {action.count}
                </Badge>
              )}
            </Button>
          </Link>
        ))}
      </div>

      {/* Main FAB Button */}
      <Button
        size="icon"
        className={`
          w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
          hover:from-blue-600 hover:to-purple-700 text-white shadow-xl 
          hover:shadow-2xl transition-all duration-300 hover:scale-110
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
        onClick={toggleFAB}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>

      {/* Background overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={toggleFAB}
        />
      )}
    </div>
  );
}