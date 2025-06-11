
import { Moon, Sun, Calculator, Menu, X, Home, DollarSign, Activity, Brain, Grid3X3, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { useLocation } from "wouter";
import { categories } from "@/lib/calculatorData";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'finance':
        return <DollarSign className="w-5 h-5" />;
      case 'health':
        return <Activity className="w-5 h-5" />;
      case 'math':
        return <Brain className="w-5 h-5" />;
      case 'daily':
        return <Calculator className="w-5 h-5" />;
      default:
        return <Calculator className="w-5 h-5" />;
    }
  };

  const getCategoryGradient = (categoryId: string) => {
    switch (categoryId) {
      case 'finance':
        return 'from-emerald-500 to-teal-600';
      case 'health':
        return 'from-rose-500 to-pink-600';
      case 'math':
        return 'from-blue-500 to-indigo-600';
      case 'daily':
        return 'from-orange-500 to-amber-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setLocation('/')}>
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse-soft"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CalcMate
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Smart Calculator Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => setLocation('/')}
              className={`nav-tab relative ${isActive('/') ? 'active' : ''}`}
            >
              Home
              {isActive('/') && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Button>
            {categories.slice(0, 4).map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => setLocation(`/category/${category.id}`)}
                className={`nav-tab relative ${isActive(`/category/${category.id}`) ? 'active' : ''}`}
              >
                {category.name}
                {isActive(`/category/${category.id}`) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        </div>

      {/* Mobile Slide-out Navigation */}
      <>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Slide-out Menu */}
        <div className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">CalcMate</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Smart Calculator Hub</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="px-6 space-y-2">
                    {/* Home */}
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation('/')}
                      className={`w-full justify-start p-4 h-auto rounded-xl transition-all duration-300 ${
                        isActive('/')
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Home className="w-5 h-5 mr-3" />
                      <span className="font-medium">Home</span>
                    </Button>

                    {/* Categories */}
                    <div className="pt-4">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
                        Categories
                      </h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            variant="ghost"
                            onClick={() => handleNavigation(`/category/${category.id}`)}
                            className={`w-full justify-start p-4 h-auto rounded-xl transition-all duration-300 ${
                              isActive(`/category/${category.id}`)
                                ? `bg-gradient-to-r ${getCategoryGradient(category.id)} text-white shadow-lg`
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                {getCategoryIcon(category.id)}
                                <span className="font-medium ml-3">{category.name}</span>
                              </div>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${
                                  isActive(`/category/${category.id}`)
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                {category.calculators.length}
                              </Badge>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Grid3X3 className="w-4 h-4" />
                      <span className="font-medium">
                        {categories.reduce((total, cat) => total + cat.calculators.length, 0)} Tools
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-medium">Pro Grade</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </header>
  );
}
