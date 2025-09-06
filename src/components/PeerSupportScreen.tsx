import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MessageSquare, 
  Plus, 
  Heart, 
  MessageCircle, 
  Shield, 
  Users, 
  Clock,
  Bookmark,
  Flag,
  Search,
  Filter,
  ThumbsUp,
  Reply,
  MoreVertical,
  Eye,
  TrendingUp
} from 'lucide-react';

interface PeerSupportScreenProps {
  language: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  timestamp: Date;
  likes: number;
  replies: number;
  views: number;
  isAnonymous: boolean;
  isLiked: boolean;
  isTrending: boolean;
  tags: string[];
}

const translations = {
  en: {
    title: "Peer Support Community",
    subtitle: "Connect with fellow students in a safe, moderated environment",
    newPost: "New Post",
    categories: {
      all: "All Topics",
      stress: "Stress & Anxiety",
      exams: "Exam Pressure",
      sleep: "Sleep Issues",
      relationships: "Relationships",
      academic: "Academic Pressure",
      general: "General Support"
    },
    filters: {
      trending: "Trending",
      recent: "Most Recent",
      popular: "Most Popular",
      unanswered: "Unanswered"
    },
    postTitle: "Post Title",
    postContent: "Share your thoughts or ask for support...",
    category: "Category",
    postAnonymously: "Post Anonymously",
    publishPost: "Publish Post",
    reply: "Reply",
    like: "Like",
    views: "views",
    replies: "replies",
    moderatedNote: "🛡️ This is a safe, moderated space where all posts are reviewed.",
    searchPlaceholder: "Search discussions...",
    guidelines: {
      title: "Community Guidelines",
      respectful: "Be respectful and supportive",
      noPersonalInfo: "Don't share personal information",
      noHateSpeech: "No hate speech or discrimination",
      reportConcerns: "Report any concerning content"
    }
  },
  hi: {
    title: "साथी सहायता समुदाय",
    subtitle: "एक सुरक्षित, नियंत्रित वातावरण में साथी छात्रों से जुड़ें",
    newPost: "नई पोस्ट",
    categories: {
      all: "सभी विषय",
      stress: "तनाव और चिंता",
      exams: "परीक्षा का दबाव",
      sleep: "नींद की समस्याएं",
      relationships: "रिश्ते",
      academic: "शैक्षणिक दबाव",
      general: "सामान्य सहायता"
    },
    filters: {
      trending: "ट्रेंडिंग",
      recent: "नवीनतम",
      popular: "सबसे लोकप्रिय",
      unanswered: "अनुत्तरित"
    },
    postTitle: "पोस्ट शीर्षक",
    postContent: "अपने विचार साझा करें या सहायता मांगें...",
    category: "श्रेणी",
    postAnonymously: "गुमनाम रूप से पोस्ट करें",
    publishPost: "पोस्ट प्रकाशित करें",
    reply: "उत्तर",
    like: "पसंद",
    views: "दृश्य",
    replies: "उत्तर",
    moderatedNote: "🛡️ यह एक सुरक्षित, नियंत्रित स्थान है जहां सभी पोस्ट की समीक्षा की जाती है।",
    searchPlaceholder: "चर्चाओं में खोजें...",
    guidelines: {
      title: "समुदाय दिशानिर्देश",
      respectful: "सम्मानजनक और सहायक बनें",
      noPersonalInfo: "व्यक्तिगत जानकारी साझा न करें",
      noHateSpeech: "घृणास्पद भाषण या भेदभाव न करें",
      reportConcerns: "किसी भी चिंताजनक सामग्री की रिपोर्ट करें"
    }
  }
};

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: 1,
    title: "Feeling overwhelmed with semester workload",
    content: "I'm in my final year and the pressure is getting to me. Anyone else feeling the same? How do you manage multiple deadlines?",
    category: "stress",
    author: "Anonymous Owl",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 23,
    replies: 8,
    views: 156,
    isAnonymous: true,
    isLiked: false,
    isTrending: true,
    tags: ["stress", "deadlines", "final-year"]
  },
  {
    id: 2,
    title: "Sleep schedule completely messed up",
    content: "I've been staying up till 3 AM every night and can't seem to fix my sleep cycle. It's affecting my concentration during lectures.",
    category: "sleep",
    author: "Night Owl",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 15,
    replies: 12,
    views: 89,
    isAnonymous: true,
    isLiked: true,
    isTrending: false,
    tags: ["sleep", "concentration", "lectures"]
  },
  {
    id: 3,
    title: "Anxiety before presentations",
    content: "Does anyone else get really nervous before presentations? My heart races and I forget everything I prepared.",
    category: "stress",
    author: "Quiet Student",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 31,
    replies: 15,
    views: 203,
    isAnonymous: true,
    isLiked: false,
    isTrending: true,
    tags: ["anxiety", "presentations", "public-speaking"]
  }
];

