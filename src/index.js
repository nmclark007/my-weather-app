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

  return `<div>Updated on:</div> ${day} at ${hours}:${minutes}`;
}

let h1 = document.querySelector("#time");
h1.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
<div class="weekly-forecast" id="forecast">
               <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
              <img id="forecasticon" src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" />
             <div class="high">${Math.round(
               forecastDay.temp.max
             )}° <span class="low">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function updateSearch(event) {
  event.preventDefault();
  let weatherUpdate = document.querySelector("#city");

  let h2 = document.querySelector("#main-city");
  h2.innerHTML = `${weatherUpdate.value}`;
  getWeatherApi(weatherUpdate.value);
}

let searchCity = document.querySelector("#find-weather");
searchCity.addEventListener("submit", updateSearch);

function getWeatherApi(city) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(
      `${apiUrl}${city}&appid=0c9ee1c46913511e8bf8aca53ad61bfd&units=imperial`
    )
    .then(showWeather);
}
//Current location
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiCode = "https://api.openweathermap.org/data/2.5/weather";
  let apiElement = `${apiCode}?lat=${lat}&lon=${long}&units=imperial`;
  axios
    .get(`${apiElement}&appid=0c9ee1c46913511e8bf8aca53ad61bfd`)
    .then(showWeather);
}

function getForecast(coordinates) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=0c9ee1c46913511e8bf8aca53ad61bfd&units=imperial`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  console.log(response.data);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let h2 = document.querySelector("#main-city");
  let h1 = document.querySelector("#current-high");
  let h3 = document.querySelector("#current-low");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind");
  let mainIcon = document.querySelector("#mainicon");

  fahrenheitMax = response.data.main.temp_max;
  fahrenheitMin = response.data.main.temp_min;

  h2.innerHTML = `${city}`;
  h1.innerHTML = `${tempMax}°`;
  h3.innerHTML = `${tempMin}°`;
  humidityElement.innerHTML = `${humidity} %`;
  windSpeed.innerHTML = `${wind} mph`;
  description.innerHTML = `${weatherDescription}`;
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function getLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}

let showLocation = document.querySelector("#current-location");
showLocation.addEventListener("click", getLocation);

getWeatherApi("New York");
