export interface Translation {
  common: {
    calculate: string;
    clear: string;
    result: string;
    loading: string;
    error: string;
    copy: string;
    copied: string;
    share: string;
    save: string;
    delete: string;
    edit: string;
    cancel: string;
    confirm: string;
    close: string;
    settings: string;
    language: string;
    currency: string;
    theme: string;
    darkMode: string;
    lightMode: string;
  };
  navigation: {
    home: string;
    calculators: string;
    categories: string;
    favorites: string;
    history: string;
    about: string;
  };
  categories: {
    financial: string;
    health: string;
    mathematical: string;
    utility: string;
    conversion: string;
    scientific: string;
  };
  calculators: {
    emi: string;
    sip: string;
    compoundInterest: string;
    mortgage: string;
    investment: string;
    loanComparison: string;
    bmi: string;
    bmr: string;
    age: string;
    scientific: string;
    percentage: string;
    tipCalculator: string;
    unitConverter: string;
    currencyConverter: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

const translations: Record<string, Translation> = {
  en: {
    common: {
      calculate: "Calculate",
      clear: "Clear",
      result: "Result",
      loading: "Loading...",
      error: "Error",
      copy: "Copy",
      copied: "Copied!",
      share: "Share",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      cancel: "Cancel",
      confirm: "Confirm",
      close: "Close",
      settings: "Settings",
      language: "Language",
      currency: "Currency",
      theme: "Theme",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
    },
    navigation: {
      home: "Home",
      calculators: "Calculators",
      categories: "Categories",
      favorites: "Favorites",
      history: "History",
      about: "About",
    },
    categories: {
      financial: "Financial",
      health: "Health",
      mathematical: "Mathematical",
      utility: "Utility",
      conversion: "Conversion",
      scientific: "Scientific",
    },
    calculators: {
      emi: "EMI Calculator",
      sip: "SIP Calculator",
      compoundInterest: "Compound Interest",
      mortgage: "Mortgage Calculator",
      investment: "Investment Calculator",
      loanComparison: "Loan Comparison",
      bmi: "BMI Calculator",
      bmr: "BMR Calculator",
      age: "Age Calculator",
      scientific: "Scientific Calculator",
      percentage: "Percentage Calculator",
      tipCalculator: "Tip Calculator",
      unitConverter: "Unit Converter",
      currencyConverter: "Currency Converter",
    },
    meta: {
      title: "CalcMate - All-in-One Calculator Hub",
      description: "Comprehensive calculator suite with 15+ specialized tools for finance, health, math, and daily utilities. Fast, accurate, and mobile-friendly.",
      keywords: "calculator, EMI, SIP, BMI, scientific calculator, currency converter, financial calculator",
    },
  },
  es: {
    common: {
      calculate: "Calcular",
      clear: "Limpiar",
      result: "Resultado",
      loading: "Cargando...",
      error: "Error",
      copy: "Copiar",
      copied: "¡Copiado!",
      share: "Compartir",
      save: "Guardar",
      delete: "Eliminar",
      edit: "Editar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      close: "Cerrar",
      settings: "Configuración",
      language: "Idioma",
      currency: "Moneda",
      theme: "Tema",
      darkMode: "Modo Oscuro",
      lightMode: "Modo Claro",
    },
    navigation: {
      home: "Inicio",
      calculators: "Calculadoras",
      categories: "Categorías",
      favorites: "Favoritos",
      history: "Historial",
      about: "Acerca de",
    },
    categories: {
      financial: "Financiero",
      health: "Salud",
      mathematical: "Matemático",
      utility: "Utilidad",
      conversion: "Conversión",
      scientific: "Científico",
    },
    calculators: {
      emi: "Calculadora EMI",
      sip: "Calculadora SIP",
      compoundInterest: "Interés Compuesto",
      mortgage: "Calculadora Hipoteca",
      investment: "Calculadora Inversión",
      loanComparison: "Comparación Préstamos",
      bmi: "Calculadora IMC",
      bmr: "Calculadora TMB",
      age: "Calculadora Edad",
      scientific: "Calculadora Científica",
      percentage: "Calculadora Porcentaje",
      tipCalculator: "Calculadora Propina",
      unitConverter: "Conversor Unidades",
      currencyConverter: "Conversor Moneda",
    },
    meta: {
      title: "CalcMate - Centro de Calculadoras Todo-en-Uno",
      description: "Suite completa de calculadoras con más de 15 herramientas especializadas para finanzas, salud, matemáticas y utilidades diarias.",
      keywords: "calculadora, EMI, SIP, IMC, calculadora científica, conversor moneda, calculadora financiera",
    },
  },
  fr: {
    common: {
      calculate: "Calculer",
      clear: "Effacer",
      result: "Résultat",
      loading: "Chargement...",
      error: "Erreur",
      copy: "Copier",
      copied: "Copié!",
      share: "Partager",
      save: "Sauvegarder",
      delete: "Supprimer",
      edit: "Modifier",
      cancel: "Annuler",
      confirm: "Confirmer",
      close: "Fermer",
      settings: "Paramètres",
      language: "Langue",
      currency: "Devise",
      theme: "Thème",
      darkMode: "Mode Sombre",
      lightMode: "Mode Clair",
    },
    navigation: {
      home: "Accueil",
      calculators: "Calculatrices",
      categories: "Catégories",
      favorites: "Favoris",
      history: "Historique",
      about: "À propos",
    },
    categories: {
      financial: "Financier",
      health: "Santé",
      mathematical: "Mathématique",
      utility: "Utilitaire",
      conversion: "Conversion",
      scientific: "Scientifique",
    },
    calculators: {
      emi: "Calculatrice EMI",
      sip: "Calculatrice SIP",
      compoundInterest: "Intérêt Composé",
      mortgage: "Calculatrice Hypothèque",
      investment: "Calculatrice Investissement",
      loanComparison: "Comparaison Prêts",
      bmi: "Calculatrice IMC",
      bmr: "Calculatrice MB",
      age: "Calculatrice Âge",
      scientific: "Calculatrice Scientifique",
      percentage: "Calculatrice Pourcentage",
      tipCalculator: "Calculatrice Pourboire",
      unitConverter: "Convertisseur Unités",
      currencyConverter: "Convertisseur Devise",
    },
    meta: {
      title: "CalcMate - Hub de Calculatrices Tout-en-Un",
      description: "Suite complète de calculatrices avec plus de 15 outils spécialisés pour les finances, la santé, les mathématiques et les utilitaires quotidiens.",
      keywords: "calculatrice, EMI, SIP, IMC, calculatrice scientifique, convertisseur devise, calculatrice financière",
    },
  },
  zh: {
    common: {
      calculate: "计算",
      clear: "清除",
      result: "结果",
      loading: "加载中...",
      error: "错误",
      copy: "复制",
      copied: "已复制！",
      share: "分享",
      save: "保存",
      delete: "删除",
      edit: "编辑",
      cancel: "取消",
      confirm: "确认",
      close: "关闭",
      settings: "设置",
      language: "语言",
      currency: "货币",
      theme: "主题",
      darkMode: "深色模式",
      lightMode: "浅色模式",
    },
    navigation: {
      home: "首页",
      calculators: "计算器",
      categories: "分类",
      favorites: "收藏",
      history: "历史",
      about: "关于",
    },
    categories: {
      financial: "金融",
      health: "健康",
      mathematical: "数学",
      utility: "实用工具",
      conversion: "转换",
      scientific: "科学",
    },
    calculators: {
      emi: "EMI计算器",
      sip: "SIP计算器",
      compoundInterest: "复利计算",
      mortgage: "抵押贷款计算器",
      investment: "投资计算器",
      loanComparison: "贷款比较",
      bmi: "BMI计算器",
      bmr: "BMR计算器",
      age: "年龄计算器",
      scientific: "科学计算器",
      percentage: "百分比计算器",
      tipCalculator: "小费计算器",
      unitConverter: "单位转换器",
      currencyConverter: "货币转换器",
    },
    meta: {
      title: "CalcMate - 一体化计算器中心",
      description: "综合计算器套件，拥有15+专业工具，涵盖金融、健康、数学和日常实用功能。",
      keywords: "计算器, EMI, SIP, BMI, 科学计算器, 货币转换器, 金融计算器",
    },
  },
};

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export const supportedCurrencies = [
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

export const getTranslation = (language: string): Translation => {
  return translations[language] || translations.en;
};

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = supportedCurrencies.find(c => c.code === currencyCode);
  if (!currency) return amount.toString();

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const currency = supportedCurrencies.find(c => c.code === currencyCode);
  return currency?.symbol || currencyCode;
};