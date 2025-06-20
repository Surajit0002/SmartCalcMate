import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, ArrowLeftRight, Zap, Thermometer, Clock, Ruler, Weight, Gauge, Database, Box, Expand } from 'lucide-react';

interface ConversionUnit {
  name: string;
  symbol: string;
  multiplier: number;
  category: string;
}

interface ConversionCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  units: ConversionUnit[];
}

const conversionCategories: ConversionCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: <Ruler className="w-4 h-4" />,
    color: 'blue',
    units: [
      { name: 'Millimeter', symbol: 'mm', multiplier: 0.001, category: 'length' },
      { name: 'Centimeter', symbol: 'cm', multiplier: 0.01, category: 'length' },
      { name: 'Meter', symbol: 'm', multiplier: 1, category: 'length' },
      { name: 'Kilometer', symbol: 'km', multiplier: 1000, category: 'length' },
      { name: 'Inch', symbol: 'in', multiplier: 0.0254, category: 'length' },
      { name: 'Foot', symbol: 'ft', multiplier: 0.3048, category: 'length' },
      { name: 'Yard', symbol: 'yd', multiplier: 0.9144, category: 'length' },
      { name: 'Mile', symbol: 'mi', multiplier: 1609.344, category: 'length' },
    ]
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: <Weight className="w-4 h-4" />,
    color: 'green',
    units: [
      { name: 'Milligram', symbol: 'mg', multiplier: 0.000001, category: 'weight' },
      { name: 'Gram', symbol: 'g', multiplier: 0.001, category: 'weight' },
      { name: 'Kilogram', symbol: 'kg', multiplier: 1, category: 'weight' },
      { name: 'Pound', symbol: 'lb', multiplier: 0.453592, category: 'weight' },
      { name: 'Ounce', symbol: 'oz', multiplier: 0.0283495, category: 'weight' },
      { name: 'Ton', symbol: 't', multiplier: 1000, category: 'weight' },
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: <Thermometer className="w-4 h-4" />,
    color: 'red',
    units: [
      { name: 'Celsius', symbol: '°C', multiplier: 1, category: 'temperature' },
      { name: 'Fahrenheit', symbol: '°F', multiplier: 1, category: 'temperature' },
      { name: 'Kelvin', symbol: 'K', multiplier: 1, category: 'temperature' },
    ]
  },
  {
    id: 'time',
    name: 'Time',
    icon: <Clock className="w-4 h-4" />,
    color: 'purple',
    units: [
      { name: 'Second', symbol: 's', multiplier: 1, category: 'time' },
      { name: 'Minute', symbol: 'min', multiplier: 60, category: 'time' },
      { name: 'Hour', symbol: 'h', multiplier: 3600, category: 'time' },
      { name: 'Day', symbol: 'd', multiplier: 86400, category: 'time' },
      { name: 'Week', symbol: 'w', multiplier: 604800, category: 'time' },
      { name: 'Month', symbol: 'mo', multiplier: 2629746, category: 'time' },
      { name: 'Year', symbol: 'y', multiplier: 31556952, category: 'time' },
    ]
  },
  {
    id: 'area',
    name: 'Area',
    icon: <Expand className="w-4 h-4" />,
    color: 'orange',
    units: [
      { name: 'Square Millimeter', symbol: 'mm²', multiplier: 0.000001, category: 'area' },
      { name: 'Square Centimeter', symbol: 'cm²', multiplier: 0.0001, category: 'area' },
      { name: 'Square Meter', symbol: 'm²', multiplier: 1, category: 'area' },
      { name: 'Square Kilometer', symbol: 'km²', multiplier: 1000000, category: 'area' },
      { name: 'Square Inch', symbol: 'in²', multiplier: 0.00064516, category: 'area' },
      { name: 'Square Foot', symbol: 'ft²', multiplier: 0.092903, category: 'area' },
      { name: 'Acre', symbol: 'ac', multiplier: 4046.86, category: 'area' },
      { name: 'Hectare', symbol: 'ha', multiplier: 10000, category: 'area' },
    ]
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: <Box className="w-4 h-4" />,
    color: 'teal',
    units: [
      { name: 'Milliliter', symbol: 'ml', multiplier: 0.001, category: 'volume' },
      { name: 'Liter', symbol: 'L', multiplier: 1, category: 'volume' },
      { name: 'Gallon (US)', symbol: 'gal', multiplier: 3.78541, category: 'volume' },
      { name: 'Gallon (UK)', symbol: 'gal (UK)', multiplier: 4.54609, category: 'volume' },
      { name: 'Fluid Ounce', symbol: 'fl oz', multiplier: 0.0295735, category: 'volume' },
      { name: 'Cubic Meter', symbol: 'm³', multiplier: 1000, category: 'volume' },
      { name: 'Cup', symbol: 'cup', multiplier: 0.236588, category: 'volume' },
    ]
  },
  {
    id: 'data',
    name: 'Data Size',
    icon: <Database className="w-4 h-4" />,
    color: 'indigo',
    units: [
      { name: 'Byte', symbol: 'B', multiplier: 1, category: 'data' },
      { name: 'Kilobyte', symbol: 'KB', multiplier: 1024, category: 'data' },
      { name: 'Megabyte', symbol: 'MB', multiplier: 1048576, category: 'data' },
      { name: 'Gigabyte', symbol: 'GB', multiplier: 1073741824, category: 'data' },
      { name: 'Terabyte', symbol: 'TB', multiplier: 1099511627776, category: 'data' },
      { name: 'Petabyte', symbol: 'PB', multiplier: 1125899906842624, category: 'data' },
    ]
  },
  {
    id: 'power',
    name: 'Power',
    icon: <Zap className="w-4 h-4" />,
    color: 'yellow',
    units: [
      { name: 'Watt', symbol: 'W', multiplier: 1, category: 'power' },
      { name: 'Kilowatt', symbol: 'kW', multiplier: 1000, category: 'power' },
      { name: 'Megawatt', symbol: 'MW', multiplier: 1000000, category: 'power' },
      { name: 'Horsepower', symbol: 'hp', multiplier: 745.7, category: 'power' },
      { name: 'BTU/hour', symbol: 'BTU/h', multiplier: 0.293071, category: 'power' },
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: <Gauge className="w-4 h-4" />,
    color: 'pink',
    units: [
      { name: 'Pascal', symbol: 'Pa', multiplier: 1, category: 'pressure' },
      { name: 'Kilopascal', symbol: 'kPa', multiplier: 1000, category: 'pressure' },
      { name: 'Bar', symbol: 'bar', multiplier: 100000, category: 'pressure' },
      { name: 'Atmosphere', symbol: 'atm', multiplier: 101325, category: 'pressure' },
      { name: 'PSI', symbol: 'psi', multiplier: 6894.76, category: 'pressure' },
      { name: 'Torr', symbol: 'Torr', multiplier: 133.322, category: 'pressure' },
    ]
  },
];

