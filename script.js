const apiKey = 'ac9bb368ea1283f12199cba2287fc3cc';
async function getWeatherByCity() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        displayError('Please enter a city name.');
        return;
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        displayError('Geolocation is not supported by your browser.');
        return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            if (!response.ok) throw new Error('Unable to fetch weather for your location');
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            displayError(error.message);
        }
    }, () => {
        displayError('Unable to retrieve your location.');
    });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const error = document.getElementById('error');
    error.textContent = '';
    weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function displayError(message) {
    const error = document.getElementById('error');
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = '';
    error.textContent = message;
}
