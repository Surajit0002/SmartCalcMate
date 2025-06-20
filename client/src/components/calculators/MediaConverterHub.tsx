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
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Video, Music, Image, Download, Upload, Play, Pause, 
  Settings, Zap, FileVideo, FileAudio, Camera, Film,
  Scissors, Maximize, Volume2, RotateCcw, Palette,
  Clock, HardDrive, Wifi, Shield, Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaConverter {
  id: string;
  name: string;
  description: string;
  fromFormats: string[];
  toFormats: string[];
  icon: React.ReactNode;
  category: string;
  isPro?: boolean;
  maxFileSize: string;
  features: string[];
}

interface ConversionSettings {
  quality: number;
  format: string;
  resolution?: string;
  bitrate?: number;
  codec?: string;
  frameRate?: number;
  duration?: { start: number; end: number };
  customSettings?: Record<string, any>;
}

interface ConversionJob {
  id: string;
  fileName: string;
  fileSize: number;
  fromFormat: string;
  toFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  settings: ConversionSettings;
  downloadUrl?: string;
  error?: string;
  estimatedTime?: number;
}

const mediaConverters: MediaConverter[] = [
  // Video Converters
  {
    id: 'video-converter',
    name: 'Universal Video Converter',
    description: 'Convert between MP4, AVI, MKV, MOV, and more',
    fromFormats: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', '3gp'],
    toFormats: ['mp4', 'avi', 'mkv', 'mov', 'webm'],
    icon: <Video className="w-4 h-4" />,
    category: 'video',
    maxFileSize: '500MB',
    features: ['Quality Control', 'Resolution Scaling', 'Codec Selection', 'Batch Processing']
  },
  {
    id: 'video-compressor',
    name: 'Video Compressor',
    description: 'Reduce video file size while maintaining quality',
    fromFormats: ['mp4', 'avi', 'mkv', 'mov', 'wmv'],
    toFormats: ['mp4', 'webm'],
    icon: <Maximize className="w-4 h-4" />,
    category: 'video',
    maxFileSize: '1GB',
    features: ['Smart Compression', 'Size Targets', 'Quality Presets', 'Preview']
  },
  {
    id: 'video-to-audio',
    name: 'Video to Audio Extractor',
    description: 'Extract high-quality audio from video files',
    fromFormats: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'],
    toFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac'],
    icon: <Volume2 className="w-4 h-4" />,
    category: 'video',
    maxFileSize: '800MB',
    features: ['Audio Quality Control', 'Format Selection', 'Metadata Preservation']
  },
  {
    id: 'gif-converter',
    name: 'GIF Converter',
    description: 'Convert videos to GIF and GIF to video',
    fromFormats: ['mp4', 'avi', 'mov', 'gif'],
    toFormats: ['gif', 'mp4', 'webm'],
    icon: <Film className="w-4 h-4" />,
    category: 'video',
    maxFileSize: '200MB',
    features: ['Frame Rate Control', 'Size Optimization', 'Color Palette', 'Loop Settings']
  },

  // Audio Converters
  {
    id: 'audio-converter',
    name: 'Universal Audio Converter',
    description: 'Convert between MP3, WAV, AAC, FLAC, and more',
    fromFormats: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'wma', 'm4a', 'opus'],
    toFormats: ['mp3', 'wav', 'aac', 'flac', 'ogg'],
    icon: <Music className="w-4 h-4" />,
    category: 'audio',
    maxFileSize: '200MB',
    features: ['Bitrate Control', 'Sample Rate', 'Metadata Editing', 'Batch Processing']
  },
  {
    id: 'audio-compressor',
    name: 'Audio Compressor',
    description: 'Reduce audio file size with quality control',
    fromFormats: ['wav', 'flac', 'aac', 'mp3'],
    toFormats: ['mp3', 'aac', 'ogg'],
    icon: <HardDrive className="w-4 h-4" />,
    category: 'audio',
    maxFileSize: '300MB',
    features: ['Dynamic Compression', 'Normalization', 'Noise Reduction']
  },
  {
    id: 'audio-merger',
    name: 'Audio Merger',
    description: 'Combine multiple audio files into one',
    fromFormats: ['mp3', 'wav', 'aac', 'flac'],
    toFormats: ['mp3', 'wav', 'aac'],
    icon: <Volume2 className="w-4 h-4" />,
    category: 'audio',
    maxFileSize: '500MB',
    features: ['Crossfade', 'Volume Adjustment', 'Gap Control', 'Format Mixing']
  },

  // Image Converters
  {
    id: 'image-converter',
    name: 'Universal Image Converter',
    description: 'Convert between JPG, PNG, WebP, AVIF, and more',
    fromFormats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg'],
    toFormats: ['jpg', 'png', 'webp', 'avif', 'bmp'],
    icon: <Image className="w-4 h-4" />,
    category: 'image',
    maxFileSize: '50MB',
    features: ['Quality Control', 'Resize', 'Format Optimization', 'Batch Processing']
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Optimize images for web with smart compression',
    fromFormats: ['jpg', 'jpeg', 'png', 'webp'],
    toFormats: ['jpg', 'png', 'webp', 'avif'],
    icon: <Palette className="w-4 h-4" />,
    category: 'image',
    maxFileSize: '100MB',
    features: ['Lossless/Lossy', 'Progressive JPEG', 'WebP Optimization', 'Size Targets']
  },

  // Specialized Converters
  {
    id: 'youtube-downloader',
    name: 'YouTube Downloader',
    description: 'Download YouTube videos and extract audio',
    fromFormats: ['youtube-url'],
    toFormats: ['mp4', 'mp3', 'wav'],
    icon: <Download className="w-4 h-4" />,
    category: 'specialized',
    isPro: true,
    maxFileSize: 'Unlimited',
    features: ['Quality Selection', 'Audio-Only Mode', 'Playlist Support', 'Thumbnail Download']
  },
  {
    id: 'screen-recorder',
    name: 'Screen Recorder',
    description: 'Record screen activity and convert to various formats',
    fromFormats: ['screen-capture'],
    toFormats: ['mp4', 'webm', 'gif'],
    icon: <Camera className="w-4 h-4" />,
    category: 'specialized',
    isPro: true,
    maxFileSize: 'Unlimited',
    features: ['Area Selection', 'Audio Capture', 'Cursor Recording', 'Annotations']
  }
];

