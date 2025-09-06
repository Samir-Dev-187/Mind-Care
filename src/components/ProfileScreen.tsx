import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Calendar,
  Video,
  MessageSquare,
  CheckCircle,
  Clock,
  X,
  Search,
  Filter,
  Edit,
  Camera,
  Lock,
  Settings,
  UserCheck,
  GraduationCap,
  Star,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

interface ProfileScreenProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const translations = {
  en: {
    profile: "My Profile",
    profileSubtitle: "Manage your account and preferences",
    myBookings: "My Bookings",
    bookingsSubtitle: "View and manage your counseling sessions",
    
    // Profile Section
    profileCompletion: "Profile Completion",
    completeProfile: "Complete your profile to get personalized recommendations",
    personalInfo: "Personal Information",
    accountSecurity: "Account & Security",
    preferences: "Preferences",
    
    // Personal Info Fields
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    gender: "Gender",
    institution: "Institution",
    yearOfStudy: "Year of Study",
    profilePhoto: "Profile Photo",
    
    // Gender Options
    genderOptions: {
      male: "Male",
      female: "Female", 
      other: "Other",
      preferNotToSay: "Prefer not to say"
    },
    
    // Year Options
    yearOptions: {
      firstYear: "1st Year",
      secondYear: "2nd Year",
      thirdYear: "3rd Year",
      fourthYear: "4th Year",
      graduate: "Graduate",
      postGraduate: "Post Graduate"
    },
    
    // Security
    changePassword: "Change Password",
    twoFactorAuth: "Two-Factor Authentication",
    enable2FA: "Enable 2FA for enhanced security",
    
    // Preferences
    language: "Language",
    notifications: "Notifications",
    darkMode: "Dark Mode",
    emailNotifications: "Email Notifications",
    pushNotifications: "Push Notifications",
    sessionReminders: "Session Reminders",
    
    // Bookings
    searchBookings: "Search bookings...",
    filterStatus: "Filter by status",
    allBookings: "All Bookings",
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
    
    // Booking Actions
    joinSession: "Join Session",
    reschedule: "Reschedule", 
    cancel: "Cancel",
    rebook: "Book Again",
    viewDetails: "View Details",
    
    // Status
    statusUpcoming: "Upcoming",
    statusCompleted: "Completed",
    statusCancelled: "Cancelled",
    
    // Buttons
    save: "Save Changes",
    edit: "Edit",
    upload: "Upload Photo",
    
    // Messages
    profileUpdated: "Profile updated successfully!",
    settingsSaved: "Settings saved successfully!"
  },
  
  hi: {
    profile: "मेरी प्रोफाइल",
    profileSubtitle: "अपना खाता और प्राथमिकताएं प्रबंधित करें",
    myBookings: "मेरी बुकिंग",
    bookingsSubtitle: "अपने परामर्श सत्र देखें और प्रबंधित करें",
    
    // Profile Section
    profileCompletion: "प्रोफाइल पूर्णता",
    completeProfile: "व्यक्तिगत सिफारिशें पाने के लिए अपनी प्रोफाइल पूरी करें",
    personalInfo: "व्यक्तिगत जानकारी",
    accountSecurity: "खाता और सुरक्षा",
    preferences: "प्राथमिकताएं",
    
    // Personal Info Fields
    fullName: "पूरा नाम",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    gender: "लिंग",
    institution: "संस्थान",
    yearOfStudy: "अध्ययन का वर्ष",
    profilePhoto: "प्रोफाइल फोटो",
    
    // Gender Options
    genderOptions: {
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      preferNotToSay: "कहना पसंद नहीं"
    },
    
    // Year Options
    yearOptions: {
      firstYear: "प्रथम वर्ष",
      secondYear: "द्वितीय वर्ष", 
      thirdYear: "तृतीय वर्ष",
      fourthYear: "चतुर्थ वर्ष",
      graduate: "स्नातक",
      postGraduate: "स्नातकोत्तर"
    },
    
    // Security
    changePassword: "पासवर्ड बदलें",
    twoFactorAuth: "द्विकारक प्रमाणीकरण",
    enable2FA: "बेहतर सुरक्षा के लिए 2FA सक्षम करें",
    
    // Preferences
    language: "भाषा",
    notifications: "अधिसूचनाएं",
    darkMode: "डार्क मोड",
    emailNotifications: "ईमेल अधिसूचनाएं",
    pushNotifications: "पुश अधिसूचनाएं",
    sessionReminders: "सत्र अनुस्मारक",
    
    // Bookings
    searchBookings: "बुकिंग खोजें...",
    filterStatus: "स्थिति के अनुसार फ़िल्टर करें",
    allBookings: "सभी बुकिंग",
    upcoming: "आगामी",
    completed: "पूर्ण",
    cancelled: "रद्द",
    
    // Booking Actions
    joinSession: "सत्र में शामिल हों",
    reschedule: "पुनर्निर्धारण",
    cancel: "रद्द करें",
    rebook: "फिर से बुक करें",
    viewDetails: "विवरण देखें",
    
    // Status
    statusUpcoming: "आगामी",
    statusCompleted: "पूर्ण",
    statusCancelled: "रद्द",
    
    // Buttons
    save: "परिवर्तन सहेजें",
    edit: "संपादित करें",
    upload: "फोटो अपलोड करें",
    
    // Messages
    profileUpdated: "प्रोफाइल सफलतापूर्वक अपडेट हो गई!",
    settingsSaved: "सेटिंग्स सफलतापूर्वक सहेजी गईं!"
  }
};

