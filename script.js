const apiKey = '98740f4ebc0d63bc0f8ba70090e5a091';

const searchBtn = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input');

const cityName = document.querySelector('.city-name');
const dateElement = document.querySelector('.date');
const weatherImage = document.querySelector('.weather-summary-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidityValue = document.querySelector('.humidity-value');
const windValue = document.querySelector('.wind-value');

// Live Time Element
const timeElement = document.querySelector('.live-time');

// Function to update time every second
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: true }); // 12-hour format
    timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime(); // Initialize immediately

// Weather Fetching
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found!');
                return;
            }

            cityName.textContent = data.name;
            dateElement.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
            temperature.textContent = `${Math.round(data.main.temp)} °C`;
            description.textContent = data.weather[0].main;
            humidityValue.textContent = `${data.main.humidity}%`;
            windValue.textContent = `${Math.round(data.wind.speed)} km/h`;

            switch (data.weather[0].main) {
                case 'Clear':
                    weatherImage.src = 'assets/weather/clear.svg';
                    break;
                case 'Clouds':
                    weatherImage.src = 'assets/weather/clouds.svg';
                    break;
                case 'Rain':
                    weatherImage.src = 'assets/weather/rain.svg';
                    break;
                case 'Snow':
                    weatherImage.src = 'assets/weather/snow.svg';
                    break;
                case 'Drizzle':
                    weatherImage.src = 'assets/weather/drizzle.svg';
                    break;
                default:
                    weatherImage.src = 'default.png';
            }
        })
        .catch(error => {
            alert('Error fetching weather data!');
            console.error(error);
        });
});

