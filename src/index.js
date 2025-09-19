import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './utils/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

//routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

//health
app.get('/', (req, res) => res.send("API is running"));

//error handler
app.use(notFound);
app.use(errorHandler);
//start server after db connection
const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB Connected");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
    } catch (err) {
        console.error("Failed to connect DB:", err.message);
    }
};

startServer();