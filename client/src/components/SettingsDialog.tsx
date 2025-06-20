import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Globe, DollarSign, Moon, Sun, Palette } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

const translations = {
  en: {
    common: {
      settings: 'Settings',
      language: 'Language',
      currency: 'Currency',
      theme: 'Theme',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode'
    }
  },
  es: {
    common: {
      settings: 'Configuración',
      language: 'Idioma',
      currency: 'Moneda',
      theme: 'Tema',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro'
    }
  }
};
import { useTheme } from '@/hooks/useTheme';

export default function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, currency, setCurrency, supportedLanguages, supportedCurrencies } = useI18n();
  const t = translations[language as keyof typeof translations]?.common || translations.en.common;
  const { theme, toggleTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t.settings}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Language Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t.language}
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {supportedLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Currency Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {t.currency}
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{curr.flag}</span>
                      <span>{curr.symbol} {curr.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              {t.theme}
            </Label>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-blue-600"
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-lg border p-4 space-y-2">
            <div className="text-sm font-medium">Preview</div>
            <div className="text-sm text-muted-foreground">
              Sample amount: {new Intl.NumberFormat(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'zh-CN', {
                style: 'currency',
                currency: currency,
              }).format(12345.67)}
            </div>
            <div className="text-sm text-muted-foreground">
              Current theme: {theme === 'dark' ? t.darkMode : t.lightMode}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}