import React, { createContext, useContext, useState } from 'react';

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const supportedCurrencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
];

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  formatCurrency: (amount: number) => string;
  getCurrencySymbol: () => string;
  supportedLanguages: typeof supportedLanguages;
  supportedCurrencies: typeof supportedCurrencies;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  currency: 'USD',
  setCurrency: () => {},
  formatCurrency: (amount: number) => `$${amount.toLocaleString()}`,
  getCurrencySymbol: () => '$',
  supportedLanguages,
  supportedCurrencies,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');
  const [currency, setCurrencyState] = useState('USD');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
  };

  const formatCurrency = (amount: number): string => {
    const currencyInfo = supportedCurrencies.find(c => c.code === currency);
    if (!currencyInfo) return amount.toString();

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getCurrencySymbol = (): string => {
    const currencyInfo = supportedCurrencies.find(c => c.code === currency);
    return currencyInfo?.symbol || currency;
  };

  return (
    <I18nContext.Provider value={{
      language,
      setLanguage,
      currency,
      setCurrency,
      formatCurrency,
      getCurrencySymbol,
      supportedLanguages,
      supportedCurrencies,
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}