const categories = [
  { id: 'video', name: 'Video Tools', icon: <Video className="w-4 h-4" /> },
  { id: 'audio', name: 'Audio Tools', icon: <Music className="w-4 h-4" /> },
  { id: 'image', name: 'Image Tools', icon: <Image className="w-4 h-4" /> },
  { id: 'specialized', name: 'Specialized', icon: <Star className="w-4 h-4" /> },
];

const qualityPresets = {
  video: [
    { name: 'Ultra High (4K)', value: 95, resolution: '3840x2160', bitrate: 20000 },
    { name: 'High (1080p)', value: 85, resolution: '1920x1080', bitrate: 8000 },
    { name: 'Medium (720p)', value: 75, resolution: '1280x720', bitrate: 4000 },
    { name: 'Low (480p)', value: 65, resolution: '854x480', bitrate: 2000 },
    { name: 'Mobile (360p)', value: 55, resolution: '640x360', bitrate: 1000 }
  ],
  audio: [
    { name: 'Studio Quality', value: 95, bitrate: 320 },
    { name: 'High Quality', value: 85, bitrate: 256 },
    { name: 'Standard', value: 75, bitrate: 192 },
    { name: 'Good', value: 65, bitrate: 128 },
    { name: 'Podcast', value: 55, bitrate: 96 }
  ],
  image: [
    { name: 'Maximum', value: 95 },
    { name: 'High', value: 85 },
    { name: 'Medium', value: 75 },
    { name: 'Web Optimized', value: 65 },
    { name: 'Compressed', value: 45 }
  ]
};

