import React, { useState } from "react";
import axios from "axios";
import search from "./assets/search.png";
import clear from "./assets/clear.png";
import clouds from './assets/clouds.png';
import drizzle from './assets/drizzle.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import mist from "./assets/mist.png";
import humidityicon from "./assets/humidity.png";
import windicon from "./assets/wind.png";

const ImageMap = {
  clear,
  clouds,
  drizzle,
  rain,
  snow,
  mist,
  
  default: "./assets/clouds.png"
};

const API_KEY = import.meta.env.VITE_API_KEY; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function HomePage() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState();
  const [wind, setWind] = useState();
  const [humidity, setHumidity] = useState();
  const [weather, setWeather] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  async function checkWeather() {
    try {
      const response = await axios.get(`${BASE_URL}?q=${encodeURIComponent(input)}&appid=${API_KEY}&units=metric`);
      setCity(response.data.name);
      setTemp(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      const lowerWeather = response.data.weather[0].main.toLowerCase();
      setWeather(lowerWeather);
      setError(null); // Reset error state
    } catch (err) {
      setError('City not found or other error occurred');
      setCity("");
      setTemp("");
      setHumidity("");
      setWind("");
      setWeather("");
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      checkWeather();
    }
  }

  return (
    <div className="card">
      <div className="search">
        <input 
          onChange={(e) => setInput(e.target.value)}
          type="text"
          onKeyDown={handleKeyPress}
          placeholder="Enter City"
        />
        <button onClick={checkWeather}>
          <img src={search} alt="search" />
        </button>
      </div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="weather">
          <img src={ImageMap[weather] || ImageMap.default} alt={weather} className="weather-icon" />
          <h1 className="temp">{temp}°C</h1>
          <h2 className="city">{city}</h2>
          <div className="details">
            <div className="col">
            <img src={humidityicon} alt={weather} className="weather-icon" />
              <div>
                <p className="humidity">{humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
            <img src={windicon} alt={weather} className="weather-icon" />
              <div>
                <p className="wind">{wind} km/hr</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
