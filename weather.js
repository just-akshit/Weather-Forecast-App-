const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIkey = "";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`,
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("fadeIn");
        weatherDetails.classList.remove("fadeIn");
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const desc = document.querySelector(".weather-box .desc");
      const humidity = document.querySelector(
        ".weather-details .humidity span",
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "_assets/_icons/sunny.png";
          break;
        case "Clouds":
          image.src = "_assets/_icons/cloudy.png";
          break;
        case "Rain":
          image.src = "_assets/_icons/rain.png";
          break;
        case "Drizzle":
          image.src = "_assets/_icons/cloudy_rainy.png";
          break;
        case "Thunderstorm":
          image.src = "_assets/_icons/thunder.png";
          break;
        case "Snow":
          image.src = "_assets/_icons/cloudy.png";
          break;
        case "Mist":
          image.src = "_assets/_icons/nightCloudy.png"
        case "Smoke":
        case "Haze":
          image.src = "_assets/_icons/night_rain.png";
          break;
        case "Dust":
        case "Sand":
          image.src = "_assets/_icons/sunny1.png";
          break;
        case "Fog":
          image.src = "_assets/_icons/cloudy.png";
          break;
        case "Ash":
        case "Squall":
        case "Tornado":
          image.src = "_assets/_icons/storm.png";
          break;

        default:
          image.src = " ";
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;

      desc.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});

document.querySelector(".search-box input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    search.click();
  }
});
