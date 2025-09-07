// src/components/LoginScreen.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (data: { user: User }) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const translations = {
  en: { welcome: "Welcome to Mind Care", login: "Sign In", register: "Create Account", email: "Email Address", password: "Password", fullName: "Full Name", signIn: "Sign In", signUp: "Sign Up", errors: { passwordMismatch: "Passwords do not match" }, confirmPassword: "Confirm Password" },
  hi: { welcome: "Mind Care में आपका स्वागत है", login: "साइन इन करें", register: "खाता बनाएं", email: "ईमेल पता", password: "पासवर्ड", fullName: "पूरा नाम", signIn: "साइन इन करें", signUp: "साइन अप करें", errors: { passwordMismatch: "पासवर्ड मेल नहीं खाते" }, confirmPassword: "पासवर्ड की पुष्टि करें" },
};

export default function LoginScreen({ onLogin, language, setLanguage }: LoginScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [activeTab, setActiveTab] = useState('login');
  // Yahan formData ko poori tarah se initialize karein
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Login failed');
        onLogin(data);
    } catch (error: any) {
        setGeneralError(error.message);
    }
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: t.errors.passwordMismatch });
        return;
    }
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName: formData.fullName, email: formData.email, password: formData.password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Registration failed');
        alert("Registration successful! Please sign in.");
        setActiveTab('login');
    } catch (error: any) {
        setGeneralError(error.message);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #F0F9FF 100%)' }}>
          <Card className="w-full max-w-md rounded-3xl shadow-2xl">
              <CardContent className="p-8">
                  <h1 className="text-2xl font-bold text-center mb-4">{t.welcome}</h1>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="login">{t.login}</TabsTrigger>
                          <TabsTrigger value="register">{t.register}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4 pt-4">
                          {generalError && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{generalError}</AlertDescription></Alert>}
                          <div className="space-y-2">
                              <Label htmlFor="login-email">{t.email}</Label>
                              <Input id="login-email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="login-password">{t.password}</Label>
                              <Input id="login-password" type="password" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} />
                          </div>
                          <Button onClick={handleLogin} className="w-full">{t.signIn}</Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4 pt-4">
                           {generalError && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{generalError}</AlertDescription></Alert>}
                          <div className="space-y-2">
                              <Label htmlFor="reg-name">{t.fullName}</Label>
                              <Input id="reg-name" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="reg-email">{t.email}</Label>
                              <Input id="reg-email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="reg-password">{t.password}</Label>
                              <Input id="reg-password" type="password" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="reg-confirm-password">{t.confirmPassword}</Label>
                              <Input id="reg-confirm-password" type="password" value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} />
                               {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                          </div>
                          <Button onClick={handleRegister} className="w-full">{t.signUp}</Button>
                      </TabsContent>
                  </Tabs>
              </CardContent>
          </Card>
      </div>
  );
}