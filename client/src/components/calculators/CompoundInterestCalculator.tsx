import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Share2 } from "lucide-react";
import { calculateCompoundInterest } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8");
  const [time, setTime] = useState("5");
  const [compound, setCompound] = useState("1");
  const [result, setResult] = useState(calculateCompoundInterest(10000, 8, 5, 1));
  const { toast } = useToast();

  useEffect(() => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(time) || 0;
    const c = parseFloat(compound) || 1;

    if (p > 0 && r > 0 && t > 0) {
      setResult(calculateCompoundInterest(p, r, t, c));
    }
  }, [principal, rate, time, compound]);

  const handleCopy = () => {
    const text = `Final Amount: ₹${result.amount.toLocaleString('en-IN')}\nCompound Interest: ₹${result.interest.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Compound interest calculation results copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `Compound Interest Calculator Result:\nPrincipal: ₹${parseFloat(principal).toLocaleString('en-IN')}\nRate: ${rate}%\nTime: ${time} years\n\nFinal Amount: ₹${result.amount.toLocaleString('en-IN')}\nCompound Interest: ₹${result.interest.toLocaleString('en-IN')}`;
    
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
          <CardTitle>Investment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="principal">Principal Amount (₹)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10000"
            />
          </div>
          
          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="8"
            />
          </div>
          
          <div>
            <Label htmlFor="time">Time Period (Years)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="5"
            />
          </div>
          
          <div>
            <Label htmlFor="compound">Compound Frequency</Label>
            <Select value={compound} onValueChange={setCompound}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="2">Semi-annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Final Amount</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">₹{result.amount.toLocaleString('en-IN')}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Principal</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{parseFloat(principal).toLocaleString('en-IN')}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Interest Earned</div>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">₹{result.interest.toLocaleString('en-IN')}</div>
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
