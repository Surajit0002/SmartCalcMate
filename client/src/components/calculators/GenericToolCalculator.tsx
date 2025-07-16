import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Share2, Download, Upload, RefreshCw, Settings, Info, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Calculator } from '@/lib/calculatorData';

interface GenericToolCalculatorProps {
  tool: Calculator;
}

// Generic tool component that adapts based on tool category and type
export default function GenericToolCalculator({ tool }: GenericToolCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [results, setResults] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  // Initialize default values based on tool type
  useEffect(() => {
    const defaultInputs = getDefaultInputs(tool);
    setInputs(defaultInputs);
    if (shouldAutoCalculate(tool)) {
      calculateResults(defaultInputs);
    }
  }, [tool]);

  const getDefaultInputs = (tool: Calculator) => {
    const defaults: Record<string, any> = {};
    
    if (tool.category === 'unit-converters') {
      defaults.value = '1';
      defaults.fromUnit = getDefaultUnit(tool.id, 'from');
      defaults.toUnit = getDefaultUnit(tool.id, 'to');
    } else if (tool.category === 'text-converters') {
      defaults.inputText = getSampleText(tool.id);
    } else if (tool.category === 'currency-crypto') {
      defaults.amount = '100';
      defaults.fromCurrency = 'USD';
      defaults.toCurrency = 'EUR';
    } else if (tool.category === 'finance') {
      defaults.principal = '100000';
      defaults.rate = '8.5';
      defaults.tenure = '20';
    }
    
    return defaults;
  };

  const shouldAutoCalculate = (tool: Calculator) => {
    return ['unit-converters', 'currency-crypto', 'text-converters'].includes(tool.category);
  };

  const calculateResults = async (currentInputs: Record<string, any>) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Simulate processing time for different tool types
      const processingTime = getProcessingTime(tool);
      const steps = 20;
      
      for (let i = 0; i <= steps; i++) {
        setProgress((i / steps) * 100);
        await new Promise(resolve => setTimeout(resolve, processingTime / steps));
      }
      
      const calculatedResults = performCalculation(tool, currentInputs);
      setResults(calculatedResults);
      
      toast({
        title: 'Calculation completed',
        description: `${tool.name} results are ready`,
      });
    } catch (error) {
      toast({
        title: 'Calculation failed',
        description: 'Please check your inputs and try again',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const performCalculation = (tool: Calculator, inputs: Record<string, any>) => {
    // This would contain the actual calculation logic for each tool type
    const results: Record<string, any> = {};
    
    switch (tool.category) {
      case 'unit-converters':
        results.converted = convertUnit(tool.id, inputs.value, inputs.fromUnit, inputs.toUnit);
        results.formula = getConversionFormula(tool.id, inputs.fromUnit, inputs.toUnit);
        break;
        
      case 'text-converters':
        results.output = convertText(tool.id, inputs.inputText);
        results.stats = getTextStats(inputs.inputText, results.output);
        break;
        
      case 'currency-crypto':
        results.converted = convertCurrency(inputs.amount, inputs.fromCurrency, inputs.toCurrency);
        results.rate = getExchangeRate(inputs.fromCurrency, inputs.toCurrency);
        break;
        
      case 'finance':
        results = calculateFinance(tool.id, inputs);
        break;
        
      default:
        results.message = 'Calculation completed successfully';
    }
    
    return results;
  };

  const handleInputChange = (key: string, value: any) => {
    const newInputs = { ...inputs, [key]: value };
    setInputs(newInputs);
    
    if (shouldAutoCalculate(tool)) {
      calculateResults(newInputs);
    }
  };

  const handleCalculate = () => {
    calculateResults(inputs);
  };

  const handleCopy = () => {
    const resultText = Object.entries(results)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    
    navigator.clipboard.writeText(resultText);
    toast({
      title: 'Copied to clipboard',
      description: 'Results copied successfully',
    });
  };

  const handleShare = async () => {
    const shareText = `${tool.name} Results:\n${Object.entries(results)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')}`;
    
    if (navigator.share) {
      await navigator.share({ text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: 'Copied to clipboard',
        description: 'Share text copied to clipboard',
      });
    }
  };

  const renderInputFields = () => {
    switch (tool.category) {
      case 'unit-converters':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={inputs.value || ''}
                onChange={(e) => handleInputChange('value', e.target.value)}
                placeholder="Enter value to convert"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromUnit">From</Label>
                <Select value={inputs.fromUnit} onValueChange={(value) => handleInputChange('fromUnit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUnitsForTool(tool.id).map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="toUnit">To</Label>
                <Select value={inputs.toUnit} onValueChange={(value) => handleInputChange('toUnit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUnitsForTool(tool.id).map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 'text-converters':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="inputText">Input Text</Label>
              <Textarea
                id="inputText"
                value={inputs.inputText || ''}
                onChange={(e) => handleInputChange('inputText', e.target.value)}
                placeholder="Enter text to convert"
                rows={6}
              />
            </div>
            {tool.id === 'base64-encoder-decoder' && (
              <div>
                <Label htmlFor="operation">Operation</Label>
                <Select value={inputs.operation || 'encode'} onValueChange={(value) => handleInputChange('operation', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="encode">Encode</SelectItem>
                    <SelectItem value="decode">Decode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );
        
      case 'currency-crypto':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={inputs.amount || ''}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromCurrency">From</Label>
                <Select value={inputs.fromCurrency} onValueChange={(value) => handleInputChange('fromCurrency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getCurrencies().map(currency => (
                      <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="toCurrency">To</Label>
                <Select value={inputs.toCurrency} onValueChange={(value) => handleInputChange('toCurrency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getCurrencies().map(currency => (
                      <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              This tool interface is being developed. Check back soon!
            </p>
          </div>
        );
    }
  };

  const renderResults = () => {
    if (Object.keys(results).length === 0) return null;

    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(results).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{value}</span>
            </div>
          ))}
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleCopy} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {tool.name}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{tool.longDescription || tool.description}</p>
            </div>
            <div className="flex gap-2">
              {tool.isPro && (
                <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                  PRO
                </Badge>
              )}
              {tool.isNew && (
                <Badge variant="secondary" className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                  NEW
                </Badge>
              )}
              {tool.difficulty && (
                <Badge variant="outline">
                  {tool.difficulty}
                </Badge>
              )}
            </div>
          </div>
          
          {tool.features && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tool.features.slice(0, 4).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Input Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderInputFields()}
          
          {!shouldAutoCalculate(tool) && (
            <div className="pt-4">
              <Button 
                onClick={handleCalculate} 
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Calculate'
                )}
              </Button>
            </div>
          )}
          
          {isProcessing && (
            <div className="pt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                Processing... {Math.round(progress)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {renderResults()}
      
      {/* Tool Information */}
      {tool.estimatedTime && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
              <span className="font-medium">Estimated Time:</span> {tool.estimatedTime}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper functions (these would be expanded with actual logic)
function getDefaultUnit(toolId: string, direction: 'from' | 'to'): string {
  const defaults: Record<string, { from: string; to: string }> = {
    'length-converter': { from: 'meters', to: 'feet' },
    'weight-converter': { from: 'kilograms', to: 'pounds' },
    'temperature-converter': { from: 'celsius', to: 'fahrenheit' },
    'area-converter': { from: 'square meters', to: 'square feet' },
    'volume-converter': { from: 'liters', to: 'gallons' },
    'speed-converter': { from: 'km/h', to: 'mph' },
    'time-converter': { from: 'hours', to: 'minutes' },
    'data-size-converter': { from: 'GB', to: 'MB' },
    'power-converter': { from: 'watts', to: 'horsepower' },
    'pressure-converter': { from: 'psi', to: 'bar' },
  };
  
  return defaults[toolId]?.[direction] || 'unit';
}

function getUnitsForTool(toolId: string): string[] {
  const units: Record<string, string[]> = {
    'length-converter': ['millimeters', 'centimeters', 'meters', 'kilometers', 'inches', 'feet', 'yards', 'miles'],
    'weight-converter': ['grams', 'kilograms', 'ounces', 'pounds', 'tons'],
    'temperature-converter': ['celsius', 'fahrenheit', 'kelvin'],
    'area-converter': ['square meters', 'square feet', 'acres', 'hectares'],
    'volume-converter': ['liters', 'gallons', 'cubic meters', 'cubic feet'],
    'speed-converter': ['km/h', 'mph', 'm/s', 'knots'],
    'time-converter': ['seconds', 'minutes', 'hours', 'days', 'weeks'],
    'data-size-converter': ['bytes', 'KB', 'MB', 'GB', 'TB'],
    'power-converter': ['watts', 'kilowatts', 'horsepower'],
    'pressure-converter': ['psi', 'bar', 'atm', 'pa'],
  };
  
  return units[toolId] || ['unit1', 'unit2'];
}

function getSampleText(toolId: string): string {
  const samples: Record<string, string> = {
    'base64-encoder-decoder': 'Hello World!',
    'binary-text': 'Hello',
    'text-case-converter': 'hello world example',
    'text-reverser': 'Hello World',
    'qr-code-generator': 'https://example.com',
    'slug-generator': 'How to Create SEO Friendly URLs',
    'hash-generator': 'Text to hash',
    'uuid-generator': '',
    'regex-tester': 'Test string for regex',
    'html-markdown': '<h1>Hello World</h1>',
    'json-xml': '{"name": "John", "age": 30}',
    'sql-formatter': 'SELECT * FROM users WHERE id = 1',
    'rot13-cipher': 'Hello World',
    'unicode-ascii': 'Hello 世界',
  };
  
  return samples[toolId] || 'Enter your text here...';
}

function getCurrencies(): string[] {
  return ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];
}

function convertUnit(toolId: string, value: string, fromUnit: string, toUnit: string): string {
  // Simplified conversion logic - in real implementation, this would have proper conversion factors
  const numValue = parseFloat(value) || 0;
  return (numValue * 1.5).toFixed(2); // Mock conversion
}

function convertText(toolId: string, text: string): string {
  switch (toolId) {
    case 'text-case-converter':
      return text.toUpperCase();
    case 'text-reverser':
      return text.split('').reverse().join('');
    case 'base64-encoder-decoder':
      return btoa(text);
    case 'slug-generator':
      return text.toLowerCase().replace(/\s+/g, '-');
    default:
      return text;
  }
}

function getTextStats(input: string, output: string) {
  return {
    inputLength: input.length,
    outputLength: output.length,
    difference: Math.abs(output.length - input.length)
  };
}

function convertCurrency(amount: string, from: string, to: string): string {
  // Mock currency conversion
  const numAmount = parseFloat(amount) || 0;
  return (numAmount * 0.85).toFixed(2);
}

function getExchangeRate(from: string, to: string): string {
  return '0.85'; // Mock exchange rate
}

function calculateFinance(toolId: string, inputs: Record<string, any>) {
  // Mock financial calculations
  return {
    result: '5000',
    breakdown: 'Calculation details',
    total: '120000'
  };
}

function getProcessingTime(tool: Calculator): number {
  const times: Record<string, number> = {
    'text-converters': 500,
    'unit-converters': 300,
    'currency-crypto': 800,
    'file-converters': 2000,
    'ai-converters': 3000,
  };
  
  return times[tool.category] || 1000;
}

function getConversionFormula(toolId: string, fromUnit: string, toUnit: string): string {
  return `1 ${fromUnit} = 1.5 ${toUnit}`;
}