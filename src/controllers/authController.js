import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { JWT_SECRET = 'changeme', JWT_EXPIRY = '1h' } = process.env;

//post /api /auth/register

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body || {};
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "usename ,email and password are required"
            });
        }
        // check existing user 
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({
                message: "Email already registred"
            });
        }
        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: hashed
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: user.toJSON()
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' })
    }
};

//post/api/auth/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }

        //create token payload 
        const payload = {
            id: user._id,
            email: user.email
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
        return res.json({ message: 'Login Successful', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Server Error'
        });

    }
};