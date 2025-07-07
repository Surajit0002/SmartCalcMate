import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Calculator, Menu, X, Search, Star, Zap, Crown, 
  TrendingUp, Users, Award, Globe, Sparkles,
  ChevronDown, Sun, Moon, Settings, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { categories } from '@/lib/calculatorData';

export default function EnhancedDynamicHeader() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dynamicStats = {
    totalTools: 165,
    categories: 13,
    activeUsers: "50K+",
    calculations: "2M+"
  };

  const quickCategories = [
    { id: 'finance', name: 'Finance', icon: <TrendingUp className="w-4 h-4" />, color: 'bg-green-500' },
    { id: 'unit-converters', name: 'Converters', icon: <Globe className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'file-converters', name: 'Files', icon: <Zap className="w-4 h-4" />, color: 'bg-purple-500' },
    { id: 'ai-converters', name: 'AI Tools', icon: <Sparkles className="w-4 h-4" />, color: 'bg-orange-500' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'
    }`}>
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2">
          <Crown className="w-4 h-4" />
          <span>New: AI-powered tools now available! Get 50% off Pro features.</span>
          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
            Upgrade Now
          </Badge>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CalcMate Pro
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                {dynamicStats.totalTools}+ Advanced Tools
              </p>
            </div>
          </Link>

          {/* Enhanced search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search 165+ calculators and converters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all"
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50">
                  <div className="p-3 text-sm text-gray-600 dark:text-gray-400">
                    Search results for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation and actions */}
          <div className="flex items-center gap-4">
            {/* Quick category access */}
            <div className="hidden lg:flex items-center gap-2">
              {quickCategories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                    {cat.name}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Stats display */}
            <div className="hidden xl:flex items-center gap-4 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{dynamicStats.activeUsers}</div>
                <div className="text-xs text-gray-500">Users</div>
              </div>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-sm font-bold text-green-600 dark:text-green-400">{dynamicStats.calculations}</div>
                <div className="text-xs text-gray-500">Calculations</div>
              </div>
            </div>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full w-10 h-10 p-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/favorites">
                    <DropdownMenuItem>
                      <Star className="mr-2 h-4 w-4" />
                      <span>Favorites</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/history">
                    <DropdownMenuItem>
                      <Award className="mr-2 h-4 w-4" />
                      <span>History</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced navigation bar */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <nav className="flex items-center justify-between py-3">
            <div className="flex items-center gap-6">
              <Link href="/" className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                location === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}>
                Home
              </Link>
              <Link href="/categories" className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                location === '/categories' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}>
                All Tools
              </Link>
              <Link href="/favorites" className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                location === '/favorites' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}>
                Favorites
              </Link>
              <Link href="/history" className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                location === '/history' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}>
                History
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <Sparkles className="w-3 h-3" />
                Pro Features
              </Badge>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Upgrade to Pro
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tools..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              {quickCategories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.id}`}>
                  <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => setIsMenuOpen(false)}>
                    {cat.icon}
                    {cat.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}