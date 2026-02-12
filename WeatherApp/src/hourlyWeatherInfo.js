const footer = document.getElementById('footer');  
//function for getting hourly weather info for searched city and display in footer
export function updateHourlyForecast(data) {
  
    footer.innerHTML = '<h2>HOURLY:</h2>';

    //  take the hours for today and tomorrow (in case it's evening now)
    const todayHours = data.days[0].hours;
    const tomorrowHours = data.days[1].hours;
    const allHours = [...todayHours, ...tomorrowHours];

    // Get the current time (epoch seconds)
    const currentEpoch = data.currentConditions.datetimeEpoch;

    // Filter: select hours whose time is >= the current time
    // (use currentEpoch - 3600 to also capture the current hour)
    const nextHours = allHours.filter(hour => hour.datetimeEpoch >= currentEpoch - 1800);

    const fiveHours = nextHours.slice(0, 6);

    // render DOM elements
    fiveHours.forEach(hour => {
      
        const div = document.createElement('div');
        div.classList.add('hourly_info');
        const timeStr = hour.datetime.substring(0, 6);
        const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${hour.icon}.svg`;
        const tempStr = `${Math.round(hour.temp)}°`;

        div.innerHTML = `
            <h4 class="hourly_time">${timeStr}</h4>
            <span class="icon_weather">
                <img src="${iconUrl}" alt="${hour.icon}" style="width: 30px; height: 30px;">
            </span>
            <h4 class="hourly_temperature">${tempStr}</h4>
        `;

        footer.appendChild(div);
    });
}
