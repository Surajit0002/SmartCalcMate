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
  { id: 'language-detector', name: 'Language Detector', description: 'Detect text language', category: 'ai-converters', icon: 'fa-search', isPro: true },
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
  { id: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare text differences', category: 'text-converters', icon: 'fa-not-equal' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'text-converters', icon: 'fa-fingerprint' },
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Create QR codes', category: 'text-converters', icon: 'fa-qrcode' },
  { id: 'qr-reader', name: 'QR Code Reader', description: 'Decode QR codes', category: 'text-converters', icon: 'fa-camera' },
  { id: 'color-picker', name: 'Color Picker & Palette', description: 'Color tools and palettes', category: 'text-converters', icon: 'fa-palette' },
  { id: 'url-shortener', name: 'URL Shortener', description: 'Create short URLs', category: 'text-converters', icon: 'fa-compress' },
  { id: 'metadata-extractor', name: 'Metadata Extractor', description: 'Extract file metadata', category: 'text-converters', icon: 'fa-info-circle' },

  // Specialized Tools
  { id: 'ico-converter', name: 'ICO to PNG / PNG to ICO', description: 'Icon format conversion', category: 'specialized', icon: 'fa-image' },
  { id: 'favicon-generator', name: 'Favicon Generator', description: 'Create website favicons', category: 'specialized', icon: 'fa-star' },
  { id: 'vcf-to-csv', name: 'VCF to CSV', description: 'Convert contact files', category: 'specialized', icon: 'fa-address-book' },
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
