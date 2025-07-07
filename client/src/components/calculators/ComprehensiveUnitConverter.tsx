
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Ruler, Scale, Thermometer, Clock, Gauge, Expand, 
  Droplets, HardDrive, Zap, Activity, Copy, RotateCw,
  Star, TrendingUp, Calculator, Sparkles, Menu, X,
  ChevronDown, ChevronRight, History, Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

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
  gradient: string;
  units: Unit[];
}

const unitCategories: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: <Ruler className="w-4 h-4" />,
    color: 'blue',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
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
    icon: <Scale className="w-4 h-4" />,
    color: 'green',
    gradient: 'from-green-500 via-emerald-500 to-lime-500',
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
    icon: <Thermometer className="w-4 h-4" />,
    color: 'red',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
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
    icon: <Clock className="w-4 h-4" />,
    color: 'purple',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
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
    icon: <Gauge className="w-4 h-4" />,
    color: 'orange',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
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
    icon: <Expand className="w-4 h-4" />,
    color: 'teal',
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
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
    icon: <Droplets className="w-4 h-4" />,
    color: 'cyan',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
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
    icon: <HardDrive className="w-4 h-4" />,
    color: 'indigo',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
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
    icon: <Zap className="w-4 h-4" />,
    color: 'yellow',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
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
    icon: <Activity className="w-4 h-4" />,
    color: 'pink',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
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
  const [isConverting, setIsConverting] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const isMobile = useIsMobile();
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

    if (category.id === 'temperature') {
      return convertTemperature(value, fromUnitData, toUnitData);
    }

    const baseValue = value * fromUnitData.factor;
    return baseValue / toUnitData.factor;
  };

  const convertTemperature = (value: number, fromUnit: Unit, toUnit: Unit) => {
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

    setIsConverting(true);
    setTimeout(() => {
      const convertedValue = convertUnits(numValue, fromUnit, toUnit, currentCategory);
      const formattedResult = formatNumber(convertedValue);
      setResult(formattedResult);
      setIsConverting(false);

      const historyItem = {
        id: Date.now(),
        category: currentCategory.name,
        from: `${numValue} ${fromUnit}`,
        to: `${formattedResult} ${toUnit}`,
        timestamp: new Date().toLocaleTimeString()
      };
      setConversionHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    }, 300);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6 py-6 sm:py-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Comprehensive Unit Converter
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Convert between <span className="font-semibold text-blue-600">120+ units</span> across 
            <span className="font-semibold text-purple-600"> 10 categories</span> with precision and style
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Instant Conversion</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>High Precision</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Beautiful UI</span>
            </div>
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6 sm:space-y-8">
          
          {/* Mobile Category Selector */}
          {isMobile && (
            <div className="sm:hidden">
              <Button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                variant="outline" 
                className="w-full h-12 flex items-center justify-between bg-white/80 backdrop-blur-sm border-2"
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-lg bg-gradient-to-br ${currentCategory?.gradient}`}>
                    {currentCategory?.icon}
                  </div>
                  <span className="font-medium">{currentCategory?.name}</span>
                </div>
                {showMobileMenu ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
              
              {showMobileMenu && (
                <Card className="mt-2 border-2 shadow-lg">
                  <CardContent className="p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {unitCategories.map(category => (
                        <Button
                          key={category.id}
                          variant={activeCategory === category.id ? "default" : "ghost"}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setShowMobileMenu(false);
                          }}
                          className="h-12 flex items-center gap-2 justify-start"
                        >
                          <div className={`p-1 rounded-lg bg-gradient-to-br ${category.gradient}`}>
                            {category.icon}
                          </div>
                          <span className="text-xs font-medium">{category.name}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Desktop Category Tabs */}
          <div className="hidden sm:flex justify-center">
            <ScrollArea className="w-full max-w-6xl">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border shadow-lg p-1">
                {unitCategories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id} 
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50 data-[state=active]:shadow-md transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
                  >
                    <div className={`p-1 rounded-lg bg-gradient-to-br ${category.gradient}`}>
                      {category.icon}
                    </div>
                    <span className="hidden md:inline font-medium">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
          </div>

          {unitCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Main Converter */}
                <div className="xl:col-span-2">
                  <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardHeader className={`bg-gradient-to-r ${category.gradient} text-white rounded-t-lg`}>
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl">
                        <div className="p-1 sm:p-2 bg-white/20 rounded-lg">
                          {category.icon}
                        </div>
                        <span className="truncate">{category.name} Converter</span>
                      </CardTitle>
                      <CardDescription className="text-white/90 text-sm sm:text-base md:text-lg">
                        Convert between {category.units.length} different {category.name.toLowerCase()} units
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                      
                      {/* From Unit */}
                      <div className="space-y-3">
                        <Label className="text-base sm:text-lg font-semibold">From</Label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Input
                            type="number"
                            placeholder="Enter value"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 text-base sm:text-lg h-12 sm:h-14 border-2 focus:border-blue-500 transition-colors"
                          />
                          <Select value={fromUnit} onValueChange={setFromUnit}>
                            <SelectTrigger className="w-full sm:w-48 h-12 sm:h-14 border-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {category.units.map(unit => (
                                <SelectItem key={unit.symbol} value={unit.symbol}>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{unit.name}</span>
                                    <span className="text-muted-foreground">({unit.symbol})</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Swap Button */}
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          onClick={swapUnits}
                          className="h-12 w-12 rounded-full border-2 hover:scale-110 transition-transform shadow-lg"
                        >
                          <RotateCw className={`w-5 h-5 ${isConverting ? 'animate-spin' : ''}`} />
                        </Button>
                      </div>

                      {/* To Unit */}
                      <div className="space-y-3">
                        <Label className="text-base sm:text-lg font-semibold">To</Label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <Input
                              type="text"
                              value={result}
                              readOnly
                              className="flex-1 font-mono text-base sm:text-lg h-12 sm:h-14 border-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600"
                              placeholder="Result will appear here"
                            />
                            {isConverting && (
                              <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center rounded-md">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                              </div>
                            )}
                          </div>
                          <Select value={toUnit} onValueChange={setToUnit}>
                            <SelectTrigger className="w-full sm:w-48 h-12 sm:h-14 border-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {category.units.map(unit => (
                                <SelectItem key={unit.symbol} value={unit.symbol}>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{unit.name}</span>
                                    <span className="text-muted-foreground">({unit.symbol})</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {result && (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            onClick={copyResult} 
                            className={`flex-1 h-12 bg-gradient-to-r ${category.gradient} hover:shadow-lg transition-all duration-200 text-base sm:text-lg font-semibold`}
                          >
                            <Copy className="w-5 h-5 mr-2" />
                            Copy Result
                          </Button>
                          {isMobile && (
                            <Button 
                              onClick={() => setShowHistory(!showHistory)}
                              variant="outline"
                              className="h-12 px-4"
                            >
                              <History className="w-5 h-5" />
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Quick Values */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-muted-foreground">Quick Values</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['1', '10', '100', '1000'].map(val => (
                            <Button
                              key={val}
                              variant="outline"
                              size="sm"
                              onClick={() => setInputValue(val)}
                              className="h-10 hover:scale-105 transition-transform"
                            >
                              {val}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar - Hidden on mobile by default */}
                <div className={`space-y-6 ${isMobile && !showHistory ? 'hidden' : ''}`}>
                  {/* Conversion History */}
                  <Card className="shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <History className="w-5 h-5" />
                        Recent Conversions
                      </CardTitle>
                      {isMobile && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowHistory(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      {conversionHistory.length === 0 ? (
                        <div className="text-center py-8">
                          <History className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-muted-foreground text-sm">
                            No conversions yet
                          </p>
                        </div>
                      ) : (
                        <ScrollArea className="h-64 sm:h-80">
                          <div className="space-y-3">
                            {conversionHistory.map(item => (
                              <div key={item.id} className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border hover:shadow-md transition-shadow">
                                <div className="font-medium text-sm break-all">{item.from} → {item.to}</div>
                                <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                                  <span>{item.timestamp}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>

                  {/* Popular Conversions */}
                  <Card className="shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="w-5 h-5" />
                        Popular {category.name} Conversions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getPopularConversions(category.id).map((conv, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-left hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all h-auto py-2"
                            onClick={() => {
                              setFromUnit(conv.from);
                              setToUnit(conv.to);
                              setInputValue('1');
                            }}
                          >
                            <Star className="w-3 h-3 mr-2 text-yellow-500 flex-shrink-0" />
                            <span className="text-sm">{conv.name}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category Stats */}
                  <Card className="shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Info className="w-5 h-5" />
                        Category Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Units</span>
                          <Badge className={`bg-gradient-to-r ${category.gradient} text-white`}>
                            {category.units.length}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Most Common</span>
                          <Badge variant="outline">
                            {category.units[0]?.symbol}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Category</span>
                          <Badge variant="secondary">
                            {category.name}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
            <div className="text-2xl sm:text-3xl font-bold">{unitCategories.reduce((acc, cat) => acc + cat.units.length, 0)}+</div>
            <div className="text-blue-100 text-sm sm:text-base">Total Units</div>
          </Card>
          <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-xl">
            <div className="text-2xl sm:text-3xl font-bold">{unitCategories.length}</div>
            <div className="text-green-100 text-sm sm:text-base">Categories</div>
          </Card>
          <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-xl">
            <div className="text-2xl sm:text-3xl font-bold">∞</div>
            <div className="text-purple-100 text-sm sm:text-base">Precision</div>
          </Card>
        </div>
      </div>
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
