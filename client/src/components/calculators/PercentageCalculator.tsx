import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Share2 } from "lucide-react";
import { calculatePercentage } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function PercentageCalculator() {
  const [type, setType] = useState("basic");
  const [value1, setValue1] = useState("15");
  const [value2, setValue2] = useState("200");
  const [result, setResult] = useState(calculatePercentage("basic", 15, 200));
  const { toast } = useToast();

  useEffect(() => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 0;

    if (v1 >= 0 && v2 > 0) {
      setResult(calculatePercentage(type, v1, v2));
    }
  }, [type, value1, value2]);

  const handleCopy = () => {
    const text = `Result: ${result.result}\nFormula: ${result.formula}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Percentage calculation results copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `Percentage Calculator Result:\n${result.formula}\nAnswer: ${result.result}`;
    
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

  const getLabels = () => {
    switch (type) {
      case 'basic':
        return { label1: 'Percentage (%)', label2: 'Number' };
      case 'of-what':
        return { label1: 'Number', label2: 'Total' };
      case 'increase':
        return { label1: 'Increase (%)', label2: 'Original Number' };
      case 'decrease':
        return { label1: 'Decrease (%)', label2: 'Original Number' };
      default:
        return { label1: 'Percentage (%)', label2: 'Number' };
    }
  };

  const labels = getLabels();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="percentage-type">Calculation Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">What is X% of Y?</SelectItem>
                <SelectItem value="of-what">X is what % of Y?</SelectItem>
                <SelectItem value="increase">Percentage Increase</SelectItem>
                <SelectItem value="decrease">Percentage Decrease</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="value1">{labels.label1}</Label>
            <Input
              id="value1"
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="15"
            />
          </div>
          
          <div>
            <Label htmlFor="value2">{labels.label2}</Label>
            <Input
              id="value2"
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="200"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Answer</div>
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{result.result}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Calculation</div>
            <div className="text-gray-900 dark:text-white">{result.formula}</div>
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
