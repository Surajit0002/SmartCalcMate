
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Share2, Plus, Trash2, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Bar } from "react-chartjs-2";

interface Loan {
  id: string;
  name: string;
  amount: string;
  rate: string;
  term: string;
  fees: string;
}

export default function LoanComparison() {
  const [loans, setLoans] = useState<Loan[]>([
    { id: '1', name: 'Bank A', amount: '250000', rate: '7.5', term: '30', fees: '2000' },
    { id: '2', name: 'Bank B', amount: '250000', rate: '7.25', term: '30', fees: '3500' },
  ]);
  const { toast } = useToast();

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
      totalCost: totalCost.toFixed(2),
      totalPayments: totalPayments.toFixed(2)
    };
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

  const loanResults = loans.map(loan => ({
    ...loan,
    ...calculateLoan(loan)
  }));

  const bestLoan = loanResults.reduce((best, current) => 
    parseFloat(current.totalCost) < parseFloat(best.totalCost) ? current : best
  );

  const chartData = {
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
        label: 'Total Interest',
        data: loanResults.map(loan => parseFloat(loan.totalInterest)),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      }
    ]
  };

  const handleCopy = () => {
    const text = loanResults.map(loan => 
      `${loan.name}: Monthly: $${loan.monthlyPayment}, Total: $${loan.totalCost}`
    ).join('\n');
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Loan comparison results copied successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Compare Loan Options</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add multiple loans to compare rates, payments, and total costs
          </p>
        </div>
        <Button onClick={addLoan} className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Loan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loans.map((loan, index) => (
          <Card key={loan.id} className={`${loan.id === bestLoan.id ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                <Input
                  value={loan.name}
                  onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                  className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                />
                {loan.id === bestLoan.id && (
                  <Badge className="bg-green-500 text-white">Best Deal</Badge>
                )}
              </div>
              {loans.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLoan(loan.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Loan Amount ($)</Label>
                  <Input
                    type="number"
                    value={loan.amount}
                    onChange={(e) => updateLoan(loan.id, 'amount', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Interest Rate (%)</Label>
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

              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</span>
                  <span className="font-bold text-blue-600">${calculateLoan(loan).monthlyPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Interest</span>
                  <span className="font-medium text-red-600">${calculateLoan(loan).totalInterest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Cost</span>
                  <span className="font-bold text-gray-900 dark:text-white">${calculateLoan(loan).totalCost}</span>
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
          <Tabs defaultValue="payments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="payments">Payment Comparison</TabsTrigger>
              <TabsTrigger value="summary">Summary Table</TabsTrigger>
            </TabsList>
            <TabsContent value="payments" className="mt-6">
              <div className="h-80">
                <Bar data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            </TabsContent>
            <TabsContent value="summary" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Lender</th>
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-right">Rate</th>
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-right">Monthly Payment</th>
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-right">Total Interest</th>
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-right">Total Cost</th>
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">Savings vs Best</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanResults.map((loan) => {
                      const savings = parseFloat(loan.totalCost) - parseFloat(bestLoan.totalCost);
                      return (
                        <tr key={loan.id} className={loan.id === bestLoan.id ? 'bg-green-50 dark:bg-green-900/20' : ''}>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 font-medium">{loan.name}</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-right">{loan.rate}%</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-right">${loan.monthlyPayment}</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-right">${loan.totalInterest}</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-right font-bold">${loan.totalCost}</td>
                          <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">
                            {savings === 0 ? (
                              <Badge className="bg-green-500 text-white">Best</Badge>
                            ) : (
                              <span className="text-red-600">+${savings.toFixed(0)}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleCopy} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          Copy Comparison
        </Button>
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
}
