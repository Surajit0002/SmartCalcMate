import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, Calculator, TrendingUp, Heart, Activity, Beaker, Shuffle, Star, Users,
  DollarSign, PiggyBank, BarChart3, Coins, CreditCard, Banknote, Receipt,
  Scale, Thermometer, Droplets, Clock, Ruler, Gauge, Zap, HardDrive,
  FileText, File, FileImage, FileVideo, FileAudio, FolderOpen, Download, Upload,
  Video, Music, Image, Play, Pause, Volume2, Mic, Camera,
  Brain, Eye, MessageSquare, Languages, Sparkles, Bot, Cpu, Code,
  Type, Hash, QrCode, Globe, Mail, Phone, MapPin,
  Euro, Bitcoin, Landmark, PieChart, Palette, Brush, Wand2, Edit, Copy, Scissors,
  Settings, Wrench, Cog, Shield, Lock, Key, Database, ArrowRight, Filter
} from 'lucide-react';
import { categories, calculators } from '@/lib/calculatorData';
import { useI18n } from '@/hooks/useI18n';
import SEOHead from '@/components/SEOHead';

// Tool icon mapping with popular Lucide React icons
const getToolIcon = (toolId: string) => {
  const iconMap: Record<string, any> = {
    // Financial Tools
    'emi': <CreditCard className="w-5 h-5" />,
    'sip': <PiggyBank className="w-5 h-5" />,
    'compound-interest': <TrendingUp className="w-5 h-5" />,
    'mortgage': <DollarSign className="w-5 h-5" />,
    'investment': <BarChart3 className="w-5 h-5" />,
    'loan-comparison': <Receipt className="w-5 h-5" />,
    'financial-dashboard': <Landmark className="w-5 h-5" />,
    'currency-converter': <Coins className="w-5 h-5" />,
    
    // Unit Converters
    'length-converter': <Ruler className="w-5 h-5" />,
    'weight-converter': <Scale className="w-5 h-5" />,
    'temperature-converter': <Thermometer className="w-5 h-5" />,
    'time-converter': <Clock className="w-5 h-5" />,
    'speed-converter': <Gauge className="w-5 h-5" />,
    'area-converter': <MapPin className="w-5 h-5" />,
    'volume-converter': <Droplets className="w-5 h-5" />,
    'data-converter': <HardDrive className="w-5 h-5" />,
    'power-converter': <Zap className="w-5 h-5" />,
    'pressure-converter': <Activity className="w-5 h-5" />,
    
    // File Converters
    'pdf-to-word': <FileText className="w-5 h-5" />,
    'pdf-to-excel': <File className="w-5 h-5" />,
    'pdf-to-image': <FileImage className="w-5 h-5" />,
    'excel-to-csv': <Database className="w-5 h-5" />,
    'csv-to-json': <Code className="w-5 h-5" />,
    'json-to-xml': <Settings className="w-5 h-5" />,
    'word-to-pdf': <FileText className="w-5 h-5" />,
    'image-to-pdf': <FileImage className="w-5 h-5" />,
    'pdf-merge': <Copy className="w-5 h-5" />,
    'pdf-split': <Scissors className="w-5 h-5" />,
    'pdf-compress': <Download className="w-5 h-5" />,
    'pdf-password-remove': <Lock className="w-5 h-5" />,
    'excel-to-pdf': <File className="w-5 h-5" />,
    'csv-to-excel': <Database className="w-5 h-5" />,
    'json-to-csv': <Code className="w-5 h-5" />,
    
    // Media Converters
    'video-to-mp4': <Video className="w-5 h-5" />,
    'video-to-avi': <FileVideo className="w-5 h-5" />,
    'video-to-mkv': <Play className="w-5 h-5" />,
    'video-to-mp3': <Music className="w-5 h-5" />,
    'mp4-to-gif': <Image className="w-5 h-5" />,
    'audio-to-mp3': <Volume2 className="w-5 h-5" />,
    'audio-to-wav': <FileAudio className="w-5 h-5" />,
    'audio-merge': <Mic className="w-5 h-5" />,
    'image-converter': <Camera className="w-5 h-5" />,
    
    // AI Tools
    'ocr': <Eye className="w-5 h-5" />,
    'speech-to-text': <Mic className="w-5 h-5" />,
    'text-to-speech': <Volume2 className="w-5 h-5" />,
    'ai-translator': <Languages className="w-5 h-5" />,
    'language-detector': <Globe className="w-5 h-5" />,
    'code-explainer': <Brain className="w-5 h-5" />,
    'ai-summarizer': <Bot className="w-5 h-5" />,
    
    // Text & Code Tools
    'text-case-converter': <Type className="w-5 h-5" />,
    'text-reverser': <Shuffle className="w-5 h-5" />,
    'duplicate-remover': <Copy className="w-5 h-5" />,
    'slug-generator': <Hash className="w-5 h-5" />,
    'binary-converter': <Code className="w-5 h-5" />,
    'base64-encoder': <Key className="w-5 h-5" />,
    'qr-generator': <QrCode className="w-5 h-5" />,
    'uuid-generator': <Hash className="w-5 h-5" />,
    'json-formatter': <Code className="w-5 h-5" />,
    'html-to-markdown': <Edit className="w-5 h-5" />,
    'css-beautifier': <Palette className="w-5 h-5" />,
    'sql-formatter': <Database className="w-5 h-5" />,
    'regex-tester': <Search className="w-5 h-5" />,
    'url-encoder': <Globe className="w-5 h-5" />,
    'password-generator': <Shield className="w-5 h-5" />,
    
    // Health Tools
    'bmi': <Scale className="w-5 h-5" />,
    'bmr': <Activity className="w-5 h-5" />,
    'age': <Clock className="w-5 h-5" />,
    
    // Math Tools
    'scientific': <Calculator className="w-5 h-5" />,
    'percentage': <BarChart3 className="w-5 h-5" />,
    'tip-calculator': <Receipt className="w-5 h-5" />,
  };
  
  return iconMap[toolId] || <Calculator className="w-5 h-5" />;
};

