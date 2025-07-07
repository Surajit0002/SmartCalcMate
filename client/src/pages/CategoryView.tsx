
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, calculators } from "@/lib/calculatorData";
import { ArrowLeft, Calculator, TrendingUp, Zap, Clock } from "lucide-react";

interface CategoryViewProps {
  params: {
    id: string;
  };
}

export default function CategoryView({ params }: CategoryViewProps) {
  const [, setLocation] = useLocation();
  const category = categories.find(c => c.id === params.id);
  
  // Get calculators for this category
  const categoryCalculators = calculators.filter(calc => calc.category === params.id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-900">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <Calculator className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Category Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">The requested category could not be found. Please check the URL or return to the homepage.</p>
          <Button onClick={() => setLocation('/')} className="bg-blue-600 hover:bg-blue-700 text-white">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

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

  const getCalculatorDescription = (calculatorId: string) => {
    const descriptions = {
      'emi': 'Calculate loan EMI with detailed amortization schedule and interest breakdown',
      'sip': 'Plan systematic investments with compound growth projections and goal tracking',
      'compound-interest': 'Visualize the power of compound interest over time with interactive charts',
      'mortgage': 'Comprehensive mortgage analysis with payment schedules and tax implications',
      'investment': 'Advanced portfolio planning with risk assessment and diversification analysis',
      'loan-comparison': 'Compare multiple loan offers side-by-side to find the best terms',
      'bmi': 'Calculate Body Mass Index with health recommendations and tracking',
      'bmr': 'Determine daily calorie needs based on activity level and fitness goals',
      'scientific': 'Full-featured scientific calculator with advanced mathematical functions',
      'percentage': 'Quick percentage calculations for discounts, taxes, and tips',
      'age': 'Calculate exact age in multiple formats with milestone tracking',
      'tip': 'Split bills and calculate tips with customizable service ratings',
      'unit-converter': 'Convert between units across multiple measurement systems',
      'currency-converter': 'Real-time currency conversion with historical rate charts',
    };
    return descriptions[calculatorId] || 'Professional calculator with advanced features and analysis';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(category.id)} opacity-10`}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Categories
          </Button>
          
          <div className="text-center space-y-6">
            <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${getCategoryGradient(category.id)} flex items-center justify-center shadow-xl`}>
              <Calculator className="w-10 h-10 text-white" />
            </div>
            
            <div className="space-y-4">
              <Badge className={`bg-gradient-to-r ${getCategoryGradient(category.id)} text-white px-4 py-2 text-sm font-medium`}>
                {categoryCalculators.length} Professional Tools
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                {category.name}
              </h1>
            </div>
            
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {category?.description || 'Professional calculators and converters for your needs.'}
            </p>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {categoryCalculators.map((calculator, index) => (
            <Card 
              key={calculator.id}
              className="group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setLocation(`/calculator/${calculator.id}`)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category.id)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(category.id)} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <i className={`fas ${calculator.icon} text-white text-lg`}></i>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Quick
                  </Badge>
                </div>
                
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 leading-tight">
                  {calculator.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 pt-0">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed min-h-[3rem]">
                  {getCalculatorDescription(calculator.id)}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Professional</span>
                  </div>
                  <Zap className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 font-medium"
                >
                  Calculate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
