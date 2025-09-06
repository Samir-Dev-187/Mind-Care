import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Send, 
  AlertTriangle, 
  Bot, 
  User, 
  Phone, 
  Mic,
  MoreHorizontal
} from 'lucide-react';

interface ChatbotScreenProps {
  language: string;
  onCrisis?: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'crisis' | 'normal';
}

const translations = {
  en: {
    title: "AI Mental Health Support",
    subtitle: "Immediate guidance and first-aid support",
    disclaimer: "Important Disclaimer",
    disclaimerText: "This AI chatbot provides general mental health information and coping strategies. It is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing a mental health crisis, please contact emergency services or the crisis helpline immediately.",
    crisisNumber: "Crisis Helpline: 1800-599-0019",
    placeholder: "Type your message here...",
    send: "Send",
    typing: "AI is typing...",
    quickReplies: {
      feeling: "I'm feeling anxious",
      sleep: "I can't sleep",
      sad: "I'm feeling sad",
      stress: "I'm stressed about school"
    },
    botName: "Mind Care AI",
    safetyPrompt: "I notice you might be going through a difficult time. Your safety is important. Would you like me to connect you with a crisis counselor?",
    connectCounselor: "Connect with Counselor",
    continueChat: "Continue Chatting"
  },
  hi: {
    title: "AI मानसिक स्वास्थ्य सहायता",
    subtitle: "तत्काल मार्गदर्शन और प्राथमिक चिकित्सा सहायता",
    disclaimer: "महत्वपूर्ण अस्वीकरण",
    disclaimerText: "यह AI चैटबॉट सामान्य मानसिक स्वास्थ्य जानकारी और मुकाबला रणनीतियां प्रदान करता है। यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। यदि आप मानसिक स्वास्थ्य संकट का सामना कर रहे हैं, तो कृपया तुरंत आपातकालीन सेवाओं या संकट हेल्पलाइन से संपर्क करें।",
    crisisNumber: "संकट हेल्पलाइन: 1800-599-0019",
    placeholder: "यहाँ अपना संदेश टाइप करें...",
    send: "भेजें",
    typing: "AI टाइप कर रहा है...",
    quickReplies: {
      feeling: "मैं चिंतित महसूस कर रहा हूँ",
      sleep: "मुझे नींद नहीं आ रही",
      sad: "मैं उदास महसूस कर रहा हूँ",
      stress: "मैं स्कूल को लेकर तनावग्रस्त हूँ"
    },
    botName: "Mind Care AI",
    safetyPrompt: "मैं देख रहा हूँ कि आप एक कठिन समय से गुजर रहे हैं। आपकी सुरक्षा महत्वपूर्ण है। क्या आप चाहेंगे कि मैं आपको संकट परामर्शदाता से जोड़ूं?",
    connectCounselor: "परामर्शदाता से जुड़ें",
    continueChat: "चैट जारी रखें"
  }
};

const initialBotMessage = {
  en: "Hello! I'm Mind Care AI, here to provide you with mental health support and guidance. How are you feeling today? Remember, I'm here to listen and help you with coping strategies.",
  hi: "नमस्ते! मैं Mind Care AI हूँ, आपको मानसिक स्वास्थ्य सहायता और मार्गदर्शन प्रदान करने के लिए यहाँ हूँ। आज आप कैसा महसूस कर रहे हैं? याद रखें, मैं सुनने और मुकाबला रणनीतियों में आपकी मदद करने के लिए यहाँ हूँ।"
};

