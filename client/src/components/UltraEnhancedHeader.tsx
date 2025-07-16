import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
// Removed NavigationMenu imports to avoid conflicts
import { useTheme } from '@/hooks/useTheme';
import { categories, calculators } from '@/lib/calculatorData';
import { 
  Calculator, Search, Sun, Moon, User, Menu, X, Crown, 
  Star, Award, Settings, ChevronDown, Sparkles, Zap, 
  TrendingUp, Users, Activity, BarChart3, DollarSign, 
  FileText, Heart, Code, Video, Music, Palette, Shield,
  Bookmark, History, Save, Grid3X3, Compass, Globe,
  Target, Clock, Brain, Layers, Gauge, Timer, Trophy,
  Flame, RefreshCw, ChevronRight, Plus, Bell, Home,
  Folder, List, Eye, Download, Share2, Archive, Trash2,
  Copy, ExternalLink
} from 'lucide-react';

const iconMap = {
  'fa-chart-line': BarChart3,
  'fa-heartbeat': Heart,
  'fa-square-root-alt': Calculator,
  'fa-calendar-day': Clock,
  'fa-exchange-alt': RefreshCw,
  'fa-file-alt': FileText,
  'fa-video': Video,
  'fa-bitcoin': DollarSign,
  'fa-code': Code,
  'fa-robot': Brain,
  'fa-language': Globe,
  'fa-tools': Settings,
  'fa-piggy-bank': DollarSign,
  'fa-percentage': Target,
  'fa-home': Home,
  'fa-chart-area': BarChart3,
  'fa-balance-scale': Gauge,
  'fa-weight': Gauge,
  'fa-fire': Flame,
  'fa-birthday-cake': Timer,
  'fa-calculator': Calculator,
  'fa-percent': Target,
  'fa-receipt': FileText,
  'fa-key': Shield,
  'fa-chart-pie': BarChart3,
  'fa-file-invoice-dollar': FileText
};

const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || Calculator;
  return <IconComponent className="w-4 h-4" />;
};

