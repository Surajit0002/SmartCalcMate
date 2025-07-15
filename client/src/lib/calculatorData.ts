import React from 'react';
import { 
  Search, Grid3X3, List, ArrowRight, Star, TrendingUp, Crown,
  Calculator, Clock, Users, Target, Flame, Sparkles, Timer,
  Filter, SortAsc, BarChart3, Eye, Award, Zap, Shield,
  CheckCircle2, Lightbulb, Workflow, MapPin, Compass, Radar,
  Crosshair, Fingerprint, RefreshCw, Shuffle, ListFilter,
  Heart, Code, Globe, Settings, FileText, Video, Brain,
  Download, Image, Music, Share2
} from 'lucide-react';

export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  featured?: boolean;
  function?: string;
  isNew?: boolean;
  isPro?: boolean;
  isPopular?: boolean;
  difficulty?: 'easy' | 'medium' | 'advanced';
  usageCount?: number;
  rating?: number;
  tags?: string[];
  longDescription?: string;
  features?: string[];
  inputTypes?: string[];
  outputTypes?: string[];
  estimatedTime?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  calculators: Calculator[];
  isPopular?: boolean;
  totalTools?: number;
  trending?: boolean;
  iconComponent?: React.ReactNode;
}

const iconMap = {
  'fa-chart-line': BarChart3,
  'fa-heartbeat': Heart,
  'fa-square-root-alt': Calculator,
  'fa-calendar-day': Clock,
  'fa-exchange-alt': RefreshCw,
  'fa-file-alt': FileText,
  'fa-video': Video,
  'fa-bitcoin': Target,
  'fa-code': Code,
  'fa-robot': Brain,
  'fa-language': Globe,
  'fa-tools': Settings,
  'fa-piggy-bank': Target,
  'fa-percentage': Target,
  'fa-home': Target,
  'fa-chart-area': BarChart3,
  'fa-balance-scale': Target,
  'fa-weight': Target,
  'fa-fire': Flame,
  'fa-birthday-cake': Timer,
  'fa-calculator': Calculator,
  'fa-percent': Target,
  'fa-receipt': FileText,
  'fa-key': Shield,
  'fa-chart-pie': BarChart3,
  'fa-file-invoice-dollar': FileText,
  'fa-youtube': Video,
  'fa-instagram': Image,
  'fa-facebook': Globe,
  'fa-twitter': Globe,
  'fa-soundcloud': Music,
  'fa-pinterest': Image,
  'fa-download': Download,
  'fa-hashtag': Target,
  'fa-link': Globe,
  'fa-share-alt': Share2
};

