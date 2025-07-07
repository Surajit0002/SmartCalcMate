import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { PiggyBank, TrendingUp, Target, DollarSign } from 'lucide-react';

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState('5000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('10');
  const [frequency, setFrequency] = useState('monthly');
  const [results, setResults] = useState<any>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyAmount);
    const annualRate = parseFloat(expectedReturn) / 100;
    const years = parseFloat(timePeriod);
    
    let monthlyRate: number;
    let totalMonths: number;
    let investmentFrequency: number;

    switch (frequency) {
      case 'weekly':
        monthlyRate = annualRate / 52;
        totalMonths = years * 52;
        investmentFrequency = 52;
        break;
      case 'monthly':
        monthlyRate = annualRate / 12;
        totalMonths = years * 12;
        investmentFrequency = 12;
        break;
      case 'quarterly':
        monthlyRate = annualRate / 4;
        totalMonths = years * 4;
        investmentFrequency = 4;
        break;
      case 'yearly':
        monthlyRate = annualRate;
        totalMonths = years;
        investmentFrequency = 1;
        break;
      default:
        monthlyRate = annualRate / 12;
        totalMonths = years * 12;
        investmentFrequency = 12;
    }

    if (P && monthlyRate && totalMonths) {
      // SIP Formula: M * [((1 + r)^n - 1) / r] * (1 + r)
      const futureValue = P * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
      const totalInvestment = P * totalMonths;
      const totalReturns = futureValue - totalInvestment;

      // Year-wise breakdown
      const yearlyData = [];
      for (let year = 1; year <= years; year++) {
        const periodsInYear = year * investmentFrequency;
        const yearlyFutureValue = P * (((Math.pow(1 + monthlyRate, periodsInYear) - 1) / monthlyRate) * (1 + monthlyRate));
        const yearlyInvestment = P * periodsInYear;
        const yearlyReturns = yearlyFutureValue - yearlyInvestment;

        yearlyData.push({
          year,
          investment: Math.round(yearlyInvestment),
          returns: Math.round(yearlyReturns),
          total: Math.round(yearlyFutureValue)
        });
      }

      setResults({
        futureValue: Math.round(futureValue),
        totalInvestment: Math.round(totalInvestment),
        totalReturns: Math.round(totalReturns),
        yearlyData,
        monthlyAmount: P,
        years,
        returnRate: parseFloat(expectedReturn)
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getFrequencyText = () => {
    switch (frequency) {
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'yearly': return 'Yearly';
      default: return 'Monthly';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <PiggyBank className="w-8 h-8" />
          SIP Calculator
        </h1>
        <p className="text-muted-foreground">Plan your systematic investment with detailed projections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Investment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">Investment Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                placeholder="5000"
              />
            </div>
            <div>
              <Label htmlFor="return">Expected Annual Return (%)</Label>
              <Input
                id="return"
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                placeholder="12"
              />
            </div>
            <div>
              <Label htmlFor="period">Investment Period (Years)</Label>
              <Input
                id="period"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="10"
              />
            </div>
            <div>
              <Label htmlFor="frequency">Investment Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculateSIP} className="w-full">
              Calculate SIP
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                SIP Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.futureValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Future Value</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">
                      {formatCurrency(results.totalInvestment)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Investment</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-lg font-semibold text-purple-600">
                      {formatCurrency(results.totalReturns)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Returns</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>{getFrequencyText()} Investment:</span>
                    <span className="font-semibold">{formatCurrency(results.monthlyAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Period:</span>
                    <span className="font-semibold">{results.years} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Return:</span>
                    <span className="font-semibold">{results.returnRate}% per annum</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts Section */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="investment" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    name="Investment"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="returns" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    name="Returns"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Future Value Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Value Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    name="Total Value"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="investment" 
                    stroke="#3b82f6" 
                    strokeDasharray="5 5"
                    name="Investment"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Yearly Breakdown Table */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Year-wise Investment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Year</th>
                    <th className="text-right p-2">Investment</th>
                    <th className="text-right p-2">Returns</th>
                    <th className="text-right p-2">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyData.map((year: any) => (
                    <tr key={year.year} className="border-b">
                      <td className="p-2">{year.year}</td>
                      <td className="text-right p-2">{formatCurrency(year.investment)}</td>
                      <td className="text-right p-2 text-green-600">{formatCurrency(year.returns)}</td>
                      <td className="text-right p-2 font-semibold">{formatCurrency(year.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}