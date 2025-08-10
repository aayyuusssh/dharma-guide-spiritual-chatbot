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
          
          <div className="grid md:grid-cols-3 gap-8 ">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-background bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-saffron mb-2">10,000+</div>
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
      </section> */}

      <footer className="bg-gradient-to-b from-amber-50 to-orange-100 border-t border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-spiritual rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ॐ</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                  TATVA
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your companion for authentic Vedic wisdom and spiritual guidance. Discover the eternal truths through AI-powered spiritual conversations.
              </p>
              <div className="text-sm text-orange-600 font-medium">
                🕉️ सत्यमेव जयते • Truth Alone Triumphs
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-orange-700">Spiritual Journey</h3>
              <ul className="space-y-3">
                <li><a href="/spiritual-guide" className="text-muted-foreground hover:text-orange-600 transition-colors flex items-center"><MessageCircle className="w-4 h-4 mr-2" />Ask Spiritual Guide</a></li>
                <li><a href="/learning" className="text-muted-foreground hover:text-orange-600 transition-colors flex items-center"><GraduationCap className="w-4 h-4 mr-2" />Learn Vedic Wisdom</a></li>
                <li><a href="/library" className="text-muted-foreground hover:text-orange-600 transition-colors flex items-center"><BookOpen className="w-4 h-4 mr-2" />Sacred Library</a></li>
              </ul>
            </div>

            {/* Sacred Texts */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-orange-700">Sacred Texts</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">📿 Bhagavad Gita</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">🏺 Ramayana</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">⚔️ Mahabharata</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">🕉️ Upanishads</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">📜 Vedas</a></li>
              </ul>
            </div>

            {/* Spiritual Stats */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-orange-700">Sacred Numbers</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sacred Verses</span>
                  <span className="font-bold text-orange-600">10,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Holy Books</span>
                  <span className="font-bold text-black-100">50+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">AI Guidance</span>
                  <span className="font-bold text-green-900">24/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Wisdom to Explore</span>
                  <span className="font-bold text-blue-900 text-xl">∞</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spiritual Quote Section */}
          <div className="border-t border-orange-200 pt-8 mb-8">
            <div className="text-center">
              <blockquote className="text-lg font-medium text-orange-700 italic mb-2">
                "योगः कर्मसु कौशलम्"
              </blockquote>
              <p className="text-muted-foreground">
                "Yoga is skill in action" - Bhagavad Gita
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-orange-200 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                © 2025 TATVA. Spreading divine wisdom with reverence and authenticity.
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-sm text-muted-foreground">Connect with us:</span>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">
                    📧 Email
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">
                    💬 Community
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors">
                    🙏 Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
