import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Globe, Heart, Brain, Calendar, BookOpen, MessageCircle, BarChart3, AlertTriangle, Users, LogIn, User } from 'lucide-react';

// Import all screen components
import LoginScreen from './components/LoginScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AssessmentScreen from './components/AssessmentScreen';
import ResultsScreen from './components/ResultsScreen';
import SelfHelpScreen from './components/SelfHelpScreen';
import ChatbotScreen from './components/ChatbotScreen';
import BookingScreen from './components/BookingScreen';
import ProfileScreen from './components/ProfileScreen';
import AdminDashboard from './components/AdminDashboard';
import CrisisScreen from './components/CrisisScreen';
import PeerSupportScreen from './components/PeerSupportScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const screens = {
    login: <LoginScreen 
      onLogin={() => {
        setIsLoggedIn(true);
        setCurrentScreen('onboarding');
      }}
      language={language}
      setLanguage={setLanguage}
    />,
    onboarding: <OnboardingScreen onNext={() => setCurrentScreen('assessment')} language={language} setLanguage={setLanguage} />,
    assessment: <AssessmentScreen onComplete={(results) => {
      setAssessmentResults(results);
      setCurrentScreen('results');
    }} language={language} />,
    results: <ResultsScreen 
      results={assessmentResults} 
      onSelfHelp={() => setCurrentScreen('selfhelp')}
      onBooking={() => setCurrentScreen('booking')}
      onChatbot={() => setCurrentScreen('chatbot')}
      language={language}
    />,
    selfhelp: <SelfHelpScreen language={language} />,
    chatbot: <ChatbotScreen language={language} onCrisis={() => setCurrentScreen('crisis')} />,
    booking: <BookingScreen language={language} setLanguage={setLanguage} />,
    profile: <ProfileScreen language={language} setLanguage={setLanguage} />,
    peersupport: <PeerSupportScreen language={language} />,
    admin: <AdminDashboard />,
    crisis: <CrisisScreen language={language} setLanguage={setLanguage} onBack={() => setCurrentScreen('onboarding')} />
  };

  const navigationItems = [
    { id: 'onboarding', label: 'Welcome', icon: Heart },
    { id: 'assessment', label: 'Assessment', icon: Brain },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'selfhelp', label: 'Resources', icon: BookOpen },
    { id: 'chatbot', label: 'Chat Support', icon: MessageCircle },
    { id: 'peersupport', label: 'Community', icon: Users },
    { id: 'booking', label: 'Book Session', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admin', label: 'Admin', icon: BarChart3 }
  ];

  // Don't show navigation on login screen
  if (currentScreen === 'login') {
    return screens[currentScreen];
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #ffffff 50%, #F0F9FF 100%)' }}>
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Mind Care</h1>
              {isLoggedIn && (
                <div className="hidden md:flex items-center space-x-2 ml-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Secure Session</span>
                </div>
              )}
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.slice(0, 7).map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentScreen === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentScreen(item.id)}
                    className={`flex items-center space-x-2 rounded-2xl font-medium transition-all duration-200 ${
                      currentScreen === item.id 
                        ? 'shadow-lg' 
                        : 'hover:bg-gray-100'
                    }`}
                    style={currentScreen === item.id ? {
                      background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)'
                    } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setCurrentScreen('crisis')}
                size="sm"
                className="flex items-center space-x-2 rounded-2xl font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden md:inline">SOS</span>
              </Button>
              
              {isLoggedIn ? (
                <Button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setCurrentScreen('login');
                  }}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 rounded-2xl font-medium border-gray-300 hover:bg-gray-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentScreen('login')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 rounded-2xl font-medium border-gray-300 hover:bg-gray-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-2 rounded-2xl font-medium border-gray-300 hover:bg-gray-50"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'हिं' : 'EN'}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-primary/10 fixed bottom-0 left-0 right-0 z-50 shadow-lg">
        <div className="flex justify-around py-3">
          {[navigationItems[0], navigationItems[2], navigationItems[6], navigationItems[7]].map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen(item.id)}
                className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)'
                } : {}}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
          <Button
            size="sm"
            onClick={() => setCurrentScreen('crisis')}
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3 rounded-2xl text-white shadow-md transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-medium">SOS</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {screens[currentScreen]}
      </main>
    </div>
  );
}