import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Copy, Download, Upload, Shuffle, Type, Hash, QrCode, 
  Search, Code, Key, Link2, RotateCcw, Filter, Palette 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TextTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const textTools: TextTool[] = [
  {
    id: 'case-converter',
    name: 'Text Case Converter',
    description: 'Convert text to different cases',
    icon: <Type className="w-5 h-5" />,
    category: 'text'
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Reverse text strings',
    icon: <RotateCcw className="w-5 h-5" />,
    category: 'text'
  },
  {
    id: 'duplicate-remover',
    name: 'Remove Duplicate Lines',
    description: 'Remove duplicate lines from text',
    icon: <Filter className="w-5 h-5" />,
    category: 'text'
  },
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    description: 'Generate URL-friendly slugs',
    icon: <Link2 className="w-5 h-5" />,
    category: 'text'
  },
  {
    id: 'binary-text',
    name: 'Binary ↔ Text',
    description: 'Convert between binary and text',
    icon: <Code className="w-5 h-5" />,
    category: 'encoding'
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64',
    icon: <Key className="w-5 h-5" />,
    category: 'encoding'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers',
    icon: <Hash className="w-5 h-5" />,
    category: 'generators'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes',
    icon: <QrCode className="w-5 h-5" />,
    category: 'generators'
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Palette',
    description: 'Color tools and palettes',
    icon: <Palette className="w-5 h-5" />,
    category: 'design'
  }
];

