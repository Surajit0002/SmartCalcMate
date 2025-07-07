import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Type, Code, Hash, Copy, Download, Upload, 
  RotateCcw, Check, AlertCircle, Zap, Crown,
  FileText, Binary, Key, QrCode, Link, Shuffle
} from 'lucide-react';

interface TextTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isPro: boolean;
  isNew?: boolean;
  inputPlaceholder: string;
  features: string[];
}

interface ConversionResult {
  toolId: string;
  input: string;
  output: string;
  timestamp: Date;
  inputLength: number;
  outputLength: number;
}

const textTools: TextTool[] = [
  // Text Case Tools
  {
    id: 'case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases',
    icon: <Type className="w-4 h-4" />,
    category: 'case',
    isPro: false,
    inputPlaceholder: 'Enter text to convert case...',
    features: ['Uppercase', 'Lowercase', 'Title Case', 'Sentence case', 'camelCase', 'snake_case']
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Reverse text, words, or lines',
    icon: <RotateCcw className="w-4 h-4" />,
    category: 'text',
    isPro: false,
    inputPlaceholder: 'Enter text to reverse...',
    features: ['Reverse characters', 'Reverse words', 'Reverse lines', 'Preserve formatting']
  },
  {
    id: 'duplicate-remover',
    name: 'Duplicate Line Remover',
    description: 'Remove duplicate lines from text',
    icon: <FileText className="w-4 h-4" />,
    category: 'text',
    isPro: false,
    inputPlaceholder: 'Enter text with potential duplicates...',
    features: ['Remove exact duplicates', 'Case-insensitive option', 'Preserve order', 'Count duplicates']
  },
  {
    id: 'slug-generator',
    name: 'URL Slug Generator',
    description: 'Generate URL-friendly slugs from text',
    icon: <Link className="w-4 h-4" />,
    category: 'text',
    isPro: false,
    inputPlaceholder: 'Enter text to create URL slug...',
    features: ['URL-safe characters', 'Hyphen separation', 'Lowercase conversion', 'Special char handling']
  },

  // Encoding Tools
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 text',
    icon: <Binary className="w-4 h-4" />,
    category: 'encoding',
    isPro: false,
    inputPlaceholder: 'Enter text or Base64 to encode/decode...',
    features: ['Bidirectional conversion', 'Auto-detection', 'File encoding', 'URL-safe variant']
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URL parameters',
    icon: <Link className="w-4 h-4" />,
    category: 'encoding',
    isPro: false,
    inputPlaceholder: 'Enter URL or text to encode/decode...',
    features: ['Percent encoding', 'Component encoding', 'Full URL encoding', 'Form data encoding']
  },
  {
    id: 'html-encoder',
    name: 'HTML Entity Encoder',
    description: 'Encode/decode HTML entities and special characters',
    icon: <Code className="w-4 h-4" />,
    category: 'encoding',
    isPro: false,
    inputPlaceholder: 'Enter HTML text to encode/decode entities...',
    features: ['Named entities', 'Numeric entities', 'Unicode support', 'Selective encoding']
  },
  {
    id: 'binary-converter',
    name: 'Binary Text Converter',
    description: 'Convert text to binary and vice versa',
    icon: <Binary className="w-4 h-4" />,
    category: 'encoding',
    isPro: true,
    inputPlaceholder: 'Enter text or binary to convert...',
    features: ['Text to binary', 'Binary to text', 'Different separators', 'ASCII/Unicode support']
  },

  // Hash & Crypto Tools
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA1, SHA256 hashes',
    icon: <Hash className="w-4 h-4" />,
    category: 'crypto',
    isPro: true,
    inputPlaceholder: 'Enter text to generate hashes...',
    features: ['MD5 hash', 'SHA1 hash', 'SHA256 hash', 'SHA512 hash', 'File hashing']
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    icon: <Key className="w-4 h-4" />,
    category: 'crypto',
    isPro: false,
    isNew: true,
    inputPlaceholder: 'Configure password options...',
    features: ['Custom length', 'Character sets', 'Exclude similar', 'Multiple passwords']
  },
  {
    id: 'rot13-cipher',
    name: 'ROT13 Cipher',
    description: 'Encode/decode text using ROT13 cipher',
    icon: <Shuffle className="w-4 h-4" />,
    category: 'crypto',
    isPro: false,
    inputPlaceholder: 'Enter text to encode/decode with ROT13...',
    features: ['Bidirectional conversion', 'Preserve non-letters', 'Case sensitivity', 'Custom rotation']
  },

  // Code Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and minify JSON',
    icon: <Code className="w-4 h-4" />,
    category: 'code',
    isPro: false,
    inputPlaceholder: 'Enter JSON to format...',
    features: ['Pretty print', 'Minify', 'Validation', 'Error highlighting', 'Tree view']
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and validate XML documents',
    icon: <Code className="w-4 h-4" />,
    category: 'code',
    isPro: false,
    inputPlaceholder: 'Enter XML to format...',
    features: ['Pretty print', 'Minify', 'Validation', 'Syntax highlighting', 'Namespace support']
  },
  {
    id: 'html-formatter',
    name: 'HTML Formatter',
    description: 'Format and beautify HTML code',
    icon: <Code className="w-4 h-4" />,
    category: 'code',
    isPro: false,
    inputPlaceholder: 'Enter HTML to format...',
    features: ['Pretty print', 'Minify', 'Indentation', 'Tag validation', 'Attribute sorting']
  },
  {
    id: 'css-formatter',
    name: 'CSS Formatter',
    description: 'Format and optimize CSS code',
    icon: <Code className="w-4 h-4" />,
    category: 'code',
    isPro: true,
    inputPlaceholder: 'Enter CSS to format...',
    features: ['Pretty print', 'Minify', 'Property sorting', 'Vendor prefixes', 'Optimization']
  },

  // Generators
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text',
    icon: <QrCode className="w-4 h-4" />,
    category: 'generator',
    isPro: false,
    inputPlaceholder: 'Enter text, URL, or data for QR code...',
    features: ['Custom sizes', 'Error correction', 'Different formats', 'Logo embedding']
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate various types of UUIDs',
    icon: <Hash className="w-4 h-4" />,
    category: 'generator',
    isPro: false,
    inputPlaceholder: 'Generated UUIDs will appear here...',
    features: ['UUID v1', 'UUID v4', 'Bulk generation', 'Timestamp-based', 'Random-based']
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in various formats',
    icon: <FileText className="w-4 h-4" />,
    category: 'generator',
    isPro: false,
    inputPlaceholder: 'Generated lorem ipsum text...',
    features: ['Paragraphs', 'Sentences', 'Words', 'Lists', 'HTML format']
  }
];

