import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Target, DollarSign, Percent, BarChart3 } from 'lucide-react';

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [expectedReturn, setExpectedReturn] = useState('10');
  const [timePeriod, setTimePeriod] = useState('20');
  const [compoundFrequency, setCompoundFrequency] = useState('12');
  const [inflationRate, setInflationRate] = useState('3');
  const [results, setResults] = useState<any>(null);

  const calculateInvestment = () => {
    const principal = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyContribution);
    const annualRate = parseFloat(expectedReturn) / 100;
    const years = parseFloat(timePeriod);
    const frequency = parseFloat(compoundFrequency);
    const inflation = parseFloat(inflationRate) / 100;

    if (principal >= 0 && monthly >= 0 && annualRate && years && frequency) {
      const periodicRate = annualRate / frequency;
      const totalPeriods = years * frequency;
      
      // Future value of initial investment
      const futureValuePrincipal = principal * Math.pow(1 + periodicRate, totalPeriods);
      
      // Future value of regular contributions (annuity)
      const periodicContribution = monthly * (12 / frequency);
      const futureValueAnnuity = periodicContribution * 
        ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
      
      const totalFutureValue = futureValuePrincipal + futureValueAnnuity;
      const totalContributions = principal + (monthly * 12 * years);
      const totalReturns = totalFutureValue - totalContributions;
      
      // Inflation-adjusted value
      const realValue = totalFutureValue / Math.pow(1 + inflation, years);
      
      // Year-by-year breakdown
      const yearlyData = [];
      let currentValue = principal;
      let totalInvested = principal;
      
      for (let year = 1; year <= years; year++) {
        // Compound the existing value
        currentValue = currentValue * Math.pow(1 + periodicRate, frequency);
        
        // Add monthly contributions for the year
        const yearlyContributions = monthly * 12;
        totalInvested += yearlyContributions;
        
        // Future value of this year's contributions
        const contributionValue = yearlyContributions * 
          ((Math.pow(1 + periodicRate, frequency) - 1) / periodicRate) * 
          (frequency / 12);
        
        currentValue += contributionValue;
        
        const gains = currentValue - totalInvested;
        const realValueYear = currentValue / Math.pow(1 + inflation, year);
        
        yearlyData.push({
          year,
          invested: Math.round(totalInvested),
          gains: Math.round(gains),
          total: Math.round(currentValue),
          realValue: Math.round(realValueYear)
        });
      }

      // Calculate different scenarios
      const scenarios = [
        { name: 'Conservative (6%)', rate: 0.06 },
        { name: 'Moderate (8%)', rate: 0.08 },
        { name: 'Current (' + expectedReturn + '%)', rate: annualRate },
        { name: 'Aggressive (12%)', rate: 0.12 }
      ].map(scenario => {
        const scenarioRate = scenario.rate / frequency;
        const scenarioFVPrincipal = principal * Math.pow(1 + scenarioRate, totalPeriods);
        const scenarioFVAnnuity = periodicContribution * 
          ((Math.pow(1 + scenarioRate, totalPeriods) - 1) / scenarioRate);
        return {
          ...scenario,
          value: Math.round(scenarioFVPrincipal + scenarioFVAnnuity)
        };
      });

      setResults({
        futureValue: Math.round(totalFutureValue),
        totalContributions: Math.round(totalContributions),
        totalReturns: Math.round(totalReturns),
        realValue: Math.round(realValue),
        yearlyData,
        scenarios,
        annualizedReturn: ((totalFutureValue / totalContributions) ** (1 / years) - 1) * 100,
        monthlyReturnNeeded: (Math.pow(totalFutureValue / totalContributions, 1 / (years * 12)) - 1) * 100
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <TrendingUp className="w-8 h-8" />
          Investment Calculator
        </h1>
        <p className="text-muted-foreground">Plan your investment growth with detailed projections and scenarios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Investment Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="initial">Initial Investment ($)</Label>
              <Input
                id="initial"
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                placeholder="10000"
              />
            </div>
            <div>
              <Label htmlFor="monthly">Monthly Contribution ($)</Label>
              <Input
                id="monthly"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="500"
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
                placeholder="10"
              />
            </div>
            <div>
              <Label htmlFor="period">Investment Period (Years)</Label>
              <Input
                id="period"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="20"
              />
            </div>
            <div>
              <Label htmlFor="frequency">Compounding Frequency</Label>
              <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="inflation">Inflation Rate (%)</Label>
              <Input
                id="inflation"
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                placeholder="3"
              />
            </div>
            <Button onClick={calculateInvestment} className="w-full">
              Calculate Investment
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Investment Results
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
                      {formatCurrency(results.totalContributions)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Invested</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-lg font-semibold text-purple-600">
                      {formatCurrency(results.totalReturns)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Returns</div>
                  </div>
                </div>

                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-lg font-semibold text-orange-600">
                    {formatCurrency(results.realValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">Inflation-Adjusted Value</div>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Annualized Return:</span>
                    <span className="font-semibold">{results.annualizedReturn.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return Multiple:</span>
                    <span className="font-semibold">{(results.futureValue / results.totalContributions).toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabs for detailed analysis */}
      {results && (
        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">Growth Chart</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="breakdown">Year Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={results.yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value: any) => formatCurrency(value)} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="invested" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      name="Invested"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="gains" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981" 
                      name="Gains"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="realValue" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Real Value"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Different Return Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.scenarios.map((scenario: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-semibold">{scenario.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {(scenario.rate * 100).toFixed(1)}% annual return
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(scenario.value)}</div>
                        <div className="text-sm text-muted-foreground">
                          {((scenario.value / results.totalContributions).toFixed(2))}x multiple
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Year-by-Year Investment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Invested</th>
                        <th className="text-right p-2">Gains</th>
                        <th className="text-right p-2">Total Value</th>
                        <th className="text-right p-2">Real Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlyData.map((year: any) => (
                        <tr key={year.year} className="border-b">
                          <td className="p-2">{year.year}</td>
                          <td className="text-right p-2">{formatCurrency(year.invested)}</td>
                          <td className="text-right p-2 text-green-600">{formatCurrency(year.gains)}</td>
                          <td className="text-right p-2 font-semibold">{formatCurrency(year.total)}</td>
                          <td className="text-right p-2 text-orange-600">{formatCurrency(year.realValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}