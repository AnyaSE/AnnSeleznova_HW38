const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/weather', async (request, response) => {
    const city = request.body.city;
    const weather = await getWeather(city);
    response.status(200).json(weather);
})

async function getWeather(city){
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`);
    const data = await res.json();

    const {temp} = data.main;
    const {speed} = data.wind;
    return { temperature: temp, windSpeed: speed };
}

app.listen(port, () => console.log(`Server running on port ${port}`));


