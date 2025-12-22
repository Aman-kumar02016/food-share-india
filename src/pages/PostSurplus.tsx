import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { DONOR_TYPES, FOOD_TYPES, CITIES, DonorType, FoodType, SurplusPost } from '@/lib/types';
import { addPost, generateId } from '@/lib/storage';
import { Utensils, MapPin, Phone, Clock, Package } from 'lucide-react';

const PostSurplus = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    donorName: '',
    donorType: '' as DonorType,
    foodType: '' as FoodType,
    foodDescription: '',
    quantity: '',
    servings: '',
    location: '',
    city: '',
    expiryHours: '4',
    contactPhone: '',
    isVegetarian: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.donorName || !formData.donorType || !formData.foodDescription || 
        !formData.quantity || !formData.servings || !formData.location || 
        !formData.city || !formData.contactPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Create new post
    const newPost: SurplusPost = {
      id: generateId(),
      donorName: formData.donorName,
      donorType: formData.donorType,
      foodType: formData.foodType || 'cooked',
      foodDescription: formData.foodDescription,
      quantity: formData.quantity,
      servings: parseInt(formData.servings) || 10,
      location: formData.location,
      city: formData.city,
      expiryTime: new Date(Date.now() + parseInt(formData.expiryHours) * 60 * 60 * 1000).toISOString(),
      contactPhone: formData.contactPhone,
      isVegetarian: formData.isVegetarian,
      createdAt: new Date().toISOString(),
      claimed: false,
    };

    addPost(newPost);

    toast({
      title: "🎉 Food Posted Successfully!",
      description: "Thank you for sharing! Your surplus food is now visible to receivers.",
    });

    setIsSubmitting(false);
    navigate('/browse');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-2xl px-4 md:px-6">
          <div className="text-center mb-10 animate-fade-up">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
              Post Surplus Food
            </h1>
            <p className="text-muted-foreground">
              Share your extra food with those who need it
            </p>
          </div>

          <Card className="animate-fade-up shadow-soft border border-border/60 rounded-3xl" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-6 pt-8 px-6 md:px-8">
              <CardTitle className="font-display text-xl">Food Details</CardTitle>
              <CardDescription>
                Provide accurate information to help receivers find and collect the food
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 md:px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donor Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">Your Name / Organization *</Label>
                    <Input
                      id="donorName"
                      placeholder="e.g., Sharma Restaurant"
                      value={formData.donorName}
                      onChange={e => setFormData({ ...formData, donorName: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Donor Type *</Label>
                    <Select 
                      value={formData.donorType} 
                      onValueChange={(value: DonorType) => setFormData({ ...formData, donorType: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {DONOR_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <span className="flex items-center gap-2">
                              {type.icon} {type.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Food Info */}
                <div className="space-y-2">
                  <Label htmlFor="foodDescription" className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    Food Description *
                  </Label>
                  <Textarea
                    id="foodDescription"
                    placeholder="Describe the food items (e.g., Dal, Rice, Roti, Paneer Curry - freshly prepared)"
                    value={formData.foodDescription}
                    onChange={e => setFormData({ ...formData, foodDescription: e.target.value })}
                    rows={3}
                    className="rounded-xl"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Food Type</Label>
                    <Select 
                      value={formData.foodType} 
                      onValueChange={(value: FoodType) => setFormData({ ...formData, foodType: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {FOOD_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Quantity *
                    </Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 10 kg"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servings">Approx. Servings *</Label>
                    <Input
                      id="servings"
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.servings}
                      onChange={e => setFormData({ ...formData, servings: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* Vegetarian Toggle */}
                <div className="flex items-center justify-between p-5 bg-muted/50 rounded-2xl border border-border/50">
                  <div>
                    <Label className="text-base">Vegetarian Food</Label>
                    <p className="text-sm text-muted-foreground">Is this food 100% vegetarian?</p>
                  </div>
                  <Switch
                    checked={formData.isVegetarian}
                    onCheckedChange={checked => setFormData({ ...formData, isVegetarian: checked })}
                  />
                </div>

                {/* Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Pickup Location *
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Sector 15, Near Metro Station"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Select 
                      value={formData.city} 
                      onValueChange={value => setFormData({ ...formData, city: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact & Expiry */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Contact Phone *
                    </Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Available For
                    </Label>
                    <Select 
                      value={formData.expiryHours} 
                      onValueChange={value => setFormData({ ...formData, expiryHours: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Hours</SelectItem>
                        <SelectItem value="4">4 Hours</SelectItem>
                        <SelectItem value="6">6 Hours</SelectItem>
                        <SelectItem value="8">8 Hours</SelectItem>
                        <SelectItem value="12">12 Hours</SelectItem>
                        <SelectItem value="24">24 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full rounded-xl mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Surplus Food'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostSurplus;