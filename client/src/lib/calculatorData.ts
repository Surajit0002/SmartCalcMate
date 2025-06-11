export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  calculators: Calculator[];
}

export const calculators: Calculator[] = [
  // Finance
  { id: 'emi', name: 'EMI Calculator', description: 'Calculate your loan EMI', category: 'finance', icon: 'fa-home', featured: true },
  { id: 'sip', name: 'SIP Calculator', description: 'Plan your systematic investment', category: 'finance', icon: 'fa-chart-line' },
  { id: 'compound-interest', name: 'Compound Interest', description: 'Calculate compound interest growth', category: 'finance', icon: 'fa-percentage' },
  
  // Health
  { id: 'bmi', name: 'BMI Calculator', description: 'Check your body mass index', category: 'health', icon: 'fa-weight', featured: true },
  { id: 'bmr', name: 'BMR Calculator', description: 'Calculate daily calorie needs', category: 'health', icon: 'fa-fire' },
  
  // Math
  { id: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical calculations', category: 'math', icon: 'fa-calculator' },
  { id: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily', category: 'math', icon: 'fa-percent', featured: true },
  
  // Daily
  { id: 'age', name: 'Age Calculator', description: 'Calculate your exact age', category: 'daily', icon: 'fa-birthday-cake' },
  { id: 'tip', name: 'Tip Calculator', description: 'Calculate tips and split bills', category: 'daily', icon: 'fa-receipt', featured: true },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between different units', category: 'daily', icon: 'fa-exchange-alt' },
];

export const categories: Category[] = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'EMI, SIP, Tax calculators',
    icon: 'fa-coins',
    color: 'green',
    calculators: calculators.filter(c => c.category === 'finance')
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'BMI, BMR, Calorie calculators',
    icon: 'fa-heartbeat',
    color: 'red',
    calculators: calculators.filter(c => c.category === 'health')
  },
  {
    id: 'math',
    name: 'Math & Education',
    description: 'Scientific, Percentage calculators',
    icon: 'fa-square-root-alt',
    color: 'blue',
    calculators: calculators.filter(c => c.category === 'math')
  },
  {
    id: 'daily',
    name: 'Daily Utilities',
    description: 'Age, Tip, Unit calculators',
    icon: 'fa-calendar-day',
    color: 'purple',
    calculators: calculators.filter(c => c.category === 'daily')
  }
];

export const featuredCalculators = calculators.filter(c => c.featured);

export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find(c => c.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}
