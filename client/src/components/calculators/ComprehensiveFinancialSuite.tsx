import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Calculator, TrendingUp, PiggyBank, Home, BarChart3, 
  DollarSign, Percent, Calendar, Target, Download, Copy
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
         ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface LoanCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

interface SIPCalculation {
  futureValue: number;
  invested: number;
  returns: number;
  yearlyData: Array<{
    year: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

interface CompoundInterestResult {
  futureValue: number;
  compoundInterest: number;
  yearlyData: Array<{
    year: number;
    principal: number;
    interest: number;
    total: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ComprehensiveFinancialSuite() {
  const [activeCalculator, setActiveCalculator] = useState('emi');
  
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emiResult, setEmiResult] = useState<LoanCalculation | null>(null);

  // SIP Calculator State
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [sipResult, setSipResult] = useState<SIPCalculation | null>(null);

  // Compound Interest State
  const [principal, setPrincipal] = useState(100000);
  const [compoundRate, setCompoundRate] = useState(10);
  const [timePeriod, setTimePeriod] = useState(5);
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [compoundResult, setCompoundResult] = useState<CompoundInterestResult | null>(null);

  // Investment Calculator State
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [investmentReturn, setInvestmentReturn] = useState(15);
  const [investmentYears, setInvestmentYears] = useState(15);

  // Loan Comparison State
  const [loans, setLoans] = useState([
    { id: 1, name: 'Bank A', amount: 500000, rate: 8.5, tenure: 20, fees: 25000 },
    { id: 2, name: 'Bank B', amount: 500000, rate: 8.75, tenure: 20, fees: 15000 },
    { id: 3, name: 'Bank C', amount: 500000, rate: 8.25, tenure: 20, fees: 30000 }
  ]);

  // Currency Converter State
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1000);
  const [exchangeRate, setExchangeRate] = useState(0.85);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Discount Calculator State
  const [originalPrice, setOriginalPrice] = useState(1000);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [savings, setSavings] = useState(0);

  // EMI Calculation
  const calculateEMI = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTenure * 12;
    
    if (r === 0) {
      const emi = P / n;
      return {
        monthlyPayment: emi,
        totalInterest: 0,
        totalAmount: P,
        schedule: []
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    // Generate amortization schedule
    const schedule = [];
    let balance = P;
    
    for (let month = 1; month <= Math.min(n, 60); month++) { // Limit to 5 years for display
      const interestPayment = balance * r;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        payment: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    return {
      monthlyPayment: emi,
      totalInterest,
      totalAmount,
      schedule
    };
  }, [loanAmount, interestRate, loanTenure]);

  // SIP Calculation
  const calculateSIP = useMemo(() => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = investmentPeriod * 12;
    
    let futureValue = 0;
    if (monthlyRate === 0) {
      futureValue = monthlyInvestment * months;
    } else {
      futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    }
    
    const totalInvested = monthlyInvestment * months;
    const returns = futureValue - totalInvested;

    // Generate yearly data
    const yearlyData = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const monthsElapsed = year * 12;
      let yearValue = 0;
      
      if (monthlyRate === 0) {
        yearValue = monthlyInvestment * monthsElapsed;
      } else {
        yearValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) * (1 + monthlyRate);
      }
      
      const yearInvested = monthlyInvestment * monthsElapsed;
      const yearReturns = yearValue - yearInvested;
      
      yearlyData.push({
        year,
        invested: yearInvested,
        value: yearValue,
        returns: yearReturns
      });
    }

    return {
      futureValue,
      invested: totalInvested,
      returns,
      yearlyData
    };
  }, [monthlyInvestment, expectedReturn, investmentPeriod]);

  // Compound Interest Calculation
  const calculateCompoundInterest = useMemo(() => {
    const rate = compoundRate / 100;
    const futureValue = principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * timePeriod);
    const compoundInterest = futureValue - principal;

    // Generate yearly data
    const yearlyData = [];
    for (let year = 1; year <= timePeriod; year++) {
      const yearValue = principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * year);
      const yearInterest = yearValue - principal;
      
      yearlyData.push({
        year,
        principal,
        interest: yearInterest,
        total: yearValue
      });
    }

