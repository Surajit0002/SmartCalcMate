import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  Menu, 
  X, 
  Search, 
  Heart, 
  History, 
  Bookmark,
  TrendingUp,
  Zap,
  Star,
  Bell,
  User
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useTheme } from '@/hooks/useTheme';
import SettingsDialog from './SettingsDialog';
import { calculators, featuredCalculators } from '@/lib/calculatorData';

export default function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [location] = useLocation();
  const { language } = useI18n();
  
  const t = {
    navigation: {
      home: 'Home',
      categories: 'Categories', 
      favorites: 'Favorites',
      history: 'History'
    }
  };
  const { theme } = useTheme();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = calculators.filter(calc => 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navigationItems = [
    { href: '/', label: t.navigation.home, icon: Calculator },
    { href: '/categories', label: t.navigation.categories, icon: TrendingUp },
    { href: '/favorites', label: t.navigation.favorites, icon: Heart, badge: 3 },
    { href: '/history', label: t.navigation.history, icon: History },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container-responsive">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CalcMate
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Pro Calculator Hub</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`relative ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search calculators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                    onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                    className="pl-10 w-64 transition-all duration-300 focus:w-80"
                  />
                </div>
                {showSearch && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
                    {searchResults.map((calc) => (
                      <Link key={calc.id} href={`/calculator/${calc.id}`}>
                        <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <div className="text-2xl mr-3">{calc.icon}</div>
                          <div>
                            <div className="font-medium">{calc.name}</div>
                            <div className="text-sm text-muted-foreground">{calc.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="hidden lg:flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>

              {/* Settings */}
              <SettingsDialog />

              {/* User Avatar */}
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Calculators Bar */}
        <div className="border-t bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container-responsive">
            <div className="flex items-center py-2 space-x-4 overflow-x-auto">
              <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground whitespace-nowrap">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Featured:</span>
              </div>
              {featuredCalculators.slice(0, 6).map((calc) => (
                <Link key={calc.id} href={`/calculator/${calc.id}`}>
                  <Button variant="ghost" size="sm" className="whitespace-nowrap hover:bg-white/50 dark:hover:bg-gray-700/50">
                    <span className="mr-1">{calc.icon}</span>
                    {calc.name}
                    <Star className="h-3 w-3 ml-1 text-yellow-500" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold">CalcMate</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4 space-y-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Navigation */}
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
              
              <Separator className="my-4" />
              
              {/* Quick Actions Mobile */}
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                  <Badge variant="destructive" className="ml-auto">2</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bookmark className="h-4 w-4 mr-3" />
                  Bookmarks
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}