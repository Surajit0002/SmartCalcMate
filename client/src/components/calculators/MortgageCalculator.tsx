import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Home, Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('500000');
  const [downPayment, setDownPayment] = useState('100000');
  const [interestRate, setInterestRate] = useState('7.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('8000');
  const [insurance, setInsurance] = useState('1200');
  const [pmi, setPmi] = useState('150');
  const [results, setResults] = useState<any>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    const tax = parseFloat(propertyTax) / 12;
    const ins = parseFloat(insurance) / 12;
    const pmiAmount = parseFloat(pmi);

    if (price && down && rate && term) {
      const loanAmount = price - down;
      const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const totalPayment = monthlyPayment * term;
      const totalInterest = totalPayment - loanAmount;
      const totalMonthlyPayment = monthlyPayment + tax + ins + pmiAmount;

      // Amortization schedule (first 12 months)
      const schedule = [];
      let remainingBalance = loanAmount;
      
      for (let month = 1; month <= Math.min(12, term); month++) {
        const interestPayment = remainingBalance * rate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
        
        schedule.push({
          month,
          payment: Math.round(monthlyPayment),
          principal: Math.round(principalPayment),
          interest: Math.round(interestPayment),
          balance: Math.round(remainingBalance)
        });
      }

      // Year by year breakdown
      const yearlyBreakdown = [];
      let yearlyBalance = loanAmount;
      
      for (let year = 1; year <= Math.min(10, loanTerm); year++) {
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        
        for (let month = 1; month <= 12; month++) {
          const interestPayment = yearlyBalance * rate;
          const principalPayment = monthlyPayment - interestPayment;
          yearlyBalance -= principalPayment;
          yearlyPrincipal += principalPayment;
          yearlyInterest += interestPayment;
        }
        
        yearlyBreakdown.push({
          year,
          principal: Math.round(yearlyPrincipal),
          interest: Math.round(yearlyInterest),
          balance: Math.round(yearlyBalance)
        });
      }

      setResults({
        loanAmount: Math.round(loanAmount),
        monthlyPayment: Math.round(monthlyPayment),
        totalMonthlyPayment: Math.round(totalMonthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        downPaymentPercent: ((down / price) * 100).toFixed(1),
        monthlyTax: Math.round(tax),
        monthlyInsurance: Math.round(ins),
        monthlyPMI: Math.round(pmiAmount),
        schedule,
        yearlyBreakdown,
        pieData: [
          { name: 'Principal', value: loanAmount, color: '#3b82f6' },
          { name: 'Interest', value: totalInterest, color: '#ef4444' }
        ],
        paymentBreakdown: [
          { name: 'Principal & Interest', value: monthlyPayment, color: '#3b82f6' },
          { name: 'Property Tax', value: tax, color: '#10b981' },
          { name: 'Insurance', value: ins, color: '#f59e0b' },
          { name: 'PMI', value: pmiAmount, color: '#8b5cf6' }
        ]
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
          <Home className="w-8 h-8" />
          Mortgage Calculator
        </h1>
        <p className="text-muted-foreground">Complete home loan analysis with amortization schedule</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Calculator</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Loan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Home Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    placeholder="500000"
                  />
                </div>
                <div>
                  <Label htmlFor="down">Down Payment ($)</Label>
                  <Input
                    id="down"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    placeholder="100000"
                  />
                </div>
                <div>
                  <Label htmlFor="rate">Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="7.5"
                  />
                </div>
                <div>
                  <Label htmlFor="term">Loan Term (Years)</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                      <SelectItem value="30">30 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={calculateMortgage} className="w-full">
                  Calculate Mortgage
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.monthlyPayment)}
                      </div>
                      <div className="text-sm text-muted-foreground">Principal & Interest</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.totalMonthlyPayment)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Monthly Payment</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span className="font-semibold">{results.downPaymentPercent}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Interest:</span>
                        <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Payment:</span>
                        <span className="font-semibold">{formatCurrency(results.totalPayment)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Additional Costs */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Monthly Costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tax">Property Tax (Annual)</Label>
                    <Input
                      id="tax"
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      placeholder="8000"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      Monthly: {formatCurrency(results.monthlyTax)}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="insurance">Home Insurance (Annual)</Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      placeholder="1200"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      Monthly: {formatCurrency(results.monthlyInsurance)}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pmi">PMI (Monthly)</Label>
                    <Input
                      id="pmi"
                      type="number"
                      value={pmi}
                      onChange={(e) => setPmi(e.target.value)}
                      placeholder="150"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      Monthly: {formatCurrency(results.monthlyPMI)}
                    </div>
                  </div>
                </div>
                <Button onClick={calculateMortgage} className="w-full">
                  Recalculate with Additional Costs
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {results && (
            <>
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Principal vs Interest Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Total Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={results.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                          {results.pieData.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Monthly Payment Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Payment Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={results.paymentBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                        >
                          {results.paymentBreakdown.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Yearly Principal vs Interest */}
              <Card>
                <CardHeader>
                  <CardTitle>Principal vs Interest Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={results.yearlyBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: any) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="principal" stroke="#3b82f6" strokeWidth={2} name="Principal" />
                      <Line type="monotone" dataKey="interest" stroke="#ef4444" strokeWidth={2} name="Interest" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Amortization Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Amortization Schedule (First Year)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Month</th>
                          <th className="text-right p-2">Payment</th>
                          <th className="text-right p-2">Principal</th>
                          <th className="text-right p-2">Interest</th>
                          <th className="text-right p-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.schedule.map((month: any) => (
                          <tr key={month.month} className="border-b">
                            <td className="p-2">{month.month}</td>
                            <td className="text-right p-2">{formatCurrency(month.payment)}</td>
                            <td className="text-right p-2">{formatCurrency(month.principal)}</td>
                            <td className="text-right p-2">{formatCurrency(month.interest)}</td>
                            <td className="text-right p-2">{formatCurrency(month.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}