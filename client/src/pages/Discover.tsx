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
  Search, TrendingUp, Star, Crown, Flame, Sparkles, Users, 
  Calculator, Target, Clock, Award, Zap, Shield, ArrowRight,
  Filter, SortAsc, Grid3X3, List, RefreshCw, Heart, Eye,
  BarChart3, Lightbulb, Compass, MapPin, Telescope, Globe
} from 'lucide-react';
import { categories, calculators } from '@/lib/calculatorData';
import SEOHead from '@/components/SEOHead';

const iconMap = {
  'fa-chart-line': BarChart3,
  'fa-heartbeat': Heart,
  'fa-square-root-alt': Calculator,
  'fa-calendar-day': Clock,
  'fa-exchange-alt': RefreshCw,
  'fa-percentage': Target,
  'fa-calculator': Calculator,
  'fa-percent': Target,
  'fa-fire': Flame,
  'fa-tools': Shield
};

const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || Calculator;
  return <IconComponent className="w-5 h-5" />;
};

const tagColors = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'rating'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    calculators.forEach(calc => {
      calc.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort calculators
  const filteredCalculators = useMemo(() => {
    let filtered = calculators;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(calc => 
        calc.name.toLowerCase().includes(query) ||
        calc.description.toLowerCase().includes(query) ||
        calc.longDescription?.toLowerCase().includes(query) ||
        calc.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        calc.features?.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(calc => calc.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(calc => calc.tags?.includes(selectedTag));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  // Get trending tools (popular + new)
  const trendingTools = calculators.filter(calc => 
    calc.isPopular || calc.isNew || calc.featured
  ).sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 12);

  // Get recommended tools based on usage
  const recommendedTools = calculators
    .filter(calc => calc.usageCount && calc.usageCount > 50000)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);

  // Popular categories
  const popularCategories = categories
    .filter(cat => cat.isPopular)
    .sort((a, b) => b.calculators.length - a.calculators.length);

  // Most used tags
  const popularTags = allTags
    .map(tag => ({
      tag,
      count: calculators.filter(calc => calc.tags?.includes(tag)).length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="Discover Tools - Find the Perfect Calculator | CalcMate Pro"
        description="Discover and explore 165+ professional calculators and converters. Find tools by category, tags, popularity, and more."
        keywords="discover calculators, find tools, search calculators, calculator discovery, tool finder"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Telescope className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Discover Tools
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore our comprehensive collection of calculators and converters. Find exactly what you need.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="search" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Search & Filter</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>

          {/* Search & Filter Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search by name, description, features, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
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

                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tags</SelectItem>
                        {allTags.map(tag => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border rounded-md">
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

                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedTag('all');
                        setSortBy('name');
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">
                Found {filteredCalculators.length} tools
              </p>
            </div>

            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
            }>
              {filteredCalculators.map((tool) => (
                <Link key={tool.id} href={`/calculator/${tool.id}`}>
                  <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <CardHeader className={`pb-3 ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg text-white">
                            {getIcon(tool.icon)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            {tool.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-500">{tool.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          {tool.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Featured
                            </Badge>
                          )}
                          {tool.isNew && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className={viewMode === 'list' ? 'flex-1' : ''}>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tool.description}
                      </p>
                      
                      {tool.tags && tool.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {tool.tags.slice(0, 3).map((tag, idx) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {tool.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{tool.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === tool.category)?.name}
                        </Badge>
                        {tool.usageCount && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="w-3 h-3 mr-1" />
                            {tool.usageCount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredCalculators.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tools found</h3>
                  <p>Try adjusting your search criteria or filters</p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Trending Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Popular tools that are trending right now
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingTools.map((tool, index) => (
                <Link key={tool.id} href={`/calculator/${tool.id}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg text-white">
                              {getIcon(tool.icon)}
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            {tool.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-500">{tool.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === tool.category)?.name}
                        </Badge>
                        {tool.usageCount && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="w-3 h-3 mr-1" />
                            {tool.usageCount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Recommended Tab */}
          <TabsContent value="recommended" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Recommended for You
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Top-rated tools with high user satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedTools.map((tool) => (
                <Link key={tool.id} href={`/calculator/${tool.id}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg text-white">
                            {getIcon(tool.icon)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            {tool.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-500">{tool.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === tool.category)?.name}
                        </Badge>
                        {tool.usageCount && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="w-3 h-3 mr-1" />
                            {tool.usageCount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Explore by Category & Tags
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Browse tools by categories and popular tags
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Popular Categories */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Compass className="w-5 h-5" />
                    Popular Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {popularCategories.map((category) => (
                      <Link key={category.id} href={`/category/${category.id}`}>
                        <div className="flex items-center justify-between p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.gradient} text-white`}>
                              {getIcon(category.icon)}
                            </div>
                            <div>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-sm text-gray-500">
                                {category.calculators.length} tools
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tagInfo, index) => (
                      <Badge 
                        key={tagInfo.tag}
                        className={`cursor-pointer hover:opacity-80 transition-opacity ${
                          tagColors[index % tagColors.length]
                        }`}
                        onClick={() => setSelectedTag(tagInfo.tag)}
                      >
                        {tagInfo.tag} ({tagInfo.count})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}