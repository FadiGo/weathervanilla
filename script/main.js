let currentWeather = document.getElementById("current-weather");
let cityInput = document.getElementById("city-input");
let city = document.getElementById("city");

// const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&APPID=0170d2dcc35f88f82226761ce0fe0d6a';
let API_URL = "https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&APPID=0170d2dcc35f88f82226761ce0fe0d6a";




getWeather();


function getWeather() {
    fetch(API_URL).then(function(response) {
        response.text().then(function(weather) {
            currentWeather.innerHTML = weather;
            console.log(weather);
        });
    });
}

function setCity() {
    city.innerHTML = cityInput.value;
    API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.innerHTML + "&APPID=0170d2dcc35f88f82226761ce0fe0d6a";
}