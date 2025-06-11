import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Share2 } from "lucide-react";
import { calculateBMR } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function BMRCalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState(calculateBMR(70, 170, 30, 'male'));
  const { toast } = useToast();

  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseInt(age) || 0;

    if (w > 0 && h > 0 && a > 0) {
      setResult(calculateBMR(w, h, a, gender));
    }
  }, [weight, height, age, gender]);

  const handleCopy = () => {
    const text = `BMR: ${result.bmr} calories/day\nCalorie needs vary by activity level:\nSedentary: ${result.calories.sedentary}\nLight Activity: ${result.calories.light}\nModerate Activity: ${result.calories.moderate}\nActive: ${result.calories.active}\nVery Active: ${result.calories.veryActive}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "BMR calculation results copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `BMR Calculator Result:\nAge: ${age}, Gender: ${gender}, Weight: ${weight}kg, Height: ${height}cm\n\nBMR: ${result.bmr} calories/day\n\nDaily Calorie Needs:\nSedentary: ${result.calories.sedentary}\nLight Activity: ${result.calories.light}\nModerate Activity: ${result.calories.moderate}\nActive: ${result.calories.active}\nVery Active: ${result.calories.veryActive}`;
    
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
          <CardTitle>Your Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your BMR Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Basal Metabolic Rate</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.bmr}</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">calories per day</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Daily Calorie Needs</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Sedentary (little/no exercise)</span>
                <span className="font-medium">{result.calories.sedentary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Light activity (1-3 days/week)</span>
                <span className="font-medium">{result.calories.light}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Moderate activity (3-5 days/week)</span>
                <span className="font-medium">{result.calories.moderate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Active (6-7 days/week)</span>
                <span className="font-medium">{result.calories.active}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Very active (2x/day, intense)</span>
                <span className="font-medium">{result.calories.veryActive}</span>
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
