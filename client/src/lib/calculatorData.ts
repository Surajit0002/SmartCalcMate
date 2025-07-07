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
  // Finance & Investment (7 tools)
  { id: 'emi', name: 'EMI Calculator', description: 'Calculate EMI for loans', category: 'finance', icon: 'fa-chart-line', featured: true },
  { id: 'sip', name: 'SIP Calculator', description: 'Systematic Investment Planning', category: 'finance', icon: 'fa-piggy-bank', featured: true },
  { id: 'compound-interest', name: 'Compound Interest', description: 'Interest calculation over time', category: 'finance', icon: 'fa-percentage', featured: true },
  { id: 'mortgage', name: 'Mortgage Calculator', description: 'Home loan calculations', category: 'finance', icon: 'fa-home', featured: true },
  { id: 'investment', name: 'Investment Calculator', description: 'Investment planning tools', category: 'finance', icon: 'fa-chart-area', featured: true },
  { id: 'loan-comparison', name: 'Loan Comparison', description: 'Compare loan options', category: 'finance', icon: 'fa-balance-scale', featured: true },

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
    description: 'EMI, SIP, Investment calculators',
    icon: 'fa-chart-line',
    color: 'green',
    calculators: calculators.filter(c => c.category === 'finance')
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'BMI, BMR, Age calculators',
    icon: 'fa-heartbeat',
    color: 'red',
    calculators: calculators.filter(c => c.category === 'health')
  },
  {
    id: 'math',
    name: 'Math & Numbers',
    description: 'Scientific, Number system converters',
    icon: 'fa-square-root-alt',
    color: 'blue',
    calculators: calculators.filter(c => c.category === 'math')
  },
  {
    id: 'daily',
    name: 'Daily Utilities',
    description: 'Tip, Password generators',
    icon: 'fa-calendar-day',
    color: 'purple',
    calculators: calculators.filter(c => c.category === 'daily')
  },
  {
    id: 'unit-converters',
    name: 'Unit Converters',
    description: 'Length, Weight, Temperature & more',
    icon: 'fa-exchange-alt',
    color: 'orange',
    calculators: calculators.filter(c => c.category === 'unit-converters')
  },
  {
    id: 'file-converters',
    name: 'File Converters',
    description: 'PDF, Word, Excel conversions',
    icon: 'fa-file-alt',
    color: 'indigo',
    calculators: calculators.filter(c => c.category === 'file-converters')
  },
  {
    id: 'media-converters',
    name: 'Media Converters',
    description: 'Video, Audio format converters',
    icon: 'fa-video',
    color: 'pink',
    calculators: calculators.filter(c => c.category === 'media-converters')
  },
  {
    id: 'currency-crypto',
    name: 'Currency & Crypto',
    description: 'Live rates, Crypto converters',
    icon: 'fa-bitcoin',
    color: 'yellow',
    calculators: calculators.filter(c => c.category === 'currency-crypto')
  },
  {
    id: 'text-converters',
    name: 'Text & Code Tools',
    description: 'Text manipulation & code tools',
    icon: 'fa-code',
    color: 'teal',
    calculators: calculators.filter(c => c.category === 'text-converters')
  },
  {
    id: 'ai-converters',
    name: 'AI-Powered Tools',
    description: 'OCR, Speech, AI translation',
    icon: 'fa-robot',
    color: 'emerald',
    calculators: calculators.filter(c => c.category === 'ai-converters')
  },
  {
    id: 'language-converters',
    name: 'Language & Script',
    description: 'Translation & script converters',
    icon: 'fa-language',
    color: 'cyan',
    calculators: calculators.filter(c => c.category === 'language-converters')
  },
  {
    id: 'misc-converters',
    name: 'Specialized Tools',
    description: 'Unique & specialized converters',
    icon: 'fa-tools',
    color: 'gray',
    calculators: calculators.filter(c => c.category === 'misc-converters')
  }
];

export const featuredCalculators = calculators.filter(c => c.featured);

export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find(calculator => calculator.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}