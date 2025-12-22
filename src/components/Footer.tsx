import logo from '@/assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <img 
            src={logo} 
            alt="Anndaata Logo" 
            className="h-14 w-auto object-contain"
          />
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
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