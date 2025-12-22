import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Users, Heart, TrendingUp, Utensils, MapPin } from 'lucide-react';
import { getStoredPosts, getDashboardStats, savePosts } from '@/lib/storage';
import { mockPosts } from '@/lib/mockData';
import { SurplusPost, DONOR_TYPES, CITIES } from '@/lib/types';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalPosts: 0, totalClaimed: 0, totalServings: 0, activeDonors: 0 });
  const [recentPosts, setRecentPosts] = useState<SurplusPost[]>([]);
  const [cityStats, setCityStats] = useState<{ city: string; count: number }[]>([]);
  const [donorStats, setDonorStats] = useState<{ type: string; count: number; icon: string }[]>([]);

  useEffect(() => {
    // Load or initialize data
    let posts = getStoredPosts();
    if (posts.length === 0) {
      savePosts(mockPosts);
      posts = mockPosts;
    }

    setStats(getDashboardStats());
    setRecentPosts(posts.slice(0, 5));

    // Calculate city distribution
    const cityMap = new Map<string, number>();
    posts.forEach(p => {
      cityMap.set(p.city, (cityMap.get(p.city) || 0) + 1);
    });
    const cityCounts = Array.from(cityMap, ([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setCityStats(cityCounts);

    // Calculate donor type distribution
    const donorMap = new Map<string, number>();
    posts.forEach(p => {
      donorMap.set(p.donorType, (donorMap.get(p.donorType) || 0) + 1);
    });
    const donorCounts = Array.from(donorMap, ([type, count]) => {
      const donorInfo = DONOR_TYPES.find(d => d.value === type);
      return { type: donorInfo?.label || type, count, icon: donorInfo?.icon || '📦' };
    }).sort((a, b) => b.count - a.count);
    setDonorStats(donorCounts);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Header */}
        <section className="gradient-warm py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track food sharing impact across India
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-8 md:py-10">
          <div className="container px-4 md:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatCard
                title="Total Posts"
                value={stats.totalPosts}
                icon={Package}
                description="Food listings shared"
              />
              <StatCard
                title="Food Claimed"
                value={stats.totalClaimed}
                icon={Heart}
                description="Successfully distributed"
              />
              <StatCard
                title="Total Servings"
                value={stats.totalServings.toLocaleString()}
                icon={Utensils}
                description="Meals shared"
              />
              <StatCard
                title="Active Donors"
                value={stats.activeDonors}
                icon={Users}
                description="Contributing partners"
              />
            </div>
          </div>
        </section>

        {/* Charts and Tables */}
        <section className="pb-12 md:pb-16">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 shadow-card border border-border/60 rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest food surplus posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentPosts.map(post => (
                      <div 
                        key={post.id} 
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 transition-all duration-200 hover:bg-muted/70 border border-border/40"
                      >
                        <div className="text-2xl">
                          {DONOR_TYPES.find(d => d.value === post.donorType)?.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {post.donorName}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {post.foodDescription}
                          </p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1.5">
                          <Badge 
                            variant={post.claimed ? 'secondary' : 'default'}
                            className="rounded-full"
                          >
                            {post.claimed ? 'Claimed' : 'Available'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(post.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Side Stats */}
              <div className="space-y-5 md:space-y-6">
                {/* City Distribution */}
                <Card className="shadow-card border border-border/60 rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="font-display flex items-center gap-2 text-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      Top Cities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cityStats.map((city, idx) => (
                        <div key={city.city} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{city.city}</span>
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-2 rounded-full gradient-hero"
                              style={{ width: `${(city.count / (cityStats[0]?.count || 1)) * 60}px` }}
                            />
                            <span className="text-sm font-medium text-muted-foreground w-6 text-right">
                              {city.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Donor Type Distribution */}
                <Card className="shadow-card border border-border/60 rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="font-display flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-primary" />
                      Donor Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {donorStats.map((donor) => (
                        <div key={donor.type} className="flex items-center justify-between">
                          <span className="text-sm text-foreground flex items-center gap-2">
                            <span>{donor.icon}</span>
                            {donor.type}
                          </span>
                          <Badge variant="outline" className="rounded-full">{donor.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;