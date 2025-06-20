
import { useState, useEffect } from 'react';
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, featuredCalculators, calculators } from "@/lib/calculatorData";
import { useI18n } from "@/hooks/useI18n";
import { 
  Calculator, 
  TrendingUp, 
  Heart, 
  Brain, 
  DollarSign, 
  Activity,
  Zap, 
  Star, 
  Search,
  ArrowRight,
  Users,
  Clock,
  Bookmark,
  Filter,
  Grid,
  List,
  ChevronRight,
  Sparkles,
  Trophy,
  Target,
  Rocket,
  Globe,
  Shield,
  BarChart3
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCalculators, setFilteredCalculators] = useState(calculators);
  const { formatCurrency } = useI18n();

  useEffect(() => {
    let filtered = calculators;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(calc => calc.category.toLowerCase() === activeCategory.toLowerCase());
    }
    
    if (searchQuery) {
      filtered = filtered.filter(calc => 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredCalculators(filtered);
  }, [searchQuery, activeCategory]);

  const stats = [
    { icon: Users, label: 'Active Users', value: '2.5M+', color: 'text-blue-600' },
    { icon: Calculator, label: 'Total Tools', value: `${calculators.length}+`, color: 'text-green-600' },
    { icon: Star, label: 'Categories', value: `${categories.length}`, color: 'text-yellow-600' },
    { icon: Clock, label: 'AI-Powered', value: `${calculators.filter(c => c.isPro).length}`, color: 'text-purple-600' },
  ];

  const quickActions = [
    { icon: '💰', title: 'EMI Calculator', desc: 'Calculate loan EMI', href: '/calculator/emi', popular: true },
    { icon: '🤖', title: 'AI OCR Tool', desc: 'Extract text from images', href: '/calculator/ocr', popular: true, isPro: true },
    { icon: '📁', title: 'PDF Converter', desc: 'Convert PDF files', href: '/calculator/pdf-to-word', popular: true },
    { icon: '🎵', title: 'Video to MP3', desc: 'Extract audio', href: '/calculator/video-to-mp3', popular: false },
    { icon: '🔄', title: 'Unit Converter', desc: 'Advanced conversions', href: '/calculator/length-converter', popular: true },
    { icon: '🌐', title: 'Language Detector', desc: 'AI text analysis', href: '/calculator/language-detector', popular: false },
  ];

  const featureHighlights = [
    {
      title: 'AI-Powered Processing',
      description: 'Advanced artificial intelligence for OCR, speech recognition, and document analysis',
      icon: <Brain className="w-6 h-6" />,
      count: calculators.filter(c => c.category === 'ai-converters').length,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'File Conversion Hub',
      description: 'Convert between PDF, Word, Excel, and 15+ other formats with precision',
      icon: <Zap className="w-6 h-6" />,
      count: calculators.filter(c => c.category === 'file-converters').length,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Media Processing',
      description: 'Professional video, audio, and image conversion with quality controls',
      icon: <Sparkles className="w-6 h-6" />,
      count: calculators.filter(c => c.category === 'media-converters').length,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Advanced Analytics',
      description: 'Comprehensive financial planning and mathematical computation tools',
      icon: <BarChart3 className="w-6 h-6" />,
      count: calculators.filter(c => c.category === 'finance').length,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
        <div className="relative section-container section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <Calculator className="h-20 w-20 text-white mr-6 animate-pulse" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-bold mb-2">
                  CalcMate
                </h1>
                <p className="text-xl md:text-2xl text-blue-100">
                  Professional Calculator Hub
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-bold mb-4 animate-bounce">
                <Star className="h-4 w-4" />
                #1 Calculator Hub 2024
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
              Join over <span className="font-bold text-yellow-300">2.5 million users</span> using the world's most popular calculator platform. 
              Professional tools with AI-powered insights and real-time data.
            </p>
            
            <div className="flex items-center justify-center gap-6 mb-8 text-blue-100">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium">10,000+ users online now</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Live community support
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/calculator/emi">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Calculating
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg">
                  <Target className="mr-2 h-5 w-5" />
                  Explore Tools
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-white" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Calculators */}
      <section className="section-container py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-bold mb-4 animate-pulse">
            <TrendingUp className="h-4 w-4" />
            Trending Now
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Most Viral Calculators</h2>
          <p className="text-muted-foreground text-lg">Join millions using these trending calculation tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={action.title} href={action.href}>
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border-2 hover:border-blue-500 transform hover:scale-105">
                {action.popular && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-bounce shadow-lg">
                      <Trophy className="h-3 w-3 mr-1" />
                      🔥 Viral
                    </Badge>
                  </div>
                )}
                {index === 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                      #1 Most Used
                    </Badge>
                  </div>
                )}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                    {action.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {action.desc}
                  </CardDescription>
                  {action.popular && (
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                      <Users className="h-3 w-3" />
                      <span className="font-semibold">{index === 0 ? '500K+' : index === 1 ? '350K+' : '200K+'} daily users</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="ghost" className="group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/20 dark:group-hover:to-purple-900/20 font-semibold">
                    Try Now - It's Free!
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Social Proof Banner */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-3 border-white flex items-center justify-center text-white font-bold text-xs">
                  👤
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-gray-900 dark:text-white">2.5M+ Calculator Pros</div>
              <div className="text-sm text-green-600 dark:text-green-400 font-semibold">⭐ Rated #1 Calculator Platform</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
              <Shield className="h-4 w-4" />
              <span className="font-semibold">100% Secure & Private</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
              <Zap className="h-4 w-4" />
              <span className="font-semibold">Lightning Fast Results</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-700 dark:text-purple-300">
              <Star className="h-4 w-4" />
              <span className="font-semibold">4.9/5 User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="section-container py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-bold mb-4">
            <Sparkles className="h-4 w-4" />
            Advanced Capabilities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Tool Ecosystem</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            From AI-powered processing to professional-grade conversions, discover our complete suite of advanced tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureHighlights.map((feature, index) => (
            <Card key={feature.title} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-800 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className="text-sm font-bold">
                    {feature.count} Tools
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Professional-grade processing
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-500" />
                Featured Calculators
              </h2>
              <p className="text-muted-foreground text-lg">
                Most popular and frequently used calculators by our community
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Link href="/calculators">
                <Button variant="outline">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="financial">Finance</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="mathematical">Math</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredCalculators.slice(0, 8).map((calculator) => (
              <Link key={calculator.id} href={`/calculator/${calculator.id}`}>
                <Card className={`calculator-card group ${viewMode === 'list' ? 'flex items-center' : ''}`}>
                  <CardHeader className={viewMode === 'list' ? 'flex-row items-center space-y-0 pb-2' : 'pb-4'}>
                    <div className={`flex items-center ${viewMode === 'list' ? 'gap-4' : 'justify-between'}`}>
                      <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                        <i className={`fas ${calculator.icon} text-blue-600 dark:text-blue-400`}></i>
                      </div>
                      {viewMode === 'grid' && (
                        <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-300">
                          {calculator.category}
                        </Badge>
                      )}
                    </div>
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {calculator.name}
                      </CardTitle>
                      {viewMode === 'list' && (
                        <Badge variant="outline" className="mt-1">
                          {calculator.category}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className={viewMode === 'list' ? 'flex-1' : ''}>
                    <CardDescription className={`leading-relaxed ${viewMode === 'list' ? 'text-sm' : 'text-base'}`}>
                      {calculator.description}
                    </CardDescription>
                    {calculator.featured && (
                      <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="section-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculator Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organized collections of calculators for specific domains and professional use cases
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="category-card group h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${getCategoryGradient(category.id)} text-white text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {getCategoryIcon(category.id)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.id === 'finance' && 'Make informed financial decisions with comprehensive analysis tools'}
                        {category.id === 'health' && 'Monitor and optimize your health with scientific precision'}
                        {category.id === 'math' && 'Solve complex mathematical problems with advanced algorithms'}
                        {category.id === 'daily' && 'Streamline everyday calculations with intuitive interfaces'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.calculators.slice(0, 4).map((calc) => (
                      <Badge key={calc.id} variant="outline" className="text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        {calc.icon} {calc.name}
                      </Badge>
                    ))}
                    {category.calculators.length > 4 && (
                      <Badge variant="outline" className="text-sm bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                        +{category.calculators.length - 4} more tools
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {category.calculators.length} calculators
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose CalcMate?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted by professionals and individuals worldwide for accurate calculations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Professional Grade</h3>
              <p className="text-muted-foreground">Industry-standard calculations with verified formulas and real-time validation for accuracy you can trust.</p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">User Friendly</h3>
              <p className="text-muted-foreground">Intuitive interfaces designed for both beginners and professionals with step-by-step guidance.</p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              <p className="text-muted-foreground">Interactive charts and detailed breakdowns for deeper insights into your calculations.</p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Multi-Language</h3>
              <p className="text-muted-foreground">Available in multiple languages with automatic currency conversion for global users.</p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground">Your data stays private with client-side calculations and no data collection.</p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">Instant calculations with real-time results and responsive design for all devices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
