import { SurplusPost, DONOR_TYPES } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Phone, Users, Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SurplusCardProps {
  post: SurplusPost;
  onClaim?: (postId: string) => void;
}

const SurplusCard = ({ post, onClaim }: SurplusCardProps) => {
  const donorInfo = DONOR_TYPES.find(d => d.value === post.donorType);
  
  const getTimeRemaining = () => {
    const expiry = new Date(post.expiryTime);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const handleClaim = () => {
    if (onClaim) {
      onClaim(post.id);
      toast({
        title: "🎉 Successfully Claimed!",
        description: `You've claimed food from ${post.donorName}. Contact them at ${post.contactPhone}`,
      });
    }
  };

  const timeRemaining = getTimeRemaining();
  const isUrgent = timeRemaining.includes('m left') && !timeRemaining.includes('h');

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1 animate-scale-in bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{donorInfo?.icon}</span>
            <div>
              <h3 className="font-display font-semibold text-foreground line-clamp-1">
                {post.donorName}
              </h3>
              <p className="text-xs text-muted-foreground">{donorInfo?.label}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {post.isVegetarian && (
              <Badge variant="outline" className="border-secondary text-secondary gap-1">
                <Leaf className="h-3 w-3" /> Veg
              </Badge>
            )}
            {post.claimed && (
              <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                Claimed
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-foreground mb-3 line-clamp-2">
          {post.foodDescription}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="line-clamp-1">{post.location}, {post.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span>~{post.servings} servings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className={`h-3.5 w-3.5 ${isUrgent ? 'text-destructive' : 'text-primary'}`} />
            <span className={isUrgent ? 'text-destructive font-medium' : ''}>
              {timeRemaining}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span>{post.contactPhone}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        {!post.claimed ? (
          <Button 
            onClick={handleClaim} 
            className="w-full" 
            variant="hero"
          >
            Claim This Food
          </Button>
        ) : (
          <div className="w-full text-center text-sm text-muted-foreground py-2 bg-muted rounded-lg">
            Claimed by {post.claimedBy}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SurplusCard;
