import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, Mic, Volume2, Eye, FileText, Code, Globe, 
  Zap, Upload, Download, Play, Pause, Settings,
  Camera, Languages, MessageSquare, FileAudio,
  Sparkles, Crown, Shield, Wand2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isPro: boolean;
  features: string[];
  inputTypes: string[];
  outputTypes: string[];
  languages?: string[];
}

interface ProcessingJob {
  id: string;
  toolId: string;
  status: 'processing' | 'completed' | 'error';
  progress: number;
  input: string;
  output?: string;
  error?: string;
}

const aiTools: AITool[] = [
  // Vision & OCR
  {
    id: 'ocr',
    name: 'OCR (Image to Text)',
    description: 'Extract text from images with high accuracy using advanced AI',
    icon: <Eye className="w-4 h-4" />,
    category: 'vision',
    isPro: true,
    features: ['Multi-language support', 'Handwriting recognition', 'Table extraction', 'Layout preservation'],
    inputTypes: ['jpg', 'png', 'pdf', 'gif', 'bmp'],
    outputTypes: ['text', 'json', 'csv'],
    languages: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic']
  },
  {
    id: 'document-analyzer',
    name: 'Document Analyzer',
    description: 'Analyze document structure and extract key information',
    icon: <FileText className="w-4 h-4" />,
    category: 'vision',
    isPro: true,
    features: ['Key-value extraction', 'Table detection', 'Form analysis', 'Multi-page support'],
    inputTypes: ['pdf', 'jpg', 'png'],
    outputTypes: ['json', 'csv', 'text']
  },

  // Speech & Audio
  {
    id: 'speech-to-text',
    name: 'Speech to Text',
    description: 'Convert audio recordings to accurate text transcriptions',
    icon: <Mic className="w-4 h-4" />,
    category: 'audio',
    isPro: true,
    features: ['Real-time processing', 'Speaker identification', 'Punctuation', 'Timestamp alignment'],
    inputTypes: ['mp3', 'wav', 'mp4', 'webm', 'm4a'],
    outputTypes: ['text', 'srt', 'vtt', 'json'],
    languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch']
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Generate natural-sounding speech from text input',
    icon: <Volume2 className="w-4 h-4" />,
    category: 'audio',
    isPro: true,
    features: ['Multiple voices', 'Emotion control', 'Speed adjustment', 'SSML support'],
    inputTypes: ['text'],
    outputTypes: ['mp3', 'wav', 'ogg'],
    languages: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese']
  },
  {
    id: 'audio-transcriber',
    name: 'Audio Transcriber',
    description: 'Transcribe interviews, meetings, and podcasts with AI',
    icon: <FileAudio className="w-4 h-4" />,
    category: 'audio',
    isPro: true,
    features: ['Speaker diarization', 'Background noise removal', 'Chapter detection', 'Summary generation'],
    inputTypes: ['mp3', 'wav', 'mp4', 'm4a', 'flac'],
    outputTypes: ['text', 'srt', 'docx', 'pdf']
  },

  // Language & Translation
  {
    id: 'ai-translator',
    name: 'AI Translator',
    description: 'Advanced neural machine translation with context awareness',
    icon: <Languages className="w-4 h-4" />,
    category: 'language',
    isPro: true,
    features: ['Context preservation', 'Tone adaptation', 'Technical terminology', 'Batch processing'],
    inputTypes: ['text', 'docx', 'pdf'],
    outputTypes: ['text', 'docx', 'pdf'],
    languages: ['100+ languages supported']
  },
  {
    id: 'language-detector',
    name: 'Language Detector',
    description: 'Identify languages in text with confidence scores',
    icon: <Globe className="w-4 h-4" />,
    category: 'language',
    isPro: false,
    features: ['Multi-language detection', 'Confidence scoring', 'Dialect identification', 'Code-mixed text'],
    inputTypes: ['text'],
    outputTypes: ['json', 'text']
  },
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: 'Generate concise summaries of long documents',
    icon: <MessageSquare className="w-4 h-4" />,
    category: 'language',
    isPro: true,
    features: ['Extractive & abstractive', 'Length control', 'Key points extraction', 'Multi-document'],
    inputTypes: ['text', 'pdf', 'docx'],
    outputTypes: ['text', 'json', 'pdf']
  },

  // Code & Development
  {
    id: 'code-explainer',
    name: 'Code Explainer',
    description: 'Analyze and explain code functionality in plain language',
    icon: <Code className="w-4 h-4" />,
    category: 'code',
    isPro: true,
    features: ['Multi-language support', 'Documentation generation', 'Complexity analysis', 'Best practices'],
    inputTypes: ['text', 'js', 'py', 'java', 'cpp'],
    outputTypes: ['text', 'md', 'html']
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    description: 'Generate code from natural language descriptions',
    icon: <Wand2 className="w-4 h-4" />,
    category: 'code',
    isPro: true,
    features: ['Multiple languages', 'Framework integration', 'Testing generation', 'Documentation'],
    inputTypes: ['text'],
    outputTypes: ['text', 'js', 'py', 'java', 'cpp']
  },

  // Content & Creative
  {
    id: 'content-enhancer',
    name: 'Content Enhancer',
    description: 'Improve writing style, grammar, and readability',
    icon: <Sparkles className="w-4 h-4" />,
    category: 'content',
    isPro: true,
    features: ['Style adaptation', 'Grammar correction', 'Readability optimization', 'Tone adjustment'],
    inputTypes: ['text', 'docx'],
    outputTypes: ['text', 'docx', 'html']
  }
];

