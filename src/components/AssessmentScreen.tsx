import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Brain, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface AssessmentScreenProps {
  onComplete: (results: any) => void;
  language: string;
}

const translations = {
  en: {
    title: "Mental Health Assessment",
    subtitle: "Understanding your current wellbeing",
    description: "Please answer these questions honestly. This assessment helps us understand your current mental health state and provide personalized support.",
    phq9Title: "PHQ-9: Depression Screening",
    gad7Title: "GAD-7: Anxiety Screening",
    question: "Over the last 2 weeks, how often have you been bothered by:",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day"
    ],
    next: "Next",
    previous: "Previous",
    complete: "Complete Assessment",
    confidential: "Confidential & Secure"
  },
  hi: {
    title: "मानसिक स्वास्थ्य मूल्यांकन",
    subtitle: "आपकी वर्तमान भलाई को समझना",
    description: "कृपया इन प्रश्नों का ईमानदारी से उत्तर दें। यह मूल्यांकन हमें आपकी वर्तमान मानसिक स्वास्थ्य स्थिति को समझने और व्यक्तिगत सहायता प्रदान करने में मदद करता है।",
    phq9Title: "PHQ-9: अवसाद स्क्रीनिंग",
    gad7Title: "GAD-7: चिंता स्क्रीनिंग",
    question: "पिछले 2 हफ्तों में, आप कितनी बार परेशान हुए हैं:",
    options: [
      "बिल्कुल नहीं",
      "कई दिन",
      "आधे से अधिक दिन",
      "लगभग हर दिन"
    ],
    next: "अगला",
    previous: "पिछला",
    complete: "मूल्यांकन पूरा करें",
    confidential: "गोपनीय और सुरक्षित"
  }
};

// PHQ-9 Questions
const phq9Questions = {
  en: [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself"
  ],
  hi: [
    "चीजों में रुचि या खुशी कम होना",
    "उदास, निराश, या निराशाजनक महसूस करना",
    "सोने में परेशानी या बहुत अधिक सोना",
    "थकान महसूस करना या ऊर्जा कम होना",
    "भूख कम लगना या अधिक खाना",
    "अपने बारे में बुरा महसूस करना या यह लगना कि आप असफल हैं या अपने परिवार को निराश किया है",
    "अखबार पढ़ने या टेलीविजन देखने जैसी चीजों पर ध्यान लगाने में परेशानी",
    "इतनी धीरे-धीरे हिलना या बोलना कि दूसरे लोग इसे नोटिस कर सकें। या इसके विपरीत इतना बेचैन या अशांत होना कि आप सामान्य से अधिक घूम रहे हैं",
    "यह सोचना कि आप मर जाएं तो बेहतर होगा, या खुद को नुकसान पहुंचाने के विचार"
  ]
};

// GAD-7 Questions  
const gad7Questions = {
  en: [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ],
  hi: [
    "घबराहट, चिंता, या बेचैनी महसूस करना",
    "चिंता को रोकने या नियंत्रित करने में असमर्थ होना",
    "अलग-अलग चीजों के बारे में बहुत अधिक चिंता करना",
    "आराम करने में परेशानी",
    "इतना बेचैन होना कि चुपचाप बैठना मुश्किल हो",
    "आसानी से परेशान या चिढ़ जाना",
    "डर लगना, जैसे कि कुछ भयानक होने वाला हो"
  ]
};

export default function AssessmentScreen({ onComplete, language }: AssessmentScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [currentStep, setCurrentStep] = useState(0);
  const [phq9Answers, setPhq9Answers] = useState<number[]>(new Array(9).fill(-1));
  const [gad7Answers, setGad7Answers] = useState<number[]>(new Array(7).fill(-1));
  
  const totalQuestions = 16;
  const currentQuestionIndex = currentStep;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  
  const isPhq9 = currentStep < 9;
  const currentQuestions = isPhq9 ? phq9Questions[language as keyof typeof phq9Questions] : gad7Questions[language as keyof typeof gad7Questions];
  const currentAnswers = isPhq9 ? phq9Answers : gad7Answers;
  const questionIndex = isPhq9 ? currentStep : currentStep - 9;
  
  const handleAnswer = (value: number) => {
    if (isPhq9) {
      const newAnswers = [...phq9Answers];
      newAnswers[questionIndex] = value;
      setPhq9Answers(newAnswers);
    } else {
      const newAnswers = [...gad7Answers];
      newAnswers[questionIndex] = value;
      setGad7Answers(newAnswers);
    }
  };

  const canProceed = currentAnswers[questionIndex] !== -1;
  
  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate scores
      const phq9Score = phq9Answers.reduce((sum, answer) => sum + (answer >= 0 ? answer : 0), 0);
      const gad7Score = gad7Answers.reduce((sum, answer) => sum + (answer >= 0 ? answer : 0), 0);
      
      onComplete({
        phq9Score,
        gad7Score,
        phq9Answers,
        gad7Answers,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              {t.description}
            </p>
          </div>

          <Badge variant="secondary" className="rounded-full">
            <AlertCircle className="w-3 h-3 mr-1" />
            {t.confidential}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Question {currentStep + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>

        {/* Assessment Section Header */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isPhq9 ? 'bg-primary' : 'bg-secondary'}`}></div>
              <span>{isPhq9 ? t.phq9Title : t.gad7Title}</span>
            </CardTitle>
            <CardDescription>
              {t.question}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base leading-relaxed">
              {currentQuestions[questionIndex]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentAnswers[questionIndex]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              {t.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {index}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-xl"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t.previous}
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index < currentStep
                    ? 'bg-primary'
                    : index === currentStep
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="rounded-xl"
          >
            {currentStep === totalQuestions - 1 ? t.complete : t.next}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}