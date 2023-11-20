import { API } from "./config.js";

const buttonElement = document.querySelector('#submit-search');
const inputField = document.querySelector('#city-name');
const cityNameContainer = document.querySelector('.city-info');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];




async function startWeatherApp() {
	fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + inputField.value + "&days=7&aqi=no&alerts=no")
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data.error) {
				return alert("Hey are you sure you are not holding up your map upside down?");
			}

			const container = document.querySelector(".container");
			// Remove existing children if there are any in the <element class="container">
			while (container.lastChild) {
				container.removeChild(container.lastChild);
			};

			// Display the location in the browser as "City, Country"
			cityNameContainer.textContent = data.location.name + ", " + data.location.country;

			// Create cards for each days (first 5 days) of the week.
			for (let i = 0; i < 5; i++) {
				const div = document.querySelector('.container');

				const date = new Date();
				const weekDays = weekdays[(date.getDay() + i) % 7];

				// Create the elements with Data
				const card = document.createElement('div');
				card.classList.add("card");

				// if it's the first element (index === 0), add a second class: "main-card" for unique styling
				if (i === 0) card.classList.add("main-card");

				div.appendChild(card);

				const initialContentBeforeSlideAnimation = document.createElement('div');
				initialContentBeforeSlideAnimation.classList.add("imgBx");
				card.appendChild(initialContentBeforeSlideAnimation);


				const cardImg = document.createElement('img');
				cardImg.src = data.forecast.forecastday[i].day.condition.icon;
				cardImg.alt = "Icon describing the following weather: " + data.forecast.forecastday[i].day.condition.text;
				initialContentBeforeSlideAnimation.appendChild(cardImg);




				const contentBox = document.createElement("div");
				contentBox.classList.add("contentBx");
				card.appendChild(contentBox);

				const dowContentBeforeSliderAnimation = document.createElement("h2");
				dowContentBeforeSliderAnimation.innerHTML = weekDays;
				contentBox.appendChild(dowContentBeforeSliderAnimation);

				console.log(data.forecast.forecastday[i].day.condition.text);
				const tempDescription = document.createElement("h4");
				tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
				contentBox.appendChild(tempDescription);

				const currentTempBox = document.createElement("div");
				currentTempBox.classList.add("color");
				contentBox.appendChild(currentTempBox);

				const currentTempHeader = document.createElement("h3");
				currentTempHeader.innerHTML = "Temp:";
				currentTempBox.appendChild(currentTempHeader);

				const currentT = document.createElement("span");
				currentT.classList.add("current-temp");

				// OLD structure from different API
				// let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
				// if(i === 0) averageTemp = result.current.temperature_2m;

				// NEW structure:
				currentT.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
				currentTempBox.appendChild(currentT);

				const minMax = document.createElement("div");
				minMax.classList.add("details");
				contentBox.appendChild(minMax);

				const minMaxTempHeader = document.createElement("h3");
				minMaxTempHeader.innerHTML = "More:";
				minMax.appendChild(minMaxTempHeader);

				const minT = document.createElement("span");
				minT.classList.add("min-temp");
				minT.innerHTML = data.forecast.forecastday[i].day.mintemp_c + "°C";
				minMax.appendChild(minT);

				const maxT = document.createElement("span");
				maxT.classList.add("max-temp");
				maxT.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
				minMax.appendChild(maxT);
			}
		});
}

inputField.addEventListener('keyup', (event) => {
	if (event.code === "Enter") {
		startWeatherApp();
	}
});

buttonElement.addEventListener('click', startWeatherApp);

// This is a weather web application made for educational purposes. Please do not commercialize this project in any way whatsoever.
// Made by a BeCode technical coach whom had a lot of fun making "bad code", and improved by the very learners of this class.
// I want to mention that this is a fully working app, but can be optimized by:
// cleaning up,
// refactoring the code,
// renaming the variables,
// removing redundant code,
// removing unnecessary comments,
// storing information into variables for easier and more readable use 