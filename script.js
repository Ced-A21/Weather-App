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