export default function AdvancedUnitConverter() {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState<ConversionUnit | null>(null);
  const [toUnit, setToUnit] = useState<ConversionUnit | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const currentCategory = conversionCategories.find(cat => cat.id === activeCategory);

  useEffect(() => {
    if (currentCategory) {
      setFromUnit(currentCategory.units[0]);
      setToUnit(currentCategory.units[1]);
    }
  }, [activeCategory]);

  const convertValue = (value: number, from: ConversionUnit, to: ConversionUnit): number => {
    if (from.category === 'temperature') {
      return convertTemperature(value, from.symbol, to.symbol);
    }
    
    // Standard conversion using multipliers
    const baseValue = value * from.multiplier;
    return baseValue / to.multiplier;
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius = value;
    
    // Convert to Celsius first
    if (from === '°F') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'K') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    if (to === '°F') {
      return (celsius * 9/5) + 32;
    } else if (to === 'K') {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  const handleConvert = () => {
    if (!fromUnit || !toUnit || !inputValue) return;
    
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;
    
    const convertedValue = convertValue(value, fromUnit, toUnit);
    const formattedResult = convertedValue.toLocaleString('en-US', {
      maximumFractionDigits: 8,
      minimumFractionDigits: 0
    });
    
    setResult(formattedResult);
    
    const historyEntry = `${value} ${fromUnit.symbol} = ${formattedResult} ${toUnit.symbol}`;
    setHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
  };

  const swapUnits = () => {
    if (fromUnit && toUnit) {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
      if (result) {
        setInputValue(result);
        setResult(inputValue);
      }
    }
  };

  const clearAll = () => {
    setInputValue('');
    setResult('');
    setHistory([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8 text-blue-600" />
          Advanced Unit Converter
        </h1>
        <p className="text-muted-foreground">
          Convert between different units with precision and ease
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          {conversionCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-1 text-xs"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {conversionCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.name} Converter
                  <Badge variant="outline" className={`bg-${category.color}-50 text-${category.color}-700`}>
                    {category.units.length} units
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* From Unit */}
                  <div className="space-y-3">
                    <Label>From</Label>
                    <Select
                      value={fromUnit?.name || ''}
                      onValueChange={(value) => {
                        const unit = category.units.find(u => u.name === value);
                        setFromUnit(unit || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {category.units.map((unit) => (
                          <SelectItem key={unit.name} value={unit.name}>
                            {unit.name} ({unit.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter value"
                      className="text-lg"
                    />
                  </div>

                  {/* Swap Button */}
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapUnits}
                      className="rounded-full"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* To Unit */}
                  <div className="space-y-3">
                    <Label>To</Label>
                    <Select
                      value={toUnit?.name || ''}
                      onValueChange={(value) => {
                        const unit = category.units.find(u => u.name === value);
                        setToUnit(unit || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {category.units.map((unit) => (
                          <SelectItem key={unit.name} value={unit.name}>
                            {unit.name} ({unit.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {result || '0'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {toUnit?.symbol || 'unit'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleConvert} className="flex-1">
                    Convert
                  </Button>
                  <Button variant="outline" onClick={clearAll}>
                    Clear
                  </Button>
                </div>

                {/* Conversion History */}
                {history.length > 0 && (
                  <div className="space-y-2">
                    <Label>Recent Conversions</Label>
                    <div className="space-y-1">
                      {history.map((entry, index) => (
                        <div key={index} className="text-sm p-2 bg-muted rounded text-center">
                          {entry}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Reference */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {category.units.slice(0, 4).map((unit) => (
                    <div key={unit.name} className="text-center p-2 border rounded">
                      <div className="font-semibold text-sm">{unit.name}</div>
                      <div className="text-xs text-muted-foreground">{unit.symbol}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}