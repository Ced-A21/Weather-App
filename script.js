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
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerHTML = `Weather in ${name}`;
    document.querySelector(".temp").innerHTML = `${temp}&degC`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").textContent = `${description}`;
    document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
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

weather.fetchWeather("Silang");
