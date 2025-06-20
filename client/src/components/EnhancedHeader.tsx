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
  User,
  Home,
  Grid3X3,
  Clock,
  DollarSign,
  Building,
  TrendingDown,
  Weight,
  Percent,
  Receipt
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

  // Icon mapping for calculators
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'fa-home': Home,
      'fa-building': Building,
      'fa-chart-area': TrendingUp,
      'fa-weight': Weight,
      'fa-percent': Percent,
      'fa-receipt': Receipt,
      'fa-dollar-sign': DollarSign,
      'fa-chart-line': TrendingUp,
      'fa-percentage': Percent,
      'fa-balance-scale': Calculator,
      'fa-fire': Zap,
      'fa-calculator': Calculator,
      'fa-birthday-cake': Home,
      'fa-exchange-alt': Calculator
    };
    return iconMap[iconName] || Calculator;
  };
  
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
    { href: '/', label: t.navigation.home, icon: Home, badge: null, hot: true },
    { href: '/categories', label: t.navigation.categories, icon: Grid3X3, badge: '15+', hot: false },
    { href: '/favorites', label: t.navigation.favorites, icon: Heart, badge: '3', hot: false },
    { href: '/history', label: t.navigation.history, icon: Clock, badge: null, hot: false },
    { href: '/profile', label: 'Profile', icon: User, badge: 'New', hot: true },
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
                        <Badge 
                          variant={item.hot ? "destructive" : "secondary"} 
                          className={`ml-2 px-1.5 py-0.5 text-xs ${item.hot ? 'animate-pulse bg-gradient-to-r from-red-500 to-pink-500' : ''}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.hot && !item.badge && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
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

        {/* Enhanced Featured Calculators Bar */}
        <div className="border-t bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 animate-pulse"></div>
          
          <div className="container-responsive relative">
            <div className="flex items-center py-3 space-x-6 overflow-x-auto custom-scrollbar">
              {/* Enhanced label */}
              <div className="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1.5 rounded-full shadow-lg">
                <Zap className="h-4 w-4 text-white animate-pulse" />
                <span className="text-white font-bold">Featured</span>
                <TrendingUp className="h-3 w-3 text-white" />
              </div>
              
              {/* Dynamic calculator cards */}
              {featuredCalculators.slice(0, 8).map((calc, index) => {
                const IconComponent = getIconComponent(calc.icon);
                return (
                  <Link key={calc.id} href={`/calculator/${calc.id}`}>
                    <div className="group relative">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="whitespace-nowrap h-auto p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="font-semibold text-gray-900 dark:text-white text-xs leading-tight">
                              {calc.name}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                              <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                              <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                              <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                              <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                            </div>
                          </div>
                        </div>
                      </Button>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      
                      {/* Popular badge for first few items */}
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                          HOT
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
              
              {/* View All button */}
              <Link href="/categories">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  View All
                  <span className="ml-1 text-xs opacity-75">(15+)</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Gradient fade edges for better scrolling indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-50 to-transparent dark:from-gray-800 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-purple-50 to-transparent dark:from-gray-900 pointer-events-none"></div>
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