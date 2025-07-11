
const apiid = "d7e67ea9041273943a179b896076c642";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let cityEnter = document.querySelector('.Cname');
cityEnter.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        CheckWeather();
    }
});

async function CheckWeather() {
    let cityName = document.querySelector(".Cname").value.trim();
    if (!cityName) return;
    const response = await fetch(apiUrl + `&appid=${apiid}&q=${cityName}`);
    const errorBox = document.getElementById('errorBox');
    const weatherBox = document.getElementById('weatherBox');
    if (response.status == 404) {
        errorBox.style.display = "block";
        weatherBox.classList.remove('active');
        return;
    }
    var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°C`;
    document.querySelector(".hlevel").innerHTML = data.main.humidity + `%`;
    document.querySelector(".wspeed").innerHTML = data.wind.speed + ` Km/h`;
    weatherBox.classList.add('active');
    const weatherimg = document.querySelector(".weathericon");
    switch (data.weather[0].main) {
        case "Clouds":
            weatherimg.src = "weather-app-img/images/clouds.png";
            break;
        case "Rain":
            weatherimg.src = "weather-app-img/images/rain.png";
            break;
        case "Clear":
            weatherimg.src = "weather-app-img/images/clear.png";
            break;
        case "Drizzle":
            weatherimg.src = "weather-app-img/images/drizzle.png";
            break;
        case "Mist":
            weatherimg.src = "weather-app-img/images/mist.png";
            break;
        case "Snow":
            weatherimg.src = "weather-app-img/images/snow.png";
            break;
        default:
            weatherimg.src = "weather-app-img/images/rain.png";
    }
    errorBox.style.display = "none";
}