export default function UltraEnhancedHeader() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (selectedNotification) {
      setIsNotificationModalOpen(true);
    }
  }, [selectedNotification]);

  const dynamicStats = {
    totalTools: calculators.length,
    categories: categories.length,
    activeUsers: "52.3K",
    calculations: "2.8M+",
    uptime: "99.9%"
  };

  const searchResults = searchQuery.length > 0 ? 
    calculators.filter(calc => 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 8) : [];

  const featuredTools = calculators.filter(c => c.featured).slice(0, 6);
  const popularTools = calculators.filter(c => c.isPopular).slice(0, 6);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home, gradient: 'from-blue-500 to-purple-500' },
    { name: 'Categories', href: '/categories', icon: Grid3X3, gradient: 'from-green-500 to-blue-500' },
    { name: 'All Tools', href: '/all-tools', icon: List, gradient: 'from-purple-500 to-pink-500' }
  ];

  const quickActions = [
    { name: 'Settings', icon: Settings, color: 'text-gray-600', bgColor: 'bg-gray-100', action: () => alert('Settings coming soon!') }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'
    }`}>
      {/* Top announcement bar with live stats */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-2 px-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">New: AI-powered tools now available!</span>
              <span className="sm:hidden">New AI Tools!</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{dynamicStats.activeUsers}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>{dynamicStats.calculations}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                <span>{dynamicStats.uptime}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 cursor-pointer">
              Get 50% Off Pro
            </Badge>
            <div className="text-xs hidden sm:block">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced logo and brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse border-2 border-white dark:border-gray-900"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CalcMate Pro
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                {dynamicStats.totalTools}+ Advanced Tools • {dynamicStats.categories} Categories
              </p>
            </div>
          </Link>

          {/* Enhanced search bar with live results */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search 165+ calculators, converters, and AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 rounded-xl"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              
              {/* Live search results */}
              {searchResults.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 shadow-2xl max-h-96 overflow-hidden z-50">
                  <CardContent className="p-0">
                    <div className="p-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      Found {searchResults.length} results for "{searchQuery}"
                    </div>
                    <ScrollArea className="h-80">
                      <div className="p-2">
                        {searchResults.map((result) => (
                          <Link key={result.id} href={`/calculator/${result.id}`}>
                            <div className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-colors group">
                              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white group-hover:scale-105 transition-transform">
                                {getIcon(result.icon)}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white">{result.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">{result.description}</div>
                              </div>
                              <div className="flex gap-1">
                                {result.featured && <Star className="w-4 h-4 text-yellow-500" />}
                                {result.isNew && <Sparkles className="w-4 h-4 text-green-500" />}
                                {result.isPro && <Crown className="w-4 h-4 text-orange-500" />}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Header right side actions */}
          <div className="flex items-center gap-3">
            {/* Favorites and History icons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/favorites">
                <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <History className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Live stats display */}
            <div className="hidden xl:flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-center">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{dynamicStats.activeUsers}</div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-sm font-bold text-green-600 dark:text-green-400">{dynamicStats.calculations}</div>
                <div className="text-xs text-gray-500">Calculations</div>
              </div>
            </div>

            {/* Advanced Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative rounded-full w-10 h-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    3
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 shadow-2xl max-h-96">
                <DropdownMenuLabel className="text-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">Notifications</div>
                    <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      3 New
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <ScrollArea className="h-80">
                  <div className="p-2 space-y-2">
                    {/* Notification Item 1 */}
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                         onClick={() => setSelectedNotification({
                           id: 1,
                           type: 'update',
                           title: 'New Calculator Added!',
                           message: 'Check out our latest EMI Calculator with advanced features',
                           timestamp: '2 minutes ago',
                           priority: 'high',
                           category: 'Product Update',
                           details: 'We have just released a brand new EMI Calculator with advanced visualization features, multiple currency support, and detailed amortization schedules. This calculator helps you plan your loan EMIs with precision and includes interactive charts for better understanding.',
                           actionButton: 'Try Calculator',
                           isRead: false
                         })}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white group-hover:scale-105 transition-transform">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">New Calculator Added!</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Check out our latest EMI Calculator with advanced features</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">2 minutes ago</div>
                            <Badge className="bg-red-500 text-white text-xs">New</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notification Item 2 */}
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                         onClick={() => setSelectedNotification({
                           id: 2,
                           type: 'achievement',
                           title: 'Calculation Milestone!',
                           message: 'You have completed 100+ calculations this month',
                           timestamp: '1 hour ago',
                           priority: 'medium',
                           category: 'Achievement',
                           details: 'Congratulations! You have successfully completed over 100 calculations this month. You are among our top 10% most active users. Keep up the great work and continue exploring our advanced tools and calculators.',
                           actionButton: 'View Stats',
                           isRead: false
                         })}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white group-hover:scale-105 transition-transform">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">Calculation Milestone!</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">You have completed 100+ calculations this month</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-green-600 dark:text-green-400 font-medium">1 hour ago</div>
                            <Badge className="bg-yellow-500 text-white text-xs">Achievement</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notification Item 3 */}
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                         onClick={() => setSelectedNotification({
                           id: 3,
                           type: 'promotion',
                           title: 'Pro Features Available!',
                           message: 'Upgrade to Pro and unlock advanced features',
                           timestamp: '3 hours ago',
                           priority: 'high',
                           category: 'Promotion',
                           details: 'Unlock the full potential of CalcMate Pro with our premium features including: Advanced calculators, AI-powered tools, Priority support, Export functionality, Custom themes, and much more. Limited time offer - Get 50% off on your first year!',
                           actionButton: 'Upgrade Now',
                           isRead: true
                         })}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white group-hover:scale-105 transition-transform">
                          <Crown className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">Pro Features Available!</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Upgrade to Pro and unlock advanced features</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">3 hours ago</div>
                            <Badge className="bg-orange-500 text-white text-xs">Pro</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notification Item 4 */}
                    <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                         onClick={() => setSelectedNotification({
                           id: 4,
                           type: 'system',
                           title: 'System Maintenance',
                           message: 'Scheduled maintenance on Jan 20, 2:00 AM UTC',
                           timestamp: '1 day ago',
                           priority: 'low',
                           category: 'System',
                           details: 'We have scheduled system maintenance on January 20th at 2:00 AM UTC for approximately 2 hours. During this time, some features may be temporarily unavailable. We apologize for any inconvenience and appreciate your patience.',
                           actionButton: 'Learn More',
                           isRead: true
                         })}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white group-hover:scale-105 transition-transform">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">System Maintenance</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Scheduled maintenance on Jan 20, 2:00 AM UTC</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">1 day ago</div>
                            <Badge className="bg-gray-500 text-white text-xs">System</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <DropdownMenuSeparator />
                <div className="p-3 text-center">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full w-10 h-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
            </Button>

            {/* Enhanced user menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 shadow-2xl">
                <DropdownMenuLabel className="text-center py-3">
                  <div className="font-semibold text-lg">My Account</div>
                  <div className="text-sm text-gray-500">Professional Plan</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/profile">
                    <DropdownMenuItem className="gap-3 py-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Profile</div>
                        <div className="text-sm text-gray-500">Manage your account</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/favorites">
                    <DropdownMenuItem className="gap-3 py-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                        <Heart className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">Favorites</div>
                        <div className="text-sm text-gray-500">Saved calculators</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/history">
                    <DropdownMenuItem className="gap-3 py-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <History className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">History</div>
                        <div className="text-sm text-gray-500">Recent calculations</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="gap-3 py-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Settings className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Settings</div>
                      <div className="text-sm text-gray-500">Preferences</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-3 py-3 text-red-600">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <X className="w-4 h-4" />
                  </div>
                  <div>Sign out</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden rounded-full w-10 h-10 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced navigation bar */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <nav className="flex items-center justify-between py-3">
            <div className="flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 transition-all duration-200 hover:scale-105 ${
                      location === item.href 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.name}</span>
                  </Button>
                </Link>
              ))}
            </div>

            {/* Categories mega menu */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Grid3X3 className="w-4 h-4" />
                    All Categories
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 shadow-2xl">
                  <DropdownMenuLabel className="text-center py-3">
                    <div className="font-semibold text-lg">Browse All Categories</div>
                    <div className="text-sm text-gray-500">{categories.length} categories • {calculators.length} tools</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-80">
                    <div className="p-2">
                      {categories.map((category) => (
                        <Link key={category.id} href={`/category/${category.id}`}>
                          <div className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-colors group">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.gradient} text-white group-hover:scale-105 transition-transform`}>
                              {getIcon(category.icon)}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {category.calculators.length} tools
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {category.trending && <TrendingUp className="w-4 h-4 text-orange-500" />}
                              {category.isPopular && <Flame className="w-4 h-4 text-red-500" />}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1 hidden sm:flex">
                <Sparkles className="w-3 h-3" />
                Pro Features
              </Badge>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Pro
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Enhanced mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-2xl">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tools..."
                className="pl-10 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/favorites">
                <Button 
                  variant="ghost" 
                  className="w-full gap-3 bg-red-100 text-red-600 justify-start rounded-xl py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  Favorites
                </Button>
              </Link>
              <Link href="/history">
                <Button 
                  variant="ghost" 
                  className="w-full gap-3 bg-blue-100 text-blue-600 justify-start rounded-xl py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <History className="w-5 h-5" />
                  History
                </Button>
              </Link>
            </div>

            {/* Mobile navigation */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3">Navigation</div>
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start gap-3 rounded-xl py-4 ${
                      location === item.href 
                        ? `bg-gradient-to-r ${item.gradient} text-white` 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
            
            {/* Mobile categories */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3">Categories</div>
              <ScrollArea className="h-48">
                <div className="space-y-1">
                  {categories.slice(0, 8).map((category) => (
                    <Link key={category.id} href={`/category/${category.id}`}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 rounded-xl py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className={`p-1 rounded bg-gradient-to-r ${category.gradient} text-white`}>
                          {getIcon(category.icon)}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-gray-500">{category.calculators.length} tools</div>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Mobile stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{dynamicStats.totalTools}</div>
                <div className="text-xs text-gray-500">Tools</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{dynamicStats.activeUsers}</div>
                <div className="text-xs text-gray-500">Users</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{dynamicStats.calculations}</div>
                <div className="text-xs text-gray-500">Calculations</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Notification Details Modal */}
      <Dialog open={isNotificationModalOpen} onOpenChange={setIsNotificationModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 shadow-2xl">
          {selectedNotification && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl text-white ${
                    selectedNotification.type === 'update' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                    selectedNotification.type === 'achievement' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    selectedNotification.type === 'promotion' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}>
                    {selectedNotification.type === 'update' && <Calculator className="w-6 h-6" />}
                    {selectedNotification.type === 'achievement' && <Trophy className="w-6 h-6" />}
                    {selectedNotification.type === 'promotion' && <Crown className="w-6 h-6" />}
                    {selectedNotification.type === 'system' && <Settings className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedNotification.title}
                    </DialogTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className={`text-xs ${
                        selectedNotification.priority === 'high' ? 'bg-red-500 text-white' :
                        selectedNotification.priority === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {selectedNotification.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {selectedNotification.category}
                      </Badge>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedNotification.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!selectedNotification.isRead && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsNotificationModalOpen(false)}
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <DialogDescription className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedNotification.details}
                </DialogDescription>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg text-white">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-blue-900 dark:text-blue-100">Status</div>
                        <div className="text-sm text-blue-600 dark:text-blue-300">
                          {selectedNotification.isRead ? 'Read' : 'New'}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500 rounded-lg text-white">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-green-900 dark:text-green-100">Priority</div>
                        <div className="text-sm text-green-600 dark:text-green-300 capitalize">
                          {selectedNotification.priority}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Action Buttons */}
                <DialogFooter className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" className="gap-2">
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button className={`gap-2 ${
                    selectedNotification.type === 'update' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600' :
                    selectedNotification.type === 'achievement' ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' :
                    selectedNotification.type === 'promotion' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' :
                    'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                  } text-white shadow-lg`}>
                    <ExternalLink className="w-4 h-4" />
                    {selectedNotification.actionButton}
                  </Button>
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}