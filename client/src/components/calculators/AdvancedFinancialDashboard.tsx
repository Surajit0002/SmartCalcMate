import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useI18n } from '@/hooks/useI18n';
import { 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  CreditCard,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Calculator,
  Zap
} from 'lucide-react';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyContribution: number;
  category: 'retirement' | 'emergency' | 'house' | 'education' | 'vacation' | 'other';
}

interface PortfolioAllocation {
  stocks: number;
  bonds: number;
  cash: number;
  realEstate: number;
  crypto: number;
}

export default function AdvancedFinancialDashboard() {
  const { formatCurrency, getCurrencySymbol } = useI18n();
  
  // Financial Goals State
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 50000,
      currentAmount: 15000,
      targetDate: '2025-12-31',
      monthlyContribution: 1000,
      category: 'emergency'
    },
    {
      id: '2',
      name: 'Retirement Savings',
      targetAmount: 1000000,
      currentAmount: 125000,
      targetDate: '2054-12-31',
      monthlyContribution: 2000,
      category: 'retirement'
    }
  ]);

  // Portfolio State
  const [portfolio, setPortfolio] = useState<PortfolioAllocation>({
    stocks: 60,
    bonds: 25,
    cash: 10,
    realEstate: 3,
    crypto: 2
  });

  // Financial Metrics
  const [monthlyIncome, setMonthlyIncome] = useState('8000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('5500');
  const [totalAssets, setTotalAssets] = useState('250000');
  const [totalLiabilities, setTotalLiabilities] = useState('180000');

  const calculateFinancialMetrics = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const assets = parseFloat(totalAssets) || 0;
    const liabilities = parseFloat(totalLiabilities) || 0;

    const monthlySavings = income - expenses;
    const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0;
    const netWorth = assets - liabilities;
    const debtToAssetRatio = assets > 0 ? (liabilities / assets) * 100 : 0;

    return {
      monthlySavings,
      savingsRate,
      netWorth,
      debtToAssetRatio,
      emergencyFundMonths: expenses > 0 ? (goals.find(g => g.category === 'emergency')?.currentAmount || 0) / expenses : 0
    };
  };

  const metrics = calculateFinancialMetrics();

  const calculateGoalProgress = (goal: FinancialGoal) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.currentAmount;
    const monthsToTarget = new Date(goal.targetDate).getTime() - new Date().getTime();
    const monthsRemaining = Math.ceil(monthsToTarget / (1000 * 60 * 60 * 24 * 30));
    const requiredMonthly = monthsRemaining > 0 ? remaining / monthsRemaining : 0;
    
    return {
      progress: Math.min(progress, 100),
      remaining,
      monthsRemaining,
      requiredMonthly,
      onTrack: goal.monthlyContribution >= requiredMonthly
    };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'retirement': return <PiggyBank className="h-5 w-5" />;
      case 'emergency': return <Target className="h-5 w-5" />;
      case 'house': return <DollarSign className="h-5 w-5" />;
      case 'education': return <Calculator className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'retirement': return 'bg-blue-500';
      case 'emergency': return 'bg-red-500';
      case 'house': return 'bg-green-500';
      case 'education': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Key Metrics Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Net Worth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(metrics.netWorth)}
            </div>
            <p className="text-xs text-muted-foreground">
              Assets minus liabilities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.savingsRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(metrics.monthlySavings)}/month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-orange-600" />
              Debt Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {metrics.debtToAssetRatio.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Debt to assets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              Emergency Fund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {metrics.emergencyFundMonths.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Months of expenses
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="planner">Planner</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expenses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly Cash Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income</Label>
                  <Input
                    id="income"
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    placeholder="Enter monthly income"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenses">Monthly Expenses</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value)}
                    placeholder="Enter monthly expenses"
                  />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monthly Savings:</span>
                    <span className={`font-bold ${metrics.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(metrics.monthlySavings)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assets and Liabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Balance Sheet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assets">Total Assets</Label>
                  <Input
                    id="assets"
                    type="number"
                    value={totalAssets}
                    onChange={(e) => setTotalAssets(e.target.value)}
                    placeholder="Enter total assets"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liabilities">Total Liabilities</Label>
                  <Input
                    id="liabilities"
                    type="number"
                    value={totalLiabilities}
                    onChange={(e) => setTotalLiabilities(e.target.value)}
                    placeholder="Enter total liabilities"
                  />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Net Worth:</span>
                    <span className={`font-bold ${metrics.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(metrics.netWorth)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const progress = calculateGoalProgress(goal);
              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getCategoryColor(goal.category)} text-white`}>
                          {getCategoryIcon(goal.category)}
                        </div>
                        {goal.name}
                      </CardTitle>
                      <Badge variant={progress.onTrack ? "default" : "destructive"}>
                        {progress.onTrack ? "On Track" : "Behind"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress.progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current</div>
                        <div className="font-medium">{formatCurrency(goal.currentAmount)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Target</div>
                        <div className="font-medium">{formatCurrency(goal.targetAmount)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Monthly</div>
                        <div className="font-medium">{formatCurrency(goal.monthlyContribution)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Required</div>
                        <div className={`font-medium ${progress.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(progress.requiredMonthly)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="text-sm text-muted-foreground">
                        {progress.monthsRemaining} months to target date
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Asset Allocation
              </CardTitle>
              <CardDescription>
                Manage your investment portfolio allocation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(portfolio).map(([asset, percentage]) => (
                  <div key={asset} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="capitalize">{asset}</Label>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.entries(portfolio).map(([asset, percentage]) => (
                  <div key={asset} className="space-y-2">
                    <Label className="capitalize">{asset}</Label>
                    <Input
                      type="number"
                      value={percentage}
                      onChange={(e) => setPortfolio(prev => ({
                        ...prev,
                        [asset]: parseFloat(e.target.value) || 0
                      }))}
                      min="0"
                      max="100"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-medium">Total Allocation:</span>
                <span className={`font-bold ${
                  Object.values(portfolio).reduce((sum, val) => sum + val, 0) === 100 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {Object.values(portfolio).reduce((sum, val) => sum + val, 0)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planner" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Financial Planning Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Calculator className="h-6 w-6 mb-2" />
                  Retirement Calculator
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  Loan Calculator
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Investment Calculator
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Target className="h-6 w-6 mb-2" />
                  Goal Planner
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <PiggyBank className="h-6 w-6 mb-2" />
                  Savings Calculator
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <CreditCard className="h-6 w-6 mb-2" />
                  Debt Payoff
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}