export default function PeerSupportScreen({ language }: PeerSupportScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [posts, setPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    category: 'general',
    isAnonymous: true
  });

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (selectedFilter) {
      case 'trending':
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.likes - a.likes;
      case 'recent':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'unanswered':
        return a.replies - b.replies;
      default:
        return b.timestamp.getTime() - a.timestamp.getTime();
    }
  });

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleNewPost = () => {
    if (newPostData.title && newPostData.content) {
      const newPost: Post = {
        id: posts.length + 1,
        title: newPostData.title,
        content: newPostData.content,
        category: newPostData.category,
        author: newPostData.isAnonymous ? "Anonymous Student" : "Student User",
        timestamp: new Date(),
        likes: 0,
        replies: 0,
        views: 0,
        isAnonymous: newPostData.isAnonymous,
        isLiked: false,
        isTrending: false,
        tags: []
      };
      
      setPosts(prev => [newPost, ...prev]);
      setNewPostData({ title: '', content: '', category: 'general', isAnonymous: true });
      setShowNewPost(false);
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      stress: 'bg-red-100 text-red-700 border-red-200',
      exams: 'bg-orange-100 text-orange-700 border-orange-200',
      sleep: 'bg-purple-100 text-purple-700 border-purple-200',
      relationships: 'bg-pink-100 text-pink-700 border-pink-200',
      academic: 'bg-blue-100 text-blue-700 border-blue-200',
      general: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl"
                 style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' }}>
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-gray-800">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Moderated Notice */}
          <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">
                {t.moderatedNote}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-2xl border-gray-200 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl border-gray-200 bg-white/80 backdrop-blur-sm">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.categories).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-40 rounded-2xl border-gray-200 bg-white/80 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.filters).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => setShowNewPost(!showNewPost)}
            className="rounded-2xl font-medium shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.newPost}
          </Button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="rounded-3xl shadow-xl border-gray-200 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>{t.newPost}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder={t.postTitle}
                    value={newPostData.title}
                    onChange={(e) => setNewPostData(prev => ({ ...prev, title: e.target.value }))}
                    className="rounded-2xl border-gray-200 bg-gray-50/50"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder={t.postContent}
                    value={newPostData.content}
                    onChange={(e) => setNewPostData(prev => ({ ...prev, content: e.target.value }))}
                    className="rounded-2xl border-gray-200 bg-gray-50/50 min-h-32 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                  <Select 
                    value={newPostData.category} 
                    onValueChange={(value) => setNewPostData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="w-full sm:w-48 rounded-2xl border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.categories).filter(([key]) => key !== 'all').map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={newPostData.isAnonymous}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      {t.postAnonymously}
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleNewPost}
                    className="rounded-2xl font-medium"
                    style={{ background: 'linear-gradient(135deg, #34C759 0%, #4A90E2 100%)' }}
                  >
                    {t.publishPost}
                  </Button>
                  <Button
                    onClick={() => setShowNewPost(false)}
                    variant="outline"
                    className="rounded-2xl font-medium border-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <Card key={post.id} className="rounded-3xl shadow-lg border-gray-200 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-medium">
                          {post.author.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-800">{post.author}</p>
                          {post.isTrending && (
                            <Badge className="rounded-full bg-orange-100 text-orange-700 border-orange-200">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{getTimeAgo(post.timestamp)}</span>
                          <span>•</span>
                          <Badge className={`rounded-full text-xs ${getCategoryColor(post.category)}`}>
                            {t.categories[post.category as keyof typeof t.categories]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Stats & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} {t.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies} {t.replies}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`rounded-xl ${post.isLiked ? 'text-red-600 bg-red-50' : 'text-gray-500'}`}
                      >
                        <ThumbsUp className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                        {post.likes} {t.like}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="rounded-xl text-gray-500">
                        <Reply className="w-4 h-4 mr-2" />
                        {t.reply}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="rounded-xl text-gray-500">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guidelines */}
        <Card className="rounded-3xl shadow-lg border-gray-200 bg-yellow-50/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-yellow-600" />
              <span>{t.guidelines.title}</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.values(t.guidelines).slice(1).map((guideline, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">{guideline}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}