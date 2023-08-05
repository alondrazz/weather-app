var city=document.getElementById("city");
var city= ""

var APIKey = "a5971b329b98ea150596136c18b4cd22";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}"

fetch(queryURL)

var searchBtn = document.querySelector("#search");
function searchWeather() {
    console.log("You searched up a city!")
    return "Searched city will go here!"
}

searchBtn.addEventListener("click",searchWeather);

function searchWeather() {
    var searchCity = citySearched();
    var cityText = document.querySelector("#city");

    if (inputCity) {
        var weather
    }

}