export default function TextCodeConverterHub() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState<TextTool | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionHistory, setConversionHistory] = useState<ConversionResult[]>([]);
  const [caseOption, setCaseOption] = useState('uppercase');
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = ['all', 'case', 'text', 'encoding', 'crypto', 'code', 'generator'];

  const filteredTools = activeCategory === 'all' 
    ? textTools 
    : textTools.filter(tool => tool.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'case': return <Type className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'encoding': return <Binary className="w-4 h-4" />;
      case 'crypto': return <Key className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'generator': return <Zap className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  const processText = (toolId: string, input: string, option?: string) => {
    setIsProcessing(true);
    let result = '';

    switch (toolId) {
      case 'case-converter':
        switch (option) {
          case 'uppercase': result = input.toUpperCase(); break;
          case 'lowercase': result = input.toLowerCase(); break;
          case 'title': result = input.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
          case 'sentence': result = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); break;
          case 'camel': result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
            index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''); break;
          case 'snake': result = input.toLowerCase().replace(/\s+/g, '_'); break;
          default: result = input.toUpperCase();
        }
        break;
      
      case 'text-reverser':
        result = input.split('').reverse().join('');
        break;
      
      case 'duplicate-remover':
        const lines = input.split('\n');
        const uniqueLines = [...new Set(lines)];
        result = uniqueLines.join('\n');
        break;
      
      case 'slug-generator':
        result = input
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        break;
      
      case 'base64-encoder':
        try {
          if (input.match(/^[A-Za-z0-9+/]*={0,2}$/)) {
            result = atob(input);
          } else {
            result = btoa(input);
          }
        } catch {
          result = btoa(input);
        }
        break;
      
      case 'url-encoder':
        try {
          if (input.includes('%')) {
            result = decodeURIComponent(input);
          } else {
            result = encodeURIComponent(input);
          }
        } catch {
          result = encodeURIComponent(input);
        }
        break;
      
      case 'html-encoder':
        if (input.includes('&')) {
          result = input
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
        } else {
          result = input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        }
        break;
      
      case 'binary-converter':
        if (input.match(/^[01\s]+$/)) {
          result = input.split(' ').map(bin => 
            String.fromCharCode(parseInt(bin, 2))
          ).join('');
        } else {
          result = input.split('').map(char => 
            char.charCodeAt(0).toString(2).padStart(8, '0')
          ).join(' ');
        }
        break;
      
      case 'rot13-cipher':
        result = input.replace(/[a-zA-Z]/g, (char) => {
          const start = char <= 'Z' ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
        });
        break;
      
      case 'json-formatter':
        try {
          const parsed = JSON.parse(input);
          result = JSON.stringify(parsed, null, 2);
        } catch {
          result = 'Invalid JSON format';
        }
        break;
      
      case 'uuid-generator':
        result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
        break;
      
      case 'lorem-generator':
        const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
        result = Array(50).fill(0).map(() => 
          words[Math.floor(Math.random() * words.length)]
        ).join(' ') + '.';
        break;
      
      default:
        result = 'Conversion not implemented for this tool';
    }

    setTimeout(() => {
      setOutputText(result);
      setIsProcessing(false);
      
      const conversionResult: ConversionResult = {
        toolId,
        input,
        output: result,
        timestamp: new Date(),
        inputLength: input.length,
        outputLength: result.length
      };
      
      setConversionHistory(prev => [conversionResult, ...prev.slice(0, 9)]);
    }, 500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Type className="w-8 h-8" />
          Text & Code Converter Hub
        </h1>
        <p className="text-muted-foreground">Professional text processing, encoding, and code formatting tools</p>
      </div>

      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">Converter Tools</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="history">History ({conversionHistory.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(category)}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => (
              <Card key={tool.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {tool.icon}
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      {tool.isNew && <Badge variant="secondary" className="text-xs">New</Badge>}
                      {tool.isPro && (
                        <Badge variant="default" className="text-xs bg-gradient-to-r from-amber-500 to-orange-500">
                          <Crown className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Features</div>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 3).map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {tool.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tool.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedTool(tool)}
                    className="w-full"
                    disabled={tool.isPro}
                  >
                    {tool.isPro ? 'Pro Feature' : 'Use Tool'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workspace" className="space-y-6">
          {selectedTool ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedTool.icon}
                  {selectedTool.name}
                </CardTitle>
                <p className="text-muted-foreground">{selectedTool.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tool-specific options */}
                {selectedTool.id === 'case-converter' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Case Type</label>
                    <Select value={caseOption} onValueChange={setCaseOption}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uppercase">UPPERCASE</SelectItem>
                        <SelectItem value="lowercase">lowercase</SelectItem>
                        <SelectItem value="title">Title Case</SelectItem>
                        <SelectItem value="sentence">Sentence case</SelectItem>
                        <SelectItem value="camel">camelCase</SelectItem>
                        <SelectItem value="snake">snake_case</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Input</label>
                    <Textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={selectedTool.inputPlaceholder}
                      className="min-h-[200px]"
                    />
                    <div className="text-xs text-muted-foreground mt-2">
                      {inputText.length} characters
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Output</label>
                    <Textarea
                      value={outputText}
                      readOnly
                      className="min-h-[200px] bg-muted"
                    />
                    <div className="text-xs text-muted-foreground mt-2">
                      {outputText.length} characters
                      {outputText && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(outputText)}
                          className="ml-2 h-auto p-1"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => processText(selectedTool.id, inputText, caseOption)}
                    disabled={!inputText || isProcessing}
                    className="flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    Convert
                  </Button>
                  <Button variant="outline" onClick={clearAll}>
                    Clear All
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedTool(null)}>
                    Back to Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <Type className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select a Tool</h3>
              <p className="text-muted-foreground">Choose a converter tool from the Tools tab to get started</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {conversionHistory.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No conversion history</h3>
              <p className="text-muted-foreground">Your conversion history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversionHistory.map((result, index) => {
                const tool = textTools.find(t => t.id === result.toolId);
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {tool?.icon}
                          <div>
                            <div className="font-medium">{tool?.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {result.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(result.output)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedTool(tool || null);
                              setInputText(result.input);
                              setOutputText(result.output);
                            }}
                          >
                            Reopen
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-muted-foreground mb-1">Input ({result.inputLength} chars)</div>
                          <div className="bg-muted p-2 rounded text-xs max-h-20 overflow-auto">
                            {result.input.substring(0, 100)}
                            {result.input.length > 100 && '...'}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Output ({result.outputLength} chars)</div>
                          <div className="bg-muted p-2 rounded text-xs max-h-20 overflow-auto">
                            {result.output.substring(0, 100)}
                            {result.output.length > 100 && '...'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}