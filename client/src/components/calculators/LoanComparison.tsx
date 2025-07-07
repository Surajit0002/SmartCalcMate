import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Trash2, DollarSign, Percent, Clock, Award } from 'lucide-react';

interface Loan {
  id: string;
  name: string;
  amount: string;
  rate: string;
  term: string;
  fees: string;
  monthlyPayment?: number;
  totalCost?: number;
  totalInterest?: number;
}

export default function LoanComparison() {
  const [loans, setLoans] = useState<Loan[]>([
    { id: '1', name: 'Bank A', amount: '200000', rate: '6.5', term: '30', fees: '2000' },
    { id: '2', name: 'Bank B', amount: '200000', rate: '6.8', term: '30', fees: '1500' },
    { id: '3', name: 'Credit Union', amount: '200000', rate: '6.2', term: '30', fees: '1000' }
  ]);
  const [results, setResults] = useState<any>(null);

  const addLoan = () => {
    const newLoan: Loan = {
      id: Date.now().toString(),
      name: `Loan ${loans.length + 1}`,
      amount: '200000',
      rate: '7.0',
      term: '30',
      fees: '2000'
    };
    setLoans([...loans, newLoan]);
  };

  const removeLoan = (id: string) => {
    if (loans.length > 1) {
      setLoans(loans.filter(loan => loan.id !== id));
    }
  };

  const updateLoan = (id: string, field: keyof Loan, value: string) => {
    setLoans(loans.map(loan => 
      loan.id === id ? { ...loan, [field]: value } : loan
    ));
  };

  const calculateLoans = () => {
    const calculatedLoans = loans.map(loan => {
      const principal = parseFloat(loan.amount);
      const rate = parseFloat(loan.rate) / 100 / 12;
      const months = parseFloat(loan.term) * 12;
      const fees = parseFloat(loan.fees);

      if (principal && rate && months) {
        const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        const totalCost = (monthlyPayment * months) + fees;
        const totalInterest = totalCost - principal - fees;

        return {
          ...loan,
          monthlyPayment: Math.round(monthlyPayment),
          totalCost: Math.round(totalCost),
          totalInterest: Math.round(totalInterest)
        };
      }
      return loan;
    }).filter(loan => loan.monthlyPayment);

    // Find best options
    const bestMonthlyPayment = calculatedLoans.reduce((prev, current) => 
      (prev.monthlyPayment! < current.monthlyPayment!) ? prev : current
    );
    const bestTotalCost = calculatedLoans.reduce((prev, current) => 
      (prev.totalCost! < current.totalCost!) ? prev : current
    );
    const bestInterest = calculatedLoans.reduce((prev, current) => 
      (prev.totalInterest! < current.totalInterest!) ? prev : current
    );

    // Prepare chart data
    const chartData = calculatedLoans.map(loan => ({
      name: loan.name,
      monthlyPayment: loan.monthlyPayment,
      totalCost: loan.totalCost,
      totalInterest: loan.totalInterest,
      fees: parseFloat(loan.fees)
    }));

    // Cost breakdown for pie chart
    const costBreakdown = calculatedLoans.map(loan => ({
      name: loan.name,
      principal: parseFloat(loan.amount),
      interest: loan.totalInterest,
      fees: parseFloat(loan.fees)
    }));

    setResults({
      loans: calculatedLoans,
      bestMonthlyPayment,
      bestTotalCost,
      bestInterest,
      chartData,
      costBreakdown,
      savings: {
        monthlyPayment: Math.max(...calculatedLoans.map(l => l.monthlyPayment!)) - Math.min(...calculatedLoans.map(l => l.monthlyPayment!)),
        totalCost: Math.max(...calculatedLoans.map(l => l.totalCost!)) - Math.min(...calculatedLoans.map(l => l.totalCost!))
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getBadgeVariant = (loan: Loan, field: 'monthlyPayment' | 'totalCost' | 'totalInterest') => {
    if (!results) return 'secondary';
    
    const bestLoan = field === 'monthlyPayment' ? results.bestMonthlyPayment :
                    field === 'totalCost' ? results.bestTotalCost :
                    results.bestInterest;
    
    return loan.id === bestLoan.id ? 'default' : 'secondary';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <DollarSign className="w-8 h-8" />
          Loan Comparison Tool
        </h1>
        <p className="text-muted-foreground">Compare multiple loan offers to find the best deal</p>
      </div>

      {/* Loan Input Cards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Loan Details</h2>
          <Button onClick={addLoan} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Loan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loans.map((loan) => (
            <Card key={loan.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <Input
                    value={loan.name}
                    onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                    className="font-semibold border-none p-0 h-auto bg-transparent"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLoan(loan.id)}
                    disabled={loans.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Loan Amount ($)</Label>
                  <Input
                    type="number"
                    value={loan.amount}
                    onChange={(e) => updateLoan(loan.id, 'amount', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Interest Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={loan.rate}
                    onChange={(e) => updateLoan(loan.id, 'rate', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Term (Years)</Label>
                  <Input
                    type="number"
                    value={loan.term}
                    onChange={(e) => updateLoan(loan.id, 'term', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Fees & Closing Costs ($)</Label>
                  <Input
                    type="number"
                    value={loan.fees}
                    onChange={(e) => updateLoan(loan.id, 'fees', e.target.value)}
                    className="h-8"
                  />
                </div>

                {/* Results for this loan */}
                {results && results.loans.find((l: any) => l.id === loan.id) && (
                  <div className="mt-4 pt-3 border-t space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Monthly Payment:</span>
                      <Badge variant={getBadgeVariant(loan, 'monthlyPayment')}>
                        {formatCurrency(results.loans.find((l: any) => l.id === loan.id)?.monthlyPayment || 0)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Total Cost:</span>
                      <Badge variant={getBadgeVariant(loan, 'totalCost')}>
                        {formatCurrency(results.loans.find((l: any) => l.id === loan.id)?.totalCost || 0)}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={calculateLoans} size="lg" className="w-full">
          Compare Loans
        </Button>
      </div>

      {/* Results Section */}
      {results && (
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="charts">Visual Comparison</TabsTrigger>
            <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            {/* Best Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Best Monthly Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.bestMonthlyPayment.monthlyPayment)}
                  </div>
                  <div className="text-sm text-muted-foreground">{results.bestMonthlyPayment.name}</div>
                  <div className="text-xs text-green-600 mt-1">
                    Save {formatCurrency(results.savings.monthlyPayment)}/month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Best Total Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.bestTotalCost.totalCost)}
                  </div>
                  <div className="text-sm text-muted-foreground">{results.bestTotalCost.name}</div>
                  <div className="text-xs text-blue-600 mt-1">
                    Save {formatCurrency(results.savings.totalCost)} total
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Least Interest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(results.bestInterest.totalInterest)}
                  </div>
                  <div className="text-sm text-muted-foreground">{results.bestInterest.name}</div>
                  <div className="text-xs text-purple-600 mt-1">
                    {results.bestInterest.rate}% rate
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Lender</th>
                        <th className="text-right p-2">Rate</th>
                        <th className="text-right p-2">Monthly Payment</th>
                        <th className="text-right p-2">Total Interest</th>
                        <th className="text-right p-2">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.loans.map((loan: any) => (
                        <tr key={loan.id} className="border-b">
                          <td className="p-2 font-medium">{loan.name}</td>
                          <td className="text-right p-2">{loan.rate}%</td>
                          <td className="text-right p-2">
                            <Badge variant={getBadgeVariant(loan, 'monthlyPayment')}>
                              {formatCurrency(loan.monthlyPayment)}
                            </Badge>
                          </td>
                          <td className="text-right p-2">{formatCurrency(loan.totalInterest)}</td>
                          <td className="text-right p-2">
                            <Badge variant={getBadgeVariant(loan, 'totalCost')}>
                              {formatCurrency(loan.totalCost)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Payment Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Payment Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} />
                      <Tooltip formatter={(value: any) => formatCurrency(value)} />
                      <Bar dataKey="monthlyPayment" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Total Cost Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Total Cost Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: any) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="fees" stackId="a" fill="#f59e0b" name="Fees" />
                      <Bar dataKey="totalInterest" stackId="a" fill="#ef4444" name="Interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.loans.map((loan: any) => (
                <Card key={loan.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {loan.name}
                      {(loan.id === results.bestTotalCost.id) && (
                        <Badge variant="default">Best Deal</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Loan Amount</div>
                        <div className="font-semibold">{formatCurrency(parseFloat(loan.amount))}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Interest Rate</div>
                        <div className="font-semibold">{loan.rate}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Term</div>
                        <div className="font-semibold">{loan.term} years</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Fees</div>
                        <div className="font-semibold">{formatCurrency(parseFloat(loan.fees))}</div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Payment:</span>
                        <span className="font-bold">{formatCurrency(loan.monthlyPayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest:</span>
                        <span className="font-bold text-red-600">{formatCurrency(loan.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Cost:</span>
                        <span className="font-bold">{formatCurrency(loan.totalCost)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}