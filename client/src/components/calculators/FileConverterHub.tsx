import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, FileImage, FileVideo, FileAudio, File, 
  Upload, Download, Settings, Trash2, Check, 
  AlertCircle, Clock, Zap, Crown, FileSpreadsheet
} from 'lucide-react';

interface FileConversionTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isPro: boolean;
  isNew?: boolean;
  inputFormats: string[];
  outputFormats: string[];
  maxFileSize: string;
  features: string[];
}

interface ConversionJob {
  id: string;
  toolId: string;
  fileName: string;
  inputFormat: string;
  outputFormat: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
  progress: number;
  fileSize: string;
  estimatedTime?: string;
  downloadUrl?: string;
  error?: string;
}

const fileTools: FileConversionTool[] = [
  // PDF Tools
  {
    id: 'pdf-word',
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable Word format',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    isPro: false,
    inputFormats: ['pdf'],
    outputFormats: ['docx', 'doc'],
    maxFileSize: '50MB',
    features: ['Layout preservation', 'Text recognition', 'Image handling', 'Table conversion']
  },
  {
    id: 'word-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    isPro: false,
    inputFormats: ['docx', 'doc'],
    outputFormats: ['pdf'],
    maxFileSize: '100MB',
    features: ['Font embedding', 'High quality', 'Password protection', 'Compression']
  },
  {
    id: 'pdf-excel',
    name: 'PDF to Excel',
    description: 'Extract tables from PDF to Excel spreadsheets',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'pdf',
    isPro: true,
    isNew: true,
    inputFormats: ['pdf'],
    outputFormats: ['xlsx', 'csv'],
    maxFileSize: '30MB',
    features: ['Table detection', 'Data validation', 'Multiple sheets', 'Formula preservation']
  },
  {
    id: 'pdf-image',
    name: 'PDF to Images',
    description: 'Convert PDF pages to high-quality images',
    icon: <FileImage className="w-4 h-4" />,
    category: 'pdf',
    isPro: false,
    inputFormats: ['pdf'],
    outputFormats: ['jpg', 'png', 'tiff', 'webp'],
    maxFileSize: '200MB',
    features: ['Custom DPI', 'Page selection', 'Batch export', 'Transparency support']
  },
  {
    id: 'pdf-merge',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into one',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    isPro: false,
    inputFormats: ['pdf'],
    outputFormats: ['pdf'],
    maxFileSize: '500MB',
    features: ['Drag & drop ordering', 'Bookmark preservation', 'Page range selection', 'Optimization']
  },
  {
    id: 'pdf-split',
    name: 'PDF Splitter',
    description: 'Split PDF into separate pages or ranges',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    isPro: false,
    inputFormats: ['pdf'],
    outputFormats: ['pdf'],
    maxFileSize: '200MB',
    features: ['Page range selection', 'Split by bookmarks', 'Custom naming', 'Batch processing']
  },

  // Image Tools
  {
    id: 'image-converter',
    name: 'Image Format Converter',
    description: 'Convert between all major image formats',
    icon: <FileImage className="w-4 h-4" />,
    category: 'image',
    isPro: false,
    inputFormats: ['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg'],
    outputFormats: ['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg'],
    maxFileSize: '100MB',
    features: ['Quality control', 'Resize options', 'Batch conversion', 'Metadata preservation']
  },
  {
    id: 'image-compress',
    name: 'Image Compressor',
    description: 'Reduce image file size without quality loss',
    icon: <FileImage className="w-4 h-4" />,
    category: 'image',
    isPro: false,
    inputFormats: ['jpg', 'png', 'gif', 'webp'],
    outputFormats: ['jpg', 'png', 'gif', 'webp'],
    maxFileSize: '50MB',
    features: ['Lossless compression', 'Quality presets', 'Size comparison', 'Bulk processing']
  },
  {
    id: 'heic-converter',
    name: 'HEIC to JPG/PNG',
    description: 'Convert Apple HEIC images to standard formats',
    icon: <FileImage className="w-4 h-4" />,
    category: 'image',
    isPro: true,
    inputFormats: ['heic', 'heif'],
    outputFormats: ['jpg', 'png'],
    maxFileSize: '200MB',
    features: ['Metadata preservation', 'Batch conversion', 'Quality control', 'Live photos support']
  },

  // Data Format Tools
  {
    id: 'csv-excel',
    name: 'CSV to Excel',
    description: 'Convert CSV files to Excel spreadsheets',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'data',
    isPro: false,
    inputFormats: ['csv', 'tsv'],
    outputFormats: ['xlsx', 'xls'],
    maxFileSize: '500MB',
    features: ['Auto-detect columns', 'Data types', 'Formatting', 'Multiple sheets']
  },
  {
    id: 'excel-csv',
    name: 'Excel to CSV',
    description: 'Export Excel data to CSV format',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'data',
    isPro: false,
    inputFormats: ['xlsx', 'xls'],
    outputFormats: ['csv', 'tsv'],
    maxFileSize: '1GB',
    features: ['Sheet selection', 'Custom delimiters', 'Encoding options', 'Data validation']
  },
  {
    id: 'json-csv',
    name: 'JSON to CSV',
    description: 'Flatten JSON data into CSV tables',
    icon: <File className="w-4 h-4" />,
    category: 'data',
    isPro: true,
    inputFormats: ['json'],
    outputFormats: ['csv', 'xlsx'],
    maxFileSize: '100MB',
    features: ['Nested object handling', 'Array flattening', 'Custom mapping', 'Data preview']
  }
];

