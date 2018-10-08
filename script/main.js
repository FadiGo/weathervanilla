let currentWeather = document.getElementById("current-weather"),
    cityInput = document.getElementById("city-input"),
    city = document.getElementById("city"),
    status = document.getElementById("current-status"),
    searchButton = document.getElementById("search-button"),
    toggleButton = document.getElementById("toggle-button");

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
            // console.log(response);
            currentWeather.textContent = (response.main.temp - 273.15).toFixed(1) + "°";
            status.textContent = response.weather[0].main;
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
    getWeather();
}

function toggleSearch() {
    cityInput.style.display = "block";
    searchButton.style.display = "block";
}