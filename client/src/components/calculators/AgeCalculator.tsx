import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { calculateAge } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState(calculateAge(new Date("1990-01-01"), new Date()));
  const { toast } = useToast();

  useEffect(() => {
    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth && current && birth <= current) {
      setResult(calculateAge(birth, current));
    }
  }, [birthDate, currentDate]);

  const handleCopy = () => {
    const text = `Age: ${result.years} years, ${result.months} months, ${result.days} days\nTotal Days: ${result.totalDays}\nTotal Hours: ${result.totalHours.toLocaleString()}\nTotal Minutes: ${result.totalMinutes.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Age calculation results copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `Age Calculator Result:\nBirth Date: ${new Date(birthDate).toLocaleDateString()}\nCurrent Date: ${new Date(currentDate).toLocaleDateString()}\n\nAge: ${result.years} years, ${result.months} months, ${result.days} days\nTotal Days: ${result.totalDays}\nTotal Hours: ${result.totalHours.toLocaleString()}\nTotal Minutes: ${result.totalMinutes.toLocaleString()}`;
    
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
          <CardTitle>Date Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="birth-date">Birth Date</Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="current-date">Current Date</Label>
            <Input
              id="current-date"
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Your Age</div>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              {result.years} years, {result.months} months, {result.days} days
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Days</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{result.totalDays.toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Hours</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{result.totalHours.toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Minutes</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{result.totalMinutes.toLocaleString()}</div>
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
