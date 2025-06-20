import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calculator, TrendingUp, Heart, Activity, Beaker, Shuffle, Star, Users } from 'lucide-react';
import { categories, calculators } from '@/lib/calculatorData';
import { useI18n } from '@/hooks/useI18n';
import SEOHead from '@/components/SEOHead';

const categoryIcons = {
  financial: TrendingUp,
  health: Heart,
  mathematical: Calculator,
  utility: Shuffle,
  conversion: Activity,
  scientific: Beaker,
};

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { language } = useI18n();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="Calculator Categories - CalcMate Pro"
        description="Browse our comprehensive collection of calculator categories including financial, health, mathematical, and utility calculators"
        keywords="calculator categories, financial calculators, health calculators, math tools"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-bold mb-4 animate-bounce">
            <Star className="h-4 w-4 text-yellow-500" />
            Most Popular Categories
            <TrendingUp className="h-4 w-4" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trending Calculator Categories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join 2.5M+ users exploring our viral calculator collection. 
            <span className="font-bold text-blue-600 dark:text-blue-400">15+ categories</span> trending worldwide
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>25K+ calculations today</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>12.5K users online now</span>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search trending calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 focus:border-purple-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              🔥 Hot searches
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {searchQuery === '' && selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => {
                const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Calculator;
                return (
                  <Link key={category.id} href={`/category/${category.id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-700">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {category.calculators.length} calculators
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {category.description}
                        </CardDescription>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {category.calculators.slice(0, 3).map((calc) => (
                            <Badge key={calc.id} variant="outline" className="text-xs">
                              {calc.name}
                            </Badge>
                          ))}
                          {category.calculators.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.calculators.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory === 'all' ? 'All Calculators' : `${categories.find(c => c.id === selectedCategory)?.name} Calculators`}
            <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
              ({filteredCalculators.length})
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCalculators.map((calculator) => {
              const category = categories.find(c => c.id === calculator.category);
              return (
                <Link key={calculator.id} href={`/calculator/${calculator.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{calculator.icon}</span>
                          {calculator.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${category?.color || 'bg-gray-500'} text-white`}
                        >
                          {category?.name}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {calculator.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm line-clamp-2">
                        {calculator.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No calculators found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}