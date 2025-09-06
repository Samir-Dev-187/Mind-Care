import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  TrendingUp, 
  Heart, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface ResultsScreenProps {
  results: {
    phq9Score: number;
    gad7Score: number;
    phq9Answers: number[];
    gad7Answers: number[];
    timestamp: string;
  } | null;
  onSelfHelp: () => void;
  onBooking: () => void;
  onChatbot: () => void;
  language: string;
}

const translations = {
  en: {
    title: "Your Assessment Results",
    subtitle: "Understanding your current wellbeing",
    depressionTitle: "Depression Score (PHQ-9)",
    anxietyTitle: "Anxiety Score (GAD-7)",
    recommendations: "Recommended Next Steps",
    selfHelp: "Explore Self-Help Resources",
    selfHelpDesc: "Access guided meditation, wellness videos, and coping strategies",
    bookCounselor: "Book a Counselor Session",
    bookCounselorDesc: "Schedule a confidential session with a licensed mental health professional",
    chatSupport: "Chat with AI Support",
    chatSupportDesc: "Get immediate guidance and first-aid mental health support",
    crisisHelp: "Crisis Helpline",
    crisisHelpDesc: "24/7 immediate support for crisis situations",
    crisisNumber: "1800-599-0019",
    levels: {
      minimal: "Minimal",
      mild: "Mild", 
      moderate: "Moderate",
      moderatelysevere: "Moderately Severe",
      severe: "Severe"
    },
    insights: "Key Insights",
    safetyNote: "If you're having thoughts of self-harm, please contact emergency services or the crisis helpline immediately."
  },
  hi: {
    title: "आपके मूल्यांकन के परिणाम",
    subtitle: "आपकी वर्तमान भलाई को समझना",
    depressionTitle: "अवसाद स्कोर (PHQ-9)",
    anxietyTitle: "चिंता स्कोर (GAD-7)",
    recommendations: "अनुशंसित अगले कदम",
    selfHelp: "स्व-सहायता संसाधन देखें",
    selfHelpDesc: "निर्देशित ध्यान, कल्याण वीडियो और मुकाबला रणनीतियों तक पहुंचें",
    bookCounselor: "परामर्शदाता सत्र बुक करें",
    bookCounselorDesc: "लाइसेंस प्राप्त मानसिक स्वास्थ्य पेशेवर के साथ गोपनीय सत्र निर्धारित करें",
    chatSupport: "AI सहायता के साथ चैट करें",
    chatSupportDesc: "तत्काल मार्गदर्शन और प्राथमिक चिकित्सा मानसिक स्वास्थ्य सहायता प्राप्त करें",
    crisisHelp: "संकट हेल्पलाइन",
    crisisHelpDesc: "संकट की स्थितियों के लिए 24/7 तत्काल सहायता",
    crisisNumber: "1800-599-0019",
    levels: {
      minimal: "न्यूनतम",
      mild: "हल्का",
      moderate: "मध्यम",
      moderatelysevere: "मध्यम रूप से गंभीर",
      severe: "गंभीर"
    },
    insights: "मुख्य अंतर्दृष्टि",
    safetyNote: "यदि आपको आत्म-हानि के विचार आ रहे हैं, तो कृपया तुरंत आपातकालीन सेवाओं या संकट हेल्पलाइन से संपर्क करें।"
  }
};

const getDepressionLevel = (score: number) => {
  if (score <= 4) return 'minimal';
  if (score <= 9) return 'mild';
  if (score <= 14) return 'moderate';
  if (score <= 19) return 'moderatelySelect';
  return 'severe';
};

