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
import FileConverterHub from "@/components/calculators/FileConverterHub";
import TextCodeConverterHub from "@/components/calculators/TextCodeConverterHub";
import MediaConverterHub from "@/components/calculators/MediaConverterHub";
import AIConverterHub from "@/components/calculators/AIConverterHub";

interface CalculatorViewProps {
  params: {
    calculator: string;
  };
}

export default function CalculatorView({ params }: CalculatorViewProps) {
  const [, setLocation] = useLocation();
  const calculator = getCalculatorById(params.calculator);

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
    switch (params.calculator) {
      // Original Calculators
      case 'emi':
        return <EMICalculator />;
      case 'bmi':
        return <BMICalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'tip':
        return <TipCalculator />;
      case 'sip':
        return <SIPCalculator />;
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'bmr':
        return <BMRCalculator />;
      case 'age':
        return <AgeCalculator />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'mortgage':
        return <MortgageCalculator />;
      case 'investment':
        return <InvestmentCalculator />;
      case 'loan-comparison':
        return <LoanComparison />;
      case 'currency-converter':
        return <CurrencyConverter />;

      // Advanced Unit Converters
      case 'length-converter':
      case 'weight-converter':
      case 'temperature-converter':
      case 'time-converter':
      case 'speed-converter':
      case 'area-converter':
      case 'volume-converter':
      case 'data-converter':
      case 'power-converter':
      case 'pressure-converter':
        return <AdvancedUnitConverter />;

      // File Converters
      case 'pdf-to-word':
      case 'word-to-pdf':
      case 'pdf-to-excel':
      case 'pdf-to-image':
      case 'image-to-pdf':
      case 'text-to-pdf':
      case 'csv-to-excel':
      case 'csv-to-json':
      case 'json-to-csv':
      case 'csv-to-xml':
      case 'docx-to-odt':
      case 'merge-pdf':
      case 'split-pdf':
      case 'compress-pdf':
      case 'remove-pdf-password':
        return <FileConverterHub />;

      // Media Converters
      case 'video-to-mp3':
      case 'audio-converter':
      case 'video-converter':
      case 'audio-compressor':
      case 'video-compressor':
      case 'mp4-to-gif':
      case 'gif-to-mp4':
      case 'youtube-to-mp3':
      case 'youtube-thumbnail':
        return <MediaConverterHub />;

      // Text & Code Converters
      case 'text-case':
      case 'binary-text':
      case 'text-reverser':
      case 'slug-generator':
      case 'text-capitalizer':
      case 'remove-lines':
      case 'text-encryptor':
      case 'json-xml':
      case 'json-csv':
      case 'html-markdown':
      case 'code-beautifier':
      case 'sql-formatter':
      case 'js-obfuscator':
      case 'qr-generator':
      case 'qr-scanner':
      case 'regex-tester':
      case 'uuid-generator':
      case 'unicode-converter':
        return <TextCodeConverterHub />;

      // AI-Powered Converters
      case 'ocr':
      case 'speech-to-text':
      case 'text-to-speech':
      case 'ai-translator':
      case 'code-explainer':
      case 'pdf-summarizer':
      case 'audio-transcriber':
        return <AIConverterHub />;

      // Cryptocurrency & Currency
      case 'crypto-converter':
      case 'currency-history':
      case 'gold-converter':
        return <CurrencyConverter />;

      // Mathematical Converters
      case 'roman-decimal':
      case 'binary-decimal':
        return <ScientificCalculator />;

      // Finance Tools
      case 'interest-calculator':
      case 'discount-calculator':
        return <EMICalculator />;

      // Misc Converters
      case 'ico-to-png':
      case 'png-to-ico':
      case 'vcf-to-csv':
      case 'metadata-extractor':
      case 'favicon-generator':
      case 'youtube-timestamp-link':
      case 'link-shortener':
      case 'text-diff-checker':
        return <TextCodeConverterHub />;

      default:
        return (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tool Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              This advanced tool is currently being developed and will be available soon with powerful features and intuitive interface.
            </p>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
              <Crown className="w-3 h-3 mr-1" />
              Premium Feature
            </Badge>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-primary hover:text-primary/80 mb-4 p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
        </Button>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{calculator.name}</h2>
          {calculator.isNew && (
            <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300">
              <Star className="w-3 h-3 mr-1" />
              NEW
            </Badge>
          )}
          {calculator.isPro && (
            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300">
              <Crown className="w-3 h-3 mr-1" />
              PRO
            </Badge>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300">
          {calculator.function || calculator.description}
        </p>
      </div>

      {renderCalculator()}
    </div>
  );
}
