import { API } from "./config.js";

const createContainer = (data, i) => {
	const div = document.querySelector('.container');

	const daysOfTheWeekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const date = new Date();
	const weekDays = daysOfTheWeekArray[(date.getDay() + i) % 7];

	const card = document.createElement('div');
	card.classList.add("card");
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

};
const removeContainer = () => {
	const container = document.querySelector(".container");
	while (container.lastChild) {
		container.removeChild(container.lastChild);
	};
};
const getData = async () => {
	const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API.key}&q=${document.querySelector('#city-name').value}&days=7&aqi=no&alerts=no`);
	const data = await response.json();
	return data;
};
const startApp = async () => {
	const data = await getData();
	if (data.error) {
		return alert("Hey are you sure you are not holding up your map upside down?");
	}
	removeContainer();
	for (let i = 0; i < 5; i++) {
		createContainer(data, i);
	}
	document.querySelector('.city-info').textContent = data.location.name + ", " + data.location.country;
};

document.querySelector('#city-name').addEventListener('keyup', (event) => {
	(event.code === "Enter") ? startApp() : null;
});
document.querySelector('#submit-search').addEventListener('click', startApp);