// Mock user data
const mockUser = {
  name: "Priya Sharma",
  email: "priya.sharma@university.edu",
  phone: "+91 98765 43210",
  gender: "female",
  institution: "Delhi University",
  yearOfStudy: "thirdYear",
  profilePhoto: null,
  is2FAEnabled: false,
  emailNotifications: true,
  pushNotifications: true,
  sessionReminders: true
};

// Mock bookings data
const mockBookings = [
  {
    id: 1,
    counselor: {
      name: "Dr. Priya Sharma",
      photo: "PS",
      specialization: "Anxiety & Depression"
    },
    date: "2024-12-20",
    time: "2:00 PM",
    sessionType: "video",
    status: "upcoming",
    duration: "50 minutes"
  },
  {
    id: 2,
    counselor: {
      name: "Dr. Rajesh Kumar",
      photo: "RK",
      specialization: "Trauma & PTSD"
    },
    date: "2024-12-15",
    time: "4:00 PM",
    sessionType: "chat",
    status: "completed",
    duration: "50 minutes"
  },
  {
    id: 3,
    counselor: {
      name: "Dr. Anita Patel",
      photo: "AP",
      specialization: "Stress Management"
    },
    date: "2024-12-10",
    time: "10:00 AM",
    sessionType: "video",
    status: "cancelled",
    duration: "50 minutes"
  },
  {
    id: 4,
    counselor: {
      name: "Dr. Priya Sharma", 
      photo: "PS",
      specialization: "Student Counseling"
    },
    date: "2024-12-05",
    time: "3:30 PM",
    sessionType: "video",
    status: "completed",
    duration: "50 minutes"
  }
];

