import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { calculateEMI } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanTenure, setLoanTenure] = useState("20");
  const [result, setResult] = useState(calculateEMI(1000000, 8.5, 20));
  const { toast } = useToast();

  useEffect(() => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const tenure = parseFloat(loanTenure) || 0;

    if (principal > 0 && rate > 0 && tenure > 0) {
      setResult(calculateEMI(principal, rate, tenure));
    }
  }, [loanAmount, interestRate, loanTenure]);

  const handleCopy = () => {
    const text = `EMI: ₹${result.emi.toLocaleString('en-IN')}\nTotal Interest: ₹${result.totalInterest.toLocaleString('en-IN')}\nTotal Amount: ₹${result.totalAmount.toLocaleString('en-IN')}`;
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
            <Input
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="1000000"
            />
          </div>
          
          <div>
            <Label htmlFor="interest-rate">Interest Rate (% per annum)</Label>
            <Input
              id="interest-rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="8.5"
            />
          </div>
          
          <div>
            <Label htmlFor="loan-tenure">Loan Tenure (Years)</Label>
            <Input
              id="loan-tenure"
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="20"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Monthly EMI</div>
            <div className="text-2xl font-bold text-primary">₹{result.emi.toLocaleString('en-IN')}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Interest</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{result.totalInterest.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Amount</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{result.totalAmount.toLocaleString('en-IN')}</div>
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
