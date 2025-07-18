
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

// Import calculator components
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
import UnitConverter from '@/components/calculators/UnitConverter';
import ScientificCalculator from '@/components/calculators/ScientificCalculator';
import AdvancedMathematicalSuite from '@/components/calculators/AdvancedMathematicalSuite';
import GenericToolCalculator from '@/components/calculators/GenericToolCalculator';
import TextCodeConverterHub from '@/components/calculators/TextCodeConverterHub';
import FileConverterHub from '@/components/calculators/FileConverterHub';
import MediaConverterHub from '@/components/calculators/MediaConverterHub';
import AIConverterHub from '@/components/calculators/AIConverterHub';
import AdvancedFinancialDashboard from '@/components/calculators/AdvancedFinancialDashboard';
import ComprehensiveFinancialSuite from '@/components/calculators/ComprehensiveFinancialSuite';

// Import new modal components
import ToolModal from '@/components/modals/ToolModal';
import FileConverterModal from '@/components/modals/FileConverterModal';
import MediaConverterModal from '@/components/modals/MediaConverterModal';
import DownloaderModal from '@/components/modals/DownloaderModal';
import SocialMediaModal from '@/components/modals/SocialMediaModal';

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

const getCalculatorComponent = (tool: CalculatorType) => {
  // Use new modal components for specific categories
  switch (tool.category) {
    case 'file-converters':
      return <FileConverterModal tool={tool} />;
    case 'media-converters':
      return <MediaConverterModal tool={tool} />;
    case 'downloader-tools':
      return <DownloaderModal tool={tool} />;
    case 'social-media-tools':
      return <SocialMediaModal tool={tool} />;
    default:
      break;
  }

  // Specialized components for core tools
  const specializedComponents: { [key: string]: React.ComponentType<any> } = {
    // Finance & Investment Tools (keep existing specialized components)
    'emi': EMICalculator,
    'sip': SIPCalculator,
    'compound-interest': CompoundInterestCalculator,
    'mortgage': MortgageCalculator,
    'investment': InvestmentCalculator,
    'loan-comparison': LoanComparison,
    
    // Health & Fitness Tools (keep existing specialized components)
    'bmi': BMICalculator,
    'bmr': BMRCalculator,
    'age': AgeCalculator,
    
    // Math & Numbers Tools (keep some specialized, others use generic)
    'scientific': ScientificCalculator,
    'percentage': PercentageCalculator,
    'tip': TipCalculator,
  };

  // If there's a specialized component, use it
  if (specializedComponents[tool.id]) {
    const Component = specializedComponents[tool.id];
    return <Component />;
  }

  // For all other tools, use the generic component
  return <GenericToolCalculator tool={tool} />;
};

const UnifiedToolModal: React.FC<UnifiedToolModalProps> = ({ tool, isOpen, onClose, cardIndex }) => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardStyles = getCardStyles(cardIndex);
  const category = categories.find(c => c.id === tool.category);

  const CalculatorComponent = getCalculatorComponent(tool);

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
      <DialogContent className="w-[95vw] max-w-4xl h-[90vh] max-h-[800px] p-0 gap-0 overflow-hidden">
        <DialogHeader className={`${cardStyles.cardBg} p-4 sm:p-6 rounded-t-lg border-b`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <div className={`p-2 sm:p-3 ${cardStyles.iconBg} rounded-xl text-white`}>
                {getIcon(tool.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-lg sm:text-xl font-bold text-white mb-1 truncate">
                  {tool.name}
                </DialogTitle>
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <Badge variant="outline" className="text-white border-white/30 bg-white/20 text-xs">
                    {category?.name}
                  </Badge>
                  {tool.difficulty && (
                    <Badge className={`text-xs ${getDifficultyColor(tool.difficulty)} border`}>
                      {tool.difficulty}
                    </Badge>
                  )}
                  {tool.rating && (
                    <div className="hidden sm:flex items-center gap-1">
                      {getRatingStars(tool.rating)}
                      <span className="text-white/90 text-xs">
                        {tool.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className="text-white hover:bg-white/20 p-2"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
          <div className="h-full">
            {CalculatorComponent}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedToolModal;
