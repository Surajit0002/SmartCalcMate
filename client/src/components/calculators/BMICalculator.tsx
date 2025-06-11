import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { calculateBMI } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function BMICalculator() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [result, setResult] = useState(calculateBMI(170, 70));
  const { toast } = useToast();

  useEffect(() => {
    const h = parseFloat(height) || 0;
    const w = parseFloat(weight) || 0;

    if (h > 0 && w > 0) {
      setResult(calculateBMI(h, w));
    }
  }, [height, weight]);

  const handleCopy = () => {
    const text = `BMI: ${result.bmi}\nCategory: ${result.category}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "BMI calculation results copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `BMI Calculator Result:\nHeight: ${height}cm\nWeight: ${weight}kg\n\nBMI: ${result.bmi}\nCategory: ${result.category}`;
    
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20';
      case 'green':
        return 'text-green-600 dark:text-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20';
      case 'yellow':
        return 'text-yellow-600 dark:text-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20';
      case 'red':
        return 'text-red-600 dark:text-red-400 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20';
      default:
        return 'text-green-600 dark:text-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
            />
          </div>
          
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your BMI Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${getColorClasses(result.color)}`}>
            <div className="text-sm text-gray-600 dark:text-gray-300">Your BMI</div>
            <div className={`text-3xl font-bold ${result.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 
              result.color === 'green' ? 'text-green-600 dark:text-green-400' : 
              result.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : 
              'text-red-600 dark:text-red-400'}`}>
              {result.bmi}
            </div>
            <div className={`text-sm font-medium ${result.color === 'blue' ? 'text-blue-700 dark:text-blue-300' : 
              result.color === 'green' ? 'text-green-700 dark:text-green-300' : 
              result.color === 'yellow' ? 'text-yellow-700 dark:text-yellow-300' : 
              'text-red-700 dark:text-red-300'}`}>
              {result.category}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BMI Categories</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">Underweight</span>
                <span className="text-gray-600 dark:text-gray-300">&lt; 18.5</span>
              </div>
              <div className="flex justify-between font-semibold text-green-600">
                <span>Normal Weight</span>
                <span>18.5 - 24.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600">Overweight</span>
                <span className="text-gray-600 dark:text-gray-300">25 - 29.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600">Obese</span>
                <span className="text-gray-600 dark:text-gray-300">&ge; 30</span>
              </div>
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
