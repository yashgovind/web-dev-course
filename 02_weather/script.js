import api_key from './config';

console.log(api_key); // Use your API key here

const cityNameInput = document.getElementById("city-input");
const temperatureDisplay = document.getElementById("temperature");
const cityNameDisplay = document.getElementById("city-name");
const descriptionDisplay = document.getElementById("description");
const weatherInfo = document.getElementById("weather-info");
const getWeatherButton = document.getElementById("get-weather-btn");
const errorMessageDisplay = document.getElementById("error-message");
// selectors../


getWeatherButton.addEventListener("click", async () => {
  // get the form input
  const city = cityNameInput.value.trim();
  // if the city doesnt exist then exit.
  if (!city) return;
  //get the weather data

  //display the weather data
  displayWeatherData(city);
});

// function to get the weather data.
async function getWeatherData(city) {
  // fetch data , get response , convert response to json , output it.
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    return result;
  } catch (error) {
    console.error(`error , city ${city} not found`, error.message);
  }
}

// function to display the weather data.
async function displayWeatherData(city) {
  const cityWeather = await getWeatherData(city);
  weatherInfo.classList.remove("hidden"); //remove the weather info.
  //display cityname , temperature , feels like , humidity ,
  const cityname = (cityNameDisplay.textContent = cityWeather["name"]);
  const temp = (temperatureDisplay.textContent = cityWeather["main"].temp);
  const description = (descriptionDisplay.textContent =
    cityWeather["weather"][0].description);
  weatherInfo.innerHTML = `
    <div>
     <div>City : ${cityname}'s</div> 
     <strong> Temperature is : ${temp}&deg;C</strong> BUT
     <div> It Feels Like <strong> ${description}<strong> </div> and  It is 
     above the ${cityWeather["main"].sea_level} sea level and
     ${cityWeather["main"].grnd_level} ground level .
     </div>
    `;
}

//TODO: add show error message functionality/.