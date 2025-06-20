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
  t: any;
}

const translations = {
  en: {
    settings: 'Settings',
    language: 'Language',
    currency: 'Currency',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    navigation: {
      home: 'Home',
      categories: 'Categories',
      favorites: 'Favorites',
      history: 'History'
    },
    meta: {
      title: 'CalcMate Pro Calculator Hub',
      description: 'Professional calculator hub with 15+ specialized calculators for finance, health, math, and daily utilities',
      keywords: 'calculator, financial calculator, scientific calculator, math tools'
    }
  },
  es: {
    settings: 'Configuración',
    language: 'Idioma',
    currency: 'Moneda',
    theme: 'Tema',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    navigation: {
      home: 'Inicio',
      categories: 'Categorías',
      favorites: 'Favoritos',
      history: 'Historial'
    },
    meta: {
      title: 'CalcMate Pro Hub de Calculadoras',
      description: 'Hub profesional de calculadoras con más de 15 calculadoras especializadas para finanzas, salud, matemáticas y utilidades diarias',
      keywords: 'calculadora, calculadora financiera, calculadora científica, herramientas matemáticas'
    }
  },
  fr: {
    settings: 'Paramètres',
    language: 'Langue',
    currency: 'Devise',
    theme: 'Thème',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
    navigation: {
      home: 'Accueil',
      categories: 'Catégories',
      favorites: 'Favoris',
      history: 'Historique'
    },
    meta: {
      title: 'CalcMate Pro Hub de Calculatrices',
      description: 'Hub professionnel de calculatrices avec plus de 15 calculatrices spécialisées pour la finance, la santé, les mathématiques et les utilitaires quotidiens',
      keywords: 'calculatrice, calculatrice financière, calculatrice scientifique, outils mathématiques'
    }
  },
  zh: {
    settings: '设置',
    language: '语言',
    currency: '货币',
    theme: '主题',
    darkMode: '暗色模式',
    lightMode: '亮色模式',
    navigation: {
      home: '首页',
      categories: '分类',
      favorites: '收藏',
      history: '历史'
    },
    meta: {
      title: 'CalcMate Pro 计算器中心',
      description: '专业计算器中心，提供15+个专业计算器，涵盖金融、健康、数学和日常工具',
      keywords: '计算器, 金融计算器, 科学计算器, 数学工具'
    }
  }
};

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  currency: 'USD',
  setCurrency: () => {},
  formatCurrency: (amount: number) => `$${amount.toLocaleString()}`,
  getCurrencySymbol: () => '$',
  supportedLanguages,
  supportedCurrencies,
  t: translations.en,
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

  const getTranslation = () => {
    return translations[language as keyof typeof translations] || translations.en;
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
      t: getTranslation(),
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  return {
    ...context,
    t: context.t || translations.en
  };
}