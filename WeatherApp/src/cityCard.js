const giphyKey = 'Your key';

const weatherIconImg = document.querySelector('.weather_statusImg');
const cityCard = document.querySelector('#city');
// function that update UI with current info for searched city
export function updateCurrentWeather(data){
        // Variables for City's card
        const cityName = document.querySelector('.city_name');
        const dayCity = document.querySelector('.day_weekend');
        const timeCity = document.querySelector('.time');
        const temperatureCity = document.querySelector('.temperature_city');
        const weatherCity = document.querySelector('.weather_info');
        const feelsLike = document.querySelector('.feelsLike');
        const humidity = document.querySelector('.humidity');
        const wind = document.querySelector('.wind');
        const UVIndex = document.querySelector('.uvIndex');
        const toFahrenheit = (c) => (c * 1.8 + 32).toFixed(1);
     
        const current = data.currentConditions;
        cityName.innerText = data.resolvedAddress; 
        temperatureCity.innerText = `${current.temp} °C`; 
        weatherCity.innerText = current.conditions;
        feelsLike.innerText = toFahrenheit(`${current.temp}`);
        humidity.innerText = `${current.humidity} %`;
        wind.innerText = `${current.windspeed} m/s SW`;
        UVIndex.innerText = current.uvindex;

        // Date and time
        // The API sends time in "HH:MM:SS" format, so seconds need to be truncated.
        timeCity.innerText = current.datetime.substring(0, 5);

        // The API sends datetimeEpoch (seconds), JS works with milliseconds (* 1000)
        const dateObj = new Date(current.datetimeEpoch * 1000);
        
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        dayCity.innerText = `${dayName},`;
}
// A function that updates the icon on the city's card in accordance with the found city
export function updateWeatherIcon(iconName) {
    const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${iconName}.svg`;
    weatherIconImg.src = iconUrl;
    weatherIconImg.alt = iconName;
}
// async function that update background img of city's card in accordance with the found city
export async function updateCityBackground(city) {
    
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${city}+city&limit=1&rating=g`;

    try {
        const res = await fetch(url);
        const json = await res.json();

        if (json.data.length > 0) {
            
            const gifUrl = json.data[0].images.downsized_large.url;
            cityCard.style.backgroundImage = `url('${gifUrl}')`;
        } else {
        
            cityCard.style.backgroundImage = "none"; 
            cityCard.style.backgroundColor = "#333";
        }
    } catch (e) {
        console.error("Error Giphy:", e);
    }
}