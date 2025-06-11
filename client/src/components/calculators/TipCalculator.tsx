import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { calculateTip } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("1000");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [peopleCount, setPeopleCount] = useState("4");
  const [result, setResult] = useState(calculateTip(1000, 15, 4));
  const { toast } = useToast();

  useEffect(() => {
    const bill = parseFloat(billAmount) || 0;
    const tip = parseFloat(tipPercentage) || 0;
    const people = parseInt(peopleCount) || 1;

    if (bill > 0 && tip >= 0 && people > 0) {
      setResult(calculateTip(bill, tip, people));
    }
  }, [billAmount, tipPercentage, peopleCount]);

  const handleTipPreset = (preset: string) => {
    setTipPercentage(preset);
  };

  const handleCopy = () => {
    const text = `Tip Amount: ₹${result.tipAmount}\nTotal Bill: ₹${result.totalBill}\nPer Person: ₹${result.perPerson}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Tip calculation results copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `Tip Calculator Result:\nBill Amount: ₹${billAmount}\nTip: ${tipPercentage}%\nPeople: ${peopleCount}\n\nTip Amount: ₹${result.tipAmount}\nTotal Bill: ₹${result.totalBill}\nPer Person: ₹${result.perPerson}`;
    
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

  const tipPresets = ["10", "15", "18", "20"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="bill-amount">Bill Amount (₹)</Label>
            <Input
              id="bill-amount"
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="1000"
            />
          </div>
          
          <div>
            <Label htmlFor="tip-percentage">Tip Percentage (%)</Label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {tipPresets.map((preset) => (
                <Button
                  key={preset}
                  variant={tipPercentage === preset ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTipPreset(preset)}
                >
                  {preset}%
                </Button>
              ))}
            </div>
            <Input
              id="tip-percentage"
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              placeholder="15"
            />
          </div>
          
          <div>
            <Label htmlFor="people-count">Number of People</Label>
            <Input
              id="people-count"
              type="number"
              min="1"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              placeholder="4"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bill Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Tip Amount</div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">₹{result.tipAmount}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Bill</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{result.totalBill}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Per Person</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{result.perPerson}</div>
            </div>
          </div>
          
          <div className="flex space-x-3">
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
