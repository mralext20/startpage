import TasksService from "../Services/TasksService.js";
import store from "../store.js";

//Private
function _draw() {
  let tasks = store.State.tasks
  let template = "";
  tasks.forEach(task => {
    template += task.Template;
  })
  let target = document.getElementById('tasksList');
  target.innerHTML = template;
}

//Public
export default class TasksController {
  constructor() {
    store.subscribe("tasks", _draw);
    TasksService.init()
  }

  /**
   * @param {HTMLInputElement} element
   */
  addTask(element) {

    TasksService.addTask(element.value);
    element.value = ""
    element.focus();
  }
  /**
   * @param {number} id
   */
  delete(id) {
    TasksService.delete(id);
  }
}