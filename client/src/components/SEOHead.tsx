import { useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonical,
  image = '/og-image.jpg',
  type = 'website'
}: SEOHeadProps) {
  const { t, language } = useI18n();

  const siteTitle = title ? `${title} | ${t.meta.title}` : t.meta.title;
  const siteDescription = description || t.meta.description;
  const siteKeywords = keywords || t.meta.keywords;
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullImageUrl = `${siteUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = siteTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', siteDescription);
    updateMetaTag('keywords', siteKeywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'CalcMate Team');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#3b82f6');

    // Language and locale
    updateMetaTag('language', language);
    document.documentElement.lang = language;

    // Open Graph tags
    updateMetaTag('og:title', siteTitle, true);
    updateMetaTag('og:description', siteDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', canonical || window.location.href, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', 'CalcMate', true);
    updateMetaTag('og:locale', language === 'en' ? 'en_US' : language === 'es' ? 'es_ES' : language === 'fr' ? 'fr_FR' : 'zh_CN', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', siteTitle);
    updateMetaTag('twitter:description', siteDescription);
    updateMetaTag('twitter:image', fullImageUrl);
    updateMetaTag('twitter:site', '@CalcMate');
    updateMetaTag('twitter:creator', '@CalcMate');

    // Additional SEO tags
    updateMetaTag('application-name', 'CalcMate');
    updateMetaTag('apple-mobile-web-app-title', 'CalcMate');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('mobile-web-app-capable', 'yes');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.href);

    // JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "CalcMate",
      "description": siteDescription,
      "url": siteUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "CalcMate Team"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2547"
      }
    };

    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);

  }, [siteTitle, siteDescription, siteKeywords, canonical, fullImageUrl, type, language]);

  return null;
}