let currentDate = new Date();
function formatDate(currentDate) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];

  return `${day} at ${hours}:${minutes}`;
}

let h1 = document.querySelector("#time");
h1.innerHTML = formatDate(currentDate);
//

function updateSearch(event) {
  event.preventDefault();
  let weatherUpdate = document.querySelector("#city");

  let h2 = document.querySelector("#main-city");
  h2.innerHTML = `${weatherUpdate.value}`;
  getWeatherApi(weatherUpdate.value);
}

let searchCity = document.querySelector("#find-weather");
searchCity.addEventListener("submit", updateSearch);

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#current-high");
  h1.innerHTML = `${temp}°`;
}

function getWeatherApi(city) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(
      `${apiUrl}${city}&appid=0c9ee1c46913511e8bf8aca53ad61bfd&units=imperial`
    )
    .then(showWeather);
}

//Bonus Week 5
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiCode = "https://api.openweathermap.org/data/2.5/weather";
  let apiElement = `${apiCode}?lat=${lat}&lon=${long}&units=imperial`;
  axios
    .get(`${apiElement}&appid=0c9ee1c46913511e8bf8aca53ad61bfd`)
    .then(showWeather);
}

function showWeather(response) {
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  let h2 = document.querySelector("#main-city");
  let h1 = document.querySelector("#current-high");
  let h3 = document.querySelector("#current-low");
  let windSpeed = document.querySelector("#wind");
  h2.innerHTML = `${city}`;
  h1.innerHTML = `${tempMax}°`;
  h3.innerHTML = `${tempMin}°`;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeed.innerHTML = `${wind}mph`;
}

function getLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}
let showLocation = document.querySelector("#current-location");
showLocation.addEventListener("click", getLocation);
