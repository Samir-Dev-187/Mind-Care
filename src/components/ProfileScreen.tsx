import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { User as UserIcon, Calendar, Edit, Camera } from 'lucide-react';
import { User, UserProfile } from '../types'; // types.ts se import karein

// Props ke liye interface ko theek karein
interface ProfileScreenProps {
  user: User | null;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const translations = {
    en: {
      profile: "My Profile",
      myBookings: "My Bookings",
      profileCompletion: "Profile Completion",
      completeProfile: "Complete your profile to get personalized recommendations",
      personalInfo: "Personal Information",
      updateDetails: "Update your personal details",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      gender: "Gender",
      institution: "Institution",
      yearOfStudy: "Year of Study",
      profilePhoto: "Profile Photo",
      genderOptions: { male: "Male", female: "Female", other: "Other", preferNotToSay: "Prefer not to say" },
      yearOptions: { firstYear: "1st Year", secondYear: "2nd Year", thirdYear: "3rd Year", fourthYear: "4th Year", graduate: "Graduate", postGraduate: "Post Graduate" },
      save: "Save Changes",
      edit: "Edit",
      cancel: "Cancel",
      upload: "Upload Photo",
    },
    hi: {
      profile: "मेरी प्रोफाइल",
      myBookings: "मेरी बुकिंग",
      profileCompletion: "प्रोफाइल पूर्णता",
      completeProfile: "व्यक्तिगत सिफारिशें पाने के लिए अपनी प्रोफाइल पूरी करें",
      personalInfo: "व्यक्तिगत जानकारी",
      updateDetails: "अपने व्यक्तिगत विवरण अपडेट करें",
      fullName: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      gender: "लिंग",
      institution: "संस्थान",
      yearOfStudy: "अध्ययन का वर्ष",
      profilePhoto: "प्रोफाइल फोटो",
      genderOptions: { male: "पुरुष", female: "महिला", other: "अन्य", preferNotToSay: "कहना पसंद नहीं" },
      yearOptions: { firstYear: "प्रथम वर्ष", secondYear: "द्वितीय वर्ष", thirdYear: "तृतीय वर्ष", fourthYear: "चतुर्थ वर्ष", graduate: "स्नातक", postGraduate: "स्नातकोत्तर" },
      save: "परिवर्तन सहेजें",
      edit: "संपादित करें",
      cancel: "रद्द करें",
      upload: "फोटो अपलोड करें",
    }
};

export default function ProfileScreen({ user, language, setLanguage }: ProfileScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const photoUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:5000/api/user/${user.id}`)
        .then(res => res.json())
        .then(data => setUserProfile(data))
        .catch(console.error);
    }
  }, [user]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => (prev ? { ...prev, [field]: value } : null));
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;
    const formData = new FormData();
    formData.append('profilePhoto', file);
    try {
      const response = await fetch(`http://localhost:5000/api/user/${user.id}/photo`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setUserProfile(prev => prev ? { ...prev, profile_photo_url: data.photoUrl } : null);
      } else { throw new Error(data.error); }
    } catch (error) {
      console.error('Photo upload failed:', error);
    }
  };

  const handleSaveChanges = async () => {
    if (!user?.id || !userProfile) return;
    try {
      const response = await fetch(`http://localhost:5000/api/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: userProfile.full_name,
          phone: userProfile.phone_number,
          gender: userProfile.gender,
          institution: userProfile.institution,
          yearOfStudy: userProfile.year_of_study
        }),
      });
      if (response.ok) {
        setIsEditing(false);
        alert("Profile updated!");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const calculateProfileCompletion = () => {
    if (!userProfile) return 0;
    const fields: (keyof UserProfile)[] = ['full_name', 'email', 'phone_number', 'gender', 'institution', 'year_of_study', 'profile_photo_url'];
    const completedFields = fields.filter(field => userProfile[field] !== null && userProfile[field] !== '');
    return Math.round((completedFields.length / fields.length) * 100);
  };

  if (!userProfile) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t.profileCompletion}</CardTitle>
          <CardDescription>{t.completeProfile}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={calculateProfileCompletion()} className="w-full" />
          <p className="text-center mt-2 font-semibold text-lg text-primary">{calculateProfileCompletion()}% Complete</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
                <CardTitle>{t.personalInfo}</CardTitle>
                <CardDescription>{t.updateDetails}</CardDescription>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline"><Edit className="mr-2 h-4 w-4" />{isEditing ? t.cancel : t.edit}</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile.profile_photo_url ? `http://localhost:5000${userProfile.profile_photo_url}` : undefined} />
                    <AvatarFallback>{userProfile.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                     <Label>{t.profilePhoto}</Label>
                     <Input type="file" ref={photoUploadRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" disabled={!isEditing} />
                     <Button onClick={() => photoUploadRef.current?.click()} disabled={!isEditing}><Camera className="mr-2 h-4 w-4" />{t.upload}</Button>
                </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="name">{t.fullName}</Label><Input id="name" value={userProfile.full_name || ''} onChange={e => handleInputChange('full_name', e.target.value)} disabled={!isEditing} /></div>
                <div><Label htmlFor="email">{t.email}</Label><Input id="email" value={userProfile.email || ''} disabled /></div>
                <div><Label htmlFor="phone">{t.phone}</Label><Input id="phone" value={userProfile.phone_number || ''} onChange={e => handleInputChange('phone_number', e.target.value)} disabled={!isEditing} /></div>
                <div><Label htmlFor="institution">{t.institution}</Label><Input id="institution" value={userProfile.institution || ''} onChange={e => handleInputChange('institution', e.target.value)} disabled={!isEditing} /></div>
                <div>
                  <Label htmlFor="gender">{t.gender}</Label>
                  <Select value={userProfile.gender || ''} onValueChange={value => handleInputChange('gender', value)} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="male">{t.genderOptions.male}</SelectItem>
                          <SelectItem value="female">{t.genderOptions.female}</SelectItem>
                          <SelectItem value="other">{t.genderOptions.other}</SelectItem>
                          <SelectItem value="prefer_not_to_say">{t.genderOptions.preferNotToSay}</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="year">{t.yearOfStudy}</Label>
                  <Select value={userProfile.year_of_study || ''} onValueChange={value => handleInputChange('year_of_study', value)} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
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
            {isEditing && <div className="flex justify-end"><Button onClick={handleSaveChanges}>{t.save}</Button></div>}
        </CardContent>
      </Card>
    </div>
  );
}