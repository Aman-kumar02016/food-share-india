import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SurplusCard from '@/components/SurplusCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Leaf, X } from 'lucide-react';
import { SurplusPost, DONOR_TYPES, CITIES } from '@/lib/types';
import { getStoredPosts, claimPost, savePosts } from '@/lib/storage';
import { mockPosts } from '@/lib/mockData';

const Browse = () => {
  const [posts, setPosts] = useState<SurplusPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<SurplusPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedDonorType, setSelectedDonorType] = useState<string>('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);

  useEffect(() => {
    // Load posts from localStorage, or use mock data if empty
    let storedPosts = getStoredPosts();
    if (storedPosts.length === 0) {
      savePosts(mockPosts);
      storedPosts = mockPosts;
    }
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    let result = [...posts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.donorName.toLowerCase().includes(query) ||
          p.foodDescription.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }

    // City filter
    if (selectedCity !== 'all') {
      result = result.filter(p => p.city === selectedCity);
    }

    // Donor type filter
    if (selectedDonorType !== 'all') {
      result = result.filter(p => p.donorType === selectedDonorType);
    }

    // Veg only filter
    if (vegOnly) {
      result = result.filter(p => p.isVegetarian);
    }

    // Available only filter
    if (showAvailableOnly) {
      result = result.filter(p => !p.claimed);
    }

    setFilteredPosts(result);
  }, [posts, searchQuery, selectedCity, selectedDonorType, vegOnly, showAvailableOnly]);

  const handleClaim = (postId: string) => {
    claimPost(postId, 'Community Helper');
    const updatedPosts = posts.map(p =>
      p.id === postId ? { ...p, claimed: true, claimedBy: 'Community Helper' } : p
    );
    setPosts(updatedPosts);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedDonorType('all');
    setVegOnly(false);
    setShowAvailableOnly(true);
  };

  const hasActiveFilters = searchQuery || selectedCity !== 'all' || selectedDonorType !== 'all' || vegOnly || !showAvailableOnly;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Header */}
        <section className="gradient-warm py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
              Browse Surplus Food
            </h1>
            <p className="text-muted-foreground">
              Find and claim surplus food available in your city
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card sticky top-16 z-40 shadow-sm">
          <div className="container py-4 px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, food, or location..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-11 rounded-xl border-border/60"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap gap-3">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[140px] rounded-xl">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {CITIES.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDonorType} onValueChange={setSelectedDonorType}>
                  <SelectTrigger className="w-[160px] rounded-xl">
                    <SelectValue placeholder="Donor Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {DONOR_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant={vegOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVegOnly(!vegOnly)}
                  className="gap-1 rounded-full"
                >
                  <Leaf className="h-4 w-4" />
                  Veg Only
                </Button>

                <Button
                  variant={showAvailableOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                  className="rounded-full"
                >
                  Available Only
                </Button>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1 text-muted-foreground rounded-full"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Filters:
                </span>
                {searchQuery && (
                  <Badge variant="secondary" className="rounded-full">Search: "{searchQuery}"</Badge>
                )}
                {selectedCity !== 'all' && (
                  <Badge variant="secondary" className="rounded-full">{selectedCity}</Badge>
                )}
                {selectedDonorType !== 'all' && (
                  <Badge variant="secondary" className="rounded-full">
                    {DONOR_TYPES.find(d => d.value === selectedDonorType)?.label}
                  </Badge>
                )}
                {vegOnly && (
                  <Badge variant="secondary" className="gap-1 rounded-full">
                    <Leaf className="h-3 w-3" /> Vegetarian
                  </Badge>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8 md:py-10">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredPosts.length}</span> results
              </p>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {filteredPosts.map(post => (
                  <SurplusCard key={post.id} post={post} onClaim={handleClaim} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No Food Found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or check back later
                </p>
                <Button variant="outline" onClick={clearFilters} className="rounded-full">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;