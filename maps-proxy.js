const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.use(cors());

app.get('/maps', async (req, res) => {
    try {
        const { origin, destination, waypoints = '' } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({ error: 'Missing origin or destination' });
        }

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(waypoints)}&units=metric&departure_time=now&key=${GOOGLE_MAPS_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Proxy Error', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
