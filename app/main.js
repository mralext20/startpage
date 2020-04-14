import WeatherController from "./Controllers/WeatherController.js";
import TimeController from "./Controllers/TimeController.js";

class App {
  constructor() {
    this.weatherController = new WeatherController();
    this.timeController = new TimeController();
  }
}

window["app"] = new App();
