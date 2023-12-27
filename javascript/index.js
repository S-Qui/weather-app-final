//Forecast functions  with api 
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `                
          <div class="weather-forecast-cards col">
            <div class="card">
                <div class="card-body">
                    <h5 class="weather-forecast-date card-title">${formatDay(day.time)}</h5>
                    <span class="weather-forecast-icon"><img src="${day.condition.icon_url}" class="weather-app-icon" /></span>
                    <div class="weather-forecast-temperature">
                        <span class="weather-forecast-temperature-max">
                            <strong>${Math.round(day.temperature.maximum)}°</strong>
                        </span>
                        <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
                    </div>
                </div>
            </div>
          </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

//Time function
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrlForecast).then(displayForecast);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

function currentTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateELement.innerHTML = formatDate(currentDate);

  let cityTemp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = cityTemp;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

let apiKey = "e84f68cofe23a7b324t37b5eb50612a2";

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Mombasa");