import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Type, Code, FileText, Hash, Copy, RotateCcw, 
  Eye, Download, Upload, Zap, Shield, Link,
  ArrowUpDown, Binary, Globe, QrCode, Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TextConverter {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isPro?: boolean;
}

interface ConversionResult {
  original: string;
  converted: string;
  stats?: {
    characters: number;
    words: number;
    lines: number;
  };
}

const textConverters: TextConverter[] = [
  // Text Case Converters
  {
    id: 'text-case',
    name: 'Text Case Converter',
    description: 'Convert text between different cases',
    icon: <Type className="w-4 h-4" />,
    category: 'text'
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Reverse text strings character by character',
    icon: <RotateCcw className="w-4 h-4" />,
    category: 'text'
  },
  {
    id: 'text-capitalizer',
    name: 'Text Capitalizer',
    description: 'Capitalize text with various options',
    icon: <Type className="w-4 h-4" />,
    category: 'text'
  },
  {
    id: 'remove-lines',
    name: 'Remove Duplicate Lines',
    description: 'Remove duplicate lines from text',
    icon: <FileText className="w-4 h-4" />,
    category: 'text'
  },
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    description: 'Generate URL-friendly slugs from text',
    icon: <Link className="w-4 h-4" />,
    category: 'text'
  },

  // Encoding/Encryption
  {
    id: 'binary-text',
    name: 'Binary ↔ Text',
    description: 'Convert between binary and text',
    icon: <Binary className="w-4 h-4" />,
    category: 'encoding'
  },
  {
    id: 'text-encryptor',
    name: 'ROT13 / Base64 Encryptor',
    description: 'Encrypt and decrypt text using various methods',
    icon: <Shield className="w-4 h-4" />,
    category: 'encoding'
  },
  {
    id: 'unicode-converter',
    name: 'Unicode ↔ ASCII',
    description: 'Convert between Unicode and ASCII',
    icon: <Globe className="w-4 h-4" />,
    category: 'encoding'
  },

  // Code Tools
  {
    id: 'json-xml',
    name: 'JSON ↔ XML',
    description: 'Convert between JSON and XML formats',
    icon: <Code className="w-4 h-4" />,
    category: 'code'
  },
  {
    id: 'json-csv',
    name: 'JSON ↔ CSV',
    description: 'Convert between JSON and CSV formats',
    icon: <Code className="w-4 h-4" />,
    category: 'code'
  },
  {
    id: 'html-markdown',
    name: 'HTML ↔ Markdown',
    description: 'Convert between HTML and Markdown',
    icon: <Code className="w-4 h-4" />,
    category: 'code'
  },
  {
    id: 'code-beautifier',
    name: 'Code Beautifier',
    description: 'Format and beautify HTML/CSS/JS code',
    icon: <Code className="w-4 h-4" />,
    category: 'code'
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and prettify SQL queries',
    icon: <Code className="w-4 h-4" />,
    category: 'code'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and validate regular expressions',
    icon: <Search className="w-4 h-4" />,
    category: 'code'
  },

  // Generators
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text',
    icon: <QrCode className="w-4 h-4" />,
    category: 'generators'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers',
    icon: <Hash className="w-4 h-4" />,
    category: 'generators'
  },
];

const categories = [
  { id: 'text', name: 'Text Tools', icon: <Type className="w-4 h-4" /> },
  { id: 'encoding', name: 'Encoding/Crypto', icon: <Shield className="w-4 h-4" /> },
  { id: 'code', name: 'Code Tools', icon: <Code className="w-4 h-4" /> },
  { id: 'generators', name: 'Generators', icon: <Zap className="w-4 h-4" /> },
];

