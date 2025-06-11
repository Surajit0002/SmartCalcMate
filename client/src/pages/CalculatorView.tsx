import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">Calculator component not implemented yet.</p>
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{calculator.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {calculator.id === 'emi' && 'Calculate your Equated Monthly Installment for home or car loans with detailed breakdown.'}
          {calculator.id === 'bmi' && 'Calculate your Body Mass Index and understand your weight category for better health management.'}
          {calculator.id === 'percentage' && 'Calculate percentages, percentage increases, decreases, and more with ease.'}
          {calculator.id === 'tip' && 'Calculate tips and split bills among friends with customizable tip percentages.'}
          {calculator.id === 'sip' && 'Calculate the future value of your systematic investment plans with detailed projections.'}
          {calculator.id === 'compound-interest' && 'Calculate compound interest on your investments over time.'}
          {calculator.id === 'scientific' && 'Perform advanced mathematical calculations with our full-featured scientific calculator.'}
          {calculator.id === 'mortgage' && 'Comprehensive mortgage calculator with payment breakdown, charts, and amortization analysis.'}
          {calculator.id === 'investment' && 'Plan your investment portfolio with detailed growth projections and risk analysis.'}
          {calculator.id === 'loan-comparison' && 'Compare multiple loan offers side-by-side to find the best deal.'}
          {calculator.id === 'currency-converter' && 'Convert between currencies with real-time exchange rates and historical data.'}
          {calculator.id === 'bmr' && 'Calculate your Basal Metabolic Rate and daily calorie requirements.'}
          {calculator.id === 'age' && 'Calculate your exact age in years, months, days, and more.'}
          {calculator.id === 'unit-converter' && 'Convert between different units of measurement easily.'}
        </p>
      </div>

      {renderCalculator()}
    </div>
  );
}
