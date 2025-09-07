// src/types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserProfile {
    user_id: number;
    full_name: string;
    email: string;
    phone_number: string | null;
    profile_photo_url: string | null;
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
    institution: string | null;
    year_of_study: string | null;
}