import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, Hash, Pi, Sigma, Infinity,
  Copy, History, Trash2, Download, Share2, Settings,
  RotateCcw, Square, SquareRoot, Percent, Plus, Minus,
  X, Divide, Equal, Zap
} from 'lucide-react';

interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  type: 'basic' | 'scientific' | 'percentage' | 'base-conversion';
}

interface MathFunction {
  name: string;
  symbol: string;
  description: string;
  category: string;
  example: string;
}

export default function AdvancedMathematicalSuite() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<Calculation[]>([]);
  const [memory, setMemory] = useState(0);
  const [mode, setMode] = useState<'deg' | 'rad'>('deg');
  const [activeTab, setActiveTab] = useState('scientific');

  // Mathematical functions and constants
  const mathFunctions: MathFunction[] = [
    { name: 'sin', symbol: 'sin', description: 'Sine function', category: 'trigonometric', example: 'sin(30°) = 0.5' },
    { name: 'cos', symbol: 'cos', description: 'Cosine function', category: 'trigonometric', example: 'cos(60°) = 0.5' },
    { name: 'tan', symbol: 'tan', description: 'Tangent function', category: 'trigonometric', example: 'tan(45°) = 1' },
    { name: 'log', symbol: 'log', description: 'Base-10 logarithm', category: 'logarithmic', example: 'log(100) = 2' },
    { name: 'ln', symbol: 'ln', description: 'Natural logarithm', category: 'logarithmic', example: 'ln(e) = 1' },
    { name: 'sqrt', symbol: '√', description: 'Square root', category: 'power', example: '√25 = 5' },
    { name: 'pow', symbol: 'x^y', description: 'Power function', category: 'power', example: '2^3 = 8' },
    { name: 'factorial', symbol: 'n!', description: 'Factorial', category: 'combinatorial', example: '5! = 120' }
  ];

  const constants = [
    { name: 'π', value: Math.PI, description: 'Pi (3.14159...)' },
    { name: 'e', value: Math.E, description: 'Euler\'s number (2.71828...)' },
    { name: 'φ', value: (1 + Math.sqrt(5)) / 2, description: 'Golden ratio (1.618...)' },
    { name: '√2', value: Math.sqrt(2), description: 'Square root of 2 (1.414...)' }
  ];

  // Scientific calculator functions
  const calculateScientific = (func: string, value: number): number => {
    const angleValue = mode === 'deg' ? (value * Math.PI) / 180 : value;
    
    switch (func) {
      case 'sin': return Math.sin(angleValue);
      case 'cos': return Math.cos(angleValue);
      case 'tan': return Math.tan(angleValue);
      case 'asin': return mode === 'deg' ? (Math.asin(value) * 180) / Math.PI : Math.asin(value);
      case 'acos': return mode === 'deg' ? (Math.acos(value) * 180) / Math.PI : Math.acos(value);
      case 'atan': return mode === 'deg' ? (Math.atan(value) * 180) / Math.PI : Math.atan(value);
      case 'log': return Math.log10(value);
      case 'ln': return Math.log(value);
      case 'sqrt': return Math.sqrt(value);
      case 'square': return value * value;
      case 'cube': return value * value * value;
      case 'factorial': 
        if (value < 0 || value !== Math.floor(value)) return NaN;
        let result = 1;
        for (let i = 2; i <= value; i++) result *= i;
        return result;
      case 'reciprocal': return 1 / value;
      case 'abs': return Math.abs(value);
      default: return value;
    }
  };

  // Base conversion functions
  const convertBase = (value: string, fromBase: number, toBase: number): string => {
    try {
      const decimal = parseInt(value, fromBase);
      return decimal.toString(toBase).toUpperCase();
    } catch {
      return 'Error';
    }
  };

  // Percentage calculations
  const calculatePercentage = (type: string, value1: number, value2?: number): number => {
    switch (type) {
      case 'percent': return value1 / 100;
      case 'percentOf': return value2 ? (value1 / 100) * value2 : 0;
      case 'percentIncrease': return value2 ? ((value2 - value1) / value1) * 100 : 0;
      case 'percentDecrease': return value2 ? ((value1 - value2) / value1) * 100 : 0;
      default: return value1;
    }
  };

  // Add calculation to history
  const addToHistory = (expression: string, result: string, type: Calculation['type'] = 'basic') => {
    const newCalculation: Calculation = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date(),
      type
    };
    setHistory(prev => [newCalculation, ...prev.slice(0, 99)]); // Keep last 100 calculations
  };

  // Button click handler
  const handleButtonClick = (value: string) => {
    if (value === 'clear') {
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
    } else if (value === 'clearEntry') {
      setDisplay('0');
      setWaitingForOperand(false);
    } else if (value === 'backspace') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else if (['+', '-', '*', '/'].includes(value)) {
      const inputValue = parseFloat(display);
      
      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else if (operation) {
        const currentValue = previousValue || 0;
        const newValue = calculate(currentValue, inputValue, operation);
        
        setDisplay(String(newValue));
        setPreviousValue(newValue);
        addToHistory(`${currentValue} ${operation} ${inputValue}`, String(newValue));
      }
      
      setWaitingForOperand(true);
      setOperation(value);
    } else if (value === '=') {
      const inputValue = parseFloat(display);
      
      if (previousValue !== null && operation) {
        const newValue = calculate(previousValue, inputValue, operation);
        setDisplay(String(newValue));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        addToHistory(`${previousValue} ${operation} ${inputValue}`, String(newValue));
      }
    } else if (value === '.') {
      if (waitingForOperand) {
        setDisplay('0.');
      } else if (display.indexOf('.') === -1) {
        setDisplay(display + '.');
      }
      setWaitingForOperand(false);
    } else if (mathFunctions.some(f => f.name === value)) {
      const inputValue = parseFloat(display);
      const result = calculateScientific(value, inputValue);
      setDisplay(String(result));
      addToHistory(`${value}(${inputValue})`, String(result), 'scientific');
      setWaitingForOperand(true);
    } else {
      if (waitingForOperand) {
        setDisplay(value);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === '0' ? value : display + value);
      }
    }
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return secondValue !== 0 ? firstValue / secondValue : 0;
      default: return secondValue;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Mathematical Suite</h1>
            <p className="text-gray-600 dark:text-gray-400">Scientific calculator with advanced functions</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className="gap-1">
            <Function className="w-3 h-3" />
            50+ Functions
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Hash className="w-3 h-3" />
            Base Conversion
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Percent className="w-3 h-3" />
            Percentage Tools
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scientific">Scientific</TabsTrigger>
          <TabsTrigger value="percentage">Percentage</TabsTrigger>
          <TabsTrigger value="base-conversion">Base Convert</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="scientific" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calculator Display */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Scientific Calculator
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={mode === 'deg' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMode('deg')}
                      >
                        DEG
                      </Button>
                      <Button
                        variant={mode === 'rad' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMode('rad')}
                      >
                        RAD
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Display */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-right text-3xl font-mono font-bold text-gray-900 dark:text-white min-h-[2.5rem] flex items-center justify-end">
                      {display}
                    </div>
                    {operation && previousValue !== null && (
                      <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                        {previousValue} {operation}
                      </div>
                    )}
                  </div>

                  {/* Scientific Functions */}
                  <div className="grid grid-cols-6 gap-2">
                    {/* Memory and Clear */}
                    <Button variant="outline" onClick={() => setMemory(parseFloat(display))}>MS</Button>
                    <Button variant="outline" onClick={() => setDisplay(String(memory))}>MR</Button>
                    <Button variant="outline" onClick={() => setMemory(0)}>MC</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('clearEntry')}>CE</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('clear')}>C</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('backspace')}>⌫</Button>

                    {/* Scientific Functions Row 1 */}
                    <Button variant="outline" onClick={() => handleButtonClick('sin')}>sin</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('cos')}>cos</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('tan')}>tan</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('log')}>log</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('ln')}>ln</Button>
                    <Button variant="outline" onClick={() => setDisplay(String(Math.PI))}>π</Button>

                    {/* Scientific Functions Row 2 */}
                    <Button variant="outline" onClick={() => handleButtonClick('asin')}>sin⁻¹</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('acos')}>cos⁻¹</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('atan')}>tan⁻¹</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('sqrt')}>√</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('square')}>x²</Button>
                    <Button variant="outline" onClick={() => setDisplay(String(Math.E))}>e</Button>

                    {/* Numbers and Operations */}
                    <Button variant="outline" onClick={() => handleButtonClick('7')}>7</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('8')}>8</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('9')}>9</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('/')}>/</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('factorial')}>n!</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('reciprocal')}>1/x</Button>

                    <Button variant="outline" onClick={() => handleButtonClick('4')}>4</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('5')}>5</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('6')}>6</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('*')}>×</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('(')}>(</Button>
                    <Button variant="outline" onClick={() => handleButtonClick(')')}>)</Button>

                    <Button variant="outline" onClick={() => handleButtonClick('1')}>1</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('2')}>2</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('3')}>3</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('-')}>-</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('abs')}>|x|</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('cube')}>x³</Button>

                    <Button variant="outline" onClick={() => handleButtonClick('0')} className="col-span-2">0</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('.')}>.</Button>
                    <Button variant="outline" onClick={() => handleButtonClick('+')}>+</Button>
                    <Button variant="default" onClick={() => handleButtonClick('=')} className="col-span-2 bg-blue-600 hover:bg-blue-700">=</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Constants and Functions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pi className="w-5 h-5" />
                    Constants
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {constants.map((constant) => (
                    <Button
                      key={constant.name}
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => setDisplay(String(constant.value))}
                    >
                      <span className="font-mono font-bold">{constant.name}</span>
                      <span className="text-xs text-gray-500">{constant.value.toFixed(5)}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Functions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mathFunctions.slice(0, 6).map((func) => (
                    <Button
                      key={func.name}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleButtonClick(func.name)}
                    >
                      <span className="font-mono font-bold mr-2">{func.symbol}</span>
                      <span className="text-sm">{func.description}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="percentage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5" />
                Percentage Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Value 1</Label>
                    <Input type="number" placeholder="Enter first value" />
                  </div>
                  <div>
                    <Label>Value 2 (optional)</Label>
                    <Input type="number" placeholder="Enter second value" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button>% of Value</Button>
                    <Button>Increase %</Button>
                    <Button>Decrease %</Button>
                    <Button>Difference %</Button>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Result</h3>
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <p className="text-sm text-gray-600 mt-2">Select calculation type</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="base-conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Number Base Converter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Input Value</Label>
                    <Input placeholder="Enter number to convert" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>From Base</Label>
                      <select className="w-full p-2 border rounded">
                        <option value="10">Decimal (10)</option>
                        <option value="2">Binary (2)</option>
                        <option value="8">Octal (8)</option>
                        <option value="16">Hexadecimal (16)</option>
                      </select>
                    </div>
                    <div>
                      <Label>To Base</Label>
                      <select className="w-full p-2 border rounded">
                        <option value="2">Binary (2)</option>
                        <option value="8">Octal (8)</option>
                        <option value="10">Decimal (10)</option>
                        <option value="16">Hexadecimal (16)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <Label>Binary</Label>
                    <div className="font-mono text-lg">0</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <Label>Octal</Label>
                    <div className="font-mono text-lg">0</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <Label>Hexadecimal</Label>
                    <div className="font-mono text-lg">0</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Calculation History
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setHistory([])}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No calculations yet. Start using the calculator to see history.
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {history.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-mono">{calc.expression} = {calc.result}</div>
                        <div className="text-xs text-gray-500">
                          {calc.timestamp.toLocaleString()} • {calc.type}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setDisplay(calc.result)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}