import WeatherController from "./Controllers/WeatherController.js";
import TimeController from "./Controllers/TimeController.js";
import CalenderIconController from "./Controllers/CalendarIconController.js";
import TasksController from "./Controllers/TasksController.js";

class App {
  constructor() {
    this.weatherController = new WeatherController();
    this.timeController = new TimeController();
    this.CalenderIconController = new CalenderIconController();
    this.TasksController = new TasksController();
  }
}

window["app"] = new App();
