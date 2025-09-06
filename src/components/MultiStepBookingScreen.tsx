import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MessageSquare, 
  Phone,
  Star,
  MapPin,
  Shield,
  CheckCircle,
  User,
  ArrowLeft,
  ArrowRight,
  Award,
  UserCheck,
  Languages,
  Heart,
  Globe,
  Check,
  Info
} from 'lucide-react';

interface MultiStepBookingScreenProps {
  selectedCounselorId: number;
  language: string;
  setLanguage: (lang: string) => void;
  onBack: () => void;
  onBookingComplete: () => void;
}

const translations = {
  en: {
    // Progress Steps
    steps: {
      selectCounselor: "Select Counselor",
      selectDateTime: "Select Date & Time",
      sessionDetails: "Session Details"
    },
    
    // Step 1 - Counselor Selection
    step1: {
      title: "Selected Counselor",
      subtitle: "Review your chosen mental health professional",
      specializations: "Specializations",
      languages: "Languages",
      experience: "Experience",
      rating: "Rating",
      nextAvailable: "Next Available",
      fee: "Session Fee",
      sessionModes: "Available Modes",
      verified: "Verified",
      licensed: "Licensed Professional",
      confidential: "100% Confidential"
    },
    
    // Step 2 - Date & Time Selection
    step2: {
      title: "Select Date & Time",
      subtitle: "Choose your preferred session date and time",
      calendar: "Select Date",
      timeSlots: "Available Time Slots",
      sessionType: "Session Type",
      sessionTypes: {
        video: "Video Call",
        phone: "Phone Call", 
        chat: "Text Chat",
        inPerson: "In-Person"
      },
      today: "Today",
      tomorrow: "Tomorrow",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening"
    },
    
    // Step 3 - Session Details & Confirmation
    step3: {
      title: "Session Details & Confirmation",
      subtitle: "Review and confirm your booking",
      bookingSummary: "Booking Summary",
      counselor: "Counselor",
      date: "Date",
      time: "Time", 
      sessionType: "Session Type",
      duration: "Duration",
      fee: "Fee",
      reasonForVisit: "Reason for Visit (Optional)",
      reasonPlaceholder: "Briefly describe what you'd like to discuss...",
      specialNotes: "Special Notes (Optional)",
      notesPlaceholder: "Any specific requirements or concerns...",
      disclaimer: "All sessions are 100% confidential and stigma-free",
      privacyNotice: "Your privacy is our priority. All conversations are encrypted and never shared.",
      confirmBooking: "Confirm Booking",
      bookingSuccess: "Booking Confirmed!",
      bookingSuccessMsg: "Your session has been scheduled. You'll receive a confirmation email with session details and joining instructions."
    },
    
    // Common
    minutes: "minutes",
    back: "Back",
    continue: "Continue",
    confirm: "Confirm",
    cancel: "Cancel"
  },
  
  hi: {
    // Progress Steps  
    steps: {
      selectCounselor: "परामर्शदाता चुनें",
      selectDateTime: "दिनांक और समय चुनें", 
      sessionDetails: "सत्र विवरण"
    },
    
    // Step 1
    step1: {
      title: "चयनित परामर्शदाता",
      subtitle: "अपने चुने हुए मानसिक स्वास्थ्य पेशेवर की समीक्षा करें",
      specializations: "विशेषज्ञता",
      languages: "भाषाएं",
      experience: "अनुभव",
      rating: "रेटिंग",
      nextAvailable: "अगली उपलब्धता",
      fee: "सत्र शुल्क",
      sessionModes: "उपलब्ध तरीके",
      verified: "सत्यापित",
      licensed: "लाइसेंस प्राप्त पेशेवर",
      confidential: "100% गोपनीय"
    },
    
    // Step 2
    step2: {
      title: "दिनांक और समय चुनें",
      subtitle: "अपना पसंदीदा सत्र दिनांक और समय चुनें",
      calendar: "दिनांक चुनें",
      timeSlots: "उपलब्ध समय स्लॉट",
      sessionType: "सत्र प्रकार",
      sessionTypes: {
        video: "वीडियो कॉल",
        phone: "फोन कॉल",
        chat: "टेक्स्ट चैट",
        inPerson: "व्यक्तिगत मुलाकात"
      },
      today: "आज",
      tomorrow: "कल",
      morning: "सुबह",
      afternoon: "दोपहर",
      evening: "शाम"
    },
    
    // Step 3
    step3: {
      title: "सत्र विवरण और पुष्टि",
      subtitle: "अपनी बुकिंग की समीक्षा और पुष्टि करें",
      bookingSummary: "बुकिंग सारांश",
      counselor: "परामर्शदाता",
      date: "दिनांक",
      time: "समय",
      sessionType: "सत्र प्रकार",
      duration: "अवधि",
      fee: "शुल्क",
      reasonForVisit: "मुलाकात का कारण (वैकल्पिक)",
      reasonPlaceholder: "संक्षेप में बताएं कि आप क्या चर्चा करना चाहते हैं...",
      specialNotes: "विशेष टिप्पणियां (वैकल्पिक)",
      notesPlaceholder: "कोई विशेष आवश्यकताएं या चिंताएं...",
      disclaimer: "सभी सत्र 100% गोपनीय और कलंक-मुक्त हैं",
      privacyNotice: "आपकी गोपनीयता हमारी प्राथमिकता है। सभी बातचीत एन्क्रिप्टेड हैं और कभी साझा नहीं की जातीं।",
      confirmBooking: "बुकिंग की पुष्टि करें",
      bookingSuccess: "बुकिंग की पुष्टि हो गई!",
      bookingSuccessMsg: "आपका सत्र निर्धारित हो गया है। आपको सत्र विवरण और जॉइन करने के निर्देशों के साथ एक पुष्टिकरण ईमेल मिलेगा।"
    },
    
    // Common
    minutes: "मिनट",
    back: "वापस",
    continue: "जारी रखें", 
    confirm: "पुष्टि करें",
    cancel: "रद्द करें"
  }
};

