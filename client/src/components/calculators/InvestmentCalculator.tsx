
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, TrendingUp, DollarSign, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [investmentPeriod, setInvestmentPeriod] = useState("20");
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [inflationRate, setInflationRate] = useState("3");
  const { toast } = useToast();

  const calculateInvestment = () => {
    const principal = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100 / 12;
    const months = parseFloat(investmentPeriod) * 12;
    const inflation = parseFloat(inflationRate) / 100;

    // Future value calculation
    const futureValuePrincipal = principal * Math.pow(1 + rate, months);
    const futureValueAnnuity = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    const totalFutureValue = futureValuePrincipal + futureValueAnnuity;
    
    const totalContributions = principal + (monthly * months);
    const totalGains = totalFutureValue - totalContributions;
    
    // Inflation adjusted value
    const realValue = totalFutureValue / Math.pow(1 + inflation, parseFloat(investmentPeriod));

    return {
      futureValue: totalFutureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalGains: totalGains.toFixed(2),
      realValue: realValue.toFixed(2),
      monthlyGrowth: ((totalFutureValue - totalContributions) / months).toFixed(2)
    };
  };

  const result = calculateInvestment();

  const generateYearlyData = () => {
    const years = parseInt(investmentPeriod);
    const data = [];
    const principal = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100 / 12;

    for (let year = 1; year <= years; year++) {
      const months = year * 12;
      const futureValuePrincipal = principal * Math.pow(1 + rate, months);
      const futureValueAnnuity = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
      const totalValue = futureValuePrincipal + futureValueAnnuity;
      const contributions = principal + (monthly * months);
      
      data.push({
        year,
        totalValue: totalValue.toFixed(0),
        contributions: contributions.toFixed(0),
        gains: (totalValue - contributions).toFixed(0)
      });
    }
    return data;
  };

  const yearlyData = generateYearlyData();

  const chartData = {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Total Contributions',
        data: yearlyData.map(d => d.contributions),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Investment Gains',
        data: yearlyData.map(d => d.gains),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ]
  };

  const lineChartData = {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Portfolio Value',
        data: yearlyData.map(d => d.totalValue),
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const getRiskProfile = () => {
    switch(riskTolerance) {
      case 'conservative': return { color: 'green', return: '4-6%', volatility: 'Low' };
      case 'moderate': return { color: 'blue', return: '6-8%', volatility: 'Medium' };
      case 'aggressive': return { color: 'red', return: '8-12%', volatility: 'High' };
      default: return { color: 'blue', return: '6-8%', volatility: 'Medium' };
    }
  };

  const riskProfile = getRiskProfile();

  const handleCopy = () => {
    const text = `Future Value: $${result.futureValue}\nTotal Gains: $${result.totalGains}\nReal Value: $${result.realValue}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Investment calculation results copied successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-300">
              <Target className="w-5 h-5" />
              Investment Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="initialAmount">Initial Investment ($)</Label>
                <Input
                  id="initialAmount"
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Expected Annual Return: {annualReturn}%</Label>
              <Slider
                value={[parseFloat(annualReturn)]}
                onValueChange={(value) => setAnnualReturn(value[0].toString())}
                max={15}
                min={1}
                step={0.5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Investment Period: {investmentPeriod} years</Label>
              <Slider
                value={[parseFloat(investmentPeriod)]}
                onValueChange={(value) => setInvestmentPeriod(value[0].toString())}
                max={40}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Risk Tolerance</Label>
                <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Inflation Rate: {inflationRate}%</Label>
                <Slider
                  value={[parseFloat(inflationRate)]}
                  onValueChange={(value) => setInflationRate(value[0].toString())}
                  max={10}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Risk Profile:</span>
                <Badge variant="secondary" className={`bg-${riskProfile.color}-100 text-${riskProfile.color}-800`}>
                  {riskTolerance.charAt(0).toUpperCase() + riskTolerance.slice(1)}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Expected Return: {riskProfile.return} | Volatility: {riskProfile.volatility}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
              <DollarSign className="w-5 h-5" />
              Projection Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400">Future Value</div>
              <div className="text-2xl font-bold text-green-600">${result.futureValue}</div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Gains</div>
              <div className="text-xl font-bold text-blue-600">${result.totalGains}</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Contributions</span>
                <span className="font-medium">${result.totalContributions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Real Value (Inflation Adj.)</span>
                <span className="font-medium">${result.realValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Monthly Growth</span>
                <span className="font-medium">${result.monthlyGrowth}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Investment Growth Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="growth" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="growth">Growth Over Time</TabsTrigger>
              <TabsTrigger value="breakdown">Yearly Breakdown</TabsTrigger>
            </TabsList>
            <TabsContent value="growth" className="mt-6">
              <div className="h-80">
                <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </TabsContent>
            <TabsContent value="breakdown" className="mt-6">
              <div className="h-80">
                <Bar data={chartData} options={{ maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
