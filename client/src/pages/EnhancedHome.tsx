import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, TrendingUp, Zap, Crown, Star, ArrowRight, Search, 
  Users, Award, Globe, Sparkles, Activity, BarChart3, DollarSign, 
  FileText, Smartphone, Brain, Layers, Target, Clock, CheckCircle2, 
  PlayCircle, Heart, Code, Video, Music, Palette, Shield, 
  Lightbulb, Workflow, Gauge, Timer, Trophy, Flame, Bookmark,
  ChevronRight, Eye, Download, Upload, Share2, MapPin, Compass,
  Radar, Crosshair, Fingerprint, RefreshCw, Shuffle, ListFilter
} from 'lucide-react';
import { categories, calculators } from '@/lib/calculatorData';
import { getCardStyles } from '@/lib/cardColors';
import SEOHead from '@/components/SEOHead';

const iconMap = {
  'fa-chart-line': BarChart3,
  'fa-heartbeat': Heart,
  'fa-square-root-alt': Calculator,
  'fa-calendar-day': Clock,
  'fa-exchange-alt': RefreshCw,
  'fa-file-alt': FileText,
  'fa-video': Video,
  'fa-bitcoin': DollarSign,
  'fa-code': Code,
  'fa-robot': Brain,
  'fa-language': Globe,
  'fa-tools': Shield,
  'fa-piggy-bank': DollarSign,
  'fa-percentage': Target,
  'fa-home': Target,
  'fa-chart-area': BarChart3,
  'fa-balance-scale': Gauge,
  'fa-weight': Gauge,
  'fa-fire': Flame,
  'fa-birthday-cake': Timer,
  'fa-calculator': Calculator,
  'fa-percent': Target,
  'fa-receipt': FileText,
  'fa-key': Shield,
  'fa-chart-pie': BarChart3,
  'fa-file-invoice-dollar': FileText
};

const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || Calculator;
  return <IconComponent className="w-5 h-5" />;
};

const getRatingStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating || 0);
  const hasHalfStar = (rating || 0) % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
  }

  if (hasHalfStar) {
    stars.push(<Star key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />);
  }

  return stars;
};