// Mock counselor data
const counselors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    rating: 4.9,
    experience: "8 years",
    languages: ["English", "Hindi", "Marathi"],
    specializations: ["Anxiety", "Depression", "Student Counseling"],
    fee: "₹800",
    nextAvailable: "Today, 2:00 PM",
    image: "PS",
    sessionTypes: ["video", "phone", "chat"],
    verified: true,
    bio: "Specialized in student mental health and anxiety disorders with 8+ years of experience helping young adults navigate academic and personal challenges."
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    title: "Psychiatrist",
    rating: 4.8,
    experience: "12 years",
    languages: ["English", "Hindi"],
    specializations: ["Trauma", "PTSD", "Mood Disorders"],
    fee: "₹1200",
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "RK",
    sessionTypes: ["video", "phone", "inPerson"],
    verified: true,
    bio: "Board-certified psychiatrist with extensive experience in trauma therapy and mood disorders. Specializes in evidence-based treatments."
  },
  {
    id: 3,
    name: "Dr. Anita Patel",
    title: "Counseling Psychologist", 
    rating: 4.7,
    experience: "6 years",
    languages: ["English", "Hindi", "Gujarati"],
    specializations: ["Stress Management", "Relationship Issues", "Career Counseling"],
    fee: "₹600",
    nextAvailable: "Today, 4:30 PM",
    image: "AP",
    sessionTypes: ["video", "chat"],
    verified: true,
    bio: "Compassionate counselor focusing on holistic approaches to stress management and personal growth for students and young professionals."
  }
];

