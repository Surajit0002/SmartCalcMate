import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Bookmark,
  Share2,
  RefreshCw,
  DollarSign,
  BarChart3,
  History,
  Zap
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
  change24h: number;
  trend: 'up' | 'down' | 'stable';
}

interface HistoricalData {
  date: string;
  rate: number;
}

export default function EnhancedCurrencyConverter() {
  const { supportedCurrencies, formatCurrency } = useI18n();
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['USD-EUR', 'GBP-USD', 'USD-JPY']);
  const [conversionHistory, setConversionHistory] = useState<any[]>([]);

  // Mock exchange rates - in production, replace with real API
  const mockExchangeRates: Record<string, Record<string, ExchangeRate>> = {
    USD: {
      EUR: { from: 'USD', to: 'EUR', rate: 0.85, lastUpdated: '2024-01-01T12:00:00Z', change24h: -0.5, trend: 'down' },
      GBP: { from: 'USD', to: 'GBP', rate: 0.73, lastUpdated: '2024-01-01T12:00:00Z', change24h: 0.2, trend: 'up' },
      JPY: { from: 'USD', to: 'JPY', rate: 110.25, lastUpdated: '2024-01-01T12:00:00Z', change24h: 1.2, trend: 'up' },
      CAD: { from: 'USD', to: 'CAD', rate: 1.35, lastUpdated: '2024-01-01T12:00:00Z', change24h: -0.1, trend: 'stable' },
      AUD: { from: 'USD', to: 'AUD', rate: 1.52, lastUpdated: '2024-01-01T12:00:00Z', change24h: 0.8, trend: 'up' },
      CHF: { from: 'USD', to: 'CHF', rate: 0.92, lastUpdated: '2024-01-01T12:00:00Z', change24h: -0.3, trend: 'down' },
      CNY: { from: 'USD', to: 'CNY', rate: 7.23, lastUpdated: '2024-01-01T12:00:00Z', change24h: 0.1, trend: 'up' },
      INR: { from: 'USD', to: 'INR', rate: 83.15, lastUpdated: '2024-01-01T12:00:00Z', change24h: 0.5, trend: 'up' },
      BRL: { from: 'USD', to: 'BRL', rate: 5.25, lastUpdated: '2024-01-01T12:00:00Z', change24h: -0.7, trend: 'down' },
    }
  };

  const generateHistoricalData = (rate: number): HistoricalData[] => {
    const data = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const variance = (Math.random() - 0.5) * 0.1;
      data.push({
        date: date.toISOString().split('T')[0],
        rate: rate * (1 + variance)
      });
    }
    return data;
  };

  useEffect(() => {
    if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const rate = mockExchangeRates[fromCurrency]?.[toCurrency];
        if (rate) {
          setExchangeRate(rate);
          setHistoricalData(generateHistoricalData(rate.rate));
          if (amount) {
            setConvertedAmount(parseFloat(amount) * rate.rate);
          }
        }
        setLoading(false);
      }, 500);
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate && amount) {
      const converted = parseFloat(amount) * exchangeRate.rate;
      setConvertedAmount(converted);
    }
  }, [amount, exchangeRate]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    if (exchangeRate && amount) {
      const conversion = {
        id: Date.now().toString(),
        amount: parseFloat(amount),
        from: fromCurrency,
        to: toCurrency,
        rate: exchangeRate.rate,
        result: convertedAmount,
        timestamp: new Date().toISOString()
      };
      setConversionHistory(prev => [conversion, ...prev.slice(0, 9)]);
    }
  };

  const addToFavorites = () => {
    const pair = `${fromCurrency}-${toCurrency}`;
    if (!favorites.includes(pair)) {
      setFavorites(prev => [...prev, pair]);
    }
  };

  const chartData = {
    labels: historicalData.map(d => d.date),
    datasets: [
      {
        label: `${fromCurrency}/${toCurrency}`,
        data: historicalData.map(d => d.rate),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '30-Day Exchange Rate History'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-modern">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                Advanced Currency Converter
              </CardTitle>
              <CardDescription>
                Real-time exchange rates with historical data and analytics
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={addToFavorites}>
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="converter" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="converter">Converter</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="converter" className="space-y-6">
              {/* Main Converter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="text-lg"
                  />
                  
                  <Label htmlFor="from-currency">From Currency</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedCurrencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{currency.flag}</span>
                            <span>{currency.code} - {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Result</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSwapCurrencies}
                      className="rounded-full"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-6 w-6 animate-spin" />
                        Loading...
                      </div>
                    ) : convertedAmount !== null ? (
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: toCurrency,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4
                      }).format(convertedAmount)
                    ) : (
                      '---'
                    )}
                  </div>
                  
                  <Label htmlFor="to-currency">To Currency</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedCurrencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{currency.flag}</span>
                            <span>{currency.code} - {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exchange Rate Info */}
              {exchangeRate && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Exchange Rate</div>
                        <div className="text-2xl font-bold">
                          1 {fromCurrency} = {exchangeRate.rate.toFixed(4)} {toCurrency}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">24h Change</div>
                        <div className={`text-lg font-semibold flex items-center justify-center gap-1 ${
                          exchangeRate.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {exchangeRate.change24h >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(exchangeRate.change24h)}%
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                        <div className="text-sm flex items-center justify-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(exchangeRate.lastUpdated).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button onClick={handleConvert} className="w-full" size="lg">
                <Zap className="mr-2 h-5 w-5" />
                Convert Currency
              </Button>

              {/* Quick Favorites */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Quick Access</Label>
                <div className="flex flex-wrap gap-2">
                  {favorites.map((pair) => {
                    const [from, to] = pair.split('-');
                    return (
                      <Badge
                        key={pair}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => {
                          setFromCurrency(from);
                          setToCurrency(to);
                        }}
                      >
                        {from}/{to}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="charts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Exchange Rate Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {historicalData.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Select currencies to view historical data
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Conversion History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {conversionHistory.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No conversions yet. Start converting to see your history.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {conversionHistory.map((conversion) => (
                        <div key={conversion.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">
                              {conversion.amount.toLocaleString()} {conversion.from} → {conversion.result?.toFixed(2)} {conversion.to}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Rate: {conversion.rate.toFixed(4)} • {new Date(conversion.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Repeat
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}