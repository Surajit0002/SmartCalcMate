
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/calculatorData";
import { 
  Calculator, 
  TrendingUp, 
  Heart, 
  Brain, 
  DollarSign, 
  Activity,
  Home,
  Grid3X3,
  BarChart3
} from "lucide-react";

export default function Navigation() {
  const [location, setLocation] = useLocation();

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'finance':
        return <DollarSign className="w-4 h-4" />;
      case 'health':
        return <Activity className="w-4 h-4" />;
      case 'math':
        return <Brain className="w-4 h-4" />;
      case 'daily':
        return <Calculator className="w-4 h-4" />;
      default:
        return <Calculator className="w-4 h-4" />;
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

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Quick Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLocation('/')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Button>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={isActive(`/category/${category.id}`) ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLocation(`/category/${category.id}`)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 relative ${
                    isActive(`/category/${category.id}`)
                      ? `bg-gradient-to-r ${getCategoryGradient(category.id)} text-white shadow-lg hover:shadow-xl`
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {getCategoryIcon(category.id)}
                  <span className="hidden lg:inline font-medium">{category.name}</span>
                  <span className="sm:hidden lg:hidden text-xs font-medium">{category.name.slice(0, 4)}</span>
                  <Badge 
                    variant="secondary" 
                    className={`ml-1 text-xs ${
                      isActive(`/category/${category.id}`)
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {category.calculators.length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Grid3X3 className="w-4 h-4" />
              <span className="font-medium">
                {categories.reduce((total, cat) => total + cat.calculators.length, 0)} Tools
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium">Professional Grade</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
