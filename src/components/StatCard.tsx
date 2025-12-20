import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down';
}

const StatCard = ({ title, value, icon: Icon, description }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
