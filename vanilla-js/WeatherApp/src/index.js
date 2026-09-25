import '../styles.css'; 
import { updateCurrentWeather, updateCityBackground, updateWeatherIcon } from './cityCard';
import { updateHourlyForecast } from './hourlyWeatherInfo';
import { addHistory } from './sideBar';

// variables for DOM Element 
const searchInput = document.querySelector('#search');

 

// API Key
const apiKey = 'Your key'; 


const fetchWeatherData = async (location) => {
    // Generate a URL. encodeURIComponent is important if there are spaces in the city name.
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json&include=current,hours`;

    try {
        const response = await fetch(url); // get data from url
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`); 
        
        const data = await response.json();
        
        updateCurrentWeather(data); 
        updateWeatherIcon(data.currentConditions.icon);
        updateCityBackground(data.address);
        updateHourlyForecast(data); 
        addHistory(data);

    } catch (error) {
        console.error('Error:', error);
        alert("City not found or API error"); 
    }
};


searchInput.addEventListener('keydown', (e) => {
   
    if (e.key === 'Enter') {
        e.preventDefault(); 
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(city);
            searchInput.value = ''; 
        }
    }
});

