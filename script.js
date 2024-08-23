const apiKey = '0fcc187111472e61398a43778da37d14'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const weatherBox = document.querySelector('.weather');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const descriptionElement = document.querySelector('.description');
const iconElement = document.querySelector('.icon');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

// Function to fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (response.status === 404) {
      alert('City not found. Please try again.');
      weatherBox.classList.remove('active');
      return;
    }

    const data = await response.json();
    console.log(data);
    displayWeather(data);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('An error occurred while fetching the weather data. Please try again later.');
  }
}

// Function to display weather data
function displayWeather(data) {
  cityElement.innerText = data.name;
  tempElement.innerText = `Temperature: ${Math.round(data.main.temp)}°C`;
  descriptionElement.innerText = data.weather[0].description;
  humidityElement.innerText = `Humidity: ${data.main.humidity}%`;
  windElement.innerText = `Wind Speed: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherBox.classList.add('active');
}

// Event listeners
searchButton.addEventListener('click', () => {
  const city = searchBox.value.trim();
  if (city !== '') {
    getWeather(city);
  }
});

searchBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const city = searchBox.value.trim();
    if (city !== '') {
      getWeather(city);
    }
  }
});
