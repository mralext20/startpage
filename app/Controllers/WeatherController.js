import WeatherService from "../Services/WeatherService.js";
import store from "../store.js";

//Private
function _draw() {
  let weather = store.State.weather;
  let target = document.getElementById("weather");
  target.innerHTML = weather.Template;
}

//Public
export default class ValuesController {
  constructor() {
    store.subscribe("weather", _draw);
    WeatherService.update();
    setTimeout(() => {
      WeatherService.update()
    }, 5 * 60 * 1000); // 5 minutes
  }
}
