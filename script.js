async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "8ffbc18781094f1fc25b7493481c5b24"; // Replace with your OpenWeather API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const lat = data.coord.lat;
const lon = data.coord.lon;
const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

const airQualityResponse = await fetch(airQualityUrl);
const airQualityData = await airQualityResponse.json();
const airQualityIndex = airQualityData.list[0].main.aqi;

const airQualityLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
const airQualityText = airQualityLevels[airQualityIndex - 1];


        if (data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = "City not found!";
            return;
        }

        document.getElementById("weatherResult").innerHTML = `
            <p><strong>${data.name}, ${data.sys.country}</strong></p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
            <p>Air Quality: ${airQualityText}</p>
            <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Precipitation: ${data.rain ? data.rain["1h"] + " mm" : "No rain"} </p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
