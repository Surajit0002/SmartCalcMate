
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Share2, TrendingUp, Calculator, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("7.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [downPayment, setDownPayment] = useState("100000");
  const [propertyTax, setPropertyTax] = useState("8000");
  const [insurance, setInsurance] = useState("3000");
  const [pmi, setPmi] = useState("2000");
  const { toast } = useToast();

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const monthlyTax = parseFloat(propertyTax) / 12;
    const monthlyInsurance = parseFloat(insurance) / 12;
    const monthlyPmi = parseFloat(pmi) / 12;
    
    const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPmi;
    const totalInterest = (monthlyPayment * numPayments) - principal;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: (monthlyPayment * numPayments).toFixed(2),
      principal: principal.toFixed(2)
    };
  };

  const result = calculateMortgage();

  const chartData = {
    labels: ['Principal', 'Interest', 'Property Tax', 'Insurance', 'PMI'],
    datasets: [{
      data: [
        parseFloat(result.principal),
        parseFloat(result.totalInterest),
        parseFloat(propertyTax),
        parseFloat(insurance),
        parseFloat(pmi)
      ],
      backgroundColor: [
        '#3B82F6',
        '#EF4444',
        '#10B981',
        '#F59E0B',
        '#8B5CF6'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const lineChartData = {
    labels: Array.from({length: parseInt(loanTerm)}, (_, i) => `Year ${i + 1}`),
    datasets: [{
      label: 'Remaining Balance',
      data: Array.from({length: parseInt(loanTerm)}, (_, i) => {
        const principal = parseFloat(loanAmount) - parseFloat(downPayment);
        const monthlyRate = parseFloat(interestRate) / 100 / 12;
        const monthlyPayment = parseFloat(result.monthlyPayment);
        let balance = principal;
        
        for (let month = 1; month <= (i + 1) * 12; month++) {
          const interestPayment = balance * monthlyRate;
          const principalPayment = monthlyPayment - interestPayment;
          balance -= principalPayment;
        }
        return Math.max(0, balance);
      }),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  const handleCopy = () => {
    const text = `Monthly Payment: $${result.monthlyPayment}\nTotal Monthly: $${result.totalMonthlyPayment}\nTotal Interest: $${result.totalInterest}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Mortgage calculation results copied successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
              <Calculator className="w-5 h-5" />
              Mortgage Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Interest Rate: {interestRate}%</Label>
              <Slider
                value={[parseFloat(interestRate)]}
                onValueChange={(value) => setInterestRate(value[0].toString())}
                max={15}
                min={1}
                step={0.1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Loan Term: {loanTerm} years</Label>
              <Slider
                value={[parseFloat(loanTerm)]}
                onValueChange={(value) => setLoanTerm(value[0].toString())}
                max={40}
                min={5}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="propertyTax">Property Tax (Annual)</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="insurance">Insurance (Annual)</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pmi">PMI (Annual)</Label>
                <Input
                  id="pmi"
                  type="number"
                  value={pmi}
                  onChange={(e) => setPmi(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
              <TrendingUp className="w-5 h-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Principal & Interest</div>
                <div className="text-2xl font-bold text-green-600">${result.monthlyPayment}</div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Monthly Payment</div>
                <div className="text-2xl font-bold text-blue-600">${result.totalMonthlyPayment}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Interest</div>
                  <div className="text-lg font-semibold text-red-600">${result.totalInterest}</div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Cost</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">${result.totalCost}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCopy} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Results
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Mortgage Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="balance">Balance Over Time</TabsTrigger>
            </TabsList>
            <TabsContent value="breakdown" className="mt-6">
              <div className="h-80">
                <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            </TabsContent>
            <TabsContent value="balance" className="mt-6">
              <div className="h-80">
                <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
