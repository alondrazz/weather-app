var city=document.getElementById("city");
var city= ""
var city;

var APIKey = "cad5a4f991bbf0e71762463e11e8974b";
var cityInput = document.getElementById("city");
var searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click",searchWeather);

function searchWeather() {
    var city = cityInput.value;
    console.log(city)
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a5971b329b98ea150596136c18b4cd22';

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        console.log(data.weather)
        console.log(data.main.temp)
        var tempResponse = document.getElementById("temp");
        tempResponse.innerHTML=data.main.temp
    })
    .catch(function (error) {
        console.log("Error fetching data:", error);
    })
}