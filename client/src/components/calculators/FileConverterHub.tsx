
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, Upload, Download, FileImage, FileVideo, FileAudio, 
  FileSpreadsheet, FileCode, Zap, Settings, CheckCircle, AlertCircle,
  Trash2, Eye, Share2, Archive, Shield, Scissors, Merge, Palette,
  Wand2, Sparkles, Layers, Filter, RotateCcw, Save, Cloud, Star,
  TrendingUp, BarChart3, PieChart, Activity, Maximize2, Minimize2,
  Play, Pause, Volume2, Image, Video, Music, FileType, Cpu, Memory,
  HardDrive, Clock, Users, Globe, Lock, Unlock, Heart, Bookmark
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileConverter {
  id: string;
  name: string;
  description: string;
  fromFormat: string[];
  toFormat: string;
  icon: React.ReactNode;
  category: string;
  isPro?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  maxFileSize: string;
  processingTime: string;
  quality: 'basic' | 'standard' | 'premium' | 'enterprise';
  features: string[];
  gradient: string;
}

interface ConversionJob {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'error' | 'paused';
  progress: number;
  downloadUrl?: string;
  error?: string;
  estimatedTime?: number;
  actualTime?: number;
  fileSize: number;
  outputSize?: number;
  compressionRatio?: number;
  quality: number;
  settings: ConversionSettings;
}

interface ConversionSettings {
  quality: number;
  format: string;
  compression: number;
  preserveMetadata: boolean;
  optimizeSize: boolean;
  enhanceQuality: boolean;
  watermark: boolean;
  password?: string;
  customSettings: Record<string, any>;
}

