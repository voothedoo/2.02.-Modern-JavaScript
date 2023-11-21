import { startApp } from "./startApp.js";

document.querySelector('#city-name').addEventListener('keyup', (event) => {
	(event.code === "Enter") ? startApp() : null;
});
document.querySelector('#submit-search').addEventListener('click', startApp);