export const calculators: Calculator[] = [
  // Finance & Investment (8 tools)
  { 
    id: 'emi', 
    name: 'EMI Calculator', 
    description: 'Calculate EMI for loans with detailed breakdown', 
    category: 'finance', 
    icon: 'fa-chart-line', 
    featured: true, 
    isPopular: true,
    difficulty: 'easy',
    rating: 4.8,
    usageCount: 125000,
    tags: ['loan', 'emi', 'finance'],
    longDescription: 'Calculate your Equated Monthly Installment (EMI) with detailed amortization schedule, interest breakdown, and payment analysis.',
    features: ['Amortization Schedule', 'Interest Breakdown', 'Payment Analysis', 'Prepayment Options'],
    inputTypes: ['Principal Amount', 'Interest Rate', 'Loan Tenure'],
    outputTypes: ['Monthly EMI', 'Total Interest', 'Total Payment'],
    estimatedTime: '< 1 minute'
  },
  { 
    id: 'sip', 
    name: 'SIP Calculator', 
    description: 'Systematic Investment Planning with growth projections', 
    category: 'finance', 
    icon: 'fa-piggy-bank', 
    featured: true, 
    isPopular: true,
    difficulty: 'easy',
    rating: 4.7,
    usageCount: 98000,
    tags: ['sip', 'investment', 'mutual funds'],
    longDescription: 'Plan your systematic investment with detailed projections, goal planning, and wealth accumulation analysis.',
    features: ['Goal Planning', 'Growth Projections', 'Inflation Adjustment', 'Step-up SIP'],
    inputTypes: ['Monthly Investment', 'Expected Returns', 'Time Period'],
    outputTypes: ['Maturity Amount', 'Total Investment', 'Wealth Gained'],
    estimatedTime: '< 1 minute'
  },
  { 
    id: 'compound-interest', 
    name: 'Compound Interest', 
    description: 'Interest calculation with compounding frequency', 
    category: 'finance', 
    icon: 'fa-percentage', 
    featured: true, 
    isPopular: true,
    difficulty: 'medium',
    rating: 4.6,
    usageCount: 87000,
    tags: ['compound', 'interest', 'investment'],
    longDescription: 'Calculate compound interest with various compounding frequencies and visualize growth over time.',
    features: ['Multiple Compounding Frequencies', 'Growth Visualization', 'Year-by-Year Breakdown'],
    inputTypes: ['Principal', 'Annual Rate', 'Time Period', 'Compounding Frequency'],
    outputTypes: ['Final Amount', 'Interest Earned', 'Growth Chart'],
    estimatedTime: '< 1 minute'
  },
  { 
    id: 'mortgage', 
    name: 'Mortgage Calculator', 
    description: 'Complete home loan analysis with taxes and insurance', 
    category: 'finance', 
    icon: 'fa-home', 
    featured: true, 
    isPopular: true,
    difficulty: 'medium',
    rating: 4.5,
    usageCount: 76000,
    tags: ['mortgage', 'home loan', 'property'],
    longDescription: 'Comprehensive mortgage calculator with property taxes, insurance, and PMI calculations.',
    features: ['Property Tax Calculation', 'Insurance Estimates', 'PMI Analysis', 'Extra Payment Impact'],
    inputTypes: ['Home Price', 'Down Payment', 'Interest Rate', 'Loan Term'],
    outputTypes: ['Monthly Payment', 'Total Interest', 'Amortization Schedule'],
    estimatedTime: '2-3 minutes'
  },
  { 
    id: 'investment', 
    name: 'Investment Calculator', 
    description: 'Advanced investment planning and portfolio analysis', 
    category: 'finance', 
    icon: 'fa-chart-area', 
    featured: true, 
    isPro: true,
    difficulty: 'advanced',
    rating: 4.4,
    usageCount: 54000,
    tags: ['investment', 'portfolio', 'returns'],
    longDescription: 'Advanced investment calculator with portfolio diversification, risk analysis, and return projections.',
    features: ['Portfolio Diversification', 'Risk Analysis', 'Return Projections', 'Asset Allocation'],
    inputTypes: ['Investment Amount', 'Asset Mix', 'Risk Profile', 'Time Horizon'],
    outputTypes: ['Expected Returns', 'Risk Metrics', 'Portfolio Performance'],
    estimatedTime: '3-5 minutes'
  },
  { 
    id: 'loan-comparison', 
    name: 'Loan Comparison', 
    description: 'Compare multiple loan offers side by side', 
    category: 'finance', 
    icon: 'fa-balance-scale', 
    featured: true,
    difficulty: 'medium',
    rating: 4.3,
    usageCount: 45000,
    tags: ['loan', 'comparison', 'finance'],
    longDescription: 'Compare multiple loan offers with detailed analysis of terms, costs, and benefits.',
    features: ['Side-by-Side Comparison', 'Cost Analysis', 'Benefits Breakdown', 'Recommendation Engine'],
    inputTypes: ['Multiple Loan Offers', 'Terms & Conditions', 'Interest Rates'],
    outputTypes: ['Comparison Table', 'Cost Analysis', 'Best Option Recommendation'],
    estimatedTime: '2-3 minutes'
  },
  { 
    id: 'retirement-planning', 
    name: 'Retirement Planning', 
    description: 'Comprehensive retirement savings calculator', 
    category: 'finance', 
    icon: 'fa-chart-pie', 
    isNew: true,
    isPro: true,
    difficulty: 'advanced',
    rating: 4.9,
    usageCount: 32000,
    tags: ['retirement', 'savings', 'planning'],
    longDescription: 'Plan your retirement with detailed savings projections, inflation adjustments, and goal tracking.',
    features: ['Inflation Adjustment', 'Goal Tracking', 'Savings Projections', 'Withdrawal Strategy'],
    inputTypes: ['Current Age', 'Retirement Age', 'Current Savings', 'Monthly Contributions'],
    outputTypes: ['Retirement Corpus', 'Monthly Savings Required', 'Withdrawal Plan'],
    estimatedTime: '5-7 minutes'
  },
  { 
    id: 'tax-calculator', 
    name: 'Tax Calculator', 
    description: 'Income tax calculation with deductions', 
    category: 'finance', 
    icon: 'fa-file-invoice-dollar', 
    isNew: true,
    difficulty: 'medium',
    rating: 4.2,
    usageCount: 28000,
    tags: ['tax', 'income', 'deductions'],
    longDescription: 'Calculate income tax with various deductions, exemptions, and tax-saving options.',
    features: ['Deduction Analysis', 'Tax Saving Tips', 'Exemption Calculator', 'Tax Planning'],
    inputTypes: ['Annual Income', 'Deductions', 'Exemptions', 'Tax Regime'],
    outputTypes: ['Tax Liability', 'Tax Savings', 'Effective Tax Rate'],
    estimatedTime: '3-4 minutes'
  },

  // Unit Converters (10 tools)
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert various units', category: 'unit-converters', icon: 'fa-exchange-alt', featured: true },
  { id: 'length-converter', name: 'Length Converter', description: 'Convert length units', category: 'unit-converters', icon: 'fa-ruler' },
  { id: 'weight-converter', name: 'Weight Converter', description: 'Convert weight units', category: 'unit-converters', icon: 'fa-weight' },
  { id: 'temperature-converter', name: 'Temperature Converter', description: 'Convert temperature units', category: 'unit-converters', icon: 'fa-thermometer' },
  { id: 'time-converter', name: 'Time Converter', description: 'Convert time units', category: 'unit-converters', icon: 'fa-clock' },
  { id: 'speed-converter', name: 'Speed Converter', description: 'Convert speed units', category: 'unit-converters', icon: 'fa-tachometer-alt' },
  { id: 'area-converter', name: 'Area Converter', description: 'Convert area units', category: 'unit-converters', icon: 'fa-square' },
  { id: 'volume-converter', name: 'Volume Converter', description: 'Convert volume units', category: 'unit-converters', icon: 'fa-cube' },
  { id: 'data-converter', name: 'Data Size Converter', description: 'Convert data size units', category: 'unit-converters', icon: 'fa-hdd' },
  { id: 'power-converter', name: 'Power Converter', description: 'Convert power units', category: 'unit-converters', icon: 'fa-bolt' },
  { id: 'pressure-converter', name: 'Pressure Converter', description: 'Convert pressure units', category: 'unit-converters', icon: 'fa-gauge' },

  // File Converters (15 tools)
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to editable Word', category: 'file-converters', icon: 'fa-file-word' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word to PDF', category: 'file-converters', icon: 'fa-file-pdf' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF', category: 'file-converters', icon: 'fa-file-excel' },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages to images', category: 'file-converters', icon: 'fa-image' },
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert images to PDF', category: 'file-converters', icon: 'fa-file-pdf' },
  { id: 'text-to-pdf', name: 'Text to PDF', description: 'Convert text to PDF', category: 'file-converters', icon: 'fa-file-pdf' },
  { id: 'csv-to-excel', name: 'CSV to Excel', description: 'Convert CSV to Excel format', category: 'file-converters', icon: 'fa-file-excel' },
  { id: 'excel-to-csv', name: 'Excel to CSV', description: 'Convert Excel to CSV', category: 'file-converters', icon: 'fa-file-csv' },
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV to JSON', category: 'file-converters', icon: 'fa-code' },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Convert JSON to CSV', category: 'file-converters', icon: 'fa-file-csv' },
  { id: 'csv-to-xml', name: 'CSV to XML', description: 'Convert CSV to XML', category: 'file-converters', icon: 'fa-code' },
  { id: 'docx-to-odt', name: 'DOCX to ODT', description: 'Convert Word to OpenDocument', category: 'file-converters', icon: 'fa-file-alt' },
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDFs', category: 'file-converters', icon: 'fa-layer-group' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Split PDF into pages', category: 'file-converters', icon: 'fa-cut' },
  { id: 'compress-pdf', name: 'PDF Compressor', description: 'Reduce PDF file size', category: 'file-converters', icon: 'fa-compress' },

  // Media Converters (9 tools)
  { id: 'video-to-mp3', name: 'Video to MP3', description: 'Extract audio from video', category: 'media-converters', icon: 'fa-music' },
  { id: 'audio-converter', name: 'Audio Converter', description: 'Convert between audio formats', category: 'media-converters', icon: 'fa-headphones' },
  { id: 'video-converter', name: 'Video Converter', description: 'Convert between video formats', category: 'media-converters', icon: 'fa-video' },
  { id: 'audio-compressor', name: 'Audio Compressor', description: 'Reduce audio file size', category: 'media-converters', icon: 'fa-volume-down' },
  { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce video file size', category: 'media-converters', icon: 'fa-compress-alt' },
  { id: 'mp4-to-gif', name: 'MP4 to GIF', description: 'Convert video to GIF', category: 'media-converters', icon: 'fa-magic' },
  { id: 'gif-to-mp4', name: 'GIF to MP4', description: 'Convert GIF to video', category: 'media-converters', icon: 'fa-film' },
  { id: 'youtube-to-mp3', name: 'YouTube to MP3', description: 'Download YouTube audio', category: 'media-converters', icon: 'fa-youtube' },
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail', description: 'Download video thumbnails', category: 'media-converters', icon: 'fa-image' },

   // Downloader Tools
   { id: 'youtube-downloader', name: 'YouTube Video Downloader', description: 'Download videos from YouTube', category: 'downloader-tools', icon: 'fa-youtube' },
   { id: 'instagram-downloader', name: 'Instagram Reel Downloader', description: 'Download reels from Instagram', category: 'downloader-tools', icon: 'fa-instagram' },
   { id: 'facebook-downloader', name: 'Facebook Video Downloader', description: 'Download videos from Facebook', category: 'downloader-tools', icon: 'fa-facebook' },
   { id: 'twitter-downloader', name: 'Twitter Video Downloader', description: 'Download videos from Twitter', category: 'downloader-tools', icon: 'fa-twitter' },
   { id: 'soundcloud-downloader', name: 'SoundCloud to MP3', description: 'Download audio from SoundCloud', category: 'downloader-tools', icon: 'fa-soundcloud' },
   { id: 'pinterest-downloader', name: 'Pinterest Image Downloader', description: 'Download images from Pinterest', category: 'downloader-tools', icon: 'fa-pinterest' },

   // Social Media Tools
   { id: 'instagram-caption-generator', name: 'Instagram Caption Generator', description: 'Generate creative captions for Instagram', category: 'social-media-tools', icon: 'fa-instagram' },
   { id: 'tweet-thread-composer', name: 'Tweet Thread Composer', description: 'Compose tweet threads easily', category: 'social-media-tools', icon: 'fa-twitter' },
   { id: 'hashtag-generator', name: 'Hashtag Generator', description: 'Generate relevant hashtags', category: 'social-media-tools', icon: 'fa-hashtag' },
   { id: 'reels-trend-finder', name: 'Reels Trend Finder', description: 'Discover trending reels', category: 'social-media-tools', icon: 'fa-instagram' },
   { id: 'social-bio-link-generator', name: 'Social Bio Link Generator', description: 'Create a link for your social bio', category: 'social-media-tools', icon: 'fa-link' },

  // AI-Powered Tools (7 tools)
  { id: 'ocr', name: 'OCR (Image to Text)', description: 'Extract text from images', category: 'ai-converters', icon: 'fa-eye', isPro: true },
  { id: 'speech-to-text', name: 'Speech to Text', description: 'Transcribe audio to text', category: 'ai-converters', icon: 'fa-microphone', isPro: true },
  { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text to audio', category: 'ai-converters', icon: 'fa-volume-up', isPro: true },
  { id: 'ai-translator', name: 'AI Translator', description: 'Smart language translation', category: 'ai-converters', icon: 'fa-language', isPro: true },
  { id: 'code-explainer', name: 'Code Explainer', description: 'Explain code functionality', category: 'ai-converters', icon: 'fa-lightbulb', isPro: true },
  { id: 'document-summarizer', name: 'Document Summarizer', description: 'AI text summarization', category: 'ai-converters', icon: 'fa-compress-alt', isPro: true },
  { id: 'audio-transcriber', name: 'Audio Transcriber', description: 'Professional transcription', category: 'ai-converters', icon: 'fa-file-audio', isPro: true },

  // Text & Code Tools (15 tools)
  { id: 'text-case-converter', name: 'Text Case Converter', description: 'Upper, lower, title case', category: 'text-converters', icon: 'fa-font' },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse text strings', category: 'text-converters', icon: 'fa-undo' },
  { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Clean duplicate text', category: 'text-converters', icon: 'fa-filter' },
  { id: 'slug-generator', name: 'Slug Generator', description: 'URL-friendly text', category: 'text-converters', icon: 'fa-link' },
  { id: 'text-capitalizer', name: 'Text Capitalizer', description: 'Smart capitalization', category: 'text-converters', icon: 'fa-font' },
  { id: 'binary-text', name: 'Binary ↔ Text', description: 'Convert binary and text', category: 'text-converters', icon: 'fa-code' },
  { id: 'base64-encoder', name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64', category: 'text-converters', icon: 'fa-lock' },
  { id: 'rot13-cipher', name: 'ROT13 Cipher', description: 'ROT13 encryption/decryption', category: 'text-converters', icon: 'fa-shield' },
  { id: 'json-xml', name: 'JSON ↔ XML', description: 'Convert JSON and XML', category: 'text-converters', icon: 'fa-code' },
  { id: 'html-markdown', name: 'HTML ↔ Markdown', description: 'Convert HTML and Markdown', category: 'text-converters', icon: 'fa-markdown' },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', category: 'text-converters', icon: 'fa-database' },
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes', category: 'text-converters', icon: 'fa-qrcode' },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', category: 'text-converters', icon: 'fa-search' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'text-converters', icon: 'fa-fingerprint' },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA hashes', category: 'text-converters', icon: 'fa-hashtag' },

  // Currency & Crypto (4 tools)
  { id: 'currency-converter', name: 'Currency Converter', description: 'Real-time currency conversion', category: 'currency-crypto', icon: 'fa-dollar-sign', featured: true },
  { id: 'crypto-converter', name: 'Crypto Converter', description: 'Convert cryptocurrencies', category: 'currency-crypto', icon: 'fa-bitcoin' },
  { id: 'currency-history', name: 'Currency History', description: 'Historical exchange rates', category: 'currency-crypto', icon: 'fa-chart-line' },
  { id: 'gold-converter', name: 'Gold & Silver Rates', description: 'Precious metal rates', category: 'currency-crypto', icon: 'fa-coins' },

  // Language & Script Tools (5 tools)
  { id: 'text-translator', name: 'Text Translator', description: 'Translate between languages', category: 'language-converters', icon: 'fa-language' },
  { id: 'script-converter', name: 'Script Converter', description: 'Convert between scripts', category: 'language-converters', icon: 'fa-font' },
  { id: 'font-converter', name: 'Font Style Converter', description: 'Convert font styles', category: 'language-converters', icon: 'fa-text-height' },
  { id: 'unicode-converter', name: 'Unicode ↔ ASCII', description: 'Convert Unicode and ASCII', category: 'language-converters', icon: 'fa-font' },
  { id: 'language-detector', name: 'Language Detector', description: 'Detect text language', category: 'language-converters', icon: 'fa-search' },

  // Math & Numbers (6 tools)
  { id: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions', category: 'math', icon: 'fa-calculator', featured: true },
  { id: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages', category: 'math', icon: 'fa-percent', featured: true },
  { id: 'fraction-decimal', name: 'Fraction ↔ Decimal', description: 'Convert fractions and decimals', category: 'math', icon: 'fa-divide' },
  { id: 'binary-decimal-hex', name: 'Number Base Converter', description: 'Binary, decimal, hex conversion', category: 'math', icon: 'fa-hashtag' },
  { id: 'roman-decimal', name: 'Roman ↔ Decimal', description: 'Roman numeral conversion', category: 'math', icon: 'fa-roman' },
  { id: 'algebra-solver', name: 'Algebra Solver', description: 'Solve algebraic equations', category: 'math', icon: 'fa-square-root-alt' },

  // Health & Fitness (3 tools)
  { id: 'bmi', name: 'BMI Calculator', description: 'Body mass index calculator', category: 'health', icon: 'fa-weight', featured: true },
  { id: 'bmr', name: 'BMR Calculator', description: 'Metabolic rate calculator', category: 'health', icon: 'fa-fire', featured: true },
  { id: 'age', name: 'Age Calculator', description: 'Calculate exact age', category: 'health', icon: 'fa-birthday-cake', featured: true },

  // Daily Utilities (2 tools)
  { id: 'tip', name: 'Tip Calculator', description: 'Calculate tips and splits', category: 'daily', icon: 'fa-receipt', featured: true },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', category: 'daily', icon: 'fa-key' },

  // Specialized Tools (8 tools)
  { id: 'ico-to-png', name: 'ICO to PNG', description: 'Convert ICO to PNG', category: 'misc-converters', icon: 'fa-image' },
  { id: 'png-to-ico', name: 'PNG to ICO', description: 'Convert PNG to ICO', category: 'misc-converters', icon: 'fa-image' },
  { id: 'vcf-to-csv', name: 'VCF to CSV', description: 'Convert contacts to CSV', category: 'misc-converters', icon: 'fa-address-book' },
  { id: 'metadata-extractor', name: 'Metadata Extractor', description: 'Extract file metadata', category: 'misc-converters', icon: 'fa-info' },
  { id: 'favicon-generator', name: 'Favicon Generator', description: 'Generate website favicons', category: 'misc-converters', icon: 'fa-star' },
  { id: 'youtube-timestamp-link', name: 'YouTube Timestamp Link', description: 'Create timestamped YouTube links', category: 'misc-converters', icon: 'fa-youtube' },
  { id: 'link-shortener', name: 'URL Shortener', description: 'Shorten long URLs', category: 'misc-converters', icon: 'fa-link' },
  { id: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare text differences', category: 'misc-converters', icon: 'fa-not-equal' },
];

export const categories: Category[] = [
  {
    id: 'finance',
    name: 'Finance & Investment',
    description: 'Professional financial calculators for smart money decisions',
    icon: 'fa-chart-line',
    color: 'green',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    calculators: calculators.filter(c => c.category === 'finance'),
    isPopular: true,
    trending: true
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'Health monitoring and fitness calculation tools',
    icon: 'fa-heartbeat',
    color: 'red',
    gradient: 'from-rose-500 via-pink-500 to-purple-600',
    calculators: calculators.filter(c => c.category === 'health'),
    isPopular: true,
    trending: false
  },
  {
    id: 'math',
    name: 'Math & Numbers',
    description: 'Advanced mathematical calculations and number systems',
    icon: 'fa-square-root-alt',
    color: 'blue',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    calculators: calculators.filter(c => c.category === 'math'),
    isPopular: true,
    trending: false
  },
  {
    id: 'daily',
    name: 'Daily Utilities',
    description: 'Everyday calculation tools and practical utilities',
    icon: 'fa-calendar-day',
    color: 'purple',
    gradient: 'from-purple-500 via-violet-500 to-pink-600',
    calculators: calculators.filter(c => c.category === 'daily'),
    isPopular: true,
    trending: false
  },
  {
    id: 'unit-converters',
    name: 'Unit Converters',
    description: 'Comprehensive unit conversion tools for all measurements',
    icon: 'fa-exchange-alt',
    color: 'orange',
    gradient: 'from-orange-500 via-amber-500 to-yellow-600',
    calculators: calculators.filter(c => c.category === 'unit-converters'),
    isPopular: true,
    trending: false
  },
  {
    id: 'file-converters',
    name: 'File Converters',
    description: 'Professional file format conversion and processing tools',
    icon: 'fa-file-alt',
    color: 'indigo',
    gradient: 'from-indigo-500 via-purple-500 to-pink-600',
    calculators: calculators.filter(c => c.category === 'file-converters'),
    isPopular: true,
    trending: true
  },
  {
    id: 'media-converters',
    name: 'Media Converters',
    description: 'Audio, video, and image format conversion tools',
    icon: 'fa-video',
    color: 'pink',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    calculators: calculators.filter(c => c.category === 'media-converters'),
    isPopular: true,
    trending: true
  },
  {
    id: 'currency-crypto',
    name: 'Currency & Crypto',
    description: 'Live currency rates and cryptocurrency conversion tools',
    icon: 'fa-bitcoin',
    color: 'yellow',
    gradient: 'from-yellow-500 via-orange-500 to-red-600',
    calculators: calculators.filter(c => c.category === 'currency-crypto'),
    isPopular: true,
    trending: false
  },
  {
    id: 'text-converters',
    name: 'Text & Code Tools',
    description: 'Text manipulation, formatting, and code processing tools',
    icon: 'fa-code',
    color: 'teal',
    gradient: 'from-teal-500 via-cyan-500 to-blue-600',
    calculators: calculators.filter(c => c.category === 'text-converters'),
    isPopular: true,
    trending: false
  },
  {
    id: 'ai-converters',
    name: 'AI-Powered Tools',
    description: 'Advanced AI tools for OCR, speech, and intelligent processing',
    icon: 'fa-robot',
    color: 'emerald',
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    calculators: calculators.filter(c => c.category === 'ai-converters'),
    isPopular: true,
    trending: true
  },
  {
    id: 'language-converters',
    name: 'Language & Script',
    description: 'Translation and script conversion tools',
    icon: 'fa-language',
    color: 'cyan',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    calculators: calculators.filter(c => c.category === 'language-converters'),
    isPopular: false,
    trending: false
  },
  {
    id: 'misc-converters',
    name: 'Specialized Tools',
    description: 'Unique and specialized conversion utilities',
    icon: 'fa-tools',
    color: 'gray',
    gradient: 'from-gray-500 via-slate-500 to-zinc-600',
    calculators: calculators.filter(c => c.category === 'misc-converters'),
    isPopular: false,
    trending: false
  },
   {
    id: 'downloader-tools',
    name: 'Downloader Tools',
    description: 'Tools for downloading content from various platforms',
    icon: 'fa-download',
    color: 'blue',
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    calculators: calculators.filter(c => c.category === 'downloader-tools'),
    isPopular: false,
    trending: false
  },
  {
    id: 'social-media-tools',
    name: 'Social Media Tools',
    description: 'Tools to manage and enhance your social media presence',
    icon: 'fa-share-alt',
    color: 'purple',
    gradient: 'from-purple-400 via-pink-500 to-red-500',
    calculators: calculators.filter(c => c.category === 'social-media-tools'),
    isPopular: false,
    trending: false
  }
];

export const featuredCalculators = calculators.filter(c => c.featured);

export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find(calculator => calculator.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}