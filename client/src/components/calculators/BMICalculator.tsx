import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { calculateBMI } from "@/lib/calculations";
import { useToast } from "@/hooks/use-toast";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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

  const bmiCategoryData = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [
      {
        data: [18.5, 6.4, 4.1, 10],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        borderColor: ['#2563eb', '#059669', '#d97706', '#dc2626'],
        borderWidth: 2,
      },
    ],
  };

  const yourBMIData = {
    labels: ['Your BMI', 'Normal Range Min', 'Normal Range Max'],
    datasets: [
      {
        label: 'BMI Values',
        data: [result.bmi, 18.5, 24.9],
        backgroundColor: [
          result.color === 'blue' ? '#3b82f6' : 
          result.color === 'green' ? '#10b981' : 
          result.color === 'yellow' ? '#f59e0b' : '#ef4444',
          '#10b981',
          '#10b981'
        ],
        borderColor: [
          result.color === 'blue' ? '#2563eb' : 
          result.color === 'green' ? '#059669' : 
          result.color === 'yellow' ? '#d97706' : '#dc2626',
          '#059669',
          '#059669'
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
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

  const bmiRanges = [
    { name: 'Underweight', range: '< 18.5', color: '#3b82f6' },
    { name: 'Normal weight', range: '18.5 - 24.9', color: '#10b981' },
    { name: 'Overweight', range: '25 - 29.9', color: '#f59e0b' },
    { name: 'Obese', range: '≥ 30', color: '#ef4444' },
  ];

  const getCurrentCategory = () => {
    if (result.bmi < 18.5) return bmiRanges[0];
    if (result.bmi < 25) return bmiRanges[1];
    if (result.bmi < 30) return bmiRanges[2];
    return bmiRanges[3];
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <i className="fas fa-weight text-blue-600"></i>
            BMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-blue-500"
                placeholder="Enter your height in cm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-blue-500"
                placeholder="Enter your weight in kg"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-2">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Your BMI</p>
                <p className="text-4xl font-bold" style={{ color: getCurrentCategory().color }}>{result.bmi}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Category</p>
                <p className="text-xl font-semibold" style={{ color: getCurrentCategory().color }}>{result.category}</p>
              </div>
            </div>
          </div>

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

      {/* BMI Categories Chart */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            BMI Categories & Your Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bmiRanges.map((range, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border-2" 
                   style={{ borderColor: range.name === getCurrentCategory().name ? range.color : 'transparent', 
                           backgroundColor: range.name === getCurrentCategory().name ? `${range.color}10` : 'transparent' }}>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: range.color }}></div>
                  <span className="font-medium">{range.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{range.range}</span>
                  {range.name === getCurrentCategory().name && (
                    <div className="text-xs font-bold" style={{ color: range.color }}>← Your BMI</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Recommendations */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Health Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.category === 'Normal weight' && (
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                <p className="text-green-800 dark:text-green-200">Great! You're in the healthy weight range. Maintain your current lifestyle with regular exercise and balanced nutrition.</p>
              </div>
            )}
            {result.category === 'Underweight' && (
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200">Consider consulting with a healthcare provider about healthy ways to gain weight through proper nutrition and strength training.</p>
              </div>
            )}
            {result.category === 'Overweight' && (
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">Consider adopting a balanced diet and regular exercise routine. Small lifestyle changes can make a big difference.</p>
              </div>
            )}
            {(result.category === 'Obese' || result.category === 'Extremely obese') && (
              <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                <p className="text-red-800 dark:text-red-200">It's recommended to consult with a healthcare provider for personalized advice on achieving a healthy weight.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}