import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Clock, Utensils } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-warm opacity-60" />
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-pulse" />
          
          <div className="container relative py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Heart className="h-4 w-4" />
                <span>Share Food, Share Love</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Rescue Surplus Food,{' '}
                <span className="text-gradient">Feed India</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect restaurants, weddings, festivals, and households with those in need. 
                Together, we can reduce food waste and end hunger.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/post">
                  <Button variant="hero" size="xl" className="gap-2">
                    Post Surplus Food
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" size="xl">
                    Browse Available Food
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: Utensils, value: '10,000+', label: 'Meals Shared' },
                { icon: Users, value: '500+', label: 'Active Donors' },
                { icon: Heart, value: '50+', label: 'Cities Covered' },
                { icon: Clock, value: '24/7', label: 'Always Available' },
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="text-center p-6 rounded-xl bg-card shadow-card animate-fade-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-hero mb-3">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Simple steps to share or receive surplus food in your community
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Post Surplus',
                  description: 'Restaurants, caterers, or households post details about their surplus food with location and quantity.',
                  icon: '📝',
                },
                {
                  step: '02',
                  title: 'Browse & Claim',
                  description: 'NGOs, community kitchens, or individuals browse available food and claim what they need.',
                  icon: '🔍',
                },
                {
                  step: '03',
                  title: 'Collect & Share',
                  description: 'Coordinate pickup, collect the food, and distribute it to those who need it most.',
                  icon: '🤝',
                },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="relative p-8 rounded-2xl bg-card border border-border shadow-card transition-all duration-300 hover:shadow-soft hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="absolute -top-4 left-8 px-3 py-1 rounded-full gradient-hero text-primary-foreground text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
              <div className="relative">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                  Every meal shared is a step towards a hunger-free India. 
                  Join thousands of donors and receivers today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/post">
                    <Button 
                      size="xl" 
                      className="bg-card text-foreground hover:bg-card/90 shadow-soft"
                    >
                      Start Sharing Food
                    </Button>
                  </Link>
                  <Link to="/browse">
                    <Button 
                      size="xl" 
                      variant="outline"
                      className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                    >
                      Find Food Near You
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