export default function MediaConverterHub() {
  const [activeCategory, setActiveCategory] = useState('video');
  const [selectedConverter, setSelectedConverter] = useState<MediaConverter | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([]);
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    quality: 75,
    format: 'mp4'
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const categoryConverters = mediaConverters.filter(conv => conv.category === activeCategory);

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
      return extension && selectedConverter.fromFormats.includes(extension);
    });

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Some files were skipped",
        description: `Only ${selectedConverter.fromFormats.join(', ')} files are supported.`,
        variant: "destructive"
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const simulateConversion = (file: File) => {
    const jobId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const estimatedTime = Math.floor((file.size / 1024 / 1024) * 10); // Rough estimate based on file size
    
    const job: ConversionJob = {
      id: jobId,
      fileName: file.name,
      fileSize: file.size,
      fromFormat: file.name.split('.').pop()?.toLowerCase() || '',
      toFormat: conversionSettings.format,
      status: 'processing',
      progress: 0,
      settings: { ...conversionSettings },
      estimatedTime
    };

    setConversionJobs(prev => [...prev, job]);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setConversionJobs(prev => prev.map(j => {
        if (j.id === jobId) {
          const increment = Math.random() * 15 + 5; // 5-20% progress per update
          const newProgress = Math.min(j.progress + increment, 100);
          
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
    }, 800);
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

    if (!conversionSettings.format || !selectedConverter.toFormats.includes(conversionSettings.format)) {
      toast({
        title: "Invalid format",
        description: "Please select a valid output format.",
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

  const updateSettings = (key: string, value: any) => {
    setConversionSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyQualityPreset = (preset: any) => {
    setConversionSettings(prev => ({
      ...prev,
      quality: preset.value,
      ...(preset.resolution && { resolution: preset.resolution }),
      ...(preset.bitrate && { bitrate: preset.bitrate })
    }));
  };

  const getPresetCategory = () => {
    if (!selectedConverter) return 'video';
    if (selectedConverter.category === 'audio') return 'audio';
    if (selectedConverter.category === 'image') return 'image';
    return 'video';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Video className="w-8 h-8 text-blue-600" />
          Media Converter Hub
        </h1>
        <p className="text-muted-foreground">
          Professional-grade video, audio, and image conversion with advanced controls
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
                  Choose Converter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryConverters.map((converter) => (
                    <div
                      key={converter.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedConverter?.id === converter.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedConverter(converter);
                        setConversionSettings({
                          quality: 75,
                          format: converter.toFormats[0]
                        });
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                          {converter.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{converter.name}</h3>
                            {converter.isPro && (
                              <Badge variant="secondary" className="text-xs">PRO</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {converter.description}
                          </p>
                          <div className="space-y-2">
                            <div className="text-xs text-muted-foreground">
                              <strong>Input:</strong> {converter.fromFormats.join(', ')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <strong>Output:</strong> {converter.toFormats.join(', ')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <strong>Max Size:</strong> {converter.maxFileSize}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {converter.features.slice(0, 3).map((feature, idx) => (
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

            {/* Conversion Settings */}
            {selectedConverter && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Conversion Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Output Format */}
                    <div className="space-y-2">
                      <Label>Output Format</Label>
                      <Select
                        value={conversionSettings.format}
                        onValueChange={(value) => updateSettings('format', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedConverter.toFormats.map((format) => (
                            <SelectItem key={format} value={format}>
                              {format.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Quality */}
                    <div className="space-y-2">
                      <Label>Quality: {conversionSettings.quality}%</Label>
                      <Slider
                        value={[conversionSettings.quality]}
                        onValueChange={(value) => updateSettings('quality', value[0])}
                        max={100}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    {/* Resolution (for video/image) */}
                    {(selectedConverter.category === 'video' || selectedConverter.category === 'image') && (
                      <div className="space-y-2">
                        <Label>Resolution</Label>
                        <Select
                          value={conversionSettings.resolution || 'original'}
                          onValueChange={(value) => updateSettings('resolution', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="original">Original</SelectItem>
                            <SelectItem value="3840x2160">4K (3840x2160)</SelectItem>
                            <SelectItem value="1920x1080">Full HD (1920x1080)</SelectItem>
                            <SelectItem value="1280x720">HD (1280x720)</SelectItem>
                            <SelectItem value="854x480">SD (854x480)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Quality Presets */}
                  <div className="space-y-2">
                    <Label>Quality Presets</Label>
                    <div className="flex flex-wrap gap-2">
                      {qualityPresets[getPresetCategory() as keyof typeof qualityPresets].map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => applyQualityPreset(preset)}
                          className={conversionSettings.quality === preset.value ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                        >
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <Label className="font-semibold">Advanced Settings</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedConverter.category === 'video' && (
                        <>
                          <div className="space-y-2">
                            <Label>Frame Rate (fps)</Label>
                            <Input
                              type="number"
                              placeholder="30"
                              value={conversionSettings.frameRate || ''}
                              onChange={(e) => updateSettings('frameRate', parseInt(e.target.value))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Bitrate (kbps)</Label>
                            <Input
                              type="number"
                              placeholder="4000"
                              value={conversionSettings.bitrate || ''}
                              onChange={(e) => updateSettings('bitrate', parseInt(e.target.value))}
                            />
                          </div>
                        </>
                      )}
                      
                      {selectedConverter.category === 'audio' && (
                        <div className="space-y-2">
                          <Label>Bitrate (kbps)</Label>
                          <Input
                            type="number"
                            placeholder="192"
                            value={conversionSettings.bitrate || ''}
                            onChange={(e) => updateSettings('bitrate', parseInt(e.target.value))}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* File Upload */}
            {selectedConverter && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Files
                    <Badge variant="outline">
                      {selectedConverter.fromFormats.join(', ')} files
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
                    <p className="text-lg font-medium">Drop media files here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Supports: {selectedConverter.fromFormats.join(', ')} • Max size: {selectedConverter.maxFileSize}
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
                    accept={selectedConverter.fromFormats.map(f => `.${f}`).join(',')}
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {/* Selected Files */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Files ({files.length})</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                            <div className="flex items-center gap-3">
                              <FileVideo className="w-5 h-5" />
                              <div>
                                <div className="font-medium text-sm">{file.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <RotateCcw className="w-4 h-4" />
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
                    size="lg"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Convert {files.length} File{files.length !== 1 ? 's' : ''}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Conversion Jobs */}
            {conversionJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Conversion Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conversionJobs.map((job) => (
                    <div key={job.id} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {job.status === 'processing' && <Settings className="w-4 h-4 animate-spin text-blue-500" />}
                            {job.status === 'completed' && <Download className="w-4 h-4 text-green-500" />}
                            {job.status === 'error' && <Shield className="w-4 h-4 text-red-500" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{job.fileName}</div>
                            <div className="text-xs text-muted-foreground">
                              {job.fromFormat} → {job.toFormat} • {formatFileSize(job.fileSize)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {job.status === 'processing' && (
                            <div className="text-sm text-muted-foreground">
                              {Math.round(job.progress)}% • ETA: {formatTime(job.estimatedTime || 0)}
                            </div>
                          )}
                          {job.status === 'completed' && job.downloadUrl && (
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {job.status === 'processing' && (
                        <Progress value={job.progress} className="h-2" />
                      )}
                      
                      {job.error && (
                        <Alert variant="destructive">
                          <Shield className="h-4 w-4" />
                          <AlertDescription>{job.error}</AlertDescription>
                        </Alert>
                      )}

                      {/* Conversion Settings Summary */}
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        Quality: {job.settings.quality}% • 
                        {job.settings.resolution && ` Resolution: ${job.settings.resolution} •`}
                        {job.settings.bitrate && ` Bitrate: ${job.settings.bitrate}kbps •`}
                        {job.settings.frameRate && ` FPS: ${job.settings.frameRate}`}
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