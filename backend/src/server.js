import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from "cookie-parser";
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

if(process.env.NODE_ENV !== 'production') {
    app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    }));
}

app.use(express.json()); // middleware for parsing json
app.use(cookieParser());


app.use('/api/notes', notesRoutes);
app.use('/api/users', usersRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log('server started on port:', PORT);    
    });
});
