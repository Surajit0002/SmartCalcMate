import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, Grid3X3, List, ArrowRight, Star, TrendingUp, Crown,
  Calculator, Clock, Users, Target, Flame, Sparkles, Timer,
  ChevronLeft, Filter, SortAsc, CheckCircle2, Award, Zap,
  BarChart3, Eye, Download, Share2, Bookmark, Heart, Shield
} from 'lucide-react';
import { getCategoryById, calculators } from '@/lib/calculatorData';
import { getCardStyles } from '@/lib/cardColors';
import SimpleToolModal from '@/components/SimpleToolModal';
import SEOHead from '@/components/SEOHead';

interface EnhancedCategoryViewProps {
  params: {
    id: string;
  };
}

const iconMap = {
  'fa-chart-line': BarChart3,
  'fa-heartbeat': Heart,
  'fa-square-root-alt': Calculator,
  'fa-calendar-day': Clock,
  'fa-exchange-alt': Target,
  'fa-file-alt': Target,
  'fa-video': Target,
  'fa-bitcoin': Target,
  'fa-code': Target,
  'fa-robot': Target,
  'fa-language': Target,
  'fa-tools': Target,
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
  'fa-receipt': Target,
  'fa-key': Shield,
  'fa-chart-pie': BarChart3,
  'fa-file-invoice-dollar': Target
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

export default function EnhancedCategoryView({ params }: EnhancedCategoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'rating' | 'difficulty'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'featured' | 'new' | 'pro' | 'popular'>('all');
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(0);

  const category = getCategoryById(params.id);
  const categoryTools = calculators.filter(tool => tool.category === params.id);

  const handleToolClick = (tool: any, index: number) => {
    setSelectedTool(tool);
    setModalCardIndex(index);
    setIsModalOpen(true);
  };

  const filteredAndSortedTools = useMemo(() => {
    let filtered = categoryTools;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
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
  }, [searchQuery, sortBy, filterBy, categoryTools]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-gray-400 mb-4">
            <Calculator className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Category Not Found</h3>
            <p className="mb-4">The requested category could not be found.</p>
            <Link href="/categories">
              <Button>Browse All Categories</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const categoryStats = {
    totalTools: categoryTools.length,
    featuredTools: categoryTools.filter(t => t.featured).length,
    newTools: categoryTools.filter(t => t.isNew).length,
    proTools: categoryTools.filter(t => t.isPro).length,
    popularTools: categoryTools.filter(t => t.isPopular).length,
    averageRating: categoryTools.reduce((sum, tool) => sum + (tool.rating || 0), 0) / categoryTools.length,
    totalUsage: categoryTools.reduce((sum, tool) => sum + (tool.usageCount || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title={`${category.name} - Professional Calculator Tools | CalcMate Pro`}
        description={`${category.description} - ${categoryTools.length} professional tools available.`}
        keywords={`${category.name}, calculators, tools, ${category.name.toLowerCase()}`}
      />

      {/* Header Section */}
      <div className={`bg-gradient-to-r ${category.gradient} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/categories">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Categories
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl">
                {getIcon(category.icon)}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {category.name}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                <span>{categoryStats.totalTools} Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{categoryStats.totalUsage.toLocaleString()} Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>{categoryStats.averageRating.toFixed(1)} Rating</span>
              </div>
              {category.trending && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{categoryStats.totalTools}</div>
              <div className="text-sm text-gray-600">Total Tools</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{categoryStats.featuredTools}</div>
              <div className="text-sm text-gray-600">Featured</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{categoryStats.newTools}</div>
              <div className="text-sm text-gray-600">New</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{categoryStats.proTools}</div>
              <div className="text-sm text-gray-600">Pro</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{categoryStats.popularTools}</div>
              <div className="text-sm text-gray-600">Popular</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Filters and Search */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tools in this category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
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
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredAndSortedTools.length} of {categoryTools.length} tools in {category.name}
          </p>
        </div>

        {/* Tools Grid/List */}
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
                  <p className="text-black opacity-90 mb-4">
                    {tool.description}
                  </p>
                  
                  {tool.features && tool.features.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Key Features:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {tool.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{tool.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {tool.difficulty && (
                        <Badge className={`text-xs ${getDifficultyColor(tool.difficulty)}`}>
                          {tool.difficulty}
                        </Badge>
                      )}
                      {tool.estimatedTime && (
                        <div className="flex items-center text-xs text-white/70">
                          <Timer className="w-3 h-3 mr-1" />
                          {tool.estimatedTime}
                        </div>
                      )}
                    </div>
                  </div>

                  {tool.usageCount && (
                    <div className="flex items-center text-xs text-black opacity-70 mb-3">
                      <Users className="w-3 h-3 mr-1" />
                      {tool.usageCount.toLocaleString()} users
                    </div>
                  )}

                  <Button 
                    size="sm" 
                    className="w-full bg-black/20 hover:bg-black/30 text-black border-black/30 transition-all"
                  >
                    Open Tool
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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

        {/* Category Features */}
        {categoryTools.length > 0 && (
          <Card className="mt-12 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Why Choose {category.name}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-br ${category.gradient} rounded-lg text-white`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Professional Quality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Industry-standard calculations with verified accuracy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-br ${category.gradient} rounded-lg text-white`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Instant Results</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Lightning-fast calculations with real-time updates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-br ${category.gradient} rounded-lg text-white`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure & Private</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your data stays private with client-side processing
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Tool Popup Modal */}
      {selectedTool && (
        <SimpleToolModal
          tool={selectedTool}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cardIndex={modalCardIndex}
        />
      )}
    </div>
  );
}