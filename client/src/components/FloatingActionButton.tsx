import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Calculator, Star, History, Search, X, 
  ChevronUp, Heart, Zap, TrendingUp
} from 'lucide-react';
import { Link } from 'wouter';

interface QuickAction {
  icon: any;
  label: string;
  href: string;
  color: string;
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
      color: 'bg-blue-500 hover:bg-blue-600'
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
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    { 
      icon: History, 
      label: 'History', 
      href: '/history',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      icon: Search, 
      label: 'Search', 
      href: '/search',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  // Handle scroll to show/hide FAB
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
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>

      {/* Quick Actions */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => (
          <div 
            key={action.label}
            className="transition-all duration-200"
            style={{ 
              transitionDelay: `${index * 50}ms`
            }}
          >
            <Link href={action.href}>
              <Button
                size="icon"
                className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 relative group`}
                onClick={() => setIsOpen(false)}
              >
                <action.icon className="h-5 w-5" />

                {/* Hot badge */}
                {action.isHot && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0">
                    HOT
                  </Badge>
                )}

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {action.label}
                </div>
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Scroll to top button */}
      {lastScrollY > 300 && (
        <div className="mb-3">
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-lg transition-all duration-200 hover:scale-110"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="icon"
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 relative"
        onClick={toggleFAB}
      >
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </div>

        {/* Notification badge */}
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
          <Zap className="h-3 w-3" />
        </Badge>
      </Button>

      {/* Background overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 transition-all duration-300"
          onClick={toggleFAB}
        />
      )}
    </div>
  );
}