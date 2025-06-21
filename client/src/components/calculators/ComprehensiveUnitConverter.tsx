import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Ruler, Scale, Thermometer, Clock, Gauge, Expand, 
  Droplets, HardDrive, Zap, Activity, Copy, RotateCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Unit {
  name: string;
  symbol: string;
  factor: number;
  offset?: number;
}

interface UnitCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  units: Unit[];
}

const unitCategories: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: <Ruler className="w-5 h-5" />,
    color: 'blue',
    units: [
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Mile', symbol: 'mi', factor: 1609.34 },
      { name: 'Nautical Mile', symbol: 'nmi', factor: 1852 },
      { name: 'Micrometer', symbol: 'μm', factor: 0.000001 },
      { name: 'Nanometer', symbol: 'nm', factor: 0.000000001 },
      { name: 'Light Year', symbol: 'ly', factor: 9.461e15 }
    ]
  },
  {
    id: 'weight',
    name: 'Weight & Mass',
    icon: <Scale className="w-5 h-5" />,
    color: 'green',
    units: [
      { name: 'Kilogram', symbol: 'kg', factor: 1 },
      { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
      { name: 'Stone', symbol: 'st', factor: 6.35029 },
      { name: 'Ton (Metric)', symbol: 't', factor: 1000 },
      { name: 'Ton (US)', symbol: 'ton', factor: 907.185 },
      { name: 'Ton (UK)', symbol: 'long ton', factor: 1016.05 },
      { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      { name: 'Microgram', symbol: 'μg', factor: 0.000000001 },
      { name: 'Carat', symbol: 'ct', factor: 0.0002 },
      { name: 'Grain', symbol: 'gr', factor: 0.0000648 }
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: <Thermometer className="w-5 h-5" />,
    color: 'red',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1, offset: 0 },
      { name: 'Fahrenheit', symbol: '°F', factor: 5/9, offset: -32 },
      { name: 'Kelvin', symbol: 'K', factor: 1, offset: -273.15 },
      { name: 'Rankine', symbol: '°R', factor: 5/9, offset: -459.67 },
      { name: 'Réaumur', symbol: '°Ré', factor: 5/4, offset: 0 }
    ]
  },
  {
    id: 'time',
    name: 'Time',
    icon: <Clock className="w-5 h-5" />,
    color: 'purple',
    units: [
      { name: 'Second', symbol: 's', factor: 1 },
      { name: 'Minute', symbol: 'min', factor: 60 },
      { name: 'Hour', symbol: 'h', factor: 3600 },
      { name: 'Day', symbol: 'd', factor: 86400 },
      { name: 'Week', symbol: 'wk', factor: 604800 },
      { name: 'Month', symbol: 'mo', factor: 2629746 },
      { name: 'Year', symbol: 'yr', factor: 31556952 },
      { name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      { name: 'Microsecond', symbol: 'μs', factor: 0.000001 },
      { name: 'Nanosecond', symbol: 'ns', factor: 0.000000001 },
      { name: 'Decade', symbol: 'decade', factor: 315569520 },
      { name: 'Century', symbol: 'century', factor: 3155695200 }
    ]
  },
  {
    id: 'speed',
    name: 'Speed & Velocity',
    icon: <Gauge className="w-5 h-5" />,
    color: 'orange',
    units: [
      { name: 'Meter per Second', symbol: 'm/s', factor: 1 },
      { name: 'Kilometer per Hour', symbol: 'km/h', factor: 0.277778 },
      { name: 'Mile per Hour', symbol: 'mph', factor: 0.44704 },
      { name: 'Foot per Second', symbol: 'ft/s', factor: 0.3048 },
      { name: 'Knot', symbol: 'kn', factor: 0.514444 },
      { name: 'Mach', symbol: 'Ma', factor: 343 },
      { name: 'Speed of Light', symbol: 'c', factor: 299792458 },
      { name: 'Speed of Sound', symbol: 'sound', factor: 343 }
    ]
  },
  {
    id: 'area',
    name: 'Area',
    icon: <Expand className="w-5 h-5" />,
    color: 'teal',
    units: [
      { name: 'Square Meter', symbol: 'm²', factor: 1 },
      { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      { name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
      { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
      { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
      { name: 'Square Yard', symbol: 'yd²', factor: 0.836127 },
      { name: 'Acre', symbol: 'ac', factor: 4046.86 },
      { name: 'Hectare', symbol: 'ha', factor: 10000 },
      { name: 'Square Mile', symbol: 'mi²', factor: 2589988.11 }
    ]
  },
  {
    id: 'volume',
    name: 'Volume & Capacity',
    icon: <Droplets className="w-5 h-5" />,
    color: 'cyan',
    units: [
      { name: 'Liter', symbol: 'L', factor: 1 },
      { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      { name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      { name: 'Cubic Centimeter', symbol: 'cm³', factor: 0.001 },
      { name: 'Gallon (US)', symbol: 'gal', factor: 3.78541 },
      { name: 'Gallon (UK)', symbol: 'imp gal', factor: 4.54609 },
      { name: 'Quart (US)', symbol: 'qt', factor: 0.946353 },
      { name: 'Pint (US)', symbol: 'pt', factor: 0.473176 },
      { name: 'Cup (US)', symbol: 'cup', factor: 0.236588 },
      { name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 0.0295735 },
      { name: 'Tablespoon', symbol: 'tbsp', factor: 0.0147868 },
      { name: 'Teaspoon', symbol: 'tsp', factor: 0.00492892 },
      { name: 'Barrel (Oil)', symbol: 'bbl', factor: 158.987 },
      { name: 'Cubic Inch', symbol: 'in³', factor: 0.0163871 },
      { name: 'Cubic Foot', symbol: 'ft³', factor: 28.3168 }
    ]
  },
  {
    id: 'data',
    name: 'Data Size',
    icon: <HardDrive className="w-5 h-5" />,
    color: 'indigo',
    units: [
      { name: 'Byte', symbol: 'B', factor: 1 },
      { name: 'Kilobyte', symbol: 'KB', factor: 1000 },
      { name: 'Megabyte', symbol: 'MB', factor: 1000000 },
      { name: 'Gigabyte', symbol: 'GB', factor: 1000000000 },
      { name: 'Terabyte', symbol: 'TB', factor: 1000000000000 },
      { name: 'Petabyte', symbol: 'PB', factor: 1000000000000000 },
      { name: 'Kibibyte', symbol: 'KiB', factor: 1024 },
      { name: 'Mebibyte', symbol: 'MiB', factor: 1048576 },
      { name: 'Gibibyte', symbol: 'GiB', factor: 1073741824 },
      { name: 'Tebibyte', symbol: 'TiB', factor: 1099511627776 },
      { name: 'Pebibyte', symbol: 'PiB', factor: 1125899906842624 },
      { name: 'Bit', symbol: 'bit', factor: 0.125 }
    ]
  },
  {
    id: 'power',
    name: 'Power & Energy',
    icon: <Zap className="w-5 h-5" />,
    color: 'yellow',
    units: [
      { name: 'Watt', symbol: 'W', factor: 1 },
      { name: 'Kilowatt', symbol: 'kW', factor: 1000 },
      { name: 'Megawatt', symbol: 'MW', factor: 1000000 },
      { name: 'Horsepower (Mechanical)', symbol: 'hp', factor: 745.7 },
      { name: 'Horsepower (Metric)', symbol: 'PS', factor: 735.5 },
      { name: 'British Thermal Unit per Hour', symbol: 'BTU/h', factor: 0.293071 },
      { name: 'Calorie per Second', symbol: 'cal/s', factor: 4.184 },
      { name: 'Foot-pound per Second', symbol: 'ft⋅lbf/s', factor: 1.35582 },
      { name: 'Joule per Second', symbol: 'J/s', factor: 1 }
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: <Activity className="w-5 h-5" />,
    color: 'pink',
    units: [
      { name: 'Pascal', symbol: 'Pa', factor: 1 },
      { name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { name: 'Megapascal', symbol: 'MPa', factor: 1000000 },
      { name: 'Bar', symbol: 'bar', factor: 100000 },
      { name: 'Atmosphere', symbol: 'atm', factor: 101325 },
      { name: 'Pounds per Square Inch', symbol: 'psi', factor: 6895 },
      { name: 'Torr', symbol: 'Torr', factor: 133.322 },
      { name: 'Millimeter of Mercury', symbol: 'mmHg', factor: 133.322 },
      { name: 'Inch of Mercury', symbol: 'inHg', factor: 3386 },
      { name: 'Millibar', symbol: 'mbar', factor: 100 }
    ]
  }
];

export default function ComprehensiveUnitConverter() {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [conversionHistory, setConversionHistory] = useState<any[]>([]);
  const { toast } = useToast();

  const currentCategory = unitCategories.find(cat => cat.id === activeCategory);

  useEffect(() => {
    if (currentCategory) {
      setFromUnit(currentCategory.units[0]?.symbol || '');
      setToUnit(currentCategory.units[1]?.symbol || '');
    }
  }, [activeCategory, currentCategory]);

  const convertUnits = (value: number, fromUnitSymbol: string, toUnitSymbol: string, category: UnitCategory) => {
    if (!value || !fromUnitSymbol || !toUnitSymbol) return 0;

    const fromUnitData = category.units.find(u => u.symbol === fromUnitSymbol);
    const toUnitData = category.units.find(u => u.symbol === toUnitSymbol);

    if (!fromUnitData || !toUnitData) return 0;

    // Special handling for temperature
    if (category.id === 'temperature') {
      return convertTemperature(value, fromUnitData, toUnitData);
    }

    // Standard conversion through base unit
    const baseValue = value * fromUnitData.factor;
    return baseValue / toUnitData.factor;
  };

  const convertTemperature = (value: number, fromUnit: Unit, toUnit: Unit) => {
    // Convert to Celsius first
    let celsius = value;
    
    if (fromUnit.symbol === '°F') {
      celsius = (value - 32) * 5/9;
    } else if (fromUnit.symbol === 'K') {
      celsius = value - 273.15;
    } else if (fromUnit.symbol === '°R') {
      celsius = (value - 491.67) * 5/9;
    } else if (fromUnit.symbol === '°Ré') {
      celsius = value * 5/4;
    }

    // Convert from Celsius to target
    if (toUnit.symbol === '°C') {
      return celsius;
    } else if (toUnit.symbol === '°F') {
      return celsius * 9/5 + 32;
    } else if (toUnit.symbol === 'K') {
      return celsius + 273.15;
    } else if (toUnit.symbol === '°R') {
      return (celsius + 273.15) * 9/5;
    } else if (toUnit.symbol === '°Ré') {
      return celsius * 4/5;
    }

    return celsius;
  };

  const handleConversion = () => {
    if (!inputValue || !currentCategory) return;

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return;

    const convertedValue = convertUnits(numValue, fromUnit, toUnit, currentCategory);
    const formattedResult = formatNumber(convertedValue);
    setResult(formattedResult);

    // Add to history
    const historyItem = {
      id: Date.now(),
      category: currentCategory.name,
      from: `${numValue} ${fromUnit}`,
      to: `${formattedResult} ${toUnit}`,
      timestamp: new Date().toLocaleTimeString()
    };
    setConversionHistory(prev => [historyItem, ...prev.slice(0, 9)]);
  };

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (Math.abs(num) >= 1e6 || Math.abs(num) < 1e-6) {
      return num.toExponential(6);
    }
    return parseFloat(num.toPrecision(8)).toString();
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result) {
      setInputValue(result);
      setResult(inputValue);
    }
  };

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(`${result} ${toUnit}`);
        toast({
          title: 'Copied!',
          description: 'Result copied to clipboard'
        });
      } catch (error) {
        toast({
          title: 'Copy failed',
          description: 'Unable to copy to clipboard',
          variant: 'destructive'
        });
      }
    }
  };

  useEffect(() => {
    if (inputValue && fromUnit && toUnit && currentCategory) {
      handleConversion();
    }
  }, [inputValue, fromUnit, toUnit, currentCategory]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Comprehensive Unit Converter</h1>
        <p className="text-xl text-muted-foreground">
          Convert between 120+ units across 10 categories with precision
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 w-full">
          {unitCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {unitCategories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Converter */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {category.icon}
                      {category.name} Converter
                    </CardTitle>
                    <CardDescription>
                      Convert between {category.units.length} different {category.name.toLowerCase()} units
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* From Unit */}
                    <div className="space-y-2">
                      <Label>From</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter value"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="flex-1"
                        />
                        <Select value={fromUnit} onValueChange={setFromUnit}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {category.units.map(unit => (
                              <SelectItem key={unit.symbol} value={unit.symbol}>
                                {unit.name} ({unit.symbol})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <Button variant="outline" onClick={swapUnits}>
                        <RotateCw className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* To Unit */}
                    <div className="space-y-2">
                      <Label>To</Label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={result}
                          readOnly
                          className="flex-1 font-mono"
                          placeholder="Result will appear here"
                        />
                        <Select value={toUnit} onValueChange={setToUnit}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {category.units.map(unit => (
                              <SelectItem key={unit.symbol} value={unit.symbol}>
                                {unit.name} ({unit.symbol})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {result && (
                      <Button onClick={copyResult} className="w-full">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Result
                      </Button>
                    )}

                    {/* Quick Convert Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['1', '10', '100', '1000'].map(val => (
                        <Button
                          key={val}
                          variant="outline"
                          size="sm"
                          onClick={() => setInputValue(val)}
                        >
                          {val}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* History & Quick Access */}
              <div className="space-y-6">
                {/* Conversion History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {conversionHistory.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No conversions yet</p>
                    ) : (
                      <div className="space-y-2">
                        {conversionHistory.map(item => (
                          <div key={item.id} className="text-sm p-2 bg-muted rounded">
                            <div className="font-medium">{item.from} → {item.to}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.category} • {item.timestamp}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Common Conversions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Popular {category.name} Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getPopularConversions(category.id).map((conv, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => {
                            setFromUnit(conv.from);
                            setToUnit(conv.to);
                            setInputValue('1');
                          }}
                        >
                          {conv.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function getPopularConversions(categoryId: string) {
  const conversions: Record<string, Array<{name: string, from: string, to: string}>> = {
    length: [
      { name: 'Feet to Meters', from: 'ft', to: 'm' },
      { name: 'Inches to Centimeters', from: 'in', to: 'cm' },
      { name: 'Miles to Kilometers', from: 'mi', to: 'km' },
      { name: 'Yards to Meters', from: 'yd', to: 'm' }
    ],
    weight: [
      { name: 'Pounds to Kilograms', from: 'lb', to: 'kg' },
      { name: 'Ounces to Grams', from: 'oz', to: 'g' },
      { name: 'Stones to Kilograms', from: 'st', to: 'kg' },
      { name: 'Tons to Kilograms', from: 't', to: 'kg' }
    ],
    temperature: [
      { name: 'Celsius to Fahrenheit', from: '°C', to: '°F' },
      { name: 'Fahrenheit to Celsius', from: '°F', to: '°C' },
      { name: 'Kelvin to Celsius', from: 'K', to: '°C' },
      { name: 'Celsius to Kelvin', from: '°C', to: 'K' }
    ],
    data: [
      { name: 'GB to MB', from: 'GB', to: 'MB' },
      { name: 'MB to KB', from: 'MB', to: 'KB' },
      { name: 'TB to GB', from: 'TB', to: 'GB' },
      { name: 'GiB to GB', from: 'GiB', to: 'GB' }
    ]
  };

  return conversions[categoryId] || [];
}