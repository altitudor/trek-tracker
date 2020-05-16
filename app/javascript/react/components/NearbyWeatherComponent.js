import React, { useState, useEffect } from "react";

const NearbyWeatherComponent = (props) => {
  let [ weather, setWeather ] = useState(null);

  useEffect(() => {
    if (!props.coords.latitude || !props.coords.longitude) {
      return;
    }
    const lat = props.coords.latitude;
    const lon = props.coords.longitude;
    fetch(`/api/v1/nearby_weather_data?lat=${lat}&lon=${lon}`)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
          setWeather(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [props.coords]);

  let weatherData = weather ? (
    <div>
      <h5>{weather.name}, {weather.sys.country}</h5>
      <div>
        <h4>{((weather.main.temp - 273.15) * 9/5 + 32).toFixed(0)}F <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/></h4>
      </div>
      <ul>
        <li>Weather:{weather.weather[0].main}</li>
        <li>Description: {weather.weather[0].description}</li>
        <li>Temperature: {((weather.main.temp - 273.15) * 9/5 + 32).toFixed(0)}F</li>
        <li>Feels like: {((weather.main.feels_like - 273.15) * 9/5 + 32).toFixed(0)}F</li>
        <li>Sunrise: {(new Date(weather.sys.sunrise*1000)).toString()}</li>
        <li>Sunset: {(new Date(weather.sys.sunset*1000)).toString()}</li>
      </ul>
    </div>) : <></>

  return (
    <div>
      <div>
        <h3 className="small-8 large-10">Nearby Weather:</h3>
      </div>
      <div>
        {weatherData}
      </div>
    </div>
  )
}

export default NearbyWeatherComponent;
