//get key from openweathermap.org
let weather = {
  apiKey: "b2cb4aa928c8e5cbec69a6519f782722",

  //paste to check JSON: https://api.openweathermap.org/data/2.5/weather?q=Denver&units=metric&appid=b2cb4aa928c8e5cbec69a6519f782722
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
      const {coord} = data;
      this.fetchForecast(coord.lat, coord.lon)
  },

  //https://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=b2cb4aa928c8e5cbec69a6519f782722&cnt=5
  fetchForecast: function (lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const dailyForecasts = data.daily.slice(1, 6); // Exclude current day and take next 5 days
        this.displayForecast(dailyForecasts);
      })
      .catch((error) => {
        console.log("Error fetching forecast:", error);
      });
  },



  displayForecast: function (dailyForecasts) {
    const forecastContainer = document.querySelector(".forecast-container");
    forecastContainer.innerHTML = ""; // Clear previous content

    dailyForecasts.forEach((forecast, index) => {
      if (index > 0) { // Skip today's forecast (index 0)
        const { dt, weather, temp } = forecast;
        const date = new Date(dt * 1000); // Convert Unix timestamp to Date object

        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const icon = weather[0].icon;
        const maxTemp = temp.max;
        const minTemp = temp.min;

        // Create HTML for each forecast card
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastCard.innerHTML = `
          <div class="forecast-day">${day}</div>
          <img class="forecast-icon" src="https://openweathermap.org/img/wn/${icon}.png" />
          <div class="forecast-temp">Max: ${maxTemp}&deg;C / Min: ${minTemp}&deg;C</div>
        `;

        forecastContainer.appendChild(forecastCard);
      }
    });
  },

      

  displayWeather: function (data) {
    const { name, timezone } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure,feels_like } = data.main;
    const { speed } = data.wind;
    const sunriseTimestamp = data.sys.sunrise; // Sunrise timestamp (Unix, UTC)
    const sunsetTimestamp = data.sys.sunset; 

    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    
    // Format time
    const sunriseTime = sunriseDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const sunsetTime = sunsetDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

    document.querySelector(".city").innerHTML = `${name}`;
    document.querySelector(".temp").innerHTML = `${temp}&degC`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".description").textContent = `${description}`;
    document.querySelector(".humidity").textContent = `${humidity}%`;
    document.querySelector(".wind").innerHTML = `${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(".pressure").innerHTML = `${pressure} hPa`;
    document.querySelector('.feels').innerHTML = `${feels_like}&degC`;


    document.querySelector('.sunrise').innerHTML =`${sunriseTime}`
    document.querySelector('.sunset').innerHTML =`${sunsetTime}`
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
    this.fetchForecast(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search-btn").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    weather.search();
  }
});

const today = new Date();

const options = {
  year:'numeric',
  month:'long',
  day:'numeric'
}

const formattedDate = today.toLocaleDateString('en-US', options);

document.querySelector('.date').innerHTML = `${formattedDate}`


weather.fetchWeather("Silang");
weather.displayForecast([
  // Sample forecast data for demonstration
  { dt: 1634253600, weather: [{ icon: "01d" }], temp: { max: 30, min: 20 } },
  { dt: 1634340000, weather: [{ icon: "02d" }], temp: { max: 28, min: 19 } },
  { dt: 1634426400, weather: [{ icon: "03d" }], temp: { max: 29, min: 21 } },
  { dt: 1634512800, weather: [{ icon: "04d" }], temp: { max: 27, min: 18 } },
  { dt: 1634599200, weather: [{ icon: "09d" }], temp: { max: 25, min: 17 } },
]);
