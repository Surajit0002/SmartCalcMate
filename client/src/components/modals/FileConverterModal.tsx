import React from 'react';
import { Upload, Download, FileText, Shuffle, Zap, Settings } from 'lucide-react';

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

  // Get supported formats based on tool
  const getFormats = () => {
    const formatMap: { [key: string]: { input: string[], output: string[] } } = {
      'pdf-to-word': { input: ['PDF'], output: ['DOC', 'DOCX'] },
      'word-to-pdf': { input: ['DOC', 'DOCX'], output: ['PDF'] },
      'excel-to-pdf': { input: ['XLS', 'XLSX'], output: ['PDF'] },
      'pdf-to-jpg': { input: ['PDF'], output: ['JPG', 'PNG'] },
      'jpg-to-pdf': { input: ['JPG', 'PNG'], output: ['PDF'] },
      'csv-to-json': { input: ['CSV'], output: ['JSON'] },
      'json-to-csv': { input: ['JSON'], output: ['CSV'] },
      'html-to-pdf': { input: ['HTML'], output: ['PDF'] },
      'epub-to-pdf': { input: ['EPUB'], output: ['PDF'] },
      'ppt-to-pdf': { input: ['PPT', 'PPTX'], output: ['PDF'] },
      'txt-to-pdf': { input: ['TXT'], output: ['PDF'] },
      'base64-to-file': { input: ['Base64'], output: ['File'] },
      'pdf-compressor': { input: ['PDF'], output: ['PDF'] },
      'pdf-splitter': { input: ['PDF'], output: ['PDF'] },
      'pdf-merger': { input: ['PDF'], output: ['PDF'] }
    };
    return formatMap[tool.id] || { input: ['File'], output: ['File'] };
  };

  const formats = getFormats();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
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
        return prev + 10;
      });
    }, 200);

    // Here you would integrate with actual conversion service
    // For now, simulate the process
  };

  const handleSwapFormat = () => {
    if (formats.input.length > 1 && formats.output.length > 1) {
      // Swap logic for bidirectional converters
      const currentTarget = targetFormat;
      setTargetFormat(formats.input[0]);
      // Update UI accordingly
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        <div className="mb-4">
          <Upload className="w-12 h-12 mx-auto text-gray-400" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload {formats.input.join(' or ')} file
          </label>
          <input
            type="file"
            accept={formats.input.map(f => `.${f.toLowerCase()}`).join(',')}
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {selectedFile && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Format Selection */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Convert to format
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
        {formats.input.length > 1 && formats.output.length > 1 && (
          <button
            onClick={handleSwapFormat}
            className="mt-6 p-2 text-gray-500 hover:text-blue-500 transition-colors"
            title="Swap source and target formats"
          >
            <Shuffle className="w-5 h-5" />
          </button>
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
          {tool.id === 'pdf-to-word' && "Best for editing documents and making content changes"}
          {tool.id === 'word-to-pdf' && "Perfect for sharing documents that won't be modified"}
          {tool.id === 'jpg-to-pdf' && "Ideal for combining multiple images into a single document"}
          {tool.id === 'pdf-compressor' && "Reduce file size for email attachments or web sharing"}
          {!['pdf-to-word', 'word-to-pdf', 'jpg-to-pdf', 'pdf-compressor'].includes(tool.id) && 
           "Choose the format that best suits your needs"}
        </p>
      </div>

      {/* Conversion Progress */}
      {isConverting && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Converting...</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Conversion completed!
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4" />
              Download {result}
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
        {isConverting ? 'Converting...' : 'Convert File'}
      </button>
    </div>
  );
}