
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
  Bell,
  User,
  Home,
  Grid3X3,
  Clock,
  Settings
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import SettingsDialog from './SettingsDialog';
import { calculators } from '@/lib/calculatorData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [location] = useLocation();
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
    { href: '/', label: 'Home', icon: Home, badge: null },
    { href: '/categories', label: 'Categories', icon: Grid3X3, badge: '15+' },
    { href: '/favorites', label: 'Favorites', icon: Heart, badge: '3' },
    { href: '/history', label: 'History', icon: Clock, badge: null },
    { href: '/profile', label: 'Profile', icon: User, badge: 'New' },
  ];

  const isActive = (path: string) => {
    return location === path || (path !== '/' && location.startsWith(path));
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              
              <div className="hidden sm:block">
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MultiToolsAI
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Smart Calculator Ecosystem
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      className={`relative transition-all duration-200 ${
                        active 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-3">
              
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search calculators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                    onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                    className="pl-10 w-64 lg:w-72 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                {/* Search Results */}
                {showSearch && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {searchResults.map((calc) => (
                      <Link key={calc.id} href={`/calculator/${calc.id}`}>
                        <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white text-sm mr-3">
                            {calc.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-white truncate">{calc.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{calc.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="hidden lg:flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
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
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Tools Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-2 gap-3 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                <Calculator className="h-4 w-4" />
                <span>Featured Tools:</span>
              </div>
              
              <div className="flex items-center gap-2">
                {['EMI Calculator', 'Currency Converter', 'BMI Calculator', 'Unit Converter', 'Tip Calculator'].map((tool, index) => (
                  <Button 
                    key={tool}
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 h-7"
                  >
                    {tool}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl">
            
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Calculator className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MultiToolsAI
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={`w-full justify-start ${active ? 'bg-blue-600 text-white' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
              
              <Separator className="my-4" />
              
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-3" />
                Notifications
                <Badge variant="destructive" className="ml-auto">2</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bookmark className="h-4 w-4 mr-3" />
                Bookmarks
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
