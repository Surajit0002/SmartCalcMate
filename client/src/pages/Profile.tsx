import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { User, Settings, Trophy, BarChart3, Calendar, Star, Calculator, TrendingUp } from 'lucide-react';
import { calculators, categories } from '@/lib/calculatorData';
import { useI18n } from '@/hooks/useI18n';
import SEOHead from '@/components/SEOHead';

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  avatar?: string;
  preferences: {
    defaultCurrency: string;
    defaultLanguage: string;
    theme: string;
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Calculator Pro',
    email: 'user@calcmate.com',
    joinDate: '2024-01-01',
    preferences: {
      defaultCurrency: 'USD',
      defaultLanguage: 'en',
      theme: 'light'
    }
  });
  
  const [history, setHistory] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-calculation',
      name: 'First Steps',
      description: 'Complete your first calculation',
      icon: '🎯',
      unlocked: true,
      unlockedAt: '2024-01-01'
    },
    {
      id: 'calculator-explorer',
      name: 'Calculator Explorer',
      description: 'Use 5 different calculators',
      icon: '🗺️',
      unlocked: true,
      unlockedAt: '2024-01-15',
      progress: 5,
      maxProgress: 5
    },
    {
      id: 'math-master',
      name: 'Math Master',
      description: 'Complete 100 calculations',
      icon: '🧮',
      unlocked: false,
      progress: 45,
      maxProgress: 100
    },
    {
      id: 'finance-guru',
      name: 'Finance Guru',
      description: 'Use all financial calculators',
      icon: '💰',
      unlocked: false,
      progress: 3,
      maxProgress: 6
    },
    {
      id: 'daily-user',
      name: 'Daily User',
      description: 'Use calculators for 7 consecutive days',
      icon: '📅',
      unlocked: false,
      progress: 4,
      maxProgress: 7
    },
    {
      id: 'power-user',
      name: 'Power User',
      description: 'Complete 1000 calculations',
      icon: '⚡',
      unlocked: false,
      progress: 45,
      maxProgress: 1000
    }
  ]);

  const { language, currency } = useI18n();

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculation-history');
    const savedFavorites = localStorage.getItem('calculator-favorites');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const getUsageStats = () => {
    const calculatorUsage = history.reduce((acc, item) => {
      acc[item.calculatorId] = (acc[item.calculatorId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryUsage = history.reduce((acc, item) => {
      const calculator = calculators.find(c => c.id === item.calculatorId);
      if (calculator) {
        acc[calculator.category] = (acc[calculator.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topCalculator = Object.entries(calculatorUsage)
      .sort(([, a], [, b]) => b - a)[0];

    const topCategory = Object.entries(categoryUsage)
      .sort(([, a], [, b]) => b - a)[0];

    return {
      totalCalculations: history.length,
      uniqueCalculators: new Set(history.map(h => h.calculatorId)).size,
      topCalculator: topCalculator ? {
        calculator: calculators.find(c => c.id === topCalculator[0]),
        count: topCalculator[1]
      } : null,
      topCategory: topCategory ? {
        category: categories.find(c => c.id === topCategory[0]),
        count: topCategory[1]
      } : null,
      calculatorUsage,
      categoryUsage
    };
  };

  const stats = getUsageStats();
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const membershipDays = Math.floor((new Date().getTime() - new Date(profile.joinDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <SEOHead 
        title="Profile - CalcMate Pro"
        description="Manage your profile, view achievements, and track your calculator usage statistics."
        keywords="user profile, calculator statistics, achievements, usage tracking"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24 border-4 border-white/20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl font-bold text-purple-600">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                    <p className="text-purple-100 mb-2">{profile.email}</p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Member for {membershipDays} days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        <span>{unlockedAchievements.length} achievements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        <span>{stats.totalCalculations} calculations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stats.totalCalculations}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Calculations
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {stats.uniqueCalculators}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Calculators Used
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {favorites.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Favorites
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {unlockedAchievements.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Achievements
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.topCalculator && (
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{stats.topCalculator.calculator?.icon}</span>
                        <div>
                          <div className="font-medium">Most Used Calculator</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {stats.topCalculator.calculator?.name} - {stats.topCalculator.count} uses
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {stats.topCategory && (
                    <div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-blue-500" />
                        <div>
                          <div className="font-medium">Favorite Category</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {stats.topCategory.category?.name} - {stats.topCategory.count} calculations
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={`${achievement.unlocked ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-gray-200'}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-green-500">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                      
                      {achievement.maxProgress && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress || 0) / achievement.maxProgress * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                      
                      {achievement.unlocked && achievement.unlockedAt && (
                        <div className="text-xs text-gray-500 mt-2">
                          Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              {/* Calculator Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Calculator Usage</CardTitle>
                  <CardDescription>Your most frequently used calculators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.calculatorUsage)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 10)
                      .map(([calculatorId, count]) => {
                        const calculator = calculators.find(c => c.id === calculatorId);
                        const percentage = (count / stats.totalCalculations) * 100;
                        return (
                          <div key={calculatorId} className="flex items-center gap-3">
                            <span className="text-xl">{calculator?.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{calculator?.name}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {count} uses ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Category Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Usage</CardTitle>
                  <CardDescription>Distribution of calculations by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.categoryUsage)
                      .sort(([, a], [, b]) => b - a)
                      .map(([categoryId, count]) => {
                        const category = categories.find(c => c.id === categoryId);
                        const percentage = (count / stats.totalCalculations) * 100;
                        return (
                          <div key={categoryId} className="flex items-center gap-3">
                            <div className={`p-2 rounded ${category?.color}`}>
                              <Calculator className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{category?.name}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {count} calculations ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button className="mt-4">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your calculation data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Calculation History</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {history.length} calculations stored
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Export Data
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Favorites</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {favorites.length} favorite calculators
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Backup Favorites
                    </Button>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="destructive" size="sm">
                      Clear All Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}