// Color schemes for different categories
const getCategoryColor = (categoryId: string) => {
  const colorMap: Record<string, string> = {
    'finance': 'bg-emerald-500',
    'unit-converters': 'bg-blue-500',
    'file-converters': 'bg-purple-500',
    'media-converters': 'bg-orange-500',
    'ai-converters': 'bg-pink-500',
    'text-converters': 'bg-indigo-500',
    'currency-crypto': 'bg-yellow-500',
    'language-tools': 'bg-teal-500',
    'specialized': 'bg-red-500',
    'health': 'bg-rose-500',
    'mathematical': 'bg-cyan-500',
    'utility': 'bg-violet-500',
    'scientific': 'bg-slate-500'
  };
  
  return colorMap[categoryId] || 'bg-gray-500';
};

const getBgGradient = (categoryId: string) => {
  const gradientMap: Record<string, string> = {
    'finance': 'from-emerald-400 to-emerald-600',
    'unit-converters': 'from-blue-400 to-blue-600',
    'file-converters': 'from-purple-400 to-purple-600',
    'media-converters': 'from-orange-400 to-orange-600',
    'ai-converters': 'from-pink-400 to-pink-600',
    'text-converters': 'from-indigo-400 to-indigo-600',
    'currency-crypto': 'from-yellow-400 to-yellow-600',
    'language-tools': 'from-teal-400 to-teal-600',
    'specialized': 'from-red-400 to-red-600',
    'health': 'from-rose-400 to-rose-600',
    'mathematical': 'from-cyan-400 to-cyan-600',
    'utility': 'from-violet-400 to-violet-600',
    'scientific': 'from-slate-400 to-slate-600'
  };
  
  return gradientMap[categoryId] || 'from-gray-400 to-gray-600';
};

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { language } = useI18n();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead 
        title="All Tools & Converters - CalcMate Pro"
        description="Browse our comprehensive collection of 100+ tools including calculators, converters, AI processors, and specialized utilities"
        keywords="calculator tools, file converters, AI tools, unit converters, media processing"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="h-5 w-5" />
            100+ Professional Tools
            <Star className="h-5 w-5 text-yellow-300" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Tool Ecosystem
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            Advanced calculators, file converters, AI processors, and specialized utilities. 
            Everything you need in one powerful platform.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-emerald-600">{calculators.length}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tools</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600">{calculators.filter(c => c.isPro).length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI-Powered</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-orange-600">2.5M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Users</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search tools & converters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg border-2 focus:border-purple-500 rounded-xl"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  size="sm"
                  className="rounded-full"
                >
                  All Tools
                </Button>
                {categories.slice(0, 5).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    size="sm"
                    className="rounded-full"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredCalculators.map((calculator) => {
            const category = categories.find(c => c.id === calculator.category);
            const bgGradient = getBgGradient(calculator.category);
            
            return (
              <Link key={calculator.id} href={`/calculator/${calculator.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-purple-300 dark:hover:border-purple-600 overflow-hidden cursor-pointer h-full">
                  {/* Solid Colorful Header */}
                  <div className={`bg-gradient-to-br ${bgGradient} p-4 text-white relative`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 group-hover:scale-110 transition-transform duration-300">
                        {getToolIcon(calculator.id)}
                      </div>
                      {calculator.isPro && (
                        <Badge className="bg-yellow-400 text-yellow-900 text-xs font-bold">
                          AI
                        </Badge>
                      )}
                      {calculator.isNew && (
                        <Badge className="bg-green-400 text-green-900 text-xs font-bold">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
                      {calculator.name}
                    </h3>
                  </div>
                  
                  {/* White Content Area */}
                  <CardContent className="p-3 bg-white dark:bg-gray-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 min-h-[2rem]">
                      {calculator.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ borderColor: `rgb(${bgGradient.includes('emerald') ? '16 185 129' : bgGradient.includes('blue') ? '59 130 246' : bgGradient.includes('purple') ? '147 51 234' : '156 163 175'})` }}
                      >
                        {category?.name}
                      </Badge>
                      <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCalculators.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search terms or browse different categories to find the perfect tool.
            </p>
            <Button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
              className="mt-6"
            >
              Show All Tools
            </Button>
          </div>
        )}

        {/* Category Overview */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const bgGradient = getBgGradient(category.id);
                
                return (
                  <Link key={category.id} href={`/category/${category.id}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-300 dark:hover:border-purple-600">
                      <CardHeader className={`bg-gradient-to-br ${bgGradient} text-white`}>
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                            <Activity className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                            <Badge className="bg-white/20 text-white mt-1">
                              {category.calculators.length} tools
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 bg-white dark:bg-gray-800">
                        <CardDescription className="text-sm mb-4">
                          {category.description}
                        </CardDescription>
                        <Button variant="ghost" size="sm" className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20">
                          Explore Category
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}