import {useState} from 'react'
import './index.css'
import {fetchWeatherApi} from 'openmeteo'

const Weather = () => {

    const [lat,setLat] = useState(0)
    const [long,setLong] = useState(0)
    const [temp,setTemp] = useState(0)
    const url = "https://api.open-meteo.com/v1/forecast"

    const params = {
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        hourly: ['temperature_2m'],
        forecast_days: 1
    };

    const fetchWeather = async () => {

        const responses = await fetchWeatherApi(url, params) 
        const response = responses[0]
        const temperatureArray = response.hourly().variables(0).valuesArray();
        console.log("Hourly temperature:", temperatureArray);
        setTemp(temperatureArray[0])        
    }
    
    
    return (
        <>
            <input type="text" placeholder="latitude" onChange={(e) => setLat(e.target.value)}/>
            <br/>
            <input type="text" placeholder="longitude" onChange={(e) => setLong(e.target.value)}/>
            <br/>
            <button onClick={fetchWeather}>Fetch</button>
            <br/><br/>
            <div>
                {temp}
            </div>
           
        </>
    )
}

export default Weather;