const fileConverters: FileConverter[] = [
  // PDF Converters - Enhanced
  {
    id: 'pdf-to-word',
    name: 'PDF to Word Pro',
    description: 'Advanced PDF to DOCX conversion with OCR and layout preservation',
    fromFormat: ['pdf'],
    toFormat: 'docx',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '100MB',
    processingTime: '30-60s',
    quality: 'premium',
    isPopular: true,
    features: ['OCR Support', 'Layout Preservation', 'Image Extraction', 'Table Recognition'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF Ultra',
    description: 'Professional Word to PDF conversion with advanced formatting',
    fromFormat: ['docx', 'doc'],
    toFormat: 'pdf',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '50MB',
    processingTime: '15-30s',
    quality: 'standard',
    isPopular: true,
    features: ['Hyperlink Preservation', 'Bookmark Creation', 'Metadata Handling'],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel AI',
    description: 'AI-powered table extraction from PDFs to Excel',
    fromFormat: ['pdf'],
    toFormat: 'xlsx',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '75MB',
    processingTime: '45-90s',
    quality: 'enterprise',
    isPro: true,
    isNew: true,
    features: ['AI Table Detection', 'Smart Formatting', 'Multi-sheet Support'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image Studio',
    description: 'High-quality PDF to image conversion with multiple formats',
    fromFormat: ['pdf'],
    toFormat: 'png',
    icon: <FileImage className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '200MB',
    processingTime: '20-40s',
    quality: 'premium',
    features: ['Multiple Formats', 'DPI Control', 'Batch Processing'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF Merger',
    description: 'Combine multiple images into professional PDFs',
    fromFormat: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'],
    toFormat: 'pdf',
    icon: <FileImage className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '500MB',
    processingTime: '30-60s',
    quality: 'standard',
    isPopular: true,
    features: ['Auto-sizing', 'Page Ordering', 'Compression Options'],
    gradient: 'from-indigo-500 to-blue-500'
  },

  // Data Converters - Enhanced
  {
    id: 'csv-to-excel',
    name: 'CSV to Excel Pro',
    description: 'Advanced CSV to Excel conversion with auto-formatting',
    fromFormat: ['csv', 'tsv'],
    toFormat: 'xlsx',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '100MB',
    processingTime: '15-30s',
    quality: 'premium',
    features: ['Auto-detection', 'Chart Generation', 'Pivot Tables'],
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Transformer',
    description: 'Smart CSV to JSON conversion with schema detection',
    fromFormat: ['csv', 'tsv'],
    toFormat: 'json',
    icon: <FileCode className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '50MB',
    processingTime: '10-20s',
    quality: 'standard',
    isNew: true,
    features: ['Schema Detection', 'Nested Objects', 'Data Validation'],
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV Flattener',
    description: 'Intelligent JSON flattening to CSV format',
    fromFormat: ['json'],
    toFormat: 'csv',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '75MB',
    processingTime: '10-25s',
    quality: 'standard',
    features: ['Smart Flattening', 'Custom Delimiters', 'Header Mapping'],
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    id: 'xml-to-json',
    name: 'XML to JSON Converter',
    description: 'High-performance XML to JSON transformation',
    fromFormat: ['xml'],
    toFormat: 'json',
    icon: <FileCode className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '100MB',
    processingTime: '15-35s',
    quality: 'premium',
    features: ['Namespace Handling', 'Attribute Mapping', 'Validation'],
    gradient: 'from-violet-500 to-purple-500'
  },

  // Media Converters
  {
    id: 'image-optimizer',
    name: 'Image Optimizer Pro',
    description: 'AI-powered image optimization and format conversion',
    fromFormat: ['jpg', 'png', 'gif', 'bmp', 'webp', 'tiff'],
    toFormat: 'webp',
    icon: <Image className="w-4 h-4" />,
    category: 'media',
    maxFileSize: '50MB',
    processingTime: '5-15s',
    quality: 'enterprise',
    isPro: true,
    isNew: true,
    features: ['AI Enhancement', 'Smart Compression', 'Format Detection'],
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'video-thumbnail',
    name: 'Video Thumbnail Generator',
    description: 'Extract high-quality thumbnails from videos',
    fromFormat: ['mp4', 'avi', 'mov', 'mkv'],
    toFormat: 'jpg',
    icon: <Video className="w-4 h-4" />,
    category: 'media',
    maxFileSize: '500MB',
    processingTime: '20-45s',
    quality: 'premium',
    features: ['Multiple Frames', 'Custom Timestamps', 'Batch Export'],
    gradient: 'from-blue-600 to-indigo-600'
  },

  // PDF Tools - Enhanced
  {
    id: 'merge-pdf',
    name: 'PDF Merger Studio',
    description: 'Advanced PDF merging with bookmark preservation',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Merge className="w-4 h-4" />,
    category: 'pdf-tools',
    maxFileSize: '1GB',
    processingTime: '30-90s',
    quality: 'premium',
    isPopular: true,
    features: ['Bookmark Merge', 'Page Ordering', 'Metadata Handling'],
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'split-pdf',
    name: 'PDF Splitter Pro',
    description: 'Intelligent PDF splitting with multiple options',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Scissors className="w-4 h-4" />,
    category: 'pdf-tools',
    maxFileSize: '500MB',
    processingTime: '15-45s',
    quality: 'standard',
    features: ['Page Range', 'Size-based Split', 'Bookmark Split'],
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'compress-pdf',
    name: 'PDF Compressor AI',
    description: 'AI-powered PDF compression with quality preservation',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Archive className="w-4 h-4" />,
    category: 'pdf-tools',
    maxFileSize: '1GB',
    processingTime: '60-180s',
    quality: 'enterprise',
    isPro: true,
    features: ['Smart Compression', 'Quality Control', 'Batch Processing'],
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 'pdf-security',
    name: 'PDF Security Manager',
    description: 'Advanced PDF password and permission management',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Shield className="w-4 h-4" />,
    category: 'pdf-tools',
    maxFileSize: '200MB',
    processingTime: '10-30s',
    quality: 'enterprise',
    isPro: true,
    features: ['Password Protection', 'Permission Control', 'Digital Signatures'],
    gradient: 'from-green-600 to-emerald-600'
  },
];

const categories = [
  { 
    id: 'pdf', 
    name: 'PDF Converters', 
    icon: <FileText className="w-4 h-4" />, 
    color: 'from-blue-500 to-cyan-500',
    description: 'Professional PDF conversion tools'
  },
  { 
    id: 'data', 
    name: 'Data Converters', 
    icon: <FileSpreadsheet className="w-4 h-4" />, 
    color: 'from-green-500 to-emerald-500',
    description: 'Transform data between formats'
  },
  { 
    id: 'media', 
    name: 'Media Tools', 
    icon: <Image className="w-4 h-4" />, 
    color: 'from-purple-500 to-pink-500',
    description: 'Image and video processing'
  },
  { 
    id: 'pdf-tools', 
    name: 'PDF Tools', 
    icon: <Settings className="w-4 h-4" />, 
    color: 'from-orange-500 to-red-500',
    description: 'Advanced PDF manipulation'
  },
];

export default function FileConverterHub() {
  const [activeCategory, setActiveCategory] = useState('pdf');
  const [selectedConverter, setSelectedConverter] = useState<FileConverter | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([]);
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    quality: 85,
    format: '',
    compression: 50,
    preserveMetadata: true,
    optimizeSize: false,
    enhanceQuality: false,
    watermark: false,
    customSettings: {}
  });
  const [dragActive, setDragActive] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [processingStats, setProcessingStats] = useState({
    totalConverted: 1247,
    totalSaved: '2.3GB',
    avgTime: '34s',
    satisfactionRate: 98.5
  });
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const categoryConverters = fileConverters.filter(conv => conv.category === activeCategory);

  useEffect(() => {
    // Trigger animation every 3 seconds
    const interval = setInterval(() => {
      setAnimationTrigger(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    if (!selectedConverter) {
      toast({
        title: "🎯 Select a converter first",
        description: "Please choose a conversion type before uploading files.",
        variant: "destructive"
      });
      return;
    }

    const validFiles = newFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return extension && selectedConverter.fromFormat.includes(extension);
    });

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "⚠️ Some files were skipped",
        description: `Only ${selectedConverter.fromFormat.join(', ')} files are supported for this converter.`,
        variant: "destructive"
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const simulateConversion = (file: File) => {
    const jobId = Date.now().toString();
    const estimatedTime = Math.floor(Math.random() * 60) + 15;
    
    const job: ConversionJob = {
      id: jobId,
      fileName: file.name,
      fromFormat: file.name.split('.').pop()?.toLowerCase() || '',
      toFormat: selectedConverter?.toFormat || '',
      status: 'processing',
      progress: 0,
      fileSize: file.size,
      estimatedTime,
      quality: conversionSettings.quality,
      settings: { ...conversionSettings }
    };

    setConversionJobs(prev => [...prev, job]);

    // Enhanced simulation with realistic progress
    const interval = setInterval(() => {
      setConversionJobs(prev => prev.map(j => {
        if (j.id === jobId) {
          const increment = Math.random() * 15 + 5;
          const newProgress = Math.min(j.progress + increment, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            const outputSize = Math.floor(file.size * (0.3 + Math.random() * 0.5));
            const compressionRatio = ((file.size - outputSize) / file.size * 100);
            
            return {
              ...j,
              status: 'completed',
              progress: 100,
              downloadUrl: `#download-${jobId}`,
              actualTime: estimatedTime + Math.floor(Math.random() * 10 - 5),
              outputSize,
              compressionRatio
            };
          }
          return { ...j, progress: newProgress };
        }
        return j;
      }));
    }, 600);
  };

  const startConversion = () => {
    if (!selectedConverter || files.length === 0) {
      toast({
        title: "❌ Missing requirements",
        description: "Please select a converter and upload files.",
        variant: "destructive"
      });
      return;
    }

    files.forEach(file => simulateConversion(file));
    setFiles([]);
    
    toast({
      title: "🚀 Conversion started",
      description: `Processing ${files.length} file(s) with ${selectedConverter.name}`,
    });
  };

  const pauseJob = (jobId: string) => {
    setConversionJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'processing' ? 'paused' : 'processing' }
        : job
    ));
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearJobs = () => {
    setConversionJobs([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Zap className="w-12 h-12 text-blue-600 animate-pulse" />
              <Sparkles className={`w-6 h-6 text-yellow-500 absolute -top-2 -right-2 transition-transform duration-1000 ${animationTrigger % 2 === 0 ? 'scale-100 rotate-0' : 'scale-125 rotate-180'}`} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              File Converter Hub Pro
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced file conversion with AI-powered processing, professional quality output, and lightning-fast performance
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
            {[
              { label: 'Files Converted', value: processingStats.totalConverted.toLocaleString(), icon: FileText, color: 'text-blue-500' },
              { label: 'Storage Saved', value: processingStats.totalSaved, icon: HardDrive, color: 'text-green-500' },
              { label: 'Avg Time', value: processingStats.avgTime, icon: Clock, color: 'text-purple-500' },
              { label: 'Success Rate', value: `${processingStats.satisfactionRate}%`, icon: TrendingUp, color: 'text-pink-500' }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-0">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-gray-50"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                {category.icon}
              </div>
              <div className="text-center">
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.description}</div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-8">
            {/* Converter Selection */}
            <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                <CardTitle className="flex items-center gap-3 text-xl">
                  {category.icon}
                  Choose Your Converter
                  <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                    {categoryConverters.length} Available
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryConverters.map((converter) => (
                    <div
                      key={converter.id}
                      className={`relative group p-6 border rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                        selectedConverter?.id === converter.id
                          ? `bg-gradient-to-br ${converter.gradient} text-white shadow-2xl scale-105`
                          : 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 border-gray-200'
                      }`}
                      onClick={() => setSelectedConverter(converter)}
                    >
                      {/* Status Badges */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        {converter.isNew && (
                          <Badge className="bg-green-500 text-white text-xs animate-pulse">NEW</Badge>
                        )}
                        {converter.isPro && (
                          <Badge className="bg-purple-500 text-white text-xs">PRO</Badge>
                        )}
                        {converter.isPopular && (
                          <Badge className="bg-orange-500 text-white text-xs">🔥</Badge>
                        )}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${selectedConverter?.id === converter.id ? 'bg-white/20' : `bg-gradient-to-br ${converter.gradient}`} flex-shrink-0`}>
                          <div className={selectedConverter?.id === converter.id ? 'text-white' : 'text-white'}>
                            {converter.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                            {converter.name}
                          </h3>
                          <p className={`text-sm mb-3 ${selectedConverter?.id === converter.id ? 'text-white/90' : 'text-muted-foreground'}`}>
                            {converter.description}
                          </p>
                          
                          {/* Converter Details */}
                          <div className="space-y-2">
                            <div className={`flex items-center gap-2 text-xs ${selectedConverter?.id === converter.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                              <FileType className="w-3 h-3" />
                              <span>{converter.fromFormat.join(', ')} → {converter.toFormat}</span>
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${selectedConverter?.id === converter.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                              <HardDrive className="w-3 h-3" />
                              <span>Max: {converter.maxFileSize}</span>
                              <Clock className="w-3 h-3 ml-2" />
                              <span>{converter.processingTime}</span>
                            </div>
                            
                            {/* Quality Badge */}
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={converter.quality === 'enterprise' ? 'default' : 'secondary'} 
                                className={`text-xs ${
                                  converter.quality === 'enterprise' ? 'bg-purple-600' : 
                                  converter.quality === 'premium' ? 'bg-blue-600' : 'bg-gray-600'
                                }`}
                              >
                                {converter.quality.toUpperCase()}
                              </Badge>
                              {selectedConverter?.id === converter.id && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {converter.features.slice(0, 2).map((feature, idx) => (
                                <span 
                                  key={idx}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    selectedConverter?.id === converter.id 
                                      ? 'bg-white/20 text-white' 
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {feature}
                                </span>
                              ))}
                              {converter.features.length > 2 && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  selectedConverter?.id === converter.id 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  +{converter.features.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* File Upload Section */}
            {selectedConverter && (
              <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <CardTitle className="flex items-center gap-3">
                    <Upload className="w-6 h-6" />
                    Upload & Configure
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {selectedConverter.fromFormat.join(', ')} files only
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Upload Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 ${
                      dragActive
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-4">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${selectedConverter.gradient} flex items-center justify-center transition-transform duration-500 ${dragActive ? 'scale-110' : ''}`}>
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold mb-2">Drop files here or click to browse</p>
                        <p className="text-muted-foreground">
                          Supports: {selectedConverter.fromFormat.map(f => f.toUpperCase()).join(', ')} • Max size: {selectedConverter.maxFileSize}
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className={`bg-gradient-to-r ${selectedConverter.gradient} hover:shadow-lg transition-all duration-300`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={selectedConverter.fromFormat.map(f => `.${f}`).join(',')}
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {/* Conversion Settings */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Settings */}
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Basic Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Quality: {conversionSettings.quality}%</Label>
                          <Slider
                            value={[conversionSettings.quality]}
                            onValueChange={(value) => setConversionSettings(prev => ({ ...prev, quality: value[0] }))}
                            max={100}
                            min={10}
                            step={5}
                            className="mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Compression: {conversionSettings.compression}%</Label>
                          <Slider
                            value={[conversionSettings.compression]}
                            onValueChange={(value) => setConversionSettings(prev => ({ ...prev, compression: value[0] }))}
                            max={95}
                            min={0}
                            step={5}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Advanced Settings */}
                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Wand2 className="w-4 h-4" />
                          Advanced Options
                        </h3>
                        <Switch
                          checked={showAdvanced}
                          onCheckedChange={setShowAdvanced}
                        />
                      </div>
                      
                      {showAdvanced && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Preserve Metadata</Label>
                            <Switch
                              checked={conversionSettings.preserveMetadata}
                              onCheckedChange={(checked) => setConversionSettings(prev => ({ ...prev, preserveMetadata: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Optimize Size</Label>
                            <Switch
                              checked={conversionSettings.optimizeSize}
                              onCheckedChange={(checked) => setConversionSettings(prev => ({ ...prev, optimizeSize: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Enhance Quality</Label>
                            <Switch
                              checked={conversionSettings.enhanceQuality}
                              onCheckedChange={(checked) => setConversionSettings(prev => ({ ...prev, enhanceQuality: checked }))}
                            />
                          </div>
                          {selectedConverter.isPro && (
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Add Watermark</Label>
                              <Switch
                                checked={conversionSettings.watermark}
                                onCheckedChange={(checked) => setConversionSettings(prev => ({ ...prev, watermark: checked }))}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Selected Files */}
                  {files.length > 0 && (
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="font-semibold">Selected Files ({files.length})</Label>
                        <div className="text-sm text-muted-foreground">
                          Total: {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
                        </div>
                      </div>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedConverter.gradient}`}>
                                <FileText className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <span className="font-medium text-sm">{file.name}</span>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                  <Badge variant="secondary">{formatFileSize(file.size)}</Badge>
                                  <span>{file.type}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Convert Button */}
                  <Button
                    onClick={startConversion}
                    disabled={files.length === 0}
                    size="lg"
                    className={`w-full text-lg py-6 bg-gradient-to-r ${selectedConverter.gradient} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:scale-100`}
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Convert {files.length} File{files.length !== 1 ? 's' : ''} with {selectedConverter.name}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Conversion Jobs */}
            {conversionJobs.length > 0 && (
              <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Activity className="w-6 h-6" />
                      Conversion Progress
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {conversionJobs.filter(job => job.status === 'processing').length} Active
                      </Badge>
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={clearJobs} className="bg-white/20 hover:bg-white/30">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Clear All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {conversionJobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {job.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                {job.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                                {job.status === 'processing' && <Settings className="w-5 h-5 animate-spin text-blue-500" />}
                                {job.status === 'paused' && <Pause className="w-5 h-5 text-yellow-500" />}
                              </div>
                              <div>
                                <span className="font-semibold">{job.fileName}</span>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">
                                    {job.fromFormat.toUpperCase()} → {job.toFormat.toUpperCase()}
                                  </Badge>
                                  <span>{formatFileSize(job.fileSize)}</span>
                                  {job.outputSize && (
                                    <>
                                      <span>→ {formatFileSize(job.outputSize)}</span>
                                      <Badge variant="secondary" className="text-xs">
                                        {job.compressionRatio?.toFixed(1)}% saved
                                      </Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {job.status === 'processing' && (
                                <Button size="sm" variant="outline" onClick={() => pauseJob(job.id)}>
                                  <Pause className="w-4 h-4" />
                                </Button>
                              )}
                              {job.status === 'paused' && (
                                <Button size="sm" variant="outline" onClick={() => pauseJob(job.id)}>
                                  <Play className="w-4 h-4" />
                                </Button>
                              )}
                              {job.status === 'completed' && job.downloadUrl && (
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4 mr-1" />
                                    Preview
                                  </Button>
                                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500">
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Share2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {job.status === 'processing' && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress: {Math.round(job.progress)}%</span>
                                <span>Est. {job.estimatedTime}s remaining</span>
                              </div>
                              <Progress value={job.progress} className="h-3" />
                            </div>
                          )}
                          
                          {job.status === 'completed' && (
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Completed in {job.actualTime}s</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>Quality: {job.quality}%</span>
                              </div>
                            </div>
                          )}
                          
                          {job.error && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{job.error}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </CardContent>
                    </Card>
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
