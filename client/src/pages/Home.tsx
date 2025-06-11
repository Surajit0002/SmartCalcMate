import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { categories, featuredCalculators } from "@/lib/calculatorData";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Your Daily Calculator Toolkit
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          All the calculators you need for finance, health, education, and daily life - beautifully organized in one place.
        </p>
        
        {/* Mobile Search */}
        <div className="md:hidden mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Find a calculator..."
              className="w-full pl-10"
            />
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.slice(0, 3).map((category) => (
          <Card 
            key={category.id}
            className="category-card cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setLocation(`/category/${category.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`bg-${category.color}-100 dark:bg-${category.color}-900 p-3 rounded-lg`}>
                  <i className={`fas ${category.icon} text-${category.color}-600 dark:text-${category.color}-400 text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.calculators.length} calculators available
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Most Popular Calculators */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Most Popular Calculators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCalculators.map((calculator) => (
            <Card 
              key={calculator.id}
              className="calculator-card cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setLocation(`/calculator/${calculator.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <i className={`fas ${calculator.icon} text-primary`}></i>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{calculator.name}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{calculator.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Start Calculating Now</h3>
        <p className="text-blue-100 mb-6">No login required. Save your results locally or share them instantly.</p>
        <Button 
          className="bg-white text-primary hover:bg-gray-100"
          onClick={() => setLocation("/category/finance")}
        >
          Explore All Calculators
        </Button>
      </div>
    </div>
  );
}
