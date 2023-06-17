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

// Results of city and temperature to be accurate

function showWeather(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;

  let temperature = response.data.main.temp;
  let temperatureCelsius = Math.round(response.data.main.temp);
  let temperatureFahrenheit = Math.round((temperature * 9) / 5 + 32);
  let highTemperature = Math.round(response.data.main.temp_max);
  let lowTemperature = Math.round(response.data.main.temp_min);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);

  document.querySelector("#temp-celsius").innerHTML = `${temperatureCelsius}°C`;
  document.querySelector(
    "#temp-fahrenheit"
  ).innerHTML = `${temperatureFahrenheit}°F`;
  document.querySelector("#high-temp").innerHTML = `${highTemperature}°C`;
  document.querySelector("#low-temp").innerHTML = `${lowTemperature}°C`;
  document.querySelector("#feels-like").innerHTML = `${feelsLike}°C`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${windSpeed} km / hour`;
}

function searchCity(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let url = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;

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
  let temperature = response.data.main.temp;
  let temperatureCelsius = Math.round(response.data.main.temp);
  let temperatureFahrenheit = Math.round((temperature * 9) / 5 + 32);
  let currentCity = document.querySelector("#main-city");
  currentCity.innerHTML = response.data.name;
  showCelcius.innerHTML = `${temperatureCelsius}°C`;
  showFahrenheit.innerHTML = `${temperatureFahrenheit}°F`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentLocationWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
