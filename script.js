var city;
var APIKey = "cad5a4f991bbf0e71762463e11e8974b";
var cityInput = document.getElementById("city");
var searchBtn = document.querySelector("#search");
var forecastContainer = document.getElementById("forecast");
var historyContainer = document.getElementById("search-history");
var historyButton = document.querySelector("#history-button");

// Function to generate weather icon
function generateWeatherIcon(iconCode) {
    var img = document.createElement("img");
    img.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    return img;
}

// Function to format date
function formatDate(date) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Function to search weather
function searchWeather() {
    city = cityInput.value;
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey + '&units=imperial';

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecastContainer.innerHTML = ""; // Clear previous forecast data

            var forecastList = data.list; // Fetch forecastList here

            var tempImgBaseUrl = 'https://openweathermap.org/img/w/';
            var groupedForecasts = {};

            for (var i = 0; i < forecastList.length; i++) {
                var forecast = forecastList[i];
                var forecastDate = new Date(forecast.dt * 1000);
                var forecastDateFormatted = formatDate(forecastDate);

                if (!groupedForecasts[forecastDateFormatted]) {
                    groupedForecasts[forecastDateFormatted] = {
                        tempSum: 0,
                        windSum: 0,
                        humiditySum: 0,
                        count: 0,
                        iconCode: forecast.weather[0].icon
                    };
                }

                groupedForecasts[forecastDateFormatted].tempSum += forecast.main.temp;
                groupedForecasts[forecastDateFormatted].windSum += forecast.wind.speed;
                groupedForecasts[forecastDateFormatted].humiditySum += forecast.main.humidity;
                groupedForecasts[forecastDateFormatted].count++;
            }

            for (var date in groupedForecasts) {
                var forecastInfo = document.createElement("div");
                forecastInfo.classList.add("forecast-item");

                var averageTemp = groupedForecasts[date].tempSum / groupedForecasts[date].count;
                var averageWindSpeed = groupedForecasts[date].windSum / groupedForecasts[date].count;
                var averageHumidity = groupedForecasts[date].humiditySum / groupedForecasts[date].count;
                var iconCode = groupedForecasts[date].iconCode;

                var iconImg = generateWeatherIcon(iconCode);
                forecastInfo.appendChild(iconImg);

                var forecastDetails = document.createElement("p");
                forecastDetails.innerHTML = `${date}:<br>Average Temperature: ${averageTemp.toFixed(2)}°F<br>Average Wind Speed: ${averageWindSpeed.toFixed(2)} mph<br>Average Humidity: ${averageHumidity.toFixed(2)}%`;
                forecastInfo.appendChild(forecastDetails);

                forecastContainer.appendChild(forecastInfo);
            }

            console.log("Current weather Data:", data);
        })
        .catch(function (error) {
            console.log("Error fetching data:", error);
        });
}

// Function to update search history
function updateSearchHistory(city) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    }

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to display search history
function displaySearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    historyContainer.innerHTML = "";

    for (var i = 0; i < searchHistory.length; i++) {
        var historyItem = document.createElement("div");
        historyItem.textContent = searchHistory[i];
        historyItem.classList.add("history-item");
        historyContainer.appendChild(historyItem);
    }
    attachHistoryItemClickListeners();
}

// Function to attach click listeners to history items
function attachHistoryItemClickListeners() {
    var historyItems = document.querySelectorAll(".history-item");
    historyItems.forEach(function(item) {
        item.addEventListener("click", function() {
            var cityName = this.textContent;
            cityInput.value = cityName; // Set the input value to the clicked city
            searchWeather();
        });
    });
}

// Attach click event listener to search button
searchBtn.addEventListener("click", function() {
    searchWeather();
    updateSearchHistory(city);
    attachHistoryItemClickListeners(); // Attach listeners after the history is displayed
});

// Attach click event listener to history button
var historyButton = document.querySelector("#history-button");
historyButton.addEventListener("click", function() {
    displaySearchHistory();
});

// Display initial search history and attach listeners when the page loads
attachHistoryItemClickListeners();
