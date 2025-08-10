import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Download, Star, Filter } from "lucide-react";
import Header from "@/components/Header";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Vedas", "Puranas", "Epics", "Upanishads", "Sutras", "Philosophy"];

  const books = [
    {
      id: 1,
      title: "Bhagavad Gita",
      subtitle: "The Song of God",
      description: "The most famous dialogue between Prince Arjuna and Lord Krishna, covering dharma, karma, and the path to liberation.",
      category: "Epics",
      chapters: 18,
      verses: 700,
      language: "Sanskrit",
      difficulty: "Beginner",
      cover: "bg-gradient-spiritual"
    },
    {
      id: 2,
      title: "Rig Veda",
      subtitle: "The Knowledge of Praise",
      description: "The oldest of the four Vedas, containing hymns and mantras dedicated to various deities.",
      category: "Vedas",
      chapters: 10,
      verses: 1028,
      language: "Vedic Sanskrit",
      difficulty: "Advanced",
      cover: "bg-gradient-wisdom"
    },
    {
      id: 3,
      title: "Ramayana",
      subtitle: "The Journey of Rama",
      description: "The epic tale of Prince Rama's journey, his exile, and the rescue of Sita from Ravana.",
      category: "Epics",
      chapters: 7,
      verses: 24000,
      language: "Sanskrit",
      rating: 5,
      difficulty: "Intermediate",
      cover: "bg-gradient-peace"
    },
    {
      id: 4,
      title: "Mahabharata",
      subtitle: "The Great Epic",
      description: "The world's longest epic poem, telling the story of the Kurukshetra war and the Pandava brothers.",
      category: "Epics",
      chapters: 18,
      verses: 100000,
      language: "Sanskrit",
      rating: 5,
      difficulty: "Advanced",
      cover: "bg-gradient-divine"
    },
    {
      id: 5,
      title: "Upanishads",
      subtitle: "The Secret Teachings",
      description: "Philosophical texts exploring the fundamental truths of existence, consciousness, and reality.",
      category: "Upanishads",
      chapters: 108,
      verses: 5000,
      language: "Sanskrit",
      rating: 4,
      difficulty: "Advanced",
      cover: "bg-gradient-wisdom"
    },
    {
      id: 6,
      title: "Vishnu Purana",
      subtitle: "Stories of Lord Vishnu",
      description: "Tales and teachings centered around Lord Vishnu and his various incarnations.",
      category: "Puranas",
      chapters: 6,
      verses: 7000,
      language: "Sanskrit",
      rating: 4,
      difficulty: "Intermediate",
      cover: "bg-gradient-spiritual"
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-sacred-green/10 text-sacred-green";
      case "Intermediate": return "bg-saffron/10 text-saffron";
      case "Advanced": return "bg-deep-blue/10 text-deep-blue";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="bg-gradient-peace text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Spiritual Library</h1>
          <p className="text-xl opacity-90">
            Explore the vast collection of sacred texts, Vedas, Puranas, and spiritual literature
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for books, texts, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-peace" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-peaceful transition-all duration-300 border-border/50">
              <CardHeader>
                {/* Book Cover */}
                <div className={`w-full h-32 ${book.cover} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="text-center z-10">
                    <BookOpen className="w-8 h-8 text-white mb-2 mx-auto" />
                    <span className="text-white font-bold text-sm">{book.title}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {book.title}
                      </CardTitle>
                      <CardDescription className="font-medium">
                        {book.subtitle}
                      </CardDescription>
                    </div>
                    {/* <div className="flex items-center space-x-1">
                      {[...Array(book.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-saffron text-saffron" />
                      ))}
                    </div> */}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.description}
                </p>

                {/* Book Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Chapters:</span>
                    <span className="ml-1 font-medium">{book.chapters}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Verses:</span>
                    <span className="ml-1 font-medium">{book.verses.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="ml-1 font-medium">{book.language}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(book.difficulty)}`}>
                    {book.difficulty}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1 bg-gradient-peace hover:opacity-90 " size="sm">
                    Read Online
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;