import WeatherController from "./Controllers/WeatherController.js";
import TimeController from "./Controllers/TimeController.js";

class App {
  weatherController = new WeatherController();
  timeController = new TimeController();
}

window["app"] = new App();
