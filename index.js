// Change time & date to current time & date

let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let currentDateTime = document.querySelector("#date-time");
currentDateTime.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

let footerDateTime = document.querySelector("#footer-date-time");
footerDateTime.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2 upcoming-days">
      <span class="day-name">${day}</span>
      <br />
      <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
      alt="weather prediction"/>
      <br />
      15°C | 59°F
      </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "a69o8a56c4a8df604d67aba8tf3dc572";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=${units}`;

  console.log(url);

  axios.get(url).then(displayForecast);
}

// Results of city and temperature to be accurate

function showWeather(response) {
  document.querySelector("#main-city").innerHTML = response.data.city;

  let weatherDescription = response.data.condition.description;
  let temperature = response.data.temperature.current;
  let temperatureCelsius = Math.round(response.data.temperature.current);
  let temperatureFahrenheit = Math.round((temperature * 9) / 5 + 32);
  let pressure = Math.round(response.data.temperature.pressure);
  let windDegree = Math.round(response.data.wind.degree);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let humidity = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#weather-icon");

  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.description);

  document.querySelector(
    "#weather-description"
  ).innerHTML = `${weatherDescription}`;
  document.querySelector("#temp-celsius").innerHTML = `${temperatureCelsius}°C`;
  document.querySelector(
    "#temp-fahrenheit"
  ).innerHTML = `${temperatureFahrenheit}°F`;
  document.querySelector("#pressure").innerHTML = `${pressure}`;
  document.querySelector("#wind-degree").innerHTML = `${windDegree}°`;
  document.querySelector("#feels-like").innerHTML = `${feelsLike}°C`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${windSpeed} km / hour`;
}

function searchCity(city) {
  let apiKey = "a69o8a56c4a8df604d67aba8tf3dc572";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Paris");

// Current location result

function currentLocationWeather(response) {
  let showCelcius = document.querySelector("#temp-celsius");
  let showFahrenheit = document.querySelector("#temp-fahrenheit");
  let temperature = response.data.temperature.current;
  let temperatureCelsius = Math.round(response.data.temperature.current);
  let temperatureFahrenheit = Math.round((temperature * 9) / 5 + 32);
  let currentCity = document.querySelector("#main-city");
  let pressure = Math.round(response.data.temperature.pressure);
  let windDegree = Math.round(response.data.wind.degree);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let humidity = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.condition.description;
  let weatherIcon = document.querySelector("#weather-icon");

  currentCity.innerHTML = response.data.city;
  showCelcius.innerHTML = `${temperatureCelsius}°C`;
  showFahrenheit.innerHTML = `${temperatureFahrenheit}°F`;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.description);

  document.querySelector(
    "#weather-description"
  ).innerHTML = `${weatherDescription}`;
  document.querySelector("#pressure").innerHTML = `${pressure}`;
  document.querySelector("#wind-degree").innerHTML = `${windDegree}°`;
  document.querySelector("#feels-like").innerHTML = `${feelsLike}°C`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${windSpeed} km / hour`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a69o8a56c4a8df604d67aba8tf3dc572";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentLocationWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
