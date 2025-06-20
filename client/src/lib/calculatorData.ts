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
  // Finance
  { id: 'emi', name: 'EMI Calculator', description: 'Calculate your loan EMI', category: 'finance', icon: 'fa-home', featured: true, function: 'Calculate monthly loan payments' },
  { id: 'sip', name: 'SIP Calculator', description: 'Plan your systematic investment', category: 'finance', icon: 'fa-chart-line', function: 'Calculate systematic investment returns' },
  { id: 'compound-interest', name: 'Compound Interest', description: 'Calculate compound interest growth', category: 'finance', icon: 'fa-percentage', function: 'Calculate compound interest growth' },
  { id: 'mortgage', name: 'Mortgage Calculator', description: 'Comprehensive mortgage analysis with charts', category: 'finance', icon: 'fa-building', featured: true, function: 'Calculate home loan payments' },
  { id: 'investment', name: 'Investment Calculator', description: 'Portfolio growth projections', category: 'finance', icon: 'fa-chart-area', featured: true, function: 'Plan investment strategies' },
  { id: 'loan-comparison', name: 'Loan Comparison', description: 'Compare multiple loan offers', category: 'finance', icon: 'fa-balance-scale', function: 'Compare loan terms' },
  { id: 'interest-calculator', name: 'Loan Interest Calculator', description: 'Calculate loan interest rates', category: 'finance', icon: 'fa-percentage', function: 'Calculate loan interest rates', isNew: true },
  { id: 'discount-calculator', name: 'Discount Price Calculator', description: 'Calculate discounted prices', category: 'finance', icon: 'fa-tags', function: 'Calculate discounted prices', isNew: true },
  
  // Health
  { id: 'bmi', name: 'BMI Calculator', description: 'Check your body mass index', category: 'health', icon: 'fa-weight', featured: true, function: 'Calculate body mass index' },
  { id: 'bmr', name: 'BMR Calculator', description: 'Calculate daily calorie needs', category: 'health', icon: 'fa-fire', function: 'Calculate metabolic rate' },
  
  // Math
  { id: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical calculations', category: 'math', icon: 'fa-calculator', function: 'Perform scientific calculations' },
  { id: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily', category: 'math', icon: 'fa-percent', featured: true, function: 'Calculate percentages' },
  { id: 'roman-decimal', name: 'Roman ↔ Decimal', description: 'Convert between Roman and decimal numbers', category: 'math', icon: 'fa-roman', function: 'Convert between Roman and decimal', isNew: true },
  { id: 'binary-decimal', name: 'Binary ↔ Decimal ↔ Hex', description: 'Convert between number systems', category: 'math', icon: 'fa-binary', function: 'Convert between number systems', isNew: true },
  
  // Daily
  { id: 'age', name: 'Age Calculator', description: 'Calculate your exact age', category: 'daily', icon: 'fa-birthday-cake', function: 'Calculate exact age' },
  { id: 'tip', name: 'Tip Calculator', description: 'Calculate tips and split bills', category: 'daily', icon: 'fa-receipt', featured: true, function: 'Calculate tips and bill splits' },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between different units', category: 'daily', icon: 'fa-exchange-alt', function: 'Convert between units' },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Convert currencies with live rates', category: 'daily', icon: 'fa-dollar-sign', featured: true, function: 'Convert currencies with live rates' },

  // Unit Converters
  { id: 'length-converter', name: 'Length Converter', description: 'Convert cm/inch/km/mi', category: 'unit-converters', icon: 'fa-ruler', function: 'Convert length units', isNew: true },
  { id: 'weight-converter', name: 'Weight Converter', description: 'Convert kg/lb and other weights', category: 'unit-converters', icon: 'fa-weight', function: 'Convert weight units', isNew: true },
  { id: 'temperature-converter', name: 'Temperature Converter', description: 'Convert C/F/K temperatures', category: 'unit-converters', icon: 'fa-thermometer', function: 'Convert temperature units', isNew: true },
  { id: 'time-converter', name: 'Time Converter', description: 'Convert s/min/h/d time units', category: 'unit-converters', icon: 'fa-clock', function: 'Convert time units', isNew: true },
  { id: 'speed-converter', name: 'Speed Converter', description: 'Convert km/h to mph and more', category: 'unit-converters', icon: 'fa-tachometer', function: 'Convert speed units', isNew: true },
  { id: 'area-converter', name: 'Area Converter', description: 'Convert sqm to acres and more', category: 'unit-converters', icon: 'fa-expand', function: 'Convert area units', isNew: true },
  { id: 'volume-converter', name: 'Volume Converter', description: 'Convert L, gal, m³ volumes', category: 'unit-converters', icon: 'fa-cube', function: 'Convert volume units', isNew: true },
  { id: 'data-converter', name: 'Data Size Converter', description: 'Convert KB/MB/GB sizes', category: 'unit-converters', icon: 'fa-database', function: 'Convert data sizes', isNew: true },
  { id: 'power-converter', name: 'Power Converter', description: 'Convert W/kW/HP power units', category: 'unit-converters', icon: 'fa-bolt', function: 'Convert power units', isNew: true },
  { id: 'pressure-converter', name: 'Pressure Converter', description: 'Convert Pa/bar/atm pressures', category: 'unit-converters', icon: 'fa-gauge', function: 'Convert pressure units', isNew: true },

  // File Converters
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Converts PDF files to editable DOCX', category: 'file-converters', icon: 'fa-file-pdf', function: 'Converts PDF files to editable DOCX', isNew: true },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Converts Word files to PDF', category: 'file-converters', icon: 'fa-file-word', function: 'Converts Word files to PDF', isNew: true },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extracts tabular data from PDF', category: 'file-converters', icon: 'fa-file-excel', function: 'Extracts tabular data from PDF', isNew: true },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Converts PDF pages into PNG/JPG', category: 'file-converters', icon: 'fa-image', function: 'Converts PDF pages into PNG/JPG', isNew: true },
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Combines images into a PDF', category: 'file-converters', icon: 'fa-images', function: 'Combines images into a PDF', isNew: true },
  { id: 'text-to-pdf', name: 'Text to PDF', description: 'Converts text files to PDF format', category: 'file-converters', icon: 'fa-file-alt', function: 'Converts text files to PDF format', isNew: true },
  { id: 'csv-to-excel', name: 'CSV to Excel', description: 'Converts CSV to .xlsx', category: 'file-converters', icon: 'fa-table', function: 'Converts CSV to .xlsx', isNew: true },
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Converts CSV to JSON', category: 'file-converters', icon: 'fa-code', function: 'Converts CSV to JSON', isNew: true },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Converts JSON to tabular data', category: 'file-converters', icon: 'fa-table', function: 'Converts JSON to tabular data', isNew: true },
  { id: 'csv-to-xml', name: 'CSV to XML', description: 'Converts CSV to XML format', category: 'file-converters', icon: 'fa-code', function: 'Converts CSV to XML format', isNew: true },
  { id: 'docx-to-odt', name: 'DOCX to ODT', description: 'Converts Word to OpenDocument', category: 'file-converters', icon: 'fa-file', function: 'Converts Word to OpenDocument', isNew: true },
  { id: 'merge-pdf', name: 'Merge PDFs', description: 'Combines multiple PDFs', category: 'file-converters', icon: 'fa-compress', function: 'Combines multiple PDFs', isNew: true },
  { id: 'split-pdf', name: 'Split PDFs', description: 'Splits PDF pages', category: 'file-converters', icon: 'fa-expand', function: 'Splits PDF pages', isNew: true },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduces PDF file size', category: 'file-converters', icon: 'fa-compress-alt', function: 'Reduces PDF file size', isNew: true },
  { id: 'remove-pdf-password', name: 'Remove PDF Password', description: 'Unlocks protected PDFs', category: 'file-converters', icon: 'fa-unlock', function: 'Unlocks protected PDFs', isNew: true },

  // Media Converters
  { id: 'video-to-mp3', name: 'Video to MP3', description: 'Extracts audio from video', category: 'media-converters', icon: 'fa-video', function: 'Extracts audio from video', isNew: true },
  { id: 'audio-converter', name: 'Audio to MP3/WAV', description: 'Converts between audio formats', category: 'media-converters', icon: 'fa-music', function: 'Converts between audio formats', isNew: true },
  { id: 'video-converter', name: 'Video Converter', description: 'MP4, AVI, MKV format conversion', category: 'media-converters', icon: 'fa-film', function: 'MP4, AVI, MKV format conversion', isNew: true },
  { id: 'audio-compressor', name: 'Audio Compressor', description: 'Reduces audio file size', category: 'media-converters', icon: 'fa-compress', function: 'Reduces audio file size', isNew: true },
  { id: 'video-compressor', name: 'Video Compressor', description: 'Compresses video files', category: 'media-converters', icon: 'fa-compress-alt', function: 'Compresses video files', isNew: true },
  { id: 'mp4-to-gif', name: 'MP4 to GIF', description: 'Converts video to animated GIF', category: 'media-converters', icon: 'fa-gif', function: 'Converts video to animated GIF', isNew: true },
  { id: 'gif-to-mp4', name: 'GIF to MP4', description: 'Converts GIF to MP4', category: 'media-converters', icon: 'fa-video', function: 'Converts GIF to MP4', isNew: true },
  { id: 'youtube-to-mp3', name: 'YouTube to MP3', description: 'Downloads and extracts audio', category: 'media-converters', icon: 'fa-youtube', function: 'Downloads and extracts audio', isNew: true, isPro: true },
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail Downloader', description: 'Grabs video thumbnails', category: 'media-converters', icon: 'fa-image', function: 'Grabs video thumbnails', isNew: true },

  // Currency & Crypto
  { id: 'crypto-converter', name: 'Crypto Converter (BTC/ETH)', description: 'Convert cryptocurrencies', category: 'currency-crypto', icon: 'fa-bitcoin', function: 'Convert cryptocurrencies', isNew: true },
  { id: 'currency-history', name: 'Currency Rate History Viewer', description: 'View historical exchange rates', category: 'currency-crypto', icon: 'fa-chart-line', function: 'View historical exchange rates', isNew: true },
  { id: 'gold-converter', name: 'Gold & Silver Rate', description: 'Current precious metal rates', category: 'currency-crypto', icon: 'fa-coins', function: 'Current precious metal rates', isNew: true },

  // Text Format Converters
  { id: 'text-case', name: 'Text Case Converter', description: 'Convert text case formats', category: 'text-converters', icon: 'fa-font', function: 'Convert text case formats', isNew: true },
  { id: 'binary-text', name: 'Binary ↔ Text', description: 'Convert between binary and text', category: 'text-converters', icon: 'fa-binary', function: 'Convert between binary and text', isNew: true },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse text strings', category: 'text-converters', icon: 'fa-undo', function: 'Reverse text strings', isNew: true },
  { id: 'slug-generator', name: 'Slug Generator', description: 'Generate URL-friendly slugs', category: 'text-converters', icon: 'fa-link', function: 'Generate URL-friendly slugs', isNew: true },
  { id: 'text-capitalizer', name: 'Text Capitalizer', description: 'Capitalize text properly', category: 'text-converters', icon: 'fa-text-height', function: 'Capitalize text properly', isNew: true },
  { id: 'remove-lines', name: 'Remove Duplicate Lines', description: 'Remove duplicate text lines', category: 'text-converters', icon: 'fa-minus', function: 'Remove duplicate text lines', isNew: true },
  { id: 'text-encryptor', name: 'ROT13 / Base64 Encryptor', description: 'Encrypt and decrypt text', category: 'text-converters', icon: 'fa-lock', function: 'Encrypt and decrypt text', isNew: true },

  // Code Converters
  { id: 'json-xml', name: 'JSON ↔ XML', description: 'Convert between JSON and XML', category: 'code-converters', icon: 'fa-code', function: 'Convert between JSON and XML', isNew: true },
  { id: 'json-csv', name: 'JSON ↔ CSV', description: 'Convert between JSON and CSV', category: 'code-converters', icon: 'fa-table', function: 'Convert between JSON and CSV', isNew: true },
  { id: 'html-markdown', name: 'HTML ↔ Markdown', description: 'Convert between HTML and Markdown', category: 'code-converters', icon: 'fa-markdown', function: 'Convert between HTML and Markdown', isNew: true },
  { id: 'code-beautifier', name: 'HTML/CSS/JS Beautifier', description: 'Format and beautify code', category: 'code-converters', icon: 'fa-code', function: 'Format and beautify code', isNew: true },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', category: 'code-converters', icon: 'fa-database', function: 'Format SQL queries', isNew: true },
  { id: 'js-obfuscator', name: 'JavaScript Obfuscator', description: 'Obfuscate JavaScript code', category: 'code-converters', icon: 'fa-shield', function: 'Obfuscate JavaScript code', isNew: true },
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes', category: 'code-converters', icon: 'fa-qrcode', function: 'Generate QR codes', isNew: true },
  { id: 'qr-scanner', name: 'QR Code Reader', description: 'Read and decode QR codes', category: 'code-converters', icon: 'fa-scan', function: 'Read and decode QR codes', isNew: true },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', category: 'code-converters', icon: 'fa-search', function: 'Test regular expressions', isNew: true },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'code-converters', icon: 'fa-fingerprint', function: 'Generate unique identifiers', isNew: true },

  // Language & Script Converters
  { id: 'text-translator', name: 'Text Translator', description: 'Translate text between languages', category: 'language-converters', icon: 'fa-language', function: 'Translate text between languages', isNew: true },
  { id: 'script-converter', name: 'Script Converter', description: 'Convert between scripts (e.g., Hindi ↔ Roman)', category: 'language-converters', icon: 'fa-font', function: 'Convert between scripts', isNew: true },
  { id: 'font-converter', name: 'Font Style Converter', description: 'Convert font styles', category: 'language-converters', icon: 'fa-text-height', function: 'Convert font styles', isNew: true },
  { id: 'unicode-converter', name: 'Unicode ↔ ASCII', description: 'Convert between Unicode and ASCII', category: 'language-converters', icon: 'fa-font', function: 'Convert between Unicode and ASCII', isNew: true },
  { id: 'language-detector', name: 'Language Detector', description: 'Detect text language', category: 'language-converters', icon: 'fa-search', function: 'Detect text language', isNew: true },

  // AI-Enhanced Converters
  { id: 'ocr', name: 'OCR (Image to Text)', description: 'Extract text from images', category: 'ai-converters', icon: 'fa-eye', function: 'Extract text from images', isNew: true, isPro: true },
  { id: 'speech-to-text', name: 'Speech to Text', description: 'Convert speech to text', category: 'ai-converters', icon: 'fa-microphone', function: 'Convert speech to text', isNew: true, isPro: true },
  { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text to speech', category: 'ai-converters', icon: 'fa-volume-up', function: 'Convert text to speech', isNew: true, isPro: true },
  { id: 'ai-translator', name: 'AI Translator', description: 'AI-powered translation', category: 'ai-converters', icon: 'fa-robot', function: 'AI-powered translation', isNew: true, isPro: true },
  { id: 'code-explainer', name: 'Code to Explanation', description: 'Explain code functionality', category: 'ai-converters', icon: 'fa-lightbulb', function: 'Explain code functionality', isNew: true, isPro: true },
  { id: 'pdf-summarizer', name: 'Document Summarizer', description: 'Summarize document content', category: 'ai-converters', icon: 'fa-compress-alt', function: 'Summarize document content', isNew: true, isPro: true },
  { id: 'audio-transcriber', name: 'Audio Transcriber', description: 'Transcribe audio files', category: 'ai-converters', icon: 'fa-file-audio', function: 'Transcribe audio files', isNew: true, isPro: true },

  // Misc & Special Format Converters
  { id: 'ico-to-png', name: 'ICO to PNG', description: 'Convert ICO to PNG', category: 'misc-converters', icon: 'fa-image', function: 'Convert ICO to PNG', isNew: true },
  { id: 'png-to-ico', name: 'PNG to ICO', description: 'Convert PNG to ICO', category: 'misc-converters', icon: 'fa-image', function: 'Convert PNG to ICO', isNew: true },
  { id: 'vcf-to-csv', name: 'VCF to CSV', description: 'Convert contacts to CSV', category: 'misc-converters', icon: 'fa-address-book', function: 'Convert contacts to CSV', isNew: true },
  { id: 'metadata-extractor', name: 'Metadata Extractor', description: 'Extract file metadata', category: 'misc-converters', icon: 'fa-info', function: 'Extract file metadata', isNew: true },
  { id: 'favicon-generator', name: 'Favicon Generator', description: 'Generate website favicons', category: 'misc-converters', icon: 'fa-star', function: 'Generate website favicons', isNew: true },
  { id: 'youtube-timestamp-link', name: 'YouTube Timestamp Link', description: 'Create timestamped YouTube links', category: 'misc-converters', icon: 'fa-youtube', function: 'Create timestamped YouTube links', isNew: true },
  { id: 'link-shortener', name: 'URL Shortener', description: 'Shorten long URLs', category: 'misc-converters', icon: 'fa-link', function: 'Shorten long URLs', isNew: true },
  { id: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare text differences', category: 'misc-converters', icon: 'fa-not-equal', function: 'Compare text differences', isNew: true },
];

export const categories: Category[] = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'EMI, SIP, Investment calculators',
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
    name: 'Math & Numbers',
    description: 'Scientific, Number system converters',
    icon: 'fa-square-root-alt',
    color: 'blue',
    calculators: calculators.filter(c => c.category === 'math')
  },
  {
    id: 'daily',
    name: 'Daily Utilities',
    description: 'Age, Tip, Basic converters',
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
    name: 'Text Converters',
    description: 'Case, Binary, Encryption tools',
    icon: 'fa-font',
    color: 'teal',
    calculators: calculators.filter(c => c.category === 'text-converters')
  },
  {
    id: 'code-converters',
    name: 'Code Converters',
    description: 'JSON, XML, HTML formatters',
    icon: 'fa-code',
    color: 'slate',
    calculators: calculators.filter(c => c.category === 'code-converters')
  },
  {
    id: 'language-converters',
    name: 'Language Tools',
    description: 'Translation, Script converters',
    icon: 'fa-language',
    color: 'emerald',
    calculators: calculators.filter(c => c.category === 'language-converters')
  },
  {
    id: 'ai-converters',
    name: 'AI-Powered Tools',
    description: 'OCR, Speech, AI translation',
    icon: 'fa-robot',
    color: 'violet',
    calculators: calculators.filter(c => c.category === 'ai-converters')
  },
  {
    id: 'misc-converters',
    name: 'Special Tools',
    description: 'ICO, Metadata, URL tools',
    icon: 'fa-tools',
    color: 'rose',
    calculators: calculators.filter(c => c.category === 'misc-converters')
  }
];

export const featuredCalculators = calculators.filter(c => c.featured);

export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find(c => c.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}
