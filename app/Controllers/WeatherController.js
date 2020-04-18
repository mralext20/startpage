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
    let now = new Date();
    let minutes = now.getMinutes() % 5 // the minutes component of the time
    setTimeout(() => {
      WeatherService.update()
      setInterval(() => {
        WeatherService.update()
      }, 5 * 60 * 1000); // 5 minutes
    }, ((5 - minutes) + 1) * 60 * 1000) // how long until the minutes change to a new minutes % 5 == 0
  }
}
