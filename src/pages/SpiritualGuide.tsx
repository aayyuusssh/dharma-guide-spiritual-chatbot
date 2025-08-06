import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Heart, Brain, Lightbulb } from "lucide-react";

const SpiritualGuide = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: "bot",
      content: "🙏 Namaste! I'm your spiritual guide. Share what's on your heart - whether it's emotional challenges, life questions, or seeking inner peace. I'll provide guidance rooted in ancient wisdom from the Vedas, Ramayana, Mahabharata, and other sacred texts.",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage = message;
    setMessage("");
    
    // Add user message
    setConversation(prev => [...prev, {
      type: "user",
      content: userMessage,
      timestamp: new Date()
    }]);

    // Simulate AI response (in real implementation, this would call your AI API)
    setTimeout(() => {
      const responses = [
        "Based on the teachings of the Bhagavad Gita, Lord Krishna reminds us that 'You have the right to perform your actions, but you are not entitled to the fruits of your actions.' This wisdom suggests focusing on your efforts rather than being anxious about outcomes. In the Ramayana, when Sita faced difficulties, she found strength through faith and dharma. Your current challenge is an opportunity for spiritual growth.",
        "The Mahabharata teaches us through Yudhishthira's trials that even the most righteous face difficulties. In the Vana Parva, when the Pandavas were in exile, they learned that patience and righteousness eventually lead to victory. Your situation reminds me of this teaching - maintain your dharma and trust in divine timing.",
        "In the Vedas, particularly the Upanishads, we learn 'Tat tvam asi' - 'Thou art That.' This means the divine consciousness within you is the same as the universal consciousness. Your emotional pain is temporary, but your true Self is eternal and peaceful. Like Nachiketa in the Katha Upanishad, seek the eternal rather than the temporary."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversation(prev => [...prev, {
        type: "bot",
        content: randomResponse,
        timestamp: new Date()
      }]);
      
      setIsLoading(false);
    }, 2000);
  };

  const suggestionCards = [
    {
      icon: Heart,
      title: "Emotional Healing",
      description: "Finding peace through ancient wisdom",
      query: "I'm feeling overwhelmed with emotions. How can ancient wisdom help me find peace?"
    },
    {
      icon: Brain,
      title: "Life Decisions",
      description: "Guidance for important choices",
      query: "I'm facing a difficult decision in life. What would the ancient texts advise?"
    },
    {
      icon: Lightbulb,
      title: "Spiritual Growth",
      description: "Deepening your spiritual practice",
      query: "How can I deepen my spiritual practice and connection with the divine?"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-spiritual text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <MessageCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Spiritual Guide</h1>
          <p className="text-xl opacity-90">
            Get personalized guidance rooted in ancient wisdom and sacred texts
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Suggestion Cards */}
        {conversation.length === 1 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">How can I guide you today?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {suggestionCards.map((card, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-peaceful transition-all duration-300 border-border/50 hover:border-border"
                  onClick={() => setMessage(card.query)}
                >
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 bg-gradient-spiritual rounded-lg flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Conversation */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.type === "user"
                    ? "bg-gradient-spiritual text-white"
                    : "bg-card border border-border"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`text-xs mt-2 ${
                  msg.type === "user" ? "text-white/70" : "text-muted-foreground"
                }`}>
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <Textarea
                placeholder="Share your thoughts, questions, or emotional challenges..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 resize-none border-border/50 focus:border-primary"
                rows={3}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                className="bg-gradient-spiritual hover:opacity-90 self-end"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpiritualGuide;