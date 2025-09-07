import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Shield, Heart, Users, Globe, Lock, CheckCircle } from 'lucide-react';

interface OnboardingScreenProps {
  onNext: () => void;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const translations = {
  en: {
    welcome: "Welcome to Mind Care",
    subtitle: "Your safe space for mental health and wellbeing",
    description: "We're here to support you on your mental health journey with evidence-based tools, confidential counseling, and a stigma-free environment.",
    features: [
      "Confidential and secure platform",
      "Evidence-based assessments",
      "Professional counselor support",
      "24/7 crisis helpline access",
      "Multilingual support"
    ],
    privacy: "Privacy & Consent",
    privacyText: "Your privacy is our priority. All data is encrypted and anonymized. You control what you share and with whom.",
    consent: "I understand and consent to the privacy policy",
    ageConsent: "I am 18+ years old or have parental consent",
    getStarted: "Get Started",
    languageLabel: "Choose Language"
  },
  hi: {
    welcome: "मानसिक स्वास्थ्य में आपका स्वागत है",
    subtitle: "मानसिक स्वास्थ्य और कल्याण के लिए आपका सुरक्षित स्थान",
    description: "हम प्रमाण-आधारित उपकरण, गोपनीय परामर्श और कलंक-मुक्त वातावरण के साथ आपकी मानसिक स्वास्थ्य यात्रा में आपका समर्थन करने के लिए यहाँ हैं।",
    features: [
      "गोपनीय और सुरक्षित मंच",
      "प्रमाण-आधारित मूल्यांकन",
      "पेशेवर परामर्शदाता सहायता",
      "24/7 संकट हेल्पलाइन पहुंच",
      "बहुभाषी समर्थन"
    ],
    privacy: "गोपनीयता और सहमति",
    privacyText: "आपकी गोपनीयता हमारी प्राथमिकता है। सभी डेटा एन्क्रिप्टेड और गुमनाम है। आप नियंत्रित करते हैं कि आप क्या साझा करते हैं और किसके साथ।",
    consent: "मैं समझता हूँ और गोपनीयता नीति से सहमत हूँ",
    ageConsent: "मैं 18+ वर्षीय हूँ या माता-पिता की सहमति है",
    getStarted: "शुरू करें",
    languageLabel: "भाषा चुनें"
  }
};

export default function OnboardingScreen({ onNext, language, setLanguage }: OnboardingScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [privacyConsent, setPrivacyConsent] = React.useState(false);
  const [ageConsent, setAgeConsent] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-16">
      <div className="max-w-4xl w-full space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse"
                 style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' }}>
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              {t.welcome}
            </h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-medium">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="rounded-3xl border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #87CEEB 100%)' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center leading-relaxed">
                End-to-end encryption ensures your data stays private and secure.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #34C759 0%, #98FF98 100%)' }}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center leading-relaxed">
                Licensed counselors and mental health professionals available 24/7.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}>
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">Inclusive Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center leading-relaxed">
                Multilingual support and culturally sensitive care for everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>What we offer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Consent */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>{t.privacy}</span>
            </CardTitle>
            <CardDescription>
              {t.privacyText}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="privacy" 
                checked={privacyConsent}
                onCheckedChange={setPrivacyConsent}
                className="mt-1"
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                {t.consent}
              </label>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="age" 
                checked={ageConsent}
                onCheckedChange={setAgeConsent}
                className="mt-1"
              />
              <label htmlFor="age" className="text-sm text-muted-foreground leading-relaxed">
                {t.ageConsent}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>{t.languageLabel}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => setLanguage('en')}
                className="rounded-xl"
              >
                English
              </Button>
              <Button
                variant={language === 'hi' ? 'default' : 'outline'}
                onClick={() => setLanguage('hi')}
                className="rounded-xl"
              >
                हिंदी
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Get Started Button */}
        <div className="text-center space-y-4">
          <Button
            onClick={onNext}
            disabled={!privacyConsent || !ageConsent}
            size="lg"
            className="px-12 py-4 text-lg rounded-3xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' }}
          >
            {t.getStarted} ✨
          </Button>
          
          {(!privacyConsent || !ageConsent) && (
            <p className="text-sm text-gray-500">
              Please complete the consent checkboxes above to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}