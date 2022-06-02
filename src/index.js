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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
<div class="weekly-forecast" id="forecast">
               <div class="forecast-day">${day}</div>
              <img id="forecasticon" src="" />
             <div class="high">75° <span class="low">34°</span></div>
            </div>
          </div>`;
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

//function displayWeather(response) {
//let temp = Math.round(response.data.main.temp);
//let h1 = document.querySelector("#current-high");
//h1.innerHTML = `${temp}°`;
//}

function getWeatherApi(city) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(
      `${apiUrl}${city}&appid=0c9ee1c46913511e8bf8aca53ad61bfd&units=imperial`
    )
    .then(showWeather);
}

//Bonus Week 5
//function showPosition(position) {
//let lat = position.coords.latitude;
//let long = position.coords.longitude;
// let apiCode = "https://api.openweathermap.org/data/2.5/weather";
// let apiElement = `${apiCode}?lat=${lat}&lon=${long}&units=imperial`;
// axios
//  .get(`${apiElement}&appid=0c9ee1c46913511e8bf8aca53ad61bfd`)
//   .then(showWeather);
//}

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

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTempMax = Math.round((5 / 9) * (fahrenheitMax - 32));
  let celsiusTempMin = Math.round((5 / 9) * (fahrenheitMin - 32));
  let tempMax = document.querySelector("#current-high");
  let tempMin = document.querySelector("#current-low");
  celsuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempMax.innerHTML = tempMax.innerHTML = `${celsiusTempMax}°`;
  tempMin.innerHTML = tempMin.innerHTML = `${celsiusTempMin}°`;
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempMax = document.querySelector("#current-high");
  let tempMin = document.querySelector("#current-low");
  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempMax.innerHTML = `${Math.round(fahrenheitMax)}°`;
  tempMin.innerHTML = `${Math.round(fahrenheitMin)}°`;
}

function getLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}

let showLocation = document.querySelector("#current-location");
showLocation.addEventListener("click", getLocation);

let fahrenheitMax = null;
let fahrenheitMin = null;

let celsuisLink = document.querySelector("#celsiusJ");
celsuisLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheitJ");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

getWeatherApi("New York");
