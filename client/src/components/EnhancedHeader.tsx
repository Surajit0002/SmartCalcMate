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
            {/* Enhanced Dynamic Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Main Icon with Enhanced Animation */}
                <div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Calculator className="h-6 w-6 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  
                  {/* Animated Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                </div>
                
                {/* Status Indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg">
                  <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                
                {/* Floating Particles */}
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <div className="flex flex-col">
                {/* Enhanced Brand Name */}
                <div className="relative">
                  <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                    CalcMate
                  </span>
                  
                  {/* Animated Underline */}
                  <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
                
                {/* Dynamic Tagline */}
                <div className="flex items-center gap-1">
                  <span className="text-xs lg:text-sm text-muted-foreground font-medium transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Pro Calculator Hub
                  </span>
                  <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
                </div>
                
                {/* Live Stats */}
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                  </div>
                  <div className="text-xs text-muted-foreground">•</div>
                  <span className="text-xs text-muted-foreground">100+ Tools</span>
                </div>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`relative group transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-5 py-3 rounded-xl overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl border-0' 
                          : 'hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:via-gray-750 dark:hover:to-gray-700 hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                      style={{ 
                        animationDelay: `${index * 150}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {/* Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      
                      {/* Content */}
                      <div className="relative flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20 backdrop-blur-sm' 
                            : 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                        }`}>
                          <Icon className={`h-4 w-4 transition-all duration-300 ${
                            isActive 
                              ? 'text-white animate-pulse' 
                              : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-125 group-hover:rotate-12'
                          }`} />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className={`font-semibold text-sm whitespace-nowrap transition-colors duration-300 ${
                            isActive 
                              ? 'text-white' 
                              : 'text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300'
                          }`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <div className="h-0.5 bg-white/50 rounded-full w-full mt-0.5 animate-pulse"></div>
                          )}
                        </div>
                        
                        {/* Enhanced Badge */}
                        {item.badge && (
                          <Badge 
                            variant={item.hot ? "destructive" : "secondary"} 
                            className={`ml-2 px-2.5 py-1 text-xs font-bold shadow-lg border-0 transition-all duration-300 ${
                              item.hot 
                                ? 'bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white animate-bounce hover:animate-pulse' 
                                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white group-hover:scale-110'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        
                        {/* Hot Indicator */}
                        {item.hot && !item.badge && (
                          <div className="absolute -top-2 -right-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping"></div>
                            <div className="absolute w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Advanced Hover Effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      
                      {/* Active State Glow */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-xl blur-xl -z-10 animate-pulse"></div>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Enhanced Tablet Navigation */}
            <nav className="hidden md:flex lg:hidden items-center gap-2">
              {navigationItems.slice(0, 4).map((item, index) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`relative group transition-all duration-300 transform hover:scale-110 px-3 py-2 rounded-xl ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-md border border-gray-200/50 dark:border-gray-700/50'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative flex items-center gap-1.5">
                        <Icon className={`h-4 w-4 transition-all duration-300 ${
                          isActive 
                            ? 'text-white animate-pulse' 
                            : 'group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`} />
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isActive 
                            ? 'text-white' 
                            : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Badge Indicator */}
                      {item.badge && (
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center ${
                          item.hot 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
                            : 'bg-blue-500'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      )}
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-2">
              {/* Enhanced Search */}
              <div className="relative hidden sm:block group">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-blue-500" />
                  <Input
                    placeholder="Search calculators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                    onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                    className="pl-10 pr-10 w-48 sm:w-56 lg:w-64 xl:w-72 transition-all duration-500 ease-out focus:w-56 sm:focus:w-64 lg:focus:w-80 xl:focus:w-96 focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 rounded-lg"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                {showSearch && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    {searchResults.map((calc, index) => (
                      <Link key={calc.id} href={`/calculator/${calc.id}`}>
                        <div 
                          className="flex items-center p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 cursor-pointer transition-all duration-300 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg mr-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                            {calc.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{calc.name}</div>
                            <div className="text-sm text-muted-foreground mt-1">{calc.description}</div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">→</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="hidden lg:flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="relative group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-110">
                  <Bell className="h-5 w-5 transition-transform duration-300 group-hover:animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping shadow-lg">
                    <div className="absolute inset-0 bg-red-400 rounded-full"></div>
                  </div>
                </Button>
                <Button variant="ghost" size="icon" className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-110">
                  <Bookmark className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </Button>
              </div>

              {/* Mobile Quick Actions */}
              <div className="flex lg:hidden items-center space-x-1">
                <Button variant="ghost" size="icon" className="relative hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700">
                  <Bell className="h-4 w-4" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </Button>
              </div>

              {/* Settings */}
              <SettingsDialog />

              {/* Enhanced User Avatar */}
              <Button variant="ghost" size="icon" className="rounded-full relative group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-110 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
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

        {/* Compact Featured Calculators Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm">
          <div className="container-responsive">
            <div className="flex items-center py-3 gap-3 overflow-x-auto scrollbar-hide">
              {/* Compact Label */}
              <div className="flex items-center gap-2 text-xs font-bold whitespace-nowrap bg-gradient-to-r from-orange-400 to-red-500 px-3 py-1.5 rounded-lg shadow-lg flex-shrink-0">
                <Zap className="h-3 w-3 text-white" />
                <span className="text-white">FEATURED</span>
              </div>
              
              {/* Compact Calculator Cards */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {featuredCalculators.slice(0, 6).map((calc, index) => {
                  const IconComponent = getIconComponent(calc.icon);
                  return (
                    <Link key={calc.id} href={`/calculator/${calc.id}`}>
                      <Button 
                        variant="ghost" 
                        className="whitespace-nowrap h-auto p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-400 dark:hover:border-blue-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 backdrop-blur-sm min-w-[100px] relative group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white shadow-sm flex-shrink-0">
                            <IconComponent className="h-3 w-3" />
                          </div>
                          <div className="flex flex-col items-start min-w-0">
                            <span className="font-medium text-gray-900 dark:text-white text-xs leading-tight truncate max-w-[60px]">
                              {calc.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-2 w-2 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">5.0</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Compact Badges */}
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-bold text-[8px]">
                            🔥
                          </div>
                        )}
                        
                        {index >= 3 && (
                          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full font-bold text-[8px]">
                            ⭐
                          </div>
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
              
              {/* Compact View All Button */}
              <Link href="/categories" className="flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-3 py-1.5"
                >
                  <Grid3X3 className="h-3 w-3 mr-1" />
                  <span className="font-medium text-xs">All Tools</span>
                  <span className="text-xs opacity-75 ml-1">(100+)</span>
                </Button>
              </Link>
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