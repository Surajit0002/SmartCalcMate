
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Copy, 
  Share2, 
  ArrowRightLeft, 
  History, 
  Star, 
  Trash2,
  Calculator,
  Ruler,
  Weight,
  Thermometer,
  Clock,
  Expand,
  Box,
  Database,
  Zap,
  Gauge,
  Trending,
  BookOpen,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConversionUnit {
  name: string;
  symbol: string;
  multiplier: number;
  category: string;
  description?: string;
  aliases?: string[];
}

interface ConversionCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  units: ConversionUnit[];
  isPopular?: boolean;
}

interface ConversionHistory {
  id: string;
  fromValue: string;
  fromUnit: string;
  toValue: string;
  toUnit: string;
  category: string;
  timestamp: Date;
}

const conversionCategories: ConversionCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: <Ruler className="w-4 h-4" />,
    color: 'blue',
    description: 'Convert between various length and distance measurements',
    isPopular: true,
    units: [
      { name: 'Millimeter', symbol: 'mm', multiplier: 0.001, category: 'length', description: 'One thousandth of a meter' },
      { name: 'Centimeter', symbol: 'cm', multiplier: 0.01, category: 'length', description: 'One hundredth of a meter' },
      { name: 'Meter', symbol: 'm', multiplier: 1, category: 'length', description: 'Base unit of length in SI' },
      { name: 'Kilometer', symbol: 'km', multiplier: 1000, category: 'length', description: 'One thousand meters' },
      { name: 'Inch', symbol: 'in', multiplier: 0.0254, category: 'length', description: 'Imperial unit, 1/12 of a foot' },
      { name: 'Foot', symbol: 'ft', multiplier: 0.3048, category: 'length', description: 'Imperial unit, 12 inches' },
      { name: 'Yard', symbol: 'yd', multiplier: 0.9144, category: 'length', description: 'Imperial unit, 3 feet' },
      { name: 'Mile', symbol: 'mi', multiplier: 1609.344, category: 'length', description: 'Imperial unit, 5280 feet' },
      { name: 'Nautical Mile', symbol: 'nmi', multiplier: 1852, category: 'length', description: 'Used in navigation' },
      { name: 'Light Year', symbol: 'ly', multiplier: 9.461e15, category: 'length', description: 'Distance light travels in one year' },
    ]
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: <Weight className="w-4 h-4" />,
    color: 'green',
    description: 'Convert between mass and weight units',
    isPopular: true,
    units: [
      { name: 'Milligram', symbol: 'mg', multiplier: 0.000001, category: 'weight', description: 'One thousandth of a gram' },
      { name: 'Gram', symbol: 'g', multiplier: 0.001, category: 'weight', description: 'Base unit of mass' },
      { name: 'Kilogram', symbol: 'kg', multiplier: 1, category: 'weight', description: 'One thousand grams' },
      { name: 'Pound', symbol: 'lb', multiplier: 0.453592, category: 'weight', description: 'Imperial unit of weight' },
      { name: 'Ounce', symbol: 'oz', multiplier: 0.0283495, category: 'weight', description: '1/16 of a pound' },
      { name: 'Stone', symbol: 'st', multiplier: 6.35029, category: 'weight', description: 'British unit, 14 pounds' },
      { name: 'Ton (Metric)', symbol: 't', multiplier: 1000, category: 'weight', description: 'One thousand kilograms' },
      { name: 'Ton (US)', symbol: 'ton', multiplier: 907.185, category: 'weight', description: '2000 pounds' },
      { name: 'Carat', symbol: 'ct', multiplier: 0.0002, category: 'weight', description: 'Used for precious stones' },
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: <Thermometer className="w-4 h-4" />,
    color: 'red',
    description: 'Convert between temperature scales',
    isPopular: true,
    units: [
      { name: 'Celsius', symbol: '°C', multiplier: 1, category: 'temperature', description: 'Water freezes at 0°C' },
      { name: 'Fahrenheit', symbol: '°F', multiplier: 1, category: 'temperature', description: 'Water freezes at 32°F' },
      { name: 'Kelvin', symbol: 'K', multiplier: 1, category: 'temperature', description: 'Absolute temperature scale' },
      { name: 'Rankine', symbol: '°R', multiplier: 1, category: 'temperature', description: 'Absolute Fahrenheit scale' },
      { name: 'Réaumur', symbol: '°Ré', multiplier: 1, category: 'temperature', description: 'Historical temperature scale' },
    ]
  },
  {
    id: 'time',
    name: 'Time',
    icon: <Clock className="w-4 h-4" />,
    color: 'purple',
    description: 'Convert between time units and durations',
    units: [
      { name: 'Millisecond', symbol: 'ms', multiplier: 0.001, category: 'time', description: 'One thousandth of a second' },
      { name: 'Second', symbol: 's', multiplier: 1, category: 'time', description: 'Base unit of time' },
      { name: 'Minute', symbol: 'min', multiplier: 60, category: 'time', description: '60 seconds' },
      { name: 'Hour', symbol: 'h', multiplier: 3600, category: 'time', description: '60 minutes' },
      { name: 'Day', symbol: 'd', multiplier: 86400, category: 'time', description: '24 hours' },
      { name: 'Week', symbol: 'w', multiplier: 604800, category: 'time', description: '7 days' },
      { name: 'Month', symbol: 'mo', multiplier: 2629746, category: 'time', description: 'Average 30.44 days' },
      { name: 'Year', symbol: 'y', multiplier: 31556952, category: 'time', description: '365.25 days' },
      { name: 'Decade', symbol: 'dec', multiplier: 315569520, category: 'time', description: '10 years' },
      { name: 'Century', symbol: 'cent', multiplier: 3155695200, category: 'time', description: '100 years' },
    ]
  },
  {
    id: 'area',
    name: 'Area',
    icon: <Expand className="w-4 h-4" />,
    color: 'orange',
    description: 'Convert between area and surface measurements',
    units: [
      { name: 'Square Millimeter', symbol: 'mm²', multiplier: 0.000001, category: 'area', description: 'Area of 1mm × 1mm' },
      { name: 'Square Centimeter', symbol: 'cm²', multiplier: 0.0001, category: 'area', description: 'Area of 1cm × 1cm' },
      { name: 'Square Meter', symbol: 'm²', multiplier: 1, category: 'area', description: 'Base unit of area' },
      { name: 'Square Kilometer', symbol: 'km²', multiplier: 1000000, category: 'area', description: 'Area of 1km × 1km' },
      { name: 'Square Inch', symbol: 'in²', multiplier: 0.00064516, category: 'area', description: 'Area of 1in × 1in' },
      { name: 'Square Foot', symbol: 'ft²', multiplier: 0.092903, category: 'area', description: 'Area of 1ft × 1ft' },
      { name: 'Square Yard', symbol: 'yd²', multiplier: 0.836127, category: 'area', description: 'Area of 1yd × 1yd' },
      { name: 'Acre', symbol: 'ac', multiplier: 4046.86, category: 'area', description: '43,560 square feet' },
      { name: 'Hectare', symbol: 'ha', multiplier: 10000, category: 'area', description: '10,000 square meters' },
      { name: 'Square Mile', symbol: 'mi²', multiplier: 2589988.11, category: 'area', description: 'Area of 1mi × 1mi' },
    ]
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: <Box className="w-4 h-4" />,
    color: 'teal',
    description: 'Convert between volume and capacity measurements',
    units: [
      { name: 'Milliliter', symbol: 'ml', multiplier: 0.001, category: 'volume', description: 'One thousandth of a liter' },
      { name: 'Liter', symbol: 'L', multiplier: 1, category: 'volume', description: 'Base unit of volume' },
      { name: 'Cubic Meter', symbol: 'm³', multiplier: 1000, category: 'volume', description: 'Volume of 1m × 1m × 1m' },
      { name: 'Gallon (US)', symbol: 'gal', multiplier: 3.78541, category: 'volume', description: 'US liquid gallon' },
      { name: 'Gallon (UK)', symbol: 'gal (UK)', multiplier: 4.54609, category: 'volume', description: 'Imperial gallon' },
      { name: 'Fluid Ounce (US)', symbol: 'fl oz', multiplier: 0.0295735, category: 'volume', description: '1/128 of a US gallon' },
      { name: 'Fluid Ounce (UK)', symbol: 'fl oz (UK)', multiplier: 0.0284131, category: 'volume', description: '1/160 of an imperial gallon' },
      { name: 'Cup (US)', symbol: 'cup', multiplier: 0.236588, category: 'volume', description: '8 US fluid ounces' },
      { name: 'Pint (US)', symbol: 'pt', multiplier: 0.473176, category: 'volume', description: '2 US cups' },
      { name: 'Quart (US)', symbol: 'qt', multiplier: 0.946353, category: 'volume', description: '2 US pints' },
      { name: 'Tablespoon', symbol: 'tbsp', multiplier: 0.0147868, category: 'volume', description: '3 teaspoons' },
      { name: 'Teaspoon', symbol: 'tsp', multiplier: 0.00492892, category: 'volume', description: '1/3 tablespoon' },
    ]
  },
  {
    id: 'data',
    name: 'Data Size',
    icon: <Database className="w-4 h-4" />,
    color: 'indigo',
    description: 'Convert between digital storage units',
    units: [
      { name: 'Bit', symbol: 'bit', multiplier: 0.125, category: 'data', description: 'Basic unit of information' },
      { name: 'Byte', symbol: 'B', multiplier: 1, category: 'data', description: '8 bits' },
      { name: 'Kilobyte', symbol: 'KB', multiplier: 1024, category: 'data', description: '1,024 bytes' },
      { name: 'Megabyte', symbol: 'MB', multiplier: 1048576, category: 'data', description: '1,024 KB' },
      { name: 'Gigabyte', symbol: 'GB', multiplier: 1073741824, category: 'data', description: '1,024 MB' },
      { name: 'Terabyte', symbol: 'TB', multiplier: 1099511627776, category: 'data', description: '1,024 GB' },
      { name: 'Petabyte', symbol: 'PB', multiplier: 1125899906842624, category: 'data', description: '1,024 TB' },
      { name: 'Exabyte', symbol: 'EB', multiplier: 1152921504606846976, category: 'data', description: '1,024 PB' },
    ]
  },
  {
    id: 'power',
    name: 'Power',
    icon: <Zap className="w-4 h-4" />,
    color: 'yellow',
    description: 'Convert between power and energy rate units',
    units: [
      { name: 'Watt', symbol: 'W', multiplier: 1, category: 'power', description: 'Base unit of power' },
      { name: 'Kilowatt', symbol: 'kW', multiplier: 1000, category: 'power', description: '1,000 watts' },
      { name: 'Megawatt', symbol: 'MW', multiplier: 1000000, category: 'power', description: '1,000,000 watts' },
      { name: 'Gigawatt', symbol: 'GW', multiplier: 1000000000, category: 'power', description: '1,000,000,000 watts' },
      { name: 'Horsepower (Mechanical)', symbol: 'hp', multiplier: 745.7, category: 'power', description: '550 foot-pounds per second' },
      { name: 'Horsepower (Metric)', symbol: 'PS', multiplier: 735.5, category: 'power', description: 'Metric horsepower' },
      { name: 'BTU/hour', symbol: 'BTU/h', multiplier: 0.293071, category: 'power', description: 'British Thermal Unit per hour' },
      { name: 'Calories/second', symbol: 'cal/s', multiplier: 4.184, category: 'power', description: 'Calories per second' },
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: <Gauge className="w-4 h-4" />,
    color: 'pink',
    description: 'Convert between pressure and stress units',
    units: [
      { name: 'Pascal', symbol: 'Pa', multiplier: 1, category: 'pressure', description: 'Base unit of pressure' },
      { name: 'Kilopascal', symbol: 'kPa', multiplier: 1000, category: 'pressure', description: '1,000 pascals' },
      { name: 'Megapascal', symbol: 'MPa', multiplier: 1000000, category: 'pressure', description: '1,000,000 pascals' },
      { name: 'Bar', symbol: 'bar', multiplier: 100000, category: 'pressure', description: '100,000 pascals' },
      { name: 'Millibar', symbol: 'mbar', multiplier: 100, category: 'pressure', description: '0.001 bar' },
      { name: 'Atmosphere', symbol: 'atm', multiplier: 101325, category: 'pressure', description: 'Standard atmosphere' },
      { name: 'PSI', symbol: 'psi', multiplier: 6894.76, category: 'pressure', description: 'Pounds per square inch' },
      { name: 'Torr', symbol: 'Torr', multiplier: 133.322, category: 'pressure', description: '1/760 of an atmosphere' },
      { name: 'mmHg', symbol: 'mmHg', multiplier: 133.322, category: 'pressure', description: 'Millimeters of mercury' },
      { name: 'inHg', symbol: 'inHg', multiplier: 3386.39, category: 'pressure', description: 'Inches of mercury' },
    ]
  },
];

