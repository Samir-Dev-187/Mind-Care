import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  Heart, 
  ArrowLeft, 
  Globe, 
  Clock, 
  HeadphonesIcon,
  UserCheck,
  Shield,
  ExternalLink
} from 'lucide-react';

interface CrisisScreenProps {
  language: string;
  setLanguage: (lang: string) => void;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Crisis Support",
    subtitle: "Immediate help is available. You are not alone.",
    backToHome: "Back to Home",
    immediateSection: {
      title: "If you're in immediate danger",
      subtitle: "If you have thoughts of suicide or self-harm, or are in danger",
      emergency: "Call 112 (Emergency)",
      suicide: "Call Suicide Prevention: 9152987821"
    },
    additionalSupport: {
      title: "Additional Crisis Support",
      national: "National Emergency Services",
      available247: "Available 24/7",
      textLine: "Crisis Text Line India",
      textInstructions: "Text START to 741741",
      onlineSupport: "Online Support Chat",
      onlineDesc: "Connect with trained crisis counselors"
    },
    resources: {
      title: "Immediate Coping Resources",
      breathing: "5-Minute Breathing Exercise",
      grounding: "5-4-3-2-1 Grounding Technique",
      safety: "Safety Planning Tool"
    },
    disclaimer: "If you're having thoughts of suicide or self-harm, please reach out immediately. Professional help is available 24/7.",
    languages: {
      english: "English",
      hindi: "हिंदी",
      regional: "Regional"
    }
  },
  hi: {
    title: "संकट सहायता",
    subtitle: "तत्काल सहायता उपलब्ध है। आप अकेले नहीं हैं।",
    backToHome: "मुख्य पृष्ठ पर वापस",
    immediateSection: {
      title: "यदि आप तत्काल खतरे में हैं",
      subtitle: "यदि आपको आत्महत्या या आत्म-हानि के विचार आ रहे हैं, या आप खतरे में हैं",
      emergency: "112 (आपातकाल) पर कॉल करें",
      suicide: "आत्महत्या रोकथाम: 9152987821 पर कॉल करें"
    },
    additionalSupport: {
      title: "अतिरिक्त संकट सहायता",
      national: "राष्ट्रीय आपातकालीन सेवाएं",
      available247: "24/7 उपलब्ध",
      textLine: "संकट टेक्स्ट लाइन भारत",
      textInstructions: "741741 पर START भेजें",
      onlineSupport: "ऑनलाइन सहायता चैट",
      onlineDesc: "प्रशिक्षित संकट परामर्शदाताओं से जुड़ें"
    },
    resources: {
      title: "तत्काल मुकाबला संसाधन",
      breathing: "5-मिनट सांस लेने का व्यायाम",
      grounding: "5-4-3-2-1 ग्राउंडिंग तकनीक",
      safety: "सुरक्षा योजना उपकरण"
    },
    disclaimer: "यदि आपको आत्महत्या या आत्म-हानि के विचार आ रहे हैं, तो कृपया तुरंत संपर्क करें। पेशेवर सहायता 24/7 उपलब्ध है।",
    languages: {
      english: "English",
      hindi: "हिंदी",
      regional: "क्षेत्रीय"
    }
  }
};

export default function CrisisScreen({ language, setLanguage, onBack }: CrisisScreenProps) {
  const t = translations[language as keyof typeof translations];

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleTextCrisis = () => {
    window.open('sms:741741?body=START', '_self');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #E6F7F9 0%, #D9FBE5 100%)' }}>
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 rounded-2xl text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </Button>
            
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 rounded-2xl border-gray-200">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t.languages.english}</SelectItem>
                <SelectItem value="hi">{t.languages.hindi}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Main Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg border-2" style={{ borderColor: '#FF4C4C' }}>
              <AlertTriangle className="w-10 h-10" style={{ color: '#FF4C4C' }} />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-gray-800">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Immediate Danger Section */}
        <Card className="rounded-3xl shadow-xl border-2" style={{ backgroundColor: '#FF4C4C', borderColor: '#DC2626' }}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-white flex items-center justify-center space-x-3">
              <AlertTriangle className="w-6 h-6" />
              <span>{t.immediateSection.title}</span>
            </CardTitle>
            <CardDescription className="text-red-100 text-lg">
              {t.immediateSection.subtitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleEmergencyCall('112')}
                size="lg"
                className="w-full h-16 text-lg rounded-2xl bg-white hover:bg-gray-50 text-red-600 border-2 border-white hover:border-gray-200 shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Phone className="w-6 h-6 mr-3" />
                {t.immediateSection.emergency}
              </Button>
              
              <Button
                onClick={() => handleEmergencyCall('9152987821')}
                size="lg"
                className="w-full h-16 text-lg rounded-2xl bg-white hover:bg-gray-50 text-red-600 border-2 border-white hover:border-gray-200 shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Phone className="w-6 h-6 mr-3" />
                {t.immediateSection.suicide}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Crisis Support */}
        <Card className="rounded-3xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center space-x-3">
              <Heart className="w-6 h-6 text-green-600" />
              <span>{t.additionalSupport.title}</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* National Emergency Services */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" style={{ color: '#004D40' }} />
                  <h3 className="text-lg font-semibold text-gray-800">{t.additionalSupport.national}</h3>
                  <Badge className="rounded-full bg-green-100 text-green-800 border-green-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {t.additionalSupport.available247}
                  </Badge>
                </div>
                <Button
                  onClick={() => handleEmergencyCall('1800-599-0019')}
                  className="w-full h-14 rounded-2xl text-white shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
                  style={{ backgroundColor: '#004D40' }}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call 1800-599-0019
                </Button>
              </div>

              {/* Crisis Text Line */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" style={{ color: '#004D40' }} />
                  <h3 className="text-lg font-semibold text-gray-800">{t.additionalSupport.textLine}</h3>
                </div>
                <Button
                  onClick={handleTextCrisis}
                  variant="outline"
                  className="w-full h-14 rounded-2xl border-2 hover:bg-gray-50 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  style={{ borderColor: '#004D40', color: '#004D40' }}
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  {t.additionalSupport.textInstructions}
                </Button>
              </div>
            </div>

            {/* Online Support */}
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-200/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <HeadphonesIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.additionalSupport.onlineSupport}</h3>
                  <p className="text-gray-600 mb-4">{t.additionalSupport.onlineDesc}</p>
                  <Button
                    className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Chat Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Coping Resources */}
        <Card className="rounded-3xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center space-x-3">
              <UserCheck className="w-6 h-6 text-blue-600" />
              <span>{t.resources.title}</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-16 rounded-2xl border-2 border-blue-200 hover:bg-blue-50 text-blue-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <div className="text-center">
                  <HeadphonesIcon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium">{t.resources.breathing}</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-16 rounded-2xl border-2 border-green-200 hover:bg-green-50 text-green-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <div className="text-center">
                  <Heart className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium">{t.resources.grounding}</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-16 rounded-2xl border-2 border-purple-200 hover:bg-purple-50 text-purple-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-sm font-medium">{t.resources.safety}</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="rounded-2xl bg-yellow-50/80 border border-yellow-200/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <p className="text-yellow-800 text-sm leading-relaxed">
                {t.disclaimer}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Spacing for Mobile */}
        <div className="h-8 md:h-4"></div>
      </div>
    </div>
  );
}