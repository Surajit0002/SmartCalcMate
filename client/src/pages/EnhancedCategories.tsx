import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, Filter, Grid3X3, List, ArrowRight, TrendingUp, Star, Zap,
  Calculator, Heart, Activity, DollarSign, FileText, Image, Video,
  Music, Code, Globe, Cpu, Palette, Shield, Sparkles, Crown,
  BarChart3, Clock, Users, Target, Rocket, Brain, Wand2, 
  Layers, Settings, Play, Download, Upload, Share2, Eye,
  CheckCircle2, Timer, Trophy, Flame, Bookmark, ChevronRight,
  Gauge, Lightbulb, Workflow, Maximize2, Minimize2, RotateCcw,
  RefreshCw, Shuffle, SortAsc, SortDesc, ListFilter, MapPin,
  Compass, Radar, Crosshair, Fingerprint, Zap as Lightning
} from 'lucide-react';
import { categories, calculators } from '@/lib/calculatorData';
import SEOHead from '@/components/SEOHead';

const iconMap = {
  'fa-chart-line': DollarSign,
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
  'fa-tools': Settings,
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

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
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

export default function EnhancedCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'rating' | 'difficulty'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'featured' | 'new' | 'pro' | 'popular'>('all');

  const filteredAndSortedTools = useMemo(() => {
    let filtered = calculators;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filter by special attributes
    if (filterBy !== 'all') {
      filtered = filtered.filter(tool => {
        switch (filterBy) {
          case 'featured': return tool.featured;
          case 'new': return tool.isNew;
          case 'pro': return tool.isPro;
          case 'popular': return tool.isPopular;
          default: return true;
        }
      });
    }

    // Sort tools
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'difficulty':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'advanced': 3 };
          return (difficultyOrder[a.difficulty || 'medium'] || 2) - (difficultyOrder[b.difficulty || 'medium'] || 2);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, filterBy]);

  const stats = {
    totalTools: calculators.length,
    totalCategories: categories.length,
    featuredTools: calculators.filter(c => c.featured).length,
    newTools: calculators.filter(c => c.isNew).length,
    proTools: calculators.filter(c => c.isPro).length,
    popularTools: calculators.filter(c => c.isPopular).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="All Calculator Categories - Professional Tool Suite | CalcMate Pro"
        description="Browse 165+ professional calculators and converters across 12 categories including finance, health, math, file conversion, and AI-powered tools."
        keywords="calculator categories, tool categories, financial calculators, unit converters, file converters, AI tools"
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Layers className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Tool Categories
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover {stats.totalTools}+ professional calculators and converters organized across {stats.totalCategories} specialized categories
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalTools}</div>
              <div className="text-sm text-gray-600">Total Tools</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalCategories}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.featuredTools}</div>
              <div className="text-sm text-gray-600">Featured</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.newTools}</div>
              <div className="text-sm text-gray-600">New Tools</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.proTools}</div>
              <div className="text-sm text-gray-600">Pro Tools</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.popularTools}</div>
              <div className="text-sm text-gray-600">Popular</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs defaultValue="categories" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">By Categories</TabsTrigger>
            <TabsTrigger value="tools">All Tools</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${category.gradient}`}></div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white group-hover:scale-110 transition-transform`}>
                          {getIcon(category.icon)}
                        </div>
                        <div className="flex gap-2">
                          {category.trending && (
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {category.isPopular && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              <Flame className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-sm">
                            {category.calculators.length} Tools
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                          Explore
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* All Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            {/* Filters and Search */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search tools, categories, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/80"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40 bg-white/80">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filterBy} onValueChange={setFilterBy}>
                      <SelectTrigger className="w-32 bg-white/80">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tools</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32 bg-white/80">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex border rounded-md bg-white/80">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {filteredAndSortedTools.length} of {calculators.length} tools
              </p>
            </div>

            {/* Tools Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
            }>
              {filteredAndSortedTools.map((tool) => (
                <Link key={tool.id} href={`/calculator/${tool.id}`}>
                  <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <CardHeader className={`pb-3 ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                            {getIcon(tool.icon)}
                          </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                              {tool.name}
                            </CardTitle>
                            {tool.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                {getRatingStars(tool.rating)}
                                <span className="text-sm text-gray-500 ml-1">
                                  {tool.rating.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          {tool.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {tool.isNew && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <Sparkles className="w-3 h-3 mr-1" />
                              New
                            </Badge>
                          )}
                          {tool.isPro && (
                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                              <Crown className="w-3 h-3 mr-1" />
                              Pro
                            </Badge>
                          )}
                          {tool.isPopular && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              <Flame className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className={viewMode === 'list' ? 'flex-1' : ''}>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categories.find(c => c.id === tool.category)?.name}
                          </Badge>
                          {tool.difficulty && (
                            <Badge className={`text-xs ${getDifficultyColor(tool.difficulty)}`}>
                              {tool.difficulty}
                            </Badge>
                          )}
                        </div>
                        {tool.estimatedTime && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Timer className="w-3 h-3 mr-1" />
                            {tool.estimatedTime}
                          </div>
                        )}
                      </div>
                      {tool.usageCount && (
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Users className="w-3 h-3 mr-1" />
                          {tool.usageCount.toLocaleString()} users
                        </div>
                      )}
                      <Button 
                        size="sm" 
                        className="w-full group-hover:bg-blue-600 transition-colors"
                      >
                        Open Tool
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredAndSortedTools.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tools found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}