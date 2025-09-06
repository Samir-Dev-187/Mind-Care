import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Search, 
  Clock, 
  Star, 
  Play,
  Download,
  Heart,
  Filter
} from 'lucide-react';

interface SelfHelpScreenProps {
  language: string;
}

const translations = {
  en: {
    title: "Self-Help Library",
    subtitle: "Evidence-based resources for your wellbeing journey",
    search: "Search resources...",
    categories: {
      all: "All Resources",
      videos: "Videos",
      audios: "Audio",
      articles: "Articles"
    },
    tags: {
      anxiety: "Anxiety",
      depression: "Depression", 
      stress: "Stress Management",
      mindfulness: "Mindfulness",
      sleep: "Sleep",
      relationships: "Relationships",
      selfcare: "Self Care"
    },
    popular: "Popular Resources",
    recent: "Recently Added",
    duration: "Duration",
    rating: "Rating",
    free: "Free"
  },
  hi: {
    title: "स्व-सहायता पुस्तकालय",
    subtitle: "आपकी कल्याण यात्रा के लिए प्रमाण-आधारित संसाधन",
    search: "संसाधन खोजें...",
    categories: {
      all: "सभी संसाधन",
      videos: "वीडियो",
      audios: "ऑडियो",
      articles: "लेख"
    },
    tags: {
      anxiety: "चिंता",
      depression: "अवसाद",
      stress: "तनाव प्रबंधन",
      mindfulness: "सचेतना",
      sleep: "नींद",
      relationships: "रिश्ते",
      selfcare: "आत्म देखभाल"
    },
    popular: "लोकप्रिय संसाधन",
    recent: "हाल ही में जोड़े गए",
    duration: "अवधि",
    rating: "रेटिंग",
    free: "मुफ्त"
  }
};

const resources = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise",
    description: "A quick guided breathing exercise to reduce anxiety and stress",
    type: "audio",
    duration: "5 min",
    rating: 4.8,
    tags: ["anxiety", "stress"],
    image: "https://images.unsplash.com/photo-1713428856080-43fc975d2496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxicmVhdGhpbmclMjBleGVyY2lzZSUyMGNhbG18ZW58MXx8fHwxNzU2ODc0OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true
  },
  {
    id: 2,
    title: "Understanding Depression: A Comprehensive Guide",
    description: "Evidence-based information about depression, its symptoms, and coping strategies",
    type: "article",
    duration: "15 min read",
    rating: 4.6,
    tags: ["depression", "selfcare"],
    image: "https://images.unsplash.com/photo-1695634838382-b7c41de2c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcmVsYXhhdGlvbiUyMG5hdHVyZXxlbnwxfHx8fDE3NTY5MjE3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true
  },
  {
    id: 3,
    title: "Mindful Yoga for Anxiety Relief",
    description: "Gentle yoga sequences designed to calm the mind and body",
    type: "video",
    duration: "20 min",
    rating: 4.9,
    tags: ["anxiety", "mindfulness"],
    image: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwd2VsbG5lc3MlMjBtaW5kZnVsbmVzc3xlbnwxfHx8fDE3NTY5MjE3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true
  },
  {
    id: 4,
    title: "Sleep Hygiene: Better Rest for Better Mental Health",
    description: "Practical tips and techniques for improving sleep quality",
    type: "article",
    duration: "8 min read",
    rating: 4.5,
    tags: ["sleep", "selfcare"],
    image: "https://images.unsplash.com/photo-1695634838382-b7c41de2c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcmVsYXhhdGlvbiUyMG5hdHVyZXxlbnwxfHx8fDE3NTY5MjE3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recent: true
  },
  {
    id: 5,
    title: "Progressive Muscle Relaxation",
    description: "A guided audio session for deep physical and mental relaxation",
    type: "audio",
    duration: "12 min",
    rating: 4.7,
    tags: ["stress", "mindfulness"],
    image: "https://images.unsplash.com/photo-1713428856080-43fc975d2496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxicmVhdGhpbmclMjBleGVyY2lzZSUyMGNhbG18ZW58MXx8fHwxNzU2ODc0OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recent: true
  },
  {
    id: 6,
    title: "Building Healthy Relationships",
    description: "Communication strategies and boundary setting for better relationships",
    type: "video",
    duration: "18 min",
    rating: 4.4,
    tags: ["relationships", "selfcare"],
    image: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwd2VsbG5lc3MlMjBtaW5kZnVsbmVzc3xlbnwxfHx8fDE3NTY5MjE3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recent: true
  }
];

export default function SelfHelpScreen({ language }: SelfHelpScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
    const matchesTag = !selectedTag || resource.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const popularResources = resources.filter(r => r.popular);
  const recentResources = resources.filter(r => r.recent);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'article': return BookOpen;
      default: return BookOpen;
    }
  };

  const ResourceCard = ({ resource }: { resource: any }) => {
    const Icon = getResourceIcon(resource.type);
    
    return (
      <Card className="rounded-2xl border-accent/20 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
        <div className="relative">
          <ImageWithFallback 
            src={resource.image}
            alt={resource.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-foreground border-0">
              <Icon className="w-3 h-3 mr-1" />
              {resource.type}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground border-0">
              {t.free}
            </Badge>
          </div>
          {resource.type === 'video' || resource.type === 'audio' ? (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-primary ml-1" />
              </div>
            </div>
          ) : null}
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {resource.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{resource.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-accent"
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              >
                {t.tags[tag as keyof typeof t.tags]}
              </Badge>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1 rounded-xl">
              {resource.type === 'article' ? 'Read' : resource.type === 'video' ? 'Watch' : 'Listen'}
            </Button>
            <Button size="sm" variant="outline" className="rounded-xl">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="rounded-xl">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-2xl border-accent/20"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 rounded-2xl">
              <TabsTrigger value="all" className="rounded-xl">{t.categories.all}</TabsTrigger>
              <TabsTrigger value="videos" className="rounded-xl">{t.categories.videos}</TabsTrigger>
              <TabsTrigger value="audios" className="rounded-xl">{t.categories.audios}</TabsTrigger>
              <TabsTrigger value="articles" className="rounded-xl">{t.categories.articles}</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(t.tags).map(([key, label]) => (
              <Badge
                key={key}
                variant={selectedTag === key ? "default" : "outline"}
                className="cursor-pointer rounded-full hover:bg-accent transition-colors"
                onClick={() => setSelectedTag(selectedTag === key ? '' : key)}
              >
                {label}
              </Badge>
            ))}
            {selectedTag && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTag('')}
                className="rounded-full h-auto py-1 px-3"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Popular Resources */}
        {!searchTerm && !selectedTag && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{t.popular}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Added */}
        {!searchTerm && !selectedTag && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{t.recent}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* All/Filtered Resources */}
        {(searchTerm || selectedTag) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'Filtered Resources'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredResources.length} resources found
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {filteredResources.length === 0 && (searchTerm || selectedTag) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}