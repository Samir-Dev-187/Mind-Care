// src/App.tsx
import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Globe, Heart, Brain, Calendar, BookOpen, MessageCircle, AlertTriangle, Users, LogIn, User as UserIcon } from 'lucide-react';
import { User } from './types';

// Import all screen components
import LoginScreen from './components/LoginScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AssessmentScreen from './components/AssessmentScreen';
import ResultsScreen from './components/ResultsScreen';
import SelfHelpScreen from './components/SelfHelpScreen';
import ChatbotScreen from './components/ChatbotScreen';
import BookingScreen from './components/BookingScreen';
import ProfileScreen from './components/ProfileScreen';
import CrisisScreen from './components/CrisisScreen';
import PeerSupportScreen from './components/PeerSupportScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState<User | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentScreen('results');
  };

  const handleLogin = (loginData: { user: User }) => {
    setUser(loginData.user);
    setCurrentScreen('onboarding');
  };

  const handleLogout = () => {
    setUser(null);
    setConsentGiven(false);
    setCurrentScreen('login');
  };

  const HomeDashboard = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <Button onClick={() => setCurrentScreen('assessment')}>Take Assessment</Button>
    </div>
  );

  const screens: { [key: string]: JSX.Element } = {
    login: <LoginScreen onLogin={handleLogin} language={language} setLanguage={setLanguage} />,
    onboarding: <OnboardingScreen onNext={() => { setConsentGiven(true); setCurrentScreen('home'); }} language={language} setLanguage={setLanguage} />,
    assessment: <AssessmentScreen onComplete={handleAssessmentComplete} language={language} />,
    results: <ResultsScreen results={assessmentResults} onSelfHelp={() => setCurrentScreen('selfhelp')} onBooking={() => setCurrentScreen('booking')} onChatbot={() => setCurrentScreen('chatbot')} language={language} />,
    selfhelp: <SelfHelpScreen language={language} />,
    chatbot: <ChatbotScreen language={language} onCrisis={() => setCurrentScreen('crisis')} />,
    booking: <BookingScreen language={language} setLanguage={setLanguage} />,
    profile: <ProfileScreen user={user} language={language} setLanguage={setLanguage} />,
    peersupport: <PeerSupportScreen language={language} />,
    crisis: <CrisisScreen language={language} setLanguage={setLanguage} onBack={() => setCurrentScreen('home')} />,
    home: <HomeDashboard />
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'assessment', label: 'Assessment', icon: Brain },
    { id: 'selfhelp', label: 'Resources', icon: BookOpen },
    { id: 'chatbot', label: 'Chat Support', icon: MessageCircle },
    { id: 'peersupport', label: 'Community', icon: Users },
    { id: 'booking', label: 'Book Session', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  if (!user) {
    return screens['login'];
  }

  if (user && !consentGiven) {
    return screens['onboarding'];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* nav content */}
                <div className="flex items-center space-x-2">
                    <Heart className="w-8 h-8 text-primary"/>
                    <h1 className="text-2xl font-bold">Mind Care</h1>
                </div>
                <div>
                     <Button onClick={handleLogout} variant="outline" size="sm">
                        <LogIn className="w-4 h-4 mr-2" />
                        <span>Logout</span>
                    </Button>
                </div>
            </div>
        </div>
      </nav>
      <main>
        {screens[currentScreen]}
      </main>
    </div>
  );
}