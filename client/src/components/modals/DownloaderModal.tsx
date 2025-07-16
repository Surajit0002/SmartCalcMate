import React from 'react';
import { Download, Link, Play, Music, Image, AlertCircle, CheckCircle, Settings, Zap } from 'lucide-react';

interface DownloaderModalProps {
  tool: {
    id: string;
    name: string;
    description: string;
  };
}

export default function DownloaderModal({ tool }: DownloaderModalProps) {
  const [url, setUrl] = React.useState('');
  const [quality, setQuality] = React.useState('720p');
  const [format, setFormat] = React.useState('mp4');
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [downloadedFiles, setDownloadedFiles] = React.useState<string[]>([]);
  const [error, setError] = React.useState('');

  // Get platform-specific settings
  const getPlatformSettings = () => {
    const settingsMap: { [key: string]: { 
      name: string; 
      formats: string[]; 
      qualities: string[]; 
      placeholder: string;
      icon: string;
    } } = {
      'youtube-downloader': {
        name: 'YouTube',
        formats: ['mp4', 'webm', 'mp3'],
        qualities: ['144p', '240p', '360p', '480p', '720p', '1080p', '4K'],
        placeholder: 'https://www.youtube.com/watch?v=...',
        icon: 'fa-youtube'
      },
      'tiktok-downloader': {
        name: 'TikTok',
        formats: ['mp4', 'mp3'],
        qualities: ['360p', '720p', '1080p'],
        placeholder: 'https://www.tiktok.com/@user/video/...',
        icon: 'fa-tiktok'
      },
      'instagram-downloader': {
        name: 'Instagram',
        formats: ['mp4', 'jpg', 'mp3'],
        qualities: ['360p', '720p', '1080p'],
        placeholder: 'https://www.instagram.com/p/...',
        icon: 'fa-instagram'
      },
      'facebook-downloader': {
        name: 'Facebook',
        formats: ['mp4', 'mp3'],
        qualities: ['240p', '360p', '480p', '720p', '1080p'],
        placeholder: 'https://www.facebook.com/watch?v=...',
        icon: 'fa-facebook'
      },
      'twitter-downloader': {
        name: 'Twitter',
        formats: ['mp4', 'gif', 'jpg'],
        qualities: ['240p', '360p', '480p', '720p'],
        placeholder: 'https://twitter.com/user/status/...',
        icon: 'fa-twitter'
      },
      'pinterest-downloader': {
        name: 'Pinterest',
        formats: ['jpg', 'png', 'gif'],
        qualities: ['Original', 'Large', 'Medium', 'Small'],
        placeholder: 'https://www.pinterest.com/pin/...',
        icon: 'fa-pinterest'
      },
      'linkedin-downloader': {
        name: 'LinkedIn',
        formats: ['mp4', 'jpg'],
        qualities: ['480p', '720p', '1080p'],
        placeholder: 'https://www.linkedin.com/posts/...',
        icon: 'fa-linkedin'
      },
      'soundcloud-downloader': {
        name: 'SoundCloud',
        formats: ['mp3', 'wav'],
        qualities: ['128kbps', '192kbps', '320kbps'],
        placeholder: 'https://soundcloud.com/user/track',
        icon: 'fa-soundcloud'
      },
      'vimeo-downloader': {
        name: 'Vimeo',
        formats: ['mp4', 'webm'],
        qualities: ['240p', '360p', '480p', '720p', '1080p', '4K'],
        placeholder: 'https://vimeo.com/...',
        icon: 'fa-vimeo'
      },
      'dailymotion-downloader': {
        name: 'Dailymotion',
        formats: ['mp4', 'webm'],
        qualities: ['240p', '360p', '480p', '720p', '1080p'],
        placeholder: 'https://www.dailymotion.com/video/...',
        icon: 'fa-video'
      },
      'reddit-downloader': {
        name: 'Reddit',
        formats: ['mp4', 'gif', 'jpg'],
        qualities: ['240p', '360p', '480p', '720p'],
        placeholder: 'https://www.reddit.com/r/subreddit/comments/...',
        icon: 'fa-reddit'
      },
      'url-downloader': {
        name: 'Generic URL',
        formats: ['original', 'mp4', 'jpg', 'pdf', 'zip'],
        qualities: ['Original'],
        placeholder: 'https://example.com/file.ext',
        icon: 'fa-link'
      }
    };
    return settingsMap[tool.id] || settingsMap['url-downloader'];
  };

  const settings = getPlatformSettings();

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleDownload = async () => {
    if (!url || !validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setIsDownloading(true);
    setProgress(0);

    // Simulate download process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          const filename = `${settings.name.toLowerCase()}_download_${Date.now()}.${format}`;
          setDownloadedFiles(prev => [...prev, filename]);
          return 100;
        }
        return prev + 12;
      });
    }, 250);

    // Here you would integrate with actual download service
    // For now, simulate the process
  };

  const getFileIcon = (format: string) => {
    if (['mp4', 'webm', 'mkv', 'avi'].includes(format)) return <Play className="w-5 h-5 text-red-500" />;
    if (['mp3', 'wav', 'aac'].includes(format)) return <Music className="w-5 h-5 text-purple-500" />;
    if (['jpg', 'png', 'gif', 'webp'].includes(format)) return <Image className="w-5 h-5 text-green-500" />;
    return <Download className="w-5 h-5 text-blue-500" />;
  };

  const getQualityInfo = () => {
    const info: { [key: string]: string } = {
      '144p': 'Low quality, small file size',
      '240p': 'Low quality, small file size',
      '360p': 'Good for mobile viewing',
      '480p': 'Standard definition',
      '720p': 'High definition (HD)',
      '1080p': 'Full HD, best quality',
      '4K': 'Ultra HD, largest file size',
      '128kbps': 'Standard audio quality',
      '192kbps': 'Good audio quality',
      '320kbps': 'High audio quality',
      'Original': 'Best available quality'
    };
    return info[quality] || 'Standard quality';
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <div className="flex items-center gap-2">
            <i className={`${settings.icon} text-lg`} />
            Enter {settings.name} URL
          </div>
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={settings.placeholder}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>
          <button
            onClick={() => {
              navigator.clipboard.readText().then(text => {
                if (validateUrl(text)) {
                  setUrl(text);
                }
              });
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Paste from clipboard"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>
        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* Format and Quality Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          >
            {settings.formats.map(fmt => (
              <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quality
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          >
            {settings.qualities.map(qual => (
              <option key={qual} value={qual}>{qual}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">{getQualityInfo()}</p>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Smart Tips
          </span>
        </div>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>• Use 720p for the best balance of quality and file size</li>
          <li>• MP4 format is compatible with most devices</li>
          <li>• Higher quality means larger file sizes and longer download times</li>
          {settings.name === 'YouTube' && <li>• For music, use MP3 format for smaller files</li>}
          {settings.name === 'TikTok' && <li>• Downloads are watermark-free</li>}
        </ul>
      </div>

      {/* Download Progress */}
      {isDownloading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Downloading from {settings.name}...</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-center">
            Quality: {quality} | Format: {format.toUpperCase()}
          </div>
        </div>
      )}

      {/* Downloaded Files */}
      {downloadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Downloaded Files ({downloadedFiles.length})
          </h3>
          <div className="space-y-2">
            {downloadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {getFileIcon(format)}
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {file}
                  </span>
                </div>
                <button className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={!url || isDownloading}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        {isDownloading ? 'Downloading...' : `Download from ${settings.name}`}
      </button>
    </div>
  );
}