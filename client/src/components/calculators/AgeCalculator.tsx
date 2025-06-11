
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Calendar, Clock, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: number;
}

function calculateAge(birthDate: Date): AgeResult {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;
  
  // Next birthday calculation
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysToNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthday: daysToNext
  };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [result, setResult] = useState(calculateAge(new Date("1990-01-01")));
  const { toast } = useToast();

  useEffect(() => {
    if (birthDate) {
      setResult(calculateAge(new Date(birthDate)));
    }
  }, [birthDate]);

  const handleCopy = () => {
    const text = `Age: ${result.years} years, ${result.months} months, ${result.days} days\nTotal Days: ${result.totalDays}\nNext Birthday: ${result.nextBirthday} days`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Age calculation results copied successfully",
    });
  };

  const timeData = [
    { name: 'Years', value: result.years, color: '#3b82f6' },
    { name: 'Months', value: result.months, color: '#10b981' },
    { name: 'Days', value: result.days, color: '#f59e0b' }
  ];

  const lifeStatsData = [
    { name: 'Days Lived', value: result.totalDays },
    { name: 'Hours Lived', value: result.totalHours },
    { name: 'Minutes Lived', value: Math.floor(result.totalMinutes / 1000) },
    { name: 'Days to Birthday', value: result.nextBirthday }
  ];

  const chartConfig = {
    years: { label: "Years", color: "#3b82f6" },
    months: { label: "Months", color: "#10b981" },
    days: { label: "Days", color: "#f59e0b" }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <Calendar className="w-6 h-6 text-pink-600" />
            Age Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-pink-500"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Results */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <Clock className="w-5 h-5 text-blue-600" />
            Your Age
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.years}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Years</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.months}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Months</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.days}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Days</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <p className="text-sm text-gray-600 dark:text-gray-300">Next Birthday In</p>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{result.nextBirthday} Days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.totalDays.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Days</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{result.totalHours.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Hours</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{Math.floor(result.totalMinutes / 1000).toLocaleString()}K</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Minutes</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{Math.floor(result.totalSeconds / 1000000).toLocaleString()}M</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Seconds</p>
          </CardContent>
        </Card>
      </div>

      {/* Age Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Age Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {timeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Life Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lifeStatsData} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Fun Facts */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <Heart className="w-5 h-5 text-green-600" />
            Fun Facts About Your Age
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-green-600 dark:text-green-400">Heartbeats</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your heart has beaten approximately {Math.floor(result.totalDays * 100000).toLocaleString()} times!
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-blue-600 dark:text-blue-400">Sleep Time</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You've slept for about {Math.floor(result.totalDays / 3).toLocaleString()} days (assuming 8 hours/day)!
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-purple-600 dark:text-purple-400">Breaths</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You've taken approximately {Math.floor(result.totalMinutes * 15).toLocaleString()} breaths!
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-orange-600 dark:text-orange-400">Earth Orbits</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You've traveled around the sun {result.years} times on spaceship Earth!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button onClick={handleCopy} variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copy Results
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
