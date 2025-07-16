import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { I18nProvider } from "@/hooks/useI18n";
import UltraEnhancedHeader from "@/components/UltraEnhancedHeader";
import EnhancedFooter from "@/components/EnhancedFooter";
import FloatingActionButton from "@/components/FloatingActionButton";
import TrendingBanner from "@/components/TrendingBanner";
import EnhancedHome from '@/pages/EnhancedHome';
import EnhancedCategories from '@/pages/EnhancedCategories';
import CalculatorView from '@/pages/CalculatorView';
import EnhancedCategoryView from '@/pages/EnhancedCategoryView';
import Favorites from '@/pages/Favorites';
import History from '@/pages/History';
import Profile from '@/pages/Profile';
import FinancialSuite from '@/pages/FinancialSuite';
import EnhancedAllTools from '@/pages/EnhancedAllTools';
import Discover from '@/pages/Discover';
import NotFound from '@/pages/not-found';

function Router() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <TrendingBanner />
      <div className="mt-12">
        <UltraEnhancedHeader />
        <main className="relative">
          <Switch>
            <Route path="/" component={EnhancedHome} />
            <Route path="/categories" component={EnhancedCategories} />
            <Route path="/calculator/:id" component={CalculatorView} />
            <Route path="/category/:id" component={EnhancedCategoryView} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/history" component={History} />
            <Route path="/profile" component={Profile} />
            <Route path="/financial-suite" component={FinancialSuite} />
            <Route path="/all-tools" component={EnhancedAllTools} />
            <Route path="/discover" component={Discover} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <EnhancedFooter />
        <FloatingActionButton />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <I18nProvider>
            <Toaster />
            <Router />
          </I18nProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;