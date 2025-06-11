import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Share2, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConversionUnit {
  name: string;
  symbol: string;
  multiplier: number;
}

interface ConversionCategory {
  name: string;
  units: ConversionUnit[];
}

const conversions: ConversionCategory[] = [
  {
    name: "Length",
    units: [
      { name: "Millimeter", symbol: "mm", multiplier: 0.001 },
      { name: "Centimeter", symbol: "cm", multiplier: 0.01 },
      { name: "Meter", symbol: "m", multiplier: 1 },
      { name: "Kilometer", symbol: "km", multiplier: 1000 },
      { name: "Inch", symbol: "in", multiplier: 0.0254 },
      { name: "Foot", symbol: "ft", multiplier: 0.3048 },
      { name: "Yard", symbol: "yd", multiplier: 0.9144 },
      { name: "Mile", symbol: "mi", multiplier: 1609.34 },
    ]
  },
  {
    name: "Weight",
    units: [
      { name: "Milligram", symbol: "mg", multiplier: 0.000001 },
      { name: "Gram", symbol: "g", multiplier: 0.001 },
      { name: "Kilogram", symbol: "kg", multiplier: 1 },
      { name: "Ounce", symbol: "oz", multiplier: 0.0283495 },
      { name: "Pound", symbol: "lb", multiplier: 0.453592 },
      { name: "Stone", symbol: "st", multiplier: 6.35029 },
    ]
  },
  {
    name: "Temperature",
    units: [
      { name: "Celsius", symbol: "°C", multiplier: 1 },
      { name: "Fahrenheit", symbol: "°F", multiplier: 1 },
      { name: "Kelvin", symbol: "K", multiplier: 1 },
    ]
  }
];

export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("3.28084");
  const { toast } = useToast();

  const currentCategory = conversions.find(c => c.name === category);

  const convertValue = (value: number, from: string, to: string, categoryName: string): number => {
    if (categoryName === "Temperature") {
      return convertTemperature(value, from, to);
    }

    const fromUnit = currentCategory?.units.find(u => u.symbol === from);
    const toUnit = currentCategory?.units.find(u => u.symbol === to);

    if (!fromUnit || !toUnit) return value;

    const baseValue = value * fromUnit.multiplier;
    return baseValue / toUnit.multiplier;
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;

    // Convert to Celsius first
    switch (from) {
      case "°C":
        celsius = value;
        break;
      case "°F":
        celsius = (value - 32) * 5/9;
        break;
      case "K":
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case "°C":
        return celsius;
      case "°F":
        return celsius * 9/5 + 32;
      case "K":
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  useEffect(() => {
    const value = parseFloat(fromValue) || 0;
    const result = convertValue(value, fromUnit, toUnit, category);
    setToValue(result.toFixed(6).replace(/\.?0+$/, ""));
  }, [fromValue, fromUnit, toUnit, category]);

  useEffect(() => {
    if (currentCategory) {
      setFromUnit(currentCategory.units[0].symbol);
      setToUnit(currentCategory.units[1]?.symbol || currentCategory.units[0].symbol);
    }
  }, [category]);

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
  };

  const handleCopy = () => {
    const text = `${fromValue} ${fromUnit} = ${toValue} ${toUnit}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Conversion result copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `Unit Converter Result:\n${fromValue} ${fromUnit} = ${toValue} ${toUnit}`;
    
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
          <CardTitle>Unit Conversion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {conversions.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-value">From</Label>
              <Input
                id="from-value"
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="1"
              />
            </div>
            <div>
              <Label htmlFor="from-unit">Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentCategory?.units.map((unit) => (
                    <SelectItem key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swapUnits}>
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="to-value">To</Label>
              <Input
                id="to-value"
                type="text"
                value={toValue}
                readOnly
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div>
              <Label htmlFor="to-unit">Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentCategory?.units.map((unit) => (
                    <SelectItem key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Result</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {fromValue} {fromUnit} = {toValue} {toUnit}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Reference</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Converting {category.toLowerCase()} from {currentCategory?.units.find(u => u.symbol === fromUnit)?.name} to {currentCategory?.units.find(u => u.symbol === toUnit)?.name}
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
