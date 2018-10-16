let API_URL = "https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&APPID=0170d2dcc35f88f82226761ce0fe0d6a";
let API_FURL = "https://api.openweathermap.org/data/2.5/forecast?q=stockholm,se&APPID=0170d2dcc35f88f82226761ce0fe0d6a";

let currentWeather = document.getElementById("current-weather"),
    cityInput = document.getElementById("city-input"),
    city = document.getElementById("city"),
    currentDate = document.getElementById("current-date"),
    status = document.getElementById("current-status"),
    searchButton = document.getElementById("search-button"),
    toggleButton = document.getElementById("toggle-button");

let dayWeather = [
    dayWeather1 = document.getElementById("day-weather-1"),
    dayWeather2 = document.getElementById("day-weather-2"),
    dayWeather3 = document.getElementById("day-weather-3"),
    dayWeather4 = document.getElementById("day-weather-4"),
    dayWeather5 = document.getElementById("day-weather-5")
];

let dayTime = [
    dayTime1 = document.getElementById("day-time-1"),
    dayTime2 = document.getElementById("day-time-2"),
    dayTime3 = document.getElementById("day-time-3"),
    dayTime4 = document.getElementById("day-time-4"),
    dayTime5 = document.getElementById("day-time-5")
];

let forecastDate = [
    forecastDate1 = document.getElementById("forecast-date-1"),
    forecastDate2 = document.getElementById("forecast-date-2"),
    forecastDate3 = document.getElementById("forecast-date-3"),
    forecastDate4 = document.getElementById("forecast-date-4"),
    forecastDate5 = document.getElementById("forecast-date-5")
];

let forecastWeather = [
    forecastWeather1 = document.getElementById("forecast-weather-1"),
    forecastWeather2 = document.getElementById("forecast-weather-2"),
    forecastWeather3 = document.getElementById("forecast-weather-3"),
    forecastWeather4 = document.getElementById("forecast-weather-4"),
    forecastWeather5 = document.getElementById("forecast-weather-5")
];

getWeather();
getForecast();

// allow user to hit enter when searching for a city. For PC users.
cityInput.addEventListener('keypress', (key) => {
    if (key.which === 13) {
        setCity();
    }
})

function getWeather() {
    fetch(API_URL).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Oops something went wrong: Network response was not ok.');
    })
        .then(response => {
            // console.log(response);
            currentWeather.textContent = (response.main.temp - 273.15).toFixed(1) + "°";
            dayWeather1.textContent = (response.main.temp - 273.15).toFixed(1) + "°";
            status.textContent = response.weather[0].main;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getForecast() {
    fetch(API_FURL).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Oops something went wrong: Network response was not ok.');
        })
        .then(response => {
            console.log(response.list);            
            for(var i = 0; i < 5; i++) {
                dayWeather[i].textContent = (response.list[i].main.temp - 273.15).toFixed(1) + "°";
                dayTime[i].textContent = response.list[i].dt_txt.slice(11, 16);
                currentDate.textContent = response.list[0].dt_txt.slice(0,10);
                // forecastDate[i].textContent = response.list[???].dt_txt.slice(0, 10);
            }

            forecastDate[0].textContent = response.list[8].dt_txt.slice(0, 10);
            forecastDate[1].textContent = response.list[16].dt_txt.slice(0, 10);
            forecastDate[2].textContent = response.list[24].dt_txt.slice(0, 10);
            forecastDate[3].textContent = response.list[32].dt_txt.slice(0, 10);
            forecastDate[4].textContent = response.list[39].dt_txt.slice(0, 10);
            
            forecastWeather[0].textContent = (response.list[8].main.temp - 273.15).toFixed(1) + "°";
            forecastWeather[1].textContent = (response.list[16].main.temp - 273.15).toFixed(1) + "°";
            forecastWeather[2].textContent = (response.list[24].main.temp - 273.15).toFixed(1) + "°";
            forecastWeather[3].textContent = (response.list[32].main.temp - 273.15).toFixed(1) + "°";
            forecastWeather[4].textContent = (response.list[39].main.temp - 273.15).toFixed(1) + "°";
        })
        .catch(function (error) {
            console.log(error);
        });

}

function setCity() {
    city.innerHTML = cityInput.value + `<button id="toggle-button" type="submit" onclick="toggleSearch()"><i class="fa fa-edit"></i></button>`;
    cityInput.style.display = "none";
    cityInput.value = "";
    searchButton.style.display = "none";
    API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.textContent + "&APPID=0170d2dcc35f88f82226761ce0fe0d6a";
    API_FURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.textContent + "&APPID=0170d2dcc35f88f82226761ce0fe0d6a";
    getWeather();
    getForecast();
}

function toggleSearch() {
    cityInput.style.display = "block";
    searchButton.style.display = "block";
    cityInput.autofocus = true;
}