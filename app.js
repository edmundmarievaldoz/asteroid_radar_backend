// imports ------------------------------
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config'
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.NASA_API_KEY;

// middleware -----------------------------
app.use(express.json());
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoints ------------------------------

app.get('/api', (req, res) => {res.send('Asteroid Radar Backend API is running')});

 app.get('/api/asteroids', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${apiKey}`);
        res.json(response.data);
    }catch (error) {
        console.error('Error fetching asteroid data:', error);
        res.status(500).json({ error: 'Failed to fetch asteroid data' }); 
    }
});

app.get('/api/apod', async (req, res) => {
    try{
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        res.json(response.data);
    }catch(error){
        console.error('Error fetching APOD data:', error);
        res.status(500).json({ error: 'Failed to fetch APOD data' });
    }
});

app.get('/api/geomagnetic', async (req, res) => {
    try{
        const response = await axios.get(`https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=${apiKey}`);
        res.json(response.data);
    }catch(error){
        console.error('Error fetching geomagnetic storm data:', error);
        res.status(500).json({ error: 'Failed to fetch geomagnetic storm data' });
    }
});

// Server starts ------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});