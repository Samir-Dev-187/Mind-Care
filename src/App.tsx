import React, { useState } from 'react';
import { Button } from './components/ui/button';
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
  // State management for the application
  const [currentScreen, setCurrentScreen] = useState('login'); // Start with the login screen
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  // Function to handle the assessment completion and determine the next step based on risk level
  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    const { phq9Score, gad7Score } = results;
    const hasSuicidalThoughts = results.phq9Answers[8] > 0;

    // Determine risk level based on scores and self-harm answers
    if (phq9Score > 19 || gad7Score > 14 || hasSuicidalThoughts) {
      setCurrentScreen('crisis'); // High risk
    } else if (phq9Score > 9 || gad7Score > 9) {
      setCurrentScreen('results'); // Medium risk
    } else {
      setCurrentScreen('selfhelp'); // Low risk
    }
  };
  
  // A simple home dashboard screen
  const HomeDashboard = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Home Dashboard</h1>
      <p className="mb-4">Welcome to your safe space. From here you can access all the features of the app.</p>
      <Button onClick={() => setCurrentScreen('assessment')}>Take Assessment</Button>
    </div>
  );


  // Screen components mapping
  const screens: { [key: string]: JSX.Element } = {
    login: <LoginScreen
      onLogin={() => {
        setIsLoggedIn(true);
        setCurrentScreen('onboarding');
      }}
      language={language}
      setLanguage={setLanguage}
    />,
    onboarding: <OnboardingScreen onNext={() => {
      setConsentGiven(true);
      setCurrentScreen('home');
    }} language={language} setLanguage={setLanguage} />,
    assessment: <AssessmentScreen onComplete={handleAssessmentComplete} language={language} />,
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
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // If the user is not logged in, show the login screen
  if (!isLoggedIn) {
    return screens['login'];
  }
  
  // If the user is logged in but hasn't given consent, show the onboarding screen
  if(isLoggedIn && !consentGiven){
    return screens['onboarding'];
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
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
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
              
              <Button
                onClick={() => {
                  setIsLoggedIn(false);
                  setConsentGiven(false);
                  setCurrentScreen('login');
                }}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 rounded-2xl font-medium border-gray-300 hover:bg-gray-50"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
              
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

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {screens[currentScreen]}
      </main>
    </div>
  );
}