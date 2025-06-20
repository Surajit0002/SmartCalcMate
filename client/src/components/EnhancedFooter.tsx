import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
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
  Zap
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function EnhancedFooter() {
  const { t, formatCurrency } = useI18n();

  const footerSections = [
    {
      title: 'Calculators',
      links: [
        { label: 'EMI Calculator', href: '/calculator/emi', icon: '💰' },
        { label: 'SIP Calculator', href: '/calculator/sip', icon: '📈' },
        { label: 'BMI Calculator', href: '/calculator/bmi', icon: '⚖️' },
        { label: 'Scientific Calculator', href: '/calculator/scientific', icon: '🔬' },
      ]
    },
    {
      title: 'Categories',
      links: [
        { label: 'Financial', href: '/category/financial', icon: '💼' },
        { label: 'Health', href: '/category/health', icon: '🏥' },
        { label: 'Mathematical', href: '/category/mathematical', icon: '📊' },
        { label: 'Utility', href: '/category/utility', icon: '🛠️' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '/help', icon: '❓' },
        { label: 'API Documentation', href: '/docs', icon: '📚' },
        { label: 'Blog', href: '/blog', icon: '📝' },
        { label: 'Tutorials', href: '/tutorials', icon: '🎓' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about', icon: '🏢' },
        { label: 'Privacy Policy', href: '/privacy', icon: '🔒' },
        { label: 'Terms of Service', href: '/terms', icon: '📋' },
        { label: 'Contact', href: '/contact', icon: '📞' },
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
    { label: 'Active Users', value: '2M+', icon: '👥' },
    { label: 'Calculations', value: '50M+', icon: '🧮' },
    { label: 'Countries', value: '150+', icon: '🌍' },
    { label: 'Languages', value: '25+', icon: '🗣️' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-8">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <Button variant="ghost" className="h-auto p-0 justify-start text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400">
                        <span className="mr-2">{link.icon}</span>
                        {link.label}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
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