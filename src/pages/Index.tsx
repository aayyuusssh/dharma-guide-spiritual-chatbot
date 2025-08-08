import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Header from "@/components/Header";
import { MessageCircle, GraduationCap, BookOpen } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Spiritual Guide",
      description: "Get personalized guidance from an AI trained in ancient wisdom, Hindu Cultural stories, and spiritual teachings.",
      icon: MessageCircle,
      gradient: "bg-gradient-spiritual",
      to: "/spiritual-guide",
      features: [
        "Chat with AI spiritual guide",
        "References from Vedas & Epics",
        "Emotional support & advice",
        "Explore to Hindu Scriptures "
      ]
    },
    {
      title: "Learning Modules",
      description: "Decode and understand complex shlokas, verses, and spiritual teachings in simple, easy-to-understand language.",
      icon: GraduationCap,
      gradient: "bg-gradient-wisdom",
      to: "/learning",
      features: [
        "Shloka explanations",
        "Simple translations",
        "Audio pronunciation",
        "Interactive learning"
      ]
    },
    {
      title: "Sacred Library",
      description: "Explore a vast collection of holy texts including Vedas, Puranas, Ramayana, Mahabharata, and more to enhance your mind.",
      icon: BookOpen,
      gradient: "bg-gradient-peace",
      to: "/library",
      features: [
        "Vedas & Puranas",
        "Epic texts",
        "Search functionality",
        "Multiple languages"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three Paths to <span className="bg-gradient-spiritual bg-clip-text text-transparent">Spiritual Growth</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover ancient wisdom through modern technology. Our platform combines AI-powered guidance, 
              interactive learning, and a comprehensive library of sacred texts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-saffron mb-2">1000+</div>
              <div className="text-muted-foreground">Sacred Verses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep-blue mb-2">50+</div>
              <div className="text-muted-foreground">Holy Books</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sacred-green mb-2">24/7</div>
              <div className="text-muted-foreground">AI Guidance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-wisdom-purple mb-2">∞</div>
              <div className="text-muted-foreground">Wisdom to Explore</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