export default function AdvancedUnitConverter() {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState<ConversionUnit | null>(null);
  const [toUnit, setToUnit] = useState<ConversionUnit | null>(null);
  const [inputValue, setInputValue] = useState('1');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [precision, setPrecision] = useState(6);
  const { toast } = useToast();

  const currentCategory = conversionCategories.find(cat => cat.id === activeCategory);
  const popularCategories = conversionCategories.filter(cat => cat.isPopular);

  // Initialize units when category changes
  useEffect(() => {
    if (currentCategory) {
      setFromUnit(currentCategory.units[0]);
      setToUnit(currentCategory.units[1] || currentCategory.units[0]);
      setSearchTerm('');
    }
  }, [activeCategory]);

  // Perform conversion when inputs change
  useEffect(() => {
    if (fromUnit && toUnit && inputValue) {
      const value = parseFloat(inputValue);
      if (!isNaN(value)) {
        const convertedValue = convertValue(value, fromUnit, toUnit);
        setResult(convertedValue.toFixed(precision).replace(/\.?0+$/, ''));
      }
    }
  }, [inputValue, fromUnit, toUnit, precision]);

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
    switch (from) {
      case '°F':
        celsius = (value - 32) * 5/9;
        break;
      case 'K':
        celsius = value - 273.15;
        break;
      case '°R':
        celsius = (value - 491.67) * 5/9;
        break;
      case '°Ré':
        celsius = value * 5/4;
        break;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case '°F':
        return (celsius * 9/5) + 32;
      case 'K':
        return celsius + 273.15;
      case '°R':
        return (celsius * 9/5) + 491.67;
      case '°Ré':
        return celsius * 4/5;
      default:
        return celsius;
    }
  };

  const handleConvert = () => {
    if (!fromUnit || !toUnit || !inputValue) return;

    const conversionRecord: ConversionHistory = {
      id: Date.now().toString(),
      fromValue: inputValue,
      fromUnit: fromUnit.symbol,
      toValue: result,
      toUnit: toUnit.symbol,
      category: activeCategory,
      timestamp: new Date(),
    };

    setHistory(prev => [conversionRecord, ...prev.slice(0, 9)]);
    
    toast({
      title: "Conversion Added",
      description: `${inputValue} ${fromUnit.symbol} = ${result} ${toUnit.symbol}`,
    });
  };

  const swapUnits = () => {
    if (fromUnit && toUnit) {
      const temp = fromUnit;
      setFromUnit(toUnit);
      setToUnit(temp);
      setInputValue(result || '1');
    }
  };

  const toggleFavorite = (categoryId: string) => {
    setFavorites(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All conversion history has been cleared",
    });
  };

  const handleCopy = () => {
    const text = `${inputValue} ${fromUnit?.symbol} = ${result} ${toUnit?.symbol}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Conversion result copied successfully",
    });
  };

  const handleShare = async () => {
    const text = `Unit Converter Result:\n${inputValue} ${fromUnit?.symbol} = ${result} ${toUnit?.symbol}`;
    
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

  const filteredUnits = useMemo(() => {
    if (!currentCategory) return [];
    if (!searchTerm) return currentCategory.units;
    
    return currentCategory.units.filter(unit =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currentCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Advanced Unit Converter
        </h1>
        <p className="text-muted-foreground">
          Convert between different units with precision and ease across multiple categories
        </p>
      </div>

      {/* Popular Categories Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trending className="w-5 h-5 text-orange-500" />
            Popular Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Converter */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 min-w-[800px]">
                {conversionCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center gap-1 text-xs relative"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                    {favorites.includes(category.id) && (
                      <Star className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>

            {conversionCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {category.icon}
                        {category.name} Converter
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(category.id)}
                        >
                          <Star 
                            className={`w-4 h-4 ${
                              favorites.includes(category.id) 
                                ? 'text-yellow-500 fill-yellow-500' 
                                : 'text-muted-foreground'
                            }`} 
                          />
                        </Button>
                      </CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search Units */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search units..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* From Unit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from-value">From</Label>
                        <Input
                          id="from-value"
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter value"
                          className="text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="from-unit">Unit</Label>
                        <Select 
                          value={fromUnit?.symbol} 
                          onValueChange={(value) => {
                            const unit = filteredUnits.find(u => u.symbol === value);
                            setFromUnit(unit || null);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredUnits.map((unit) => (
                              <SelectItem key={unit.symbol} value={unit.symbol}>
                                <div>
                                  <div className="font-medium">{unit.name} ({unit.symbol})</div>
                                  {unit.description && (
                                    <div className="text-xs text-muted-foreground">{unit.description}</div>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm" onClick={swapUnits}>
                        <ArrowRightLeft className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* To Unit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="to-value">To</Label>
                        <Input
                          id="to-value"
                          type="text"
                          value={result}
                          readOnly
                          className="bg-muted text-lg font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to-unit">Unit</Label>
                        <Select 
                          value={toUnit?.symbol} 
                          onValueChange={(value) => {
                            const unit = filteredUnits.find(u => u.symbol === value);
                            setToUnit(unit || null);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredUnits.map((unit) => (
                              <SelectItem key={unit.symbol} value={unit.symbol}>
                                <div>
                                  <div className="font-medium">{unit.name} ({unit.symbol})</div>
                                  {unit.description && (
                                    <div className="text-xs text-muted-foreground">{unit.description}</div>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Precision Control */}
                    <div className="space-y-2">
                      <Label htmlFor="precision">Decimal Places: {precision}</Label>
                      <div className="flex items-center gap-4">
                        <input
                          id="precision"
                          type="range"
                          min="0"
                          max="10"
                          value={precision}
                          onChange={(e) => setPrecision(parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <Badge variant="outline">{precision}</Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button onClick={handleConvert} className="flex-1">
                        <Calculator className="w-4 h-4 mr-2" />
                        Convert
                      </Button>
                      <Button variant="outline" onClick={handleCopy}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>

                    {/* Conversion Result Display */}
                    {result && fromUnit && toUnit && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">Result</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {inputValue} {fromUnit.symbol} = {result} {toUnit.symbol}
                        </div>
                        {fromUnit.description && toUnit.description && (
                          <div className="text-xs text-muted-foreground mt-2">
                            {fromUnit.description} → {toUnit.description}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quick Reference */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {category.units.slice(0, 8).map((unit) => (
                        <div key={unit.name} className="text-center p-2 border rounded hover:bg-muted/50 cursor-pointer"
                             onClick={() => {
                               if (!fromUnit) setFromUnit(unit);
                               else if (!toUnit) setToUnit(unit);
                               else setFromUnit(unit);
                             }}>
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Conversion History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-500" />
                  History
                </CardTitle>
                {history.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearHistory}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No conversions yet
                </p>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {history.map((entry) => (
                      <div key={entry.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="text-sm font-medium">
                          {entry.fromValue} {entry.fromUnit} = {entry.toValue} {entry.toUnit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.category} • {entry.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Unit Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-500" />
                Unit Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentCategory && (
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {currentCategory.units.map((unit) => (
                      <div key={unit.symbol} className="p-2 border rounded">
                        <div className="font-medium text-sm">{unit.name} ({unit.symbol})</div>
                        {unit.description && (
                          <div className="text-xs text-muted-foreground">{unit.description}</div>
                        )}
                        {unit.category !== 'temperature' && (
                          <div className="text-xs text-blue-600">
                            Multiplier: {unit.multiplier}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Favorites */}
          {favorites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {favorites.map((categoryId) => {
                    const category = conversionCategories.find(c => c.id === categoryId);
                    if (!category) return null;
                    return (
                      <Button
                        key={categoryId}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setActiveCategory(categoryId)}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
