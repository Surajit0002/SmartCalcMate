
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Share2, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

interface CompoundResult {
  futureValue: number;
  totalInterest: number;
  principal: number;
}

function calculateCompoundInterest(principal: number, rate: number, time: number, frequency: number): CompoundResult {
  const futureValue = principal * Math.pow((1 + rate / 100 / frequency), frequency * time);
  const totalInterest = futureValue - principal;
  
  return {
    futureValue: Math.round(futureValue),
    totalInterest: Math.round(totalInterest),
    principal: Math.round(principal)
  };
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [interestRate, setInterestRate] = useState("8");
  const [timePeriod, setTimePeriod] = useState("5");
  const [compoundFreq, setCompoundFreq] = useState("12");
  const [result, setResult] = useState(calculateCompoundInterest(100000, 8, 5, 12));
  const { toast } = useToast();

  useEffect(() => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseFloat(timePeriod) || 0;
    const f = parseFloat(compoundFreq) || 1;

    if (p > 0 && r > 0 && t > 0) {
      setResult(calculateCompoundInterest(p, r, t, f));
    }
  }, [principal, interestRate, timePeriod, compoundFreq]);

  const handleCopy = () => {
    const text = `Future Value: ₹${result.futureValue.toLocaleString()}\nPrincipal: ₹${result.principal.toLocaleString()}\nInterest Earned: ₹${result.totalInterest.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Compound interest results copied successfully",
    });
  };

  const yearlyData = Array.from({ length: parseInt(timePeriod) }, (_, i) => {
    const year = i + 1;
    const yearResult = calculateCompoundInterest(parseFloat(principal), parseFloat(interestRate), year, parseFloat(compoundFreq));
    return {
      year,
      principal: parseFloat(principal),
      amount: yearResult.futureValue,
      interest: yearResult.totalInterest
    };
  });

  const frequencyOptions = [
    { value: "1", label: "Annually" },
    { value: "2", label: "Semi-annually" },
    { value: "4", label: "Quarterly" },
    { value: "12", label: "Monthly" },
    { value: "365", label: "Daily" }
  ];

  const chartConfig = {
    principal: { label: "Principal", color: "#3b82f6" },
    interest: { label: "Interest", color: "#10b981" },
    amount: { label: "Total Amount", color: "#8b5cf6" }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <DollarSign className="w-6 h-6 text-purple-600" />
            Compound Interest Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="principal" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Principal Amount (₹)
              </Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-purple-500"
                placeholder="Enter principal amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Annual Interest Rate (%)
              </Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-purple-500"
                placeholder="Enter interest rate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timePeriod" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Period (Years)
              </Label>
              <Input
                id="timePeriod"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-purple-500"
                placeholder="Enter time period"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Compound Frequency
              </Label>
              <Select value={compoundFreq} onValueChange={setCompoundFreq}>
                <SelectTrigger className="text-lg font-semibold border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">Future Value</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">₹{result.futureValue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Interest</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{result.totalInterest.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">Growth Multiple</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{(result.futureValue / result.principal).toFixed(2)}x</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-4">
          <div className="flex gap-2">
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

      {/* Growth Chart */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Investment Growth Over Time
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
                  dataKey="principal"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Principal"
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  name="Interest"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Yearly Breakdown */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Year-wise Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="interest" fill="#10b981" name="Interest Earned" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
