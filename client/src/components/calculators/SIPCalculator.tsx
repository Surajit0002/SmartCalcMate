
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2, TrendingUp, PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

interface SIPResult {
  futureValue: number;
  totalInvestment: number;
  totalReturns: number;
}

function calculateSIP(monthlyAmount: number, annualRate: number, years: number): SIPResult {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const totalInvestment = monthlyAmount * totalMonths;
  
  const futureValue = monthlyAmount * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);
  const totalReturns = futureValue - totalInvestment;
  
  return {
    futureValue: Math.round(futureValue),
    totalInvestment: Math.round(totalInvestment),
    totalReturns: Math.round(totalReturns)
  };
}

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [result, setResult] = useState(calculateSIP(5000, 12, 10));
  const { toast } = useToast();

  useEffect(() => {
    const amount = parseFloat(monthlyAmount) || 0;
    const rate = parseFloat(expectedReturn) || 0;
    const years = parseFloat(timePeriod) || 0;

    if (amount > 0 && rate > 0 && years > 0) {
      setResult(calculateSIP(amount, rate, years));
    }
  }, [monthlyAmount, expectedReturn, timePeriod]);

  const handleCopy = () => {
    const text = `Future Value: ₹${result.futureValue.toLocaleString()}\nTotal Investment: ₹${result.totalInvestment.toLocaleString()}\nTotal Returns: ₹${result.totalReturns.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "SIP calculation results copied successfully",
    });
  };

  const pieData = [
    { name: 'Total Investment', value: result.totalInvestment, fill: '#3b82f6' },
    { name: 'Returns', value: result.totalReturns, fill: '#10b981' }
  ];

  const yearlyData = Array.from({ length: parseInt(timePeriod) }, (_, i) => {
    const year = i + 1;
    const invested = parseFloat(monthlyAmount) * 12 * year;
    const returns = calculateSIP(parseFloat(monthlyAmount), parseFloat(expectedReturn), year);
    return {
      year,
      invested,
      value: returns.futureValue,
      returns: returns.totalReturns
    };
  });

  const chartConfig = {
    invested: { label: "Invested Amount", color: "#3b82f6" },
    returns: { label: "Returns", color: "#10b981" },
    value: { label: "Total Value", color: "#8b5cf6" }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <PiggyBank className="w-6 h-6 text-green-600" />
            SIP Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyAmount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Monthly Investment (₹)
              </Label>
              <Input
                id="monthlyAmount"
                type="number"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-green-500"
                placeholder="Enter monthly amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedReturn" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Expected Return (% per annum)
              </Label>
              <Input
                id="expectedReturn"
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-green-500"
                placeholder="Enter expected return"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timePeriod" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Investment Period (Years)
              </Label>
              <Input
                id="timePeriod"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-green-500"
                placeholder="Enter time period"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Investment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-600 dark:text-gray-300">Future Value</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">₹{result.futureValue.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Investment</p>
                <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">₹{result.totalInvestment.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Returns</p>
                <p className="text-xl font-semibold text-green-600 dark:text-green-400">₹{result.totalReturns.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleCopy} variant="outline" className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Results
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Investment vs Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            SIP Growth Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData}>
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="invested"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Invested Amount"
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
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
