import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, TrendingUp, Zap, Crown, Star, ArrowRight,
  Search, Users, Award, Globe, Sparkles, Activity,
  BarChart3, DollarSign, FileText, Smartphone, Brain,
  Layers, Target, Clock, CheckCircle2, PlayCircle
} from 'lucide-react';
import { calculators, categories } from '@/lib/calculatorData';
import SEOHead from '@/components/SEOHead';

export default function DynamicHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredCalculators = calculators.filter(c => c.featured).slice(0, 8);
  const newCalculators = calculators.filter(c => c.isNew).slice(0, 6);
  const proCalculators = calculators.filter(c => c.isPro).slice(0, 4);

  const stats = {
    totalTools: calculators.length,
    categories: categories.length,
    dailyUsers: "50,000+",
    calculations: "2M+",
    countries: "180+",
    uptime: "99.9%"
  };

  const categoryHighlights = [
    {
      id: 'finance',
      name: 'Financial Tools',
      description: 'EMI, SIP, Investment calculators with advanced analytics',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-600',
      count: calculators.filter(c => c.category === 'finance').length,
      trending: true
    },
    {
      id: 'unit-converters',
      name: 'Unit Converters',
      description: 'Length, weight, temperature & 40+ conversion tools',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600',
      count: calculators.filter(c => c.category === 'unit-converters').length,
      trending: false
    },
    {
      id: 'file-converters',
      name: 'File Converters',
      description: 'PDF, Excel, Image conversion with batch processing',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-600',
      count: calculators.filter(c => c.category === 'file-converters').length,
      trending: true
    },
    {
      id: 'ai-converters',
      name: 'AI-Powered Tools',
      description: 'OCR, translation, speech processing with ML',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-orange-500 to-red-600',
      count: calculators.filter(c => c.category === 'ai-converters').length,
      trending: true
    }
  ];

  const recentUpdates = [
    { title: 'Enhanced AI OCR Engine', description: 'Improved accuracy for handwritten text', date: '2 days ago', type: 'feature' },
    { title: 'Batch File Processing', description: 'Convert multiple files simultaneously', date: '1 week ago', type: 'feature' },
    { title: 'Dark Mode Optimization', description: 'Better contrast and readability', date: '2 weeks ago', type: 'improvement' },
    { title: 'Mobile App Beta', description: 'iOS and Android apps now available', date: '3 weeks ago', type: 'announcement' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="CalcMate Pro - Advanced Calculator & Converter Hub with 165+ Tools"
        description="Professional calculator suite with 165+ tools including financial calculators, unit converters, file processors, AI-powered tools, and more. Free online calculators for all your needs."
        keywords="calculator, converter, EMI calculator, SIP calculator, unit converter, file converter, AI tools, financial calculator, scientific calculator"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            {/* Main Title */}
            <div className={`space-y-4 transform transition-all duration-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Calculator className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    CalcMate Pro
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                    Advanced Calculator & Converter Ecosystem
                  </p>
                </div>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {stats.totalTools}+ Professional Tools for
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Every Calculation & Conversion
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From financial planning to AI-powered analysis, file conversion to scientific calculations - 
                everything you need in one comprehensive platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link href="/categories">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore All Tools
                </Button>
              </Link>
              <Link href="/calculator/emi">
                <Button size="lg" variant="outline" className="border-2 px-8 py-4 text-lg">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Try Popular EMI Calculator
                </Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className={`max-w-2xl mx-auto transform transition-all duration-1000 delay-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search 165+ calculators and converters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-transparent focus:border-blue-500 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Object.entries(stats).map(([key, value], index) => (
              <div key={key} className={`text-center transform transition-all duration-1000 delay-${index * 100} ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Tool Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover our most powerful and frequently used tool collections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryHighlights.map((category, index) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 bg-gradient-to-br ${category.color} text-white relative overflow-hidden transform delay-${index * 100} ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  {category.trending && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                        <div className="text-white/80 text-sm">{category.count} tools</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-white/90 mb-4">{category.description}</p>
                    <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Explore tools</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                    <div className="h-full bg-white/60 group-hover:bg-white transition-colors" style={{width: `${Math.min(category.count * 8, 100)}%`}}></div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Calculators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Most popular tools used by professionals worldwide
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCalculators.map((calc, index) => (
              <Link key={calc.id} href={`/calculator/${calc.id}`}>
                <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white dark:bg-gray-700 transform delay-${index * 50} ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                        <i className={`fas ${calc.icon} text-blue-600 dark:text-blue-400`}></i>
                      </div>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {calc.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{calc.description}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      <span className="text-sm font-medium">Calculate now</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                What's New in CalcMate Pro
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Stay updated with the latest features, improvements, and tools added to our platform.
              </p>

              <div className="space-y-6">
                {recentUpdates.map((update, index) => (
                  <div key={index} className={`flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transform transition-all duration-500 delay-${index * 100} ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                    <div className={`p-2 rounded-lg ${
                      update.type === 'feature' ? 'bg-green-100 dark:bg-green-900/30' :
                      update.type === 'improvement' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      {update.type === 'feature' ? (
                        <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : update.type === 'improvement' ? (
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{update.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{update.description}</p>
                      <span className="text-xs text-gray-500">{update.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/history">
                  <Button variant="outline" className="gap-2">
                    <Clock className="w-4 h-4" />
                    View Full Changelog
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              {/* New Tools */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      New
                    </Badge>
                    Recently Added Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {newCalculators.map((calc, index) => (
                      <Link key={calc.id} href={`/calculator/${calc.id}`}>
                        <div className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer transform delay-${index * 50} ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                          <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded">
                            <i className={`fas ${calc.icon} text-green-600 dark:text-green-400 text-sm`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{calc.name}</div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">{calc.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pro Tools */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    Pro Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {proCalculators.map((calc, index) => (
                      <Link key={calc.id} href={`/calculator/${calc.id}`}>
                        <div className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer transform delay-${index * 50} ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded">
                            <i className={`fas ${calc.icon} text-yellow-600 dark:text-yellow-400 text-sm`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-2">
                              {calc.name}
                              <Crown className="w-3 h-3 text-yellow-500" />
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">{calc.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Calculations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of professionals who trust CalcMate Pro for accurate, fast calculations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                Start Calculating Now
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}