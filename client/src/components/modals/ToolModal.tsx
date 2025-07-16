import React from 'react';
import { X, HelpCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { Calculator } from '../../lib/calculatorData';

interface ToolModalProps {
  tool: Calculator;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ToolModal({ tool, isOpen, onClose, children }: ToolModalProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  if (!isOpen) return null;

  const getCategoryColor = (category: string) => {
    const colors = {
      'file-converters': 'from-indigo-500 via-purple-500 to-pink-600',
      'media-converters': 'from-pink-500 via-rose-500 to-red-600',
      'downloader-tools': 'from-blue-400 via-cyan-500 to-teal-500',
      'social-media-tools': 'from-purple-400 via-pink-500 to-red-500',
      'finance': 'from-emerald-500 via-teal-500 to-cyan-600',
      'health': 'from-rose-500 via-pink-500 to-purple-600',
      'math': 'from-blue-500 via-indigo-500 to-purple-600',
      'daily': 'from-purple-500 via-violet-500 to-pink-600',
      'unit-converters': 'from-orange-500 via-amber-500 to-yellow-600',
      'text-converters': 'from-teal-500 via-cyan-500 to-blue-600',
      'currency-crypto': 'from-yellow-500 via-orange-500 to-red-600',
      'ai-converters': 'from-emerald-500 via-green-500 to-teal-600',
      'misc-converters': 'from-slate-500 via-gray-500 to-zinc-600',
      'code-converters': 'from-cyan-500 via-blue-500 to-indigo-600',
      'language-converters': 'from-lime-500 via-green-500 to-emerald-600',
      'default': 'from-gray-500 via-slate-500 to-zinc-600'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically save to localStorage or send to backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getCategoryColor(tool.category)} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <i className={`${tool.icon} text-2xl`} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{tool.name}</h2>
                <p className="text-white text-opacity-80">{tool.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBookmark}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              <button
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tool metadata */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(tool.category)} text-white text-sm rounded-full`}>
                {tool.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              {tool.difficulty && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  tool.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  tool.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tool.difficulty}
                </span>
              )}
              {tool.isPro && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  PRO
                </span>
              )}
              {tool.isNew && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {tool.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{tool.rating}</span>
                </div>
              )}
              {tool.usageCount && (
                <span>{tool.usageCount.toLocaleString()} uses</span>
              )}
              {tool.estimatedTime && (
                <span>{tool.estimatedTime}</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}