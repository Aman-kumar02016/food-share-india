import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Anndaata
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Connecting surplus food with those in need. Reduce waste, share love, build community.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for India • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
