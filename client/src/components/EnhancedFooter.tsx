
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { 
  Calculator, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Globe,
  Shield,
  HelpCircle,
  BookOpen,
  Star,
  TrendingUp,
  Zap,
  ArrowRight,
  Send,
  CheckCircle,
  Sparkles,
  Users,
  Activity,
  Award,
  Clock
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function EnhancedFooter() {
  const { t, formatCurrency } = useI18n();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic stats with real-time updates
  const [dynamicStats, setDynamicStats] = useState({
    users: '2.1M',
    calculations: '52M',
    countries: '152',
    languages: '27'
  });

  useEffect(() => {
    const updateStats = () => {
      setDynamicStats(prev => ({
        users: (parseFloat(prev.users) + Math.random() * 0.1).toFixed(1) + 'M',
        calculations: (parseInt(prev.calculations) + Math.floor(Math.random() * 100)).toString() + 'M',
        countries: prev.countries,
        languages: prev.languages
      }));
    };

    const interval = setInterval(updateStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const footerSections = [
    {
      title: '🧮 Featured Calculators',
      subtitle: 'Most popular tools',
      color: 'from-blue-500 to-purple-600',
      links: [
        { label: 'EMI Calculator', href: '/calculator/emi', icon: '🏠', badge: 'HOT', description: 'Calculate loan payments', trend: '+15%' },
        { label: 'Investment Calculator', href: '/calculator/investment', icon: '📈', badge: 'NEW', description: 'Portfolio projections', trend: '+28%' },
        { label: 'BMI Calculator', href: '/calculator/bmi', icon: '⚖️', badge: 'TOP', description: 'Health metrics', trend: '+12%' },
        { label: 'Currency Converter', href: '/calculator/currency-converter', icon: '💱', badge: 'LIVE', description: 'Real-time rates', trend: '+8%' },
      ]
    },
    {
      title: '📂 Calculator Categories',
      subtitle: 'Organized by domain',
      color: 'from-green-500 to-teal-600',
      links: [
        { label: 'Finance & Investment', href: '/category/finance', icon: '💰', description: '8 calculators', count: 8 },
        { label: 'Health & Fitness', href: '/category/health', icon: '❤️', description: '4 calculators', count: 4 },
        { label: 'Math & Science', href: '/category/math', icon: '🔬', description: '6 calculators', count: 6 },
        { label: 'Downloader Tools', href: '/category/downloader-tools', icon: '📥', description: '6 calculators', count: 6 },
        { label: 'Social Media Tools', href: '/category/social-media-tools', icon: '📱', description: '5 calculators', count: 5 },
      ]
    },
    {
      title: '📚 Learning Resources',
      subtitle: 'Guides & documentation',
      color: 'from-purple-500 to-pink-600',
      links: [
        { label: 'Help Center', href: '/help', icon: '🆘', description: 'Get instant support', status: 'Online' },
        { label: 'API Documentation', href: '/docs', icon: '📖', description: 'Developer resources', status: 'Updated' },
        { label: 'Financial Blog', href: '/blog', icon: '✍️', description: 'Expert insights', status: 'New Posts' },
        { label: 'Video Tutorials', href: '/tutorials', icon: '🎬', description: 'Step-by-step guides', status: 'HD Quality' },
      ]
    },
    {
      title: '🏢 Company Info',
      subtitle: 'About CalcMate',
      color: 'from-orange-500 to-red-600',
      links: [
        { label: 'About CalcMate', href: '/about', icon: '🌟', description: 'Our story & mission', info: 'Est. 2024' },
        { label: 'Privacy & Security', href: '/privacy', icon: '🔐', description: 'Your data protection', info: 'GDPR Ready' },
        { label: 'Terms & Conditions', href: '/terms', icon: '📜', description: 'Usage guidelines', info: 'v2.1' },
        { label: 'Contact Support', href: '/contact', icon: '📧', description: '24/7 assistance', info: 'Live Chat' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', followers: '12.5K', color: 'hover:bg-gray-700' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', followers: '45.2K', color: 'hover:bg-blue-500' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', followers: '8.9K', color: 'hover:bg-blue-600' },
    { icon: Mail, href: 'mailto:contact@calcmate.com', label: 'Email', followers: 'Direct', color: 'hover:bg-red-500' },
  ];

  const stats = [
    { 
      label: 'Active Users', 
      value: dynamicStats.users, 
      icon: Users, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Monthly active users',
      trend: '+12%'
    },
    { 
      label: 'Calculations', 
      value: dynamicStats.calculations, 
      icon: Activity, 
      color: 'from-green-500 to-emerald-500',
      description: 'Total calculations made',
      trend: '+25%'
    },
    { 
      label: 'Countries', 
      value: dynamicStats.countries, 
      icon: Globe, 
      color: 'from-purple-500 to-pink-500',
      description: 'Global reach',
      trend: '+3%'
    },
    { 
      label: 'Languages', 
      value: dynamicStats.languages, 
      icon: Star, 
      color: 'from-orange-500 to-red-500',
      description: 'Supported languages',
      trend: '+8%'
    },
  ];

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Compact Stats Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-responsive relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Trusted Worldwide
            </h2>
            <p className="text-blue-100 text-sm">Join our global community</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20 shadow-lg cursor-pointer"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-xl transition-all duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`w-10 h-10 mx-auto mb-2 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-responsive py-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Compact Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                CalcMate
              </span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              Your comprehensive calculator hub with <span className="font-semibold text-blue-600">30+</span> specialized tools. Fast, accurate, and mobile-friendly.
            </p>
            
            {/* Compact Social Links */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {socialLinks.map((social) => (
                <div key={social.label} className={`group p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${social.color} transition-all duration-300 cursor-pointer hover:scale-105`}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <social.icon className="h-4 w-4 text-white" />
                    <div>
                      <div className="text-xs font-medium text-white">{social.label}</div>
                      <div className="text-xs text-white/80">{social.followers}</div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-xs text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>

          {/* Compact Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title} className="lg:col-span-1">
              <div className={`bg-gradient-to-r ${section.color} rounded-lg p-3 mb-3`}>
                <h3 className="font-bold text-sm text-white mb-1">
                  {section.title}
                </h3>
                <p className="text-xs text-white/80">{section.subtitle}</p>
              </div>
              
              <div className="space-y-2">
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    <div 
                      className="group p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300 cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-sm text-white">{link.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {link.label}
                            </h4>
                            {link.badge && (
                              <Badge 
                                variant="secondary" 
                                className={`text-xs px-1 py-0 ${
                                  link.badge === 'HOT' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                  link.badge === 'NEW' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                  link.badge === 'TOP' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                  link.badge === 'LIVE' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                  'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {link.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {link.description}
                          </p>
                          
                          {/* Additional info */}
                          {link.count && (
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              {link.count} tools
                            </div>
                          )}
                          {link.status && (
                            <div className="text-xs text-green-600 dark:text-green-400">
                              ✅ {link.status}
                            </div>
                          )}
                          {link.info && (
                            <div className="text-xs text-purple-600 dark:text-purple-400">
                              ℹ️ {link.info}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

        {/* Compact Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-4 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left text-white">
                <h3 className="font-bold text-lg mb-2 flex items-center justify-center sm:justify-start gap-2">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  Stay Updated
                </h3>
                <p className="text-blue-100 text-sm">Get calculator updates and tips</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 sm:w-64 px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/50 transition-all duration-300 text-sm"
                />
                <Button 
                  onClick={handleSubscribe}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-2 rounded-lg transition-all duration-300 text-sm"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Done!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-1" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-muted-foreground">
            <span>© 2024 CalcMate. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>for calculations</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
              <Shield className="h-3 w-3 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
              <Globe className="h-3 w-3 text-blue-500" />
              <span>Global</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span>4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