const botResponses = {
  en: {
    anxiety: "I understand you're feeling anxious. That's a very common experience. Let's try a quick breathing exercise: Take a deep breath in for 4 counts, hold for 4, then breathe out for 6. This can help activate your body's relaxation response. What specific situation is making you feel anxious?",
    sleep: "Sleep difficulties can be really challenging. Here are some tips that might help: Try to maintain a consistent bedtime routine, avoid screens 1 hour before bed, and create a calm environment. Are there specific thoughts keeping you awake at night?",
    sad: "I'm sorry you're feeling sad. Your emotions are valid, and it's okay to feel this way. Sometimes talking about what's causing these feelings can help. Can you tell me what might be contributing to your sadness today?",
    stress: "School stress is very common among students. Let's break this down - what specific aspects of school are causing you the most stress? Is it academic pressure, social situations, or something else? We can work on some strategies together.",
    crisis: "I'm concerned about your wellbeing. It sounds like you're going through a really difficult time. Please know that you're not alone, and there are people who want to help you. Have you considered speaking with a counselor or calling a crisis helpline?",
    default: "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what you're experiencing right now? The more you share, the better I can help you find coping strategies that work for you."
  },
  hi: {
    anxiety: "मैं समझता हूँ कि आप चिंतित महसूस कर रहे हैं। यह एक बहुत सामान्य अनुभव है। आइए एक त्वरित सांस लेने का व्यायाम करते हैं: 4 की गिनती में गहरी सांस लें, 4 की गिनती में रोकें, फिर 6 की गिनती में सांस छोड़ें। यह आपके शरीर की आराम प्रतिक्रिया को सक्रिय करने में मदद कर सकता है। कौन सी विशिष्ट स्थिति आपको चिंतित बना रही है?",
    sleep: "नींद की कठिनाइयाँ वास्तव में चुनौतीपूर्ण हो सकती हैं। यहाँ कुछ सुझाव हैं जो मदद कर सकते हैं: एक निरंतर सोने की दिनचर्या बनाए रखने की कोशिश करें, सोने से 1 घंटे पहले स्क्रीन से बचें, और एक शांत वातावरण बनाएं। क्या कुछ विशिष्ट विचार आपको रात में जगाए रख रहे हैं?",
    sad: "मुझे खेद है कि आप उदास महसूस कर रहे हैं। आपकी भावनाएं वैध हैं, और इस तरह महसूस करना ठीक है। कभी-कभी इन भावनाओं के कारणों के बारे में बात करना मदद कर सकता है। क्या आप बता सकते हैं कि आज आपकी उदासी में क्या योगदान हो सकता है?",
    stress: "स्कूल का तनाव छात्रों में बहुत आम है। आइए इसे तोड़ते हैं - स्कूल के कौन से विशिष्ट पहलू आपको सबसे अधिक तनाव दे रहे हैं? क्या यह शैक्षणिक दबाव है, सामाजिक स्थितियां, या कुछ और? हम मिलकर कुछ रणनीतियों पर काम कर सकते हैं।",
    crisis: "मैं आपकी भलाई के बारे में चिंतित हूँ। ऐसा लगता है कि आप वास्तव में एक कठिन समय से गुजर रहे हैं। कृपया जानें कि आप अकेले नहीं हैं, और ऐसे लोग हैं जो आपकी मदद करना चाहते हैं। क्या आपने किसी परामर्शदाता से बात करने या संकट हेल्पलाइन पर कॉल करने पर विचार किया है?",
    default: "मेरे साथ साझा करने के लिए धन्यवाद। मैं सुनने और आपका समर्थन करने के लिए यहाँ हूँ। क्या आप मुझे और बता सकते हैं कि आप अभी क्या अनुभव कर रहे हैं? आप जितना अधिक साझा करेंगे, उतना बेहतर मैं आपके लिए उपयुक्त मुकाबला रणनीतियां खोजने में मदद कर सकूंगा।"
  }
};

const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself', 'die', 'मरना चाहता हूँ', 'आत्महत्या', 'जीने का मन नहीं'];

export default function ChatbotScreen({ language, onCrisis }: ChatbotScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: initialBotMessage[language as keyof typeof initialBotMessage],
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisis = (text: string) => {
    return crisisKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const getBotResponse = (userMessage: string) => {
    const responses = botResponses[language as keyof typeof botResponses];
    const message = userMessage.toLowerCase();
    
    if (detectCrisis(message)) {
      setShowCrisisAlert(true);
      return responses.crisis;
    }
    
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('चिंता')) {
      return responses.anxiety;
    }
    if (message.includes('sleep') || message.includes('नींद')) {
      return responses.sleep;
    }
    if (message.includes('sad') || message.includes('depressed') || message.includes('उदास')) {
      return responses.sad;
    }
    if (message.includes('stress') || message.includes('school') || message.includes('तनाव') || message.includes('स्कूल')) {
      return responses.stress;
    }
    
    return responses.default;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
        type: detectCrisis(text) ? 'crisis' : 'normal'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <Avatar className="w-8 h-8">
          <AvatarFallback className={message.sender === 'user' ? 'bg-primary text-white' : 'bg-secondary text-foreground'}>
            {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>
        
        <div className={`rounded-2xl px-4 py-3 ${
          message.sender === 'user' 
            ? 'bg-primary text-white' 
            : message.type === 'crisis'
            ? 'bg-red-50 text-red-900 border border-red-200'
            : 'bg-muted text-foreground'
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          <div className="mt-2 text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
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

          {/* Disclaimer */}
          <Alert className="border-yellow-200 bg-yellow-50 rounded-2xl">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-800">{t.disclaimer}</h4>
              <AlertDescription className="text-yellow-700 text-sm">
                {t.disclaimerText}
              </AlertDescription>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">{t.crisisNumber}</span>
              </div>
            </div>
          </Alert>

          {/* Crisis Alert */}
          {showCrisisAlert && (
            <Alert className="border-red-200 bg-red-50 rounded-2xl">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div className="space-y-3">
                <AlertDescription className="text-red-800">
                  {t.safetyPrompt}
                </AlertDescription>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="rounded-xl"
                    onClick={onCrisis}
                  >
                    {t.connectCounselor}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-xl"
                    onClick={() => setShowCrisisAlert(false)}
                  >
                    {t.continueChat}
                  </Button>
                </div>
              </div>
            </Alert>
          )}

          {/* Chat Interface */}
          <Card className="rounded-2xl border-accent/20 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-primary" />
                <span>{t.botName}</span>
                <Badge variant="secondary" className="rounded-full">Online</Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-4 px-2">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-secondary text-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted text-foreground rounded-2xl px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <MoreHorizontal className="w-4 h-4 animate-pulse" />
                          <span className="text-sm text-muted-foreground">{t.typing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Quick replies:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(t.quickReplies).map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="rounded-full"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.placeholder}
                    className="rounded-2xl border-accent/20 pr-12"
                    disabled={isTyping}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1 h-8 w-8 rounded-xl"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => sendMessage(inputText)}
                  disabled={!inputText.trim() || isTyping}
                  className="rounded-2xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}