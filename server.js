// server.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import mysql from 'mysql2/promise'; // MySQL ko import karein

const app = express();
app.use(express.json());
app.use(cors());

// --- MySQL Database Connection ---
const db = await mysql.createConnection({
  host: 'localhost', // Ya aapka database host
  user: 'root',      // Aapka database username
  password: '123456', // Aapka database password
  database: 'mindcare_db' // Aapka database ka naam
});

console.log("Successfully connected to the database.");

// Apni Gemini API key yahan daalein
const genAI = new GoogleGenerativeAI("AIzaSyB57suGFyYFAjYD5eu8XjbiA6vb0Go7OPM");

// Chatbot API (Pehle jaisa hi)
app.post('/api/chat', async (req, res) => {
    // ... (aapka purana chat API code)
});

// --- Naye APIs (Login/Signup) ---

// User Registration (Signup) API
app.post('/api/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    // Simple validation
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // NOTE: Real-world app mein password ko hash karna zaroori hai
        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password; // Abhi ke liye plain text

        const [result] = await db.execute(
            'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
            [fullName, email, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully!', userId: result.insertId });
    } catch (error) {
        console.error(error);
        // Handle duplicate email error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'This email is already registered.' });
        }
        res.status(500).json({ error: 'Database error. Please try again.' });
    }
});


// User Login API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const user = rows[0];

        // Password check (real app mein bcrypt.compare use karein)
        if (password === user.password_hash) {
             res.json({ message: 'Login successful!', user: { id: user.user_id, name: user.full_name } });
        } else {
             res.status(401).json({ error: 'Invalid credentials.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. Please try again.' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));