const categories = [
  { id: 'vision', name: 'Vision & OCR', icon: <Eye className="w-4 h-4" /> },
  { id: 'audio', name: 'Speech & Audio', icon: <Mic className="w-4 h-4" /> },
  { id: 'language', name: 'Language Tools', icon: <Languages className="w-4 h-4" /> },
  { id: 'code', name: 'Code Tools', icon: <Code className="w-4 h-4" /> },
  { id: 'content', name: 'Content Tools', icon: <Sparkles className="w-4 h-4" /> },
];

export default function AIConverterHub() {
  const [activeCategory, setActiveCategory] = useState('vision');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [inputText, setInputText] = useState('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([]);
  const [settings, setSettings] = useState({
    language: 'auto',
    outputFormat: 'text',
    quality: 'high',
    preserveFormatting: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const categoryTools = aiTools.filter(tool => tool.category === activeCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedTool) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension && selectedTool.inputTypes.includes(extension)) {
        setInputFile(file);
        toast({
          title: "File uploaded",
          description: `${file.name} is ready for processing`,
        });
      } else {
        toast({
          title: "Unsupported file type",
          description: `Please upload a ${selectedTool.inputTypes.join(', ')} file`,
          variant: "destructive"
        });
      }
    }
  };

  const simulateProcessing = (input: string, toolId: string) => {
    const jobId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const job: ProcessingJob = {
      id: jobId,
      toolId,
      status: 'processing',
      progress: 0,
      input: input.slice(0, 100) + (input.length > 100 ? '...' : '')
    };

    setProcessingJobs(prev => [...prev, job]);

    // Simulate AI processing with realistic timing
    const interval = setInterval(() => {
      setProcessingJobs(prev => prev.map(j => {
        if (j.id === jobId) {
          const increment = Math.random() * 25 + 10; // 10-35% progress per update
          const newProgress = Math.min(j.progress + increment, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...j,
              status: 'completed',
              progress: 100,
              output: generateMockOutput(toolId, input)
            };
          }
          return { ...j, progress: newProgress };
        }
        return j;
      }));
    }, 1200); // Slower updates to simulate AI processing
  };

  const generateMockOutput = (toolId: string, input: string): string => {
    switch (toolId) {
      case 'ocr':
        return `Extracted text from image:\n\n"${input.slice(0, 50)}..." \n\nConfidence: 96.3%\nLanguage: English\nTotal characters: ${Math.floor(Math.random() * 1000) + 200}`;
      
      case 'speech-to-text':
        return `Transcription completed:\n\n"${input}"\n\nDuration: ${Math.floor(Math.random() * 120) + 30}s\nSpeakers detected: ${Math.floor(Math.random() * 3) + 1}\nAccuracy: 94.7%`;
      
      case 'ai-translator':
        return `Translation to ${settings.language}:\n\n"[Translated version of: ${input.slice(0, 100)}...]"\n\nSource language: Auto-detected\nConfidence: 98.1%`;
      
      case 'language-detector':
        return `Language Analysis:\n\nPrimary: English (87.3%)\nSecondary: Spanish (12.7%)\nScript: Latin\nDialect: American English`;
      
      case 'text-summarizer':
        return `Summary:\n\n"This document discusses ${input.slice(0, 30)}... Key points include advanced features, implementation details, and best practices."\n\nOriginal: ${input.length} chars\nSummary: ${Math.floor(input.length * 0.2)} chars\nCompression: 80%`;
      
      case 'code-explainer':
        return `Code Analysis:\n\nThis code appears to be a ${Math.random() > 0.5 ? 'React component' : 'utility function'} that handles ${input.slice(0, 40)}...\n\nComplexity: Medium\nLanguage: JavaScript/TypeScript\nSuggestions: Consider adding error handling and type annotations.`;
      
      default:
        return `AI processing completed for: ${input.slice(0, 100)}...\n\nResult confidence: ${Math.floor(Math.random() * 20) + 80}%\nProcessing time: ${Math.floor(Math.random() * 5) + 1}s`;
    }
  };

  const startProcessing = () => {
    if (!selectedTool) {
      toast({
        title: "Select a tool",
        description: "Please choose an AI tool first",
        variant: "destructive"
      });
      return;
    }

    const input = inputFile ? inputFile.name : inputText;
    if (!input || (selectedTool.inputTypes.includes('text') && !inputText.trim())) {
      toast({
        title: "Missing input",
        description: "Please provide text or upload a file",
        variant: "destructive"
      });
      return;
    }

    simulateProcessing(input, selectedTool.id);
    setInputText('');
    setInputFile(null);
    
    toast({
      title: "Processing started",
      description: `${selectedTool.name} is analyzing your content`,
    });
  };

  const downloadResult = (job: ProcessingJob) => {
    const blob = new Blob([job.output || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-result-${job.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your AI-processed result is downloading",
    });
  };

  const clearJobs = () => {
    setProcessingJobs([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          AI-Powered Converter Hub
        </h1>
        <p className="text-muted-foreground">
          Advanced artificial intelligence tools for content processing and analysis
        </p>
        <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
          <Crown className="w-3 h-3 mr-1" />
          Premium AI Features
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Category Navigation */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">AI Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'ghost'}
                className="w-full justify-start text-sm"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-4 space-y-6">
          {/* Tool Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentCategory?.icon}
                {currentCategory?.name} Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryTools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedTool?.id === tool.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTool(tool)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-sm">{tool.name}</h3>
                          {tool.isPro && (
                            <Badge variant="secondary" className="text-xs">
                              <Crown className="w-3 h-3 mr-1" />
                              PRO
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          {tool.description}
                        </p>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            <strong>Input:</strong> {tool.inputTypes.join(', ')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <strong>Output:</strong> {tool.outputTypes.join(', ')}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {tool.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Processing Interface */}
          {selectedTool && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {selectedTool.name}
                  <Badge variant="outline" className="ml-auto">
                    AI-Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select
                      value={settings.outputFormat}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, outputFormat: value }))}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedTool.outputTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTool.languages && (
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select
                        value={settings.language}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto-detect</SelectItem>
                          {selectedTool.languages.slice(0, 7).map((lang) => (
                            <SelectItem key={lang} value={lang.toLowerCase()}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Quality</Label>
                    <Select
                      value={settings.quality}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, quality: value }))}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High (slower)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="fast">Fast (lower quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Input Methods */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Text Input */}
                  {selectedTool.inputTypes.includes('text') && (
                    <div className="space-y-2">
                      <Label>Text Input</Label>
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={`Enter text for ${selectedTool.name}...`}
                        className="min-h-[150px] text-sm"
                      />
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>File Upload</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-medium mb-1">Upload file for processing</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Supports: {selectedTool.inputTypes.join(', ')}
                      </p>
                      {inputFile ? (
                        <div className="text-sm text-green-600">
                          ✓ {inputFile.name}
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose File
                        </Button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={selectedTool.inputTypes.map(t => `.${t}`).join(',')}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <Button
                  onClick={startProcessing}
                  className="w-full"
                  size="lg"
                  disabled={!inputText.trim() && !inputFile}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Process with AI
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Processing Results */}
          {processingJobs.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  AI Processing Results
                </CardTitle>
                <Button variant="outline" size="sm" onClick={clearJobs}>
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {processingJobs.map((job) => (
                  <div key={job.id} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {job.status === 'processing' && <Brain className="w-4 h-4 animate-pulse text-purple-500" />}
                          {job.status === 'completed' && <Sparkles className="w-4 h-4 text-green-500" />}
                          {job.status === 'error' && <Shield className="w-4 h-4 text-red-500" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {aiTools.find(t => t.id === job.toolId)?.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {job.input}
                          </div>
                        </div>
                      </div>
                      
                      {job.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadResult(job)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                    
                    {job.status === 'processing' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing with AI...</span>
                          <span>{Math.round(job.progress)}%</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                      </div>
                    )}
                    
                    {job.status === 'completed' && job.output && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">AI Result:</Label>
                        <div className="p-3 bg-muted rounded text-sm font-mono max-h-32 overflow-y-auto">
                          {job.output}
                        </div>
                      </div>
                    )}
                    
                    {job.error && (
                      <Alert variant="destructive">
                        <Shield className="h-4 w-4" />
                        <AlertDescription>{job.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}