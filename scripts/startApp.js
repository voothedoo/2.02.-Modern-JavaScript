import { createContainer, emptyContainer } from "./domUtils.js";
import { getData } from "./apiUtils.js";

const startApp = async () => {
  const data = await getData();
  if (data.error) return alert("Hey are you sure you are not holding up your map upside down?");

  emptyContainer();
  for (let i = 0; i < 5; i++) createContainer(data, i);

  document.querySelector('.city-info').textContent = data.location.name + ", " + data.location.country;
};

export { startApp };