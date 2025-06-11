
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/calculatorData";
import { Calculator, TrendingUp, Heart, Brain, DollarSign, Activity } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'finance':
        return <DollarSign className="w-8 h-8" />;
      case 'health':
        return <Activity className="w-8 h-8" />;
      case 'math':
        return <Brain className="w-8 h-8" />;
      case 'daily':
        return <Calculator className="w-8 h-8" />;
      default:
        return <Calculator className="w-8 h-8" />;
    }
  };

  const getCategoryGradient = (categoryId: string) => {
    switch (categoryId) {
      case 'finance':
        return 'from-emerald-400 via-teal-500 to-cyan-600';
      case 'health':
        return 'from-rose-400 via-pink-500 to-purple-600';
      case 'math':
        return 'from-blue-400 via-indigo-500 to-purple-600';
      case 'daily':
        return 'from-orange-400 via-amber-500 to-yellow-600';
      default:
        return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium">
                15+ Professional Calculators
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                CalcMate
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
                Your All-in-One Smart Calculator Hub
              </p>
            </div>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              From financial planning to health monitoring, mathematical computations to daily utilities - 
              experience the power of specialized calculators designed for modern life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setLocation('/category/finance')}
              >
                Start Calculating
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Calculator Categories
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our comprehensive collection of specialized calculators, each designed to solve specific problems with precision and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              onClick={() => setLocation(`/category/${category.id}`)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category.id)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${getCategoryGradient(category.id)} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  {getCategoryIcon(category.id)}
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {category.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 pt-0">
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed">
                  {category.id === 'finance' && 'Make informed financial decisions with comprehensive analysis tools'}
                  {category.id === 'health' && 'Monitor and optimize your health with scientific precision'}
                  {category.id === 'math' && 'Solve complex mathematical problems with advanced algorithms'}
                  {category.id === 'daily' && 'Streamline everyday calculations with intuitive interfaces'}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {category.calculators.length} Tools
                  </Badge>
                  <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                >
                  Explore {category.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose CalcMate?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Professional Grade</h3>
              <p className="text-gray-600 dark:text-gray-400">Industry-standard calculations with verified formulas and real-time validation.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">Intuitive interfaces designed for both beginners and professionals.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Advanced Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">Interactive charts and detailed breakdowns for deeper insights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
