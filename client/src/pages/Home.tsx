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
  BarChart3,
  Play,
  FileText,
  Image,
  Video,
  Music,
  Code,
  Settings,
  Crown
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
    { icon: Users, label: 'Active Users', value: '5M+', color: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Calculator, label: 'Total Tools', value: `100+`, color: 'text-green-600', gradient: 'from-green-500 to-emerald-500' },
    { icon: Star, label: 'Categories', value: `13`, color: 'text-yellow-600', gradient: 'from-yellow-500 to-orange-500' },
    { icon: Brain, label: 'AI-Powered', value: `25+`, color: 'text-purple-600', gradient: 'from-purple-500 to-pink-500' },
  ];

  const featuredCategories = [
    {
      id: 'finance',
      name: 'Finance & Investment',
      description: 'Professional financial calculations',
      icon: <DollarSign className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-teal-500',
      toolCount: 8,
      tools: ['EMI Calculator', 'SIP Calculator', 'Investment Calculator']
    },
    {
      id: 'converters',
      name: 'File Converters',
      description: 'Transform files between formats',
      icon: <FileText className="w-6 h-6" />,
      gradient: 'from-purple-500 to-indigo-500',
      toolCount: 15,
      tools: ['PDF to Word', 'Image to PDF', 'Video to MP3']
    },
    {
      id: 'ai',
      name: 'AI-Powered Tools',
      description: 'Intelligent automation tools',
      icon: <Brain className="w-6 h-6" />,
      gradient: 'from-cyan-500 to-blue-500',
      toolCount: 7,
      tools: ['OCR Scanner', 'Speech to Text', 'AI Translator']
    },
    {
      id: 'media',
      name: 'Media Processing',
      description: 'Audio, video & image tools',
      icon: <Video className="w-6 h-6" />,
      gradient: 'from-red-500 to-pink-500',
      toolCount: 9,
      tools: ['Video Converter', 'Audio Compressor', 'GIF Maker']
    }
  ];

  const popularTools = [
    { id: 'emi', name: 'EMI Calculator', description: 'Calculate loan EMI with precision', icon: 'fa-calculator', category: 'Finance', gradient: 'from-emerald-500 to-teal-500', isPopular: true },
    { id: 'file-converter', name: 'File Converter Hub', description: 'Convert files between formats', icon: 'fa-exchange-alt', category: 'Converters', gradient: 'from-purple-500 to-indigo-500', isNew: true },
    { id: 'bmi', name: 'BMI Calculator', description: 'Check your body mass index', icon: 'fa-weight', category: 'Health', gradient: 'from-rose-500 to-pink-500', isPopular: true },
    { id: 'currency-converter', name: 'Currency Converter', description: 'Live exchange rates', icon: 'fa-coins', category: 'Finance', gradient: 'from-blue-500 to-cyan-500', isPro: true },
    { id: 'percentage', name: 'Percentage Calculator', description: 'Quick percentage calculations', icon: 'fa-percent', category: 'Math', gradient: 'from-orange-500 to-yellow-500', isPopular: true },
    { id: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions', icon: 'fa-calculator', category: 'Math', gradient: 'from-indigo-500 to-purple-500', isPro: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <Calculator className="w-16 h-16 text-white animate-pulse" />
                <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <h1 className="text-4xl md:text-7xl font-bold">
                CalcMate<span className="text-yellow-400">Pro</span>
              </h1>
            </div>

            <p className="text-xl md:text-3xl max-w-4xl mx-auto font-light">
              Professional Calculator Hub with <span className="font-bold text-yellow-400">100+ Tools</span>, 
              <span className="font-bold text-cyan-400"> AI-Powered</span> Features, and 
              <span className="font-bold text-pink-400"> Lightning-Fast</span> Performance
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link href="/categories">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-2xl font-semibold shadow-2xl">
                  <Rocket className="w-6 h-6 mr-3" />
                  Explore All Tools
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm">
                <Play className="w-6 h-6 mr-3" />
                Watch Demo
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  placeholder="Search calculators, converters, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-6 py-4 text-lg rounded-2xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our most popular tool categories, each packed with professional-grade calculators and converters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category, index) => (
              <Link key={category.id} href={`/categories#${category.id}`}>
                <Card className="group cursor-pointer h-full hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 overflow-hidden">
                  <div className={`bg-gradient-to-br ${category.gradient} p-6 text-white relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <Badge className="bg-white/20 text-white border-0">
                          {category.toolCount} tools
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90 text-sm mb-4">{category.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {category.tools.map((tool, idx) => (
                          <span key={idx} className="text-xs bg-white/20 rounded-full px-2 py-1">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Explore Category
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
                <Star className="h-10 w-10 text-yellow-500" />
                Popular Tools
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Most used tools by our 5M+ community members
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
              <Link href="/categories">
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
                  View All Tools
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {popularTools.map((tool, index) => (
              <Link key={tool.id} href={`/calculator/${tool.id}`}>
                <Card className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 bg-white/70 backdrop-blur-sm h-full ${viewMode === 'list' ? 'flex items-center' : ''}`}>
                  <div className={`bg-gradient-to-br ${tool.gradient} text-white relative overflow-hidden ${viewMode === 'list' ? 'w-32 flex-shrink-0' : ''}`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                    {/* Status Badges */}
                    <div className="absolute top-3 right-3 z-20 flex gap-2">
                      {tool.isNew && (
                        <Badge className="bg-green-400 text-green-900 text-xs font-bold animate-pulse">NEW</Badge>
                      )}
                      {tool.isPro && (
                        <Badge className="bg-yellow-400 text-yellow-900 text-xs font-bold">
                          <Crown className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      )}
                      {tool.isPopular && (
                        <Badge className="bg-orange-400 text-orange-900 text-xs font-bold">🔥</Badge>
                      )}
                    </div>

                    <CardHeader className={`relative z-10 ${viewMode === 'list' ? 'pb-2' : 'pb-4'}`}>
                      <div className={`flex items-center ${viewMode === 'list' ? 'justify-center' : 'justify-between'}`}>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                          <i className={`fas ${tool.icon} text-2xl text-white`}></i>
                        </div>
                      </div>
                      {viewMode === 'grid' && (
                        <CardTitle className="text-xl text-white group-hover:text-yellow-200 transition-colors">
                          {tool.name}
                        </CardTitle>
                      )}
                    </CardHeader>
                  </div>

                  <CardContent className={`bg-white dark:bg-gray-800 ${viewMode === 'list' ? 'flex-1 flex items-center justify-between p-6' : 'p-6'}`}>
                    {viewMode === 'list' && (
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-base mb-3">
                          {tool.description}
                        </CardDescription>
                        <Badge variant="outline">{tool.category}</Badge>
                      </div>
                    )}

                    {viewMode === 'grid' && (
                      <>
                        <CardDescription className="text-base leading-relaxed mb-4">
                          {tool.description}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{tool.category}</Badge>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </>
                    )}

                    {viewMode === 'list' && (
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join millions of professionals using CalcMate for faster, smarter calculations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-2xl font-semibold">
                <Target className="w-6 h-6 mr-3" />
                Start Calculating
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-8 py-4 rounded-2xl font-semibold">
              <Shield className="w-6 h-6 mr-3" />
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}