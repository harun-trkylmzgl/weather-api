const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors'); 


const app = express();
const PORT = 3000;

app.use(cors());  // CORS izinleri eklendi

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'Şehir adı girilmedi. Örn: ?city=Istanbul' });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    const response = await axios.get(url);
    const data = response.data;

    const result = {
      şehir: data.name,
      sıcaklık: data.main.temp + " °C",
      açıklama: data.weather[0].description,
      rüzgar: data.wind.speed + " m/s",
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Hava durumu alınamadı.', detay: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});