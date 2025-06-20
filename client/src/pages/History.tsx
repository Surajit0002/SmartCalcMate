import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Search, Calculator, Trash2, Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { calculators, categories } from '@/lib/calculatorData';
import { useI18n } from '@/hooks/useI18n';
import SEOHead from '@/components/SEOHead';

interface CalculationHistory {
  id: string;
  calculatorId: string;
  timestamp: string;
  inputs: Record<string, any>;
  result: any;
  title: string;
}

export default function History() {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { language, formatCurrency } = useI18n();

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculation-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveHistory = (newHistory: CalculationHistory[]) => {
    setHistory(newHistory);
    localStorage.setItem('calculation-history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculation-history');
  };

  const removeHistoryItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    saveHistory(newHistory);
  };

  const getFilteredHistory = () => {
    let filtered = history;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => {
        const calculator = calculators.find(c => c.id === item.calculatorId);
        return (
          calculator?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Filter by time period
    const now = new Date();
    switch (filterPeriod) {
      case 'today':
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.timestamp);
          return itemDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(item => new Date(item.timestamp) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(item => new Date(item.timestamp) >= monthAgo);
        break;
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        break;
      case 'calculator':
        filtered.sort((a, b) => {
          const calcA = calculators.find(c => c.id === a.calculatorId)?.name || '';
          const calcB = calculators.find(c => c.id === b.calculatorId)?.name || '';
          return calcA.localeCompare(calcB);
        });
        break;
    }

    return filtered;
  };

  const filteredHistory = getFilteredHistory();

  const getUsageStats = () => {
    const calculatorUsage = history.reduce((acc, item) => {
      acc[item.calculatorId] = (acc[item.calculatorId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCalculators = Object.entries(calculatorUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, count]) => ({
        calculator: calculators.find(c => c.id === id),
        count
      }));

    return { calculatorUsage, topCalculators };
  };

  const { topCalculators } = getUsageStats();

  const formatResult = (result: any, calculatorId: string) => {
    if (typeof result === 'number') {
      if (calculatorId.includes('currency') || calculatorId.includes('investment') || calculatorId.includes('mortgage')) {
        return formatCurrency(result);
      }
      return result.toLocaleString();
    }
    if (typeof result === 'object' && result !== null) {
      return Object.entries(result).map(([key, value]) => `${key}: ${value}`).join(', ');
    }
    return String(result);
  };

  return (
    <>
      <SEOHead 
        title="Calculation History - CalcMate Pro"
        description="View and manage your calculation history. Track your usage patterns and revisit previous calculations."
        keywords="calculation history, calculator usage, saved calculations"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="h-8 w-8 text-green-500" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Calculation History
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Track and revisit your previous calculations
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {history.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Calculations
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {new Set(history.map(h => h.calculatorId)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Unique Calculators
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Today's Calculations
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {history.filter(h => new Date(h.timestamp) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  This Week
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Calculators */}
          {topCalculators.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Most Used Calculators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {topCalculators.map(({ calculator, count }, index) => (
                    <div key={calculator?.id} className="text-center">
                      <div className="text-2xl mb-2">{calculator?.icon}</div>
                      <div className="font-medium text-sm">{calculator?.name}</div>
                      <Badge variant="secondary" className="mt-1">
                        {count} uses
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {history.length > 0 && (
            <>
              {/* Controls */}
              <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search calculations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="calculator">By Calculator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  onClick={clearHistory}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              {/* History List */}
              <div className="space-y-4">
                {filteredHistory.map((item) => {
                  const calculator = calculators.find(c => c.id === item.calculatorId);
                  const category = categories.find(c => c.id === calculator?.category);
                  return (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="text-2xl">{calculator?.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <Badge variant="outline">{calculator?.name}</Badge>
                                {category && (
                                  <Badge variant="secondary" className={`${category.color} text-white text-xs`}>
                                    {category.name}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <Calendar className="h-4 w-4 inline mr-1" />
                                {new Date(item.timestamp).toLocaleString()}
                              </div>
                              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                Result: {formatResult(item.result, item.calculatorId)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/calculator/${item.calculatorId}`}>
                              <Button variant="outline" size="sm">
                                Use Again
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeHistoryItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredHistory.length === 0 && (searchQuery || filterPeriod !== 'all') && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No calculations found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {history.length === 0 && (
            <div className="text-center py-16">
              <Clock className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No calculation history yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start using calculators to build your history. All your calculations will be automatically saved here for easy access.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                  Start Calculating
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}