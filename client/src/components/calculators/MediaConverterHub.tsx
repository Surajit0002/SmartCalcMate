import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Video, Music, FileImage, Upload, Download, Settings2, 
  Play, Pause, Volume2, Scissors, Merge, Archive,
  RotateCcw, Crop, Zap, Crown, Monitor, Smartphone,
  Headphones, Camera, Film, AudioLines
} from 'lucide-react';

interface MediaTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'video' | 'audio' | 'image';
  isPro: boolean;
  isNew?: boolean;
  inputFormats: string[];
  outputFormats: string[];
  features: string[];
  presets: string[];
}

interface ProcessingJob {
  id: string;
  toolId: string;
  fileName: string;
  inputFormat: string;
  outputFormat: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
  progress: number;
  fileSize: string;
  settings: Record<string, any>;
  outputFileSize?: string;
  compressionRatio?: number;
}

const mediaTools: MediaTool[] = [
  // Video Tools
  {
    id: 'video-converter',
    name: 'Video Format Converter',
    description: 'Convert between all major video formats with quality control',
    icon: <Video className="w-4 h-4" />,
    category: 'video',
    isPro: false,
    inputFormats: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'm4v'],
    outputFormats: ['mp4', 'avi', 'mkv', 'mov', 'webm', 'gif'],
    features: ['H.264/H.265 encoding', 'Quality presets', 'Resolution scaling', 'Bitrate control'],
    presets: ['High Quality', 'Medium Quality', 'Small File', 'Web Optimized', 'Mobile', '4K']
  },
  {
    id: 'video-compressor',
    name: 'Video Compressor',
    description: 'Reduce video file size while maintaining quality',
    icon: <Archive className="w-4 h-4" />,
    category: 'video',
    isPro: false,
    inputFormats: ['mp4', 'avi', 'mkv', 'mov', 'wmv'],
    outputFormats: ['mp4', 'webm'],
    features: ['Smart compression', 'Preview comparison', 'Size targets', 'Batch processing'],
    presets: ['Ultra Compression', 'High Compression', 'Balanced', 'Light Compression']
  },
  {
    id: 'video-audio-extractor',
    name: 'Audio from Video',
    description: 'Extract audio tracks from video files',
    icon: <AudioLines className="w-4 h-4" />,
    category: 'video',
    isPro: false,
    inputFormats: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'],
    outputFormats: ['mp3', 'wav', 'aac', 'flac', 'ogg'],
    features: ['High quality extraction', 'Multiple audio tracks', 'Format selection', 'Metadata preservation'],
    presets: ['High Quality MP3', 'CD Quality WAV', 'Compressed AAC', 'Lossless FLAC']
  },
  {
    id: 'video-gif-maker',
    name: 'Video to GIF',
    description: 'Create animated GIFs from video clips',
    icon: <Film className="w-4 h-4" />,
    category: 'video',
    isPro: true,
    isNew: true,
    inputFormats: ['mp4', 'avi', 'mov', 'mkv', 'webm'],
    outputFormats: ['gif', 'webp'],
    features: ['Time range selection', 'Frame rate control', 'Size optimization', 'Quality settings'],
    presets: ['Social Media', 'High Quality', 'Small Size', 'Smooth Animation']
  },
  {
    id: 'video-editor',
    name: 'Basic Video Editor',
    description: 'Trim, crop, and rotate video files',
    icon: <Scissors className="w-4 h-4" />,
    category: 'video',
    isPro: true,
    inputFormats: ['mp4', 'avi', 'mov', 'mkv'],
    outputFormats: ['mp4', 'mov'],
    features: ['Trim clips', 'Crop video', 'Rotate/flip', 'Speed control'],
    presets: ['1080p Export', '720p Export', 'Mobile Export', 'Web Export']
  },

  // Audio Tools
  {
    id: 'audio-converter',
    name: 'Audio Format Converter',
    description: 'Convert between all popular audio formats',
    icon: <Music className="w-4 h-4" />,
    category: 'audio',
    isPro: false,
    inputFormats: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a', 'aiff'],
    outputFormats: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'],
    features: ['Lossless conversion', 'Bitrate control', 'Metadata preservation', 'Batch processing'],
    presets: ['High Quality MP3', 'CD Quality', 'Podcast', 'Streaming', 'Archive']
  },
  {
    id: 'audio-compressor',
    name: 'Audio Compressor',
    description: 'Reduce audio file size with quality control',
    icon: <Archive className="w-4 h-4" />,
    category: 'audio',
    isPro: false,
    inputFormats: ['wav', 'flac', 'aiff', 'mp3', 'aac'],
    outputFormats: ['mp3', 'aac', 'ogg'],
    features: ['Variable bitrate', 'Quality comparison', 'Size prediction', 'Normalize audio'],
    presets: ['Ultra Compact', 'High Compression', 'Balanced', 'Near Lossless']
  },
  {
    id: 'audio-merger',
    name: 'Audio Merger',
    description: 'Combine multiple audio files into one',
    icon: <Merge className="w-4 h-4" />,
    category: 'audio',
    isPro: true,
    inputFormats: ['mp3', 'wav', 'flac', 'aac', 'ogg'],
    outputFormats: ['mp3', 'wav', 'flac', 'aac'],
    features: ['Crossfade options', 'Volume adjustment', 'Gap control', 'Format matching'],
    presets: ['Seamless Merge', 'Podcast Chapters', 'Album Creation', 'Mix Tape']
  },
  {
    id: 'audio-trimmer',
    name: 'Audio Trimmer',
    description: 'Cut and trim audio files precisely',
    icon: <Scissors className="w-4 h-4" />,
    category: 'audio',
    isPro: false,
    inputFormats: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'],
    outputFormats: ['mp3', 'wav', 'flac', 'aac', 'ogg'],
    features: ['Precise timing', 'Fade in/out', 'Multiple clips', 'Waveform preview'],
    presets: ['Ringtone', 'Podcast Clip', 'Music Sample', 'Sound Effect']
  },

  // Image Tools
  {
    id: 'image-converter',
    name: 'Image Format Converter',
    description: 'Convert images between all formats',
    icon: <FileImage className="w-4 h-4" />,
    category: 'image',
    isPro: false,
    inputFormats: ['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'raw'],
    outputFormats: ['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg'],
    features: ['Quality control', 'Resize options', 'Color space conversion', 'Metadata handling'],
    presets: ['Web Optimized', 'Print Quality', 'Social Media', 'Icon', 'Thumbnail']
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Optimize images for web and storage',
    icon: <Archive className="w-4 h-4" />,
    category: 'image',
    isPro: false,
    inputFormats: ['jpg', 'png', 'gif', 'webp', 'bmp'],
    outputFormats: ['jpg', 'png', 'webp'],
    features: ['Lossy/lossless options', 'Bulk compression', 'Size comparison', 'Quality preview'],
    presets: ['Maximum Compression', 'Balanced', 'High Quality', 'Lossless']
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images with multiple algorithms',
    icon: <Crop className="w-4 h-4" />,
    category: 'image',
    isPro: false,
    inputFormats: ['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp'],
    outputFormats: ['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp'],
    features: ['Smart scaling', 'Aspect ratio lock', 'Batch resize', 'Custom dimensions'],
    presets: ['Instagram Square', 'Facebook Cover', 'Twitter Header', 'YouTube Thumbnail']
  }
];

