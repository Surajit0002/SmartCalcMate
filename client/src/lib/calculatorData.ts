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

export const calculators: Calculator[] = [
  // Financial Tools
  { id: 'emi', name: 'EMI Calculator', description: 'Calculate loan EMI with charts', category: 'finance', icon: 'fa-calculator', featured: true },
  { id: 'sip', name: 'SIP Calculator', description: 'Systematic investment planning', category: 'finance', icon: 'fa-chart-line', featured: true },
  { id: 'compound-interest', name: 'Compound Interest', description: 'Visualize compound growth', category: 'finance', icon: 'fa-percentage', featured: true },
  { id: 'mortgage', name: 'Mortgage Calculator', description: 'Complete mortgage analysis', category: 'finance', icon: 'fa-home', featured: true },
  { id: 'investment', name: 'Investment Calculator', description: 'Portfolio future projections', category: 'finance', icon: 'fa-chart-area', featured: true },
  { id: 'loan-comparison', name: 'Loan Comparison', description: 'Compare multiple loan offers', category: 'finance', icon: 'fa-balance-scale' },
  { id: 'loan-interest', name: 'Loan Interest', description: 'Calculate interest rates', category: 'finance', icon: 'fa-percent' },
  { id: 'discount-calculator', name: 'Discount Calculator', description: 'Sale price calculations', category: 'finance', icon: 'fa-tags', isNew: true },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Live exchange rates', category: 'finance', icon: 'fa-dollar-sign' },
  { id: 'crypto-converter', name: 'Crypto Converter', description: 'Cryptocurrency conversion', category: 'finance', icon: 'fa-bitcoin', isPro: true },
  { id: 'currency-rate-history', name: 'Currency Rate History', description: 'Historical exchange rates', category: 'finance', icon: 'fa-chart-line', isPro: true },
  { id: 'gold-silver-rate', name: 'Gold & Silver Rate', description: 'Precious metal prices', category: 'finance', icon: 'fa-coins' },

  // Unit Converters
  { id: 'length-converter', name: 'Length Converter', description: 'Meters, feet, inches, etc.', category: 'unit-converters', icon: 'fa-ruler' },
  { id: 'weight-converter', name: 'Weight Converter', description: 'Kg, pounds, stones, etc.', category: 'unit-converters', icon: 'fa-weight' },
  { id: 'temperature-converter', name: 'Temperature Converter', description: 'Celsius, Fahrenheit, Kelvin', category: 'unit-converters', icon: 'fa-thermometer' },
  { id: 'time-converter', name: 'Time Converter', description: 'Hours, minutes, seconds', category: 'unit-converters', icon: 'fa-clock' },
  { id: 'speed-converter', name: 'Speed Converter', description: 'MPH, KPH, knots, etc.', category: 'unit-converters', icon: 'fa-tachometer' },
  { id: 'area-converter', name: 'Area Converter', description: 'Square meters, acres, etc.', category: 'unit-converters', icon: 'fa-expand' },
  { id: 'volume-converter', name: 'Volume Converter', description: 'Liters, gallons, cubic meters', category: 'unit-converters', icon: 'fa-cube' },
  { id: 'data-size-converter', name: 'Data Size Converter', description: 'Bytes, KB, MB, GB, TB', category: 'unit-converters', icon: 'fa-hdd' },
  { id: 'power-converter', name: 'Power Converter', description: 'Watts, HP, kilowatts', category: 'unit-converters', icon: 'fa-bolt' },
  { id: 'pressure-converter', name: 'Pressure Converter', description: 'PSI, bar, pascal, atm', category: 'unit-converters', icon: 'fa-compress' },

  // File Converters
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to DOCX', category: 'file-converters', icon: 'fa-file-word', isPro: true },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables to Excel', category: 'file-converters', icon: 'fa-file-excel', isPro: true },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages to images', category: 'file-converters', icon: 'fa-file-image', isPro: true },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert DOCX to PDF', category: 'file-converters', icon: 'fa-file-pdf' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF', category: 'file-converters', icon: 'fa-file-pdf' },
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Combine images into PDF', category: 'file-converters', icon: 'fa-file-pdf' },
  { id: 'text-to-pdf', name: 'Text to PDF', description: 'Convert text files to PDF', category: 'file-converters', icon: 'fa-file-pdf' },
  { id: 'merge-pdfs', name: 'Merge PDFs', description: 'Combine multiple PDFs', category: 'file-converters', icon: 'fa-object-group' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Split PDF into pages', category: 'file-converters', icon: 'fa-cut' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size', category: 'file-converters', icon: 'fa-compress-alt' },
  { id: 'remove-pdf-password', name: 'Remove PDF Password', description: 'Unlock protected PDFs', category: 'file-converters', icon: 'fa-unlock' },
  { id: 'csv-to-excel', name: 'CSV to Excel', description: 'Convert CSV to XLSX', category: 'file-converters', icon: 'fa-file-excel' },
  { id: 'excel-to-csv', name: 'Excel to CSV', description: 'Convert XLSX to CSV', category: 'file-converters', icon: 'fa-file-csv' },
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV to JSON format', category: 'file-converters', icon: 'fa-code' },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Convert JSON to CSV format', category: 'file-converters', icon: 'fa-table' },
  { id: 'json-to-xml', name: 'JSON ↔ XML', description: 'Convert between JSON and XML', category: 'file-converters', icon: 'fa-exchange' },
  { id: 'docx-to-odt', name: 'DOCX to ODT', description: 'Convert Word to OpenDocument', category: 'file-converters', icon: 'fa-file-alt', isNew: true },

  // Media Converters
  { id: 'video-converter', name: 'Video Converter', description: 'Convert video formats', category: 'media-converters', icon: 'fa-video', isPro: true },
  { id: 'video-to-mp3', name: 'Video to MP3', description: 'Extract audio from video', category: 'media-converters', icon: 'fa-music', isPro: true },
  { id: 'audio-to-mp3', name: 'Audio to MP3/WAV', description: 'Convert audio formats', category: 'media-converters', icon: 'fa-headphones', isPro: true },
  { id: 'mp4-to-gif', name: 'MP4 to GIF', description: 'Convert video to animated GIF', category: 'media-converters', icon: 'fa-gif', isPro: true },
  { id: 'gif-to-mp4', name: 'GIF to MP4', description: 'Convert GIF to video', category: 'media-converters', icon: 'fa-play', isPro: true },
  { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce video file size', category: 'media-converters', icon: 'fa-compress', isPro: true },
  { id: 'audio-compressor', name: 'Audio Compressor', description: 'Compress audio files', category: 'media-converters', icon: 'fa-volume-down', isPro: true },
  { id: 'youtube-to-mp3', name: 'YouTube to MP3', description: 'Download YouTube audio', category: 'media-converters', icon: 'fa-youtube', isPro: true },
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail', description: 'Download video thumbnails', category: 'media-converters', icon: 'fa-image' },

  // AI-Powered Tools
  { id: 'ocr', name: 'OCR (Image to Text)', description: 'Extract text from images', category: 'ai-converters', icon: 'fa-eye', isPro: true },
  { id: 'speech-to-text', name: 'Speech to Text', description: 'Transcribe audio to text', category: 'ai-converters', icon: 'fa-microphone', isPro: true },
  { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text to audio', category: 'ai-converters', icon: 'fa-volume-up', isPro: true },
  { id: 'ai-translator', name: 'AI Translator', description: 'Smart language translation', category: 'ai-converters', icon: 'fa-language', isPro: true },
  { id: 'text-translator', name: 'Text Translator', description: 'Multi-language translation', category: 'ai-converters', icon: 'fa-globe', isPro: true },

  { id: 'code-explainer', name: 'Code to Explanation', description: 'Explain code functionality', category: 'ai-converters', icon: 'fa-lightbulb', isPro: true },
  { id: 'document-summarizer', name: 'Document Summarizer', description: 'AI text summarization', category: 'ai-converters', icon: 'fa-compress-alt', isPro: true },
  { id: 'audio-transcriber', name: 'Audio Transcriber', description: 'Professional transcription', category: 'ai-converters', icon: 'fa-file-audio', isPro: true },

  // Text & Code Tools
  { id: 'text-case-converter', name: 'Text Case Converter', description: 'Upper, lower, title case', category: 'text-converters', icon: 'fa-font' },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse text strings', category: 'text-converters', icon: 'fa-undo' },
  { id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Clean duplicate text', category: 'text-converters', icon: 'fa-filter' },
  { id: 'slug-generator', name: 'Slug Generator', description: 'URL-friendly text', category: 'text-converters', icon: 'fa-link' },
  { id: 'text-capitalizer', name: 'Text Capitalizer', description: 'Smart capitalization', category: 'text-converters', icon: 'fa-font' },
  { id: 'binary-text', name: 'Binary ↔ Text', description: 'Convert text to binary', category: 'text-converters', icon: 'fa-code' },
  { id: 'unicode-ascii', name: 'Unicode ↔ ASCII', description: 'Character encoding conversion', category: 'text-converters', icon: 'fa-keyboard' },
  { id: 'rot13-base64', name: 'ROT13/Base64 Encryptor', description: 'Text encoding/encryption', category: 'text-converters', icon: 'fa-lock' },
  { id: 'html-markdown', name: 'HTML ↔ Markdown', description: 'Convert markup formats', category: 'text-converters', icon: 'fa-code' },
  { id: 'html-css-js-beautifier', name: 'HTML/CSS/JS Beautifier', description: 'Format and beautify code', category: 'text-converters', icon: 'fa-magic' },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', category: 'text-converters', icon: 'fa-database' },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', category: 'text-converters', icon: 'fa-code' },
  { id: 'javascript-obfuscator', name: 'JavaScript Obfuscator', description: 'Obfuscate JS code', category: 'text-converters', icon: 'fa-shield', isPro: true },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', category: 'text-converters', icon: 'fa-search' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'text-converters', icon: 'fa-fingerprint' },
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Create QR codes', category: 'text-converters', icon: 'fa-qrcode' },
  { id: 'qr-reader', name: 'QR Code Reader', description: 'Decode QR codes', category: 'text-converters', icon: 'fa-camera' },
  { id: 'color-picker', name: 'Color Picker & Palette', description: 'Color tools and palettes', category: 'text-converters', icon: 'fa-palette' },
  { id: 'url-shortener', name: 'URL Shortener', description: 'Create short URLs', category: 'text-converters', icon: 'fa-compress' },

  // Specialized Tools
  { id: 'ico-converter', name: 'ICO to PNG / PNG to ICO', description: 'Icon format conversion', category: 'specialized', icon: 'fa-image' },
  { id: 'youtube-timestamp', name: 'YouTube Timestamp Link', description: 'Create timestamped links', category: 'specialized', icon: 'fa-clock' },
  { id: 'font-style-converter', name: 'Font Style Converter', description: 'Unicode text styling', category: 'specialized', icon: 'fa-font' },
  { id: 'script-converter', name: 'Script Converter', description: 'Convert writing scripts', category: 'specialized', icon: 'fa-language' },

  // Mathematical Tools
  { id: 'scientific', name: 'Scientific Calculator', description: 'Advanced math functions', category: 'mathematical', icon: 'fa-calculator' },
  { id: 'percentage', name: 'Percentage Calculator', description: 'All percentage calculations', category: 'mathematical', icon: 'fa-percent' },
  { id: 'binary-decimal-hex', name: 'Binary ↔ Decimal ↔ Hex', description: 'Number system conversion', category: 'mathematical', icon: 'fa-hashtag' },
  { id: 'roman-decimal', name: 'Roman ↔ Decimal', description: 'Roman numeral conversion', category: 'mathematical', icon: 'fa-roman' },

  // Health & Fitness
  { id: 'bmi', name: 'BMI Calculator', description: 'Body mass index calculator', category: 'health', icon: 'fa-weight' },
  { id: 'bmr', name: 'BMR Calculator', description: 'Metabolic rate calculator', category: 'health', icon: 'fa-fire' },
  { id: 'age', name: 'Age Calculator', description: 'Calculate exact age', category: 'health', icon: 'fa-birthday-cake' },

  // Daily Utilities
  { id: 'tip', name: 'Tip Calculator', description: 'Calculate tips and splits', category: 'utility', icon: 'fa-receipt' },

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


  // AI-Enhanced Converters
  { id: 'voice-cloner', name: 'Voice Cloner', description: 'Clone voice patterns', category: 'ai-converters', icon: 'fa-clone', function: 'Clone voice patterns', isNew: true, isPro: true },
  { id: 'pdf-summarizer', name: 'Document Summarizer', description: 'Summarize document content', category: 'ai-converters', icon: 'fa-compress-alt', function: 'Summarize document content', isNew: true, isPro: true },

  // Misc & Special Format Converters
  { id: 'ico-to-png', name: 'ICO to PNG', description: 'Convert ICO to PNG', category: 'misc-converters', icon: 'fa-image', function: 'Convert ICO to PNG', isNew: true },
  { id: 'png-to-ico', name: 'PNG to ICO', description: 'Convert PNG to ICO', category: 'misc-converters', icon: 'fa-image', function: 'Convert PNG to ICO', isNew: true },
  { id: 'vcf-to-csv', name: 'VCF to CSV', description: 'Convert contacts to CSV', category: 'misc-converters', icon: 'fa-address-book', function: 'Convert contacts to CSV', isNew: true },
  { id: 'metadata-extractor', name: 'Metadata Extractor', description: 'Extract file metadata', category: 'misc-converters', icon: 'fa-info', function: 'Extract file metadata', isNew: true },
  { id: 'favicon-generator', name: 'Favicon Generator', description: 'Generate website favicons', category: 'misc-converters', icon: 'fa-star', function: 'Generate website favicons', isNew: true },
  { id: 'youtube-timestamp-link', name: 'YouTube Timestamp Link', description: 'Create timestamped YouTube links', category: 'misc-converters', icon: 'fa-youtube', function: 'Create timestamped YouTube links', isNew: true },
  { id: 'link-shortener', name: 'URL Shortener', description: 'Shorten long URLs', category: 'misc-converters', icon: 'fa-link', function: 'Shorten long URLs', isNew: true },
  { id: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare text differences', category: 'misc-converters', icon: 'fa-not-equal', function: 'Compare text differences', isNew: true },

  // File Converters (15 tools)
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF documents to editable Word files', category: 'file-converters', icon: 'fa-file-word', difficulty: 'medium', rating: 4.5, usageCount: 125000, tags: ['pdf', 'word', 'conversion'], isNew: true },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert DOC/DOCX files to secure PDF format', category: 'file-converters', icon: 'fa-file-pdf', difficulty: 'easy', rating: 4.7, usageCount: 98000, tags: ['word', 'pdf', 'conversion'], isNew: true },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF', category: 'file-converters', icon: 'fa-file-excel', difficulty: 'easy', rating: 4.6, usageCount: 87000, tags: ['excel', 'pdf', 'conversion'], isNew: true },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Export each PDF page as an image', category: 'file-converters', icon: 'fa-image', difficulty: 'easy', rating: 4.5, usageCount: 76000, tags: ['pdf', 'jpg', 'image'], isNew: true },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Combine images into a single PDF', category: 'file-converters', icon: 'fa-file-pdf', difficulty: 'easy', rating: 4.4, usageCount: 65000, tags: ['jpg', 'pdf', 'image'], isNew: true },
  { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce PDF file size without quality loss', category: 'file-converters', icon: 'fa-compress-alt', difficulty: 'medium', rating: 4.6, usageCount: 89000, tags: ['pdf', 'compress', 'size'], isNew: true },
  { id: 'pdf-splitter', name: 'PDF Splitter', description: 'Split large PDFs into separate files', category: 'file-converters', icon: 'fa-cut', difficulty: 'medium', rating: 4.3, usageCount: 54000, tags: ['pdf', 'split', 'separate'], isNew: true },
  { id: 'pdf-merger', name: 'PDF Merger', description: 'Merge multiple PDFs into one document', category: 'file-converters', icon: 'fa-object-group', difficulty: 'easy', rating: 4.7, usageCount: 78000, tags: ['pdf', 'merge', 'combine'], isNew: true },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', description: 'Convert presentations to static PDF', category: 'file-converters', icon: 'fa-file-powerpoint', difficulty: 'easy', rating: 4.2, usageCount: 43000, tags: ['ppt', 'pdf', 'presentation'], isNew: true },
  { id: 'txt-to-pdf', name: 'TXT to PDF', description: 'Turn plain text into printable PDF format', category: 'file-converters', icon: 'fa-file-alt', difficulty: 'easy', rating: 4.1, usageCount: 32000, tags: ['txt', 'pdf', 'text'], isNew: true },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert webpages or code snippets to PDF', category: 'file-converters', icon: 'fa-globe', difficulty: 'medium', rating: 4.4, usageCount: 56000, tags: ['html', 'pdf', 'webpage'], isNew: true },
  { id: 'epub-to-pdf', name: 'Epub to PDF', description: 'Convert eBook files to PDF format', category: 'file-converters', icon: 'fa-book', difficulty: 'medium', rating: 4.0, usageCount: 28000, tags: ['epub', 'pdf', 'ebook'], isNew: true },
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Data transformation for development', category: 'file-converters', icon: 'fa-code', difficulty: 'easy', rating: 4.5, usageCount: 67000, tags: ['csv', 'json', 'data'], isNew: true },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Convert structured JSON into readable spreadsheets', category: 'file-converters', icon: 'fa-table', difficulty: 'medium', rating: 4.3, usageCount: 45000, tags: ['json', 'csv', 'data'], isNew: true },
  { id: 'base64-to-file', name: 'Base64 to File', description: 'Decode Base64 string into download-ready file', category: 'file-converters', icon: 'fa-download', difficulty: 'medium', rating: 4.2, usageCount: 38000, tags: ['base64', 'decode', 'file'], isNew: true },

  // Media Converters (12 tools)
  { id: 'video-to-mp3', name: 'Video to MP3', description: 'Extract audio from video files', category: 'media-converters', icon: 'fa-music', difficulty: 'easy', rating: 4.8, usageCount: 156000, tags: ['video', 'mp3', 'audio'], isNew: true },
  { id: 'mp4-to-webm', name: 'MP4 to WebM', description: 'Convert MP4 to WebM format', category: 'media-converters', icon: 'fa-video', difficulty: 'medium', rating: 4.4, usageCount: 65000, tags: ['mp4', 'webm', 'video'], isNew: true },
  { id: 'mov-to-mp4', name: 'MOV to MP4', description: 'Convert Apple video formats to standard MP4', category: 'media-converters', icon: 'fa-video', difficulty: 'easy', rating: 4.6, usageCount: 89000, tags: ['mov', 'mp4', 'apple'], isNew: true },
  { id: 'audio-converter', name: 'Audio Converter', description: 'Convert MP3, WAV, OGG, etc.', category: 'media-converters', icon: 'fa-headphones', difficulty: 'easy', rating: 4.5, usageCount: 78000, tags: ['audio', 'convert', 'format'], isNew: true },
  { id: 'image-format-converter', name: 'Image Format Converter', description: 'JPG ⇄ PNG ⇄ WebP ⇄ SVG', category: 'media-converters', icon: 'fa-image', difficulty: 'easy', rating: 4.7, usageCount: 134000, tags: ['image', 'format', 'convert'], isNew: true },
  { id: 'gif-to-mp4', name: 'GIF to MP4', description: 'Convert animated GIFs to lightweight MP4', category: 'media-converters', icon: 'fa-play', difficulty: 'medium', rating: 4.3, usageCount: 54000, tags: ['gif', 'mp4', 'animation'], isNew: true },
  { id: 'mp3-to-wav', name: 'MP3 to WAV', description: 'High-quality audio conversion', category: 'media-converters', icon: 'fa-volume-up', difficulty: 'easy', rating: 4.4, usageCount: 67000, tags: ['mp3', 'wav', 'audio'], isNew: true },
  { id: 'image-to-base64', name: 'Image to Base64', description: 'Convert image to Base64 string', category: 'media-converters', icon: 'fa-code', difficulty: 'easy', rating: 4.2, usageCount: 43000, tags: ['image', 'base64', 'encode'], isNew: true },
  { id: 'base64-to-image', name: 'Base64 to Image', description: 'Convert Base64 back to image', category: 'media-converters', icon: 'fa-image', difficulty: 'easy', rating: 4.3, usageCount: 38000, tags: ['base64', 'image', 'decode'], isNew: true },
  { id: 'compress-image', name: 'Compress Image', description: 'Shrink image file size for web use', category: 'media-converters', icon: 'fa-compress', difficulty: 'easy', rating: 4.6, usageCount: 98000, tags: ['image', 'compress', 'optimize'], isNew: true },
  { id: 'resize-image', name: 'Resize Image', description: 'Scale image dimensions', category: 'media-converters', icon: 'fa-expand-arrows-alt', difficulty: 'easy', rating: 4.5, usageCount: 87000, tags: ['image', 'resize', 'scale'], isNew: true },
  { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce size of large video files', category: 'media-converters', icon: 'fa-compress-alt', difficulty: 'medium', rating: 4.4, usageCount: 56000, tags: ['video', 'compress', 'size'], isNew: true },

  // Downloader Tools (12 tools)
  { id: 'youtube-downloader', name: 'YouTube Video Downloader', description: 'Download videos in HD/MP4/MP3 formats', category: 'downloader-tools', icon: 'fa-youtube', difficulty: 'easy', rating: 4.7, usageCount: 189000, tags: ['youtube', 'download', 'video'], isNew: true },
  { id: 'instagram-downloader', name: 'Instagram Reel Downloader', description: 'Save reels to device', category: 'downloader-tools', icon: 'fa-instagram', difficulty: 'easy', rating: 4.5, usageCount: 134000, tags: ['instagram', 'reel', 'download'], isNew: true },
  { id: 'facebook-downloader', name: 'Facebook Video Downloader', description: 'Download Facebook public videos', category: 'downloader-tools', icon: 'fa-facebook', difficulty: 'easy', rating: 4.3, usageCount: 78000, tags: ['facebook', 'video', 'download'], isNew: true },
  { id: 'twitter-downloader', name: 'Twitter Video Downloader', description: 'Extract MP4 from X/Twitter posts', category: 'downloader-tools', icon: 'fa-twitter', difficulty: 'easy', rating: 4.4, usageCount: 89000, tags: ['twitter', 'video', 'download'], isNew: true },
  { id: 'pinterest-downloader', name: 'Pinterest Image Downloader', description: 'Bulk download pins', category: 'downloader-tools', icon: 'fa-pinterest', difficulty: 'medium', rating: 4.2, usageCount: 56000, tags: ['pinterest', 'image', 'download'], isNew: true },
  { id: 'linkedin-downloader', name: 'LinkedIn Video Downloader', description: 'Download professional content', category: 'downloader-tools', icon: 'fa-linkedin', difficulty: 'easy', rating: 4.1, usageCount: 32000, tags: ['linkedin', 'video', 'download'], isNew: true },
  { id: 'soundcloud-downloader', name: 'SoundCloud to MP3', description: 'Convert SoundCloud tracks to MP3', category: 'downloader-tools', icon: 'fa-soundcloud', difficulty: 'easy', rating: 4.4, usageCount: 67000, tags: ['soundcloud', 'mp3', 'download'], isNew: true },
  { id: 'tiktok-downloader', name: 'TikTok Video Downloader', description: 'Save TikTok without watermark', category: 'downloader-tools', icon: 'fa-tiktok', difficulty: 'easy', rating: 4.6, usageCount: 145000, tags: ['tiktok', 'video', 'download'], isNew: true },
  { id: 'vimeo-downloader', name: 'Vimeo Downloader', description: 'Download Vimeo-hosted videos', category: 'downloader-tools', icon: 'fa-vimeo', difficulty: 'easy', rating: 4.2, usageCount: 43000, tags: ['vimeo', 'video', 'download'], isNew: true },
  { id: 'dailymotion-downloader', name: 'Dailymotion Downloader', description: 'Access content from Dailymotion', category: 'downloader-tools', icon: 'fa-video', difficulty: 'easy', rating: 4.0, usageCount: 28000, tags: ['dailymotion', 'video', 'download'], isNew: true },
  { id: 'reddit-downloader', name: 'Reddit Video Downloader', description: 'Fetch video + audio from Reddit posts', category: 'downloader-tools', icon: 'fa-reddit', difficulty: 'medium', rating: 4.3, usageCount: 54000, tags: ['reddit', 'video', 'download'], isNew: true },
  { id: 'url-downloader', name: 'Public URL Downloader', description: 'Generic file downloader from open URLs', category: 'downloader-tools', icon: 'fa-download', difficulty: 'medium', rating: 4.1, usageCount: 38000, tags: ['url', 'download', 'file'], isNew: true },

  // Social Media Tools (10 tools)
  { id: 'instagram-caption-generator', name: 'Instagram Caption Generator', description: 'Auto-generate engaging captions for posts', category: 'social-media-tools', icon: 'fa-instagram', difficulty: 'easy', rating: 4.5, usageCount: 89000, tags: ['instagram', 'caption', 'generator'], isNew: true },
  { id: 'hashtag-generator', name: 'Hashtag Generator', description: 'Suggest trending hashtags for visibility', category: 'social-media-tools', icon: 'fa-hashtag', difficulty: 'easy', rating: 4.4, usageCount: 76000, tags: ['hashtag', 'trending', 'social'], isNew: true },
  { id: 'reels-idea-generator', name: 'Reels Idea Generator', description: 'AI prompts for short-form content creators', category: 'social-media-tools', icon: 'fa-lightbulb', difficulty: 'easy', rating: 4.3, usageCount: 65000, tags: ['reels', 'ideas', 'content'], isNew: true },
  { id: 'twitter-thread-composer', name: 'Twitter Thread Composer', description: 'Write structured, long-form tweets', category: 'social-media-tools', icon: 'fa-twitter', difficulty: 'medium', rating: 4.2, usageCount: 54000, tags: ['twitter', 'thread', 'compose'], isNew: true },
  { id: 'tiktok-bio-generator', name: 'TikTok Bio Link Generator', description: 'Create bio pages for link-in-bio usage', category: 'social-media-tools', icon: 'fa-tiktok', difficulty: 'easy', rating: 4.1, usageCount: 43000, tags: ['tiktok', 'bio', 'link'], isNew: true },
  { id: 'post-scheduler', name: 'Post Scheduler (Prototype)', description: 'Schedule and preview posts for social platforms', category: 'social-media-tools', icon: 'fa-calendar', difficulty: 'advanced', rating: 4.0, usageCount: 32000, tags: ['schedule', 'post', 'social'], isNew: true, isPro: true },
  { id: 'content-calendar-generator', name: 'AI Content Calendar Generator', description: 'Auto-generate post calendars with topics', category: 'social-media-tools', icon: 'fa-calendar-alt', difficulty: 'medium', rating: 4.3, usageCount: 56000, tags: ['calendar', 'content', 'ai'], isNew: true },
  { id: 'facebook-ad-generator', name: 'Facebook Ad Copy Generator', description: 'Create high-conversion ad text', category: 'social-media-tools', icon: 'fa-facebook', difficulty: 'medium', rating: 4.2, usageCount: 47000, tags: ['facebook', 'ad', 'copy'], isNew: true },
  { id: 'youtube-tag-extractor', name: 'YouTube Tag Extractor', description: 'Analyze top videos and pull tags', category: 'social-media-tools', icon: 'fa-youtube', difficulty: 'medium', rating: 4.4, usageCount: 62000, tags: ['youtube', 'tags', 'seo'], isNew: true },
  { id: 'story-viewer-tracker', name: 'Story Viewer Tracker (Safe)', description: 'Track who viewed your public stories', category: 'social-media-tools', icon: 'fa-eye', difficulty: 'easy', rating: 3.9, usageCount: 38000, tags: ['story', 'viewer', 'track'], isNew: true },
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
    id: 'code-converters',
    name: 'Code Converters',
    description: 'JSON, XML, and code format conversion tools',
    icon: 'fa-code',
    color: 'cyan',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    calculators: calculators.filter(c => c.category === 'code-converters'),
    isPopular: false,
    trending: false
  },
  {
    id: 'language-converters',
    name: 'Language & Script',
    description: 'Translation and script conversion tools',
    icon: 'fa-language',
    color: 'lime',
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    calculators: calculators.filter(c => c.category === 'language-converters'),
    isPopular: false,
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
    id: 'misc-converters',
    name: 'Special Tools',
    description: 'ICO, Metadata, URL tools',
    icon: 'fa-tools',
    color: 'rose',
    gradient: 'from-rose-500 via-pink-500 to-red-600',
    calculators: calculators.filter(c => c.category === 'misc-converters')
  },
  {
    id: 'downloader-tools',
    name: 'Downloader Tools',
    description: 'Download content from various platforms in one click',
    icon: 'fa-download',
    color: 'blue',
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    calculators: calculators.filter(c => c.category === 'downloader-tools'),
    isPopular: true,
    trending: true
  },
  {
    id: 'social-media-tools',
    name: 'Social Media Tools',
    description: 'Enhance and manage social media presence effectively',
    icon: 'fa-share-alt',
    color: 'purple',
    gradient: 'from-purple-400 via-pink-500 to-red-500',
    calculators: calculators.filter(c => c.category === 'social-media-tools'),
    isPopular: true,
    trending: true
  }
];

export const featuredCalculators = calculators.filter(c => c.featured);

export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find(c => c.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}