export default function MultiStepBookingScreen({ 
  selectedCounselorId, 
  language, 
  setLanguage, 
  onBack, 
  onBookingComplete 
}: MultiStepBookingScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<string>('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const selectedCounselor = counselors.find(c => c.id === selectedCounselorId);

  if (!selectedCounselor) {
    return <div>Counselor not found</div>;
  }

  const steps = [
    t.steps.selectCounselor,
    t.steps.selectDateTime,
    t.steps.sessionDetails
  ];

  const timeSlots = [
    { time: "09:00 AM", available: true, period: "morning" },
    { time: "09:30 AM", available: false, period: "morning" },
    { time: "10:00 AM", available: true, period: "morning" },
    { time: "10:30 AM", available: true, period: "morning" },
    { time: "11:00 AM", available: false, period: "morning" },
    { time: "11:30 AM", available: true, period: "morning" },
    { time: "02:00 PM", available: true, period: "afternoon" },
    { time: "02:30 PM", available: true, period: "afternoon" },
    { time: "03:00 PM", available: false, period: "afternoon" },
    { time: "03:30 PM", available: true, period: "afternoon" },
    { time: "04:00 PM", available: true, period: "afternoon" },
    { time: "04:30 PM", available: true, period: "afternoon" },
    { time: "05:00 PM", available: true, period: "evening" },
    { time: "05:30 PM", available: false, period: "evening" },
    { time: "06:00 PM", available: true, period: "evening" },
    { time: "06:30 PM", available: true, period: "evening" },
  ];

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'chat': return MessageSquare;
      case 'inPerson': return MapPin;
      default: return Video;
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'video': return '#E4004B';
      case 'phone': return '#4A90E2';
      case 'chat': return '#34C759';
      case 'inPerson': return '#FF6B6B';
      default: return '#E4004B';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBookingConfirm = () => {
    setIsBookingConfirmed(true);
    setTimeout(() => {
      onBookingComplete();
    }, 3000);
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return selectedDate && selectedTime && selectedSessionType;
    }
    return true;
  };

  if (isBookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" 
           style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #F0F9FF 100%)' }}>
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
                 style={{ background: 'linear-gradient(135deg, #34C759 0%, #4A90E2 100%)' }}>
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {t.step3.bookingSuccess}
            </h1>
            <p className="text-lg text-gray-600 max-w-sm mx-auto">
              {t.step3.bookingSuccessMsg}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" 
         style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #ffffff 50%, #F0F9FF 100%)' }}>
      
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-40 rounded-2xl border-white/50 bg-white/80 backdrop-blur-sm">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिंदी</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 rounded-2xl font-medium border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </Button>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              Book Session with {selectedCounselor.name}
            </h1>
          </div>
        </div>

        {/* Progress Tracker */}
        <Card className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                    index <= currentStep 
                      ? 'text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  style={index <= currentStep ? {
                    background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)'
                  } : {}}>
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className={`font-medium hidden sm:inline ${
                    index <= currentStep ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hidden lg:block w-16 h-1 rounded-full ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {currentStep === 0 && (
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold text-gray-800">{t.step1.title}</h2>
                  <p className="text-lg text-gray-600">{t.step1.subtitle}</p>
                </div>

                {/* Counselor Profile Card */}
                <Card className="rounded-3xl border-none shadow-xl bg-white">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start space-x-6">
                      <Avatar className="w-20 h-20 shadow-lg">
                        <AvatarFallback className="text-white text-2xl font-bold"
                                       style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                          {selectedCounselor.image}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-800">{selectedCounselor.name}</h3>
                            {selectedCounselor.verified && (
                              <Badge className="rounded-full bg-green-100 text-green-700 border-green-200">
                                <UserCheck className="w-3 h-3 mr-1" />
                                {t.step1.verified}
                              </Badge>
                            )}
                          </div>
                          <p className="text-lg text-gray-600 font-medium">{selectedCounselor.title}</p>
                          
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-gray-800">{selectedCounselor.rating}</span>
                            </div>
                            <div className="text-gray-600 font-medium">
                              {selectedCounselor.experience} {t.step1.experience}
                            </div>
                            <Badge className="rounded-full bg-blue-100 text-blue-700 border-blue-200">
                              <Award className="w-3 h-3 mr-1" />
                              {t.step1.licensed}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-3xl font-bold" style={{ color: '#E4004B' }}>
                            {selectedCounselor.fee}
                          </div>
                          <div className="text-sm text-gray-500">per session</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">{t.step1.specializations}</h4>
                        <div className="space-y-2">
                          {selectedCounselor.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline" className="rounded-full font-medium block w-fit">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">{t.step1.languages}</h4>
                        <div className="space-y-2">
                          {selectedCounselor.languages.map((lang, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Languages className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">{lang}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">{t.step1.sessionModes}</h4>
                        <div className="flex space-x-2">
                          {selectedCounselor.sessionTypes.map((type) => {
                            const Icon = getSessionTypeIcon(type);
                            return (
                              <div key={type} className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
                                <Icon className="w-5 h-5 text-gray-600" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50/50 p-4 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 font-medium">
                          {t.step1.confidential}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold text-gray-800">{t.step2.title}</h2>
                  <p className="text-lg text-gray-600">{t.step2.subtitle}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Calendar Section */}
                  <Card className="rounded-3xl border-none shadow-lg bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                        <CalendarIcon className="w-5 h-5" />
                        <span>{t.step2.calendar}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-2xl border-none"
                      />
                    </CardContent>
                  </Card>

                  {/* Time Slots & Session Type */}
                  <div className="space-y-6">
                    {/* Session Type Selection */}
                    <Card className="rounded-3xl border-none shadow-lg bg-white">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-800">{t.step2.sessionType}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedCounselor.sessionTypes.map((type) => {
                            const Icon = getSessionTypeIcon(type);
                            const isSelected = selectedSessionType === type;
                            return (
                              <Button
                                key={type}
                                variant={isSelected ? "default" : "outline"}
                                onClick={() => setSelectedSessionType(type)}
                                className={`rounded-2xl p-4 h-auto flex flex-col items-center space-y-2 font-medium transition-all duration-200 ${
                                  isSelected ? 'text-white shadow-lg transform scale-105' : 'hover:bg-gray-50'
                                }`}
                                style={isSelected ? {
                                  background: `linear-gradient(135deg, ${getSessionTypeColor(type)} 0%, ${getSessionTypeColor(type)}80 100%)`
                                } : {}}
                              >
                                <Icon className="w-6 h-6" />
                                <span className="text-sm">
                                  {t.step2.sessionTypes[type as keyof typeof t.step2.sessionTypes]}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Time Slots */}
                    <Card className="rounded-3xl border-none shadow-lg bg-white">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span>{t.step2.timeSlots}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {["morning", "afternoon", "evening"].map((period) => {
                          const periodSlots = timeSlots.filter(slot => slot.period === period && slot.available);
                          
                          if (periodSlots.length === 0) return null;
                          
                          return (
                            <div key={period}>
                              <h4 className="font-medium text-gray-700 mb-2 capitalize">
                                {t.step2[period as keyof typeof t.step2]}
                              </h4>
                              <div className="grid grid-cols-3 gap-2">
                                {periodSlots.map((slot) => (
                                  <Button
                                    key={slot.time}
                                    variant={selectedTime === slot.time ? "default" : "outline"}
                                    onClick={() => setSelectedTime(slot.time)}
                                    className={`rounded-2xl font-medium transition-all duration-200 ${
                                      selectedTime === slot.time 
                                        ? 'text-white shadow-lg transform scale-105' 
                                        : 'hover:bg-gray-50'
                                    }`}
                                    style={selectedTime === slot.time ? {
                                      background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)'
                                    } : {}}
                                  >
                                    {slot.time}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold text-gray-800">{t.step3.title}</h2>
                  <p className="text-lg text-gray-600">{t.step3.subtitle}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Booking Summary */}
                  <Card className="rounded-3xl border-none shadow-lg bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800">{t.step3.bookingSummary}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16 shadow-lg">
                          <AvatarFallback className="text-white text-lg font-bold"
                                         style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                            {selectedCounselor.image}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{selectedCounselor.name}</h3>
                          <p className="text-gray-600">{selectedCounselor.title}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-600">{t.step3.date}:</span>
                          <span className="font-bold text-gray-800">
                            {selectedDate && formatDate(selectedDate)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-600">{t.step3.time}:</span>
                          <span className="font-bold text-gray-800">{selectedTime}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-600">{t.step3.sessionType}:</span>
                          <div className="flex items-center space-x-2">
                            {React.createElement(getSessionTypeIcon(selectedSessionType), { 
                              className: "w-4 h-4", 
                              style: { color: getSessionTypeColor(selectedSessionType) }
                            })}
                            <span className="font-bold text-gray-800">
                              {selectedSessionType && t.step2.sessionTypes[selectedSessionType as keyof typeof t.step2.sessionTypes]}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-600">{t.step3.duration}:</span>
                          <span className="font-bold text-gray-800">50 {t.minutes}</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-800">{t.step3.fee}:</span>
                          <span className="text-2xl font-bold" style={{ color: '#E4004B' }}>
                            {selectedCounselor.fee}
                          </span>
                        </div>
                      </div>

                      <div className="bg-green-50/50 p-4 rounded-2xl">
                        <div className="flex items-start space-x-3">
                          <Info className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-green-800 font-medium mb-1">
                              {t.step3.disclaimer}
                            </p>
                            <p className="text-green-700 text-sm">
                              {t.step3.privacyNotice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Session Details Form */}
                  <Card className="rounded-3xl border-none shadow-lg bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800">Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="reason">{t.step3.reasonForVisit}</Label>
                        <Textarea
                          id="reason"
                          placeholder={t.step3.reasonPlaceholder}
                          value={reasonForVisit}
                          onChange={(e) => setReasonForVisit(e.target.value)}
                          className="rounded-2xl border-gray-200 bg-gray-50/50 resize-none"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="notes">{t.step3.specialNotes}</Label>
                        <Textarea
                          id="notes"
                          placeholder={t.step3.notesPlaceholder}
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          className="rounded-2xl border-gray-200 bg-gray-50/50 resize-none"
                          rows={3}
                        />
                      </div>

                      <Button
                        onClick={handleBookingConfirm}
                        className="w-full h-12 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #34C759 0%, #4A90E2 100%)' }}
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {t.step3.confirmBooking}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              <Button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                variant="outline"
                disabled={currentStep === 0}
                className="flex items-center space-x-2 rounded-2xl font-medium border-gray-300 hover:bg-gray-50 px-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>

              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1 || !canProceed()}
                className="flex items-center space-x-2 rounded-2xl font-medium text-white shadow-lg px-6"
                style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}
              >
                <span>{currentStep === steps.length - 1 ? t.confirm : t.continue}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}