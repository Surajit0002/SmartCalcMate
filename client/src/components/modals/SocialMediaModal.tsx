import React from 'react';
import { Sparkles, Copy, RefreshCw, Hash, Calendar, Eye, MessageSquare, Zap } from 'lucide-react';

interface SocialMediaModalProps {
  tool: {
    id: string;
    name: string;
    description: string;
  };
}

export default function SocialMediaModal({ tool }: SocialMediaModalProps) {
  const [input, setInput] = React.useState('');
  const [tone, setTone] = React.useState('engaging');
  const [platform, setPlatform] = React.useState('instagram');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [results, setResults] = React.useState<string[]>([]);
  const [selectedResult, setSelectedResult] = React.useState('');

  // Get tool-specific settings
  const getToolSettings = () => {
    const settingsMap: { [key: string]: {
      inputPlaceholder: string;
      inputLabel: string;
      tones: string[];
      platforms: string[];
      resultType: string;
    } } = {
      'instagram-caption-generator': {
        inputPlaceholder: 'Describe your post content...',
        inputLabel: 'Post Description',
        tones: ['engaging', 'professional', 'casual', 'funny', 'inspirational'],
        platforms: ['instagram'],
        resultType: 'caption'
      },
      'hashtag-generator': {
        inputPlaceholder: 'Enter topic, keywords, or niche...',
        inputLabel: 'Topic/Keywords',
        tones: ['trending', 'niche', 'broad', 'specific'],
        platforms: ['instagram', 'twitter', 'tiktok', 'linkedin'],
        resultType: 'hashtags'
      },
      'reels-idea-generator': {
        inputPlaceholder: 'Your content niche or theme...',
        inputLabel: 'Content Niche',
        tones: ['viral', 'educational', 'entertaining', 'trending'],
        platforms: ['instagram', 'tiktok', 'youtube'],
        resultType: 'ideas'
      },
      'twitter-thread-composer': {
        inputPlaceholder: 'Main topic or argument...',
        inputLabel: 'Thread Topic',
        tones: ['informative', 'engaging', 'debate', 'educational'],
        platforms: ['twitter'],
        resultType: 'thread'
      },
      'tiktok-bio-generator': {
        inputPlaceholder: 'Your interests, profession, or style...',
        inputLabel: 'Bio Details',
        tones: ['funny', 'professional', 'creative', 'mysterious'],
        platforms: ['tiktok'],
        resultType: 'bio'
      },
      'post-scheduler': {
        inputPlaceholder: 'Post content...',
        inputLabel: 'Post Content',
        tones: ['optimal', 'peak-time', 'engagement'],
        platforms: ['instagram', 'twitter', 'facebook', 'linkedin'],
        resultType: 'schedule'
      },
      'content-calendar-generator': {
        inputPlaceholder: 'Content theme or business niche...',
        inputLabel: 'Content Theme',
        tones: ['weekly', 'monthly', 'seasonal'],
        platforms: ['instagram', 'twitter', 'facebook', 'linkedin'],
        resultType: 'calendar'
      },
      'facebook-ad-generator': {
        inputPlaceholder: 'Product/service description...',
        inputLabel: 'Product/Service',
        tones: ['persuasive', 'informative', 'urgent', 'friendly'],
        platforms: ['facebook'],
        resultType: 'ad-copy'
      },
      'youtube-tag-extractor': {
        inputPlaceholder: 'YouTube video URL...',
        inputLabel: 'YouTube URL',
        tones: ['seo', 'trending', 'niche'],
        platforms: ['youtube'],
        resultType: 'tags'
      },
      'story-viewer-tracker': {
        inputPlaceholder: 'Story link or content...',
        inputLabel: 'Story Content',
        tones: ['public', 'analytics'],
        platforms: ['instagram', 'facebook'],
        resultType: 'viewers'
      }
    };
    return settingsMap[tool.id] || settingsMap['instagram-caption-generator'];
  };

  const settings = getToolSettings();

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setResults([]);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const generatedResults = generateMockResults();
    setResults(generatedResults);
    setSelectedResult(generatedResults[0] || '');
    setIsGenerating(false);
  };

  const generateMockResults = () => {
    const mockResults: { [key: string]: string[] } = {
      'instagram-caption-generator': [
        "✨ Living my best life, one adventure at a time! 🌟 What's your favorite way to explore new places? Drop a comment below! 👇 #Adventure #Travel #LifeGoals",
        "Caught between a dream and reality... and honestly, I'm loving every moment of it! 💫 Sometimes the best moments are the unplanned ones. What's the most spontaneous thing you've done lately? #Spontaneous #Life #Moments",
        "Here's to the moments that make us feel alive! 🔥 Whether it's trying something new or revisiting an old favorite, every experience shapes us. What's shaping your story today? #Growth #Experience #Journey"
      ],
      'hashtag-generator': [
        "#travel #wanderlust #adventure #explore #vacation #photography #nature #sunset #mountains #beach #citylife #culture #foodie #backpacking #solo travel",
        "#fitness #health #workout #gym #motivation #lifestyle #wellness #nutrition #strong #mindset #goals #transformation #exercise #healthy #fit",
        "#business #entrepreneur #success #motivation #leadership #innovation #strategy #growth #startup #mindset #productivity #networking #goals #hustle #vision"
      ],
      'reels-idea-generator': [
        "🎬 'Day in my life as a...' - Show your daily routine with trending music and quick cuts",
        "🔥 'Things I wish I knew before...' - Share valuable lessons or tips in your niche",
        "✨ 'Get ready with me' - Transform or preparation content with upbeat music",
        "🤔 'Expectation vs Reality' - Compare what people think vs what actually happens",
        "💡 'Quick tips for...' - Fast-paced educational content with text overlays"
      ],
      'twitter-thread-composer': [
        "1/🧵 Thread about building habits that stick:\n\n2/ Most people fail at building habits because they start too big. The key is to start ridiculously small.\n\n3/ Want to read more? Start with 1 page. Want to exercise? Start with 1 pushup. Want to meditate? Start with 1 minute.\n\n4/ The goal isn't the habit itself initially - it's proving to yourself that you're the type of person who does that thing.\n\n5/ Once the identity shifts, scaling up becomes natural. You're not trying to read - you're a reader who happens to be reading.\n\n6/ End of thread. What's one tiny habit you could start today?"
      ],
      'tiktok-bio-generator': [
        "✨ Creating magic one post at a time\n📍 Based in [Your City]\n🎭 [Your Passion/Hobby]\n💌 Collab: [email]",
        "🌟 Main character energy\n🔥 [Your Niche] content creator\n📱 Follow for daily [content type]\n🎬 Let's create together!",
        "💫 Living life in full color\n🎨 [Your profession/hobby]\n🌍 Spreading good vibes worldwide\n👇 New videos daily"
      ]
    };

    return mockResults[tool.id] || ["Generated content will appear here..."];
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You would typically show a toast notification here
  };

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      'instagram': 'fa-instagram',
      'twitter': 'fa-twitter',
      'tiktok': 'fa-tiktok',
      'facebook': 'fa-facebook',
      'linkedin': 'fa-linkedin',
      'youtube': 'fa-youtube'
    };
    return icons[platform] || 'fa-share-alt';
  };

  const getResultIcon = () => {
    switch (settings.resultType) {
      case 'caption': return <MessageSquare className="w-5 h-5" />;
      case 'hashtags': return <Hash className="w-5 h-5" />;
      case 'ideas': return <Sparkles className="w-5 h-5" />;
      case 'thread': return <MessageSquare className="w-5 h-5" />;
      case 'bio': return <Eye className="w-5 h-5" />;
      case 'schedule': return <Calendar className="w-5 h-5" />;
      case 'calendar': return <Calendar className="w-5 h-5" />;
      case 'ad-copy': return <Zap className="w-5 h-5" />;
      case 'tags': return <Hash className="w-5 h-5" />;
      case 'viewers': return <Eye className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {settings.inputLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={settings.inputPlaceholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.platforms.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              >
                {settings.platforms.map(p => (
                  <option key={p} value={p}>
                    <i className={getPlatformIcon(p)} /> {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Style/Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            >
              {settings.tones.map(t => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AI Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            AI Tips for Better Results
          </span>
        </div>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          {tool.id === 'instagram-caption-generator' && (
            <>
              <li>• Include your target audience and post context</li>
              <li>• Mention specific emotions or actions you want to evoke</li>
              <li>• Add details about the visual content of your post</li>
            </>
          )}
          {tool.id === 'hashtag-generator' && (
            <>
              <li>• Use specific keywords related to your niche</li>
              <li>• Mix popular and niche hashtags for better reach</li>
              <li>• Consider your target audience's interests</li>
            </>
          )}
          {tool.id === 'reels-idea-generator' && (
            <>
              <li>• Be specific about your content niche or industry</li>
              <li>• Mention current trends you want to incorporate</li>
              <li>• Include your content style preferences</li>
            </>
          )}
          {!['instagram-caption-generator', 'hashtag-generator', 'reels-idea-generator'].includes(tool.id) && (
            <>
              <li>• Be specific and detailed in your input</li>
              <li>• Consider your target audience</li>
              <li>• Mention your goals and objectives</li>
            </>
          )}
        </ul>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!input.trim() || isGenerating}
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate {settings.resultType.charAt(0).toUpperCase() + settings.resultType.slice(1)}
          </>
        )}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            {getResultIcon()}
            Generated Results ({results.length})
          </h3>
          
          <div className="grid gap-4">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Option {index + 1}
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {result}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(result)}
                      className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedResult(result)}
                      className={`p-2 rounded transition-colors ${
                        selectedResult === result
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-500 hover:text-blue-500'
                      }`}
                      title="Select this result"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Result Actions */}
          {selectedResult && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Selected Result
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(selectedResult)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={() => setInput(selectedResult)}
                    className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Refine
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}