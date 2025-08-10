import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  to: string;
  features: string[];
}

const FeatureCard = ({ title, description, icon: Icon, gradient, to, features }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-border transition-all duration-300 hover:shadow-peaceful">
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <CardHeader className="relative text-center">
        <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-4 shadow-peaceful mx-auto`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground ">{title}</CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-sm text-muted-foreground ">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link to={to}>
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mt-3"
          >
            Explore {title}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;