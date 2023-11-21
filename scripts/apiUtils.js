import { API } from "./config.js";

const getData = async () => {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API.key}&q=${document.querySelector('#city-name').value}&days=7&aqi=no&alerts=no`);
  const data = await response.json();
  return data;
};

export { getData };