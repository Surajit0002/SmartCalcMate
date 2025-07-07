import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calculator, DollarSign, Calendar, Percent, TrendingUp } from 'lucide-react';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('1000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [results, setResults] = useState<any>(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (P && r && n) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - P;

      // Monthly breakdown data
      const monthlyData = [];
      let remainingPrincipal = P;
      
      for (let i = 1; i <= Math.min(12, n); i++) {
        const interestPayment = remainingPrincipal * r;
        const principalPayment = emi - interestPayment;
        remainingPrincipal -= principalPayment;
        
        monthlyData.push({
          month: i,
          emi: Math.round(emi),
          principal: Math.round(principalPayment),
          interest: Math.round(interestPayment),
          balance: Math.round(remainingPrincipal)
        });
      }

      setResults({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal: P,
        monthlyData,
        pieData: [
          { name: 'Principal', value: P, color: '#3b82f6' },
          { name: 'Interest', value: totalInterest, color: '#ef4444' }
        ]
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8" />
          EMI Calculator
        </h1>
        <p className="text-muted-foreground">Calculate your loan EMI with detailed breakdown and visualization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="principal">Loan Amount (₹)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="1000000"
              />
            </div>
            <div>
              <Label htmlFor="rate">Interest Rate (% per annum)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="8.5"
              />
            </div>
            <div>
              <Label htmlFor="tenure">Loan Tenure (Years)</Label>
              <Input
                id="tenure"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="20"
              />
            </div>
            <Button onClick={calculateEMI} className="w-full">
              Calculate EMI
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                EMI Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.emi)}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly EMI</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-lg font-semibold text-green-600">
                      {formatCurrency(results.principal)}
                    </div>
                    <div className="text-xs text-muted-foreground">Principal</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-lg font-semibold text-red-600">
                      {formatCurrency(results.totalInterest)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Interest</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold">
                    {formatCurrency(results.totalAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Amount</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts Section */}
      {results && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Principal vs Interest</CardTitle>
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

            {/* Monthly Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Payment Breakdown (First Year)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value: any) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="Principal" />
                    <Bar dataKey="interest" stackId="a" fill="#ef4444" name="Interest" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payment Schedule (First Year)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Month</th>
                      <th className="text-right p-2">EMI</th>
                      <th className="text-right p-2">Principal</th>
                      <th className="text-right p-2">Interest</th>
                      <th className="text-right p-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.monthlyData.map((month: any) => (
                      <tr key={month.month} className="border-b">
                        <td className="p-2">{month.month}</td>
                        <td className="text-right p-2">{formatCurrency(month.emi)}</td>
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
    </div>
  );
}