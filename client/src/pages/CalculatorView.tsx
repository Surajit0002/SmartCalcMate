import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Crown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCalculatorById } from "@/lib/calculatorData";
import EMICalculator from "@/components/calculators/EMICalculator";
import BMICalculator from "@/components/calculators/BMICalculator";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import TipCalculator from "@/components/calculators/TipCalculator";
import SIPCalculator from "@/components/calculators/SIPCalculator";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import ScientificCalculator from "@/components/calculators/ScientificCalculator";
import BMRCalculator from "@/components/calculators/BMRCalculator";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import UnitConverter from "@/components/calculators/UnitConverter";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import InvestmentCalculator from "@/components/calculators/InvestmentCalculator";
import LoanComparison from "@/components/calculators/LoanComparison";
import CurrencyConverter from "@/components/calculators/CurrencyConverter";
import AdvancedUnitConverter from "@/components/calculators/AdvancedUnitConverter";
import ComprehensiveUnitConverter from "@/components/calculators/ComprehensiveUnitConverter";
import AdvancedTextConverters from "@/components/calculators/AdvancedTextConverters";
import ComprehensiveFinancialSuite from "@/components/calculators/ComprehensiveFinancialSuite";
import AdvancedMathematicalSuite from "@/components/calculators/AdvancedMathematicalSuite";
import AIConverterHub from "@/components/calculators/AIConverterHub";
import FileConverterHub from "@/components/calculators/FileConverterHub";
import MediaConverterHub from "@/components/calculators/MediaConverterHub";
import TextCodeConverterHub from "@/components/calculators/TextCodeConverterHub";

interface CalculatorViewProps {
  params: {
    id: string;
  };
}

export default function CalculatorView({ params }: CalculatorViewProps) {
  const [, setLocation] = useLocation();
  const calculator = getCalculatorById(params.id);

  if (!calculator) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Calculator Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300">The requested calculator could not be found.</p>
      </div>
    );
  }

  const handleBack = () => {
    setLocation(`/category/${calculator.category}`);
  };

  const renderCalculator = () => {
    // Financial Tools - Use comprehensive suite for financial calculators
    const financialTools = [
      'emi', 'sip', 'compound-interest', 'mortgage', 'investment', 
      'loan-comparison', 'loan-interest', 'discount-calculator',
      'currency-converter', 'crypto-converter', 'currency-rate-history', 'gold-silver-rate'
    ];

    // Unit Converters - Use comprehensive converter
    const unitConverters = [
      'length-converter', 'weight-converter', 'temperature-converter', 'time-converter',
      'speed-converter', 'area-converter', 'volume-converter', 'data-size-converter',
      'power-converter', 'pressure-converter'
    ];

    // Text & Code Tools
    const textTools = [
      'text-case-converter', 'text-reverser', 'remove-duplicate-lines', 'slug-generator',
      'text-capitalizer', 'binary-text', 'unicode-ascii', 'rot13-base64',
      'html-markdown', 'html-css-js-beautifier', 'sql-formatter', 'json-formatter',
      'javascript-obfuscator', 'regex-tester', 'text-diff-checker', 'uuid-generator',
      'qr-generator', 'qr-reader', 'color-picker', 'url-shortener', 'metadata-extractor'
    ];

    // AI-Powered Tools
    const aiTools = [
      'ocr', 'speech-to-text', 'text-to-speech', 'ai-translator', 'text-translator',
      'language-detector', 'code-explainer', 'document-summarizer', 'audio-transcriber'
    ];

    // Route to appropriate component based on category
    if (financialTools.includes(params.id)) {
      return <ComprehensiveFinancialSuite />;
    }

    if (unitConverters.includes(params.id)) {
      return <ComprehensiveUnitConverter />;
    }

    if (textTools.includes(params.id)) {
      return <TextCodeConverterHub />;
    }

    if (aiTools.includes(params.id)) {
      return <AIConverterHub />;
    }

    // File conversion tools - Enhanced list
    const fileTools = [
      'pdf-to-word', 'word-to-pdf', 'pdf-to-excel', 'pdf-to-image', 'image-to-pdf', 
      'text-to-pdf', 'csv-to-excel', 'excel-to-csv', 'csv-to-json', 'json-to-csv', 
      'csv-to-xml', 'docx-to-odt', 'merge-pdf', 'split-pdf', 'compress-pdf', 'remove-pdf-password'
    ];
    
    if (fileTools.includes(params.id)) {
      return <FileConverterHub />;
    }

    // Media conversion tools - Enhanced list  
    const mediaTools = [
      'video-to-mp3', 'audio-converter', 'video-converter', 'audio-compressor', 
      'video-compressor', 'mp4-to-gif', 'gif-to-mp4', 'youtube-to-mp3', 'youtube-thumbnail'
    ];
    
    if (mediaTools.includes(params.id)) {
      return <MediaConverterHub />;
    }

    // Individual calculator components for specific tools
    switch (params.id) {
      case 'emi': return <EMICalculator />;
      case 'sip': return <SIPCalculator />;
      case 'mortgage': return <MortgageCalculator />;
      case 'investment': return <InvestmentCalculator />;
      case 'loan-comparison': return <LoanComparison />;
      case 'compound-interest': return <CompoundInterestCalculator />;
      case 'bmi': return <BMICalculator />;
      case 'bmr': return <BMRCalculator />;
      case 'age': return <AgeCalculator />;
      case 'scientific': 
      case 'percentage':
      case 'binary-decimal-hex':
      case 'roman-decimal':
        return <AdvancedMathematicalSuite />;
      case 'tip': return <TipCalculator />;
      case 'unit-converter': return <UnitConverter />;
      case 'currency-converter': return <CurrencyConverter />;
      default:
        // Route based on calculator category if available
        if (calculator?.category) {
          switch (calculator.category) {
            case 'currency-crypto':
            case 'language-converters':
            case 'specialized':
              return <TextCodeConverterHub />;
            case 'mathematical':
              return <AdvancedMathematicalSuite />;
            default:
              return <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Tool Available in Hub</h2>
                <p className="text-muted-foreground">This tool is available through our advanced converter hubs with enhanced features and batch processing.</p>
              </div>;
          }
        }
        return <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Calculator Coming Soon</h2>
          <p className="text-muted-foreground">This advanced calculator is being developed and will be available soon.</p>
        </div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Category
            </Button>
            
            <div className="flex items-center gap-2">
              {calculator.isPro && (
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
              {calculator.isNew && (
                <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
              {calculator.featured && (
                <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              {calculator.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {calculator.description}
            </p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
          {renderCalculator()}
        </div>
      </div>
    </div>
  );
}