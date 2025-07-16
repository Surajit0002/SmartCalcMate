import React from 'react';
import { 
  Upload, Download, FileText, Shuffle, Zap, Settings, Sparkles, 
  File, Image, Video, Music, Code, Archive, AlertCircle, 
  CheckCircle, Info, X, Eye, Copy, ExternalLink, Clock,
  HardDrive, Star, TrendingUp, Monitor, Smartphone, Tablet,
  Lightbulb, ArrowRight, RotateCcw, Plus
} from 'lucide-react';

interface FileConverterModalProps {
  tool: {
    id: string;
    name: string;
    description: string;
  };
}

export default function FileConverterModal({ tool }: FileConverterModalProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [targetFormat, setTargetFormat] = React.useState('');
  const [isConverting, setIsConverting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [result, setResult] = React.useState<string | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [autoDetectedType, setAutoDetectedType] = React.useState<string>('');
  const [showAIHelper, setShowAIHelper] = React.useState(false);
  const [compressionLevel, setCompressionLevel] = React.useState(80);
  const [outputQuality, setOutputQuality] = React.useState('standard');
  const [estimatedTime, setEstimatedTime] = React.useState<string>('');
  const [conversionHistory, setConversionHistory] = React.useState<Array<{id: string, from: string, to: string, timestamp: string}>>([]);

  // Auto-detection logic for file types and compatible formats
  const getFormatIcon = (format: string) => {
    const lowerFormat = format.toLowerCase();
    if (lowerFormat.includes('pdf')) return <FileText className="w-4 h-4" />;
    if (lowerFormat.includes('doc') || lowerFormat.includes('word')) return <FileText className="w-4 h-4" />;
    if (lowerFormat.includes('jpg') || lowerFormat.includes('png') || lowerFormat.includes('gif') || lowerFormat.includes('webp')) return <Image className="w-4 h-4" />;
    if (lowerFormat.includes('mp4') || lowerFormat.includes('avi') || lowerFormat.includes('mov')) return <Video className="w-4 h-4" />;
    if (lowerFormat.includes('mp3') || lowerFormat.includes('wav') || lowerFormat.includes('aac')) return <Music className="w-4 h-4" />;
    if (lowerFormat.includes('json') || lowerFormat.includes('xml') || lowerFormat.includes('csv')) return <Code className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const getCompatibleFormats = (inputType: string) => {
    const type = inputType.toLowerCase();
    
    const formatMap: { [key: string]: Array<{ format: string; description: string; quality: 'fast' | 'standard' | 'high'; popular: boolean; aiRecommended?: boolean }> } = {
      'pdf': [
        { format: 'word', description: 'Editable Document', quality: 'high', popular: true, aiRecommended: true },
        { format: 'jpg', description: 'Image per Page', quality: 'fast', popular: true },
        { format: 'png', description: 'High Quality Images', quality: 'high', popular: false },
        { format: 'excel', description: 'Extract Tables', quality: 'standard', popular: true },
        { format: 'text', description: 'Plain Text', quality: 'fast', popular: false },
        { format: 'html', description: 'Web Format', quality: 'standard', popular: false }
      ],
      'word': [
        { format: 'pdf', description: 'Secure Document', quality: 'fast', popular: true, aiRecommended: true },
        { format: 'txt', description: 'Plain Text', quality: 'fast', popular: true },
        { format: 'html', description: 'Web Format', quality: 'standard', popular: false },
        { format: 'odt', description: 'OpenDocument', quality: 'standard', popular: false }
      ],
      'jpg': [
        { format: 'pdf', description: 'Document Format', quality: 'fast', popular: true, aiRecommended: true },
        { format: 'png', description: 'Lossless Quality', quality: 'high', popular: true },
        { format: 'webp', description: 'Web Optimized', quality: 'standard', popular: true },
        { format: 'base64', description: 'Text Encoding', quality: 'fast', popular: false },
        { format: 'ico', description: 'Icon Format', quality: 'standard', popular: false }
      ],
      'png': [
        { format: 'jpg', description: 'Smaller Size', quality: 'standard', popular: true, aiRecommended: true },
        { format: 'webp', description: 'Web Optimized', quality: 'high', popular: true },
        { format: 'pdf', description: 'Document Format', quality: 'fast', popular: true },
        { format: 'ico', description: 'Icon Format', quality: 'standard', popular: false }
      ],
      'excel': [
        { format: 'csv', description: 'Data Export', quality: 'fast', popular: true, aiRecommended: true },
        { format: 'pdf', description: 'Print Ready', quality: 'standard', popular: true },
        { format: 'json', description: 'Data Format', quality: 'standard', popular: false }
      ],
      'csv': [
        { format: 'excel', description: 'Spreadsheet Format', quality: 'fast', popular: true, aiRecommended: true },
        { format: 'json', description: 'Data Structure', quality: 'fast', popular: true },
        { format: 'pdf', description: 'Report Format', quality: 'standard', popular: false }
      ],
      'json': [
        { format: 'csv', description: 'Spreadsheet Data', quality: 'fast', popular: true, aiRecommended: true },
        { format: 'xml', description: 'Markup Format', quality: 'standard', popular: true },
        { format: 'excel', description: 'Spreadsheet Format', quality: 'standard', popular: false }
      ]
    };

    return formatMap[type] || [];
  };

  const detectFileType = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = file.type.toLowerCase();
    
    // Enhanced detection logic
    if (mimeType.includes('pdf') || extension === 'pdf') return 'pdf';
    if (mimeType.includes('word') || extension === 'docx' || extension === 'doc') return 'word';
    if (mimeType.includes('sheet') || extension === 'xlsx' || extension === 'xls') return 'excel';
    if (mimeType.includes('image/jpeg') || extension === 'jpg' || extension === 'jpeg') return 'jpg';
    if (mimeType.includes('image/png') || extension === 'png') return 'png';
    if (mimeType.includes('image/gif') || extension === 'gif') return 'gif';
    if (mimeType.includes('image/webp') || extension === 'webp') return 'webp';
    if (mimeType.includes('text/csv') || extension === 'csv') return 'csv';
    if (mimeType.includes('application/json') || extension === 'json') return 'json';
    if (mimeType.includes('text/xml') || extension === 'xml') return 'xml';
    
    return extension || 'unknown';
  };

  const estimateConversionTime = (fileSize: number, fromFormat: string, toFormat: string) => {
    // Simple estimation based on file size and complexity
    const baseTimes: { [key: string]: number } = {
      'pdf-word': 15, 'pdf-jpg': 10, 'jpg-pdf': 5,
      'excel-csv': 3, 'csv-excel': 5, 'json-csv': 2
    };
    
    const key = `${fromFormat}-${toFormat}`;
    const baseTime = baseTimes[key] || 8;
    const sizeMultiplier = Math.min(fileSize / (1024 * 1024), 10); // Max 10x for very large files
    
    const totalSeconds = Math.max(baseTime + (sizeMultiplier * 2), 1);
    
    if (totalSeconds < 60) return `${Math.round(totalSeconds)}s`;
    return `${Math.round(totalSeconds / 60)}m ${Math.round(totalSeconds % 60)}s`;
  };

  // File handling functions
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    
    // Auto-detect file type
    const detectedType = detectFileType(file);
    setAutoDetectedType(detectedType);
    
    // Auto-suggest first compatible format
    const compatibleFormats = getCompatibleFormats(detectedType);
    if (compatibleFormats.length > 0) {
      const aiRecommended = compatibleFormats.find(f => f.aiRecommended);
      setTargetFormat(aiRecommended?.format || compatibleFormats[0].format);
    }
    
    // Estimate conversion time
    if (compatibleFormats.length > 0) {
      const estimatedDuration = estimateConversionTime(file.size, detectedType, compatibleFormats[0].format);
      setEstimatedTime(estimatedDuration);
    }
    
    // Generate preview for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile || !targetFormat) return;
    
    setIsConverting(true);
    setProgress(0);
    
    // Simulate conversion process with progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful conversion
      setProgress(100);
      setResult('conversion-successful');
      
      // Add to history
      const historyEntry = {
        id: Date.now().toString(),
        from: autoDetectedType,
        to: targetFormat,
        timestamp: new Date().toISOString()
      };
      setConversionHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error('Conversion failed:', error);
      setResult('conversion-failed');
    } finally {
      clearInterval(progressInterval);
      setIsConverting(false);
    }
  };

  const downloadResult = () => {
    // Simulate download
    const blob = new Blob(['Mock converted file content'], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_file.${targetFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetConverter = () => {
    setSelectedFile(null);
    setTargetFormat('');
    setProgress(0);
    setResult(null);
    setFilePreview(null);
    setAutoDetectedType('');
    setEstimatedTime('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compatibleFormats = autoDetectedType ? getCompatibleFormats(autoDetectedType) : [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tool.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
      </div>

      {/* Main Grid - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Upload Zone */}
        <div className="lg:col-span-2">
          {/* Smart Upload Zone */}
          <div 
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <div className="text-center">
                <div className="mb-4">
                  <Upload className="w-16 h-16 mx-auto text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Drop your file here or click to browse
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Supports PDF, Word, Excel, Images, and more
                </p>
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png,.gif,.webp,.csv,.json,.xml"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Choose File
                </label>
                <div className="mt-4 text-xs text-gray-400">
                  Max file size: 50MB
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File Info */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex-shrink-0">
                    {getFormatIcon(autoDetectedType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {selectedFile.name}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{formatFileSize(selectedFile.size)}</span>
                      <span className="capitalize">{autoDetectedType} file</span>
                      {estimatedTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          ~{estimatedTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={resetConverter}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* File Preview */}
                {filePreview && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h5>
                    <img 
                      src={filePreview} 
                      alt="File preview" 
                      className="max-w-full h-32 object-contain rounded border"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Format Selection */}
          {selectedFile && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Convert to Format
                </h3>
                {compatibleFormats.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {compatibleFormats.length} format(s) available
                  </span>
                )}
              </div>

              {/* Format Grid */}
              {compatibleFormats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {compatibleFormats.map((format) => (
                    <button
                      key={format.format}
                      onClick={() => setTargetFormat(format.format)}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        targetFormat === format.format
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getFormatIcon(format.format)}
                        <div className="text-left">
                          <div className="font-medium text-sm text-gray-900 dark:text-white uppercase">
                            {format.format}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {format.description}
                          </div>
                        </div>
                      </div>
                      {format.aiRecommended && (
                        <div className="absolute -top-1 -right-1">
                          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            <Sparkles className="w-3 h-3 inline mr-1" />
                            AI
                          </div>
                        </div>
                      )}
                      {format.popular && !format.aiRecommended && (
                        <div className="absolute -top-1 -right-1">
                          <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 inline mr-1" />
                            Popular
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Conversion Progress */}
          {isConverting && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Converting {autoDetectedType?.toUpperCase()} to {targetFormat?.toUpperCase()}...
                </span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Processing file... This may take a few moments.
              </div>
            </div>
          )}

          {/* Result Section */}
          {result === 'conversion-successful' && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200">
                      Conversion Complete!
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Your file has been successfully converted to {targetFormat?.toUpperCase()}.
                    </p>
                  </div>
                </div>
                <button
                  onClick={downloadResult}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          )}

          {result === 'conversion-failed' && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200">
                    Conversion Failed
                  </h4>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    Please try again or contact support if the issue persists.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Info Sidebar */}
        <div className="space-y-6">
          {/* AI Hint Box */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-purple-500" />
              <h4 className="font-medium text-purple-800 dark:text-purple-200">AI Recommendations</h4>
            </div>
            <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
              {tool.id.includes('pdf-to-word') && (
                <p>Best for editing documents and making content changes</p>
              )}
              {tool.id.includes('word-to-pdf') && (
                <p>Perfect for sharing documents that won't be modified</p>
              )}
              {tool.id.includes('jpg-to-pdf') && (
                <p>Ideal for combining multiple images into a single document</p>
              )}
              {tool.id.includes('compressor') && (
                <p>Reduce file size for email attachments or web sharing</p>
              )}
              {!tool.id.includes('pdf-to-word') && !tool.id.includes('word-to-pdf') && !tool.id.includes('jpg-to-pdf') && !tool.id.includes('compressor') && (
                <p>Choose the format that best suits your needs</p>
              )}
            </div>
          </div>

          {/* Conversion History */}
          {conversionHistory.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recent Conversions</h4>
              <div className="space-y-2">
                {conversionHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.from.toUpperCase()} → {item.to.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tool Information */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">About This Tool</h4>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>High-quality conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-500" />
                <span>Files processed securely</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span>Fast processing</span>
              </div>
            </div>
          </div>

          {/* Device Compatibility */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Works On</h4>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </div>
              <div className="flex items-center gap-1">
                <Tablet className="w-4 h-4" />
                <span>Tablet</span>
              </div>
              <div className="flex items-center gap-1">
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleConvert}
          disabled={!selectedFile || !targetFormat || isConverting}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Zap className="w-5 h-5" />
          {isConverting ? 'Converting...' : 'Convert File'}
        </button>
        
        {selectedFile && (
          <button
            onClick={resetConverter}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2 inline" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}