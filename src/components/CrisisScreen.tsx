// src/components/CrisisScreen.tsx
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';

// Props ke liye interface banayein
interface CrisisScreenProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  onBack: () => void;
}

const translations = {
  en: { title: "Immediate Help Required", subtitle: "Your safety is our top priority. Please use these resources now.", helpline: "National Helpline", helplineNum: "1800-599-0019", chatSupport: "Chat with a Crisis Counselor", back: "Go Back to Home" },
  hi: { title: "तत्काल सहायता की आवश्यकता है", subtitle: "आपकी सुरक्षा हमारी सर्वोच्च प्राथमिकता है। कृपया इन संसाधनों का अभी उपयोग करें।", helpline: "राष्ट्रीय हेल्पलाइन", helplineNum: "1800-599-0019", chatSupport: "संकट परामर्शदाता के साथ चैट करें", back: "होम पर वापस जाएं" }
};

export default function CrisisScreen({ language, setLanguage, onBack }: CrisisScreenProps) {
  const t = translations[language as keyof typeof translations];
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <Card className="w-full max-w-lg shadow-2xl border-red-500">
        <CardHeader className="text-center bg-red-600 text-white rounded-t-lg">
          <AlertTriangle className="mx-auto h-12 w-12" />
          <CardTitle className="text-3xl">{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-lg text-gray-700 mb-8">{t.subtitle}</p>
          <div className="space-y-4">
            <a href="tel:18005990019" className="w-full">
              <Button className="w-full h-16 text-xl bg-red-500 hover:bg-red-600">
                <Phone className="mr-4 h-6 w-6" />
                <div>
                  <div>{t.helpline}</div>
                  <div className="font-bold">{t.helplineNum}</div>
                </div>
              </Button>
            </a>
            <Button className="w-full h-16 text-xl" variant="secondary">
              <MessageSquare className="mr-4 h-6 w-6" />
              {t.chatSupport}
            </Button>
            <Button onClick={onBack} variant="link" className="text-gray-600">
              {t.back}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}