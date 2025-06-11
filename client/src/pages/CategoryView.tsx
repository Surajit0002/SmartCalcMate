import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryById } from "@/lib/calculatorData";

interface CategoryViewProps {
  params: {
    category: string;
  };
}

export default function CategoryView({ params }: CategoryViewProps) {
  const [, setLocation] = useLocation();
  const category = getCategoryById(params.category);

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300">The requested category could not be found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{category.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {category.id === 'finance' && 'Make informed financial decisions with our comprehensive set of calculators.'}
          {category.id === 'health' && 'Monitor and improve your health with our fitness and nutrition calculators.'}
          {category.id === 'math' && 'Solve mathematical problems and learn with our educational tools.'}
          {category.id === 'daily' && 'Everyday calculations made simple and quick.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.calculators.map((calculator) => (
          <Card 
            key={calculator.id}
            className="calculator-card cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setLocation(`/calculator/${calculator.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`bg-${category.color}-100 dark:bg-${category.color}-900 p-3 rounded-lg`}>
                  <i className={`fas ${calculator.icon} text-${category.color}-600 dark:text-${category.color}-400 text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{calculator.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {calculator.id.includes('emi') && 'Home & Car Loan EMI'}
                    {calculator.id.includes('sip') && 'Mutual Fund SIP'}
                    {calculator.id.includes('compound') && 'Investment Growth'}
                    {calculator.id.includes('bmi') && 'Body Mass Index'}
                    {calculator.id.includes('bmr') && 'Calorie Needs'}
                    {calculator.id.includes('scientific') && 'Advanced Math'}
                    {calculator.id.includes('percentage') && 'Quick Percentages'}
                    {calculator.id.includes('age') && 'Calculate Age'}
                    {calculator.id.includes('tip') && 'Split Bills'}
                    {calculator.id.includes('unit') && 'Convert Units'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{calculator.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
