import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with spiritual patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-muted" />
      <div className="absolute inset-0 bg-gradient-divine opacity-5" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-spiritual rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-wisdom rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-peace rounded-full opacity-20 animate-pulse delay-500" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Spiritual Symbol */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-spiritual rounded-full flex items-center justify-center shadow-divine animate-pulse">
              <span className="text-3xl text-white font-bold">ॐ</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-spiritual bg-clip-text text-transparent">
                Discover Inner
              </span>
              <br />
              <span className="text-foreground">Wisdom & Peace</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your spiritual journey begins here at TATVA (Truthful Answers Through Vedic Authenticity). Get personalized guidance from ancient wisdom, 
              learn sacred teachings, and explore the vast library of spiritual knowledge.
            </p>
          </div>
          
          {/* Features highlight */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <Sparkles className="w-4 h-4 text-saffron" />
              <span>AI Spiritual Guide</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <Sparkles className="w-4 h-4 text-deep-blue" />
              <span>Ancient Wisdom</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
              <Sparkles className="w-4 h-4 text-sacred-green" />
              <span>Sacred Library</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/spiritual-guide">
              <Button 
                size="lg" 
                className="bg-gradient-spiritual hover:opacity-90 text-white shadow-divine px-8 py-6 text-lg font-semibold group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/library">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-border hover:bg-muted px-8 py-6 text-lg font-semibold"
              >
                Explore Library
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="pt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted source of spiritual wisdom</p>
            <div className="flex justify-center space-x-8 opacity-60">
              <span className="text-sm font-medium">Vedas</span>
              <span className="text-sm font-medium">Ramayana</span>
              <span className="text-sm font-medium">Mahabharata</span>
              <span className="text-sm font-medium">Puranas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;