import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5001;
const CONNECTION_URL = process.env.CONNECTION_URL;

if (!CONNECTION_URL) {
    console.error('❌ CONNECTION_URL is not defined. Check your .env file or Render environment variables.');
    process.exit(1);
}

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server Running on Port: http://localhost:${PORT}`));
    })
    .catch((error) => {
        console.error(`❌ Database connection error: ${error.message}`);
        process.exit(1);
    });
