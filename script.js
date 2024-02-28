const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "aa7685502a8106474df34adddafc9ffa";

// creating functions 
// creating for form submissions
weatherForm.addEventListener("submit", async event => {
    // when page is open no need to refresh the page for that one usiing preventdefault
    event.preventDefault();
    //    value within the text box 
    const city = cityInput.value;
    if (city) {
        // if there is a pasig the getweatherdata and to display them calling displayweatherdata
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch (error) {
            displayError(error)

        }

    }
    else {
        // if there is no city we call the displayError function
        displayError("Please Enter a city");
    }

});

// for getting the data from of weathet
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }

    return data;


}

// for the displaying Info of weather
function displayWeatherInfo(data) {

    // we are using object destructing
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;
    // reseting the input filed as empty
    card.textContent = "";
    // accesing the style of card
    card.style.display = "flex"
    // creating elements
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("description");
    descDisplay.classList.add("id");
    weatherEmoji.classList.add("weatherEmoji");



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// getting the emoji of realted weather emoji
function getWeatherEmoji(weatherId) {
    console.log(weatherId)
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌦️";
        case (weatherId >= 600 && weatherId < 700):
            return "☃️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌨️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "🌥️";
        default:
            return "❓"
    }
}

// function if there is any error in city name
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    // here taking class name of error msg from the html
    errorDisplay.classList.add("errorDisplay");
    card.textContent = " ";
    card.style.display = "flex";
    card.appendChild(errorDisplay);


}