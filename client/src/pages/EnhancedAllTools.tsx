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
  Search, Grid3X3, List, ArrowRight, Star, TrendingUp, Crown,
  Calculator, Clock, Users, Target, Flame, Sparkles, Timer,
  Filter, SortAsc, BarChart3, Eye, Award, Zap, Shield,
  CheckCircle2, Lightbulb, Workflow, MapPin, Compass, Radar,
  Crosshair, Fingerprint, RefreshCw, Shuffle, ListFilter,
  Heart, Code, Globe, Settings, FileText, Video, Brain
} from 'lucide-react';
import { categories, calculators } from '@/lib/calculatorData';
import { getCardStyles } from '@/lib/cardColors';
import ToolPopupModal from '@/components/ToolPopupModal';
import SEOHead from '@/components/SEOHead';

const iconMap = {
  'fa-chart-line': BarChart3,
  'fa-heartbeat': Heart,
  'fa-square-root-alt': Calculator,
  'fa-calendar-day': Clock,
  'fa-exchange-alt': RefreshCw,
  'fa-file-alt': FileText,
  'fa-video': Video,
  'fa-bitcoin': Target,
  'fa-code': Code,
  'fa-robot': Brain,
  'fa-language': Globe,
  'fa-tools': Settings,
  'fa-piggy-bank': Target,
  'fa-percentage': Target,
  'fa-home': Target,
  'fa-chart-area': BarChart3,
  'fa-balance-scale': Target,
  'fa-weight': Target,
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

export default function EnhancedAllTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'rating' | 'difficulty' | 'category'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'featured' | 'new' | 'pro' | 'popular'>('all');
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(0);

  const handleToolClick = (tool: any, index: number) => {
    setSelectedTool(tool);
    setModalCardIndex(index);
    setIsModalOpen(true);
  };

  const filteredAndSortedTools = useMemo(() => {
    let filtered = calculators;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tool.longDescription?.toLowerCase().includes(searchQuery.toLowerCase())
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
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, filterBy]);

  // Group tools by category for category view
  const toolsByCategory = useMemo(() => {
    const grouped = {};
    filteredAndSortedTools.forEach(tool => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });
    return grouped;
  }, [filteredAndSortedTools]);

  const stats = {
    totalTools: calculators.length,
    totalCategories: categories.length,
    featuredTools: calculators.filter(c => c.featured).length,
    newTools: calculators.filter(c => c.isNew).length,
    proTools: calculators.filter(c => c.isPro).length,
    popularTools: calculators.filter(c => c.isPopular).length,
    totalUsage: calculators.reduce((sum, tool) => sum + (tool.usageCount || 0), 0),
    averageRating: calculators.reduce((sum, tool) => sum + (tool.rating || 0), 0) / calculators.length
  };

  const quickFilters = [
    { id: 'all', label: 'All Tools', count: calculators.length },
    { id: 'featured', label: 'Featured', count: stats.featuredTools },
    { id: 'new', label: 'New', count: stats.newTools },
    { id: 'pro', label: 'Pro', count: stats.proTools },
    { id: 'popular', label: 'Popular', count: stats.popularTools }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="All Tools - Complete Calculator & Converter Suite | CalcMate Pro"
        description="Browse all 165+ professional calculators and converters in one place. Find the perfect tool for your calculations and conversions."
        keywords="all calculators, all tools, calculator suite, converter tools, professional calculators"
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Calculator className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                All Tools
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Complete suite of {stats.totalTools}+ professional calculators and converters across {stats.totalCategories} categories
            </p>
            <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{stats.totalUsage.toLocaleString()} Total Uses</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{stats.averageRating.toFixed(1)} Avg Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{stats.featuredTools} Featured Tools</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {quickFilters.map((filter) => (
            <Card 
              key={filter.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                filterBy === filter.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'bg-white/90 backdrop-blur-sm'
              } border-0 shadow-lg`}
              onClick={() => setFilterBy(filter.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{filter.count}</div>
                <div className="text-sm text-gray-600">{filter.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          {/* All Tools Tab */}
          <TabsContent value="all" className="space-y-6">
            {/* Filters and Search */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, description, tags, or features..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/80"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-44 bg-white/80">
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
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-36 bg-white/80">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
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
                      <Button
                        variant={viewMode === 'compact' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('compact')}
                      >
                        <ListFilter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {filteredAndSortedTools.length} of {calculators.length} tools
              </p>
              <Button variant="outline" size="sm" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterBy('all');
              }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>

            {/* Tools Display */}
            {viewMode === 'compact' ? (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {filteredAndSortedTools.map((tool, index) => {
                      const cardStyles = getCardStyles(index);
                      return (
                        <div 
                          key={tool.id}
                          className={`p-3 rounded-lg border-0 ${cardStyles.cardBg} hover:shadow-lg transition-all cursor-pointer`}
                          onClick={() => handleToolClick(tool, index)}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`p-1 ${cardStyles.iconBg} rounded`}>
                              {getIcon(tool.icon)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate text-white">{tool.name}</div>
                              <div className="text-xs text-white/80 truncate">{tool.description}</div>
                            </div>
                            <div className="flex gap-1">
                              {tool.featured && <Star className="w-3 h-3 text-yellow-300" />}
                              {tool.isNew && <Sparkles className="w-3 h-3 text-green-300" />}
                              {tool.isPro && <Crown className="w-3 h-3 text-orange-300" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }>
                {filteredAndSortedTools.map((tool, index) => {
                  const cardStyles = getCardStyles(index);
                  return (
                    <Card 
                      key={tool.id}
                      className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${cardStyles.cardBg} border-0 shadow-lg ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                      style={{ minHeight: viewMode === 'grid' ? '280px' : 'auto' }}
                      onClick={() => handleToolClick(tool, index)}
                    >
                      <CardHeader className={`pb-3 ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${cardStyles.iconBg} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                              {getIcon(tool.icon)}
                            </div>
                            <div>
                              <CardTitle className="text-lg text-white group-hover:text-yellow-300 transition-colors">
                                {tool.name}
                              </CardTitle>
                              {tool.rating && (
                                <div className="flex items-center gap-1 mt-1">
                                  {getRatingStars(tool.rating)}
                                  <span className="text-sm text-white/80 ml-1">
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
                        <div>
                          <p className={`${cardStyles.textColor} opacity-90 mb-4 line-clamp-3`}>
                            {tool.description}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className={`text-xs ${cardStyles.textColor} border-black/30 bg-black/10`}>
                              {tool.category}
                            </Badge>
                            {tool.usageCount && (
                              <div className={`flex items-center text-xs ${cardStyles.textColor} opacity-70`}>
                                <Users className="w-3 h-3 mr-1" />
                                {tool.usageCount.toLocaleString()}
                              </div>
                            )}
                          </div>

                        <Button 
                          size="sm" 
                          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all"
                        >
                          Open Tool
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

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

          {/* By Category Tab */}
          <TabsContent value="categories" className="space-y-8">
            {Object.entries(toolsByCategory).map(([categoryId, tools]) => {
              const category = categories.find(c => c.id === categoryId);
              if (!category) return null;

              return (
                <Card key={categoryId} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white`}>
                          {getIcon(category.icon)}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{category.name}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                        </div>
                      </div>
                      <Link href={`/category/${categoryId}`}>
                        <Button variant="outline" size="sm">
                          View All
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {tools.slice(0, 8).map((tool, index) => {
                        const cardStyles = getCardStyles(index);
                        return (
                          <div 
                            key={tool.id}
                            className={`p-4 rounded-lg border-0 ${cardStyles.cardBg} hover:shadow-lg transition-all cursor-pointer`}
                            onClick={() => handleToolClick(tool, index)}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`p-1 ${cardStyles.iconBg} rounded`}>
                                {getIcon(tool.icon)}
                              </div>
                              <div className="font-medium text-sm text-white">{tool.name}</div>
                            </div>
                            <div className="text-xs text-white/80 mb-2">{tool.description}</div>
                            <div className="flex items-center gap-1">
                              {tool.featured && <Star className="w-3 h-3 text-yellow-300" />}
                              {tool.isNew && <Sparkles className="w-3 h-3 text-green-300" />}
                              {tool.isPro && <Crown className="w-3 h-3 text-orange-300" />}
                              {tool.isPopular && <Flame className="w-3 h-3 text-red-300" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {tools.length > 8 && (
                      <div className="mt-4 text-center">
                        <Link href={`/category/${categoryId}`}>
                          <Button variant="outline" size="sm">
                            View {tools.length - 8} more tools
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p>Start adding tools to your favorites by clicking the heart icon on any tool</p>
              </div>
              <Link href="/categories">
                <Button>Browse All Tools</Button>
              </Link>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Tool Popup Modal */}
      {selectedTool && (
        <ToolPopupModal
          tool={selectedTool}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cardIndex={modalCardIndex}
        />
      )}
    </div>
  );
}