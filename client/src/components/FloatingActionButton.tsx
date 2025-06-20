import { useState } from 'react';
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
  Zap
} from 'lucide-react';
import { Link } from 'wouter';
import { useI18n } from '@/hooks/useI18n';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const quickActions = [
    { icon: Calculator, label: 'Quick Calc', href: '/calculator/scientific', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Star, label: 'Favorites', href: '/favorites', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { icon: Clock, label: 'History', href: '/history', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Bookmark, label: 'Saved', href: '/saved', color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Action Buttons */}
      <div className={`flex flex-col-reverse space-y-reverse space-y-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {quickActions.map((action, index) => (
          <Link key={action.label} href={action.href}>
            <Button
              size="icon"
              className={`w-12 h-12 rounded-full shadow-lg ${action.color} text-white transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-2`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </Link>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="icon"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300" />
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <Plus className="h-6 w-6" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Badge variant="destructive" className="px-1.5 py-0.5 text-xs animate-pulse">
            <Zap className="h-2.5 w-2.5" />
          </Badge>
        </div>
      </Button>
    </div>
  );
}