export default function AdvancedTextConverters() {
  const [selectedTool, setSelectedTool] = useState('case-converter');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processText = async (toolId: string, input: string, options?: any) => {
    setIsProcessing(true);
    
    try {
      let result = '';
      
      switch (toolId) {
        case 'case-converter':
          const caseType = options?.caseType || 'uppercase';
          switch (caseType) {
            case 'uppercase':
              result = input.toUpperCase();
              break;
            case 'lowercase':
              result = input.toLowerCase();
              break;
            case 'titlecase':
              result = input.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
              );
              break;
            case 'camelcase':
              result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
                index === 0 ? word.toLowerCase() : word.toUpperCase()
              ).replace(/\s+/g, '');
              break;
            case 'pascalcase':
              result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
                word.toUpperCase()
              ).replace(/\s+/g, '');
              break;
            case 'snakecase':
              result = input.toLowerCase().replace(/\s+/g, '_');
              break;
            case 'kebabcase':
              result = input.toLowerCase().replace(/\s+/g, '-');
              break;
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
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          break;
          
        case 'binary-text':
          if (options?.direction === 'encode') {
            result = input.split('').map(char => 
              char.charCodeAt(0).toString(2).padStart(8, '0')
            ).join(' ');
          } else {
            result = input.split(' ').map(binary => 
              String.fromCharCode(parseInt(binary, 2))
            ).join('');
          }
          break;
          
        case 'base64-encoder':
          if (options?.direction === 'encode') {
            result = btoa(input);
          } else {
            try {
              result = atob(input);
            } catch (e) {
              throw new Error('Invalid Base64 input');
            }
          }
          break;
          
        case 'uuid-generator':
          result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
          break;
          
        case 'qr-generator':
          // QR code generation would typically use a library like qrcode
          result = `QR Code for: "${input}"\n(In a real implementation, this would generate an actual QR code image)`;
          break;
          
        case 'color-picker':
          // Color palette generation
          const baseColor = input || '#3B82F6';
          const colors = generateColorPalette(baseColor);
          result = colors.map(color => `${color.name}: ${color.hex}`).join('\n');
          break;
          
        default:
          result = input;
      }
      
      setOutputText(result);
      
    } catch (error) {
      toast({
        title: 'Processing Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateColorPalette = (baseColor: string) => {
    // Simple color palette generation
    return [
      { name: 'Primary', hex: baseColor },
      { name: 'Light', hex: lightenColor(baseColor, 0.2) },
      { name: 'Dark', hex: darkenColor(baseColor, 0.2) },
      { name: 'Complementary', hex: getComplementaryColor(baseColor) },
      { name: 'Triadic 1', hex: getTriadicColor(baseColor, 120) },
      { name: 'Triadic 2', hex: getTriadicColor(baseColor, 240) }
    ];
  };

  const lightenColor = (color: string, amount: number) => {
    // Simplified color manipulation
    return color; // In real implementation, would use color manipulation library
  };

  const darkenColor = (color: string, amount: number) => {
    return color;
  };

  const getComplementaryColor = (color: string) => {
    return color;
  };

  const getTriadicColor = (color: string, degrees: number) => {
    return color;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Text copied to clipboard'
      });
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy to clipboard',
        variant: 'destructive'
      });
    }
  };

  const downloadResult = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTool}-result.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputText(content);
      };
      reader.readAsText(file);
    }
  };

  const currentTool = textTools.find(tool => tool.id === selectedTool);
  const categories = [...new Set(textTools.map(tool => tool.category))];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Advanced Text & Code Converters</h1>
        <p className="text-xl text-muted-foreground">
          Professional text processing, encoding, and generation tools
        </p>
      </div>

      <Tabs value={selectedTool} onValueChange={setSelectedTool}>
        <div className="mb-6">
          {categories.map(category => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-semibold mb-2 capitalize">{category} Tools</h3>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
                {textTools.filter(tool => tool.category === category).map(tool => (
                  <TabsTrigger key={tool.id} value={tool.id} className="flex items-center gap-2">
                    {tool.icon}
                    <span className="hidden sm:inline">{tool.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          ))}
        </div>

        {textTools.map(tool => (
          <TabsContent key={tool.id} value={tool.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {tool.icon}
                  {tool.name}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tool-specific options */}
                {tool.id === 'case-converter' && (
                  <div className="space-y-2">
                    <Label>Case Type</Label>
                    <Select defaultValue="uppercase">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uppercase">UPPERCASE</SelectItem>
                        <SelectItem value="lowercase">lowercase</SelectItem>
                        <SelectItem value="titlecase">Title Case</SelectItem>
                        <SelectItem value="camelcase">camelCase</SelectItem>
                        <SelectItem value="pascalcase">PascalCase</SelectItem>
                        <SelectItem value="snakecase">snake_case</SelectItem>
                        <SelectItem value="kebabcase">kebab-case</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(tool.id === 'binary-text' || tool.id === 'base64-encoder') && (
                  <div className="space-y-2">
                    <Label>Direction</Label>
                    <Select defaultValue="encode">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="encode">Encode</SelectItem>
                        <SelectItem value="decode">Decode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {tool.id === 'color-picker' && (
                  <div className="space-y-2">
                    <Label>Base Color</Label>
                    <Input
                      type="color"
                      value="#3B82F6"
                      className="w-20 h-10"
                    />
                  </div>
                )}

                {/* Input Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Input Text</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                  <Textarea
                    placeholder={`Enter text for ${tool.name.toLowerCase()}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.csv,.json,.xml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Process Button */}
                <Button
                  onClick={() => processText(tool.id, inputText)}
                  disabled={!inputText.trim() || isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : `Process with ${tool.name}`}
                </Button>

                {/* Output Section */}
                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Result</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(outputText)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadResult}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={outputText}
                      readOnly
                      className="min-h-[120px] font-mono"
                    />
                  </div>
                )}

                {/* Statistics */}
                {outputText && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-3">
                      <div className="text-sm text-muted-foreground">Characters</div>
                      <div className="text-2xl font-bold">{outputText.length}</div>
                    </Card>
                    <Card className="p-3">
                      <div className="text-sm text-muted-foreground">Words</div>
                      <div className="text-2xl font-bold">
                        {outputText.trim() ? outputText.trim().split(/\s+/).length : 0}
                      </div>
                    </Card>
                    <Card className="p-3">
                      <div className="text-sm text-muted-foreground">Lines</div>
                      <div className="text-2xl font-bold">{outputText.split('\n').length}</div>
                    </Card>
                    <Card className="p-3">
                      <div className="text-sm text-muted-foreground">Bytes</div>
                      <div className="text-2xl font-bold">{new Blob([outputText]).size}</div>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}