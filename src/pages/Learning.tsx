import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GraduationCap, Search, BookOpen, Volume2, Eye } from "lucide-react";

const Learning = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShloka, setSelectedShloka] = useState(null);

  const shlokaExamples = [
    {
      id: 1,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
      transliteration: "Yadā yadā hi dharmasya glānirbhavati bhārata",
      source: "Bhagavad Gita 4.7",
      translation: "Whenever there is a decline in righteousness, O Bharata...",
      explanation: "This famous verse from the Bhagavad Gita speaks about divine intervention when dharma (righteousness) declines in the world.",
      category: "Dharma"
    },
    {
      id: 2,
      sanskrit: "सत्यमेव जयते नानृतं",
      transliteration: "Satyameva jayate nānṛtaṃ",
      source: "Mundaka Upanishad 3.1.6",
      translation: "Truth alone triumphs, not falsehood",
      explanation: "This verse emphasizes the supreme power of truth over lies. It's also India's national motto, highlighting the importance of truthfulness.",
      category: "Truth"
    },
    {
      id: 3,
      sanskrit: "वसुधैव कुटुम्बकम्",
      transliteration: "Vasudhaiva kuṭumbakam",
      source: "Maha Upanishad 6.71",
      translation: "The world is one family",
      explanation: "This beautiful concept teaches us that all of humanity is one large family, promoting unity and universal brotherhood.",
      category: "Unity"
    },
    {
      id: 4,
      sanskrit: "अहिंसा परमो धर्मः",
      transliteration: "Ahiṃsā paramo dharmaḥ",
      source: "Mahabharata",
      translation: "Non-violence is the highest virtue",
      explanation: "This fundamental principle teaches that non-violence towards all living beings is the greatest dharma one can follow.",
      category: "Non-violence"
    }
  ];

  const filteredShlokas = shlokaExamples.filter(shloka =>
    shloka.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shloka.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shloka.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shloka.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-wisdom text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <GraduationCap className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Spiritual Learning</h1>
          <p className="text-xl opacity-90">
            Decode and understand sacred verses, shlokas, and spiritual teachings in simple language
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search Sacred Verses</span>
            </CardTitle>
            <CardDescription>
              Enter a shloka, verse, or keyword to find explanations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Search for shlokas, mantras, or teachings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-gradient-wisdom hover:opacity-90">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Shloka List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Sacred Verses</h2>
            {filteredShlokas.map((shloka) => (
              <Card
                key={shloka.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-wisdom ${
                  selectedShloka?.id === shloka.id ? "ring-2 ring-primary border-primary" : "border-border/50"
                }`}
                onClick={() => setSelectedShloka(shloka)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-lg leading-relaxed">
                        {shloka.sanskrit}
                      </CardTitle>
                      <CardDescription className="italic">
                        {shloka.transliteration}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {shloka.category}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    From: {shloka.source}
                  </p>
                  <p className="font-medium text-sm">
                    "{shloka.translation}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Explanation */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {selectedShloka ? (
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>Detailed Explanation</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Sanskrit Text */}
                  <div>
                    <h3 className="font-semibold mb-2">Sanskrit</h3>
                    <p className="text-lg leading-relaxed bg-muted/50 p-4 rounded-lg">
                      {selectedShloka.sanskrit}
                    </p>
                  </div>

                  {/* Transliteration */}
                  <div>
                    <h3 className="font-semibold mb-2">Transliteration</h3>
                    <p className="italic text-muted-foreground">
                      {selectedShloka.transliteration}
                    </p>
                  </div>

                  {/* Translation */}
                  <div>
                    <h3 className="font-semibold mb-2">Translation</h3>
                    <p className="font-medium">
                      "{selectedShloka.translation}"
                    </p>
                  </div>

                  {/* Source */}
                  <div>
                    <h3 className="font-semibold mb-2">Source</h3>
                    <p className="text-primary">
                      {selectedShloka.source}
                    </p>
                  </div>

                  {/* Explanation */}
                  <div>
                    <h3 className="font-semibold mb-2">Simple Explanation</h3>
                    <p className="leading-relaxed">
                      {selectedShloka.explanation}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {selectedShloka.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Verse</h3>
                  <p className="text-muted-foreground">
                    Choose a shloka or verse from the list to see its detailed explanation, 
                    translation, and spiritual significance.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;