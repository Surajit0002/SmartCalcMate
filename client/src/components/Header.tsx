
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calculator, 
  Menu, 
  X, 
  Search, 
  Bookmark,
  Bell,
  User,
  Home,
  Grid3X3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Star,
  Trash2,
  Download,
  Edit,
  Eye,
  Shield,
  CreditCard,
  LogOut,
  DollarSign,
  TrendingUp,
  Percent,
  Building,
  PiggyBank
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import SettingsDialog from './SettingsDialog';
import { calculators } from '@/lib/calculatorData';

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: 'New Calculator Added',
    message: 'Investment ROI Calculator is now available',
    time: '2 minutes ago',
    type: 'update',
    unread: true
  },
  {
    id: 2,
    title: 'Feature Update',
    message: 'Currency converter now supports 50+ currencies',
    time: '1 hour ago',
    type: 'feature',
    unread: true
  },
  {
    id: 3,
    title: 'Calculation Saved',
    message: 'Your EMI calculation has been saved',
    time: '3 hours ago',
    type: 'save',
    unread: false
  },
  {
    id: 4,
    title: 'Profile Updated',
    message: 'Your profile settings have been updated',
    time: '1 day ago',
    type: 'profile',
    unread: false
  }
];

// Mock saved tools
const mockSavedTools = [
  { id: 'emi', name: 'EMI Calculator', category: 'Finance', lastUsed: '2 hours ago' },
  { id: 'bmi', name: 'BMI Calculator', category: 'Health', lastUsed: '1 day ago' },
  { id: 'currency', name: 'Currency Converter', category: 'Finance', lastUsed: '3 days ago' },
  { id: 'unit', name: 'Unit Converter', category: 'Daily', lastUsed: '1 week ago' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [savedToolsOpen, setSavedToolsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location] = useLocation();
  const { theme } = useTheme();

  // Featured tools for slider
  const featuredTools = [
    { id: 'emi', name: 'EMI Calculator', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'investment', name: 'Investment Calculator', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'mortgage', name: 'Mortgage Calculator', icon: <Building className="h-4 w-4" /> },
    { id: 'compound', name: 'Compound Interest', icon: <Percent className="h-4 w-4" /> },
    { id: 'sip', name: 'SIP Calculator', icon: <PiggyBank className="h-4 w-4" /> },
    { id: 'currency', name: 'Currency Converter', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'bmi', name: 'BMI Calculator', icon: <Calculator className="h-4 w-4" /> },
    { id: 'unit', name: 'Unit Converter', icon: <Calculator className="h-4 w-4" /> }
  ];

  const toolsPerSlide = 4;
  const totalSlides = Math.ceil(featuredTools.length / toolsPerSlide);

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
    { href: '/', label: 'Home', icon: Home },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/financial-suite', label: 'Financial Suite', icon: DollarSign },
    { href: '/all-tools', label: 'All Tools', icon: Calculator }
  ];

  const isActive = (path: string) => {
    return location === path || (path !== '/' && location.startsWith(path));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const unreadCount = mockNotifications.filter(n => n.unread).length;

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
                
                {/* Notifications */}
                <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-5 text-xs bg-red-500 text-white">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Notifications</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-80">
                      <div className="space-y-3">
                        {mockNotifications.map((notification) => (
                          <Card key={notification.id} className={`p-3 ${notification.unread ? 'bg-blue-50 dark:bg-blue-950' : ''}`}>
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-600' : 'bg-gray-300'}`} />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>

                {/* Saved Tools */}
                <Dialog open={savedToolsOpen} onOpenChange={setSavedToolsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Saved Tools</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-80">
                      <div className="space-y-3">
                        {mockSavedTools.map((tool) => (
                          <Card key={tool.id} className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{tool.name}</h4>
                                <p className="text-xs text-muted-foreground">{tool.category} • {tool.lastUsed}</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Settings */}
              <SettingsDialog />

              {/* Profile */}
              <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        JD
                      </div>
                      <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                      </div>
                    </div>

                    {/* Profile Actions */}
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <Edit className="h-4 w-4 mr-3" />
                        Edit Profile
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-3" />
                        Privacy & Security
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <CreditCard className="h-4 w-4 mr-3" />
                        Billing & Subscription
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-3" />
                        Export Data
                      </Button>
                      <Separator />
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700">
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

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

        {/* Featured Tools Slider */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2">
              <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                <Calculator className="h-3 w-3" />
                <span>Featured Tools:</span>
              </div>
              
              <div className="relative">
                {/* Mobile View - Horizontal Scroll */}
                <div className="md:hidden">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {featuredTools.map((tool) => (
                      <Link key={tool.id} href={`/calculator/${tool.id}`} className="flex-shrink-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 h-7 px-3 whitespace-nowrap"
                        >
                          {tool.icon}
                          <span className="ml-1">{tool.name.split(' ')[0]}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Desktop View - Controlled Slider */}
                <div className="hidden md:block">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    
                    <div className="flex-1 overflow-hidden">
                      <div 
                        className="flex transition-transform duration-300 ease-in-out gap-2"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {Array.from({ length: totalSlides }, (_, slideIndex) => (
                          <div key={slideIndex} className="flex gap-2 min-w-full">
                            {featuredTools
                              .slice(slideIndex * toolsPerSlide, (slideIndex + 1) * toolsPerSlide)
                              .map((tool) => (
                                <Link key={tool.id} href={`/calculator/${tool.id}`} className="flex-1">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 h-7"
                                  >
                                    {tool.icon}
                                    <span className="ml-1 truncate text-[10px]">{tool.name}</span>
                                  </Button>
                                </Link>
                              ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={nextSlide}
                      disabled={currentSlide === totalSlides - 1}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {/* Slider Indicators */}
                  <div className="flex justify-center mt-1 space-x-1">
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>
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
                    </Button>
                  </Link>
                );
              })}
              
              <Separator className="my-4" />
              
              <Button variant="ghost" className="w-full justify-start" onClick={() => {setNotificationOpen(true); setMobileMenuOpen(false);}}>
                <Bell className="h-4 w-4 mr-3" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-auto">{unreadCount}</Badge>
                )}
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => {setSavedToolsOpen(true); setMobileMenuOpen(false);}}>
                <Bookmark className="h-4 w-4 mr-3" />
                Saved Tools
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => {setProfileOpen(true); setMobileMenuOpen(false);}}>
                <User className="h-4 w-4 mr-3" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