export default function TextCodeConverterHub() {
  const [activeCategory, setActiveCategory] = useState('text');
  const [selectedConverter, setSelectedConverter] = useState<TextConverter | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionOptions, setConversionOptions] = useState<Record<string, any>>({});
  const [conversionHistory, setConversionHistory] = useState<ConversionResult[]>([]);
  const { toast } = useToast();

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const categoryConverters = textConverters.filter(conv => conv.category === activeCategory);

  const performConversion = () => {
    if (!selectedConverter || !inputText.trim()) {
      toast({
        title: "Missing input",
        description: "Please select a converter and enter text to convert.",
        variant: "destructive"
      });
      return;
    }

    let result = '';
    const text = inputText.trim();

    switch (selectedConverter.id) {
      case 'text-case':
        result = convertTextCase(text, conversionOptions.caseType || 'uppercase');
        break;
      
      case 'text-reverser':
        result = text.split('').reverse().join('');
        break;
      
      case 'text-capitalizer':
        result = capitalizeText(text, conversionOptions.capitalizeType || 'sentence');
        break;
      
      case 'remove-lines':
        result = removeDuplicateLines(text);
        break;
      
      case 'slug-generator':
        result = generateSlug(text);
        break;
      
      case 'binary-text':
        result = conversionOptions.direction === 'toBinary' 
          ? textToBinary(text) 
          : binaryToText(text);
        break;
      
      case 'text-encryptor':
        result = encryptText(text, conversionOptions.method || 'base64');
        break;
      
      case 'unicode-converter':
        result = conversionOptions.direction === 'toUnicode'
          ? textToUnicode(text)
          : unicodeToText(text);
        break;
      
      case 'json-xml':
        result = conversionOptions.direction === 'toXML'
          ? jsonToXml(text)
          : xmlToJson(text);
        break;
      
      case 'json-csv':
        result = conversionOptions.direction === 'toCSV'
          ? jsonToCsv(text)
          : csvToJson(text);
        break;
      
      case 'html-markdown':
        result = conversionOptions.direction === 'toMarkdown'
          ? htmlToMarkdown(text)
          : markdownToHtml(text);
        break;
      
      case 'code-beautifier':
        result = beautifyCode(text, conversionOptions.language || 'javascript');
        break;
      
      case 'sql-formatter':
        result = formatSql(text);
        break;
      
      case 'regex-tester':
        result = testRegex(text, conversionOptions.testString || '');
        break;
      
      case 'qr-generator':
        result = `QR Code generated for: "${text.slice(0, 50)}${text.length > 50 ? '...' : ''}"`;
        break;
      
      case 'uuid-generator':
        result = generateUUID();
        break;
      
      default:
        result = 'Conversion not implemented yet';
    }

    setOutputText(result);
    
    const conversionResult: ConversionResult = {
      original: text,
      converted: result,
      stats: {
        characters: text.length,
        words: text.split(/\s+/).filter(w => w.length > 0).length,
        lines: text.split('\n').length
      }
    };
    
    setConversionHistory(prev => [conversionResult, ...prev.slice(0, 4)]);
    
    toast({
      title: "Conversion completed",
      description: `${selectedConverter.name} conversion successful`,
    });
  };

  // Conversion functions
  const convertTextCase = (text: string, type: string): string => {
    switch (type) {
      case 'uppercase': return text.toUpperCase();
      case 'lowercase': return text.toLowerCase();
      case 'capitalize': return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      case 'title': return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      case 'camel': return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
      case 'snake': return text.toLowerCase().replace(/\s+/g, '_');
      case 'kebab': return text.toLowerCase().replace(/\s+/g, '-');
      default: return text;
    }
  };

  const capitalizeText = (text: string, type: string): string => {
    switch (type) {
      case 'sentence': return text.charAt(0).toUpperCase() + text.slice(1);
      case 'word': return text.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      case 'alternate': return text.split('').map((char, index) => 
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('');
      default: return text;
    }
  };

  const removeDuplicateLines = (text: string): string => {
    const lines = text.split('\n');
    const uniqueLines = Array.from(new Set(lines));
    return uniqueLines.join('\n');
  };

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const textToBinary = (text: string): string => {
    return text.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  };

  const binaryToText = (binary: string): string => {
    try {
      return binary.split(' ').map(bin => 
        String.fromCharCode(parseInt(bin, 2))).join('');
    } catch {
      return 'Invalid binary format';
    }
  };

  const encryptText = (text: string, method: string): string => {
    switch (method) {
      case 'base64':
        return btoa(text);
      case 'rot13':
        return text.replace(/[a-zA-Z]/g, char => 
          String.fromCharCode(((char.charCodeAt(0) - 65 + 13) % 26) + 65));
      case 'reverse':
        return text.split('').reverse().join('');
      default:
        return text;
    }
  };

  const textToUnicode = (text: string): string => {
    return text.split('').map(char => 
      '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join('');
  };

  const unicodeToText = (unicode: string): string => {
    try {
      return unicode.replace(/\\u[\dA-F]{4}/gi, match => 
        String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)));
    } catch {
      return 'Invalid Unicode format';
    }
  };

  const jsonToXml = (json: string): string => {
    try {
      const obj = JSON.parse(json);
      return `<xml>${JSON.stringify(obj)}</xml>`;
    } catch {
      return 'Invalid JSON format';
    }
  };

  const xmlToJson = (xml: string): string => {
    return JSON.stringify({ xml: xml.trim() }, null, 2);
  };

  const jsonToCsv = (json: string): string => {
    try {
      const data = JSON.parse(json);
      if (Array.isArray(data) && data.length > 0) {
        const headers = Object.keys(data[0]);
        const csv = [
          headers.join(','),
          ...data.map(row => headers.map(header => row[header]).join(','))
        ];
        return csv.join('\n');
      }
      return 'JSON must be an array of objects';
    } catch {
      return 'Invalid JSON format';
    }
  };

  const csvToJson = (csv: string): string => {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return 'CSV must have header and data rows';
    
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || '';
        return obj;
      }, {} as any);
    });
    
    return JSON.stringify(data, null, 2);
  };

  const htmlToMarkdown = (html: string): string => {
    return html
      .replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (_, level, text) => '#'.repeat(parseInt(level)) + ' ' + text)
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
      .replace(/<p>(.*?)<\/p>/g, '$1\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]*>/g, '');
  };

  const markdownToHtml = (markdown: string): string => {
    return markdown
      .replace(/^#{6}\s(.+)/gm, '<h6>$1</h6>')
      .replace(/^#{5}\s(.+)/gm, '<h5>$1</h5>')
      .replace(/^#{4}\s(.+)/gm, '<h4>$1</h4>')
      .replace(/^#{3}\s(.+)/gm, '<h3>$1</h3>')
      .replace(/^#{2}\s(.+)/gm, '<h2>$1</h2>')
      .replace(/^#{1}\s(.+)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br>');
  };

  const beautifyCode = (code: string, language: string): string => {
    // Simple code formatting
    if (language === 'json') {
      try {
        return JSON.stringify(JSON.parse(code), null, 2);
      } catch {
        return 'Invalid JSON';
      }
    }
    return code.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/g, '\n}');
  };

  const formatSql = (sql: string): string => {
    return sql
      .replace(/\b(SELECT|FROM|WHERE|ORDER BY|GROUP BY|HAVING|INSERT|UPDATE|DELETE)\b/gi, '\n$1')
      .replace(/,/g, ',\n')
      .trim();
  };

  const testRegex = (pattern: string, testString: string): string => {
    try {
      const regex = new RegExp(pattern, 'g');
      const matches = testString.match(regex);
      return matches ? `Matches found: ${matches.join(', ')}` : 'No matches found';
    } catch {
      return 'Invalid regex pattern';
    }
  };

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully",
      });
    });
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setConversionHistory([]);
  };

  const renderConverterOptions = () => {
    if (!selectedConverter) return null;

    switch (selectedConverter.id) {
      case 'text-case':
        return (
          <Select
            value={conversionOptions.caseType || 'uppercase'}
            onValueChange={(value) => setConversionOptions(prev => ({ ...prev, caseType: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
              <SelectItem value="capitalize">Capitalize</SelectItem>
              <SelectItem value="title">Title Case</SelectItem>
              <SelectItem value="camel">camelCase</SelectItem>
              <SelectItem value="snake">snake_case</SelectItem>
              <SelectItem value="kebab">kebab-case</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'text-capitalizer':
        return (
          <Select
            value={conversionOptions.capitalizeType || 'sentence'}
            onValueChange={(value) => setConversionOptions(prev => ({ ...prev, capitalizeType: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sentence">Sentence case</SelectItem>
              <SelectItem value="word">Word Case</SelectItem>
              <SelectItem value="alternate">aLtErNaTe CaSe</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'binary-text':
        return (
          <Select
            value={conversionOptions.direction || 'toBinary'}
            onValueChange={(value) => setConversionOptions(prev => ({ ...prev, direction: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toBinary">Text to Binary</SelectItem>
              <SelectItem value="toText">Binary to Text</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'text-encryptor':
        return (
          <Select
            value={conversionOptions.method || 'base64'}
            onValueChange={(value) => setConversionOptions(prev => ({ ...prev, method: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base64">Base64 Encode</SelectItem>
              <SelectItem value="rot13">ROT13</SelectItem>
              <SelectItem value="reverse">Reverse Text</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'regex-tester':
        return (
          <Input
            placeholder="Test string"
            value={conversionOptions.testString || ''}
            onChange={(e) => setConversionOptions(prev => ({ ...prev, testString: e.target.value }))}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Type className="w-8 h-8 text-blue-600" />
          Text & Code Converter Hub
        </h1>
        <p className="text-muted-foreground">
          Advanced text processing, encoding, and code formatting tools
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            {/* Converter Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  Choose Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryConverters.map((converter) => (
                    <div
                      key={converter.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedConverter?.id === converter.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedConverter(converter)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                          {converter.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm">{converter.name}</h3>
                            {converter.isPro && (
                              <Badge variant="secondary" className="text-xs">PRO</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {converter.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Interface */}
            {selectedConverter && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {renderConverterOptions()}
                    
                    <div className="space-y-2">
                      <Label>Input Text</Label>
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={`Enter text for ${selectedConverter.name}...`}
                        className="min-h-[200px] font-mono text-sm"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={performConversion} className="flex-1">
                        <Zap className="w-4 h-4 mr-2" />
                        Convert
                      </Button>
                      <Button variant="outline" onClick={clearAll}>
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Output */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Output
                      </div>
                      {outputText && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(outputText)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Converted Text</Label>
                      <Textarea
                        value={outputText}
                        readOnly
                        placeholder="Converted text will appear here..."
                        className="min-h-[200px] font-mono text-sm bg-muted"
                      />
                    </div>

                    {conversionHistory.length > 0 && conversionHistory[0].stats && (
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 bg-muted rounded">
                          <div className="text-lg font-bold">{conversionHistory[0].stats.characters}</div>
                          <div className="text-xs text-muted-foreground">Characters</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-lg font-bold">{conversionHistory[0].stats.words}</div>
                          <div className="text-xs text-muted-foreground">Words</div>
                        </div>
                        <div className="p-2 bg-muted rounded">
                          <div className="text-lg font-bold">{conversionHistory[0].stats.lines}</div>
                          <div className="text-xs text-muted-foreground">Lines</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Conversion History */}
            {conversionHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Recent Conversions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conversionHistory.map((result, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Conversion #{conversionHistory.length - index}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(result.converted)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Original</Label>
                          <div className="p-2 bg-muted rounded font-mono text-xs max-h-20 overflow-y-auto">
                            {result.original.slice(0, 100)}
                            {result.original.length > 100 && '...'}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Converted</Label>
                          <div className="p-2 bg-muted rounded font-mono text-xs max-h-20 overflow-y-auto">
                            {result.converted.slice(0, 100)}
                            {result.converted.length > 100 && '...'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}