import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config'
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {res.send('Asteroid Radar Backend API is running')});

 app.get('/api/asteroids', async (req, res) => {
    try {
        const apiKey = process.env.NASA_API_KEY;
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${apiKey}`);
        res.json(response.data);
    }catch (error) {
        console.error('Error fetching asteroid data:', error);
        res.status(500).json({ error: 'Failed to fetch asteroid data' }); 
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});