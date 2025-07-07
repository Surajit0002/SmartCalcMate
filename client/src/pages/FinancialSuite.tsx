
import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, Calculator, TrendingUp, PiggyBank, Building, 
  Percent, CreditCard, Target, BarChart3, Banknote
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const financialTools = [
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Calculate monthly loan payments with detailed breakdown',
    icon: <Calculator className="w-6 h-6" />,
    category: 'Loans',
    popular: true
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    description: 'Systematic Investment Plan returns calculator',
    icon: <PiggyBank className="w-6 h-6" />,
    category: 'Investment',
    popular: true
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest',
    description: 'Calculate compound growth over time',
    icon: <Percent className="w-6 h-6" />,
    category: 'Investment',
    popular: true
  },
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    description: 'Complete home loan analysis and planning',
    icon: <Building className="w-6 h-6" />,
    category: 'Loans',
    popular: true
  },
  {
    id: 'investment',
    name: 'Investment Calculator',
    description: 'Portfolio growth and future value projections',
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'Investment'
  },
  {
    id: 'loan-comparison',
    name: 'Loan Comparison',
    description: 'Compare multiple loan offers side by side',
    icon: <BarChart3 className="w-6 h-6" />,
    category: 'Loans'
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Real-time currency exchange rates',
    icon: <DollarSign className="w-6 h-6" />,
    category: 'Currency'
  },
  {
    id: 'crypto-converter',
    name: 'Crypto Converter',
    description: 'Cryptocurrency conversion and tracking',
    icon: <Banknote className="w-6 h-6" />,
    category: 'Currency'
  }
];

const categories = ['All', 'Investment', 'Loans', 'Currency'];

export default function FinancialSuite() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = selectedCategory === 'All' 
    ? financialTools 
    : financialTools.filter(tool => tool.category === selectedCategory);

  return (
    <>
      <SEOHead 
        title="Financial Suite - Professional Financial Calculators"
        description="Comprehensive financial planning tools including EMI, SIP, investment, and mortgage calculators"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-emerald-900 dark:via-teal-800 dark:to-cyan-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Financial Suite
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
              Professional-grade financial calculators for smart money decisions
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map(tool => (
                <Link key={tool.id} href={`/calculator/${tool.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg group-hover:scale-110 transition-transform">
                          {tool.icon}
                        </div>
                        {tool.popular && (
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-8 px-3">
                          Open →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}
