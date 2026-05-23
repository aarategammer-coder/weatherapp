const apiKey = "ce85aa5b8da810424a5d87693443222b"; // Your OpenWeather API key
function fetchWeather(city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        apiKey
    )
    .then(function(response) {
        if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
        }
        return response.json();
    })
    .then(function(data) {
        displayWeather(data);
    });
}
function displayWeather(data) {
  console.log(data)
    const name = data.name;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const feels_like = data.main.feels_like;
    const temp_min = data.main.temp_min;
    const temp_max = data.main.temp_max;
    const humidity = data.main.humidity;
    const speed = data.wind.speed;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";
    document.querySelector(".min-temp").innerText = "Min Temp: " + temp_min + "°C";
    document.querySelector(".max-temp").innerText = "Max Temp: " + temp_max + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

    let backgroundImageUrl;
    if (temp < 0) {
        backgroundImageUrl = "https://plus.unsplash.com/premium_photo-1671462679356-15ed7a622434?w=500&auto=format&fit=crop&q=60";
    } else if (temp >= 0 && temp < 15) {
        backgroundImageUrl = "https://images.unsplash.com/photo-1579785626308-1ba70c1dd789?w=500&auto=format&fit=crop&q=60";
    } else if (temp >= 15 && temp < 28) {
        backgroundImageUrl = "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=500&auto=format&fit=crop&q=60";
    } else {
        backgroundImageUrl = "https://images.unsplash.com/photo-1577985759186-0854dfd3f218?w=500&auto=format&fit=crop&q=60";
    }

    document.body.style.backgroundImage = 'url(' + backgroundImageUrl + ')';
    document.querySelector(".weather").classList.remove("loading");
}

function search() {
    const city = document.querySelector(".search-bar").value;
    fetchWeather(city);
}
document.querySelector(".search button").addEventListener("click", function () {
    search();
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        search();
    }
});
fetchWeather("delhi");
