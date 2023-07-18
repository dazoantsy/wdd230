// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#captionDesc');
const humidity = document.querySelector('#humidity');
const wcValue = document.querySelector('#wcValue');
const wsValue = document.querySelector('#wsValue');

// api
const api = '33d10d1af93744ee827e3ad588f81c74'
const lat = '-15.255607';
const lon = '48.535153';
const units = 'metric';
const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${api}`

async function apiFetch() {
  try {
    const response = await fetch(weather_url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();

function displayResults(weatherData) {
  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
  const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  const desc = weatherData.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
  wsValue.textContent = weatherData.wind.speed;
  wcValue.textContent = getWindChill(weatherData.main.temp,weatherData.wind.speed);
}
//Getting values

function getWindChill(temperature,windSpeed) {
  // conversion
  let t = (temperature*1.8) + 32
  let s = 0.6215*windSpeed

  //computation
  let windChill
  if (t<=50 && s>3) {
      windChill = 35.74+(0.6215*t) - (35.75*Math.pow(s, 0.16)) + (0.4275*t.Math.pow(s, 0.16));
  }
  else {
      windChill = 'N/A'
  }
  return windChill;
}