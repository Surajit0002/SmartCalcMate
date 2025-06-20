import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  ArrowRight
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function EnhancedFooter() {
  const { t, formatCurrency } = useI18n();

  const footerSections = [
    {
      title: '🧮 Featured Calculators',
      subtitle: 'Most popular tools',
      links: [
        { label: 'EMI Calculator', href: '/calculator/emi', icon: '🏠', badge: 'HOT', description: 'Calculate loan payments' },
        { label: 'Investment Calculator', href: '/calculator/investment', icon: '📈', badge: 'NEW', description: 'Portfolio projections' },
        { label: 'BMI Calculator', href: '/calculator/bmi', icon: '⚖️', badge: 'TOP', description: 'Health metrics' },
        { label: 'Currency Converter', href: '/calculator/currency-converter', icon: '💱', badge: 'LIVE', description: 'Real-time rates' },
      ]
    },
    {
      title: '📂 Calculator Categories',
      subtitle: 'Organized by domain',
      links: [
        { label: 'Finance & Investment', href: '/category/finance', icon: '💰', description: '6 calculators' },
        { label: 'Health & Fitness', href: '/category/health', icon: '❤️', description: '2 calculators' },
        { label: 'Math & Science', href: '/category/math', icon: '🔬', description: '2 calculators' },
        { label: 'Daily Utilities', href: '/category/daily', icon: '🛠️', description: '4 calculators' },
      ]
    },
    {
      title: '📚 Learning Resources',
      subtitle: 'Guides & documentation',
      links: [
        { label: 'Help Center', href: '/help', icon: '🆘', description: 'Get instant support' },
        { label: 'API Documentation', href: '/docs', icon: '📖', description: 'Developer resources' },
        { label: 'Financial Blog', href: '/blog', icon: '✍️', description: 'Expert insights' },
        { label: 'Video Tutorials', href: '/tutorials', icon: '🎬', description: 'Step-by-step guides' },
      ]
    },
    {
      title: '🏢 Company Info',
      subtitle: 'About CalcMate',
      links: [
        { label: 'About CalcMate', href: '/about', icon: '🌟', description: 'Our story & mission' },
        { label: 'Privacy & Security', href: '/privacy', icon: '🔐', description: 'Your data protection' },
        { label: 'Terms & Conditions', href: '/terms', icon: '📜', description: 'Usage guidelines' },
        { label: 'Contact Support', href: '/contact', icon: '📧', description: '24/7 assistance' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@calcmate.com', label: 'Email' },
  ];

  const stats = [
    { label: 'Active Users', value: '2M+', icon: '👥', color: 'from-blue-500 to-cyan-500' },
    { label: 'Calculations', value: '50M+', icon: '⚡', color: 'from-green-500 to-emerald-500' },
    { label: 'Countries', value: '150+', icon: '🌍', color: 'from-purple-500 to-pink-500' },
    { label: 'Languages', value: '25+', icon: '🗣️', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12">
        <div className="container-responsive">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-muted-foreground">Join our global community of smart calculators</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-all duration-500 border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`text-4xl mb-3 p-3 mx-auto w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <span className="filter drop-shadow-sm">{stat.icon}</span>
                  </div>
                  
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className={`absolute top-2 right-2 w-2 h-2 bg-gradient-to-br ${stat.color} rounded-full opacity-60`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CalcMate
              </span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Your comprehensive calculator hub with 15+ specialized tools for finance, health, math, and daily utilities. Fast, accurate, and mobile-friendly.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {section.title}
                </h3>
                <p className="text-xs text-muted-foreground">{section.subtitle}</p>
              </div>
              
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    <div className="group relative p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all duration-300 cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg">{link.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm leading-tight">
                              {link.label}
                            </h4>
                            {link.badge && (
                              <Badge 
                                variant="secondary" 
                                className={`text-xs px-1.5 py-0.5 ${
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
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {link.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hover effect indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Stay Updated
              </h3>
              <p className="text-muted-foreground">Get the latest calculator updates and financial tips.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 CalcMate. All rights reserved.</span>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for calculations</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure & Private</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>Global Access</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}