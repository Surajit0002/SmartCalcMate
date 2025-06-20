import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, Upload, Download, FileImage, FileVideo, FileAudio, 
  FileSpreadsheet, FileCode, Zap, Settings, CheckCircle, AlertCircle,
  Trash2, Eye, Share2, Archive, Shield, Scissors, Merge
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
  maxFileSize: string;
}

interface ConversionJob {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  downloadUrl?: string;
  error?: string;
}

const fileConverters: FileConverter[] = [
  // PDF Converters
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable DOCX files',
    fromFormat: ['pdf'],
    toFormat: 'docx',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '10MB'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    fromFormat: ['docx', 'doc'],
    toFormat: 'pdf',
    icon: <FileText className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '10MB'
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    description: 'Extract tables from PDF to Excel spreadsheets',
    fromFormat: ['pdf'],
    toFormat: 'xlsx',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '10MB'
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert PDF pages to PNG/JPG images',
    fromFormat: ['pdf'],
    toFormat: 'png',
    icon: <FileImage className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '20MB'
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Combine multiple images into a single PDF',
    fromFormat: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    toFormat: 'pdf',
    icon: <FileImage className="w-4 h-4" />,
    category: 'pdf',
    maxFileSize: '50MB'
  },

  // Data Converters
  {
    id: 'csv-to-excel',
    name: 'CSV to Excel',
    description: 'Convert CSV files to Excel format with formatting',
    fromFormat: ['csv'],
    toFormat: 'xlsx',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '50MB'
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert tabular CSV data to JSON format',
    fromFormat: ['csv'],
    toFormat: 'json',
    icon: <FileCode className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '25MB'
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON data to CSV format',
    fromFormat: ['json'],
    toFormat: 'csv',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '25MB'
  },
  {
    id: 'xml-to-json',
    name: 'XML to JSON',
    description: 'Convert XML data to JSON format',
    fromFormat: ['xml'],
    toFormat: 'json',
    icon: <FileCode className="w-4 h-4" />,
    category: 'data',
    maxFileSize: '25MB'
  },

  // PDF Tools
  {
    id: 'merge-pdf',
    name: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Merge className="w-4 h-4" />,
    category: 'pdf-tools',
    maxFileSize: '100MB'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Split PDF into separate pages or ranges',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Scissors className="w-4 h-4" />,
    category: 'pdf-tools',
    maxFileSize: '50MB'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Archive className="w-4 h-4" />,
    category: 'pdf-tools',
    maxFileSize: '100MB'
  },
  {
    id: 'remove-pdf-password',
    name: 'Remove PDF Password',
    description: 'Remove password protection from PDF files',
    fromFormat: ['pdf'],
    toFormat: 'pdf',
    icon: <Shield className="w-4 h-4" />,
    category: 'pdf-tools',
    isPro: true,
    maxFileSize: '20MB'
  },
];

const categories = [
  { id: 'pdf', name: 'PDF Converters', icon: <FileText className="w-4 h-4" /> },
  { id: 'data', name: 'Data Converters', icon: <FileSpreadsheet className="w-4 h-4" /> },
  { id: 'pdf-tools', name: 'PDF Tools', icon: <Settings className="w-4 h-4" /> },
];

export default function FileConverterHub() {
  const [activeCategory, setActiveCategory] = useState('pdf');
  const [selectedConverter, setSelectedConverter] = useState<FileConverter | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const categoryConverters = fileConverters.filter(conv => conv.category === activeCategory);

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
        title: "Select a converter first",
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
        title: "Some files were skipped",
        description: `Only ${selectedConverter.fromFormat.join(', ')} files are supported for this converter.`,
        variant: "destructive"
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const simulateConversion = (file: File) => {
    const jobId = Date.now().toString();
    const job: ConversionJob = {
      id: jobId,
      fileName: file.name,
      fromFormat: file.name.split('.').pop()?.toLowerCase() || '',
      toFormat: selectedConverter?.toFormat || '',
      status: 'processing',
      progress: 0
    };

    setConversionJobs(prev => [...prev, job]);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setConversionJobs(prev => prev.map(j => {
        if (j.id === jobId) {
          const newProgress = Math.min(j.progress + Math.random() * 20, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...j,
              status: 'completed',
              progress: 100,
              downloadUrl: `#download-${jobId}`
            };
          }
          return { ...j, progress: newProgress };
        }
        return j;
      }));
    }, 500);
  };

  const startConversion = () => {
    if (!selectedConverter || files.length === 0) {
      toast({
        title: "Missing requirements",
        description: "Please select a converter and upload files.",
        variant: "destructive"
      });
      return;
    }

    files.forEach(file => simulateConversion(file));
    setFiles([]);
    
    toast({
      title: "Conversion started",
      description: `Processing ${files.length} file(s) with ${selectedConverter.name}`,
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearJobs = () => {
    setConversionJobs([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Zap className="w-8 h-8 text-blue-600" />
          File Converter Hub
        </h1>
        <p className="text-muted-foreground">
          Convert between different file formats with advanced processing capabilities
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
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
                  Choose Converter
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
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>{converter.fromFormat.join(', ')} → {converter.toFormat}</span>
                            <span>•</span>
                            <span>Max: {converter.maxFileSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            {selectedConverter && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Files
                    <Badge variant="outline">
                      {selectedConverter.fromFormat.join(', ')} files only
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium">Drop files here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Supports: {selectedConverter.fromFormat.join(', ')} • Max size: {selectedConverter.maxFileSize}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={selectedConverter.fromFormat.map(f => `.${f}`).join(',')}
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {/* Selected Files */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Files ({files.length})</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">{file.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={startConversion}
                    disabled={files.length === 0}
                    className="w-full"
                  >
                    Convert {files.length} File{files.length !== 1 ? 's' : ''}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Conversion Jobs */}
            {conversionJobs.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Conversion Status
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={clearJobs}>
                    Clear All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conversionJobs.map((job) => (
                    <div key={job.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {job.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {job.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                            {job.status === 'processing' && <Settings className="w-4 h-4 animate-spin text-blue-500" />}
                          </div>
                          <span className="text-sm font-medium">{job.fileName}</span>
                          <Badge variant="outline" className="text-xs">
                            {job.fromFormat} → {job.toFormat}
                          </Badge>
                        </div>
                        {job.status === 'completed' && job.downloadUrl && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                      
                      {job.status === 'processing' && (
                        <Progress value={job.progress} className="h-2" />
                      )}
                      
                      {job.error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{job.error}</AlertDescription>
                        </Alert>
                      )}
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