export default function MediaConverterHub() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'video' | 'audio' | 'image'>('all');
  const [selectedTool, setSelectedTool] = useState<MediaTool | null>(null);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([]);
  const [conversionSettings, setConversionSettings] = useState({
    quality: 80,
    resolution: '1920x1080',
    bitrate: '2000',
    preset: 'balanced'
  });

  const filteredTools = activeCategory === 'all' 
    ? mediaTools 
    : mediaTools.filter(tool => tool.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'image': return <FileImage className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const handleStartConversion = (toolId: string) => {
    const tool = mediaTools.find(t => t.id === toolId);
    if (!tool) return;

    const newJob: ProcessingJob = {
      id: Date.now().toString(),
      toolId,
      fileName: `sample.${tool.inputFormats[0]}`,
      inputFormat: tool.inputFormats[0],
      outputFormat: tool.outputFormats[0],
      status: 'queued',
      progress: 0,
      fileSize: '45.2MB',
      settings: { ...conversionSettings }
    };

    setProcessingJobs(prev => [newJob, ...prev]);

    // Simulate processing
    setTimeout(() => {
      setProcessingJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'processing', progress: 15 } : job
      ));
    }, 500);

    setTimeout(() => {
      setProcessingJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, progress: 45 } : job
      ));
    }, 1500);

    setTimeout(() => {
      setProcessingJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, progress: 85 } : job
      ));
    }, 2500);

    setTimeout(() => {
      setProcessingJobs(prev => prev.map(job => 
        job.id === newJob.id ? { 
          ...job, 
          status: 'completed', 
          progress: 100,
          outputFileSize: '23.1MB',
          compressionRatio: 49
        } : job
      ));
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Video className="w-8 h-8" />
          Media Converter Hub
        </h1>
        <p className="text-muted-foreground">Professional video, audio, and image processing tools</p>
      </div>

      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tools">Media Tools</TabsTrigger>
          <TabsTrigger value="processing">Processing Queue ({processingJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'video', 'audio', 'image'] as const).map(category => (
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
                      <div className="text-muted-foreground mb-1">Input</div>
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
                      <div className="text-muted-foreground mb-1">Output</div>
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

                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Key Features</div>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 2).map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      onClick={() => handleStartConversion(tool.id)}
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
                      <Settings2 className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {processingJobs.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No processing jobs</h3>
              <p className="text-muted-foreground">Start converting media files to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {processingJobs.map(job => {
                const tool = mediaTools.find(t => t.id === job.toolId);
                return (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {tool?.icon}
                          <div>
                            <div className="font-medium">{job.fileName}</div>
                            <div className="text-sm text-muted-foreground">
                              {tool?.name} • {job.inputFormat.toUpperCase()} → {job.outputFormat.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={job.status === 'completed' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </div>
                      </div>

                      {job.status === 'processing' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Processing...</span>
                            <span>{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                      )}

                      {job.status === 'completed' && (
                        <div className="space-y-3">
                          <Alert>
                            <FileImage className="h-4 w-4" />
                            <AlertDescription>
                              Conversion completed! 
                              {job.outputFileSize && job.compressionRatio && (
                                <span className="ml-2">
                                  Size reduced by {job.compressionRatio}% ({job.fileSize} → {job.outputFileSize})
                                </span>
                              )}
                            </AlertDescription>
                          </Alert>
                          <Button size="sm" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download Result
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Settings Panel */}
      {selectedTool && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              Conversion Settings - {selectedTool.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Quality</label>
                <Slider
                  value={[conversionSettings.quality]}
                  onValueChange={([value]) => setConversionSettings(prev => ({ ...prev, quality: value }))}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {conversionSettings.quality}% quality
                </div>
              </div>

              {selectedTool.category === 'video' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Resolution</label>
                  <Select value={conversionSettings.resolution} onValueChange={(value) => 
                    setConversionSettings(prev => ({ ...prev, resolution: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3840x2160">4K (3840x2160)</SelectItem>
                      <SelectItem value="1920x1080">1080p (1920x1080)</SelectItem>
                      <SelectItem value="1280x720">720p (1280x720)</SelectItem>
                      <SelectItem value="854x480">480p (854x480)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Preset</label>
                <Select value={conversionSettings.preset} onValueChange={(value) => 
                  setConversionSettings(prev => ({ ...prev, preset: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTool.presets.map(preset => (
                      <SelectItem key={preset} value={preset.toLowerCase().replace(' ', '-')}>
                        {preset}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleStartConversion(selectedTool.id)}>
                <Zap className="w-4 h-4 mr-2" />
                Start Conversion
              </Button>
              <Button variant="outline" onClick={() => setSelectedTool(null)}>
                Close Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}