const getAnxietyLevel = (score: number) => {
  if (score <= 4) return 'minimal';
  if (score <= 9) return 'mild';
  if (score <= 14) return 'moderate';
  return 'severe';
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'minimal': return 'bg-green-100 text-green-800 border-green-200';
    case 'mild': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'moderatelySelect': return 'bg-red-100 text-red-800 border-red-200';
    case 'severe': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function ResultsScreen({ results, onSelfHelp, onBooking, onChatbot, language }: ResultsScreenProps) {
  const t = translations[language as keyof typeof translations];
  
  if (!results) {
    return <div>No results available</div>;
  }

  const { phq9Score, gad7Score } = results;
  const depressionLevel = getDepressionLevel(phq9Score);
  const anxietyLevel = getAnxietyLevel(gad7Score);
  
  const hasSuicidalThoughts = results.phq9Answers[8] > 0; // Last PHQ-9 question about self-harm
  const needsImmediateAttention = phq9Score > 14 || gad7Score > 14 || hasSuicidalThoughts;

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
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

        {/* Safety Alert */}
        {hasSuicidalThoughts && (
          <Alert className="border-red-200 bg-red-50 rounded-2xl">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {t.safetyNote}
            </AlertDescription>
          </Alert>
        )}

        {/* Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Depression Score */}
          <Card className="rounded-2xl border-accent/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t.depressionTitle}</span>
                <Badge className={`${getLevelColor(depressionLevel)} rounded-full`}>
                  {t.levels[depressionLevel as keyof typeof t.levels]}
                </Badge>
              </CardTitle>
              <CardDescription>
                Score: {phq9Score}/27
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(phq9Score / 27) * 100} className="h-3 rounded-full" />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0 - Minimal</span>
                  <span>27 - Severe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Anxiety Score */}
          <Card className="rounded-2xl border-accent/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t.anxietyTitle}</span>
                <Badge className={`${getLevelColor(anxietyLevel)} rounded-full`}>
                  {t.levels[anxietyLevel as keyof typeof t.levels]}
                </Badge>
              </CardTitle>
              <CardDescription>
                Score: {gad7Score}/21
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(gad7Score / 21) * 100} className="h-3 rounded-full" />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0 - Minimal</span>
                  <span>21 - Severe</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-primary" />
              <span>{t.insights}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {phq9Score <= 4 && gad7Score <= 4 && (
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-green-800">
                    Your scores suggest minimal symptoms of depression and anxiety. This is a positive indicator of your current mental wellbeing.
                  </p>
                </div>
              </div>
            )}
            
            {(phq9Score > 4 || gad7Score > 4) && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800">
                    Your scores indicate some symptoms that may benefit from additional support and resources.
                  </p>
                </div>
              </div>
            )}

            {needsImmediateAttention && (
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800">
                    Your scores suggest you may benefit from professional mental health support. Consider speaking with a counselor.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>{t.recommendations}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {/* Self-Help Resources */}
              <div className="flex items-start space-x-4 p-4 border border-accent/20 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{t.selfHelp}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.selfHelpDesc}</p>
                </div>
                <Button onClick={onSelfHelp} className="rounded-xl">
                  Explore
                </Button>
              </div>

              {/* AI Chatbot */}
              <div className="flex items-start space-x-4 p-4 border border-accent/20 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{t.chatSupport}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.chatSupportDesc}</p>
                </div>
                <Button onClick={onChatbot} variant="outline" className="rounded-xl">
                  Chat Now
                </Button>
              </div>

              {/* Professional Counseling */}
              <div className="flex items-start space-x-4 p-4 border border-accent/20 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{t.bookCounselor}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.bookCounselorDesc}</p>
                </div>
                <Button onClick={onBooking} variant="outline" className="rounded-xl">
                  Book Session
                </Button>
              </div>

              {/* Crisis Support */}
              {needsImmediateAttention && (
                <div className="flex items-start space-x-4 p-4 border border-red-200 bg-red-50 rounded-2xl">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-red-800">{t.crisisHelp}</h3>
                    <p className="text-sm text-red-700 mt-1">{t.crisisHelpDesc}</p>
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                        {t.crisisNumber}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="destructive" className="rounded-xl">
                    Call Now
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}