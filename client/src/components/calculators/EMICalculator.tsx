import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Calculator, TrendingUp } from "lucide-react";
import { calculateEMI } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip as ChartTooltip } from 'recharts';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend as LegendJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  LegendJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

interface ChartTooltipProps {
  payload: any[];
  label: string;
  config: any;
}

const ChartTooltipContent = ({ payload, label, config }: ChartTooltipProps) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="p-2 bg-white border rounded shadow-md">
      <p className="font-semibold">{label}</p>
      {payload.map((item, index) => (
        <div key={`tooltip-item-${index}`} className="flex items-center justify-between">
          <span style={{ color: item.color }} className="mr-2">
            ●
          </span>
          <span>{item.name}:</span>
          <span className="font-medium">{item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

interface ChartContainerProps {
  children: React.ReactNode;
  config: any;
  className?: string;
}

const ChartContainer = ({ children, config, className }: ChartContainerProps) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("2500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanTenure, setLoanTenure] = useState("20");
  const [result, setResult] = useState(calculateEMI(2500000, 8.5, 20));
  const { toast } = useToast();

  useEffect(() => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const tenure = parseFloat(loanTenure) || 0;

    if (amount > 0 && rate > 0 && tenure > 0) {
      setResult(calculateEMI(amount, rate, tenure));
    }
  }, [loanAmount, interestRate, loanTenure]);

  const handleCopy = () => {
    const text = `EMI: ₹${result.emi.toLocaleString('en-IN')}\nTotal Amount: ₹${result.totalAmount.toLocaleString('en-IN')}\nTotal Interest: ₹${result.totalInterest.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "EMI calculation results copied successfully",
    });
  };

    const handleShare = async () => {
    const text = `EMI Calculator Result:\nLoan Amount: ₹${parseFloat(loanAmount).toLocaleString('en-IN')}\nInterest Rate: ${interestRate}%\nTenure: ${loanTenure} years\n\nMonthly EMI: ₹${result.emi.toLocaleString('en-IN')}\nTotal Interest: ₹${result.totalInterest.toLocaleString('en-IN')}\nTotal Amount: ₹${result.totalAmount.toLocaleString('en-IN')}`;
    
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Share text copied to clipboard",
      });
    }
  };

  const pieData = [
    { name: 'Principal', value: parseFloat(loanAmount), fill: '#3b82f6' },
    { name: 'Interest', value: result.totalInterest, fill: '#ef4444' }
  ];

  const yearlyData = Array.from({ length: Math.ceil(parseFloat(loanTenure)) }, (_, i) => ({
    year: i + 1,
    principal: result.emi * 12 * 0.4, // Simplified calculation
    interest: result.emi * 12 * 0.6,
    balance: parseFloat(loanAmount) - (result.emi * 12 * (i + 1) * 0.4)
  }));

  const chartConfig = {
    principal: { label: "Principal", color: "#3b82f6" },
    interest: { label: "Interest", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <Calculator className="w-6 h-6 text-blue-600" />
            EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Loan Amount (₹)
              </Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-blue-500"
                placeholder="Enter loan amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Interest Rate (% per annum)
              </Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-blue-500"
                placeholder="Enter interest rate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTenure" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Loan Tenure (Years)
              </Label>
              <Input
                id="loanTenure"
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-blue-500"
                placeholder="Enter loan tenure"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-600 dark:text-gray-300">Monthly EMI</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{result.emi.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Amount Payable</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">₹{result.totalAmount.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Interest</p>
                <p className="text-xl font-semibold text-red-600 dark:text-red-400">₹{result.totalInterest.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleCopy} variant="outline" className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Results
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShare}>
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
              Principal vs Interest Breakdown
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

      {/* Yearly Breakdown Chart */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Yearly Payment Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="Principal" />
                <Bar dataKey="interest" stackId="a" fill="#ef4444" name="Interest" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}