export default function EnhancedHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get real data from calculatorData
  const featuredCalculators = calculators.filter(c => c.featured);
  const newCalculators = calculators.filter(c => c.isNew);
  const popularCalculators = calculators.filter(c => c.isPopular);
  const proCalculators = calculators.filter(c => c.isPro);

  // Calculate real statistics
  const stats = {
    totalTools: calculators.length,
    totalCategories: categories.length,
    dailyUsers: "125,000+",
    calculations: "2.5M+",
    countries: "195+",
    uptime: "99.9%",
    totalUsage: calculators.reduce((sum, tool) => sum + (tool.usageCount || 0), 0),
    averageRating: calculators.reduce((sum, tool) => sum + (tool.rating || 0), 0) / calculators.length,
    featuredCount: featuredCalculators.length,
    newCount: newCalculators.length,
    popularCount: popularCalculators.length,
    proCount: proCalculators.length
  };

  // Get trending categories (categories with trending: true)
  const trendingCategories = categories.filter(cat => cat.trending);
  const popularCategories = categories.filter(cat => cat.isPopular);

  const searchResults = searchQuery.length > 0 ? 
    calculators.filter(calc => 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 6) : [];

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
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search 165+ tools: EMI, SIP, File Converter, AI Tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-xl focus:shadow-2xl transition-shadow"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear
                  </Button>
                )}
              </div>
              {searchResults.length > 0 && (
                <Card className="mt-4 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {searchResults.map((result) => (
                        <Link key={result.id} href={`/calculator/${result.id}`}>
                          <div className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-colors">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                              {getIcon(result.icon)}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{result.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">{result.description}</div>
                            </div>
                            <div className="flex gap-1">
                              {result.featured && <Star className="w-4 h-4 text-yellow-500" />}
                              {result.isNew && <Sparkles className="w-4 h-4 text-green-500" />}
                              {result.isPro && <Crown className="w-4 h-4 text-orange-500" />}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalTools}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.dailyUsers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Daily Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.calculations}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Calculations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.countries}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">{stats.uptime}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="featured" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Featured ({stats.featuredCount})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({stats.totalCategories})</TabsTrigger>
            <TabsTrigger value="popular">Popular ({stats.popularCount})</TabsTrigger>
            <TabsTrigger value="new">New ({stats.newCount})</TabsTrigger>
          </TabsList>

          {/* Featured Tools */}
          <TabsContent value="featured" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our most popular and highly-rated tools, hand-picked for their accuracy and usefulness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredCalculators.map((tool, index) => {
                const cardStyles = getCardStyles(index);
                return (
                  <Link key={tool.id} href={`/calculator/${tool.id}`}>
                    <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${cardStyles.cardBg} border-0 shadow-lg`} style={{ minHeight: '280px' }}>
                      <CardHeader className="pb-3 h-24">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${cardStyles.iconBg} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                              {getIcon(tool.icon)}
                            </div>
                            <div>
                              <CardTitle className="text-lg text-black group-hover:text-gray-800 transition-colors">
                                {tool.name}
                              </CardTitle>
                              {tool.rating && (
                                <div className="flex items-center gap-1 mt-1">
                                  {getRatingStars(tool.rating)}
                                  <span className="text-sm text-black opacity-80 ml-1">
                                    {tool.rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col justify-between" style={{ minHeight: '156px' }}>
                        <div>
                          <p className="text-black opacity-90 mb-4 line-clamp-3">
                            {tool.description}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs text-black border-black/30 bg-black/10">
                              {categories.find(c => c.id === tool.category)?.name}
                            </Badge>
                            {tool.usageCount && (
                              <div className="flex items-center text-xs text-white/80">
                                <Users className="w-3 h-3 mr-1" />
                                {tool.usageCount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-colors">
                          Open Tool
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          {/* Categories */}
          <TabsContent value="categories" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Tool Categories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Explore our comprehensive collection of tools organized by category
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const cardStyles = getCardStyles(index + 5); // Offset for different colors
                return (
                  <Link key={category.id} href={`/category/${category.id}`}>
                    <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${cardStyles.cardBg} border-0 shadow-lg`} style={{ minHeight: '320px' }}>
                      <div className={`h-2 ${cardStyles.iconBg}`}></div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-3 rounded-xl ${cardStyles.iconBg} text-white group-hover:scale-110 transition-transform`}>
                            {getIcon(category.icon)}
                          </div>
                          <div className="flex gap-2">
                            {category.trending && (
                              <Badge className="bg-orange-400 text-orange-900 hover:bg-orange-300">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {category.isPopular && (
                              <Badge className="bg-blue-400 text-blue-900 hover:bg-blue-300">
                                <Flame className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-xl text-black group-hover:text-gray-800 transition-colors">
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-black opacity-90 mb-4">
                          {category.description}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-sm text-black border-black/30 bg-black/10">
                            {category.calculators.length} Tools
                          </Badge>
                          <div className="flex items-center text-sm text-white/80">
                            <Users className="w-4 h-4 mr-1" />
                            {category.calculators.reduce((sum, tool) => sum + (tool.usageCount || 0), 0).toLocaleString()}
                          </div>
                        </div>

                        {/* Show top 3 tools in category */}
                        <div className="space-y-2 mb-4">
                          {category.calculators.slice(0, 3).map((tool) => (
                            <div key={tool.id} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                              <span className="text-white/90">{tool.name}</span>
                              {tool.featured && <Star className="w-3 h-3 text-yellow-400" />}
                            </div>
                          ))}
                          {category.calculators.length > 3 && (
                            <div className="text-sm text-white/60">
                              +{category.calculators.length - 3} more tools
                            </div>
                          )}
                        </div>

                        <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-colors">
                          Explore Category
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          {/* Popular Tools */}
          <TabsContent value="popular" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Most used tools by our community of {stats.dailyUsers} daily users
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularCalculators.map((tool, index) => {
                const cardStyles = getCardStyles(index + 10); // Offset for different colors
                return (
                  <Link key={tool.id} href={`/calculator/${tool.id}`}>
                    <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${cardStyles.cardBg} border-0 shadow-lg`} style={{ minHeight: '280px' }}>
                      <CardHeader className="pb-3 h-24">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${cardStyles.iconBg} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                              {getIcon(tool.icon)}
                            </div>
                            <div>
                              <CardTitle className="text-lg text-black group-hover:text-gray-800 transition-colors">
                                {tool.name}
                              </CardTitle>
                              {tool.rating && (
                                <div className="flex items-center gap-1 mt-1">
                                  {getRatingStars(tool.rating)}
                                  <span className="text-sm text-black opacity-80 ml-1">
                                    {tool.rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge className="bg-red-400 text-red-900 hover:bg-red-300">
                            <Flame className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col justify-between" style={{ minHeight: '156px' }}>
                        <div>
                          <p className="text-black opacity-90 mb-4 line-clamp-3">
                            {tool.description}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs text-black border-black/30 bg-black/10">
                              {categories.find(c => c.id === tool.category)?.name}
                            </Badge>
                            {tool.usageCount && (
                              <div className="flex items-center text-xs text-white/80">
                                <Users className="w-3 h-3 mr-1" />
                                {tool.usageCount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-colors">
                          Open Tool
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          {/* New Tools */}
          <TabsContent value="new" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                New Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Recently added tools with the latest features and improvements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newCalculators.map((tool, index) => {
                const cardStyles = getCardStyles(index + 15); // Offset for different colors
                return (
                  <Link key={tool.id} href={`/calculator/${tool.id}`}>
                    <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${cardStyles.cardBg} border-0 shadow-lg`} style={{ minHeight: '280px' }}>
                      <CardHeader className="pb-3 h-24">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${cardStyles.iconBg} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                              {getIcon(tool.icon)}
                            </div>
                            <div>
                              <CardTitle className="text-lg text-black group-hover:text-gray-800 transition-colors">
                                {tool.name}
                              </CardTitle>
                              {tool.rating && (
                                <div className="flex items-center gap-1 mt-1">
                                  {getRatingStars(tool.rating)}
                                  <span className="text-sm text-black opacity-80 ml-1">
                                    {tool.rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge className="bg-green-400 text-green-900 hover:bg-green-300">
                            <Sparkles className="w-3 h-3 mr-1" />
                            New
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col justify-between" style={{ minHeight: '156px' }}>
                        <div>
                          <p className="text-black opacity-90 mb-4 line-clamp-3">
                            {tool.description}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs text-black border-black/30 bg-black/10">
                              {categories.find(c => c.id === tool.category)?.name}
                            </Badge>
                            {tool.usageCount && (
                              <div className="flex items-center text-xs text-white/80">
                                <Users className="w-3 h-3 mr-1" />
                                {tool.usageCount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <Button size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-colors">
                          Try Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/categories">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center justify-center gap-3">
                  <Layers className="w-6 h-6 text-blue-600" />
                  <span className="text-lg font-semibold">Browse All Categories</span>
                </div>
              </Card>
            </Link>
            <Link href="/all-tools">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center justify-center gap-3">
                  <Calculator className="w-6 h-6 text-purple-600" />
                  <span className="text-lg font-semibold">View All Tools</span>
                </div>
              </Card>
            </Link>
            <Link href="/favorites">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center justify-center gap-3">
                  <Heart className="w-6 h-6 text-red-600" />
                  <span className="text-lg font-semibold">My Favorites</span>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}