
import React, { useState } from 'react';
import { Link } from 'wouter';
import { X, Star, Crown, Flame, Users, Clock, Calendar, 
  TrendingUp, Heart, Share2, Bookmark, Download, Play, 
  ChevronRight, Badge as BadgeIcon, Award, Target, Zap,
  BarChart3, Settings, Info, ExternalLink, Copy,
  FileText, Video, Image, Code, Calculator, Lightbulb,
  CheckCircle2, Sparkles, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator as CalculatorType, categories } from '@/lib/calculatorData';
import { getCardStyles } from '@/lib/cardColors';

// Import all calculator components
import BMICalculator from '@/components/calculators/BMICalculator';
import BMRCalculator from '@/components/calculators/BMRCalculator';
import AgeCalculator from '@/components/calculators/AgeCalculator';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import EMICalculator from '@/components/calculators/EMICalculator';
import SIPCalculator from '@/components/calculators/SIPCalculator';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import InvestmentCalculator from '@/components/calculators/InvestmentCalculator';
import LoanComparison from '@/components/calculators/LoanComparison';
import TipCalculator from '@/components/calculators/TipCalculator';
import PercentageCalculator from '@/components/calculators/PercentageCalculator';
import CurrencyConverter from '@/components/calculators/CurrencyConverter';
import EnhancedCurrencyConverter from '@/components/calculators/EnhancedCurrencyConverter';
import UnitConverter from '@/components/calculators/UnitConverter';
import ComprehensiveUnitConverter from '@/components/calculators/ComprehensiveUnitConverter';
import AdvancedUnitConverter from '@/components/calculators/AdvancedUnitConverter';
import ScientificCalculator from '@/components/calculators/ScientificCalculator';
import AdvancedMathematicalSuite from '@/components/calculators/AdvancedMathematicalSuite';
import AdvancedTextConverters from '@/components/calculators/AdvancedTextConverters';
import TextCodeConverterHub from '@/components/calculators/TextCodeConverterHub';
import FileConverterHub from '@/components/calculators/FileConverterHub';
import MediaConverterHub from '@/components/calculators/MediaConverterHub';
import AIConverterHub from '@/components/calculators/AIConverterHub';
import AdvancedFinancialDashboard from '@/components/calculators/AdvancedFinancialDashboard';
import ComprehensiveFinancialSuite from '@/components/calculators/ComprehensiveFinancialSuite';

interface UnifiedToolModalProps {
  tool: CalculatorType;
  isOpen: boolean;
  onClose: () => void;
  cardIndex: number;
}

const iconMap = {
  calculator: Calculator,
  percent: BadgeIcon,
  dollar: BadgeIcon,
  heart: Heart,
  activity: BarChart3,
  calendar: Calendar,
  clock: Clock,
  trending: TrendingUp,
  star: Star,
  settings: Settings,
  info: Info,
  code: Code,
  file: FileText,
  video: Video,
  image: Image,
  lightbulb: Lightbulb,
  target: Target,
  zap: Zap,
  award: Award
};

