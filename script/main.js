let currentWeather = document.getElementById("current-weather");
let cityInput = document.getElementById("city-input");
let city = document.getElementById("city");
let status = document.getElementById("current-status");

// const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&APPID=0170d2dcc35f88f82226761ce0fe0d6a';
let API_URL = "https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&APPID=0170d2dcc35f88f82226761ce0fe0d6a";




getWeather();

function getWeather() {
    fetch(API_URL).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Oops something went wrong: Network response was not ok.');
    })
        .then(response => {
            console.log(response.weather[0].main);
            currentWeather.textContent = (response.main.temp - 273.15).toFixed(1) + "°";
            status.textContent = response.weather[0].main;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function setCity() {
    city.textContent = cityInput.value;
    API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.textContent + "&APPID=0170d2dcc35f88f82226761ce0fe0d6a";
    getWeather();
}