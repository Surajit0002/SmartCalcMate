import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { calculateSIP } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [result, setResult] = useState(calculateSIP(5000, 12, 10));
  const { toast } = useToast();

  useEffect(() => {
    const investment = parseFloat(monthlyInvestment) || 0;
    const returns = parseFloat(expectedReturn) || 0;
    const period = parseFloat(timePeriod) || 0;

    if (investment > 0 && returns > 0 && period > 0) {
      setResult(calculateSIP(investment, returns, period));
    }
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const handleCopy = () => {
    const text = `Future Value: ₹${result.futureValue.toLocaleString('en-IN')}\nTotal Investment: ₹${result.totalInvestment.toLocaleString('en-IN')}\nTotal Gains: ₹${result.totalGains.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "SIP calculation results copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `SIP Calculator Result:\nMonthly Investment: ₹${parseFloat(monthlyInvestment).toLocaleString('en-IN')}\nExpected Return: ${expectedReturn}%\nTime Period: ${timePeriod} years\n\nFuture Value: ₹${result.futureValue.toLocaleString('en-IN')}\nTotal Investment: ₹${result.totalInvestment.toLocaleString('en-IN')}\nTotal Gains: ₹${result.totalGains.toLocaleString('en-IN')}`;
    
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>SIP Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="monthly-investment">Monthly Investment (₹)</Label>
            <Input
              id="monthly-investment"
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="5000"
            />
          </div>
          
          <div>
            <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
            <Input
              id="expected-return"
              type="number"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="12"
            />
          </div>
          
          <div>
            <Label htmlFor="time-period">Time Period (Years)</Label>
            <Input
              id="time-period"
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Future Value</div>
            <div className="text-2xl font-bold text-primary">₹{result.futureValue.toLocaleString('en-IN')}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Investment</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{result.totalInvestment.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Gains</div>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">₹{result.totalGains.toLocaleString('en-IN')}</div>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