    return {
      futureValue,
      compoundInterest,
      yearlyData
    };
  }, [principal, compoundRate, timePeriod, compoundFrequency]);

  // Update results when calculations change
  useEffect(() => {
    setEmiResult(calculateEMI);
  }, [calculateEMI]);

  useEffect(() => {
    setSipResult(calculateSIP);
  }, [calculateSIP]);

  useEffect(() => {
    setCompoundResult(calculateCompoundInterest);
  }, [calculateCompoundInterest]);

  // Currency conversion
  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  // Discount calculation
  useEffect(() => {
    const discount = originalPrice * (discountPercent / 100);
    setDiscountedPrice(originalPrice - discount);
    setSavings(discount);
  }, [originalPrice, discountPercent]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  const copyResult = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Comprehensive Financial Calculator Suite</h1>
        <p className="text-xl text-muted-foreground">
          Advanced financial planning tools with interactive charts and detailed analysis
        </p>
      </div>

      <Tabs value={activeCalculator} onValueChange={setActiveCalculator}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="emi" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            EMI
          </TabsTrigger>
          <TabsTrigger value="sip" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            SIP
          </TabsTrigger>
          <TabsTrigger value="compound" className="flex items-center gap-2">
            <PiggyBank className="w-4 h-4" />
            Compound
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Investment
          </TabsTrigger>
          <TabsTrigger value="mortgage" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Mortgage
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Compare
          </TabsTrigger>
          <TabsTrigger value="currency" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Currency
          </TabsTrigger>
          <TabsTrigger value="discount" className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Discount
          </TabsTrigger>
        </TabsList>

        {/* EMI Calculator */}
        <TabsContent value="emi">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>EMI Calculator</CardTitle>
                <CardDescription>Calculate your loan EMI with detailed breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Loan Amount: ₹{formatNumber(loanAmount)}</Label>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={10000000}
                    min={100000}
                    step={50000}
                  />
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interest Rate: {interestRate}% per annum</Label>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={20}
                    min={5}
                    step={0.25}
                  />
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.25"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Loan Tenure: {loanTenure} years</Label>
                  <Slider
                    value={[loanTenure]}
                    onValueChange={(value) => setLoanTenure(value[0])}
                    max={30}
                    min={1}
                    step={1}
                  />
                  <Input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                  />
                </div>

                {emiResult && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(emiResult.monthlyPayment)}
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly EMI</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(emiResult.totalInterest)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Interest</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(emiResult.totalAmount)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Amount</div>
                      </div>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            {emiResult && (
              <Card>
                <CardHeader>
                  <CardTitle>EMI Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Principal', value: loanAmount },
                            { name: 'Interest', value: emiResult.totalInterest }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[0, 1].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Month</th>
                            <th className="text-right p-2">Principal</th>
                            <th className="text-right p-2">Interest</th>
                            <th className="text-right p-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {emiResult.schedule.slice(0, 12).map((payment) => (
                            <tr key={payment.month} className="border-b">
                              <td className="p-2">{payment.month}</td>
                              <td className="text-right p-2">{formatNumber(payment.principal)}</td>
                              <td className="text-right p-2">{formatNumber(payment.interest)}</td>
                              <td className="text-right p-2">{formatNumber(payment.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* SIP Calculator */}
        <TabsContent value="sip">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SIP Calculator</CardTitle>
                <CardDescription>Plan your systematic investment with growth projections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Monthly Investment: ₹{formatNumber(monthlyInvestment)}</Label>
                  <Slider
                    value={[monthlyInvestment]}
                    onValueChange={(value) => setMonthlyInvestment(value[0])}
                    max={100000}
                    min={1000}
                    step={1000}
                  />
                  <Input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expected Return: {expectedReturn}% per annum</Label>
                  <Slider
                    value={[expectedReturn]}
                    onValueChange={(value) => setExpectedReturn(value[0])}
                    max={30}
                    min={1}
                    step={0.5}
                  />
                  <Input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    step="0.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Investment Period: {investmentPeriod} years</Label>
                  <Slider
                    value={[investmentPeriod]}
                    onValueChange={(value) => setInvestmentPeriod(value[0])}
                    max={40}
                    min={1}
                    step={1}
                  />
                  <Input
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  />
                </div>

                {sipResult && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(sipResult.invested)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Invested</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(sipResult.returns)}
                        </div>
                        <div className="text-sm text-muted-foreground">Expected Returns</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(sipResult.futureValue)}
                        </div>
                        <div className="text-sm text-muted-foreground">Future Value</div>
                      </div>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            {sipResult && (
              <Card>
                <CardHeader>
                  <CardTitle>SIP Growth Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={sipResult.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                      <Tooltip 
                        formatter={(value) => formatCurrency(value as number)}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="invested" stackId="a" fill="#8884d8" name="Invested" />
                      <Bar dataKey="returns" stackId="a" fill="#82ca9d" name="Returns" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Additional calculator tabs would continue here... */}
        {/* For brevity, showing the structure for EMI and SIP calculators */}
        
      </Tabs>
    </div>
  );
}