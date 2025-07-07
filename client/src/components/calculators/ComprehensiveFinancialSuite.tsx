
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, TrendingUp, Calculator, PieChart, DollarSign, ArrowUpDown, Target, Home, BarChart3, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Line, Doughnut, Bar } from "react-chartjs-2";
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
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface CompoundResult {
  futureValue: number;
  totalInterest: number;
  principal: number;
}

interface Loan {
  id: string;
  name: string;
  amount: string;
  rate: string;
  term: string;
  fees: string;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
];

const mockRates = {
  USD: { EUR: 0.85, GBP: 0.75, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, KRW: 1180 },
  EUR: { USD: 1.18, GBP: 0.88, JPY: 129, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.59, INR: 87.7, KRW: 1391 },
  GBP: { USD: 1.33, EUR: 1.14, JPY: 147, CAD: 1.67, AUD: 1.81, CHF: 1.23, CNY: 8.62, INR: 99.4, KRW: 1577 },
  INR: { USD: 0.0134, EUR: 0.0114, GBP: 0.0101, JPY: 1.48, CAD: 0.0168, AUD: 0.0181, CHF: 0.0123, CNY: 0.0866, KRW: 15.8 },
};

export default function ComprehensiveFinancialSuite() {
  const [activeTab, setActiveTab] = useState("compound");
  const { toast } = useToast();

  // Compound Interest Calculator State
  const [principal, setPrincipal] = useState("100000");
  const [interestRate, setInterestRate] = useState("8");
  const [timePeriod, setTimePeriod] = useState("5");
  const [compoundFreq, setCompoundFreq] = useState("12");

  // Investment Calculator State
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [investmentPeriod, setInvestmentPeriod] = useState("20");
  const [riskTolerance, setRiskTolerance] = useState("moderate");

  // Mortgage Calculator State
  const [loanAmount, setLoanAmount] = useState("500000");
  const [mortgageRate, setMortgageRate] = useState("7.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [downPayment, setDownPayment] = useState("100000");
  const [propertyTax, setPropertyTax] = useState("8000");
  const [insurance, setInsurance] = useState("3000");

  // Loan Comparison State
  const [loans, setLoans] = useState<Loan[]>([
    { id: '1', name: 'Bank A', amount: '250000', rate: '7.5', term: '30', fees: '2000' },
    { id: '2', name: 'Bank B', amount: '250000', rate: '7.25', term: '30', fees: '3500' },
  ]);

  // Currency Converter State
  const [currencyAmount, setCurrencyAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // Calculation Functions
  const calculateCompoundInterest = (principal: number, rate: number, time: number, frequency: number): CompoundResult => {
    const futureValue = principal * Math.pow((1 + rate / 100 / frequency), frequency * time);
    const totalInterest = futureValue - principal;
    
    return {
      futureValue: Math.round(futureValue),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal)
    };
  };

  const calculateInvestment = () => {
    const p = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100 / 12;
    const months = parseFloat(investmentPeriod) * 12;

    const futureValuePrincipal = p * Math.pow(1 + rate, months);
    const futureValueAnnuity = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    const totalFutureValue = futureValuePrincipal + futureValueAnnuity;
    
    const totalContributions = p + (monthly * months);
    const totalGains = totalFutureValue - totalContributions;

    return {
      futureValue: totalFutureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalGains: totalGains.toFixed(2)
    };
  };

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyRate = parseFloat(mortgageRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const monthlyTax = parseFloat(propertyTax) / 12;
    const monthlyInsurance = parseFloat(insurance) / 12;
    
    const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance;
    const totalInterest = (monthlyPayment * numPayments) - principal;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: (monthlyPayment * numPayments).toFixed(2)
    };
  };

  const calculateLoan = (loan: Loan) => {
    const principal = parseFloat(loan.amount);
    const monthlyRate = parseFloat(loan.rate) / 100 / 12;
    const numPayments = parseFloat(loan.term) * 12;
    const fees = parseFloat(loan.fees);

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - principal;
    const totalCost = totalPayments + fees;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalCost.toFixed(2)
    };
  };

  const calculateCurrency = () => {
    const inputAmount = parseFloat(currencyAmount) || 0;
    
    if (fromCurrency === toCurrency) {
      return { convertedAmount: inputAmount, exchangeRate: 1 };
    }

    const rate = mockRates[fromCurrency as keyof typeof mockRates]?.[toCurrency as keyof typeof mockRates.USD] || 1;
    return { convertedAmount: inputAmount * rate, exchangeRate: rate };
  };

  // Results
  const compoundResult = calculateCompoundInterest(
    parseFloat(principal) || 0,
    parseFloat(interestRate) || 0,
    parseFloat(timePeriod) || 0,
    parseFloat(compoundFreq) || 1
  );

  const investmentResult = calculateInvestment();
  const mortgageResult = calculateMortgage();
  const loanResults = loans.map(loan => ({ ...loan, ...calculateLoan(loan) }));
  const currencyResult = calculateCurrency();

  // Chart Data
  const compoundChartData = {
    labels: Array.from({ length: parseInt(timePeriod) }, (_, i) => `Year ${i + 1}`),
    datasets: [{
      label: 'Investment Growth',
      data: Array.from({ length: parseInt(timePeriod) }, (_, i) => {
        const result = calculateCompoundInterest(
          parseFloat(principal),
          parseFloat(interestRate),
          i + 1,
          parseFloat(compoundFreq)
        );
        return result.futureValue;
      }),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const mortgageChartData = {
    labels: ['Principal', 'Interest', 'Property Tax', 'Insurance'],
    datasets: [{
      data: [
        parseFloat(loanAmount) - parseFloat(downPayment),
        parseFloat(mortgageResult.totalInterest),
        parseFloat(propertyTax),
        parseFloat(insurance)
      ],
      backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const loanComparisonData = {
    labels: loanResults.map(loan => loan.name),
    datasets: [
      {
        label: 'Monthly Payment',
        data: loanResults.map(loan => parseFloat(loan.monthlyPayment)),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Cost',
        data: loanResults.map(loan => parseFloat(loan.totalCost)),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      }
    ]
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Results copied successfully",
    });
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const addLoan = () => {
    const newLoan: Loan = {
      id: Date.now().toString(),
      name: `Loan ${loans.length + 1}`,
      amount: '250000',
      rate: '8',
      term: '30',
      fees: '1000'
    };
    setLoans([...loans, newLoan]);
  };

  const removeLoan = (id: string) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  const updateLoan = (id: string, field: keyof Loan, value: string) => {
    setLoans(loans.map(loan => 
      loan.id === id ? { ...loan, [field]: value } : loan
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
          Comprehensive Financial Calculator Suite
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Complete financial planning tools with interactive charts and detailed analysis
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compound" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Compound
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Investment
          </TabsTrigger>
          <TabsTrigger value="mortgage" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Mortgage
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Compare
          </TabsTrigger>
          <TabsTrigger value="currency" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Currency
          </TabsTrigger>
        </TabsList>

        {/* Compound Interest Calculator */}
        <TabsContent value="compound" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Compound Interest Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Principal Amount (₹)</Label>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Annual Interest Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Time Period (Years)</Label>
                    <Input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Compound Frequency</Label>
                    <Select value={compoundFreq} onValueChange={setCompoundFreq}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="2">Semi-annually</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Future Value</p>
                    <p className="text-2xl font-bold text-purple-600">₹{compoundResult.futureValue.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Interest</p>
                    <p className="text-2xl font-bold text-green-600">₹{compoundResult.totalInterest.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Growth Multiple</p>
                    <p className="text-2xl font-bold text-orange-600">{(compoundResult.futureValue / compoundResult.principal).toFixed(2)}x</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCopy(`Future Value: ₹${compoundResult.futureValue.toLocaleString()}\nTotal Interest: ₹${compoundResult.totalInterest.toLocaleString()}`)}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Results
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Investment Growth Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={compoundChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Calculator */}
        <TabsContent value="investment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Investment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Initial Investment ($)</Label>
                    <Input
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Monthly Contribution ($)</Label>
                    <Input
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
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <CardTitle>Investment Projection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Future Value</div>
                    <div className="text-2xl font-bold text-green-600">${investmentResult.futureValue}</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Gains</div>
                    <div className="text-xl font-bold text-blue-600">${investmentResult.totalGains}</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Contributions</div>
                    <div className="text-lg font-medium">${investmentResult.totalContributions}</div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCopy(`Future Value: $${investmentResult.futureValue}\nTotal Gains: $${investmentResult.totalGains}`)}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Results
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mortgage Calculator */}
        <TabsContent value="mortgage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Mortgage Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Loan Amount ($)</Label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Down Payment ($)</Label>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Interest Rate: {mortgageRate}%</Label>
                  <Slider
                    value={[parseFloat(mortgageRate)]}
                    onValueChange={(value) => setMortgageRate(value[0].toString())}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Property Tax (Annual)</Label>
                    <Input
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Insurance (Annual)</Label>
                    <Input
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</div>
                    <div className="text-2xl font-bold text-green-600">${mortgageResult.monthlyPayment}</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Monthly (w/ taxes)</div>
                    <div className="text-xl font-bold text-blue-600">${mortgageResult.totalMonthlyPayment}</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div>
                    <div className="text-lg font-bold text-red-600">${mortgageResult.totalInterest}</div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCopy(`Monthly Payment: $${mortgageResult.monthlyPayment}\nTotal Interest: $${mortgageResult.totalInterest}`)}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Results
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mortgage Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Doughnut data={mortgageChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Comparison */}
        <TabsContent value="compare" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Compare Loan Options</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add multiple loans to compare rates and payments
              </p>
            </div>
            <Button onClick={addLoan} className="bg-gradient-to-r from-blue-500 to-purple-600">
              Add Loan
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loans.map((loan) => (
              <Card key={loan.id} className="border-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <Input
                    value={loan.name}
                    onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                    className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                  />
                  {loans.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLoan(loan.id)}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Amount ($)</Label>
                      <Input
                        type="number"
                        value={loan.amount}
                        onChange={(e) => updateLoan(loan.id, 'amount', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={loan.rate}
                        onChange={(e) => updateLoan(loan.id, 'rate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Term (years)</Label>
                      <Input
                        type="number"
                        value={loan.term}
                        onChange={(e) => updateLoan(loan.id, 'term', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Fees ($)</Label>
                      <Input
                        type="number"
                        value={loan.fees}
                        onChange={(e) => updateLoan(loan.id, 'fees', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Payment</span>
                      <span className="font-bold">${calculateLoan(loan).monthlyPayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Cost</span>
                      <span className="font-bold">${calculateLoan(loan).totalCost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loan Comparison Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar data={loanComparisonData} options={{ maintainAspectRatio: false }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currency Converter */}
        <TabsContent value="currency" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Currency Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={currencyAmount}
                    onChange={(e) => setCurrencyAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={swapCurrencies} variant="outline">
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {parseFloat(currencyAmount).toLocaleString()} {fromCurrency} =
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {currencyResult.convertedAmount.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })} {toCurrency}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    1 {fromCurrency} = {currencyResult.exchangeRate.toFixed(4)} {toCurrency}
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleCopy(`${currencyAmount} ${fromCurrency} = ${currencyResult.convertedAmount.toFixed(2)} ${toCurrency}`)}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Conversion
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
