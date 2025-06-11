
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, TrendingUp, Globe, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
];

// Mock exchange rates (in a real app, these would come from an API)
const mockRates = {
  USD: { EUR: 0.85, GBP: 0.75, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, KRW: 1180 },
  EUR: { USD: 1.18, GBP: 0.88, JPY: 129, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.59, INR: 87.7, KRW: 1391 },
  GBP: { USD: 1.33, EUR: 1.14, JPY: 147, CAD: 1.67, AUD: 1.81, CHF: 1.23, CNY: 8.62, INR: 99.4, KRW: 1577 },
  INR: { USD: 0.0134, EUR: 0.0114, GBP: 0.0101, JPY: 1.48, CAD: 0.0168, AUD: 0.0181, CHF: 0.0123, CNY: 0.0866, KRW: 15.8 },
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const calculateConversion = () => {
    const inputAmount = parseFloat(amount) || 0;
    
    if (fromCurrency === toCurrency) {
      setConvertedAmount(inputAmount);
      setExchangeRate(1);
      return;
    }

    // Get exchange rate from mock data
    const rate = mockRates[fromCurrency as keyof typeof mockRates]?.[toCurrency as keyof typeof mockRates.USD] || 1;
    setExchangeRate(rate);
    setConvertedAmount(inputAmount * rate);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const refreshRates = () => {
    setLastUpdated(new Date());
    // Add small random variation to simulate rate changes
    const variation = 0.95 + Math.random() * 0.1;
    setConvertedAmount(convertedAmount * variation);
    toast({
      title: "Rates Updated",
      description: "Exchange rates have been refreshed",
    });
  };

  const getPopularPairs = () => [
    { from: 'USD', to: 'EUR' },
    { from: 'USD', to: 'GBP' },
    { from: 'USD', to: 'JPY' },
    { from: 'EUR', to: 'GBP' },
    { from: 'USD', to: 'INR' },
    { from: 'GBP', to: 'INR' },
  ];

  const setQuickPair = (from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  const fromCurrencyInfo = currencies.find(c => c.code === fromCurrency);
  const toCurrencyInfo = currencies.find(c => c.code === toCurrency);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
              <Globe className="w-5 h-5" />
              Currency Converter
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <Button variant="ghost" size="sm" onClick={refreshRates}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                  placeholder="Enter amount"
                />
              </div>

              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                          <span className="text-sm text-gray-500">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <div className="flex gap-2">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                            <span className="text-sm text-gray-500">- {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={swapCurrencies}>
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {fromCurrencyInfo?.flag} {parseFloat(amount).toLocaleString()} {fromCurrency} =
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {toCurrencyInfo?.flag} {convertedAmount.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })} {toCurrency}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Popular Currency Pairs</Label>
              <div className="flex flex-wrap gap-2">
                {getPopularPairs().map((pair, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickPair(pair.from, pair.to)}
                    className="text-xs"
                  >
                    {pair.from}/{pair.to}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
              <TrendingUp className="w-5 h-5" />
              Rate Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Mid-Market Rate</div>
                <div className="text-lg font-bold">{exchangeRate.toFixed(6)}</div>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Inverse Rate</div>
                <div className="text-lg font-bold">{(1/exchangeRate).toFixed(6)}</div>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Daily Change</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">+0.15%</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ↑ 0.0012
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Quick Amounts</Label>
              <div className="grid grid-cols-2 gap-2">
                {['1', '10', '100', '1000'].map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount)}
                    className="text-xs"
                  >
                    {quickAmount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>• Rates are indicative and may vary</p>
                <p>• Updated every few minutes</p>
                <p>• No fees included in calculation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exchange Rate History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Rate history chart would be displayed here</p>
            <p className="text-sm">Connect to a real exchange rate API for live data</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
