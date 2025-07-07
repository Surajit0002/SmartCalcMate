
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Filter, Grid3X3, List, ArrowRight, TrendingUp, Star, Zap,
  Calculator, Heart, Activity, DollarSign, FileText, Image, Video,
  Music, Code, Globe, Cpu, Palette, Shield, Sparkles, Crown,
  BarChart3, Clock, Users, Target, Rocket, Brain, Wand2, 
  Layers, Settings, Play, Download, Upload, Share2, Eye
} from 'lucide-react';
import { categories, calculators } from '@/lib/calculatorData';
import SEOHead from '@/components/SEOHead';

const enhancedCategories = [
  {
    id: 'finance',
    name: 'Finance & Investment',
    description: 'Professional financial calculations and investment planning',
    icon: <DollarSign className="w-6 h-6" />,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    tools: [
      { id: 'emi', name: 'EMI Calculator', description: 'Monthly loan EMI with precision', icon: 'fa-calculator', isPopular: true },
      { id: 'sip', name: 'SIP Calculator', description: 'Systematic investment planning', icon: 'fa-chart-line', isNew: true },
      { id: 'compound-interest', name: 'Compound Interest', description: 'Visualize compound growth', icon: 'fa-percentage', isPro: true },
      { id: 'mortgage', name: 'Mortgage Calculator', description: 'Full mortgage breakdown', icon: 'fa-home', isPopular: true },
      { id: 'investment', name: 'Investment Calculator', description: 'Portfolio future growth', icon: 'fa-chart-area', isPro: true },
      { id: 'loan-comparison', name: 'Loan Comparison', description: 'Compare loan offers', icon: 'fa-balance-scale' },
      { id: 'loan-interest', name: 'Loan Interest', description: 'Calculate interest rates', icon: 'fa-percent' },
      { id: 'discount-calculator', name: 'Discount Calculator', description: 'Sale price calculations', icon: 'fa-tags', isNew: true }
    ]
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'Health monitoring and fitness calculations',
    icon: <Heart className="w-6 h-6" />,
    gradient: 'from-rose-500 via-pink-500 to-purple-600',
    tools: [
      { id: 'bmi', name: 'BMI Calculator', description: 'Body Mass Index checker', icon: 'fa-weight', isPopular: true },
      { id: 'bmr', name: 'BMR Calculator', description: 'Daily calorie requirements', icon: 'fa-fire', isPro: true }
    ]
  },
  {
    id: 'math',
    name: 'Math & Numbers',
    description: 'Advanced mathematical calculations and conversions',
    icon: <Calculator className="w-6 h-6" />,
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    tools: [
      { id: 'scientific', name: 'Scientific Calculator', description: 'Advanced calculations', icon: 'fa-calculator', isPro: true },
      { id: 'percentage', name: 'Percentage Calculator', description: 'Quick percentage solutions', icon: 'fa-percent', isPopular: true },
      { id: 'roman-decimal', name: 'Roman ↔ Decimal', description: 'Number system conversion', icon: 'fa-roman', isNew: true },
      { id: 'binary-decimal', name: 'Binary ↔ Decimal ↔ Hex', description: 'Multi-base converter', icon: 'fa-binary', isPro: true }
    ]
  },
  {
    id: 'daily',
    name: 'Daily Utilities',
    description: 'Everyday calculation tools and utilities',
    icon: <Clock className="w-6 h-6" />,
    gradient: 'from-orange-500 via-amber-500 to-yellow-600',
    tools: [
      { id: 'age', name: 'Age Calculator', description: 'Exact age calculation', icon: 'fa-birthday-cake' },
      { id: 'tip', name: 'Tip Calculator', description: 'Calculate tips & split bills', icon: 'fa-receipt', isPopular: true },
      { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between units', icon: 'fa-exchange-alt' },
      { id: 'currency-converter', name: 'Currency Converter', description: 'Live exchange rates', icon: 'fa-coins', isPro: true }
    ]
  },
  {
    id: 'converters',
    name: 'Unit Converters',
    description: 'Comprehensive unit conversion tools',
    icon: <Settings className="w-6 h-6" />,
    gradient: 'from-teal-500 via-cyan-500 to-blue-600',
    tools: [
      { id: 'length-converter', name: 'Length Converter', description: 'Distance & length units', icon: 'fa-ruler' },
      { id: 'weight-converter', name: 'Weight Converter', description: 'Mass & weight units', icon: 'fa-weight' },
      { id: 'temperature-converter', name: 'Temperature Converter', description: 'Temperature scales', icon: 'fa-thermometer' },
      { id: 'time-converter', name: 'Time Converter', description: 'Time zone conversions', icon: 'fa-clock' },
      { id: 'speed-converter', name: 'Speed Converter', description: 'Velocity measurements', icon: 'fa-tachometer-alt' },
      { id: 'area-converter', name: 'Area Converter', description: 'Surface area units', icon: 'fa-square' },
      { id: 'volume-converter', name: 'Volume Converter', description: 'Capacity measurements', icon: 'fa-cube' },
      { id: 'data-converter', name: 'Data Size Converter', description: 'Digital storage units', icon: 'fa-hdd', isPro: true },
      { id: 'power-converter', name: 'Power Converter', description: 'Energy & power units', icon: 'fa-bolt' },
      { id: 'pressure-converter', name: 'Pressure Converter', description: 'Pressure measurements', icon: 'fa-gauge' }
    ]
  },
  {
    id: 'file-converters',
    name: 'File Converters',
    description: 'Document and file format conversions',
    icon: <FileText className="w-6 h-6" />,
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    tools: [
      { id: 'pdf-to-word', name: 'PDF to Word', description: 'PDF to DOCX conversion', icon: 'fa-file-word', isPopular: true },
      { id: 'word-to-pdf', name: 'Word to PDF', description: 'DOCX to PDF conversion', icon: 'fa-file-pdf', isPopular: true },
      { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables to Excel', icon: 'fa-file-excel', isPro: true },
      { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages to images', icon: 'fa-image' },
      { id: 'image-to-pdf', name: 'Image to PDF', description: 'Combine images to PDF', icon: 'fa-file-pdf' },
      { id: 'text-to-pdf', name: 'Text to PDF', description: 'Plain text to PDF', icon: 'fa-file-alt' },
      { id: 'csv-to-excel', name: 'CSV to Excel', description: 'CSV to XLSX conversion', icon: 'fa-file-excel' },
      { id: 'csv-to-json', name: 'CSV to JSON', description: 'Data format conversion', icon: 'fa-code', isNew: true },
      { id: 'json-to-csv', name: 'JSON to CSV', description: 'JSON to spreadsheet', icon: 'fa-table' },
      { id: 'csv-to-xml', name: 'CSV to XML', description: 'Structured data conversion', icon: 'fa-code' },
      { id: 'docx-to-odt', name: 'DOCX to ODT', description: 'Document format conversion', icon: 'fa-file' },
      { id: 'merge-pdf', name: 'Merge PDFs', description: 'Combine multiple PDFs', icon: 'fa-object-group', isPopular: true },
      { id: 'split-pdf', name: 'Split PDF', description: 'Separate PDF pages', icon: 'fa-cut' },
      { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size', icon: 'fa-compress', isPro: true },
      { id: 'pdf-password', name: 'Remove PDF Password', description: 'Unlock protected PDFs', icon: 'fa-unlock', isPro: true }
    ]
  },
  {
    id: 'media',
    name: 'Media Converters',
    description: 'Audio, video, and multimedia processing',
    icon: <Video className="w-6 h-6" />,
    gradient: 'from-red-500 via-orange-500 to-pink-600',
    tools: [
      { id: 'video-to-mp3', name: 'Video to MP3', description: 'Extract audio from video', icon: 'fa-music', isPopular: true },
      { id: 'audio-to-mp3', name: 'Audio to MP3/WAV', description: 'Audio format conversion', icon: 'fa-headphones' },
      { id: 'video-converter', name: 'Video Converter', description: 'Video format conversion', icon: 'fa-video', isPro: true },
      { id: 'audio-compressor', name: 'Audio Compressor', description: 'Compress audio files', icon: 'fa-compress' },
      { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce video file size', icon: 'fa-compress' },
      { id: 'mp4-to-gif', name: 'MP4 to GIF', description: 'Video to animated GIF', icon: 'fa-gif', isNew: true },
      { id: 'gif-to-mp4', name: 'GIF to MP4', description: 'Animated GIF to video', icon: 'fa-play' },
      { id: 'youtube-to-mp3', name: 'YouTube to MP3', description: 'Download YouTube audio', icon: 'fa-youtube', isPro: true },
      { id: 'youtube-thumbnail', name: 'YouTube Thumbnail', description: 'Download video thumbnails', icon: 'fa-image' }
    ]
  },
  {
    id: 'crypto',
    name: 'Currency & Crypto',
    description: 'Cryptocurrency and currency tools',
    icon: <Cpu className="w-6 h-6" />,
    gradient: 'from-yellow-500 via-orange-500 to-red-600',
    tools: [
      { id: 'crypto-converter', name: 'Crypto Converter', description: 'BTC/ETH conversions', icon: 'fa-bitcoin', isPro: true },
      { id: 'currency-history', name: 'Currency Rate History', description: 'Historical exchange rates', icon: 'fa-chart-line' },
      { id: 'precious-metals', name: 'Gold & Silver Rate', description: 'Precious metal prices', icon: 'fa-coins' }
    ]
  },
  {
    id: 'text',
    name: 'Text Converters',
    description: 'Text processing and transformation tools',
    icon: <FileText className="w-6 h-6" />,
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    tools: [
      { id: 'text-case', name: 'Text Case Converter', description: 'Change text case', icon: 'fa-font' },
      { id: 'binary-text', name: 'Binary ↔ Text', description: 'Binary text conversion', icon: 'fa-binary' },
      { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse text strings', icon: 'fa-undo' },
      { id: 'slug-generator', name: 'Slug Generator', description: 'URL-friendly text', icon: 'fa-link' },
      { id: 'text-capitalizer', name: 'Text Capitalizer', description: 'Smart capitalization', icon: 'fa-font' },
      { id: 'duplicate-remover', name: 'Remove Duplicate Lines', description: 'Clean up text', icon: 'fa-filter' },
      { id: 'text-encryptor', name: 'ROT13/Base64 Encryptor', description: 'Text encryption', icon: 'fa-lock', isPro: true }
    ]
  },
  {
    id: 'code',
    name: 'Code Converters',
    description: 'Programming and code tools',
    icon: <Code className="w-6 h-6" />,
    gradient: 'from-purple-500 via-violet-500 to-indigo-600',
    tools: [
      { id: 'json-xml', name: 'JSON ↔ XML', description: 'Data format conversion', icon: 'fa-code', isPopular: true },
      { id: 'json-csv', name: 'JSON ↔ CSV', description: 'JSON spreadsheet conversion', icon: 'fa-table' },
      { id: 'html-markdown', name: 'HTML ↔ Markdown', description: 'Markup conversion', icon: 'fa-markdown' },
      { id: 'code-beautifier', name: 'HTML/CSS/JS Beautifier', description: 'Format and beautify code', icon: 'fa-magic', isPro: true },
      { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', icon: 'fa-database' },
      { id: 'js-obfuscator', name: 'JavaScript Obfuscator', description: 'Protect JS code', icon: 'fa-shield-alt', isPro: true },
      { id: 'qr-generator', name: 'QR Code Generator', description: 'Create QR codes', icon: 'fa-qrcode', isPopular: true },
      { id: 'qr-reader', name: 'QR Code Reader', description: 'Decode QR codes', icon: 'fa-camera' },
      { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', icon: 'fa-search', isPro: true },
      { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique IDs', icon: 'fa-id-card' }
    ]
  },
  {
    id: 'language',
    name: 'Language Tools',
    description: 'Multi-language processing tools',
    icon: <Globe className="w-6 h-6" />,
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    tools: [
      { id: 'text-translator', name: 'Text Translator', description: 'Multi-language translation', icon: 'fa-language', isPro: true },
      { id: 'script-converter', name: 'Script Converter', description: 'Hindi ↔ Roman conversion', icon: 'fa-font' },
      { id: 'font-converter', name: 'Font Style Converter', description: 'Text styling options', icon: 'fa-palette' },
      { id: 'unicode-ascii', name: 'Unicode ↔ ASCII', description: 'Character encoding', icon: 'fa-code' },
      { id: 'language-detector', name: 'Language Detector', description: 'Auto-detect language', icon: 'fa-search', isPro: true }
    ]
  },
  {
    id: 'ai',
    name: 'AI-Powered Tools',
    description: 'Artificial intelligence enhanced tools',
    icon: <Brain className="w-6 h-6" />,
    gradient: 'from-gradient-to-r from-cyan-500 via-blue-500 to-purple-600',
    tools: [
      { id: 'ocr-tool', name: 'OCR (Image to Text)', description: 'Extract text from images', icon: 'fa-eye', isPro: true },
      { id: 'speech-to-text', name: 'Speech to Text', description: 'Voice transcription', icon: 'fa-microphone', isPro: true },
      { id: 'text-to-speech', name: 'Text to Speech', description: 'Voice synthesis', icon: 'fa-volume-up', isPro: true },
      { id: 'ai-translator', name: 'AI Translator', description: 'Smart translation', icon: 'fa-robot', isPro: true },
      { id: 'code-explainer', name: 'Code to Explanation', description: 'Explain code functionality', icon: 'fa-lightbulb', isPro: true },
      { id: 'document-summarizer', name: 'Document Summarizer', description: 'AI text summarization', icon: 'fa-compress-alt', isPro: true },
      { id: 'audio-transcriber', name: 'Audio Transcriber', description: 'Advanced audio transcription', icon: 'fa-file-audio', isPro: true }
    ]
  },
  {
    id: 'special',
    name: 'Special Tools',
    description: 'Specialized utility tools',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    tools: [
      { id: 'ico-converter', name: 'ICO to PNG / PNG to ICO', description: 'Icon format conversion', icon: 'fa-image' },
      { id: 'vcf-converter', name: 'VCF to CSV', description: 'Contact format conversion', icon: 'fa-address-book' },
      { id: 'metadata-extractor', name: 'Metadata Extractor', description: 'Extract file metadata', icon: 'fa-info-circle', isPro: true },
      { id: 'favicon-generator', name: 'Favicon Generator', description: 'Create website favicons', icon: 'fa-star' },
      { id: 'youtube-timestamp', name: 'YouTube Timestamp Link', description: 'Create timestamped links', icon: 'fa-clock' },
      { id: 'url-shortener', name: 'URL Shortener', description: 'Shorten long URLs', icon: 'fa-link' },
      { id: 'text-diff', name: 'Text Diff Checker', description: 'Compare text differences', icon: 'fa-not-equal', isPro: true },
      { id: 'color-picker', name: 'Color Picker & Palette', description: 'Advanced color tools', icon: 'fa-palette', isNew: true }
    ]
  }
];

export default function Categories() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filteredTools, setFilteredTools] = useState<any[]>([]);

  useEffect(() => {
    let allTools: any[] = [];
    enhancedCategories.forEach(category => {
      allTools = [...allTools, ...category.tools.map(tool => ({ ...tool, categoryId: category.id, categoryName: category.name }))];
    });

    let filtered = allTools;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.categoryId === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort tools
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });

    setFilteredTools(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  const getToolGradient = (categoryId: string) => {
    const category = enhancedCategories.find(cat => cat.id === categoryId);
    return category?.gradient || 'from-gray-500 to-gray-600';
  };

  return (
    <>
      <SEOHead 
        title="Calculator Categories - CalcMate" 
        description="Browse all calculator categories and tools"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Professional Calculator Hub
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90">
                Discover 100+ advanced calculators and converters, powered by AI and designed for professionals
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-sm opacity-90">Total Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{enhancedCategories.length}</div>
                  <div className="text-sm opacity-90">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-sm opacity-90">AI-Powered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">5M+</div>
                  <div className="text-sm opacity-90">Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search tools and calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {enhancedCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="new">Newest</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex bg-white rounded-lg p-1 border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-10"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-10"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 w-full h-auto p-2 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="all" className="flex flex-col gap-1 p-3">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs">All</span>
              </TabsTrigger>
              {enhancedCategories.slice(0, 11).map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-1 p-3">
                  {category.icon}
                  <span className="text-xs truncate">{category.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Enhanced Tools Grid */}
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredTools.map((tool, index) => (
              <Link key={tool.id} href={`/calculator/${tool.id}`}>
                <Card className={`group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-0 overflow-hidden ${
                  viewMode === 'list' ? 'flex items-center h-16' : 'h-32'
                }`}></old_str>
                  {viewMode === 'grid' ? (
                    <div className={`bg-gradient-to-br ${getToolGradient(tool.categoryId)} p-4 text-white relative h-full flex flex-col`}>
                      <div className="absolute top-2 right-2 flex gap-1">
                        {tool.isNew && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                        {tool.isPro && <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>}
                        {tool.isPopular && <div className="w-2 h-2 bg-orange-400 rounded-full"></div>}
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center mb-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 group-hover:scale-110 transition-transform duration-200">
                          <i className={`fas ${tool.icon} text-xl text-white`}></i>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-white/80 line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={`bg-gradient-to-br ${getToolGradient(tool.categoryId)} p-3 text-white flex-shrink-0 w-16 relative`}>
                        <div className="absolute top-1 right-1 flex gap-1">
                          {tool.isNew && <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>}
                          {tool.isPro && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>}
                          {tool.isPopular && <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>}
                        </div>
                        
                        <div className="flex items-center justify-center h-full">
                          <div className="bg-white/20 backdrop-blur-sm rounded p-2">
                            <i className={`fas ${tool.icon} text-sm text-white`}></i>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-white dark:bg-gray-800 p-3 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1 truncate">{tool.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{tool.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 ml-3 flex-shrink-0" />
                      </div>
                    </>
                  )}
                </Card>
              </Link>
            ))}
          </div>

          {/* No results */}
          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No tools found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
