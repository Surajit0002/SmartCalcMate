import React from 'react';
import { Upload, Download, Play, Pause, Volume2, Image, Zap, Settings, Sliders } from 'lucide-react';

interface MediaConverterModalProps {
  tool: {
    id: string;
    name: string;
    description: string;
  };
}

export default function MediaConverterModal({ tool }: MediaConverterModalProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [targetFormat, setTargetFormat] = React.useState('');
  const [quality, setQuality] = React.useState(80);
  const [isConverting, setIsConverting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [result, setResult] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  // Get supported formats and settings based on tool
  const getFormats = () => {
    const formatMap: { [key: string]: { input: string[], output: string[], type: string } } = {
      'video-to-mp3': { input: ['MP4', 'AVI', 'MOV', 'MKV'], output: ['MP3', 'WAV', 'AAC'], type: 'video' },
      'mp4-to-webm': { input: ['MP4'], output: ['WebM'], type: 'video' },
      'mov-to-mp4': { input: ['MOV'], output: ['MP4'], type: 'video' },
      'audio-converter': { input: ['MP3', 'WAV', 'OGG', 'AAC'], output: ['MP3', 'WAV', 'OGG', 'AAC'], type: 'audio' },
      'image-format-converter': { input: ['JPG', 'PNG', 'WebP', 'SVG'], output: ['JPG', 'PNG', 'WebP', 'SVG'], type: 'image' },
      'gif-to-mp4': { input: ['GIF'], output: ['MP4'], type: 'video' },
      'mp3-to-wav': { input: ['MP3'], output: ['WAV'], type: 'audio' },
      'image-to-base64': { input: ['JPG', 'PNG', 'WebP'], output: ['Base64'], type: 'image' },
      'base64-to-image': { input: ['Base64'], output: ['JPG', 'PNG', 'WebP'], type: 'image' },
      'compress-image': { input: ['JPG', 'PNG', 'WebP'], output: ['JPG', 'PNG', 'WebP'], type: 'image' },
      'resize-image': { input: ['JPG', 'PNG', 'WebP'], output: ['JPG', 'PNG', 'WebP'], type: 'image' },
      'video-compressor': { input: ['MP4', 'AVI', 'MOV'], output: ['MP4', 'AVI', 'MOV'], type: 'video' }
    };
    return formatMap[tool.id] || { input: ['File'], output: ['File'], type: 'file' };
  };

  const formats = getFormats();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      
      // Create preview for supported formats
      if (formats.type === 'image' || formats.type === 'video') {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
      
      // Auto-detect format or set default
      if (formats.output.length === 1) {
        setTargetFormat(formats.output[0]);
      }
    }
  };

  const handleConvert = async () => {
    if (!selectedFile || !targetFormat) return;

    setIsConverting(true);
    setProgress(0);

    // Simulate conversion process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setResult(`${selectedFile.name.split('.')[0]}.${targetFormat.toLowerCase()}`);
          return 100;
        }
        return prev + 8;
      });
    }, 300);

    // Here you would integrate with actual conversion service
    // For now, simulate the process
  };

  const getQualityPresets = () => {
    if (formats.type === 'video') {
      return [
        { name: 'High (1080p)', value: 90 },
        { name: 'Medium (720p)', value: 70 },
        { name: 'Low (480p)', value: 50 },
        { name: 'Web Optimized', value: 60 }
      ];
    } else if (formats.type === 'image') {
      return [
        { name: 'High Quality', value: 95 },
        { name: 'Medium', value: 80 },
        { name: 'Web Optimized', value: 60 },
        { name: 'Small Size', value: 40 }
      ];
    }
    return [];
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (formats.type === 'image') {
      return (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Preview</span>
          </div>
          <img src={preview} alt="Preview" className="max-w-full max-h-48 rounded-lg" />
        </div>
      );
    } else if (formats.type === 'video') {
      return (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Preview</span>
          </div>
          <video controls className="max-w-full max-h-48 rounded-lg">
            <source src={preview} />
            Your browser does not support video playback.
          </video>
        </div>
      );
    }
    return null;
  };

  const getAISuggestion = () => {
    const suggestions: { [key: string]: string } = {
      'video-to-mp3': 'MP3 is best for music, WAV for high quality audio',
      'mp4-to-webm': 'WebM is perfect for web streaming and smaller file sizes',
      'mov-to-mp4': 'MP4 is more compatible across devices and platforms',
      'image-format-converter': 'PNG for graphics, JPG for photos, WebP for web',
      'gif-to-mp4': 'MP4 videos are smaller and play better on mobile',
      'compress-image': 'Reduce file size by 60-80% without visible quality loss',
      'resize-image': 'Optimize dimensions for web, email, or social media',
      'video-compressor': 'Reduce file size for faster uploads and streaming'
    };
    return suggestions[tool.id] || 'Choose settings that best match your intended use';
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        <div className="mb-4">
          {formats.type === 'video' && <Play className="w-12 h-12 mx-auto text-gray-400" />}
          {formats.type === 'audio' && <Volume2 className="w-12 h-12 mx-auto text-gray-400" />}
          {formats.type === 'image' && <Image className="w-12 h-12 mx-auto text-gray-400" />}
          {formats.type === 'file' && <Upload className="w-12 h-12 mx-auto text-gray-400" />}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload {formats.input.join(' or ')} file
          </label>
          <input
            type="file"
            accept={formats.input.map(f => {
              if (f === 'Base64') return '.txt';
              return formats.type === 'video' ? 'video/*' : 
                     formats.type === 'audio' ? 'audio/*' : 
                     formats.type === 'image' ? 'image/*' : 
                     `.${f.toLowerCase()}`;
            }).join(',')}
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        {selectedFile && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {formats.type === 'video' && <Play className="w-5 h-5 text-blue-500" />}
                {formats.type === 'audio' && <Volume2 className="w-5 h-5 text-blue-500" />}
                {formats.type === 'image' && <Image className="w-5 h-5 text-blue-500" />}
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>
        )}
        
        {renderPreview()}
      </div>

      {/* Format and Quality Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output Format
          </label>
          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          >
            <option value="">Select format...</option>
            {formats.output.map(format => (
              <option key={format} value={format}>{format}</option>
            ))}
          </select>
        </div>

        {formats.type !== 'file' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quality
            </label>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="20"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">{quality}%</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {getQualityPresets().map(preset => (
                <button
                  key={preset.name}
                  onClick={() => setQuality(preset.value)}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Suggestions */}
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            AI Suggest
          </span>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          {getAISuggestion()}
        </p>
      </div>

      {/* Conversion Progress */}
      {isConverting && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Processing media...</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center">
            {formats.type === 'video' && 'Encoding video...'}
            {formats.type === 'audio' && 'Processing audio...'}
            {formats.type === 'image' && 'Optimizing image...'}
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Conversion completed!
                </span>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Quality: {quality}% | Size: ~{(selectedFile!.size * (quality/100) / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      )}

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={!selectedFile || !targetFormat || isConverting}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <Settings className="w-5 h-5" />
        {isConverting ? 'Converting...' : 'Convert Media'}
      </button>
    </div>
  );
}