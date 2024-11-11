const apiKey = 'e693bd5af5042426cb6c1c1041475e5c'; 
let units = 'metric'; 


function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (city) {
    fetchWeather(city);
  }
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherByLocation(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}


function fetchWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      fetchForecast(data.coord.lat, data.coord.lon);
    })
    .catch(error => alert('City not found!'));
}
function fetchWeatherByLocation(lat, lon) {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      fetchForecast(lat, lon);
    })
    .catch(error => alert('Unable to retrieve weather data.'));
}
function displayCurrentWeather(data) {
  document.getElementById('cityName').innerText = data.name;
  document.getElementById('temperature').innerText = `${data.main.temp}°`;
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('windSpeed').innerText = `Wind: ${data.wind.speed} m/s`;
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById('weatherIcon').src = iconUrl;
  console.log(data.weather[0].icon);

  if(data.weather[0].icon=='04d' || data.weather[0].icon=='03d'){
    console.log('true');
    document.getElementById('app-container').style.background = 'rgba(145, 148, 152, 0.6)';
    document.getElementById('btn1').style.background ='rgba(145, 148, 152, 0.6)';
    document.getElementById('btn2').style.background ='rgba(145, 148, 152, 0.6)';
  }
  else if(data.weather[0].icon=='01n'){
    document.getElementById('app-container').style.background = ' rgba(31, 31, 31, 0.6)';
    document.getElementById('btn1').style.background =' rgba(31, 31, 31, 0.6)';
    document.getElementById('btn2').style.background =' rgba(31, 31, 31, 0.6)';
  }
  else if(data.weather[0].icon=='01d' || data.weather[0].icon=='02d'){
    console.log('01d');
    console.log(data.weather[0].icon);
    document.getElementById('app-container').style.background = 'rgba(227, 199, 59, 0.6)';
    document.getElementById('btn1').style.background ='rgba(227, 199, 59, 0.6)';
    document.getElementById('btn2').style.background ='rgba(227, 199, 59, 0.6)';
  }else{
    document.getElementById('app-container').style.background = 'rgba(84, 155, 255, 0.6)';
    document.getElementById('btn1').style.background ='rgba(84, 155, 255, 0.6)';
    document.getElementById('btn2').style.background ='rgba(84, 155, 255, 0.6)'; 
  }
}
function fetchForecast(lat, lon) {

  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => console.log('Error fetching forecast data'));
}
function displayForecast(data) {
  const forecastList = document.getElementById('forecastList');
  forecastList.innerHTML = '';
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
    const forecastItem = document.createElement('div');
    forecastItem.innerHTML = `
     <div style="display:flex;flex-direction:column">
       <div>${day}</div>
      <img src="${iconUrl}" alt="weather icon" />
      <div>${Math.round(forecast.main.temp_min)}° / ${Math.round(forecast.main.temp_max)}°</div>
    </div>   
    `;
    forecastList.appendChild(forecastItem);
  }
}
function toggleUnits() {
  units = document.getElementById('unitToggle').checked ? 'imperial' : 'metric';
  const city = document.getElementById('cityInput').value;
  if (city) {
    fetchWeather(city);
  }
}