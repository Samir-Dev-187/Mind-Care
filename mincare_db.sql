-- 1. Users Table: Sabse important table, user ki basic details store karegi.
CREATE DATABASE mindcare_db;
USE mindcare_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_photo_url VARCHAR(255),
    gender ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    institution VARCHAR(255),
    year_of_study VARCHAR(50),
    is_2fa_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Counselors Table: Aapke app ke therapists/counselors ki details.
CREATE TABLE counselors (
    counselor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    bio TEXT,
    profile_photo_url VARCHAR(255),
    experience_years INT,
    rating DECIMAL(2, 1)
);

-- 3. Bookings Table: User aur counselor ke beech ki appointments.
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    counselor_id INT,
    session_type ENUM('video', 'phone', 'chat', 'in_person') NOT NULL,
    booking_time TIMESTAMP NOT NULL,
    duration_minutes INT DEFAULT 50,
    status ENUM('upcoming', 'completed', 'cancelled') DEFAULT 'upcoming',
    reason_for_visit TEXT,
    special_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (counselor_id) REFERENCES counselors(counselor_id)
);

-- 4. Health_Assessments Table: PHQ-9 aur GAD-7 jaise assessments ke results.
CREATE TABLE health_assessments (
    assessment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    assessment_type VARCHAR(50), -- 'phq9', 'gad7', etc.
    score INT,
    answers JSON, -- Answers ko JSON format mein store karna flexible hai.
    risk_level ENUM('low', 'moderate', 'high'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 5. User_Preferences Table: App ki settings jaise language, notifications.
CREATE TABLE user_preferences (
    preference_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    language VARCHAR(10) DEFAULT 'en',
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    session_reminders BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);