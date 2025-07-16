
# AI Tool Generation Prompt Template

## Context
You are helping to create a new calculator tool for a React-based calculator suite called "CalcMate Pro". The application uses TypeScript, Tailwind CSS, and shadcn/ui components.

## Architecture Patterns to Follow

### 1. Component Structure
Create a React functional component that follows this pattern:
- Uses React hooks (useState, useEffect, useMemo)
- Implements responsive design with Tailwind CSS
- Uses shadcn/ui components (Card, Button, Input, Badge, etc.)
- Includes proper TypeScript interfaces
- Has loading states and error handling

### 2. Required Props/Features
```typescript
interface CalculatorProps {
  // Add any specific props needed
}

const [YourCalculator]Calculator: React.FC<CalculatorProps> = () => {
  // State management
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Main calculation function
  const calculateResults = () => {
    // Implementation
  };
  
  // Validation
  const validateInputs = () => {
    // Implementation
  };
  
  // Clear/Reset function
  const clearAll = () => {
    // Implementation
  };
  
  return (
    // JSX implementation
  );
};
```

### 3. UI Components to Use
- `Card`, `CardContent`, `CardHeader`, `CardTitle` for sections
- `Input` with proper labels and validation
- `Button` with consistent styling
- `Badge` for status indicators
- `Alert` for errors or important info
- `Tabs` for multiple sections if needed
- `Progress` for multi-step calculations

### 4. Styling Guidelines
- Use gradient backgrounds: `bg-gradient-to-br from-blue-50 to-indigo-100`
- Card shadows: `shadow-lg hover:shadow-xl transition-shadow`
- Button styling: Primary buttons with gradients, secondary with outlines
- Responsive design: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Color scheme: Blue/purple/indigo for primary, green for success, red for errors

### 5. Data Structure for calculatorData.ts
```typescript
{
  id: 'your-calculator-id',
  name: 'Your Calculator Name',
  description: 'Brief description of what it calculates',
  category: 'appropriate-category', // finance, health, math, etc.
  icon: 'fa-appropriate-icon',
  featured: false, // or true for featured tools
  isNew: true, // if it's a new tool
  isPro: false, // if it requires pro features
  isPopular: false,
  difficulty: 'easy', // easy, medium, advanced
  rating: 4.5,
  usageCount: 1000,
  tags: ['relevant', 'tags'],
  longDescription: 'Detailed description of functionality',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  inputTypes: ['Input Type 1', 'Input Type 2'],
  outputTypes: ['Output Type 1', 'Output Type 2'],
  estimatedTime: '< 1 minute'
}
```

## Generation Instructions

When creating a new calculator tool, please:

1. **Specify the calculator type**: [Finance/Health/Math/Unit Conversion/Text Tool/etc.]
2. **Define the purpose**: What specific calculation or conversion does it perform?
3. **List required inputs**: What data does the user need to provide?
4. **Define outputs**: What results should be displayed?
5. **Include validation**: What input validation is needed?
6. **Add helpful features**: Export, copy, clear, examples, etc.

### Example Prompt Usage:
"Create a [Calculator Type] that calculates [specific function]. It should accept inputs for [input1], [input2], [input3] and display results showing [output1], [output2]. Include validation for [validation rules] and add features like [additional features]."

### Specific Calculator Examples:
1. **Compound Annual Growth Rate (CAGR) Calculator**
   - Inputs: Initial value, final value, number of years
   - Outputs: CAGR percentage, growth visualization
   - Features: Chart display, comparison table

2. **Calorie Burn Calculator**
   - Inputs: Activity type, duration, weight, intensity
   - Outputs: Calories burned, recommendations
   - Features: Activity database, progress tracking

3. **Mortgage Refinance Calculator**
   - Inputs: Current loan details, new loan terms
   - Outputs: Savings analysis, break-even point
   - Features: Comparison charts, payment schedules

4. **Unit Conversion Calculator**
   - Inputs: Value, from unit, to unit
   - Outputs: Converted value, conversion formula
   - Features: Multiple conversions, favorites

## Implementation Checklist
- [ ] Component created with proper TypeScript
- [ ] Responsive design implemented
- [ ] Input validation added
- [ ] Error handling included
- [ ] Loading states implemented
- [ ] Clear/reset functionality
- [ ] Export/copy features
- [ ] Added to calculatorData.ts
- [ ] Added to UnifiedToolModal.tsx component mapping
- [ ] Tested on mobile and desktop

## Quality Standards
- Clean, readable code with proper comments
- Responsive design that works on all screen sizes
- Proper error handling and user feedback
- Consistent styling with existing tools
- Performance optimized (useMemo for heavy calculations)
- Accessibility features (labels, ARIA attributes)
