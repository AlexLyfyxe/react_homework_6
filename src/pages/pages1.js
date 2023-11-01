import React from 'react';
import { useState } from 'react';
// import { useEffect } from 'react';
import axios from 'axios';


export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const APIKey = '25fa81762c3215a26b2b8277f4a2c9ad';

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  // useEffect(() => {
  //   getWeather()
  // }, [city, APIKey]);

  let kelvin = '';
  let temperature = '';

  if (weatherData) {
    kelvin = weatherData.main.temp;
    temperature = (kelvin - 273.15).toFixed(2);
  }

  return (
    <>
      <h1 style={{fontSize: '50px'}}>Weather</h1>
      <input  style={{
        padding: '10px', fontSize: '25px', border: '2px solid #ccc', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px'
        }}
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button style={{
        padding: '10px', fontSize: '25px', border: '2px solid #00FF7F', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', background: '#00FF7F'
        }}
        onClick={getWeather}>
        Search
      </button>
      {weatherData && (
        <div style={{
          background: '#f0f0f0', padding: '20px', borderRadius: '8px',
          margin: '20px', width: '60%', margin: '30px auto'
        }}>
          <h2>{weatherData.name} / {weatherData.sys.country}</h2>
          <p>Temperature: {temperature}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>

          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Visibility: {weatherData.visibility} meters</p>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <p>Weather: </p> {weatherData.weather[0].icon && (
              <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              />
            )}
          </div>
          
        </div>
      )}
    </>
  )
}