export default function ProfileScreen({ language, setLanguage }: ProfileScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [userProfile, setUserProfile] = useState(mockUser);

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = ['name', 'email', 'phone', 'gender', 'institution', 'yearOfStudy'];
    const completedFields = fields.filter(field => userProfile[field as keyof typeof userProfile]);
    return Math.round((completedFields.length / fields.length) * 100);
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'chat': return MessageSquare;
      case 'phone': return Phone;
      default: return Video;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return X;
      default: return Clock;
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.counselor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const BookingCard = ({ booking }: { booking: any }) => {
    const StatusIcon = getStatusIcon(booking.status);
    const SessionIcon = getSessionTypeIcon(booking.sessionType);
    
    return (
      <Card className="rounded-3xl border-none shadow-lg bg-white hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-14 h-14 shadow-lg">
                <AvatarFallback className="text-white font-bold"
                               style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                  {booking.counselor.photo}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{booking.counselor.name}</h3>
                <p className="text-gray-600">{booking.counselor.specialization}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <SessionIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500 capitalize">
                    {booking.sessionType} • {booking.duration}
                  </span>
                </div>
              </div>
            </div>
            
            <Badge className={`rounded-full font-medium ${getStatusColor(booking.status)}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {t[`status${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}` as keyof typeof t]}
            </Badge>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-2xl mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-800">{formatDate(booking.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-800">{booking.time}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {booking.status === 'upcoming' && (
              <>
                <Button 
                  className="flex-1 rounded-2xl font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #34C759 0%, #4A90E2 100%)' }}
                >
                  {t.joinSession}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-2xl border-gray-300"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  {t.reschedule}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-2xl border-gray-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            
            {booking.status === 'completed' && (
              <>
                <Button 
                  variant="outline"
                  className="flex-1 rounded-2xl font-medium"
                >
                  {t.rebook}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-2xl border-gray-300"
                >
                  <Star className="w-4 h-4" />
                </Button>
              </>
            )}
            
            {booking.status === 'cancelled' && (
              <Button 
                variant="outline"
                className="flex-1 rounded-2xl font-medium"
              >
                {t.rebook}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pb-20" 
         style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #ffffff 50%, #F0F9FF 100%)' }}>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
                 style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-gray-800">
              {t.profile}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.profileSubtitle}
            </p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-3xl bg-gray-100/80 p-2 h-auto">
            <TabsTrigger 
              value="profile" 
              className="rounded-2xl font-bold py-3 data-[state=active]:text-white"
              style={activeTab === 'profile' ? { background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' } : {}}
            >
              <User className="w-4 h-4 mr-2" />
              {t.profile}
            </TabsTrigger>
            <TabsTrigger 
              value="bookings" 
              className="rounded-2xl font-bold py-3 data-[state=active]:text-white"
              style={activeTab === 'bookings' ? { background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' } : {}}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t.myBookings}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            {/* Profile Completion */}
            <Card className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{t.profileCompletion}</h2>
                      <p className="text-gray-600">{t.completeProfile}</p>
                    </div>
                    <div className="text-3xl font-bold" style={{ color: '#E4004B' }}>
                      {calculateProfileCompletion()}%
                    </div>
                  </div>
                  
                  <Progress 
                    value={calculateProfileCompletion()} 
                    className="h-3 rounded-full"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <Card className="lg:col-span-2 rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">{t.personalInfo}</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      size="sm"
                      className="rounded-2xl"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {t.edit}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24 shadow-lg">
                      <AvatarFallback className="text-white text-2xl font-bold"
                                     style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-gray-800">{t.profilePhoto}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 rounded-2xl"
                        disabled={!isEditing}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {t.upload}
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.fullName}</Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        disabled={!isEditing}
                        className="rounded-2xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        disabled={!isEditing}
                        className="rounded-2xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.phone}</Label>
                      <Input
                        id="phone"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        disabled={!isEditing}
                        className="rounded-2xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">{t.gender}</Label>
                      <Select 
                        value={userProfile.gender} 
                        onValueChange={(value) => setUserProfile({...userProfile, gender: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{t.genderOptions.male}</SelectItem>
                          <SelectItem value="female">{t.genderOptions.female}</SelectItem>
                          <SelectItem value="other">{t.genderOptions.other}</SelectItem>
                          <SelectItem value="preferNotToSay">{t.genderOptions.preferNotToSay}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="institution">{t.institution}</Label>
                      <Input
                        id="institution"
                        value={userProfile.institution}
                        onChange={(e) => setUserProfile({...userProfile, institution: e.target.value})}
                        disabled={!isEditing}
                        className="rounded-2xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year">{t.yearOfStudy}</Label>
                      <Select 
                        value={userProfile.yearOfStudy} 
                        onValueChange={(value) => setUserProfile({...userProfile, yearOfStudy: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="firstYear">{t.yearOptions.firstYear}</SelectItem>
                          <SelectItem value="secondYear">{t.yearOptions.secondYear}</SelectItem>
                          <SelectItem value="thirdYear">{t.yearOptions.thirdYear}</SelectItem>
                          <SelectItem value="fourthYear">{t.yearOptions.fourthYear}</SelectItem>
                          <SelectItem value="graduate">{t.yearOptions.graduate}</SelectItem>
                          <SelectItem value="postGraduate">{t.yearOptions.postGraduate}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setIsEditing(false)}
                        className="rounded-2xl font-medium text-white"
                        style={{ background: 'linear-gradient(135deg, #34C759 0%, #4A90E2 100%)' }}
                      >
                        {t.save}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security & Preferences */}
              <div className="space-y-6">
                {/* Security */}
                <Card className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">{t.accountSecurity}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl justify-start"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      {t.changePassword}
                    </Button>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-800">{t.twoFactorAuth}</p>
                          <p className="text-sm text-gray-600">{t.enable2FA}</p>
                        </div>
                      </div>
                      <Switch
                        checked={userProfile.is2FAEnabled}
                        onCheckedChange={(checked) => setUserProfile({...userProfile, is2FAEnabled: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">{t.preferences}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t.language}</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="rounded-2xl">
                          <Globe className="w-4 h-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <p className="font-medium text-gray-800">{t.notifications}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{t.emailNotifications}</span>
                        </div>
                        <Switch
                          checked={userProfile.emailNotifications}
                          onCheckedChange={(checked) => setUserProfile({...userProfile, emailNotifications: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{t.pushNotifications}</span>
                        </div>
                        <Switch
                          checked={userProfile.pushNotifications}
                          onCheckedChange={(checked) => setUserProfile({...userProfile, pushNotifications: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{t.sessionReminders}</span>
                        </div>
                        <Switch
                          checked={userProfile.sessionReminders}
                          onCheckedChange={(checked) => setUserProfile({...userProfile, sessionReminders: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{t.myBookings}</h2>
              <p className="text-lg text-gray-600">{t.bookingsSubtitle}</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={t.searchBookings}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 rounded-2xl border-gray-200 bg-white/80 backdrop-blur-sm h-12"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-64 rounded-2xl border-gray-200 bg-white/80 backdrop-blur-sm h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t.filterStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allBookings}</SelectItem>
                  <SelectItem value="upcoming">{t.upcoming}</SelectItem>
                  <SelectItem value="completed">{t.completed}</SelectItem>
                  <SelectItem value="cancelled">{t.cancelled}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bookings Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No bookings found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}