export default function FileConverterHub() {
  const [selectedTool, setSelectedTool] = useState<FileConversionTool | null>(null);
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'pdf', 'image', 'data', 'video', 'audio'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'image': return <FileImage className="w-4 h-4" />;
      case 'video': return <FileVideo className="w-4 h-4" />;
      case 'audio': return <FileAudio className="w-4 h-4" />;
      case 'data': return <FileSpreadsheet className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: ConversionJob['status']) => {
    switch (status) {
      case 'completed': return <Check className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredTools = activeCategory === 'all' 
    ? fileTools 
    : fileTools.filter(tool => tool.category === activeCategory);

  const handleFileUpload = (toolId: string) => {
    const tool = fileTools.find(t => t.id === toolId);
    if (!tool) return;

    // Simulate file upload and conversion
    const newJob: ConversionJob = {
      id: Date.now().toString(),
      toolId,
      fileName: 'example-file.' + tool.inputFormats[0],
      inputFormat: tool.inputFormats[0],
      outputFormat: tool.outputFormats[0],
      status: 'queued',
      progress: 0,
      fileSize: '2.5MB',
      estimatedTime: '30 seconds'
    };

    setConversionJobs(prev => [newJob, ...prev]);

    // Simulate processing
    setTimeout(() => {
      setConversionJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'processing', progress: 25 } : job
      ));
    }, 1000);

    setTimeout(() => {
      setConversionJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, progress: 75 } : job
      ));
    }, 2000);

    setTimeout(() => {
      setConversionJobs(prev => prev.map(job => 
        job.id === newJob.id ? { 
          ...job, 
          status: 'completed', 
          progress: 100,
          downloadUrl: '#'
        } : job
      ));
    }, 3000);
  };

  const removeJob = (jobId: string) => {
    setConversionJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <File className="w-8 h-8" />
          File Converter Hub
        </h1>
        <p className="text-muted-foreground">Convert between 50+ file formats with professional-grade quality</p>
      </div>

      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tools">Conversion Tools</TabsTrigger>
          <TabsTrigger value="queue">Conversion Queue ({conversionJobs.length})</TabsTrigger>
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
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground mb-1">Input Formats</div>
                      <div className="flex flex-wrap gap-1">
                        {tool.inputFormats.slice(0, 3).map(format => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format.toUpperCase()}
                          </Badge>
                        ))}
                        {tool.inputFormats.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{tool.inputFormats.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Output Formats</div>
                      <div className="flex flex-wrap gap-1">
                        {tool.outputFormats.slice(0, 3).map(format => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format.toUpperCase()}
                          </Badge>
                        ))}
                        {tool.outputFormats.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{tool.outputFormats.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Max file size: {tool.maxFileSize}
                  </div>

                  <div className="space-y-2">
                    <Button 
                      onClick={() => handleFileUpload(tool.id)}
                      className="w-full flex items-center gap-2"
                      disabled={tool.isPro}
                    >
                      <Upload className="w-4 h-4" />
                      {tool.isPro ? 'Pro Feature' : 'Upload & Convert'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTool(tool)}
                      className="w-full"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          {conversionJobs.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No conversions yet</h3>
              <p className="text-muted-foreground">Upload files using the conversion tools to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversionJobs.map(job => {
                const tool = fileTools.find(t => t.id === job.toolId);
                return (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(job.status)}
                          <div>
                            <div className="font-medium">{job.fileName}</div>
                            <div className="text-sm text-muted-foreground">
                              {tool?.name} • {job.fileSize}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {job.status === 'completed' && job.downloadUrl && (
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeJob(job.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {job.status === 'processing' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Converting...</span>
                            <span>{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                          {job.estimatedTime && (
                            <div className="text-xs text-muted-foreground">
                              Estimated time: {job.estimatedTime}
                            </div>
                          )}
                        </div>
                      )}

                      {job.status === 'error' && job.error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{job.error}</AlertDescription>
                        </Alert>
                      )}

                      {job.status === 'completed' && (
                        <Alert>
                          <Check className="h-4 w-4" />
                          <AlertDescription>
                            Conversion completed successfully! File is ready for download.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Tool Details Modal/Drawer would go here */}
      {selectedTool && (
        <Card className="fixed inset-4 z-50 overflow-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {selectedTool.icon}
                {selectedTool.name}
              </CardTitle>
              <Button variant="ghost" onClick={() => setSelectedTool(null)}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{selectedTool.description}</p>
            
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {selectedTool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Supported Input Formats</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedTool.inputFormats.map(format => (
                    <Badge key={format} variant="outline">
                      {format.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Output Formats</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedTool.outputFormats.map(format => (
                    <Badge key={format} variant="outline">
                      {format.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}