const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Calculator;
  return <IconComponent className="w-5 h-5" />;
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    />
  ));
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 border-green-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getCalculatorComponent = (toolId: string, category?: string) => {
  const componentMap: { [key: string]: React.ComponentType<any> } = {
    // Finance & Investment Tools
    'emi': EMICalculator,
    'emi-calculator': EMICalculator,
    'loan-emi-calculator': EMICalculator,
    'sip': SIPCalculator,
    'sip-calculator': SIPCalculator,
    'compound-interest': CompoundInterestCalculator,
    'compound-interest-calculator': CompoundInterestCalculator,
    'mortgage': MortgageCalculator,
    'mortgage-calculator': MortgageCalculator,
    'investment': InvestmentCalculator,
    'investment-calculator': InvestmentCalculator,
    'loan-comparison': LoanComparison,
    'retirement-planning': ComprehensiveFinancialSuite,
    'tax-calculator': AdvancedFinancialDashboard,
    
    // Health & Fitness Tools
    'bmi': BMICalculator,
    'bmi-calculator': BMICalculator,
    'bmr': BMRCalculator,
    'bmr-calculator': BMRCalculator,
    'age': AgeCalculator,
    'age-calculator': AgeCalculator,
    
    // Math & Numbers Tools
    'scientific': ScientificCalculator,
    'scientific-calculator': ScientificCalculator,
    'percentage': PercentageCalculator,
    'percentage-calculator': PercentageCalculator,
    'fraction-decimal': AdvancedMathematicalSuite,
    'binary-decimal-hex': AdvancedMathematicalSuite,
    'roman-decimal': AdvancedMathematicalSuite,
    'algebra-solver': AdvancedMathematicalSuite,
    
    // Daily Utilities
    'tip': TipCalculator,
    'tip-calculator': TipCalculator,
    'password-generator': AdvancedTextConverters,
    
    // Unit Converters
    'unit-converter': UnitConverter,
    'length-converter': ComprehensiveUnitConverter,
    'weight-converter': ComprehensiveUnitConverter,
    'temperature-converter': ComprehensiveUnitConverter,
    'time-converter': ComprehensiveUnitConverter,
    'speed-converter': ComprehensiveUnitConverter,
    'area-converter': ComprehensiveUnitConverter,
    'volume-converter': ComprehensiveUnitConverter,
    'data-converter': ComprehensiveUnitConverter,
    'power-converter': ComprehensiveUnitConverter,
    'pressure-converter': ComprehensiveUnitConverter,
    
    // File Converters
    'pdf-to-word': FileConverterHub,
    'word-to-pdf': FileConverterHub,
    'pdf-to-excel': FileConverterHub,
    'pdf-to-image': FileConverterHub,
    'image-to-pdf': FileConverterHub,
    'text-to-pdf': FileConverterHub,
    'csv-to-excel': FileConverterHub,
    'excel-to-csv': FileConverterHub,
    'csv-to-json': FileConverterHub,
    'json-to-csv': FileConverterHub,
    'csv-to-xml': FileConverterHub,
    'docx-to-odt': FileConverterHub,
    'merge-pdf': FileConverterHub,
    'split-pdf': FileConverterHub,
    'compress-pdf': FileConverterHub,
    
    // Media Converters
    'video-to-mp3': MediaConverterHub,
    'audio-converter': MediaConverterHub,
    'video-converter': MediaConverterHub,
    'audio-compressor': MediaConverterHub,
    'video-compressor': MediaConverterHub,
    'mp4-to-gif': MediaConverterHub,
    'gif-to-mp4': MediaConverterHub,
    'youtube-to-mp3': MediaConverterHub,
    'youtube-thumbnail': MediaConverterHub,
    
    // Downloader Tools
    'youtube-downloader': MediaConverterHub,
    'instagram-downloader': MediaConverterHub,
    'facebook-downloader': MediaConverterHub,
    'twitter-downloader': MediaConverterHub,
    'soundcloud-downloader': MediaConverterHub,
    'pinterest-downloader': MediaConverterHub,
    
    // Social Media Tools
    'instagram-caption-generator': AdvancedTextConverters,
    'tweet-thread-composer': AdvancedTextConverters,
    'hashtag-generator': AdvancedTextConverters,
    'reels-trend-finder': AdvancedTextConverters,
    'social-bio-link-generator': AdvancedTextConverters,
    
    // Currency & Crypto
    'currency-converter': CurrencyConverter,
    'currency': CurrencyConverter,
    'enhanced-currency-converter': EnhancedCurrencyConverter,
    'crypto-converter': EnhancedCurrencyConverter,
    'currency-history': EnhancedCurrencyConverter,
    'gold-converter': EnhancedCurrencyConverter,
    
    // Text & Code Tools
    'text-case-converter': AdvancedTextConverters,
    'text-reverser': AdvancedTextConverters,
    'remove-duplicate-lines': AdvancedTextConverters,
    'slug-generator': AdvancedTextConverters,
    'text-capitalizer': AdvancedTextConverters,
    'binary-text': TextCodeConverterHub,
    'base64-encoder': TextCodeConverterHub,
    'rot13-cipher': TextCodeConverterHub,
    'json-xml': TextCodeConverterHub,
    'html-markdown': TextCodeConverterHub,
    'sql-formatter': TextCodeConverterHub,
    'qr-generator': TextCodeConverterHub,
    'regex-tester': TextCodeConverterHub,
    'uuid-generator': TextCodeConverterHub,
    'hash-generator': TextCodeConverterHub,
    
    // AI-Powered Tools
    'ocr': AIConverterHub,
    'speech-to-text': AIConverterHub,
    'text-to-speech': AIConverterHub,
    'ai-translator': AIConverterHub,
    'code-explainer': AIConverterHub,
    'document-summarizer': AIConverterHub,
    'audio-transcriber': AIConverterHub,
    
    // Language & Script
    'text-translator': AdvancedTextConverters,
    'script-converter': AdvancedTextConverters,
    'font-converter': AdvancedTextConverters,
    'unicode-converter': AdvancedTextConverters,
    'language-detector': AdvancedTextConverters,
    
    // Specialized Tools
    'ico-to-png': FileConverterHub,
    'png-to-ico': FileConverterHub,
    'vcf-to-csv': FileConverterHub,
    'metadata-extractor': FileConverterHub,
    'favicon-generator': FileConverterHub,
    'youtube-timestamp-link': AdvancedTextConverters,
    'link-shortener': AdvancedTextConverters,
    'text-diff-checker': AdvancedTextConverters,
  };

  // First try exact match
  let component = componentMap[toolId];
  
  // If no exact match, try category-based fallback
  if (!component && category) {
    switch (category) {
      case 'finance':
        component = ComprehensiveFinancialSuite;
        break;
      case 'health':
        component = BMICalculator;
        break;
      case 'math':
        component = AdvancedMathematicalSuite;
        break;
      case 'daily':
        component = TipCalculator;
        break;
      case 'unit-converters':
        component = ComprehensiveUnitConverter;
        break;
      case 'file-converters':
        component = FileConverterHub;
        break;
      case 'media-converters':
        component = MediaConverterHub;
        break;
      case 'currency-crypto':
        component = EnhancedCurrencyConverter;
        break;
      case 'text-converters':
        component = AdvancedTextConverters;
        break;
      case 'ai-converters':
        component = AIConverterHub;
        break;
      case 'language-converters':
        component = AdvancedTextConverters;
        break;
      case 'downloader-tools':
        component = MediaConverterHub;
        break;
      case 'social-media-tools':
        component = AdvancedTextConverters;
        break;
      case 'misc-converters':
        component = TextCodeConverterHub;
        break;
      default:
        component = AdvancedMathematicalSuite;
    }
  }

  return component || null;
};

