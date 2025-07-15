import React, { useState } from 'react';
import { Link } from 'wouter';
import { X, Star, Sparkles, Crown, Flame, Users, Clock, Calendar, 
  TrendingUp, Heart, Share2, Bookmark, Download, Play, 
  ChevronRight, Badge as BadgeIcon, Award, Target, Zap,
  BarChart3, Settings, Info, ExternalLink, Copy,
  FileText, Video, Image, Code, Calculator, Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calculator as CalculatorType, categories } from '@/lib/calculatorData';
import { getCardStyles } from '@/lib/cardColors';

interface ToolPopupModalProps {
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

const ToolPopupModal: React.FC<ToolPopupModalProps> = ({ tool, isOpen, onClose, cardIndex }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardStyles = getCardStyles(cardIndex);
  const category = categories.find(c => c.id === tool.category);

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

        <div className="p-6 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
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

              {tool.inputTypes && tool.inputTypes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Input Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tool.inputTypes.map((type, idx) => (
                        <Badge key={idx} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {tool.outputTypes && tool.outputTypes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      Output Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tool.outputTypes.map((type, idx) => (
                        <Badge key={idx} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
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
                      <Progress value={usageStats.successRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">User Satisfaction</span>
                        <span className="text-sm font-semibold">{Math.round(usageStats.avgRating * 20)}%</span>
                      </div>
                      <Progress value={usageStats.avgRating * 20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Response Speed</span>
                        <span className="text-sm font-semibold">{100 - (usageStats.responseTime / 10)}%</span>
                      </div>
                      <Progress value={100 - (usageStats.responseTime / 10)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
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
              </div>
            </TabsContent>

            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Related Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedTools.map((relatedTool, idx) => (
                      <div key={relatedTool.id} className="p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            {getIcon(relatedTool.icon)}
                          </div>
                          <span className="font-medium text-sm">{relatedTool.name}</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          Try Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex items-center justify-between">
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
              <Link href={`/calculator/${tool.id}`}>
                <Button size="sm" className={`${cardStyles.iconBg} hover:opacity-90`}>
                  <Play className="w-4 h-4 mr-2" />
                  Open Tool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolPopupModal;