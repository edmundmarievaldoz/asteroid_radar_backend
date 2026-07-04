import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config'
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {res.send('Asteroid Radar Backend API is running')});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});