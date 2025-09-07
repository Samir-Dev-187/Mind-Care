// server.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs'; // Password hashing ke liye
import multer from 'multer'; // File uploads ke liye
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// --- Database Connection ---
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // Apna password yahan daalein
    database: 'mindcare_db'
});
console.log("Successfully connected to the database.");

// --- File Upload Setup ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Uploads folder ko public karein

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const userId = req.params.userId;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `user-${userId}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });


// --- APIs ---

// User Registration
app.post('/api/register', async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Password ko hash karein
        const [result] = await db.execute(
            'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
            [fullName, email, hashedPassword]
        );
        res.status(201).json({ message: 'User created successfully!', userId: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'This email is already registered.' });
        }
        res.status(500).json({ error: 'Database error.' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash); // Hashed password compare karein
        if (isMatch) {
            res.json({
                message: 'Login successful!',
                user: {
                    id: user.user_id,
                    name: user.full_name,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error.' });
    }
});

// User ka Data Fetch Karein
app.get('/api/user/:userId', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT user_id, full_name, email, phone_number, profile_photo_url, gender, institution, year_of_study FROM users WHERE user_id = ?', [req.params.userId]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// User ka Profile Update Karein
app.put('/api/user/:userId', async (req, res) => {
    const { fullName, phone, gender, institution, yearOfStudy } = req.body;
    try {
        await db.execute(
            'UPDATE users SET full_name = ?, phone_number = ?, gender = ?, institution = ?, year_of_study = ? WHERE user_id = ?',
            [fullName, phone, gender, institution, yearOfStudy, req.params.userId]
        );
        res.json({ message: 'Profile updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Profile Photo Upload Karein
app.post('/api/user/:userId/photo', upload.single('profilePhoto'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    try {
        const photoUrl = `/uploads/${req.file.filename}`;
        await db.execute('UPDATE users SET profile_photo_url = ? WHERE user_id = ?', [photoUrl, req.params.userId]);
        res.json({ message: 'Photo uploaded successfully!', photoUrl });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));