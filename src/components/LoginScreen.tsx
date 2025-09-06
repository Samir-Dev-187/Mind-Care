import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Heart, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  Shield, 
  UserPlus, 
  Globe,
  AlertCircle
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const translations = {
  en: {
    welcome: "Welcome to Mind Care",
    subtitle: "Your safe space for mental wellness",
    description: "Join thousands of students who trust Mind Care for confidential mental health support.",
    login: "Sign In",
    register: "Create Account",
    email: "Email Address",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    institution: "Institution",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signUp: "Sign Up",
    signIn: "Sign In",

    sendOtp: "Send OTP",
    verifyOtp: "Verify OTP",
    enterOtp: "Enter 6-digit OTP",
    privacyNotice: "By signing up, you agree to our privacy-first approach. Your data is encrypted and anonymous.",
    secureLogin: "🔒 Secure & Confidential",
    features: {
      anonymous: "Anonymous Support",
      secure: "End-to-End Security",
      available: "24/7 Available"
    },
    loginMethods: {
      email: "Email",
      phone: "Phone + OTP"
    },
    // New error messages
    errors: {
      invalidEmail: "Please enter a valid email address.",
      passwordRequired: "Password is required.",
      emailRequired: "Email address is required.",
      nameRequired: "Full name is required.",
      passwordMismatch: "Passwords do not match.",
      passwordLength: "Password must be at least 6 characters.",
      loginFailed: "Invalid credentials. Please try again.",
      formError: "Please fix the errors before submitting."
    }
  },
  hi: {
    welcome: "Mind Care में आपका स्वागत है",
    subtitle: "मानसिक स्वास्थ्य के लिए आपका सुरक्षित स्थान",
    description: "हजारों छात्रों में शामिल हों जो गोपनीय मानसिक स्वास्थ्य सहायता के लिए Mind Care पर भरोसा करते हैं।",
    login: "साइन इन करें",
    register: "खाता बनाएं",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    fullName: "पूरा नाम",
    institution: "संस्थान",
    forgotPassword: "पासवर्ड भूल गए?",
    noAccount: "खाता नहीं है?",
    hasAccount: "पहले से खाता है?",
    signUp: "साइन अप करें",
    signIn: "साइन इन करें",

    sendOtp: "OTP भेजें",
    verifyOtp: "OTP सत्यापित करें",
    enterOtp: "6-अंकीय OTP दर्ज करें",
    privacyNotice: "साइन अप करके, आप हमारे गोपनीयता-प्राथमिक दृष्टिकोण से सहमत हैं। आपका डेटा एन्क्रिप्टेड और गुमनाम है।",
    secureLogin: "🔒 सुरक्षित और गोपनीय",
    features: {
      anonymous: "गुमनाम सहायता",
      secure: "एंड-टू-एंड सुरक्षा",
      available: "24/7 उपलब्ध"
    },
    loginMethods: {
      email: "ईमेल",
      phone: "फोन + OTP"
    },
    // New error messages
    errors: {
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें।",
      passwordRequired: "पासवर्ड आवश्यक है।",
      emailRequired: "ईमेल पता आवश्यक है।",
      nameRequired: "पूरा नाम आवश्यक है।",
      passwordMismatch: "पासवर्ड मेल नहीं खाते।",
      passwordLength: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
      loginFailed: "अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।",
      formError: "सबमिट करने से पहले कृपया त्रुटियों को ठीक करें।"
    }
  }
};

export default function LoginScreen({ onLogin, language, setLanguage }: LoginScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    institution: '',
    otp: ''
  });
  // New state for form errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear the error for the field being edited
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (email: string) => {
    // A simple regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
    setErrors({});
    setGeneralError(null);

    // Basic Validation for Sign In
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = t.errors.emailRequired;
    if (!validateEmail(formData.email)) newErrors.email = t.errors.invalidEmail;
    if (!formData.password) newErrors.password = t.errors.passwordRequired;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate server check for incorrect credentials
    if (formData.email === "user@example.com" && formData.password === "password123") {
      onLogin();
    } else {
      setGeneralError(t.errors.loginFailed);
    }
  };

  const handleRegister = () => {
    setErrors({});
    setGeneralError(null);

    // Validation for Create Account
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.errors.nameRequired;
    if (!formData.email) {
      newErrors.email = t.errors.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.errors.invalidEmail;
    }
    if (formData.password.length < 6) {
      newErrors.password = t.errors.passwordLength;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.errors.passwordMismatch;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGeneralError(t.errors.formError);
      return;
    }

    // If validation passes, proceed to login/dashboard
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #F0F9FF 100%)' }}>
      
      <div className="absolute top-6 right-6">
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

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl"
                 style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-gray-800">{t.welcome}</h1>
            <p className="text-xl text-gray-600">{t.subtitle}</p>
            <p className="text-gray-500 max-w-sm mx-auto">{t.description}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          {Object.values(t.features).map((feature, index) => (
            <div key={index} className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-white/50">
              {feature}
            </div>
          ))}
        </div>

        <Card className="rounded-3xl shadow-2xl border-white/50 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-gray-100/80">
                <TabsTrigger value="login" className="rounded-2xl font-medium">{t.login}</TabsTrigger>
                <TabsTrigger value="register" className="rounded-2xl font-medium">{t.register}</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                {generalError && activeTab === 'login' && (
                  <Alert variant="destructive" className="rounded-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{generalError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={loginMethod === 'email' ? 'default' : 'outline'}
                    onClick={() => setLoginMethod('email')}
                    className="rounded-2xl font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {t.loginMethods.email}
                  </Button>
                  <Button
                    variant={loginMethod === 'phone' ? 'default' : 'outline'}
                    onClick={() => setLoginMethod('phone')}
                    className="rounded-2xl font-medium"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t.loginMethods.phone}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="rounded-2xl border-gray-200 bg-gray-50/50"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="rounded-2xl border-gray-200 bg-gray-50/50 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                  </div>
                </div>

                <div className="text-right">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium">{t.forgotPassword}</Button>
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full h-12 rounded-2xl font-medium text-lg text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}
                >
                  {t.signIn}
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                {generalError && activeTab === 'register' && (
                  <Alert variant="destructive" className="rounded-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{generalError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">{t.fullName}</Label>
                    <Input
                      id="register-name"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="rounded-2xl border-gray-200 bg-gray-50/50"
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.email}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="rounded-2xl border-gray-200 bg-gray-50/50"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.password}</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="rounded-2xl border-gray-200 bg-gray-50/50 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="rounded-2xl border-gray-200 bg-gray-50/50 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800 leading-relaxed">{t.privacyNotice}</p>
                  </div>
                </div>

                <Button
                  onClick={handleRegister}
                  className="w-full h-12 rounded-2xl font-medium text-lg text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' }}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  {t.signUp}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>{t.secureLogin}</span>
          </p>
        </div>
      </div>
    </div>
  );
}