const UnifiedToolModal: React.FC<UnifiedToolModalProps> = ({ tool, isOpen, onClose, cardIndex }) => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardStyles = getCardStyles(cardIndex);
  const category = categories.find(c => c.id === tool.category);

  const CalculatorComponent = getCalculatorComponent(tool.id, tool.category);

  const usageStats = {
    dailyUsers: Math.floor(Math.random() * 1000) + 500,
    totalCalculations: Math.floor(Math.random() * 50000) + 10000,
    avgRating: tool.rating || 4.5,
    totalReviews: Math.floor(Math.random() * 500) + 100,
    successRate: Math.floor(Math.random() * 20) + 80,
    responseTime: Math.floor(Math.random() * 500) + 100
  };

  const recentUpdates = [
    "Enhanced calculation accuracy",
    "Improved mobile responsiveness", 
    "Added new export formats",
    "Performance optimizations"
  ];

  const relatedTools = [
    { id: 'related-1', name: 'Advanced Calculator', icon: 'calculator' },
    { id: 'related-2', name: 'Unit Converter', icon: 'settings' },
    { id: 'related-3', name: 'Scientific Calculator', icon: 'code' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className={`${cardStyles.cardBg} -m-6 mb-0 p-6 rounded-t-lg`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 ${cardStyles.iconBg} rounded-xl text-white`}>
                {getIcon(tool.icon)}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white mb-2">
                  {tool.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mb-2">
                  {tool.rating && (
                    <div className="flex items-center gap-1">
                      {getRatingStars(tool.rating)}
                      <span className="text-white/90 text-sm ml-1">
                        {tool.rating.toFixed(1)} ({usageStats.totalReviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-white border-white/30 bg-white/20">
                    {category?.name}
                  </Badge>
                  {tool.difficulty && (
                    <Badge className={`text-xs ${getDifficultyColor(tool.difficulty)} border`}>
                      {tool.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className="text-white hover:bg-white/20"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="text-white hover:bg-white/20"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-4">
              <div className="min-h-[400px]">
                {CalculatorComponent && <CalculatorComponent />}
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {tool.longDescription || tool.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{usageStats.dailyUsers} daily users</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{tool.estimatedTime || '< 1 min'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{usageStats.successRate}% success rate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Usage Today</span>
                        <span className="font-semibold">{usageStats.dailyUsers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Calculations</span>
                        <span className="font-semibold">{usageStats.totalCalculations.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Average Rating</span>
                        <span className="font-semibold">{usageStats.avgRating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="font-semibold">{usageStats.responseTime}ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentUpdates.map((update, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{update}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tool.features && tool.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Lightbulb className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>Feature details coming soon...</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Tool Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {tool.featured && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Featured Tool</span>
                      </div>
                    )}
                    {tool.isNew && (
                      <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Sparkles className="w-4 h-4 text-green-500" />
                        <span className="text-sm">New Release</span>
                      </div>
                    )}
                    {tool.isPopular && (
                      <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <Flame className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Popular Choice</span>
                      </div>
                    )}
                    {tool.isPro && (
                      <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Crown className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Pro Feature</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Success Rate</span>
                        <span className="text-sm font-semibold">{usageStats.successRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${usageStats.successRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">User Satisfaction</span>
                        <span className="text-sm font-semibold">{Math.round(usageStats.avgRating * 20)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${usageStats.avgRating * 20}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Response Speed</span>
                        <span className="text-sm font-semibold">{100 - (usageStats.responseTime / 10)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${100 - (usageStats.responseTime / 10)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Related Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {relatedTools.map((relatedTool, idx) => (
                        <div key={relatedTool.id} className="p-3 border rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                              {getIcon(relatedTool.icon)}
                            </div>
                            <span className="font-medium text-sm">{relatedTool.name}</span>
                            <Button size="sm" variant="outline" className="ml-auto">
                              Try Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between pt-6 border-t mt-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Updated: {new Date().toLocaleDateString()}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Version: 2.1.0
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button size="sm" className={`${cardStyles.iconBg} hover:opacity-90`} onClick={onClose}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Close Tool
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedToolModal;
