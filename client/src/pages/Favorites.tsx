import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Search, Calculator, Trash2, Star } from 'lucide-react';
import { calculators, categories } from '@/lib/calculatorData';
import { useI18n } from '@/hooks/useI18n';
import SEOHead from '@/components/SEOHead';

interface FavoriteCalculator {
  id: string;
  addedAt: string;
  usageCount: number;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteCalculator[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useI18n();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('calculator-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteCalculator[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('calculator-favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (calculatorId: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== calculatorId);
    saveFavorites(newFavorites);
  };

  const favoriteCalculators = favorites
    .map(fav => {
      const calc = calculators.find(c => c.id === fav.id);
      return calc ? { ...calc, favoriteData: fav } : null;
    })
    .filter(Boolean)
    .filter(calc => 
      calc!.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc!.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedFavorites = favoriteCalculators.sort((a, b) => {
    // Sort by usage count first, then by date added
    if (b!.favoriteData.usageCount !== a!.favoriteData.usageCount) {
      return b!.favoriteData.usageCount - a!.favoriteData.usageCount;
    }
    return new Date(b!.favoriteData.addedAt).getTime() - new Date(a!.favoriteData.addedAt).getTime();
  });

  return (
    <>
      <SEOHead 
        title="Favorite Calculators - CalcMate Pro"
        description="Access your favorite calculators quickly and efficiently. Keep track of your most used calculation tools."
        keywords="favorite calculators, bookmarked tools, frequently used calculators"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Favorite Calculators
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quick access to your most used and favorite calculation tools
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                  {favorites.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Favorite Calculators
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {favorites.reduce((sum, fav) => sum + fav.usageCount, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Uses
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {favorites.length > 0 ? Math.round(favorites.reduce((sum, fav) => sum + fav.usageCount, 0) / favorites.length) : 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Uses per Favorite
                </div>
              </CardContent>
            </Card>
          </div>

          {favorites.length > 0 && (
            <>
              {/* Search */}
              <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search favorite calculators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedFavorites.map((calculator) => {
                  const category = categories.find(c => c.id === calculator!.category);
                  return (
                    <Card key={calculator!.id} className="h-full hover:shadow-lg transition-all duration-300 group relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{calculator!.icon}</span>
                            <Heart className="h-4 w-4 text-pink-500 fill-current" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="secondary" 
                              className={`${category?.color || 'bg-gray-500'} text-white text-xs`}
                            >
                              {category?.name}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                removeFavorite(calculator!.id);
                              }}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Link href={`/calculator/${calculator!.id}`}>
                          <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                            {calculator!.name}
                          </CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/calculator/${calculator!.id}`}>
                          <CardDescription className="text-sm line-clamp-2 cursor-pointer">
                            {calculator!.description}
                          </CardDescription>
                        </Link>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Star className="h-3 w-3" />
                            Used {calculator!.favoriteData.usageCount} times
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Added {new Date(calculator!.favoriteData.addedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {favoriteCalculators.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No favorites found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {favorites.length === 0 && (
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No favorite calculators yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start adding calculators to your favorites to quickly access your most used tools. 
                Just click the heart icon on any calculator!
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Browse Calculators
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}